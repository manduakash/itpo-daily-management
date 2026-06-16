"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  Flag, 
  FileCheck, 
  UploadCloud, 
  ShieldCheck, 
  Sparkles,
  Trophy,
  AlertCircle,
  Camera,
  HardHat,
  ChevronRight,
  Building2,
  ArrowRight,
  History,
  FileText,
  Trash2,
  ImageIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

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
    <div className="space-y-12 animate-in fade-in duration-1000 pb-20 font-sans selection:bg-indigo-100 p-10">
      
      {/* APEX SECRETARIAT HEADER */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 relative">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-2 border-emerald-200">
            <CheckCircle2 size={14} className="animate-pulse" /> Phase: Completion & Handover
          </div>
          <h1 className="text-6xl font-black text-slate-800 tracking-tighter uppercase leading-none">Project <span className="text-emerald-600">Closure</span></h1>
          <p className="text-slate-500 font-medium text-xl italic underline underline-offset-8 decoration-emerald-200">
            Formal site handover, technical verification, and ITPO secretariat sign-off.
          </p>
        </div>

        <div className="flex gap-4">
          <div className="h-16 px-8 rounded-3xl border-2 border-emerald-100 bg-white flex items-center gap-4 shadow-xl">
             <div className="h-10 w-10 rounded-2xl bg-emerald-500 flex items-center justify-center text-white">
                <Trophy size={20} />
             </div>
             <div className="flex flex-col">
               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Tasks Finished</span>
               <span className="text-xl font-black text-slate-800">12 / 12</span>
             </div>
          </div>
        </div>
      </div>

      {/* ACTION TILES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Verification Progress", value: "100%", subtitle: "Field checks done", icon: ShieldCheck, color: "from-emerald-500 to-teal-600" },
          { title: "Handover Readiness", value: "Ready", subtitle: "All docs prepared", icon: Flag, color: "from-blue-500 to-indigo-600" },
          { title: "Pending Audits", value: "00", subtitle: "Secretariat level", icon: FileCheck, color: "from-slate-700 to-slate-900" }
        ].map((item, i) => (
          <div key={i} className={`group relative p-8 rounded-[32px] overflow-hidden transition-all duration-500 h-44 flex flex-col justify-between shadow-lg bg-gradient-to-br ${item.color} text-white`}>
            <div className="absolute inset-0 opacity-90 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/diagonal-striped-brick.png')]" />
            <div className="relative z-10 flex flex-col justify-between h-full w-full">
              <div className="h-10 w-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                <item.icon size={20} className="text-white" />
              </div>
              <div>
                <p className="text-4xl font-black tracking-tighter leading-none">{item.value}</p>
                <div className="flex flex-col gap-0.5 mt-2">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-95">{item.title}</p>
                  <p className="text-[9px] font-medium opacity-75 uppercase tracking-wider">{item.subtitle}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column: Form Section */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="space-y-10"
              >
                <Card className="rounded-[48px] border-none shadow-xl overflow-hidden bg-white p-0">
                  <CardHeader className="p-0">
                    <div className="p-8 bg-gradient-to-r from-slate-800 to-slate-950 text-white relative overflow-hidden">
                      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                      <div className="relative z-10 flex items-center gap-4">
                        <Building2 className="text-emerald-400" />
                        <CardTitle className="text-lg font-black uppercase tracking-widest">Handover Identification</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-50/30">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Assignment ID</label>
                      <select className="w-full h-14 px-5 bg-white border-2 border-slate-100 rounded-2xl text-xs font-black uppercase tracking-widest appearance-none focus:border-emerald-500 outline-none transition-all">
                        <option>CON-7721: ELECTRICAL PANEL HALL 3</option>
                        <option>CON-8102: PLUMBING ZONE B</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Final Completion Date</label>
                      <input type="date" defaultValue="2024-10-25" className="w-full h-14 px-5 bg-white border-2 border-slate-100 rounded-2xl text-xs font-black uppercase tracking-widest focus:border-emerald-500 outline-none transition-all" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-[48px] border-none shadow-xl overflow-hidden bg-white">
                  <div className="p-10 bg-slate-50/30 space-y-8">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Handover Checklist Verification</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "Site Debris Cleared", "Safety Equipment Removed", 
                        "Final Testing Successful", "As-Built Drawings Ready", 
                        "Inventory Handed Over", "Operational Training Done"
                      ].map((item, i) => (
                        <label key={i} className="flex items-center gap-4 p-5 bg-white border-2 border-slate-100 rounded-3xl cursor-pointer hover:border-emerald-500 transition-all group">
                          <input type="checkbox" className="w-5 h-5 rounded-md accent-emerald-600" />
                          <span className="text-[11px] font-black text-slate-600 uppercase tracking-tight group-hover:text-emerald-700">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </Card>

                <Button 
                  onClick={() => setStep(2)}
                  className="w-full h-20 rounded-[32px] bg-slate-900 text-white font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl hover:bg-emerald-600 border-none transition-all gap-3"
                >
                  NEXT: EVIDENCE & DOCUMENTATION <ArrowRight size={20} />
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="space-y-10"
              >
                <Card className="rounded-[48px] border-none shadow-xl overflow-hidden bg-white text-center">
                  <div className="p-12 space-y-8 bg-slate-50/30">
                    <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-[32px] flex items-center justify-center mx-auto shadow-inner border-2 border-emerald-200">
                      <UploadCloud size={48} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-black uppercase tracking-tight">Technical Evidence</h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Upload certified site photos and technical reports</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <button className="p-10 border-4 border-dashed border-slate-200 rounded-[40px] flex flex-col items-center gap-4 hover:border-emerald-500 hover:bg-white transition-all group">
                        <ImageIcon className="text-slate-300 group-hover:text-emerald-500" size={32} />
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Post-Completion Photos</span>
                      </button>
                      <button className="p-10 border-4 border-dashed border-slate-200 rounded-[40px] flex flex-col items-center gap-4 hover:border-emerald-500 hover:bg-white transition-all group">
                        <FileCheck className="text-slate-300 group-hover:text-emerald-500" size={32} />
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">As-Built PDF Package</span>
                      </button>
                    </div>
                  </div>
                </Card>

                <div className="flex gap-4">
                  <Button onClick={() => setStep(1)} className="h-20 flex-1 rounded-[32px] bg-white border-2 border-slate-200 text-slate-400 font-black uppercase tracking-widest text-[11px]">Back</Button>
                  <Button 
                    onClick={handleFinish}
                    disabled={isSubmitting}
                    className="h-20 flex-[2] rounded-[32px] bg-emerald-600 text-white font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl border-none transition-all"
                  >
                    {isSubmitting ? "SYNCING WITH SECRETARIAT..." : "CONFIRM & REQUEST CLOSURE"}
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="bg-white border-none p-16 rounded-[48px] shadow-2xl text-center space-y-8"
              >
                <div className="w-28 h-28 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(16,185,129,0.4)]">
                  <CheckCircle2 size={56} />
                </div>
                <div className="space-y-3">
                  <h3 className="text-4xl font-black uppercase tracking-tight">Closure Initiated</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] max-w-sm mx-auto">
                    Report sent to ITPO Secretariat. Site inspection scheduled within 48 hours.
                  </p>
                </div>
                <Button onClick={() => setStep(1)} className="h-16 px-12 bg-slate-900 text-white rounded-3xl font-black uppercase tracking-widest text-[10px]">Return to Console</Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-10">
          
          {/* Handover Flow Card */}
          <Card className="rounded-[40px] border-none shadow-xl bg-slate-900 text-white overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
               <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-400">Handover Flow</h3>
               <ShieldCheck size={18} className="text-slate-500" />
            </div>
            <div className="p-8 space-y-8 relative">
              <div className="absolute left-10 top-8 bottom-8 w-px bg-white/10" />
              {[
                { title: "NBCC COMPLETION", desc: "Form & Docs submission", active: true },
                { title: "ITPO VERIFICATION", desc: "Physical site inspection", active: false },
                { title: "FINAL APPROVAL", desc: "Digital sign-off", active: false },
                { title: "PROJECT CLOSED", desc: "System archive", active: false },
              ].map((f, i) => (
                <div key={i} className={cn("relative pl-8 transition-opacity", f.active ? 'opacity-100' : 'opacity-30')}>
                  <div className={cn("absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full ring-4 ring-slate-900", f.active ? 'bg-emerald-500' : 'bg-slate-700')} />
                  <p className="text-xs font-black text-slate-100 uppercase tracking-tight">{f.title}</p>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">{f.desc}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Guidelines Widget */}
          <Card className="rounded-[40px] border-none shadow-xl bg-white p-8 space-y-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="text-amber-500" size={20} />
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Mandatory Guidelines</h4>
            </div>
            <ul className="space-y-4">
              {[
                "Attach at least 4 photos showing different angles.",
                "Verify all electricity points are operational.",
                "Ensure no tools are left in public walkways.",
                "Handover manual keys if applicable."
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3 text-[10px] font-bold text-slate-600 uppercase tracking-tight leading-relaxed">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1 shrink-0" /> {text}
                </li>
              ))}
            </ul>
          </Card>

          {/* Contact Support */}
          <div className="bg-indigo-600 p-8 rounded-[40px] text-white flex items-center justify-between group cursor-pointer hover:bg-indigo-700 transition-all shadow-xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-2xl"><HardHat size={24} /></div>
              <div>
                <p className="text-[9px] font-black opacity-60 uppercase tracking-widest">PMU Office</p>
                <p className="text-sm font-black uppercase tracking-tight">Contact Support</p>
              </div>
            </div>
            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </div>

        </div>
      </div>
    </div>
  );
}