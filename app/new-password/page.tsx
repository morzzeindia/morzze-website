"use client";

import Image from "next/image";
import React, { Suspense, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { confirmForgotPassword } from "@/helper";
import { IconArrowLeft, IconLock, IconEye, IconEyeOff } from "@tabler/icons-react";

const SetNewPasswordContent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [openPopup, setOpenPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ get from previous step
  const email = searchParams.get("email");
  const code = searchParams.get("code");

  React.useEffect(() => {
    if (!email || !code) {
      router.push("/reset-password-email");
    }
  }, [email, code, router]);

  const handleReset = async () => {
    if (!password || !confirmPassword) {
      toast.error("Both fields are required ❌");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match ❌");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters ❌");
      return;
    }

    if (loading) return;

    setLoading(true);

    const toastId = toast.loading("Resetting password...");

    try {
      console.log("Resetting password with:", { email: email!, code: code!, newPassword: password });
      await confirmForgotPassword({
        email: email!,
        code: code!,
        newPassword: password,
      });

      toast.success("Password reset successful 🎉", {
        id: toastId,
      });

      setOpenPopup(true);
    } catch (err: any) {
      console.error("Error:", err);

      toast.error(err.message || "Failed to reset password ❌", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      <div className="w-full max-w-md space-y-6">

        {/* Back Link */}
        <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
          <IconArrowLeft size={18} />
          <span>Back to Login</span>
        </button>

        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Set New Password</h1>
          <p className="text-gray-400 text-sm">
            Enter your registered email to receive reset link
          </p>
        </div>

        {/* Form Group */}
        <div className="space-y-4">
          {/* New Password Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-500">
              <IconLock size={18} stroke={1.5} />
            </div>
            <div className="flex justify-end">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-gray-800 rounded-md py-3.5 pl-10 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-[#FFB800] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 pr-2 flex items-center text-gray-500 hover:text-gray-300"
              >
                {showPassword ? <IconEyeOff size={20} stroke={1.5} /> : <IconEye size={20} stroke={1.5} />}

              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-500">
              <IconLock size={18} stroke={1.5} />
            </div>
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-gray-800 rounded-md py-3.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#FFB800] transition-all"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-300"
            >
              {showConfirm ? <IconEyeOff size={20} stroke={1.5} /> : <IconEye size={20} stroke={1.5} />}

            </button>
          </div>

          {/* Action Button */}
          <button onClick={handleReset} disabled={loading} className="w-full bg-[#FFB800] hover:bg-[#e5a600] text-black font-bold py-3.5 rounded-md transition-colors mt-2">
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </div>
      <Dialog open={openPopup}>
        <DialogContent className="bg-[#0F0F0F] border border-[#2A2A2A] text-white w-full max-w-md p-0 rounded-[20px] overflow-hidden">
          <div className="px-6 py-4">
            <DialogTitle className="text-xl font-bold mb-2 text-white">Success</DialogTitle>
            <p className="text-sm text-gray-300 mb-4">
              Password reset successfully! You can now login with your new password.
            </p>
          </div>

          <div className="flex items-center justify-end p-4 border-t border-[#2A2A2A] bg-[#171717]">
            <Link
              href="/login"
              className="text-[#FFB800] text-sm font-medium hover:text-white transition-colors px-4 py-2"
            >
              Login Now
            </Link>
          </div>
        </DialogContent>
      </Dialog>

    </section>
  );
};

export default function SetNewPassword() {
  return (
    <Suspense fallback={
      <section className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
        <div className="w-full max-w-md text-center">Loading...</div>
      </section>
    }>
      <SetNewPasswordContent />
    </Suspense>
  );
}