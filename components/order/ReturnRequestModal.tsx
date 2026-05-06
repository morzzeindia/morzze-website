"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { UploadCloud } from "lucide-react";

const ReturnRequestModal = () => {
  return (
    <Dialog>
      <DialogTrigger >
        {/* Yahan wahi styling hai jo tere main page ke button ki thi */}
        <button className="flex-1 border border-[#FFB800] text-[#FFB800] hover:bg-[#FFB800]/5 px-12 py-2 rounded-md text-[11px] font-bold uppercase tracking-widest transition-all">
          Request Return
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[480px] w-[90vw] bg-[#111] border-zinc-800 text-white p-0 overflow-hidden py-1 ">
        <DialogHeader className="p-5 border-b border-zinc-800">
          <DialogTitle className="text-lg font-medium tracking-tight text-white">Recent Orders</DialogTitle>
        </DialogHeader>

        <div className="p-5 space-y-5">
          <div className="space-y-2">
            <p className="text-[11px] font-medium text-zinc-100">Please tell us reason for return</p>
            <Select>
              <SelectTrigger className="w-full bg-transparent border-zinc-800 focus:ring-0 text-xs h-11 rounded-sm text-zinc-400">
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent className="bg-[#111] border-zinc-800 text-white">
                <SelectItem value="damage">Damage Item</SelectItem>
                <SelectItem value="different">Ordered product and delivered product is different</SelectItem>
                <SelectItem value="not-expected">Not as Expected</SelectItem>
                <SelectItem value="quality">Quality Issue</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <p className="text-[11px] font-medium text-zinc-100">Please Explain your Reason (60 Words)</p>
            <Textarea 
              placeholder="Explain....."
              className="bg-transparent border-zinc-800 focus:border-[#FFB800] focus:ring-0 text-xs min-h-[100px] resize-none rounded-sm"
            />
          </div>

          <div className="space-y-2">
            <p className="text-[11px] font-medium text-zinc-100">Upload Image* (Optional)</p>
            <div className="border-2 border-dashed border-zinc-800 rounded-sm p-8 flex flex-col items-center justify-center gap-2 hover:bg-zinc-900/50 transition-colors cursor-pointer group">
              <UploadCloud className="w-8 h-8 text-zinc-500 group-hover:text-[#FFB800]" />
              <div className="text-center">
                <p className="text-[11px] text-zinc-400">Click to upload or drag and drop</p>
                <p className="text-[10px] text-zinc-600 uppercase mt-1">PDF, JPG, PNG up to 5MB</p>
              </div>
            </div>
          </div>

          <Button 
            className="w-full bg-[#FFB800] hover:bg-[#e6a600] text-black font-bold h-12 rounded-sm text-xs uppercase tracking-wider mt-2"
          >
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReturnRequestModal;