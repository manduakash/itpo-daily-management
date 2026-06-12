"use client";

import React, { useState, useEffect } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area 
} from "recharts";
import { 
  HardHat, FileSearch, Users, ExternalLink, ArrowRight, 
  Layers, Filter, Search, MoreHorizontal, ChevronRight, 
  Activity, ArrowUpRight, ShieldCheck, Clock, X, CheckCircle2,
  AlertTriangle, Hammer, Zap, Settings, Droplets
} from "lucide-react";

// --- Mock Data & Constants ---
const kpiData = [
  { title: "Pending Technical Review", value: "14", trend: "+3 from ITPO today", icon: FileSearch, bg: "bg-amber-50/80 dark:bg-amber-900/10", border: "border-amber-200 dark:border-amber-800", iconBg: "bg-amber-500", textColor: "text-amber-700 dark:text-amber-400" },
  { title: "Direct NBCC Execution", value: "09", trend: "Small scale active", icon: HardHat, bg: "bg-emerald-50/80 dark:bg-emerald-900/10", border: "border-emerald-200 dark:border-emerald-800", iconBg: "bg-emerald-600", textColor: "text-emerald-700 dark:text-emerald-400" },
  { title: "Forwarded to Shapoorji", value: "22", trend: "Large scale oversight", icon: ExternalLink, bg: "bg-indigo-50/80 dark:bg-indigo-900/10", border: "border-indigo-200 dark:border-indigo-800", iconBg: "bg-indigo-600", textColor: "text-indigo-700 dark:text-indigo-400" },
  { title: "Engineer Deployment", value: "38", trend: "Across 12 zones", icon: Users, bg: "bg-slate-100/80 dark:bg-slate-800/40", border: "border-slate-300 dark:border-slate-700", iconBg: "bg-slate-700", textColor: "text-slate-700 dark:text-slate-300" },
];

const workloadTrend = [
  { day: "Mon", review: 4, execution: 2 },
  { day: "Tue", review: 7, execution: 5 },
  { day: "Wed", review: 5, execution: 8 },
  { day: "Thu", review: 8, execution: 6 },
  { day: "Fri", review: 12, execution: 9 },
  { day: "Sat", review: 9, execution: 10 },
];

const lifecycleData = [
  { name: "Review", value: 12, color: "#f59e0b" },
  { name: "Estimation", value: 18, color: "#6366f1" },
  { name: "WIP", value: 25, color: "#10b981" },
  { name: "Inspection", value: 8, color: "#0f172a" },
];

const initialQueue = [
  { id: "CON-2025-401", title: "G20 Plenary Hall HVAC Tuning", priority: "Critical", type: "Mechanical", source: "ITPO Raised", daysLeft: "2 Days", description: "Calibration of central cooling units in the main plenary hall for upcoming summit." },
  { id: "CON-2025-412", title: "External Pathway Granite Repair", priority: "Medium", type: "Civil", source: "ITPO Raised", daysLeft: "14 Days", description: "Stone replacement and leveling of the VIP entrance pathway." },
  { id: "CON-2025-418", title: "Main Entrance Digital Signage", priority: "High", type: "Electrical", source: "ITPO Raised", daysLeft: "5 Days", description: "Installation of 4K LED displays for information broadcasting at Gate 1." }
];

export default function NBCCProfessionalDashboard() {
  const [mounted, setMounted] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [classification, setClassification] = useState<string>("");

  useEffect(() => { setMounted(true); }, []);

  const handleReviewClick = (task: any) => {
    setSelectedTask(task);
    setIsReviewOpen(true);
  };

  const closeReview = () => {
    setIsReviewOpen(false);
    setSelectedTask(null);
    setClassification("");
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#f1f5f9] dark:bg-[#020617] text-slate-900 dark:text-slate-50 relative overflow-hidden">
      {/* Background Texture */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: `url('https://transparenttextures.com/patterns/cubes.png')` }} />

      <main className="relative z-10 p-6 lg:p-10 max-w-[1600px] mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black px-2 py-0.5 rounded tracking-tighter uppercase">PMC Operations</span>
              <span className="text-slate-400 text-xs font-bold flex items-center gap-1 uppercase tracking-widest"><ShieldCheck className="h-3.5 w-3.5" /> Bharat Mandapam</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight">NBCC Dashboard</h1>
            <p className="text-slate-500 text-sm mt-1 font-medium italic">Project Classification & Infrastructure Monitoring Portal</p>
          </div>
          <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-5 py-2.5 text-xs font-black bg-indigo-600 text-white rounded-lg shadow-xl shadow-indigo-500/20 hover:scale-[1.02] transition-all uppercase tracking-wider">
               New Assignment List
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {kpiData.map((kpi, i) => (
            <div key={i} className={`relative overflow-hidden ${kpi.bg} border ${kpi.border} p-6 rounded-2xl shadow-sm group hover:shadow-md transition-all duration-300`}>
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none group-hover:opacity-[0.08] transition-opacity" style={{ backgroundImage: `url('https://transparenttextures.com/patterns/cubes.png')` }} />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-5">
                  <div className={`p-2.5 ${kpi.iconBg} text-white rounded-xl shadow-lg`}><kpi.icon className="h-5 w-5" /></div>
                  <ArrowUpRight className="h-5 w-5 text-slate-300" />
                </div>
                <p className={`text-[10px] font-black uppercase tracking-[0.15em] mb-1 opacity-70 ${kpi.textColor}`}>{kpi.title}</p>
                <h3 className="text-3xl font-black tracking-tighter">{kpi.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Analytics Section */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Classification Velocity</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={workloadTrend}>
                  <XAxis dataKey="day" fontSize={10} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 'bold'}} />
                  <YAxis fontSize={10} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 'bold'}} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="review" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="rgba(99, 102, 241, 0.1)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
             <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-8">Contract Mix</h3>
             <div className="h-56 relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={lifecycleData} innerRadius={70} outerRadius={90} paddingAngle={5} dataKey="value">
                      {lifecycleData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute text-center"><span className="block text-4xl font-black tracking-tighter">63</span></div>
             </div>
          </div>
        </div>

        {/* Task Queue Table */}
        <div className="bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden relative">
          <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 bg-indigo-500 rounded-full animate-pulse" />
              <h3 className="text-sm font-black uppercase tracking-[0.15em]">Technical Review Queue</h3>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 bg-slate-50/50 dark:bg-slate-800/50">
                  <th className="py-4 px-8">Project Ref</th>
                  <th className="py-4 px-6">Description</th>
                  <th className="py-4 px-6">Source</th>
                  <th className="py-4 px-6 text-center">Timeline</th>
                  <th className="py-4 px-8 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {initialQueue.map((task) => (
                  <tr key={task.id} className="group hover:bg-white dark:hover:bg-slate-800/80 transition-all">
                    <td className="py-5 px-8 font-mono text-xs font-bold text-slate-400">{task.id}</td>
                    <td className="py-5 px-6">
                      <div className="font-bold text-sm">{task.title}</div>
                      <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{task.type}</div>
                    </td>
                    <td className="py-5 px-6">
                      <span className="text-[10px] font-black uppercase px-2 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 rounded text-slate-500">{task.source}</span>
                    </td>
                    <td className="py-5 px-6 text-center text-amber-600 text-[11px] font-black uppercase"><Clock className="inline h-3.5 w-3.5 mr-1" /> {task.daysLeft}</td>
                    <td className="py-5 px-8 text-right">
                      <button 
                        onClick={() => handleReviewClick(task)}
                        className="px-5 py-1.5 text-[10px] font-black uppercase border-2 border-slate-900 dark:border-slate-100 rounded hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all shadow-sm active:scale-95"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* --- WORKABLE REVIEW SIDE PANEL --- */}
      {isReviewOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] transition-opacity duration-300" onClick={closeReview} />
          
          {/* Slide-over Panel */}
          <div className="fixed inset-y-0 right-0 w-full max-w-lg bg-white dark:bg-slate-950 z-[70] shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col transform transition-transform duration-500 ease-in-out animate-in slide-in-from-right">
            
            {/* Panel Header */}
            <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
              <div>
                <h2 className="text-xl font-black tracking-tight">Technical Review</h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{selectedTask?.id}</p>
              </div>
              <button onClick={closeReview} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Panel Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {/* Project Info Section */}
              <section className="space-y-4">
                <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">Requirement Context</h3>
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                  <h4 className="font-bold text-lg leading-tight mb-2">{selectedTask?.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{selectedTask?.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Category</p>
                    <p className="text-sm font-bold flex items-center gap-2 mt-1 uppercase tracking-tight">
                      <Settings className="h-3.5 w-3.5 text-indigo-500" /> {selectedTask?.type}
                    </p>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Priority</p>
                    <p className="text-sm font-bold text-red-600 mt-1 uppercase tracking-tight">{selectedTask?.priority}</p>
                  </div>
                </div>
              </section>

              {/* Classification Action (Case 2 Logic) */}
              <section className="space-y-4">
                <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">Technical Classification</h3>
                <div className="space-y-3">
                  {/* Option 1: Small Scale (Direct) */}
                  <label className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${classification === "small" ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/20" : "border-slate-100 dark:border-slate-800 hover:border-slate-300"}`}>
                    <input type="radio" name="class" className="hidden" onChange={() => setClassification("small")} />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 dark:bg-emerald-950 rounded-lg text-emerald-600"><HardHat size={18} /></div>
                        <div>
                          <p className="font-black text-xs uppercase tracking-tight">Small Scale (NBCC Direct)</p>
                          <p className="text-[10px] text-slate-500 font-medium">NBCC Internal Execution & Maintenance</p>
                        </div>
                      </div>
                      {classification === "small" && <CheckCircle2 className="text-indigo-600 h-5 w-5" />}
                    </div>
                  </label>

                  {/* Option 2: Large Scale (Shapoorji) */}
                  <label className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${classification === "large" ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/20" : "border-slate-100 dark:border-slate-800 hover:border-slate-300"}`}>
                    <input type="radio" name="class" className="hidden" onChange={() => setClassification("large")} />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-100 dark:bg-indigo-950 rounded-lg text-indigo-600"><ExternalLink size={18} /></div>
                        <div>
                          <p className="font-black text-xs uppercase tracking-tight">Large Scale (Shapoorji)</p>
                          <p className="text-[10px] text-slate-500 font-medium">Outsource for Detailed Estimation & Bid</p>
                        </div>
                      </div>
                      {classification === "large" && <CheckCircle2 className="text-indigo-600 h-5 w-5" />}
                    </div>
                  </label>
                </div>
              </section>

              {/* Alert Notice */}
              <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-100 dark:border-amber-900 flex gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700 dark:text-amber-400 font-medium leading-relaxed">
                  Classification is mandatory under Case 2 of the Bharat Mandapam Operations Guide. Once classified, the workflow will proceed to ITPO for budget approval.
                </p>
              </div>
            </div>

            {/* Panel Footer */}
            <div className="px-8 py-6 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950">
              <div className="flex gap-4">
                <button 
                  onClick={closeReview}
                  className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest border-2 border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button 
                  disabled={!classification}
                  className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg transition-all ${!classification ? "bg-slate-200 text-slate-400 cursor-not-allowed" : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-500/20 active:scale-[0.98]"}`}
                >
                  Confirm Classification
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}