"use client";

import Image from "next/image";
import Link from "next/link";
import React, { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { forgotPassword } from "@/helper";
import { IconArrowLeft } from "@tabler/icons-react"; // Tabler Icons
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const ForgotPasswordOTPContent = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  // 🔐 redirect if no email
  React.useEffect(() => {
    if (!email) {
      router.push("/reset-password-email");
    }
  }, [email, router]);

  // ⏱ timer logic
  React.useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // 🔥 VERIFY OTP
  const handleVerify = () => {
    if (!otp.trim()) {
      toast.error("Please enter OTP ❌");
      return;
    }

    router.push(
      `/new-password?email=${encodeURIComponent(email!)}&code=${encodeURIComponent(otp)}`
    );
  };

  // 🔁 RESEND OTP (IMPORTANT: uses forgotPassword API)
  const handleResend = async () => {
    if (!canResend) return;

    try {
      const toastId = toast.loading("Resending OTP...");

      await forgotPassword(email!);

      toast.success("OTP resent successfully 📩", { id: toastId });

      setTimer(30);
      setCanResend(false);

    } catch (err: any) {
      toast.error(err.message || "Failed to resend ❌");
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      <div className="w-full max-w-md space-y-6">
        <Link href="/login">
          {/* Back Link - Match exactly with your code */}
          <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <IconArrowLeft size={18} />
            <span>Back to Login</span>
          </button></Link>

        {/* Header - Same spacing as your code */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Forgot Password</h1>
          <p className="text-gray-400 text-sm">
            Verify OTP to Reset Password
          </p>
        </div>

        {/* OTP Form Group */}
        <div className="space-y-6">
          <InputOTP maxLength={6} value={otp} onChange={setOtp} containerClassName="w-full">
            <InputOTPGroup className="w-full flex justify-between gap-2">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  // Styling matched with your input: bg-[#1A1A1A], border-gray-800
                  className="flex-1 h-14 bg-[#1A1A1A] border border-gray-800 rounded-md text-lg font-semibold focus:ring-1 focus:ring-[#FFB800] outline-none"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
          {/* RESEND */}
          <div className="flex items-center justify-between text-xs mt-3">

            {!canResend ? (
              <span className="text-white font-semibold">
                Resend OTP in 00:{timer.toString().padStart(2, "0")}
              </span>
            ) : (
              <span className="text-green-600 font-semibold">
                You can resend OTP
              </span>
            )}

            <button
              onClick={handleResend}
              disabled={!canResend}
              className={`font-medium whitespace-nowrap ${canResend
                ? "text-blue-600"
                : "text-gray-400 cursor-not-allowed"
                }`}
            >
              Resend
            </button>

          </div>
          <button onClick={handleVerify}
            disabled={loading}
            className="w-full bg-[#FFB800] hover:bg-[#e5a600] text-black font-bold py-3.5 rounded-md transition-colors">
            Verify OTP
          </button>
        </div>

      </div>
    </section>
  );
};

export default function ForgotPasswordOTP() {
  return (
    <Suspense fallback={
      <section className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
        <div className="w-full max-w-md text-center">Loading...</div>
      </section>
    }>
      <ForgotPasswordOTPContent />
    </Suspense>
  );
}