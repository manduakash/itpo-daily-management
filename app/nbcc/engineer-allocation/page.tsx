"use client";

import React, { useState, useEffect } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, 
  ResponsiveContainer, AreaChart, Area 
} from "recharts";
import { 
  HardHat, Users, ArrowRight, Filter, Search, 
  ChevronRight, Activity, ArrowUpRight, ShieldCheck, 
  Clock, X, CheckCircle2, AlertTriangle, Hammer, 
  Zap, Settings, Droplets, UserPlus, Briefcase, 
  MapPin, Loader2
} from "lucide-react";

// --- Mock Data & Constants ---
const kpiData = [
  { title: "Pending Allocation", value: "08", trend: "Small scale queue", icon: UserPlus, bg: "bg-amber-50/80 dark:bg-amber-900/10", border: "border-amber-200 dark:border-amber-800", iconBg: "bg-amber-500", textColor: "text-amber-700 dark:text-amber-400" },
  { title: "Active Team Leads", value: "14", trend: "On-site engineers", icon: ShieldCheck, bg: "bg-emerald-50/80 dark:bg-emerald-900/10", border: "border-emerald-200 dark:border-emerald-800", iconBg: "bg-emerald-600", textColor: "text-emerald-700 dark:text-emerald-400" },
  { title: "Field Workforce", value: "124", trend: "Total deployed", icon: Users, bg: "bg-indigo-50/80 dark:bg-indigo-900/10", border: "border-indigo-200 dark:border-indigo-800", iconBg: "bg-indigo-600", textColor: "text-indigo-700 dark:text-indigo-400" },
  { title: "Coverage Zones", value: "12", trend: "Bharat Mandapam", icon: MapPin, bg: "bg-slate-100/80 dark:bg-slate-800/40", border: "border-slate-300 dark:border-slate-700", iconBg: "bg-slate-700", textColor: "text-slate-700 dark:text-slate-300" },
];

const categoryIcons: Record<string, React.ReactNode> = {
  "General Civil": <Hammer size={14} />,
  "Electrical": <Zap size={14} />,
  "Mechanical": <Settings size={14} />,
  "Plumbing": <Droplets size={14} />,
};

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

export default function NBCCEngineerAllocation() {
  const [mounted, setMounted] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedEngineer, setSelectedEngineer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleAllocateClick = (task: any) => {
    setSelectedTask(task);
    setIsPanelOpen(true);
  };

  const closePanel = () => {
    setIsPanelOpen(false);
    setSelectedTask(null);
    setSelectedEngineer("");
  };

  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      alert(`Assignment Successful: ${selectedTask.id} assigned to ${selectedEngineer}`);
      setIsSubmitting(false);
      closePanel();
    }, 1500);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#f1f5f9] dark:bg-[#020617] text-slate-900 dark:text-slate-50 relative overflow-hidden">
      {/* Blueprint Pattern Background */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: `url('https://transparenttextures.com/patterns/cubes.png')` }} />

      <main className="relative z-10 p-6 lg:p-10 max-w-[1600px] mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black px-2 py-0.5 rounded tracking-tighter uppercase">PMC Operations</span>
              <span className="text-slate-400 text-xs font-bold flex items-center gap-1 uppercase tracking-widest"><ShieldCheck className="h-3.5 w-3.5" /> Bharat Mandapam</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight uppercase">Engineer Allocation</h1>
            <p className="text-slate-500 text-sm mt-1 font-medium italic">Assign site engineers and deployment teams for direct NBCC execution projects.</p>
          </div>
          <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-5 py-2.5 text-xs font-black bg-indigo-600 text-white rounded-lg shadow-xl shadow-indigo-500/20 hover:scale-[1.02] transition-all uppercase tracking-wider">
               Manage Engineering Pool
            </button>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {kpiData.map((kpi, i) => (
            <div key={i} className={`relative overflow-hidden ${kpi.bg} border ${kpi.border} p-6 rounded-2xl shadow-sm group hover:shadow-md transition-all`}>
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none group-hover:opacity-[0.08] transition-opacity" style={{ backgroundImage: `url('https://transparenttextures.com/patterns/cubes.png')` }} />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-5">
                  <div className={`p-2.5 ${kpi.iconBg} text-white rounded-xl shadow-lg`}><kpi.icon className="h-5 w-5" /></div>
                  <ArrowUpRight className="h-5 w-5 text-slate-300" />
                </div>
                <p className={`text-[10px] font-black uppercase tracking-[0.15em] mb-1 opacity-70 ${kpi.textColor}`}>{kpi.title}</p>
                <h3 className="text-3xl font-black tracking-tighter">{kpi.value}</h3>
                <p className="text-[10px] font-bold text-slate-500 mt-2 flex items-center gap-1 uppercase tracking-tighter italic">
                  {kpi.trend}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Deployment Graph */}
        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
           <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Workforce Pulse</h3>
                <p className="text-xl font-black tracking-tight">Active Deployment Distribution</p>
              </div>
           </div>
           <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={deploymentTrend}>
                  <defs>
                    <linearGradient id="colorDeploy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" fontSize={10} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 'bold'}} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorDeploy)" />
                </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Allocation Queue Table */}
        <div className="bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
              <h3 className="text-sm font-black uppercase tracking-[0.15em]">Assignments Pending Allocation</h3>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 bg-slate-50/50 dark:bg-slate-800/50">
                  <th className="py-4 px-8">Contract ID</th>
                  <th className="py-4 px-6">Work Description</th>
                  <th className="py-4 px-6">Site Location</th>
                  <th className="py-4 px-6">Priority</th>
                  <th className="py-4 px-8 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {allocationQueue.map((task) => (
                  <tr key={task.id} className="group hover:bg-white dark:hover:bg-slate-800/80 transition-all">
                    <td className="py-5 px-8 font-mono text-xs font-bold text-slate-400">{task.id}</td>
                    <td className="py-5 px-6">
                      <div className="font-bold text-sm">{task.title}</div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">
                        {categoryIcons[task.type]} {task.type}
                      </div>
                    </td>
                    <td className="py-5 px-6 font-bold text-[11px] text-slate-600 dark:text-slate-300 uppercase italic">
                      <MapPin size={12} className="inline mr-1 opacity-50" /> {task.location}
                    </td>
                    <td className="py-5 px-6">
                       <span className={`text-[10px] font-black uppercase px-2 py-1 rounded ${
                         task.priority === 'Critical' ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-600'
                       }`}>{task.priority}</span>
                    </td>
                    <td className="py-5 px-8 text-right">
                      <button 
                        onClick={() => handleAllocateClick(task)}
                        className="px-5 py-1.5 text-[10px] font-black uppercase bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 rounded hover:bg-indigo-600 dark:hover:bg-indigo-400 hover:text-white transition-all shadow-sm active:scale-95"
                      >
                        Allocate Team
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* --- ALLOCATION SIDE PANEL --- */}
      {isPanelOpen && (
        <>
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] transition-opacity" onClick={closePanel} />
          
          <div className="fixed inset-y-0 right-0 w-full max-w-lg bg-white dark:bg-slate-950 z-[70] shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col transform transition-transform duration-500 animate-in slide-in-from-right">
            
            {/* Header */}
            <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
              <div>
                <h2 className="text-xl font-black tracking-tight uppercase">Engineer Allocation</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Resource Deployment Setup • {selectedTask?.id}</p>
              </div>
              <button onClick={closePanel} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors"><X size={20} /></button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {/* Project Info Section */}
              <section className="space-y-4">
                <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">Requirement Context</h3>
                <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-xl border border-slate-100 dark:border-slate-800 relative">
                   <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url('https://transparenttextures.com/patterns/cubes.png')` }} />
                  <h4 className="font-bold text-lg mb-2 leading-tight">{selectedTask?.title}</h4>
                  <div className="flex items-center gap-3 mb-3">
                     <span className="text-[10px] font-black uppercase text-slate-500 bg-slate-200/50 px-2 py-0.5 rounded">{selectedTask?.type}</span>
                     <span className="text-[10px] font-black uppercase text-red-600 bg-red-50 px-2 py-0.5 rounded">{selectedTask?.priority}</span>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed italic">"{selectedTask?.description}"</p>
                </div>
              </section>

              {/* Selection Section */}
              <section className="space-y-5">
                <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">Select Deployment Lead</h3>
                <div className="space-y-3">
                  {availableEngineers.map((eng) => (
                    <label 
                      key={eng.id}
                      className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedEngineer === eng.id ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/20" : "border-slate-100 dark:border-slate-800 hover:border-slate-300"}`}
                    >
                      <input type="radio" name="eng" className="hidden" onChange={() => setSelectedEngineer(eng.id)} />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-xs">
                             {eng.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-black text-xs uppercase tracking-tight">{eng.name}</p>
                            <p className="text-[10px] text-slate-500 font-bold uppercase">{eng.role}</p>
                          </div>
                        </div>
                        <div className="text-right">
                           <p className="text-[10px] font-black text-indigo-600 uppercase">{eng.projects} Active</p>
                           {selectedEngineer === eng.id && <CheckCircle2 className="text-indigo-600 h-5 w-5 ml-auto mt-1" />}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </section>

              {/* Workforce Input */}
              <section className="space-y-4">
                 <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">Deployment Team Size</h3>
                 <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input 
                      type="number" 
                      placeholder="Number of field technicians/laborers"
                      className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-xl py-3 pl-12 pr-4 text-sm font-bold outline-none focus:border-indigo-600 transition-all"
                    />
                 </div>
              </section>

              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex gap-3">
                <AlertTriangle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-[10px] text-emerald-800 font-bold leading-relaxed uppercase tracking-tighter">
                  Institutional Note: Engineer allocation signals the official start of on-site execution. Daily progress reports will be enabled for the lead engineer.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-6 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 flex gap-4">
              <button onClick={closePanel} className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest border-2 border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 transition-all">Discard</button>
              <button 
                disabled={!selectedEngineer || isSubmitting}
                onClick={handleFinalSubmit}
                className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 ${!selectedEngineer ? "bg-slate-200 text-slate-400 cursor-not-allowed" : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-500/20 active:scale-95"}`}
              >
                {isSubmitting ? <><Loader2 className="animate-spin" size={14}/> Processing</> : "Deploy Team"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}