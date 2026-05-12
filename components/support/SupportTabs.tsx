"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  IconPhoneCall,
  IconQuestionMark,
  IconSettings,
  IconBrandWhatsapp,
  IconPhoneFilled,
} from "@tabler/icons-react";
import CallbackForm from "./CallbackForm";
import FAQSection from "./FAQSection";
import ServiceRequest from "./ServiceRequest";
import WhatsappChat from "./WhatsappChat";

const SupportTabs = () => {
  return (
    <section className="bg-black py-16 px-6 font-montserrat ">
      <Tabs defaultValue="callback" className="max-w-7xl mx-auto">
        {/* --- GRID TABS LIST --- */}
        <TabsList
          className=" grid grid-cols-2 md:grid-cols-4
    w-fit mx-auto
    gap-4
    bg-transparent
    h-auto
    mb-20
    p-0"
        >
          {/* Tab 1: Callback */}
          <TabsTrigger
            value="callback"
            className="group p-0 border-none data-active:ring-2 data-active:ring-[#559CFF] "
          >
            <div
              className="
      bg-[#111] w-full aspect-square p-6 flex flex-col justify-between  relative overflow-hidden
      transition-colors
      group-data-active:bg-[#559CFF]
    "
            >
              {/* TEXT */}
              <span
                className="
          text-white text-lg md:text-xl font-bold z-10
          group-data-active:text-black
        "
              >
                1. Request a <br /> Callback
              </span>

              {/* BIG ICON */}
              <IconPhoneFilled
                className="
    !w-[260px] !h-[260px]   // 🔥 override size-4
    absolute -bottom-20 -left-20
    text-white/30
    pointer-events-none
    z-0
    group-data-active:text-black
  "
                stroke={2.5}
              />
            </div>
          </TabsTrigger>

          {/* Tab 2: FAQ */}
          <TabsTrigger
            value="faq"
            className="group p-0 border-none data-active:ring-0"
          >
            <div
              className="
      bg-[#111] w-full aspect-square p-6 flex flex-col justify-between relative overflow-hidden
      transition-colors
      group-data-active:bg-[#FDB813]
    "
            >
              <span
                className="
        text-white text-lg md:text-xl font-bold text-left leading-tight z-10
        transition-colors
        group-data-active:text-black
      "
              >
                2. Frequently Asked <br /> Questions
              </span>

              <span
                className="
        absolute -bottom-2 -left-2 text-7xl font-black opacity-10 text-white
        transition-all
        group-data-active:text-black
        group-data-active:opacity-20
      "
              >
                FAQ
              </span>
            </div>
          </TabsTrigger>
          {/* Tab 3: Service Request */}
          <TabsTrigger
            value="service"
            className="group p-0 border-none data-active:ring-0 transition-all"
          >
            <div
              className="
      bg-[#111] w-full aspect-square p-6 flex flex-col justify-between relative overflow-hidden
      transition-colors
      group-data-active:bg-[#FEFFF1]
    "
            >
              {/* TEXT */}
              <span
                className="
        text-white text-lg md:text-xl font-bold text-left leading-tight z-10
        transition-colors
        group-data-active:text-black
      "
              >
                3. Service <br /> Request
              </span>

              {/* BIG BACKGROUND ICON */}
              <IconSettings
                className="
        !w-[200px] !h-[200px]
        absolute -bottom-9 -left-9
        text-white/30
        pointer-events-none
        z-0
        transition-all duration-300
        group-data-active:text-black/30
        group-hover:scale-105
      "
                stroke={2}
              />
            </div>
          </TabsTrigger>

          {/* Tab 4: Whatsapp */}
          <TabsTrigger
            value="whatsapp"
            className="group p-0 border-none data-active:ring-0 transition-all"
          >
            <div
              className="
      bg-[#111] w-full aspect-square p-6 flex flex-col justify-between relative overflow-hidden
      transition-colors
      group-data-active:bg-[#25D366]
    "
            >
              {/* TEXT */}
              <span
                className="
        text-white text-lg md:text-xl font-bold text-left leading-tight z-10
        transition-colors
        group-data-active:text-black
      "
              >
                4. Whatsapp
              </span>

              {/* BIG BACKGROUND ICON */}
              <IconBrandWhatsapp
                className="
        !w-[200px] !h-[200px]
        absolute -bottom-6 -left-6
        text-white/30
        pointer-events-none
        z-0
        transition-all duration-300
        group-data-active:text-black/30
        group-hover:scale-105
      "
                stroke={2}
              />
            </div>
          </TabsTrigger>
        </TabsList>

        {/* --- TABS CONTENT --- */}
        <div className="md:mt-50 mt-70 ">
          <TabsContent value="callback">
            <CallbackForm />
          </TabsContent>
          <TabsContent value="faq">
            <FAQSection />
          </TabsContent>
          <TabsContent value="service">
            <ServiceRequest />
          </TabsContent>
          <TabsContent value="whatsapp">
            <WhatsappChat />
          </TabsContent>
        </div>
      </Tabs>
    </section>
  );
};

export default SupportTabs;
