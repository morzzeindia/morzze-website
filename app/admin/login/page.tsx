"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "", general: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: "" });
    }
    if (errors.general) {
      setErrors({ ...errors, general: "" });
    }
  };

  const validate = () => {
    let valid = true;
    const newErrors = { email: "", password: "", general: "" };
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        // store token or user info if returned
        localStorage.setItem("userEmail", formData.email);
        router.push("/dashboard");
      } else {
        setErrors({ ...errors, general: data.error || "Login failed" });
      }
    } catch (err) {
      console.error("Login error", err);
      setErrors({ ...errors, general: "Network error" });
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center lg:justify-end bg-black">

      
      <Image
        src="/loginbg.png"
        alt="background"
        fill
        priority
        className="object-cover -z-10 opacity-20"
      />

      
      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
<div className="bg-zinc-950 border border-zinc-800 shadow-lg rounded-2xl w-full max-w-sm md:max-w-lg lg:max-w-md p-4">

        <div className="flex justify-center mb-4 mt-5">
  <Image
    src="/logo.svg"   
    alt="Potent logo"
    width={90}
    height={50}
    className="object-contain"
  />
</div>
          <div className="flex justify-center mb-1">
            
<Image
  src="/mobilelogin.png"
  alt="background mobile"
  fill
  priority
  className="object-cover -z-10 md:hidden"
/>


<Image
  src="/loginbg.png"
  alt="background desktop"
  fill
  priority
  className="object-cover -z-10 hidden md:block"
/>
          </div>

          <h2 className="text-center text-2xl font-semibold text-white mb-2">
            Admin Login
          </h2>

          <p className="text-center text-sm font-semibold text-zinc-400 mt-1 mb-3">
            Enter your details below
          </p>

          <form onSubmit={handleSubmit} className="space-y-2">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border-b border-zinc-600 bg-transparent px-1 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-yellow-400"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border-b border-zinc-600 bg-transparent px-1 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-yellow-400"
              />
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {errors.general && (
              <p className="text-red-400 text-xs mt-1">{errors.general}</p>
            )}

            <div className="text-right text-xs mt-2">
              <Link href="/reset-password-email">
                <button className="text-yellow-400 font-semibold mb-5 hover:text-yellow-300">
                  Forgot Password?
                </button>
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 text-black py-2 text-sm rounded-lg mt-2 mb-2 font-medium hover:bg-yellow-500 transition"
            >
              Login
            </button>
          </form>

         <button className="w-full border border-yellow-400 text-yellow-400 py-2 text-sm rounded-full mt-1 font-medium flex items-center justify-center gap-2 bg-transparent hover:bg-yellow-400/10 transition">
  
  <Image
    src="/google.svg"   
    alt="google"
    width={15}
    height={15}
  />

  <span>Sign in with Google</span>
</button>

          <p className="text-center text-xs mt-4 mb-6 text-zinc-400">
            Need assistance?{" "}
            <span className="text-yellow-400 cursor-pointer hover:underline">
              Contact Support
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;