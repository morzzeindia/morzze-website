"use client";

import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const EditAddressPage = () => {
  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10 font-inter">
      <h2 className="text-xl font-semibold mb-6 tracking-tight">Address Book</h2>

      <div className="max-w-4xl bg-[#141414] border border-zinc-900 rounded-sm p-8 space-y-8">
        <h3 className="text-base font-medium text-zinc-100">Edit Address</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-[11px] text-zinc-500 uppercase font-medium">Full Name</label>
            <Input 
              defaultValue="Sarah Johnson"
              className="bg-[#454545] border-zinc-800 focus:border-zinc-700 h-11 text-sm rounded-sm"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label className="text-[11px] text-zinc-500 uppercase font-medium">Phone no.</label>
            <Input 
              defaultValue="+91 XXXXXXXX859"
              className="bg-[#454545] border-zinc-800 focus:border-zinc-700 h-11 text-sm rounded-sm"
            />
          </div>

          {/* Address / Street - Full Width */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-[11px] text-zinc-500 uppercase font-medium">Address / Street</label>
            <Input 
              defaultValue="123 Wellness Street, Apt 4B"
              className="bg-[#454545] border-zinc-800 focus:border-zinc-700 h-11 text-sm rounded-sm"
            />
          </div>

          {/* Locality - Full Width */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-[11px] text-zinc-500 uppercase font-medium">Locality</label>
            <Input 
              defaultValue="Downtown"
              className="bg-[#454545] border-zinc-800 focus:border-zinc-700 h-11 text-sm rounded-sm"
            />
          </div>

          {/* City, State, Pincode - 3 Column Grid */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] text-zinc-500 uppercase font-medium">City</label>
              <Input 
                defaultValue="Jaipur"
                className="bg-[#454545] border-zinc-800 focus:border-zinc-700 h-11 text-sm rounded-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] text-zinc-500 uppercase font-medium">State</label>
              <Input 
                defaultValue="Rajasthan"
                className="bg-[#454545] border-zinc-800 focus:border-zinc-700 h-11 text-sm rounded-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] text-zinc-500 uppercase font-medium">Pincode</label>
              <Input 
                defaultValue="302019"
                className="bg-[#454545] border-zinc-800 focus:border-zinc-700 h-11 text-sm rounded-sm"
              />
            </div>
          </div>

          {/* Country - Full Width */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-[11px] text-zinc-500 uppercase font-medium">Country</label>
            <Input 
              defaultValue="India"
              className="bg-[#454545] border-zinc-800 focus:border-zinc-700 h-11 text-sm rounded-sm"
            />
          </div>
        </div>

        {/* Checkbox */}
        <div className="flex items-center space-x-2 py-2">
          <Checkbox id="default-address" className="border-zinc-700 data-[state=checked]:bg-[#FFBF3F] data-[state=checked]:text-black" />
          <label 
            htmlFor="default-address" 
            className="text-xs text-zinc-500 font-medium cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Set as default shipping address
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 pt-4">
          <Button className="flex-1 bg-[#FFBF3F] hover:bg-[#e5ac37] text-black font-bold py-4 rounded-sm text-sm transition-all active:scale-95">
            Upadate
          </Button>
          <Button variant="outline" className="flex-1 border-[#FFBF3F] text-[#FFBF3F] hover:bg-[#FFBF3F]/10 font-bold py-4 rounded-sm text-sm transition-all active:scale-95 bg-[#454545]">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditAddressPage;