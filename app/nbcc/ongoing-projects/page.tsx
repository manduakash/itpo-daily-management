"use client";

import React, { useState, useEffect } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell 
} from "recharts";
import { 
  HardHat, Users, ExternalLink, ArrowRight, 
  Filter, Search, MoreHorizontal, ChevronRight, 
  Activity, ArrowUpRight, ShieldCheck, Clock, X, CheckCircle2,
  AlertTriangle, Hammer, Zap, Settings, Droplets, Briefcase,
  TrendingUp, Calendar, MapPin, ClipboardCheck, FileText
} from "lucide-react";

// --- Mock Data ---
const kpiData = [
  { title: "Active WIP Projects", value: "28", trend: "12 Direct | 16 SPCL", icon: Activity, bg: "bg-indigo-50/80 dark:bg-indigo-900/10", border: "border-indigo-200 dark:border-indigo-800", iconBg: "bg-indigo-600", textColor: "text-indigo-700 dark:text-indigo-400" },
  { title: "On-Track Status", value: "24", trend: "92% Efficiency", icon: CheckCircle2, bg: "bg-emerald-50/80 dark:bg-emerald-900/10", border: "border-emerald-200 dark:border-emerald-800", iconBg: "bg-emerald-600", textColor: "text-emerald-700 dark:text-emerald-400" },
  { title: "Delayed/At Risk", value: "04", trend: "Material supply issue", icon: AlertTriangle, bg: "bg-amber-50/80 dark:bg-amber-900/10", border: "border-amber-200 dark:border-amber-800", iconBg: "bg-amber-500", textColor: "text-amber-700 dark:text-amber-400" },
  { title: "Workforce Strength", value: "186", trend: "Deployed across sites", icon: Users, bg: "bg-slate-100/80 dark:bg-slate-800/40", border: "border-slate-300 dark:border-slate-700", iconBg: "bg-slate-700", textColor: "text-slate-700 dark:text-slate-300" },
];

const progressData = [
  { name: "Week 1", progress: 20 },
  { name: "Week 2", progress: 35 },
  { name: "Week 3", progress: 60 },
  { name: "Week 4", progress: 78 },
];

const activeProjects = [
  { id: "BM-WIP-001", title: "Convention Center Hall 3 Restoration", lead: "Er. Rahul Varma", agency: "NBCC Direct", progress: 75, deadline: "12 Oct", category: "General Civil", building: "Block A" },
  { id: "BM-WIP-015", title: "VIP Lounge HVAC Overhauling", lead: "Shapoorji Team B", agency: "Shapoorji Pallonji", progress: 40, deadline: "25 Oct", category: "Mechanical", building: "Block B" },
  { id: "BM-WIP-022", title: "Facade RGB LED Integration", lead: "Er. S. Mukerjee", agency: "NBCC Direct", progress: 90, deadline: "05 Oct", category: "Electrical", building: "Main Gate" },
];

export default function NBCCOngoingProjects() {
  const [mounted, setMounted] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsDetailsOpen(true);
  };

  const closeDetails = () => {
    setIsDetailsOpen(false);
    setSelectedProject(null);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#f1f5f9] dark:bg-[#020617] text-slate-900 dark:text-slate-50 relative overflow-hidden font-sans">
      {/* Background Texture Overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: `url('https://transparenttextures.com/patterns/cubes.png')` }} />

      <main className="relative z-10 p-6 lg:p-10 max-w-[1600px] mx-auto space-y-8">
        
        {/* Professional Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-indigo-600 text-white text-[10px] font-black px-2 py-0.5 rounded tracking-tighter uppercase">Operations Hub</span>
              <span className="text-slate-400 text-xs font-bold flex items-center gap-1 uppercase tracking-widest"><ShieldCheck className="h-3.5 w-3.5" /> Bharat Mandapam Live</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight uppercase">Ongoing Projects</h1>
            <p className="text-slate-500 text-sm mt-1 font-medium italic">Active site monitoring, progress audits, and cross-agency coordination.</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input type="text" placeholder="Search Project ID..." className="bg-white border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-xs w-64 outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" />
             </div>
             <button className="flex items-center gap-2 px-5 py-2.5 text-xs font-black bg-indigo-600 text-white rounded-lg shadow-xl shadow-indigo-500/20 hover:scale-[1.02] transition-all uppercase tracking-wider">
               <TrendingUp size={14} /> Progress Reports
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
                <p className="text-[10px] font-bold text-slate-500 mt-2 flex items-center gap-1 uppercase tracking-tighter italic">{kpi.trend}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Active Projects Table */}
        <div className="bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/20">
            <h3 className="text-sm font-black uppercase tracking-[0.15em]">Project Execution Grid</h3>
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-2 text-[10px] font-black text-slate-400">
                  <div className="h-2 w-2 rounded-full bg-indigo-500" /> NBCC INTERNAL
               </div>
               <div className="flex items-center gap-2 text-[10px] font-black text-slate-400">
                  <div className="h-2 w-2 rounded-full bg-slate-400" /> SHAPOORJI
               </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 bg-white dark:bg-slate-950/50">
                  <th className="py-4 px-8 border-b border-slate-100 dark:border-slate-800">Project Reference</th>
                  <th className="py-4 px-6 border-b border-slate-100 dark:border-slate-800">Assigned Lead</th>
                  <th className="py-4 px-6 border-b border-slate-100 dark:border-slate-800">Completion Status</th>
                  <th className="py-4 px-6 border-b border-slate-100 dark:border-slate-800">Execution Agency</th>
                  <th className="py-4 px-8 border-b border-slate-100 dark:border-slate-800 text-right">Monitoring</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {activeProjects.map((project) => (
                  <tr key={project.id} className="group hover:bg-white dark:hover:bg-slate-800/80 transition-all">
                    <td className="py-6 px-8">
                      <div className="font-mono text-[10px] font-bold text-indigo-500 mb-1">{project.id}</div>
                      <div className="font-bold text-sm text-slate-800 dark:text-slate-100 leading-tight">{project.title}</div>
                      <div className="flex items-center gap-3 mt-1.5 opacity-60 text-[10px] font-black uppercase tracking-tighter">
                         <MapPin size={12}/> {project.building} | <Hammer size={12} className="ml-1" /> {project.category}
                      </div>
                    </td>
                    <td className="py-6 px-6">
                       <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center font-black text-[10px] text-slate-500 border border-slate-200">
                            {project.lead.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{project.lead}</span>
                       </div>
                    </td>
                    <td className="py-6 px-6">
                       <div className="w-full max-w-[120px]">
                          <div className="flex justify-between mb-1">
                             <span className="text-[10px] font-black uppercase text-indigo-600">{project.progress}%</span>
                             <span className="text-[10px] font-black text-slate-400">ETA: {project.deadline}</span>
                          </div>
                          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                             <div className="bg-indigo-600 h-full rounded-full transition-all duration-1000" style={{ width: `${project.progress}%` }} />
                          </div>
                       </div>
                    </td>
                    <td className="py-6 px-6">
                       <span className={`text-[10px] font-black uppercase px-2 py-1 rounded border ${
                         project.agency.includes('NBCC') ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-slate-50 text-slate-500 border-slate-200'
                       }`}>
                         {project.agency}
                       </span>
                    </td>
                    <td className="py-6 px-8 text-right">
                       <button 
                        onClick={() => handleProjectClick(project)}
                        className="p-2 hover:bg-indigo-50 dark:hover:bg-slate-700 rounded-lg text-slate-400 hover:text-indigo-600 border border-transparent hover:border-indigo-100 transition-all"
                       >
                         <ChevronRight size={20} />
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* --- SIDE MONITORING DRAWER --- */}
      {isDetailsOpen && (
        <>
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]" onClick={closeDetails} />
          <div className="fixed inset-y-0 right-0 w-full max-w-lg bg-white dark:bg-slate-950 z-[70] shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col animate-in slide-in-from-right duration-300">
            
            <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
              <div>
                <h2 className="text-xl font-black uppercase tracking-tight">Project Oversight</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{selectedProject?.id} Monitoring Panel</p>
              </div>
              <button onClick={closeDetails} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors"><X size={20} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {/* Status Tracking */}
              <section className="space-y-4">
                 <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">Execution Milestone</h3>
                 <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between items-center mb-4">
                       <span className="text-xs font-black uppercase text-slate-500">Live Progress</span>
                       <span className="text-2xl font-black text-indigo-600">{selectedProject?.progress}%</span>
                    </div>
                    <div className="h-24">
                       <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={progressData}>
                             <Area type="monotone" dataKey="progress" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.1} strokeWidth={3} />
                          </AreaChart>
                       </ResponsiveContainer>
                    </div>
                 </div>
              </section>

              {/* Deployment Context */}
              <section className="space-y-4">
                <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">Field Deployment</h3>
                <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 rounded-xl">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Lead Personnel</p>
                      <p className="text-sm font-black uppercase">{selectedProject?.lead}</p>
                   </div>
                   <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 rounded-xl">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Building/Zone</p>
                      <p className="text-sm font-black uppercase">{selectedProject?.building}</p>
                   </div>
                </div>
              </section>

              {/* Action Records */}
              <section className="space-y-4">
                <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">Daily Site Logs</h3>
                <div className="space-y-3">
                   <div className="flex items-start gap-4 p-4 border-l-4 border-emerald-500 bg-emerald-50/30 rounded-r-xl">
                      <ClipboardCheck className="text-emerald-600 mt-1" size={18} />
                      <div>
                        <p className="text-xs font-black uppercase">Morning Briefing Completed</p>
                        <p className="text-[10px] text-slate-500 font-medium">Material arrival confirmed. Site cleared for primary work.</p>
                        <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase">Today, 09:30 AM</p>
                      </div>
                   </div>
                   <div className="flex items-start gap-4 p-4 border-l-4 border-slate-300 bg-slate-50 rounded-r-xl grayscale opacity-60">
                      <FileText className="text-slate-400 mt-1" size={18} />
                      <div>
                        <p className="text-xs font-black uppercase">Shift 2 Report Pending</p>
                        <p className="text-[10px] text-slate-500 font-medium italic">Reports are usually uploaded after 06:00 PM</p>
                      </div>
                   </div>
                </div>
              </section>

              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 flex gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-[10px] text-amber-800 font-bold leading-relaxed uppercase tracking-tighter italic">
                  Note: Any progress stagnation beyond 48 hours will trigger an automated alert to ITPO project monitors.
                </p>
              </div>
            </div>

            {/* Panel Footer */}
            <div className="px-8 py-6 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 flex gap-4">
              <button className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest border-2 border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 transition-all">Audit History</button>
              <button className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-lg shadow-lg hover:opacity-90 transition-all">Download Log</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}