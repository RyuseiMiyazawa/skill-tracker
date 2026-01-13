"use client";

import { useState, useEffect, useRef } from "react";

type VoiceInputProps = {
  onTranscript: (text: string) => void;
  onStart?: () => void;
  compact?: boolean;
};

export default function VoiceInput({ onTranscript, onStart, compact = false }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [transcript, setTranscript] = useState("");
  const [volume, setVolume] = useState(0);

  const recognitionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Check if browser supports speech recognition
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      setIsSupported(!!SpeechRecognition);
    }
  }, []);

  const stopListening = (sendTranscript: boolean = true) => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (audioContextRef.current) {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      audioContextRef.current.close();
    }

    setIsListening(false);
  };

  const startListening = async () => {
    if (typeof window === "undefined") return;

    // Don't start if already listening
    if (isListening) {
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("お使いのブラウザは音声認識に対応していません。Chrome または Safari をお試しください。");
      return;
    }

    // Setup audio visualization
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const context = new AudioContext();
      const source = context.createMediaStreamSource(stream);
      const analyserNode = context.createAnalyser();
      analyserNode.fftSize = 256;
      source.connect(analyserNode);

      audioContextRef.current = context;

      // Start volume monitoring
      const dataArray = new Uint8Array(analyserNode.frequencyBinCount);
      const updateVolume = () => {
        analyserNode.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
        setVolume(average);
        animationIdRef.current = requestAnimationFrame(updateVolume);
      };
      updateVolume();
    } catch (err) {
      console.error("Microphone access error:", err);
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "ja-JP";
    recognition.continuous = true; // Changed to continuous
    recognition.interimResults = true;

    recognitionRef.current = recognition;

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript("");
      if (onStart) {
        onStart();
      }
    };

    recognition.onresult = (event: any) => {
      let accumulatedTranscript = "";

      for (let i = 0; i < event.results.length; i++) {
        accumulatedTranscript += event.results[i][0].transcript;
      }

      setTranscript(accumulatedTranscript);
      onTranscript(accumulatedTranscript);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      setTranscript("");

      if (audioContextRef.current) {
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
        }
        audioContextRef.current.close();
      }

      if (event.error === "no-speech") {
        alert("音声が検出されませんでした。もう一度お試しください。");
      } else if (event.error === "not-allowed") {
        alert("マイクへのアクセスが許可されていません。ブラウザの設定を確認してください。");
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      if (audioContextRef.current) {
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
        }
        audioContextRef.current.close();
      }
    };

    recognition.start();
  };

  if (!isSupported) {
    return null;
  }

  if (compact) {
    return (
      <div className="relative">
        <button
          type="button"
          onClick={startListening}
          disabled={false}
          className={`p-2 rounded-full transition-all duration-200 ${
            isListening
              ? "bg-red-500 text-white"
              : "text-gray-400 hover:text-purple-600 hover:bg-purple-50"
          }`}
          title={isListening ? "停止" : "音声入力"}
        >
          {isListening ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="6" width="12" height="12" rx="1"/>
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          )}
        </button>

        {isListening && transcript && (
          <div className="absolute bottom-full right-0 mb-2 p-2 bg-gray-900 text-white text-xs rounded shadow-lg max-w-xs whitespace-pre-wrap">
            {transcript}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={startListening}
        disabled={false}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
          isListening
            ? "bg-red-500 text-white"
            : "bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg"
        }`}
      >
        {isListening ? (
          <>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="6" width="12" height="12" rx="1"/>
            </svg>
            <span>停止</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            <span>音声で入力</span>
          </>
        )}
      </button>

      {isListening && (
        <div className="space-y-2">
          {/* Audio Visualizer */}
          <div className="flex items-center gap-1 h-16 bg-gray-900 rounded-lg px-3">
            {Array.from({ length: 40 }).map((_, i) => {
              const height = Math.max(4, (volume / 255) * 100 * (Math.random() * 0.5 + 0.5));
              return (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-full transition-all duration-100"
                  style={{ height: `${height}%` }}
                />
              );
            })}
          </div>

          {/* Transcript Display */}
          {transcript && (
            <div className="p-3 bg-white border-2 border-purple-300 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">認識中:</p>
              <p className="text-gray-900 font-medium">{transcript}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
