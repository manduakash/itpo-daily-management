"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  Users, 
  Hammer, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar as CalendarIcon,
  Plus,
  X,
  Clock,
  Save,
  Send,
  Building2,
  FileText,
  Activity,
  Trash2,
  HardHat
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Mock Projects ---
const projects = [
  { id: "CON-9901", title: "CONVENTION HALL 1: FLOORING" },
  { id: "CON-9905", title: "VVIP LOUNGE: HVAC" },
  { id: "CON-9844", title: "EXTERNAL FACADE LIGHTING" },
];

export default function DailyProgress() {
  const [selectedProject, setSelectedProject] = useState(projects[0].id);
  const [progress, setProgress] = useState(65);
  const [photos, setPhotos] = useState<number[]>([]);

  const addPhoto = () => setPhotos([...photos, Date.now()]);
  const removePhoto = (id: number) => setPhotos(photos.filter(p => p !== id));

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-20 font-sans selection:bg-indigo-100 p-10 bg-[#fcfdfe]">
      
      {/* APEX SECRETARIAT HEADER */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 relative">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-2 border-indigo-200">
            <Activity size={14} className="animate-pulse" /> Official Daily Report
          </div>
          <h1 className="text-6xl font-black text-slate-800 tracking-tighter uppercase leading-none">Execution <span className="text-indigo-600">Console</span></h1>
          <p className="text-slate-500 font-medium text-xl italic underline underline-offset-8 decoration-indigo-200">
            Site-level progress logging, manpower auditing, and technical verification.
          </p>
        </div>

        <div className="flex gap-4">
          <Button 
            variant="outline"
            className="h-16 px-8 rounded-3xl border-2 border-slate-100 bg-white font-black uppercase tracking-widest text-[10px] text-slate-400 shadow-xl hover:bg-slate-50 transition-all"
          >
            <Save size={20} className="mr-2" /> Save Draft
          </Button>
          <Button 
            className="h-16 px-10 rounded-3xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-black uppercase tracking-widest text-[10px] shadow-2xl hover:shadow-[0_0_20px_theme(colors.indigo.400)] transition-all gap-2 group border-none"
          >
            <Send size={20} className="text-indigo-100" /> Submit DPR
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* LEFT COLUMN: PRIMARY WORK LOG */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* CONTRACT SELECTOR */}
          <Card className="rounded-[48px] border-none shadow-xl bg-white overflow-hidden p-10 space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Select Active Contract</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {projects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedProject(p.id)}
                  className={cn(
                    "relative p-6 rounded-[32px] text-left border-4 transition-all duration-300 overflow-hidden",
                    selectedProject === p.id 
                    ? "border-indigo-600 bg-indigo-600 text-white shadow-2xl scale-105" 
                    : "border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-100"
                  )}
                >
                  {selectedProject === p.id && (
                    <div className="absolute inset-0 opacity-40 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/diagonal-striped-brick.png')]" />
                  )}
                  <div className="relative z-10">
                    <p className={cn("text-[9px] font-black tracking-widest uppercase mb-1", selectedProject === p.id ? "text-indigo-100" : "text-slate-400")}>{p.id}</p>
                    <p className="text-xs font-black leading-tight tracking-tight uppercase">{p.title}</p>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* WORK LOG & PROGRESS */}
          <Card className="rounded-[48px] border-none shadow-xl overflow-hidden bg-white">
            <CardHeader className="p-0">
              <div className="p-8 bg-gradient-to-r from-slate-800 to-indigo-950 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                <div className="relative z-10 flex items-center gap-4">
                  <FileText className="text-indigo-400" />
                  <CardTitle className="text-lg font-black uppercase tracking-widest">Achievement Log</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-10 space-y-10 bg-slate-50/30">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Daily Work Accomplished</label>
                <textarea 
                  placeholder="DESCRIBE COMPLETED TASKS, MATERIALS USED, AND SITE AREAS COVERED..."
                  className="w-full min-h-[180px] p-8 bg-white border-2 border-slate-100 rounded-[40px] text-xs font-bold focus:border-indigo-500 focus:outline-none shadow-sm transition-all uppercase tracking-widest leading-relaxed"
                />
              </div>

              {/* PROGRESS TRACKER */}
              <div className="space-y-6 pt-6 border-t border-slate-100">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Live Completion Status</label>
                  <span className="text-4xl font-black text-indigo-600 tracking-tighter">{progress}%</span>
                </div>
                <input 
                  type="range" min="0" max="100" value={progress}
                  onChange={(e) => setProgress(parseInt(e.target.value))}
                  className="w-full h-3 bg-white border-2 border-slate-100 rounded-full appearance-none cursor-pointer accent-indigo-600 shadow-inner"
                />
                <div className="flex justify-between text-[8px] font-black text-slate-400 uppercase tracking-[0.3em]">
                  <span>0% Startup</span>
                  <span>50% Mid-Phase</span>
                  <span>100% Handover</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: RESOURCE & MEDIA LEDGER */}
        <div className="space-y-10">
          
          {/* RESOURCE LEDGER */}
          <Card className="rounded-[40px] border-none shadow-xl bg-white p-8 space-y-6">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
              <Users size={16} className="text-indigo-600" /> Resource Ledger
            </h3>
            <div className="space-y-4">
              {[
                { label: "Skilled Labor", icon: HardHat, color: "bg-indigo-50 text-indigo-600 border-indigo-100" },
                { label: "General Labor", icon: Users, color: "bg-slate-50 text-slate-600 border-slate-100" },
                { label: "Machinery/Tools", icon: Hammer, color: "bg-amber-50 text-amber-600 border-amber-100" }
              ].map((res, i) => (
                <div key={i} className={cn("flex items-center justify-between p-5 rounded-3xl border-2", res.color)}>
                  <div className="flex items-center gap-3">
                    <res.icon size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{res.label}</span>
                  </div>
                  <input type="number" defaultValue="0" className="w-16 bg-white border-2 border-slate-100 rounded-xl text-center text-xs font-black py-2 focus:border-indigo-400 outline-none" />
                </div>
              ))}
            </div>
          </Card>

          {/* MEDIA VERIFICATION */}
          <Card className="rounded-[40px] border-none shadow-xl bg-white p-8 space-y-6">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
              <Camera size={16} className="text-indigo-600" /> Media Verification
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <AnimatePresence>
                {photos.map((id) => (
                  <motion.div 
                    key={id} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    className="relative aspect-square bg-slate-100 rounded-[32px] overflow-hidden group border-2 border-slate-50"
                  >
                    <img src={`https://api.dicebear.com/7.x/shapes/svg?seed=${id}`} alt="Site" className="object-cover w-full h-full opacity-50" />
                    <button 
                      onClick={() => removePhoto(id)}
                      className="absolute inset-0 bg-rose-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={24} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              <button 
                onClick={addPhoto}
                className="aspect-square border-4 border-dashed border-slate-100 rounded-[32px] flex flex-col items-center justify-center gap-3 text-slate-300 hover:text-indigo-600 hover:border-indigo-400 hover:bg-indigo-50 transition-all group"
              >
                <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-white">
                  <Plus size={24} />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest">Add Frame</span>
              </button>
            </div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center">Formal Site Media Proof (Max 6)</p>
          </Card>

          {/* SAFETY BLOCKERS */}
          <div className="bg-rose-50 border-2 border-rose-200 p-8 rounded-[40px] space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <AlertTriangle size={20} />
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Safety & Blockers</h3>
            </div>
            <textarea 
              placeholder="ANY SAFETY INCIDENTS OR EXECUTION BLOCKERS?"
              className="w-full bg-transparent border-none text-[11px] font-bold text-rose-800 placeholder:text-rose-300 focus:outline-none resize-none uppercase tracking-tight leading-relaxed"
              rows={4}
            />
          </div>

        </div>
      </div>
    </div>
  );
}