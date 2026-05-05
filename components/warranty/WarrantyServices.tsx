"use client";
import React from "react";
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from "@/components/ui/tabs"; 
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  IconClipboardCheck, 
  IconFileText, 
  IconSearch, 
  IconUpload 
} from "@tabler/icons-react";
import { motion } from "framer-motion";

const WarrantyServices = () => {
  return (
    <section className="bg-[#050505] py-8 md:py-20 font-montserrat min-h-screen text-white">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Warranty Services
          </h2>
          <p className="font-inter text-[#928E87] text-sm opacity-80">
            Register your product, file a claim, or check warranty status.
          </p>
        </div>

        <Tabs defaultValue="register" className="w-full flex flex-col gap-10">
          
          <TabsList variant="line" className="w-full overflow-x-auto whitespace-nowrap  justify-center gap-4 md:gap-12 border-none bg-transparent">
            <TabsTrigger 
              value="register" 
              className="group py-4 px-2 flex items-center gap-3 !text-[#928E87] data-active:!text-[#FDB813] after:!bg-[#FDB813] after:bottom-[-2px] transition-all"
            >
              <IconClipboardCheck size={20} />
              <span className="text-[13px] font-medium tracking-wide">Register Product</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="claim" 
              className="group py-4 px-2 flex items-center gap-3 !text-[#928E87] data-active:!text-[#FDB813] after:!bg-[#FDB813] after:bottom-[-2px] transition-all"
            >
              <IconFileText size={20} />
              <span className="text-[13px] font-medium tracking-wide">File a Claim</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="status" 
              className="group py-4 px-2 flex items-center gap-3 !text-[#928E87] data-active:!text-[#FDB813] after:!bg-[#FDB813] after:bottom-[-2px] transition-all"
            >
              <IconSearch size={20} />
              <span className="text-[13px] font-medium tracking-wide">Check Status</span>
            </TabsTrigger>
          </TabsList>

          <div className="bg-[#0A0A0A] border border-white/5 p-6 md:p-10 rounded-sm shadow-2xl relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 blur-[120px] bg-[#FDB813]/10"></div>

            {/* --- TAB 1: REGISTER PRODUCT (Screenshot 2026-05-05 112747.png) --- */}
            <TabsContent value="register">
              <motion.form initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[11px]  tracking-[2px] font-semibold text-[#efefef]">Product Serial Number *</Label>
                    <Input placeholder="e.g. MRZ-FC-2024-00XXX" className="bg-[#141414] border-white/10 h-12 focus:border-[#FDB813] rounded-none" />
                    <p className="text-[#666] text-[10px] italic">Found on the product box or warranty card</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[11px]  tracking-[2px] font-semibold text-[#efefef]">Purchase Date *</Label>
                    <Input type="date" className="bg-[#141414] border-white/10 h-12 rounded-none text-white" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[11px]  tracking-[2px] font-semibold text-[#efefef]">Product Category *</Label>
                    <Input placeholder="Select category" className="bg-[#141414] border-white/10 h-12 rounded-none" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[11px]  tracking-[2px] font-semibold text-[#efefef]">Product Name *</Label>
                    <Input placeholder="e.g. Premium Basin Mixer Chrome" className="bg-[#141414] border-white/10 h-12 rounded-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[11px]  tracking-[2px] font-semibold text-[#efefef]">Order/Invoice Number *</Label>
                    <Input placeholder="e.g. ORD-12345" className="bg-[#141414] border-white/10 h-12 rounded-none" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[11px]  tracking-[2px] font-semibold text-[#efefef]">Dealer/Store Name *</Label>
                    <Input placeholder="e.g. Morzze Flagship Store Delhi" className="bg-[#141414] border-white/10 h-12 rounded-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[11px]  tracking-[2px] font-semibold text-[#efefef]">Full Name *</Label>
                    <Input placeholder="Enter your full name" className="bg-[#141414] border-white/10 h-12 rounded-none" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[11px]  tracking-[2px] font-semibold text-[#efefef]">Email *</Label>
                    <Input placeholder="example@mail.com" className="bg-[#141414] border-white/10 h-12 rounded-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[11px]  tracking-[2px] font-semibold text-[#efefef]">Phone Number *</Label>
                  <Input placeholder="Enter your phone number" className="bg-[#141414] border-white/10 h-12 rounded-none" />
                </div>

                <div className="space-y-2">
                  <Label className="text-[11px]  tracking-[2px] font-semibold text-[#efefef]">Installation Address *</Label>
                  <textarea 
                    className="w-full bg-[#141414] border border-white/10 text-white rounded-none p-4 min-h-[100px] outline-none focus:border-[#FDB813] text-sm" 
                    placeholder="Where the product is installed"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[11px]  tracking-[2px] font-semibold text-[#efefef]">Upload Invoice (Optional)</Label>
                  <div className="border border-dashed border-white/10 rounded-none p-8 flex flex-col items-center justify-center bg-[#0D0D0D] group cursor-pointer hover:border-[#FDB813]/50 transition-all">
                    <IconUpload className="text-[#FDB813] mb-2 group-hover:scale-110 transition-transform" size={24} />
                    <p className="text-white text-[13px]">Click to upload or drag and drop</p>
                    <p className="text-[#666] text-[10px] mt-1">PDF, JPG, PNG up to 5MB</p>
                  </div>
                </div>

                <Button className="w-full h-14 bg-[#FDB813] hover:bg-[#e6a700] text-black font-bold  tracking-[2px] text-xs rounded-none">
                  Register Product
                </Button>
              </motion.form>
            </TabsContent>

            {/* --- TAB 2: FILE A CLAIM (Screenshot 2026-05-05 114347_2.png) --- */}
            <TabsContent value="claim">
              <motion.form initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-[11px]  tracking-[2px] font-semibold text-[#efefef]">Product Serial Number *</Label>
                  <Input placeholder="e.g. MRZ-FC-2024-XXXXX" className="bg-[#141414] border-white/10 h-12 rounded-none" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[11px]  tracking-[2px] font-semibold text-[#efefef]">Product Category *</Label>
                    <Input placeholder="Select category" className="bg-[#141414] border-white/10 h-12 rounded-none" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[11px]  tracking-[2px] font-semibold text-[#efefef]">Issue Type *</Label>
                    <Input placeholder="e.g. Leaking or Damage" className="bg-[#141414] border-white/10 h-12 rounded-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[11px]  tracking-[2px] font-semibold text-[#efefef]">Describe the Issue *</Label>
                  <textarea 
                    className="w-full bg-[#141414] border border-white/10 text-white rounded-none p-4 min-h-[120px] outline-none focus:border-[#FDB813]" 
                    placeholder="Describe the issue in detail"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[11px]  tracking-[2px] font-semibold text-[#efefef]">Upload Photos/Videos</Label>
                  <div className="border border-dashed border-white/10 p-8 flex flex-col items-center justify-center bg-[#0D0D0D]">
                    <IconUpload className="text-[#FDB813] mb-2" size={24} />
                    <p className="text-white text-xs">Click to upload or drag and drop</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[11px]  tracking-[2px] font-semibold text-[#efefef]">Full Name *</Label>
                    <Input placeholder="Enter full name" className="bg-[#141414] border-white/10 h-12 rounded-none" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[11px]  tracking-[2px] font-semibold text-[#efefef]">Email *</Label>
                    <Input placeholder="example@mail.com" className="bg-[#141414] border-white/10 h-12 rounded-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[11px]  tracking-[2px] font-semibold text-[#efefef]">Phone no.*</Label>
                  <Input placeholder="Enter phone number" className="bg-[#141414] border-white/10 h-12 rounded-none" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[11px]  tracking-[2px] font-semibold text-[#efefef]">Installation Address *</Label>
                  <textarea 
                    className="w-full bg-[#141414] border border-white/10 text-white rounded-none p-4 min-h-[100px] outline-none focus:border-[#FDB813]" 
                    placeholder="Enter installation address"
                  />
                </div>
                <Button className="w-full h-14 bg-[#FDB813] hover:bg-[#e6a700] text-black font-bold  tracking-[2px] text-xs rounded-none">
                  Submit Warrenty Claim
                </Button>
              </motion.form>
            </TabsContent>

            {/* --- TAB 3: CHECK STATUS (Screenshot 2026-05-05 114356_2.png) --- */}
            <TabsContent value="status">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="py-10 space-y-8">
                <div className="space-y-4">
                  <Label className="text-[13px] font-medium tracking-wide text-[#efefef]">Enter Serial Number *</Label>
                  <Input placeholder="e.g. MRZ-FC-2024-XXXXX" className="bg-[#141414] border-white/10 h-16 rounded-none text-lg text-white focus:border-[#FDB813]" />
                  <p className="text-[#666] text-xs">Serial number is found on your product or warranty card</p>
                </div>
                <Button className="w-full h-14 bg-[#FDB813] hover:bg-[#e6a700] text-black font-bold  tracking-[2px] text-xs rounded-none">
                  Submit Warrenty Claim
                </Button>
              </motion.div>
            </TabsContent>

          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default WarrantyServices;