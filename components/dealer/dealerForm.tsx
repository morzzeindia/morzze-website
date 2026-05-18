"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function DealerApplicationForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    email: "",
    phone: "",
    city: "",
    businessType: "",
    address: "",
    yearsInBusiness: "",
    businessDetails: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.fullName.trim()) {
      setError("Full name is required");
      return;
    }

    if (!formData.businessName.trim()) {
      setError("Business name is required");
      return;
    }

    if (!formData.email.trim()) {
      setError("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!formData.phone.trim()) {
      setError("Phone number is required");
      return;
    }

    const phoneRegex = /^[0-9+\-\s()]{9,15}$/;

    if (!phoneRegex.test(formData.phone)) {
      setError("Please enter a valid phone number");
      return;
    }

    if (!formData.city.trim()) {
      setError("City is required");
      return;
    }

    if (!formData.businessType.trim()) {
      setError("Business type is required");
      return;
    }

    if (!formData.businessDetails.trim()) {
      setError("Business details are required");
      return;
    }

    if (formData.businessDetails.length > 500) {
      setError("Business details must be under 500 characters");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/dealer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess("Application submitted successfully!");

        setFormData({
          fullName: "",
          businessName: "",
          email: "",
          phone: "",
          city: "",
          businessType: "",
          address: "",
          yearsInBusiness: "",
          businessDetails: "",
        });
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-black text-white py-20 px-4 md:px-8 lg:px-12" id="dealer-form">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-[44px] leading-none font-semibold tracking-[-0.03em] text-[#f5f2ea] mb-4">
            Apply to Become a Dealer
          </h2>
          <p className="text-[14px] text-[#7f7f7f]">
            Fill out the form below and our partnership team will contact you
            within 5 business days.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="rounded-[8px] border border-[#2a2a2a] bg-[#121212] px-6 md:px-8 py-7 md:py-8"
        >
          {error && (
            <div className="mb-6 flex items-center gap-3 rounded-md border border-gray-300 bg-white px-4 py-3 shadow-lg">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-orange-500 text-white font-bold">
                !
              </div>
              <p className="text-sm text-black">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 flex items-center gap-3 rounded-md border border-green-500 bg-green-500/10 px-4 py-3">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-green-500 text-white font-bold">
                ✓
              </div>
              <p className="text-sm text-green-400">{success}</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-x-5 gap-y-6">
            <Field
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              label="Full Name *"
              placeholder="Your full name"
            />
            <Field
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              label="Business Name *"
              placeholder="Your company name"
            />
            <Field
              name="email"
              value={formData.email}
              onChange={handleChange}
              label="Email *"
              placeholder="business@email.com"
            />
            <Field
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              label="Phone *"
              placeholder="+91 98765 43210"
            />
            <Field
              name="city"
              value={formData.city}
              onChange={handleChange}
              label="City *"
              placeholder="Your city"
            />
            <Field
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
              label="Business Type *"
              placeholder="Select business type"
            />
          </div>

          <div className="mt-6">
            <label className="text-[12px] text-[#f5f2ea] block mb-2">
              Showroom/Office Address
            </label>
            <Textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Complete address with pincode"
              className="min-h-[82px] resize-none rounded-none border-[#555555] bg-transparent text-white placeholder:text-[#666666] focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <div className="mt-6">
            <Field
              name="yearsInBusiness"
              value={formData.yearsInBusiness}
              onChange={handleChange}
              label="Years in Business"
              placeholder="Select experience"
            />
          </div>

          <div className="mt-6">
            <label className="text-[12px] text-[#f5f2ea] block mb-2">
              Tell us about your business
            </label>
            <Textarea
              name="businessDetails"
              value={formData.businessDetails}
              onChange={handleChange}
              maxLength={500}
              placeholder="Describe your current business, target customers, and why you want to partner with Morzze (max 500 characters)"
              className="min-h-[130px] resize-none rounded-none border-[#555555] bg-transparent text-white placeholder:text-[#666666] focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <p className="mt-2 text-[11px] text-[#7a7a7a]">
              Maximum 500 characters
            </p>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="mt-7 w-full rounded-[3px] bg-[#e8ab12] hover:bg-[#d79d10] text-black h-11 text-[13px] font-semibold tracking-[0.08em] uppercase"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </Button>
        </motion.form>
      </div>
    </section>
  );
}

function Field({
  label,
  placeholder,
  name,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="text-[12px] text-[#f5f2ea] block mb-2">{label}</label>
      <Input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-11 rounded-none border-[#555555] bg-transparent text-white placeholder:text-[#666666] focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
}