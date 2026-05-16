"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const ServiceRequest = () => {
  return (
    <div className="max-w-5xl mx-auto bg-black p-2 md:p-10">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Service Support Request
        </h2>
        <p className="text-gray-500 text-sm">
          Your input helps us grow and evolve
        </p>
      </div>

      {/* Form Container */}
      <div className="bg-[#111111] border border-white/10 p-8 md:p-12 rounded-sm shadow-2xl">
        <form className="space-y-8">
          {/* Row 1: Names */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label className="text-white text-xs font-semibold ml-1">First Name</Label>
              <Input placeholder="Enter First Name" className="bg-[#1A1A1A] border-white/10 text-gray-400 h-14 rounded-md focus:ring-1 focus:ring-[#FDB813]" />
            </div>
            <div className="space-y-3">
              <Label className="text-white text-xs font-semibold ml-1">Last Name</Label>
              <Input placeholder="Enter Last Name" className="bg-[#1A1A1A] border-white/10 text-gray-400 h-14 rounded-md focus:ring-1 focus:ring-[#FDB813]" />
            </div>
          </div>

          {/* Row 2: Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label className="text-white text-xs font-semibold ml-1">Phone Number</Label>
              <Input placeholder="e.g. +91 0000000000" className="bg-[#1A1A1A] border-white/10 text-gray-400 h-14 rounded-md focus:ring-1 focus:ring-[#FDB813]" />
            </div>
            <div className="space-y-3">
              <Label className="text-white text-xs font-semibold ml-1">Email</Label>
              <Input placeholder="Enter Email" className="bg-[#1A1A1A] border-white/10 text-gray-400 h-14 rounded-md focus:ring-1 focus:ring-[#FDB813]" />
            </div>
          </div>

          {/* Row 3: Pincode & State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label className="text-white text-xs font-semibold ml-1">Pincode</Label>
              <Input placeholder="Enter Pincode" className="bg-[#1A1A1A] border-white/10 text-gray-400 h-14 rounded-md focus:ring-1 focus:ring-[#FDB813]" />
            </div>
            <div className="space-y-3">
              <Label className="text-white text-xs font-semibold ml-1">State</Label>
              <div className="relative">
                <Input placeholder="Enter State" className="bg-[#1A1A1A] border-white/10 text-gray-400 h-14 rounded-md pr-10" />
                <ChevronDown className="absolute right-3 top-4 text-gray-500 w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Row 4: City & Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label className="text-white text-xs font-semibold ml-1">City</Label>
              <Input placeholder="Enter City" className="bg-[#1A1A1A] border-white/10 text-gray-400 h-14 rounded-md focus:ring-1 focus:ring-[#FDB813]" />
            </div>
            <div className="space-y-3">
              <Label className="text-white text-xs font-semibold ml-1">Address</Label>
              <Input placeholder="Enter Address" className="bg-[#1A1A1A] border-white/10 text-gray-400 h-14 rounded-md focus:ring-1 focus:ring-[#FDB813]" />
            </div>
          </div>

          {/* Product Dropdown */}
          <div className="space-y-3">
            <Label className="text-white text-xs font-semibold ml-1">Select Product</Label>
            <div className="relative">
              <Input placeholder="Steel Sink" className="bg-[#1A1A1A] border-white/10 text-gray-400 h-14 rounded-md pr-10" />
              <ChevronDown className="absolute right-3 top-4 text-gray-500 w-5 h-5" />
            </div>
          </div>

          {/* Model Dropdown */}
          <div className="space-y-3">
            <Label className="text-white text-xs font-semibold ml-1">Model</Label>
            <div className="relative">
              <Input placeholder="Enter Model" className="bg-[#1A1A1A] border-white/10 text-gray-400 h-14 rounded-md pr-10" />
              <ChevronDown className="absolute right-3 top-4 text-gray-500 w-5 h-5" />
            </div>
          </div>

          {/* Textarea */}
          <div className="space-y-3">
            <Label className="text-white text-xs font-semibold ml-1">Upload Invoice (Optional)</Label>
            <textarea
              className="w-full bg-[#1A1A1A] border border-white/10 p-4 h-40 outline-none focus:ring-1 focus:ring-[#FDB813] text-sm text-gray-400 rounded-md"
              placeholder="Describe your problem you are having"
            />
          </div>

          {/* Submit Button */}
          <Button className="w-full bg-[#FFB81C] hover:bg-[#e6a619] text-black font-bold h-16 rounded-xl text-lg transition-all duration-300">
            Request Service
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ServiceRequest; 