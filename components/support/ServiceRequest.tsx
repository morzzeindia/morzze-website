"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const ServiceRequest = () => {
  return (
    <div className="max-w-4xl mx-auto bg-[#0A0A0A] border border-white/5 p-8 md:p-12">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">Service Support Request</h2>
        <p className="text-[#928E87] text-sm mt-2">Your input helps us grow and evolve</p>
      </div>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2"><Label className="text-[11px] uppercase font-bold tracking-widest">First Name</Label><Input className="bg-[#141414] border-white/10 rounded-none h-12" /></div>
          <div className="space-y-2"><Label className="text-[11px] uppercase font-bold tracking-widest">Last Name</Label><Input className="bg-[#141414] border-white/10 rounded-none h-12" /></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2"><Label className="text-[11px] uppercase font-bold tracking-widest">Phone Number</Label><Input className="bg-[#141414] border-white/10 rounded-none h-12" /></div>
          <div className="space-y-2"><Label className="text-[11px] uppercase font-bold tracking-widest">Email</Label><Input className="bg-[#141414] border-white/10 rounded-none h-12" /></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2"><Label className="text-[11px] uppercase font-bold tracking-widest">Pincode</Label><Input className="bg-[#141414] border-white/10 rounded-none h-12" /></div>
          <div className="space-y-2"><Label className="text-[11px] uppercase font-bold tracking-widest">State</Label><Input className="bg-[#141414] border-white/10 rounded-none h-12" /></div>
        </div>

        <div className="space-y-2"><Label className="text-[11px] uppercase font-bold tracking-widest">Select Product</Label><Input className="bg-[#141414] border-white/10 rounded-none h-12" placeholder="e.g. Steel Sink" /></div>

        <div className="space-y-2">
          <Label className="text-[11px] uppercase font-bold tracking-widest">Upload Invoice / Issue Photo</Label>
          <textarea className="w-full bg-[#141414] border border-white/10 p-4 h-32 outline-none focus:border-[#FDB813] text-sm text-white" placeholder="Describe your problem..." />
        </div>

        <Button className="w-full bg-[#FDB813] hover:bg-[#e6a700] text-black font-bold h-14 uppercase tracking-[2px] rounded-none">
          Submit Request
        </Button>
      </form>
    </div>
  );
};

export default ServiceRequest;