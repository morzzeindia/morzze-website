"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { forgotPassword } from "@/helper";
import { MailIcon, MoveLeftIcon } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Email is required ❌");
      return;
    }

    if (loading) return;

    setLoading(true);

    const toastId = toast.loading("Sending OTP...");

    try {
      await forgotPassword(email);

      toast.success("OTP sent to your email 📩", {
        id: toastId,
      });

      router.push(`/forgot-otp?email=${email}`);
    } catch (err: any) {
      console.error("Error:", err);

      toast.error(err.message || "Something went wrong ❌", {
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
          <MoveLeftIcon size={18} />
          <span>Back to Login</span>
        </button>

        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Forgot Password</h1>
          <p className="text-gray-400 text-sm">
            Enter your registered email to receive reset link
          </p>
        </div>

        {/* Form Group */}
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <MailIcon size={18} className="text-gray-500" />
            </div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-gray-800 rounded-md py-3.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#FFB800] transition-all"
            />
          </div>

          <button type="submit"
            disabled={loading}
            onClick={handleSubmit}
            className="w-full bg-[#FFB800] hover:bg-[#e5a600] text-black font-bold py-3.5 rounded-md transition-colors">
            {loading ? "Sending..." : "Confirm"}
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400">
          Don't Have An Account?{" "}
          <a href="/login" className="text-[#FFB800] font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </section>
  );
};

export default ForgotPassword;