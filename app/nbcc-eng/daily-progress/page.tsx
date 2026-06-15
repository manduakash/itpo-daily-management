"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Camera, 
  Send, 
  Users, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Trash2,
  Calendar,
  FileText,
  Activity,
  MapPin,
  Building2,
  PlusCircle,
  History,
  HardHat
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DailyProgressPage() {
  const [progress, setProgress] = useState(50);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-20 font-sans selection:bg-indigo-100 p-10">
      
      {/* APEX SECRETARIAT HEADER */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 relative">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-2 border-indigo-200">
            <Activity size={14} className="animate-pulse" /> Field Execution Report
          </div>
          <h1 className="text-6xl font-black text-slate-800 tracking-tighter uppercase leading-none">Daily <span className="text-indigo-600">Logger</span></h1>
          <p className="text-slate-500 font-medium text-xl italic underline underline-offset-8 decoration-indigo-200">
            Official work log submission for PMC oversight and material verification.
          </p>
        </div>

        <div className="flex gap-4">
          <div className="h-16 px-8 rounded-3xl border-2 border-slate-100 bg-white flex items-center gap-4 shadow-xl">
             <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
             <div className="flex flex-col">
               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active Shift</span>
               <span className="text-[11px] font-bold text-slate-700">09:00 AM - 06:00 PM</span>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column: Form Section */}
        <div className="lg:col-span-2 space-y-10">
          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* SECTION 1: CONTRACT SPECIFICS */}
            <Card className="rounded-[48px] border-none shadow-xl overflow-hidden bg-white">
              <CardHeader className="p-0">
                <div className="p-8 bg-gradient-to-r from-slate-800 to-indigo-950 text-white relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                  <div className="relative z-10 flex items-center gap-4">
                    <FileText className="text-indigo-400" />
                    <CardTitle className="text-lg font-black uppercase tracking-widest">Contract Specifics</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-50/30">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Active Assignment</label>
                  <select className="w-full h-14 px-5 bg-white border-2 border-slate-100 rounded-2xl text-xs font-black focus:border-indigo-500 focus:outline-none appearance-none shadow-sm transition-all uppercase tracking-wider">
                    <option>CON-7721: ELECTRICAL PANEL HALL 3</option>
                    <option>CON-8102: PLUMBING ZONE B</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Work Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-indigo-500" size={18} />
                    <input disabled value="BHARAT MANDAPAM - HALL 3, LEVEL 1" className="w-full h-14 pl-14 bg-slate-100 border-2 border-slate-100 rounded-2xl text-xs font-black text-slate-500 uppercase tracking-wider" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SECTION 2: EXECUTION METRICS */}
            <Card className="rounded-[48px] border-none shadow-xl overflow-hidden bg-white">
              <CardHeader className="p-0">
                <div className="p-8 bg-gradient-to-r from-slate-800 to-slate-900 text-white relative overflow-hidden">
                   <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                   <div className="relative z-10 flex items-center gap-4">
                    <Activity className="text-emerald-400" />
                    <CardTitle className="text-lg font-black uppercase tracking-widest">Execution Metrics</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-10 space-y-8 bg-slate-50/30">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Work Achievement Description</label>
                  <textarea 
                    placeholder="ENTER DETAILED LOG OF COMPLETED TASKS..." 
                    rows={4}
                    className="w-full p-6 bg-white border-2 border-slate-100 rounded-[32px] text-xs font-bold focus:border-indigo-500 focus:outline-none shadow-sm transition-all uppercase tracking-widest"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: "Skilled Labor", icon: Users, color: "text-indigo-600" },
                    { label: "Unskilled", icon: Users, color: "text-amber-600" },
                    { label: "Incidents", icon: AlertTriangle, color: "text-rose-600" }
                  ].map((item, i) => (
                    <div key={i} className="p-6 bg-white rounded-3xl border-2 border-slate-100 shadow-sm group hover:border-indigo-200 transition-all">
                      <div className={cn("flex items-center gap-2 mb-3", item.color)}>
                        <item.icon size={16} /> 
                        <span className="text-[9px] font-black uppercase tracking-widest">{item.label}</span>
                      </div>
                      <input type="number" placeholder="0" className="text-3xl font-black w-full outline-none bg-transparent" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* SECTION 3: MEDIA VERIFICATION */}
            <Card className="rounded-[48px] border-none shadow-xl overflow-hidden bg-white">
              <div className="p-10 bg-slate-50/30">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Site Media Verification</h3>
                  <Badge className="bg-indigo-100 text-indigo-700 border-none font-black text-[9px]">MAX 5 PHOTOS</Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <button type="button" className="aspect-square rounded-[32px] border-4 border-dashed border-slate-200 flex flex-col items-center justify-center gap-3 text-slate-400 hover:border-indigo-400 hover:text-indigo-600 hover:bg-white transition-all group">
                    <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                      <Camera size={24} />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest">Add Frame</span>
                  </button>
                  <div className="aspect-square rounded-[32px] bg-slate-200 overflow-hidden relative group border-4 border-white shadow-lg">
                    <img src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=300" alt="work" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-indigo-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Trash2 className="text-white cursor-pointer" size={24} />
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Button 
              disabled={isSubmitting}
              className={cn(
                "w-full h-20 rounded-[32px] font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl transition-all flex items-center justify-center gap-4 border-none",
                isSubmitting ? "bg-slate-400" : "bg-slate-900 text-white hover:bg-indigo-600"
              )}
            >
              {isSubmitting ? "SYNCING WITH SECRETARIAT..." : <>SUBMIT DAILY PROGRESS LOG <Send size={20} /></>}
            </Button>
          </form>
        </div>

        {/* Right Column: Status & Audit Trail */}
        <div className="space-y-10">
          
          {/* OVERALL COMPLETION TRACKER */}
          <Card className="rounded-[40px] border-none shadow-xl bg-white overflow-hidden group">
            <div className="p-8 bg-gradient-to-br from-indigo-600 to-blue-700 text-white relative">
               <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/diagonal-striped-brick.png')]" />
               <div className="relative z-10 space-y-6">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Completion Estimate</h3>
                  <div className="text-6xl font-black tracking-tighter">{progress}%</div>
                  <input 
                    type="range" min="0" max="100" value={progress} 
                    onChange={(e) => setProgress(parseInt(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white" 
                  />
                  <p className="text-[9px] font-bold uppercase tracking-widest opacity-60 italic">Manual field assessment by engineer</p>
               </div>
            </div>
          </Card>

          {/* AUDIT TRAIL LOG */}
          <Card className="rounded-[40px] border-none shadow-xl bg-slate-900 text-white overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
               <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-400">Recent Logs</h3>
               <History size={16} className="text-slate-500" />
            </div>
            <div className="p-8 space-y-8 relative">
              <div className="absolute left-10 top-8 bottom-8 w-px bg-white/10" />
              {[
                { date: "YESTERDAY", status: "APPROVED", activity: "MAIN PANEL WIRING COMPLETED", color: "bg-emerald-500" },
                { date: "22 OCT", status: "FLAGGED", activity: "MATERIAL SHORTAGE: 2.5MM WIRE", color: "bg-rose-500" },
                { date: "21 OCT", status: "APPROVED", activity: "INTERNAL CONDUIT MAPPING DONE", color: "bg-emerald-500" },
              ].map((log, i) => (
                <div key={i} className="relative pl-8">
                  <div className={cn("absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full ring-4 ring-slate-900", log.color)} />
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{log.date} • {log.status}</p>
                  <p className="text-xs font-bold text-slate-200 leading-relaxed uppercase tracking-tight">{log.activity}</p>
                </div>
              ))}
            </div>
            <Button className="w-full h-14 bg-white/5 hover:bg-white/10 text-white rounded-none border-t border-white/5 text-[9px] font-black uppercase tracking-widest">
              View Global History
            </Button>
          </Card>

          {/* SAFETY REMINDER */}
          <div className="bg-amber-50 border-2 border-amber-200 p-8 rounded-[40px] flex items-start gap-5">
            <div className="h-12 w-12 rounded-2xl bg-amber-200 text-amber-700 flex items-center justify-center shrink-0">
              <AlertTriangle size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-amber-800 uppercase tracking-widest">Safety Protocol</p>
              <p className="text-xs font-bold text-amber-700/80 mt-2 leading-relaxed uppercase">
                High voltage testing scheduled for tomorrow. Ensure all safety barricades are logged.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}