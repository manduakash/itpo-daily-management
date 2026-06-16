"use client";

import React, { useState, useEffect } from "react";
import { 
  Search, Filter, Clock, ChevronRight, 
  ShieldCheck, ExternalLink, Download, 
  Briefcase, MapPin, Hammer, Zap, 
  Droplets, Settings, List, LayoutGrid,
  Activity, ArrowUpRight, FileSearch, HardHat,
  Users, CheckCircle2, X, AlertTriangle, IndianRupee, Loader2,
  History, PlusCircle, Wrench, Camera, MessageSquare
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// --- Status Badge Helper (ITPO Style) ---
function NBCCStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "Under Review": "bg-blue-100 text-blue-700 border-blue-200",
    "Estimation Submitted": "bg-purple-100 text-purple-700 border-purple-200",
    "Approved": "bg-emerald-100 text-emerald-700 border-emerald-200",
    "Engineer Assigned": "bg-cyan-100 text-cyan-700 border-cyan-200",
    "Work In Progress": "bg-amber-100 text-amber-700 border-amber-200",
    "Inspection Pending": "bg-indigo-100 text-indigo-700 border-indigo-200",
  };

  return (
    <Badge variant="outline" className={cn("text-[9px] font-black uppercase tracking-widest px-3 py-0.5 border-2 rounded-full", styles[status] || "bg-slate-100 text-slate-700")}>
      {status}
    </Badge>
  );
}

const kpiData = [
  { title: "Pending Tech Review", value: "12", subtitle: "Requires Scale Classif.", icon: FileSearch, color: "from-amber-500 to-orange-600", alert: true },
  { title: "NBCC Direct Execution", value: "08", subtitle: "Small Scale Projects", icon: HardHat, color: "from-blue-600 to-indigo-700" },
  { title: "Partner Forwarded", value: "24", subtitle: "Large Scale (Shapoorji)", icon: ExternalLink, color: "from-emerald-500 to-teal-600" },
];

export default function NBCCAssignedContracts() {
  const [mounted, setMounted] = useState(false);
  const [contracts, setContracts] = useState([
    { id: "CON-2025-701", title: "Plenary Hall Interior Renovation", location: "Block A, Level 2", category: "General Civil", priority: "Critical", scale: "Large", status: "Under Review", agency: "Pending NBCC Review", description: "Complete restoration of acoustic wall paneling and ceiling moisture treatment.", progress: 10 },
    { id: "CON-2025-705", title: "Parking Lot B Lighting Grid", location: "Outdoor Zone 4", category: "Electrical", priority: "Medium", scale: "Small", status: "Engineer Assigned", agency: "NBCC Direct", description: "Standard LED replacement and wiring check for the secondary parking bay.", progress: 45 },
    { id: "CON-2025-709", title: "HVAC Cooling Tower Maintenance", location: "Utility Terrace", category: "Mechanical", priority: "High", scale: "Large", status: "Estimation Submitted", agency: "Shapoorji (Proposed)", description: "Quarterly mechanical overhauling and chemical descaling of tower units.", progress: 25 },
  ]);

  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [actionType, setActionType] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-20 font-sans selection:bg-indigo-100 p-10 bg-slate-50/50 min-h-screen">
      
      {/* ─── APEX HEADER ─────────────────────────────────────── */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 relative">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-2 border-indigo-200">
            <ShieldCheck size={14} className="animate-pulse" /> PMC Secretariat
          </div>
          <h1 className="text-6xl font-black text-slate-800 tracking-tighter uppercase leading-none">Assigned Queue</h1>
          <p className="text-slate-500 font-medium text-xl italic underline underline-offset-8 decoration-indigo-200">
            Technical classification, agency forwarding, and site-engineer deployment dashboard.
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="h-16 px-8 rounded-3xl border-2 border-indigo-200 font-black uppercase tracking-widest text-[10px] text-indigo-700 bg-white shadow-xl hover:bg-indigo-50 transition-all">
            <History size={20} className="mr-2" /> Assignment History
          </Button>
          <Button className="h-16 px-10 rounded-3xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-black uppercase tracking-widest text-[10px] shadow-2xl hover:shadow-[0_0_20px_theme(colors.indigo.400)] transition-all gap-2 border-none">
            <Download size={20} className="text-indigo-100" /> Export Queue
          </Button>
        </div>
      </div>

      {/* ─── ACTION INDICATOR TILES ────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpiData.map((item, i) => (
          <div key={i} className={`group relative p-8 rounded-[32px] overflow-hidden transition-all duration-500 h-44 flex flex-col justify-between shadow-lg bg-gradient-to-br ${item.color} text-white`}>
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/diagonal-striped-brick.png')]" />
            <div className="relative z-10 flex flex-col justify-between h-full w-full">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                  <item.icon size={20} className="text-white drop-shadow-md" />
                </div>
                {item.alert && <div className="h-2.5 w-2.5 rounded-full bg-white animate-ping shadow-[0_0_10px_white]" />}
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

      {/* ─── MAIN LEDGER ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-8">
        <Card className="rounded-[48px] border-none shadow-xl overflow-hidden bg-white p-0">
          <CardHeader className="p-0">
            <div className="p-10 bg-gradient-to-r from-slate-800 via-slate-950 to-indigo-950 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
                <div className="flex items-center gap-5">
                  <div className="h-14 w-14 rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg">
                    <Briefcase size={28} className="text-white" />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-2xl font-black uppercase tracking-tight">Contract Assignment Ledger</CardTitle>
                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Technical Classification & PMC Deployment Queue</p>
                  </div>
                </div>
                <div className="flex bg-white/10 p-1.5 rounded-2xl backdrop-blur-md border border-white/10">
                  <Button variant="ghost" className="h-10 rounded-xl px-4 text-[10px] font-black text-white uppercase hover:bg-white/20">All Works</Button>
                  <Button variant="ghost" className="h-10 rounded-xl px-4 text-[10px] font-black text-white/50 uppercase hover:bg-white/20">Direct NBCC</Button>
                  <Button variant="ghost" className="h-10 rounded-xl px-4 text-[10px] font-black text-white/50 uppercase hover:bg-white/20">Forwarded</Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-6 bg-slate-50/30 relative">
            <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
            
            <div className="relative z-10 space-y-6">
              {contracts.map((task) => (
                <div key={task.id} className="p-8 rounded-[32px] border border-slate-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col xl:flex-row justify-between gap-8">
                    
                    {/* Info Block */}
                    <div className="space-y-4 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-black text-indigo-700 tracking-wider bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md">{task.id}</span>
                        <NBCCStatusBadge status={task.status} />
                        <Badge className="bg-slate-900 text-white text-[9px] font-black uppercase rounded-full px-3 py-0.5">{task.scale} Scale</Badge>
                      </div>
                      <div>
                        <h4 className="font-black text-2xl text-slate-800 tracking-tight leading-tight">{task.title}</h4>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
                          <span className="flex items-center gap-1.5 text-slate-600"><MapPin size={14} className="text-indigo-500" /> {task.location}</span>
                          <span className="text-slate-200">•</span>
                          <span className="flex items-center gap-1.5"><Wrench size={14} className="text-indigo-500" /> {task.category}</span>
                          <span className="text-slate-200">•</span>
                          <span className="flex items-center gap-1.5 text-rose-600"><Clock size={14} /> Deadline: {task.priority}</span>
                        </div>
                      </div>
                      <p className="text-xs font-bold text-slate-500 leading-relaxed max-w-2xl">{task.description}</p>
                    </div>

                    {/* Action Block */}
                    <div className="flex flex-col sm:flex-row xl:flex-col justify-center gap-4 min-w-[240px]">
                      {task.status === "Under Review" && (
                        <Button 
                          onClick={() => { setSelectedTask(task); setActionType("review"); }}
                          className="h-14 rounded-2xl bg-indigo-600 text-white font-black uppercase tracking-widest text-[10px] shadow-lg hover:bg-indigo-700 transition-all gap-2"
                        >
                          <FileSearch size={18} /> Technical Review
                        </Button>
                      )}
                      {task.status === "Engineer Assigned" && (
                        <Button 
                          onClick={() => { setSelectedTask(task); setActionType("assign"); }}
                          className="h-14 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] shadow-lg hover:bg-slate-800 transition-all gap-2"
                        >
                          <HardHat size={18} /> Deploy Workforce
                        </Button>
                      )}
                      {task.status === "Estimation Submitted" && (
                        <Button 
                          onClick={() => { setSelectedTask(task); setActionType("estimation"); }}
                          className="h-14 rounded-2xl bg-purple-600 text-white font-black uppercase tracking-widest text-[10px] shadow-lg hover:bg-purple-700 transition-all gap-2"
                        >
                          <IndianRupee size={18} /> Audit Estimation
                        </Button>
                      )}
                      <Button variant="outline" className="h-14 rounded-2xl border-2 border-slate-100 font-black uppercase tracking-widest text-[10px] text-slate-400 hover:text-slate-600 bg-transparent">
                        View Full Scope
                      </Button>
                    </div>
                  </div>

                  {/* Progress / Meta Info */}
                  <div className="mt-8 pt-6 border-t border-slate-50 flex flex-col md:flex-row items-center gap-6">
                    <div className="w-full md:w-64 space-y-2">
                       <div className="flex justify-between text-[8px] font-black uppercase text-slate-400 tracking-widest">
                         <span>Execution Progress</span>
                         <span>{task.progress}%</span>
                       </div>
                       <Progress value={task.progress} className="h-2 bg-slate-100 [&>div]:bg-indigo-600" />
                    </div>
                    <div className="flex items-center gap-3 ml-auto">
                      <div className="flex -space-x-2">
                        {[1,2,3].map(i => <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-slate-200" />)}
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Assigned PMC: <span className="text-slate-900">{task.agency}</span></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ─── SECRETARIAT SIDE PANEL ───────────────────────────── */}
      {selectedTask && (
        <>
          <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-md z-[60] animate-in fade-in" onClick={() => setSelectedTask(null)} />
          <div className="fixed inset-y-0 right-0 w-full max-w-xl bg-white z-[70] shadow-[-20px_0_50px_rgba(0,0,0,0.1)] flex flex-col animate-in slide-in-from-right duration-500">
            
            <div className="p-10 bg-slate-900 text-white relative overflow-hidden">
               <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
               <div className="relative z-10 flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="h-12 w-12 rounded-2xl bg-indigo-500 flex items-center justify-center shadow-lg mb-4">
                       <Activity size={24} />
                    </div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter">Command Panel</h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{selectedTask.id} • {selectedTask.category}</p>
                  </div>
                  <button onClick={() => setSelectedTask(null)} className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"><X size={24} /></button>
               </div>
            </div>

            <div className="flex-1 overflow-y-auto p-10 space-y-10">
              <section className="space-y-4">
                <h3 className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.2em]">Contextual Data</h3>
                <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                  <h4 className="font-black text-xl text-slate-800 leading-tight mb-2">{selectedTask.title}</h4>
                  <p className="text-sm font-medium text-slate-500 leading-relaxed">{selectedTask.description}</p>
                </div>
              </section>

              {actionType === "review" && (
                <section className="space-y-6">
                   <h3 className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.2em]">Project Classification</h3>
                   <div className="grid gap-4">
                      {["Small (NBCC Direct)", "Large (Forward to Partner)"].map((opt, i) => (
                        <div key={i} className="p-6 border-2 border-slate-100 rounded-[28px] flex items-center gap-5 cursor-pointer hover:border-indigo-600 hover:bg-indigo-50/50 transition-all group">
                           <div className="h-12 w-12 rounded-2xl bg-slate-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors flex items-center justify-center">
                              {i === 0 ? <HardHat size={20} /> : <ExternalLink size={20} />}
                           </div>
                           <div>
                              <p className="font-black text-sm uppercase tracking-tight">{opt}</p>
                              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{i === 0 ? "Internal Deployment" : "Forward for Estimation"}</p>
                           </div>
                           <div className="ml-auto h-6 w-6 rounded-full border-2 border-slate-200" />
                        </div>
                      ))}
                   </div>
                </section>
              )}

              {actionType === "estimation" && (
                <section className="space-y-6">
                   <h3 className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.2em]">Partner Cost Quote</h3>
                   <div className="bg-emerald-50 p-8 rounded-[32px] border-2 border-emerald-100 text-center">
                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2">Total Project Estimate</p>
                      <div className="text-5xl font-black text-slate-800 flex items-center justify-center gap-1 tracking-tighter">
                        <IndianRupee size={32} /> 12,45,000
                      </div>
                   </div>
                   <textarea placeholder="Enter technical remarks for the Secretariat..." className="w-full h-40 bg-slate-50 rounded-[28px] border-2 border-slate-100 p-6 text-sm font-bold focus:border-indigo-600 outline-none transition-all" />
                </section>
              )}
            </div>

            <div className="p-10 border-t border-slate-100 flex gap-4">
               <Button onClick={() => setSelectedTask(null)} variant="outline" className="flex-1 h-16 rounded-2xl border-2 border-slate-200 font-black uppercase text-[10px] tracking-[0.2em]">Discard</Button>
               <Button className="flex-1 h-16 rounded-2xl bg-slate-900 text-white font-black uppercase text-[10px] tracking-[0.2em] shadow-2xl">Confirm Assignment</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}