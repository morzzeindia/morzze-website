"use client";

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IconStar, IconStarFilled } from "@tabler/icons-react";

const ReviewModal = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");

  return (
    <Dialog>
      <DialogTrigger >
        <Button className="bg-[#FFBF3F] hover:bg-[#e5ac37] text-black font-bold px-10 py-5 rounded-sm text-sm transition-all active:scale-95">
          Write Review
        </Button>
      </DialogTrigger>

      {/* Fixed: h-fit aur my-4 se upar niche gap mil jayega, scroll disabled */}
      <DialogContent className="sm:max-w-[480px] w-[95vw] bg-[#111] border-zinc-800 text-white p-0 overflow-hidden my-4 h-fit">
        
        <DialogHeader className="p-5 border-b border-zinc-800">
          <DialogTitle className="text-lg font-medium tracking-tight">Write a Review</DialogTitle>
        </DialogHeader>

        <div className="p-5 space-y-4">
          
          {/* Compact Product Info */}
          <div className="flex gap-3 items-center">
            <div className="w-12 h-12 bg-[#0A0A0A] border border-zinc-800 rounded-sm overflow-hidden shrink-0">
              <img src="/basin.jpg" alt="Product" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-0">
              <h3 className="text-sm font-medium text-zinc-100">Robe Wash Basin</h3>
              <p className="text-[10px] text-zinc-500 uppercase">Brushed Gold</p>
            </div>
          </div>

          {/* Compact Rating */}
          <div className="space-y-2">
            <p className="text-[11px] text-zinc-400">Overall Rating *</p>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className="transition-transform active:scale-90"
                >
                  {star <= (hover || rating) ? (
                    <IconStarFilled size={24} className="text-[#FFBF3F]" />
                  ) : (
                    <IconStar size={24} className="text-zinc-800" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Compact Title */}
          <div className="space-y-1.5">
            <p className="text-[11px] text-zinc-400">Review Title *</p>
            <Input
              placeholder="Summarize your experience"
              className="bg-transparent border-zinc-800 focus:border-[#FFBF3F] focus:ring-0 text-xs h-10 rounded-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Compact Review Textarea */}
          <div className="space-y-1.5">
            <p className="text-[11px] text-zinc-400">Your Review *</p>
            <Textarea
              placeholder="Tell us what you liked or disliked"
              className="bg-transparent border-zinc-800 focus:border-[#FFBF3F] focus:ring-0 text-xs min-h-[100px] max-h-[120px] resize-none rounded-sm"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </div>

          {/* Action Button */}
          <Button 
            className="w-full bg-[#FFBF3F] hover:bg-[#e5ac37] text-black font-bold h-11 rounded-sm text-xs uppercase tracking-wider mt-2"
          >
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;