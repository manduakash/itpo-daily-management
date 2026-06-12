"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  Flag, 
  FileCheck, 
  Image as ImageIcon, 
  UploadCloud, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  Trophy,
  AlertCircle,
  Camera,
  HardHat,
  ChevronRight
} from "lucide-react";

// --- Framer Motion Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } }
};

export default function CompletionPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFinish = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3); // Success Screen
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-10 text-slate-800">
      
      {/* Header Section */}
      <motion.div 
        initial="hidden" animate="visible" variants={fadeInUp}
        className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-emerald-500 rounded-lg shadow-lg shadow-emerald-200">
              <CheckCircle2 className="text-white" size={20} />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.3em] text-emerald-600">Phase: Completion & Handover</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-800">Final <span className="text-emerald-600">Project Closure</span></h1>
          <p className="text-slate-500 font-medium mt-1 text-sm md:text-base">Submit final reports and handover the site for ITPO inspection.</p>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white">
           <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase">Tasks Finished</p>
              <p className="text-xl font-black text-slate-800">12 / 12</p>
           </div>
           <div className="w-12 h-12 rounded-full border-4 border-emerald-500 border-t-transparent flex items-center justify-center p-1">
              <Trophy className="text-emerald-500" size={18} />
           </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left: Completion Form */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="lg:col-span-2 space-y-8">
          
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                {/* Contract Selection */}
                <div className="bg-white/70 backdrop-blur-xl border border-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/40">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Flag className="text-indigo-600" /> Select Contract to Close
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Assignment ID</label>
                      <select className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-500/20 focus:outline-none appearance-none">
                        <option>CON-7721: Electrical Panel Hall 3</option>
                        <option>CON-8102: Plumbing Zone B</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Actual Completion Date</label>
                      <input type="date" defaultValue="2024-10-25" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold" />
                    </div>
                  </div>
                </div>

                {/* Checklist Card */}
                <div className="bg-gradient-to-br from-emerald-50 via-white to-white border border-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/40">
                  <h3 className="text-xl font-bold mb-6">Handover Checklist</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "Site Debris Cleared", 
                      "Safety Equipment Removed", 
                      "Final Testing Successful", 
                      "As-Built Drawings Ready", 
                      "Inventory Handed Over",
                      "Operational Training Done"
                    ].map((item, i) => (
                      <label key={i} className="flex items-center gap-3 p-4 bg-white/50 border border-slate-100 rounded-2xl cursor-pointer hover:bg-emerald-50 transition-all group">
                        <input type="checkbox" className="w-5 h-5 rounded-md accent-emerald-600" />
                        <span className="text-sm font-bold text-slate-600 group-hover:text-emerald-700">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => setStep(2)}
                  className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-sm shadow-2xl hover:bg-emerald-600 transition-all flex items-center justify-center gap-3"
                >
                  Next: Evidence & Docs <ArrowRight size={18} />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                {/* Evidence Upload */}
                <div className="bg-white/70 backdrop-blur-xl border border-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/40 text-center">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <UploadCloud size={40} />
                  </div>
                  <h3 className="text-2xl font-black mb-2">Final Documentation</h3>
                  <p className="text-slate-500 text-sm mb-8">Upload Completion Certificate, As-Built Drawings, and Site Photos.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button className="p-6 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center gap-2 hover:border-emerald-500 hover:bg-emerald-50 transition-all">
                      <ImageIcon className="text-slate-400" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Site Photos (After)</span>
                    </button>
                    <button className="p-6 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center gap-2 hover:border-emerald-500 hover:bg-emerald-50 transition-all">
                      <FileCheck className="text-slate-400" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">PDF Technical Reports</span>
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="flex-1 py-5 bg-white border border-slate-200 rounded-[2rem] font-black uppercase tracking-widest text-xs text-slate-500">Back</button>
                  <button 
                    onClick={handleFinish}
                    disabled={isSubmitting}
                    className="flex-[2] py-5 bg-emerald-600 text-white rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-2xl shadow-emerald-200 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? "Processing..." : <>Confirm & Request Closure <Sparkles size={18} /></>}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="bg-white border border-white p-12 rounded-[3rem] shadow-2xl text-center space-y-6"
              >
                <div className="w-24 h-24 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-xl shadow-emerald-200">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-3xl font-black text-slate-800">Report Submitted!</h3>
                <p className="text-slate-500 font-medium max-w-sm mx-auto">
                  Your project completion report has been sent to ITPO. They will schedule a site inspection within 48 hours.
                </p>
                <button onClick={() => setStep(1)} className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm">Return to Dashboard</button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Right Sidebar: Guidelines & Flow */}
        <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="space-y-8">
          
          {/* Closure Flow Card */}
          <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-900/20 relative overflow-hidden border border-slate-800">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><ShieldCheck className="text-emerald-400" size={20} /> Handover Flow</h3>
            <div className="space-y-6 relative border-l border-white/10 ml-2 pl-6">
              {[
                { title: "NBCC Completion", desc: "Form & Docs submission", active: true },
                { title: "ITPO Verification", desc: "Physical site inspection", active: false },
                { title: "Final Approval", desc: "Digital sign-off", active: false },
                { title: "Project Closed", desc: "System archive", active: false },
              ].map((f, i) => (
                <div key={i} className={`relative ${f.active ? 'opacity-100' : 'opacity-40'}`}>
                  <div className={`absolute -left-[1.9rem] top-1 w-2.5 h-2.5 rounded-full ${f.active ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                  <p className="text-sm font-bold text-slate-100 leading-tight">{f.title}</p>
                  <p className="text-[10px] font-medium text-slate-400 uppercase tracking-tighter">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Guidelines Card */}
          <div className="bg-white/70 backdrop-blur-xl border border-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/40">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><AlertCircle className="text-amber-500" size={20} /> Guidelines</h3>
            <ul className="space-y-3">
              {[
                "Attach at least 4 photos showing different angles.",
                "Verify all electricity points are operational.",
                "Ensure no tools are left in public walkways.",
                "Handover manual keys if applicable."
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-2 text-xs font-bold text-slate-500">
                  <div className="w-1 h-1 bg-indigo-500 rounded-full mt-1.5 shrink-0" /> {text}
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Support */}
          <div className="bg-indigo-600 p-6 rounded-[2.5rem] text-white flex items-center justify-between group cursor-pointer hover:bg-indigo-700 transition-all">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-xl"><HardHat size={20} /></div>
              <div>
                <p className="text-xs font-bold opacity-80 uppercase tracking-tighter">Support Engineer</p>
                <p className="text-sm font-bold">Contact PMU Office</p>
              </div>
            </div>
            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </div>

        </motion.div>
      </div>
    </div>
  );
}