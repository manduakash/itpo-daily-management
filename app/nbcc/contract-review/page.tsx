"use client";

import React, { useState, useEffect } from "react";
import { 
  FileSearch, HardHat, ExternalLink, Users, 
  ArrowUpRight, ShieldCheck, Clock, X, 
  CheckCircle2, AlertTriangle, Download, 
  Search, Info, History, Filter, 
  Briefcase, Activity, Target, Zap
} from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// --- Status Badge Helper (ITPO Style) ---
function ReviewStatusBadge({ priority }: { priority: string }) {
  const styles: Record<string, string> = {
    "Critical": "bg-rose-100 text-rose-700 border-rose-200",
    "High": "bg-orange-100 text-orange-700 border-orange-200",
    "Medium": "bg-amber-100 text-amber-700 border-amber-200",
    "Low": "bg-emerald-100 text-emerald-700 border-emerald-200",
  };

  return (
    <Badge variant="outline" className={cn("text-[9px] font-black uppercase tracking-widest px-3 py-0.5 border-2 rounded-full", styles[priority] || "bg-slate-100 text-slate-700")}>
      {priority} Priority
    </Badge>
  );
}

const kpiStats = [
  { title: "Pending Review", value: "14", subtitle: "Awaiting Classification", icon: FileSearch, color: "from-amber-500 to-orange-600", alert: true },
  { title: "Direct NBCC", value: "09", subtitle: "Small Scale Internal", icon: HardHat, color: "from-blue-600 to-indigo-700" },
  { title: "Forwarded Partner", value: "22", subtitle: "SPCL / External PMC", icon: ExternalLink, color: "from-emerald-500 to-teal-600" },
];

const initialQueue = [
  { id: "CON-2025-401", title: "G20 Plenary Hall HVAC Tuning", priority: "Critical", type: "Mechanical", source: "ITPO Raised", daysLeft: "2 Days", description: "Calibration of central cooling units in the main plenary hall for upcoming summit." },
  { id: "CON-2025-412", title: "External Pathway Granite Repair", priority: "Medium", type: "General Civil", source: "ITPO Raised", daysLeft: "14 Days", description: "Stone replacement and leveling of the VIP entrance pathway." },
  { id: "CON-2025-418", title: "Main Entrance Digital Signage", priority: "High", type: "Electrical", source: "ITPO Raised", daysLeft: "5 Days", description: "Installation of 4K LED displays for information broadcasting at Gate 1." }
];

export default function NBCCProfessionalReview() {
  const [mounted, setMounted] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [classification, setClassification] = useState<string>("");

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-20 font-sans selection:bg-indigo-100 p-10 bg-slate-50/30 min-h-screen relative">
      
      {/* ─── APEX SECRETARIAT HEADER ──────────────────────────── */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 relative">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-2 border-indigo-200">
            <ShieldCheck size={14} className="animate-pulse" /> NBCC Technical Audit
          </div>
          <h1 className="text-6xl font-black text-slate-800 tracking-tighter uppercase leading-none">Review Portal</h1>
          <p className="text-slate-500 font-medium text-xl italic underline underline-offset-8 decoration-indigo-200">
            Classifying high-value infrastructure requests under Case 2 Secretariat Protocol.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="relative group hidden md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            <input 
              placeholder="Search Queue ID..." 
              className="h-16 w-80 pl-12 pr-6 rounded-3xl border-2 border-slate-200 bg-white font-bold text-sm focus:border-indigo-500 outline-none transition-all shadow-lg"
            />
          </div>
          <Button variant="outline" className="h-16 px-8 rounded-3xl border-2 border-indigo-200 font-black uppercase tracking-widest text-[10px] text-indigo-700 bg-white shadow-xl hover:bg-indigo-50 transition-all">
            <Download size={20} className="mr-2" /> Export Audit Logs
          </Button>
        </div>
      </div>

      {/* ─── KPI ACTION TILES ─────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpiStats.map((item, i) => (
          <div key={i} className={`group relative p-8 rounded-[32px] overflow-hidden transition-all duration-500 h-44 flex flex-col justify-between shadow-lg bg-gradient-to-br ${item.color} text-white`}>
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/diagonal-striped-brick.png')]" />
            <div className="relative z-10 flex flex-col justify-between h-full w-full">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                  <item.icon size={20} className="text-white drop-shadow-md" />
                </div>
              </div>
              <div>
                <p className="text-4xl font-black tracking-tighter drop-shadow-sm leading-none">{item.value}</p>
                <div className="flex flex-col gap-0.5 mt-2">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-95 leading-tight">{item.title}</p>
                  <p className="text-[9px] font-medium opacity-75 uppercase tracking-wider leading-none">{item.subtitle}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ─── TECHNICAL QUEUE LEDGER ───────────────────────────── */}
      <div className="grid grid-cols-1 gap-8">
        <Card className="rounded-[48px] border-none shadow-xl overflow-hidden bg-white p-0">
          <CardHeader className="p-0">
            <div className="p-10 bg-gradient-to-r from-slate-800 via-slate-950 to-indigo-950 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
                <div className="flex items-center gap-5">
                  <div className="h-14 w-14 rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg">
                    <Target size={28} className="text-white" />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-2xl font-black uppercase tracking-tight">Assignment Pending Audit</CardTitle>
                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Techno-Commercial classification queue for Bharat Mandapam</p>
                  </div>
                </div>
                <Badge className="bg-indigo-500 text-white text-[10px] font-black px-4 py-2 rounded-xl">3 Critical Actions Pending</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-6 bg-slate-50/30 relative">
            <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
            
            <div className="relative z-10 space-y-6">
              {initialQueue.map((task) => (
                <div key={task.id} className="p-8 rounded-[32px] border border-slate-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col xl:flex-row justify-between gap-8">
                    
                    {/* Information Cluster */}
                    <div className="space-y-4 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-black text-indigo-700 tracking-wider bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md">{task.id}</span>
                        <ReviewStatusBadge priority={task.priority} />
                        <Badge variant="secondary" className="text-[9px] font-black uppercase px-3 py-0.5 rounded-full bg-slate-100 text-slate-500 border-none">{task.source}</Badge>
                      </div>
                      <div>
                        <h4 className="font-black text-2xl text-slate-800 tracking-tight leading-tight">{task.title}</h4>
                        <div className="flex items-center gap-x-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
                          <span className="flex items-center gap-1.5 text-slate-600"><Activity size={14} className="text-indigo-500" /> {task.type}</span>
                          <span className="text-slate-200">•</span>
                          <span className="flex items-center gap-1.5 text-rose-600 font-black"><Clock size={14} /> {task.daysLeft} Remaining</span>
                        </div>
                      </div>
                      <p className="text-xs font-bold text-slate-500 leading-relaxed max-w-3xl italic">{task.description}</p>
                    </div>

                    {/* Action Hub */}
                    <div className="flex flex-col justify-center min-w-[200px]">
                      <Button 
                        onClick={() => setSelectedTask(task)}
                        className="h-16 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] shadow-lg hover:shadow-indigo-200 transition-all gap-3 border-none group"
                      >
                        Start Technical Audit <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center pt-6">
               <Button variant="ghost" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] hover:bg-transparent hover:text-indigo-600 transition-all">
                  <History size={16} className="mr-2" /> Load Historical Reviews
               </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ─── TECHNICAL AUDIT SIDE PANEL ────────────────────────── */}
      {selectedTask && (
        <>
          <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-md z-[60] animate-in fade-in" onClick={() => setSelectedTask(null)} />
          <div className="fixed inset-y-0 right-0 w-full max-w-xl bg-white z-[70] shadow-[-20px_0_50px_rgba(0,0,0,0.1)] flex flex-col animate-in slide-in-from-right duration-500">
            
            {/* Panel Header */}
            <div className="p-10 bg-slate-900 text-white relative overflow-hidden">
               <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
               <div className="relative z-10 flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="h-12 w-12 rounded-2xl bg-indigo-500 flex items-center justify-center shadow-lg mb-4">
                       <Zap size={24} className="text-white" />
                    </div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter">Technical Audit</h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Case 2 Protocol • {selectedTask.id}</p>
                  </div>
                  <button onClick={() => setSelectedTask(null)} className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"><X size={24} /></button>
               </div>
            </div>

            {/* Panel Body */}
            <div className="flex-1 overflow-y-auto p-10 space-y-10">
              <section className="space-y-4">
                <h3 className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.2em]">Audit Context</h3>
                <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                  <h4 className="font-black text-xl text-slate-800 leading-tight mb-2">{selectedTask.title}</h4>
                  <p className="text-sm font-bold text-slate-500 leading-relaxed italic">"{selectedTask.description}"</p>
                </div>
              </section>

              <section className="space-y-6">
                 <h3 className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.2em]">Scale Classification</h3>
                 <div className="grid gap-4">
                    {[
                      { id: "small", title: "Small Scale (Internal)", desc: "Direct NBCC Workforce Deployment", icon: HardHat },
                      { id: "large", title: "Large Scale (External)", desc: "Outsource to Partner PMC (SPCL)", icon: ExternalLink }
                    ].map((opt) => (
                      <div 
                        key={opt.id}
                        onClick={() => setClassification(opt.id)}
                        className={cn(
                          "p-6 border-2 rounded-[28px] flex items-center gap-5 cursor-pointer transition-all group",
                          classification === opt.id ? "border-indigo-600 bg-indigo-50/50 shadow-lg shadow-indigo-100" : "border-slate-100 hover:border-slate-300"
                        )}
                      >
                         <div className={cn(
                           "h-14 w-14 rounded-2xl flex items-center justify-center transition-colors shadow-sm",
                           classification === opt.id ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400"
                         )}>
                            <opt.icon size={24} />
                         </div>
                         <div className="flex-1">
                            <p className="font-black text-sm uppercase tracking-tight text-slate-800">{opt.title}</p>
                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{opt.desc}</p>
                         </div>
                         {classification === opt.id && <CheckCircle2 className="text-indigo-600" size={24} />}
                      </div>
                    ))}
                 </div>
              </section>

              <div className="p-6 bg-amber-50 rounded-[24px] border-2 border-amber-100 flex gap-4">
                <AlertTriangle className="h-6 w-6 text-amber-600 shrink-0" />
                <p className="text-[10px] text-amber-800 font-black leading-relaxed uppercase tracking-tight">
                  Secretariat Note: Classification as 'Small Scale' triggers immediate procurement. 'Large Scale' requires a 3nd-party cost estimation audit.
                </p>
              </div>
            </div>

            {/* Panel Footer */}
            <div className="p-10 border-t border-slate-100 flex gap-4 bg-slate-50/50">
               <Button onClick={() => setSelectedTask(null)} variant="outline" className="flex-1 h-16 rounded-2xl border-2 border-slate-200 font-black uppercase text-[10px] tracking-[0.2em] bg-white">Discard Audit</Button>
               <Button 
                disabled={!classification}
                className="flex-1 h-16 rounded-2xl bg-indigo-600 text-white font-black uppercase text-[10px] tracking-[0.2em] shadow-2xl shadow-indigo-200 border-none"
              >
                Confirm Decision
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}