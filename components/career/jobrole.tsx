"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoveRight, Upload, X } from "lucide-react";

const jobs = [
  {
    dept: "DESIGN",
    location: "Gurugram, Haryana",
    type: "Full-time",
    title: "Designer",
    exp: "5-8 years experience",
  },
  {
    dept: "MARKETING",
    location: "Gurugram, Haryana",
    type: "Full-time",
    title: "Marketing",
    exp: "4-6 years experience",
  },
  {
    dept: "MANUFACTURING",
    location: "Faridabad, Haryana",
    type: "Full-time",
    title: "Manufacturing",
    exp: "3-5 years experience",
  },
  {
    dept: "SALES",
    location: "Mumbai, Maharashtra",
    type: "Full-time",
    title: "Sales",
    exp: "2-4 years experience",
  },
  {
    dept: "CUSTOMER SERVICE",
    location: "Gurugram, Haryana",
    type: "Full-time",
    title: "Customer Services",
    exp: "1-3 years experience",
  },
];

export default function CareersPositionsModal() {
  const [selectedJob, setSelectedJob] = useState<any>(null);

  return (
    <section className="w-full bg-black text-white">
      {/* Jobs Listing */}
      <div className="px-4 md:px-8 lg:px-12 py-16 md:py-20 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[10px] uppercase tracking-[0.42em] text-[#7d7d7d] mb-3">
            Let&apos;s Team Up
          </p>
          <h2 className="text-[42px] md:text-[56px] font-semibold tracking-[-0.03em] mb-3">
            All <span className="text-[#d39b10]">Positions</span>
          </h2>
          <p className="text-[14px] text-[#7a7a7a]">5 positions available</p>
        </div>

        <div>
          {jobs.map((job, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              viewport={{ once: true }}
              className="border-t border-[#2b2b2b] py-7 flex flex-col md:flex-row md:items-center md:justify-between gap-5"
            >
              <div>
                <p className="text-[11px] text-[#b97712] tracking-[0.18em] mb-3">
                  {job.dept}{" "}
                  <span className="text-[#666] normal-case tracking-normal">
                    • {job.location} • {job.type}
                  </span>
                </p>
                <h3 className="text-[28px] md:text-[34px] font-medium mb-2">
                  {job.title}
                </h3>
                <p className="text-[13px] text-[#6f6f6f]">{job.exp}</p>
              </div>

              <button
                onClick={() => setSelectedJob(job)}
                className="w-[140px] h-11 rounded-full bg-[#e6aa12] text-black text-[13px] font-medium flex items-center justify-center gap-2 hover:bg-[#d39b10]"
              >
                Apply Now <MoveRight size={14} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* General CTA */}
      <div className="bg-[#121212] px-4 md:px-8 py-16 text-center">
        <p className="text-[10px] uppercase tracking-[0.42em] text-[#7d7d7d] mb-4">
          Don&apos;t See Your Role?
        </p>
        <h3 className="text-[34px] md:text-[44px] font-semibold mb-4">
          Send a General Application
        </h3>
        <p className="text-[14px] text-[#7a7a7a] mb-8">
          We&apos;re always interested in meeting talented people. Drop your
          resume and we&apos;ll be in touch.
        </p>
        <button className="px-10 h-11 bg-[#e6aa12] text-black text-[13px] font-medium">
          careers@morzze.com
        </button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-3 md:p-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.35 }}
              className="w-full max-w-5xl bg-[#141414] border border-[#3a3a3a] p-5 md:p-8 relative max-h-[95vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-5 right-5 text-white"
              >
                <X />
              </button>

              <h2 className="text-[32px] md:text-[40px] font-medium mb-6">
                Senior Interior Designer
              </h2>
              <p className="text-[20px] mb-8">Apply for this Role</p>

              <div className="grid md:grid-cols-2 gap-5 mb-5">
                <Field label="Full Name *" placeholder="Your name" />
                <Field label="Phone no." placeholder="+91 XXXXXXXXXX" />
              </div>
              <Field label="Email Address *" placeholder="your@email.com" />
              <Field
                label="Linkedin / Portfolio URL"
                placeholder="Your Linkedin Profile"
              />

              <div className="mt-5">
                <label className="text-[12px] mb-2 block">Resume / CV *</label>
                <div className="h-[120px] border border-[#555555] flex flex-col items-center justify-center text-[#6f6f6f] text-[13px]">
                  <Upload className="mb-2" /> PDF or DOC, up to 5MB <br /> Click
                  to browse or drag and drop
                </div>
              </div>

              <div className="mt-5">
                <label className="text-[12px] mb-2 block">
                  Cover letter 500 words
                </label>
                <textarea
                  placeholder="Why are you excited about this role at Morzze ?"
                  className="w-full h-[150px] border border-[#555555] bg-transparent px-4 py-3 text-[14px] outline-none"
                />
              </div>

              <button className="w-full h-11 mt-6 bg-[#e6aa12] text-black text-[13px] font-semibold">
                Submit
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Field({ label, placeholder }: any) {
  return (
    <div className="mt-5">
      <label className="text-[12px] mb-2 block">{label}</label>
      <input
        placeholder={placeholder}
        className="w-full h-11 border border-[#555555] bg-transparent px-4 text-[14px] outline-none"
      />
    </div>
  );
}
