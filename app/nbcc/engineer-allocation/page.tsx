"use client";

import React, { useState, useEffect } from "react";
import { 
  XAxis, YAxis, Tooltip, 
  ResponsiveContainer, AreaChart, Area,
  CartesianGrid 
} from "recharts";
import { 
  HardHat, Users, Filter, Search, 
  X, CheckCircle2, AlertTriangle, Hammer, 
  Zap, UserPlus, Briefcase, 
  MapPin, Loader2, History, PlusCircle,
  Activity, ArrowUpRight, Clock
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// ─── Status Badge Helper (Secretariat Style) ──────────────────────────
function ITPOAllocationBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "Critical": "bg-rose-100 text-rose-700 border-rose-200",
    "High": "bg-orange-100 text-orange-700 border-orange-200",
    "Medium": "bg-amber-100 text-amber-700 border-amber-200",
    "Low": "bg-emerald-100 text-emerald-700 border-emerald-200",
  };

  return (
    <Badge variant="outline" className={cn("text-[9px] font-black uppercase tracking-widest px-3 py-0.5 border-2 rounded-full", styles[status] || "bg-slate-100 text-slate-700")}>
      {status} Priority
    </Badge>
  );
}

// ─── Mock Data ────────────────────────────────────────────────────────
const kpiStats = [
  { title: "Pending Allocation", value: "08", subtitle: "Small Scale Tasks", icon: UserPlus, color: "from-amber-500 to-orange-600", alert: true },
  { title: "Active Team Leads", value: "14", subtitle: "Supervisors On-site", icon: ShieldCheck, color: "from-blue-600 to-indigo-700" },
  { title: "Total Workforce", value: "124", subtitle: "Direct NBCC Personnel", icon: Users, color: "from-emerald-500 to-teal-600" },
];

const deploymentTrend = [
  { day: "Mon", count: 85 }, { day: "Tue", count: 92 }, { day: "Wed", count: 110 },
  { day: "Thu", count: 105 }, { day: "Fri", count: 124 }, { day: "Sat", count: 98 },
];

const allocationQueue = [
  { id: "CON-2025-901", title: "Convention Center Leakage Repair", location: "Level 1, Hall 2", type: "Plumbing", priority: "Critical", scale: "Small", description: "Emergency repair of high-pressure water inlet pipe near the VIP lounge." },
  { id: "CON-2025-915", title: "ITPO Admin Block Facade Lighting", location: "External Perimeter", type: "Electrical", priority: "Medium", scale: "Small", description: "Standard maintenance of architectural RGB lighting strips on the North wing." },
  { id: "CON-2025-922", title: "Basement Parking B Floor Polishing", location: "Zone 4", type: "General Civil", priority: "Low", scale: "Small", description: "Periodic epoxy coating maintenance for the lower basement parking grid." }
];

const availableEngineers = [
  { id: "ENG-001", name: "Er. Rajesh Kumar", role: "Senior Civil Engineer", projects: 2 },
  { id: "ENG-005", name: "Er. Amit Sharma", role: "Maintenance Head (Electrical)", projects: 1 },
  { id: "ENG-012", name: "Er. Suman Das", role: "Plumbing Specialist", projects: 0 },
];

// Helper Icon Component for titles
function ShieldCheck({ size, className }: { size: number, className?: string }) {
    return <ShieldCheckIcon size={size} className={className} />;
}
import { ShieldCheck as ShieldCheckIcon } from "lucide-react";


export default function NBCCEngineerAllocation() {
  const [mounted, setMounted] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [selectedEngineer, setSelectedEngineer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
        setIsSubmitting(false);
        setSelectedTask(null);
        setSelectedEngineer("");
    }, 1500);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-20 font-sans selection:bg-indigo-100 p-10 bg-slate-50/50 min-h-screen relative">
      
      {/* ─── APEX SECRETARIAT HEADER ──────────────────────────── */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 relative">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-2 border-indigo-200">
            <UserPlus size={14} className="animate-pulse" /> Resource Deployment
          </div>
          <h1 className="text-6xl font-black text-slate-800 tracking-tighter uppercase leading-none">Engineer Allocation</h1>
          <p className="text-slate-500 font-medium text-xl italic underline underline-offset-8 decoration-indigo-200">
            Assigning site leadership and mobilizing workforce for direct NBCC operations.
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="h-16 px-8 rounded-3xl border-2 border-indigo-200 font-black uppercase tracking-widest text-[10px] text-indigo-700 bg-white shadow-xl hover:bg-indigo-50 transition-all">
            <History size={20} className="mr-2" /> Deployment Logs
          </Button>
          <Button className="h-16 px-10 rounded-3xl bg-gradient-to-r from-slate-800 to-slate-950 text-white font-black uppercase tracking-widest text-[10px] shadow-2xl hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] transition-all gap-2 border-none">
            <PlusCircle size={20} className="text-emerald-400" /> Manage Engineer Pool
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT: ALLOCATION LEDGER (2/3) */}
        <div className="lg:col-span-2">
          <Card className="rounded-[48px] border-none shadow-xl overflow-hidden bg-white h-full flex flex-col">
            <CardHeader className="p-0">
              <div className="p-10 bg-gradient-to-r from-slate-800 via-slate-950 to-indigo-950 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
                  <div className="flex items-center gap-5">
                    <div className="h-14 w-14 rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg">
                      <Briefcase size={28} className="text-white" />
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-2xl font-black uppercase tracking-tight">Deployment Queue</CardTitle>
                      <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Active assignments awaiting team lead allocation</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-6 flex-1 bg-slate-50/30 relative">
              <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
              
              <div className="relative z-10 space-y-6">
                {allocationQueue.map((task) => (
                  <div key={task.id} className="p-8 rounded-[32px] border border-slate-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300">
                    <div className="flex flex-col xl:flex-row justify-between gap-8">
                      <div className="space-y-4 flex-1">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-black text-indigo-700 tracking-wider bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md">{task.id}</span>
                          <ITPOAllocationBadge status={task.priority} />
                        </div>
                        <div>
                          <h4 className="font-black text-2xl text-slate-800 tracking-tight leading-tight">{task.title}</h4>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
                            <span className="flex items-center gap-1.5 text-slate-600"><MapPin size={14} className="text-indigo-500" /> {task.location}</span>
                            <span className="text-slate-200">•</span>
                            <span className="flex items-center gap-1.5 font-black"><Hammer size={14} className="text-indigo-500" /> {task.type}</span>
                          </div>
                        </div>
                        <p className="text-xs font-bold text-slate-500 italic leading-relaxed">"{task.description}"</p>
                      </div>
                      <div className="flex flex-col justify-center">
                        <Button 
                          onClick={() => setSelectedTask(task)}
                          className="h-16 px-10 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] shadow-lg hover:shadow-indigo-200 transition-all gap-2 border-none"
                        >
                          Allocate Team <ArrowUpRight size={18} />
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
          <Card className="rounded-[40px] border-none shadow-lg bg-white overflow-hidden group">
            <div className="p-6 flex items-center justify-between text-white relative bg-gradient-to-r from-indigo-600 to-blue-700">
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
              <div className="flex items-center gap-4 relative z-10">
                <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <Activity size={18} className="text-white" />
                </div>
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em]">Workforce Pulse</h3>
              </div>
            </div>
            <div className="p-8 space-y-6">
               <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={deploymentTrend}>
                    <defs>
                      <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="day" hide />
                    <YAxis hide />
                    <Tooltip />
                    <Area type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorActual)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Zone Coverage</p>
                  <p className="text-xl font-black text-slate-800">12 Units</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Avg Response</p>
                  <p className="text-xl font-black text-indigo-600">45 Mins</p>
                </div>
              </div>
            </div>
          </Card>

          <div className="p-8 rounded-[40px] bg-slate-900 text-white relative overflow-hidden group shadow-2xl">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            <div className="relative z-10 space-y-4">
              <div className="flex justify-between items-center">
                <Zap size={24} className="text-amber-400 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">System Load</span>
              </div>
              <div>
                <h3 className="text-4xl font-black tracking-tighter">92.4%</h3>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1">Resource Utilization</p>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 w-[92%]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── ALLOCATION SIDE PANEL (SECRETARIAT STYLE) ────────── */}
      {selectedTask && (
        <>
          <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-md z-[60] animate-in fade-in" onClick={() => setSelectedTask(null)} />
          <div className="fixed inset-y-0 right-0 w-full max-w-xl bg-white z-[70] shadow-[-20px_0_50px_rgba(0,0,0,0.1)] flex flex-col animate-in slide-in-from-right duration-500">
            
            <div className="p-10 bg-slate-900 text-white relative overflow-hidden">
               <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
               <div className="relative z-10 flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="h-12 w-12 rounded-2xl bg-indigo-500 flex items-center justify-center shadow-lg mb-4">
                       <UserPlus size={24} className="text-white" />
                    </div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter">Command Panel</h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Deployment Logic • {selectedTask.id}</p>
                  </div>
                  <button onClick={() => setSelectedTask(null)} className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"><X size={24} /></button>
               </div>
            </div>

            <div className="flex-1 overflow-y-auto p-10 space-y-10">
              <section className="space-y-4">
                <h3 className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.2em]">Requirement Context</h3>
                <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 relative overflow-hidden text-slate-800">
                  <h4 className="font-black text-xl leading-tight mb-2">{selectedTask.title}</h4>
                  <p className="text-sm font-bold text-slate-500 italic">"{selectedTask.description}"</p>
                </div>
              </section>

              <section className="space-y-6">
                <h3 className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.2em]">Select Deployment Lead</h3>
                <div className="space-y-4">
                  {availableEngineers.map((eng) => (
                    <div 
                      key={eng.id}
                      onClick={() => setSelectedEngineer(eng.id)}
                      className={cn(
                        "p-6 border-2 rounded-[28px] flex items-center justify-between cursor-pointer transition-all group",
                        selectedEngineer === eng.id ? "border-indigo-600 bg-indigo-50/50 shadow-lg shadow-indigo-100" : "border-slate-100 hover:border-slate-300"
                      )}
                    >
                      <div className="flex items-center gap-5">
                        <div className={cn(
                          "h-14 w-14 rounded-2xl flex items-center justify-center transition-colors font-black",
                          selectedEngineer === eng.id ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400"
                        )}>
                           {eng.name.split(' ').map((n: string) => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-black text-sm uppercase tracking-tight text-slate-800">{eng.name}</p>
                          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{eng.role}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{eng.projects} Works Active</p>
                        {selectedEngineer === eng.id && <CheckCircle2 className="text-indigo-600 ml-auto mt-1" size={20} />}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.2em]">Workforce Deployment</h3>
                <div className="relative">
                  <Users className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input 
                    type="number" 
                    placeholder="Field Staff Count..." 
                    className="h-16 w-full pl-16 pr-6 rounded-[24px] border-2 border-slate-100 font-bold text-sm focus:border-indigo-500 outline-none transition-all"
                  />
                </div>
              </section>

              <div className="p-6 bg-emerald-50 rounded-[24px] border-2 border-emerald-100 flex gap-4">
                <AlertTriangle className="h-6 w-6 text-emerald-600 shrink-0" />
                <p className="text-[10px] text-emerald-800 font-black leading-relaxed uppercase tracking-tight">
                  Secretariat Note: Assigning a lead engineer triggers immediate work-log activation. Lead must submit daily SITREP via the PMC module.
                </p>
              </div>
            </div>

            <div className="p-10 border-t border-slate-100 flex gap-4 bg-slate-50/50">
               <Button onClick={() => setSelectedTask(null)} variant="outline" className="flex-1 h-16 rounded-2xl border-2 border-slate-200 font-black uppercase text-[10px] tracking-[0.2em] bg-white">Discard Action</Button>
               <Button 
                disabled={!selectedEngineer || isSubmitting}
                onClick={handleFinalSubmit}
                className="flex-1 h-16 rounded-2xl bg-indigo-600 text-white font-black uppercase text-[10px] tracking-[0.2em] shadow-2xl shadow-indigo-200 border-none"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : "Deploy Team"}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}