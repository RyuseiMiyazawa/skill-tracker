"use client";

import { useState, useRef, useEffect } from "react";
import VoiceInput from "./VoiceInput";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Props = {
  onSkillExtracted: (skill: Partial<{
    name: string;
    level: number;
    category: string;
    experience_months: number;
  }>) => void;
};

export default function AIChat({ onSkillExtracted }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'll help you add your skills. What skill would you like to add?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState("");
  const [lastEnterTime, setLastEnterTime] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only scroll within the chat container, not the whole page
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, history: messages }),
      });

      if (!res.ok) {
        throw new Error("Failed to get response");
      }

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);

      // スキルデータが抽出された場合（部分更新にも対応）
      if (data.skillData) {
        onSkillExtracted(data.skillData);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "An error occurred. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      const currentTime = Date.now();
      const timeSinceLastEnter = currentTime - lastEnterTime;

      // If Enter was pressed within 500ms (double Enter)
      if (timeSinceLastEnter < 500 && lastEnterTime !== 0) {
        e.preventDefault();
        handleSend();
        setLastEnterTime(0);
      } else {
        // First Enter - add newline
        setLastEnterTime(currentTime);
      }
    }
  };

  const handleVoiceStart = () => {
    setIsRecording(true);
    setVoiceTranscript("");
  };

  const handleVoiceTranscript = (transcript: string) => {
    setVoiceTranscript(transcript);
  };

  const handleVoiceCancel = () => {
    setIsRecording(false);
    setVoiceTranscript("");
  };

  const handleVoiceConfirm = () => {
    if (voiceTranscript) {
      setInput((prev) => prev + (prev ? " " : "") + voiceTranscript);
    }
    setIsRecording(false);
    setVoiceTranscript("");
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border-2 border-purple-200 shadow-lg" style={{ maxHeight: '100%' }}>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-t-lg flex-shrink-0">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          AI Assistant
        </h2>
        <p className="text-sm text-purple-100 mt-1">
          Add skills through conversation
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ minHeight: 0 }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-white text-gray-800 border border-purple-200 rounded-bl-none shadow-sm"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 border border-purple-200 rounded-lg rounded-bl-none shadow-sm p-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" />
                <div
                  className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                />
                <div
                  className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-purple-200 bg-white rounded-b-lg flex-shrink-0">
        <div className="flex gap-2 items-start">
          <div className="flex-1 relative">
            <textarea
              value={isRecording ? voiceTranscript : input}
              onChange={(e) => !isRecording && setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message... (Press Enter twice to send)"
              disabled={loading || isRecording}
              rows={1}
              className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 resize-none"
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              {!isRecording && (
                <VoiceInput
                  onTranscript={handleVoiceTranscript}
                  onStart={handleVoiceStart}
                  compact
                />
              )}
            </div>
          </div>

          {isRecording ? (
            <>
              {/* Cancel Button */}
              <button
                onClick={handleVoiceCancel}
                className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition"
                title="Cancel"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Confirm Button */}
              <button
                onClick={handleVoiceConfirm}
                disabled={!voiceTranscript}
                className="p-3 text-green-600 hover:bg-green-50 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                title="Confirm"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </>
          ) : (
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg flex items-center justify-center"
              style={{ minHeight: '48px' }}
              title="Send"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
