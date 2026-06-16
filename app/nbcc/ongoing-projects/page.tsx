"use client";

import React, { useState, useEffect } from "react";
import { 
  XAxis, YAxis, Tooltip, 
  ResponsiveContainer, AreaChart, Area,
  CartesianGrid 
} from "recharts";
import { 
  ShieldCheck, Activity, CheckCircle2, AlertTriangle, 
  Users, TrendingUp, MapPin, Hammer, Clock, 
  ChevronRight, X, ClipboardCheck, FileText, 
  History, PlusCircle, Wrench, Building2,
  ArrowUpRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// ─── Status Badge Helper (Secretariat Style) ──────────────────────────
function ITPOProgressBadge({ status }: { status: string }) {
  const isDelay = status === "Delayed";
  return (
    <Badge variant="outline" className={cn(
      "text-[9px] font-black uppercase tracking-widest px-3 py-0.5 border-2 rounded-full",
      isDelay ? "bg-rose-100 text-rose-700 border-rose-200" : "bg-emerald-100 text-emerald-700 border-emerald-200"
    )}>
      {status}
    </Badge>
  );
}

// ─── Mock Data ────────────────────────────────────────────────────────
const kpiStats = [
  { title: "Active WIP Projects", value: "28", subtitle: "12 Direct | 16 Partner", icon: Activity, color: "from-indigo-600 to-blue-700" },
  { title: "System Efficiency", value: "92%", subtitle: "On-Track Delivery", icon: CheckCircle2, color: "from-emerald-500 to-teal-600" },
  { title: "Delayed/At Risk", value: "04", subtitle: "Critical Attention Required", icon: AlertTriangle, color: "from-amber-500 to-orange-600", alert: true },
];

const liveTrend = [
  { name: "Week 1", progress: 20 },
  { name: "Week 2", progress: 35 },
  { name: "Week 3", progress: 60 },
  { name: "Week 4", progress: 78 },
];

const activeProjects = [
  { id: "BM-WIP-001", title: "Convention Center Hall 3 Restoration", lead: "Er. Rahul Varma", agency: "NBCC Direct", progress: 75, deadline: "12 Oct", category: "General Civil", building: "Block A", status: "On Track" },
  { id: "BM-WIP-015", title: "VIP Lounge HVAC Overhauling", lead: "SPCL Team B", agency: "Shapoorji Pallonji", progress: 40, deadline: "25 Oct", category: "Mechanical", building: "Block B", status: "Delayed" },
  { id: "BM-WIP-022", title: "Facade RGB LED Integration", lead: "Er. S. Mukerjee", agency: "NBCC Direct", progress: 90, deadline: "05 Oct", category: "Electrical", building: "Main Gate", status: "On Track" },
];

export default function NBCCOngoingProjects() {
  const [mounted, setMounted] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-20 font-sans selection:bg-indigo-100 p-10 bg-slate-50/50 min-h-screen relative">
      
      {/* ─── APEX SECRETARIAT HEADER ──────────────────────────── */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 relative">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-2 border-indigo-200">
            <ShieldCheck size={14} className="animate-pulse" /> Bharat Mandapam Live
          </div>
          <h1 className="text-6xl font-black text-slate-800 tracking-tighter uppercase leading-none">Operations Hub</h1>
          <p className="text-slate-500 font-medium text-xl italic underline underline-offset-8 decoration-indigo-200">
            Real-time execution monitoring, site SITREPs, and cross-agency progress audits.
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="h-16 px-8 rounded-3xl border-2 border-indigo-200 font-black uppercase tracking-widest text-[10px] text-indigo-700 bg-white shadow-xl hover:bg-indigo-50 transition-all">
            <History size={20} className="mr-2" /> System Logs
          </Button>
          <Button className="h-16 px-10 rounded-3xl bg-gradient-to-r from-slate-800 to-slate-950 text-white font-black uppercase tracking-widest text-[10px] shadow-2xl hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] transition-all gap-2 border-none">
            <TrendingUp size={20} className="text-emerald-400" /> Generate Situation Report
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

      {/* ─── MAIN EXECUTION LEDGER ───────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT: PROJECT GRID (2/3) */}
        <div className="lg:col-span-2">
          <Card className="rounded-[48px] border-none shadow-xl overflow-hidden bg-white h-full flex flex-col p-0">
            <CardHeader className="p-0">
              <div className="p-10 bg-gradient-to-r from-slate-800 via-slate-950 to-indigo-950 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
                  <div className="flex items-center gap-5">
                    <div className="h-14 w-14 rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg">
                      <Building2 size={28} className="text-white" />
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-2xl font-black uppercase tracking-tight">Execution Grid</CardTitle>
                      <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Live monitoring of all Work-in-Progress zones</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-6 flex-1 bg-slate-50/30 relative">
              <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
              
              <div className="relative z-10 space-y-6">
                {activeProjects.map((project) => (
                  <div key={project.id} className="p-8 rounded-[32px] border border-slate-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300">
                    <div className="flex flex-col xl:flex-row justify-between gap-8">
                      <div className="space-y-4 flex-1">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-black text-indigo-700 tracking-wider bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md">{project.id}</span>
                          <ITPOProgressBadge status={project.status} />
                          <Badge variant="secondary" className={cn("text-[9px] font-black uppercase px-3 py-1 rounded-full", project.agency.includes('NBCC') ? "bg-indigo-50 text-indigo-600" : "bg-slate-100 text-slate-500")}>
                            {project.agency}
                          </Badge>
                        </div>
                        <div>
                          <h4 className="font-black text-2xl text-slate-800 tracking-tight leading-tight">{project.title}</h4>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
                            <span className="flex items-center gap-1.5 text-slate-600"><MapPin size={14} className="text-indigo-500" /> {project.building}</span>
                            <span className="text-slate-200">•</span>
                            <span className="flex items-center gap-1.5 font-black"><Wrench size={14} className="text-indigo-500" /> {project.category}</span>
                            <span className="text-slate-200">•</span>
                            <span className="flex items-center gap-1.5 font-black text-indigo-600"><Users size={14} /> {project.lead}</span>
                          </div>
                        </div>
                        
                        {/* Progress Block */}
                        <div className="pt-2 space-y-2 max-w-md">
                          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                            <span className="text-slate-400">Completion Path</span>
                            <span className="text-indigo-600">{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-2.5 bg-slate-100 [&>div]:bg-indigo-600" />
                        </div>
                      </div>

                      <div className="flex flex-col justify-center">
                        <Button 
                          onClick={() => setSelectedProject(project)}
                          className="h-16 px-10 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] shadow-lg hover:shadow-indigo-200 transition-all gap-2 border-none"
                        >
                          Audit Site Logs <ArrowUpRight size={18} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT SIDEBAR: ANALYTICS (1/3) */}
        <div className="space-y-8">
          <Card className="rounded-[40px] border-none shadow-lg bg-white overflow-hidden group p-0">
            <div className="p-6 flex items-center justify-between text-white relative bg-gradient-to-r from-indigo-600 to-blue-700">
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
              <div className="flex items-center gap-4 relative z-10">
                <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <TrendingUp size={18} className="text-white" />
                </div>
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em]">Efficiency Trend</h3>
              </div>
            </div>
            <div className="p-8 space-y-6">
               <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={liveTrend}>
                    <defs>
                      <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" hide />
                    <YAxis hide />
                    <Tooltip />
                    <Area type="monotone" dataKey="progress" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorActual)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active Sites</p>
                  <p className="text-xl font-black text-slate-800">18 Zones</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Avg Progress</p>
                  <p className="text-xl font-black text-indigo-600">+12% /wk</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Workforce Widget */}
          <div className="p-8 rounded-[40px] bg-slate-900 text-white relative overflow-hidden group shadow-2xl">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            <div className="relative z-10 space-y-4">
              <div className="flex justify-between items-center">
                <Users size={24} className="text-indigo-400 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Workforce Deployed</span>
              </div>
              <div>
                <h3 className="text-4xl font-black tracking-tighter">186 Personnel</h3>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1">Live On-Site Count</p>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-blue-600 w-[85%]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── SITE MONITORING PANEL (SECRETARIAT STYLE) ────────── */}
      {selectedProject && (
        <>
          <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-md z-[60] animate-in fade-in" onClick={() => setSelectedProject(null)} />
          <div className="fixed inset-y-0 right-0 w-full max-w-xl bg-white z-[70] shadow-[-20px_0_50px_rgba(0,0,0,0.1)] flex flex-col animate-in slide-in-from-right duration-500">
            
            <div className="p-10 bg-slate-900 text-white relative overflow-hidden">
               <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
               <div className="relative z-10 flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="h-12 w-12 rounded-2xl bg-indigo-500 flex items-center justify-center shadow-lg mb-4">
                       <Activity size={24} className="text-white" />
                    </div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter">Site Oversight</h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Live Situational Audit • {selectedProject.id}</p>
                  </div>
                  <button onClick={() => setSelectedProject(null)} className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"><X size={24} /></button>
               </div>
            </div>

            <div className="flex-1 overflow-y-auto p-10 space-y-10">
              <section className="space-y-4">
                <h3 className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.2em]">Execution Milestone</h3>
                <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 relative overflow-hidden text-slate-800">
                  <div className="flex justify-between items-end mb-6">
                    <div>
                      <h4 className="font-black text-xl leading-tight mb-1">{selectedProject.title}</h4>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{selectedProject.building}</p>
                    </div>
                    <span className="text-4xl font-black text-indigo-600 tracking-tighter">{selectedProject.progress}%</span>
                  </div>
                  <Progress value={selectedProject.progress} className="h-3 bg-slate-200 [&>div]:bg-indigo-600 rounded-full" />
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.2em]">Daily SITREP Logs</h3>
                <div className="space-y-4">
                  <div className="p-6 border-l-4 border-emerald-500 bg-emerald-50/50 rounded-r-[24px] relative">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-xs font-black uppercase text-slate-800">Site Clearing & Material Check</p>
                      <span className="text-[9px] font-bold text-emerald-600 uppercase">09:30 AM</span>
                    </div>
                    <p className="text-[11px] font-medium text-slate-600 leading-relaxed italic">"All essential materials delivered. Safety clearance verified by PM."</p>
                    <ClipboardCheck className="absolute bottom-4 right-4 text-emerald-200" size={24} />
                  </div>
                  
                  <div className="p-6 border-l-4 border-slate-300 bg-slate-50 rounded-r-[24px] opacity-60">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-xs font-black uppercase text-slate-500">Shift 2 Afternoon Report</p>
                      <span className="text-[9px] font-bold text-slate-400 uppercase">Pending</span>
                    </div>
                    <p className="text-[11px] font-medium text-slate-400 italic">Logs are updated by site lead at the end of business hours.</p>
                  </div>
                </div>
              </section>

              <div className="p-6 bg-amber-50 rounded-[24px] border-2 border-amber-100 flex gap-4">
                <AlertTriangle className="h-6 w-6 text-amber-600 shrink-0" />
                <p className="text-[10px] text-amber-800 font-black leading-relaxed uppercase tracking-tight">
                  Secretariat Note: This project is being tracked via automated milestone markers. Any variance beyond 72 hours triggers an escalation to ITPO Apex.
                </p>
              </div>
            </div>

            <div className="p-10 border-t border-slate-100 flex gap-4 bg-slate-50/50">
               <Button onClick={() => setSelectedProject(null)} variant="outline" className="flex-1 h-16 rounded-2xl border-2 border-slate-200 font-black uppercase text-[10px] tracking-[0.2em] bg-white">Audit History</Button>
               <Button className="flex-1 h-16 rounded-2xl bg-slate-900 text-white font-black uppercase text-[10px] tracking-[0.2em] shadow-2xl flex gap-2">
                 <FileText size={16} /> Download Full Log
               </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}