"use client"
import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProfilePage() {
  return (
    <div className="max-w-4xl space-y-10 pb-20">
      <h1 className="text-3xl font-semibold text-white font-montserrat tracking-tight">
        Profile Settings
      </h1>

      {/* Personal Information Section */}
      <Card className="bg-[#111111] border-zinc-900 rounded-lg overflow-hidden">
        <CardHeader className="pt-8 px-8 pb-4">
          <CardTitle className="text-xl font-medium text-white font-montserrat tracking-tight">
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="px-8 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-2.5">
              <Label className="text-[11px] uppercase tracking-[0.15em] text-zinc-500 font-inter font-bold">
                Full Name
              </Label>
              <Input 
                defaultValue="John Doe"
                className="bg-[#181818] border-zinc-800 h-12 text-white focus-visible:ring-[#FFB800]/30 font-inter"
              />
            </div>
            <div className="space-y-2.5">
              <Label className="text-[11px] uppercase tracking-[0.15em] text-zinc-500 font-inter font-bold">
                Mobile Number
              </Label>
              <Input 
                defaultValue="+91 7777777777"
                className="bg-[#181818] border-zinc-800 h-12 text-white focus-visible:ring-[#FFB800]/30 font-inter"
              />
            </div>
            <div className="space-y-2.5 md:col-span-1">
              <Label className="text-[11px] uppercase tracking-[0.15em] text-zinc-500 font-inter font-bold">
                Email
              </Label>
              <Input 
                type="email"
                defaultValue="john.doe3@gmail.com"
                className="bg-[#181818] border-zinc-800 h-12 text-white focus-visible:ring-[#FFB800]/30 font-inter"
              />
            </div>
          </div>
          <Button className="mt-10 bg-[#FFB800] hover:bg-[#e6a600] font-inter text-black text-[12px] font-bold px-10 h-11 uppercase tracking-widest transition-all">
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Change Password Section */}
      <Card className="bg-[#111111] border-zinc-900 rounded-lg overflow-hidden">
        <CardHeader className="pt-8 px-8 pb-4">
          <CardTitle className="text-xl font-medium text-white font-montserrat tracking-tight">
            Change Password
          </CardTitle>
        </CardHeader>
        <CardContent className="px-8 pb-10">
          <div className="space-y-6 max-w-md">
            <div className="space-y-2.5">
              <Label className="text-[11px] uppercase tracking-[0.15em] text-zinc-500 font-inter font-bold">
                Current Password
              </Label>
              <Input 
                type="password"
                className="bg-[#181818] border-zinc-800 h-12 text-white focus-visible:ring-[#FFB800]/30 font-inter"
              />
            </div>
            <div className="space-y-2.5">
              <Label className="text-[11px] uppercase tracking-[0.15em] text-zinc-500 font-inter font-bold">
                New Password
              </Label>
              <Input 
                type="password"
                className="bg-[#181818] border-zinc-800 h-12 text-white focus-visible:ring-[#FFB800]/30 font-inter"
              />
            </div>
            <div className="space-y-2.5">
              <Label className="text-[11px] uppercase tracking-[0.15em] text-zinc-500 font-inter font-bold">
                Confirm New Password
              </Label>
              <Input 
                type="password"
                className="bg-[#181818] border-zinc-800 h-12 text-white focus-visible:ring-[#FFB800]/30 font-inter"
              />
            </div>
          </div>
          <Button className="mt-10 bg-[#FFB800] font-inter hover:bg-[#e6a600] text-black text-[12px] font-bold px-10 h-11 uppercase tracking-widest transition-all">
            Update Password
          </Button>
        </CardContent>
      </Card>

      {/* Delete Account Section */}
      <Card className="bg-[#111111] border-zinc-900 rounded-lg overflow-hidden">
        <CardHeader className="pt-8 px-8 pb-2">
          <CardTitle className="text-xl font-medium text-red-500 font-montserrat tracking-tight">
            Delete Account
          </CardTitle>
        </CardHeader>
        <CardContent className="px-8 pb-10">
          <p className="text-sm text-zinc-500 mb-8 font-inter font-medium leading-relaxed">
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
          <Button 
            variant="outline" 
            className="border-red-900/30 font-inter bg-transparent text-red-500 hover:bg-red-500/10 hover:text-red-500 text-[12px] font-bold px-8 h-11 uppercase tracking-widest transition-all"
          >
            Request Account Deletion
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}