"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { signOut } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export default function SettingsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== "DELETE") {
      return;
    }

    setIsDeleting(true);

    try {
      // Delete user's skills first (due to foreign key constraint)
      const { error: skillsError } = await supabase
        .from("skills")
        .delete()
        .eq("user_id", user?.id);

      if (skillsError) throw skillsError;

      // Delete user account
      const { error: deleteError } = await supabase.auth.admin.deleteUser(
        user?.id || ""
      );

      if (deleteError) {
        // If admin API is not available, use the regular delete
        const { error } = await supabase.rpc("delete_user");
        if (error) throw error;
      }

      // Sign out and redirect
      await signOut();
      router.push("/login");
    } catch (error: any) {
      console.error("Delete account error:", error);
      alert("Failed to delete account. Please try again or contact support.");
      setIsDeleting(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Settings</h1>

      {/* Account Information */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Account Information
        </h2>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>
            <p className="text-gray-800">{user.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">User ID</label>
            <p className="text-gray-800 font-mono text-sm">{user.id}</p>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Session</h2>
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
        >
          Logout
        </button>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 border-2 border-red-200 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-red-800 mb-4">Danger Zone</h2>

        {!showDeleteConfirm ? (
          <div>
            <p className="text-gray-700 mb-4">
              Once you delete your account, there is no going back. All your skills
              and data will be permanently deleted.
            </p>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Delete Account
            </button>
          </div>
        ) : (
          <div>
            <p className="text-gray-700 mb-4 font-semibold">
              Are you absolutely sure? This action cannot be undone.
            </p>
            <p className="text-gray-700 mb-4">
              Please type <span className="font-mono font-bold">DELETE</span> to
              confirm:
            </p>
            <input
              type="text"
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              placeholder="Type DELETE"
              className="w-full px-4 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={handleDeleteAccount}
                disabled={deleteConfirmText !== "DELETE" || isDeleting}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? "Deleting..." : "Confirm Delete"}
              </button>
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeleteConfirmText("");
                }}
                disabled={isDeleting}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
