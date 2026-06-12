"use client";

import React, { useState, useEffect } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area 
} from "recharts";
import { 
  ExternalLink, FileSearch, Users, ArrowRight, 
  Filter, Search, MoreHorizontal, ChevronRight, 
  Activity, ArrowUpRight, ShieldCheck, Clock, X, CheckCircle2,
  AlertTriangle, Hammer, Zap, Settings, Droplets, IndianRupee,
  Briefcase, ClipboardList, Send, Loader2
} from "lucide-react";

// --- Mock Data & Constants ---
const kpiData = [
  { title: "Sent to Shapoorji", value: "24", trend: "Large scale handovers", icon: ExternalLink, bg: "bg-indigo-50/80 dark:bg-indigo-900/10", border: "border-indigo-200 dark:border-indigo-800", iconBg: "bg-indigo-600", textColor: "text-indigo-700 dark:text-indigo-400" },
  { title: "Awaiting Estimation", value: "09", trend: "Partner turnaround time", icon: Clock, bg: "bg-amber-50/80 dark:bg-amber-900/10", border: "border-amber-200 dark:border-amber-800", iconBg: "bg-amber-500", textColor: "text-amber-700 dark:text-amber-400" },
  { title: "Quotes for Audit", value: "06", trend: "Technical review due", icon: ClipboardList, bg: "bg-emerald-50/80 dark:bg-emerald-900/10", border: "border-emerald-200 dark:border-emerald-800", iconBg: "bg-emerald-600", textColor: "text-emerald-700 dark:text-emerald-400" },
  { title: "Partner Resource", value: "142", trend: "SPCL On-site personnel", icon: Users, bg: "bg-slate-100/80 dark:bg-slate-800/40", border: "border-slate-300 dark:border-slate-700", iconBg: "bg-slate-700", textColor: "text-slate-700 dark:text-slate-300" },
];

const workloadTrend = [
  { day: "Mon", forwarded: 4, estimations: 2 },
  { day: "Tue", forwarded: 7, estimations: 5 },
  { day: "Wed", forwarded: 5, estimations: 8 },
  { day: "Thu", forwarded: 8, estimations: 6 },
  { day: "Fri", forwarded: 12, estimations: 9 },
  { day: "Sat", forwarded: 9, estimations: 10 },
];

const partnerQueue = [
  { id: "BM-SPCL-701", title: "Convention Center Hall 1 Roof Restoration", priority: "Critical", type: "General Civil", status: "Awaiting Estimation", daysOpen: "3 Days", description: "Comprehensive structural repair of the main hall roof following structural audit recommendations." },
  { id: "BM-SPCL-712", title: "Main Substation Transformer Upgrade", priority: "High", type: "Electrical", status: "Estimation Submitted", daysOpen: "5 Days", description: "Replacement of 2 nos. 1500kVA transformers with latest high-efficiency models." },
  { id: "BM-SPCL-725", title: "Central Chiller Plant Piping Work", priority: "Medium", type: "Mechanical", status: "Under Audit", daysOpen: "7 Days", description: "Rerouting of secondary chilled water lines for the upcoming exhibition expansion." }
];

export default function NBCCForwardToShapoorji() {
  const [mounted, setMounted] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [remarks, setRemarks] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleAuditClick = (task: any) => {
    setSelectedTask(task);
    setIsAuditOpen(true);
  };

  const closeAudit = () => {
    setIsAuditOpen(false);
    setSelectedTask(null);
    setRemarks("");
  };

  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
        alert(`Institutional Audit Complete for ${selectedTask.id}. Forwarded to ITPO.`);
        setIsSubmitting(false);
        closeAudit();
    }, 1500);
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
              <span className="bg-indigo-600 text-white text-[10px] font-black px-2 py-0.5 rounded tracking-tighter uppercase">Partner Management</span>
              <span className="text-slate-400 text-xs font-bold flex items-center gap-1 uppercase tracking-widest"><ShieldCheck className="h-3.5 w-3.5" /> Bharat Mandapam Oversight</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight uppercase">Forward to Shapoorji</h1>
            <p className="text-slate-500 text-sm mt-1 font-medium italic">Monitoring Large Scale projects assigned to Shapoorji Pallonji (SPCL) for technical estimation.</p>
          </div>
          <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-5 py-2.5 text-xs font-black bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm hover:bg-slate-50 transition-all uppercase tracking-wider">
               <ClipboardList size={14} /> Performance Audit
            </button>
          </div>
        </div>

        {/* KPI Grid */}
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
                <p className="text-[10px] font-bold text-slate-500 mt-2 flex items-center gap-1 uppercase tracking-tighter italic">{kpi.trend}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Collaboration Velocity Chart */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
            <div className="flex justify-between items-center mb-10">
               <div>
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Partner Velocity</h3>
                  <p className="text-xl font-black tracking-tight uppercase">Forwarded vs Est. Received</p>
               </div>
               <div className="flex gap-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                     <div className="h-2 w-2 rounded-full bg-indigo-600" /> Handed Over
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                     <div className="h-2 w-2 rounded-full bg-emerald-500" /> Quoted
                  </div>
               </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={workloadTrend}>
                  <defs>
                    <linearGradient id="colorForward" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" fontSize={10} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 'bold'}} />
                  <YAxis fontSize={10} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 'bold'}} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="forwarded" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorForward)" />
                  <Area type="monotone" dataKey="estimations" stroke="#10b981" strokeWidth={3} fill="transparent" strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-center items-center text-center">
             <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `url('https://transparenttextures.com/patterns/cubes.png')` }} />
             <div className="h-20 w-20 rounded-full bg-indigo-500/20 border-2 border-indigo-500/50 flex items-center justify-center mb-6">
                <ClipboardList className="text-indigo-400" size={32} />
             </div>
             <h3 className="text-white text-lg font-black uppercase tracking-widest mb-2">Technical Queue</h3>
             <p className="text-slate-400 text-xs font-medium uppercase leading-relaxed tracking-tighter">Current workload awaiting NBCC Technical Remarks before ITPO validation.</p>
             <div className="mt-8 text-4xl font-black text-white tracking-tighter">06</div>
             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Files Pending Audit</span>
          </div>
        </div>

        {/* Partner Queue Table */}
        <div className="bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-[0.15em]">External Partner Pipeline</h3>
            <button className="text-[10px] font-black text-indigo-600 uppercase hover:underline">View All Forwarded Files</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 bg-slate-50/50 dark:bg-slate-800/50">
                  <th className="py-4 px-8">Handover ID</th>
                  <th className="py-4 px-6">Work Description</th>
                  <th className="py-4 px-6">Current Status</th>
                  <th className="py-4 px-6 text-center">TAT Log</th>
                  <th className="py-4 px-8 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {partnerQueue.map((task) => (
                  <tr key={task.id} className="group hover:bg-white dark:hover:bg-slate-800/80 transition-all">
                    <td className="py-5 px-8 font-mono text-xs font-bold text-slate-400 group-hover:text-indigo-600">{task.id}</td>
                    <td className="py-5 px-6">
                      <div className="font-bold text-sm text-slate-800 dark:text-slate-100">{task.title}</div>
                      <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">{task.type}</div>
                    </td>
                    <td className="py-5 px-6">
                      <span className={`text-[10px] font-black uppercase px-2 py-1 rounded border ${
                        task.status.includes('Awaiting') ? 'bg-amber-50 text-amber-600 border-amber-100' :
                        task.status.includes('Audit') ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                        'bg-emerald-50 text-emerald-600 border-emerald-100'
                      }`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="py-5 px-6 text-center text-slate-500 font-black text-[11px] uppercase">
                       <Clock size={12} className="inline mr-1 opacity-40" /> {task.daysOpen}
                    </td>
                    <td className="py-5 px-8 text-right">
                      {task.status === "Awaiting Estimation" ? (
                         <button className="px-4 py-1.5 text-[10px] font-black uppercase border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 transition-all tracking-widest text-slate-400">Recall</button>
                      ) : (
                        <button 
                          onClick={() => handleAuditClick(task)}
                          className="px-4 py-1.5 text-[10px] font-black uppercase bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded hover:bg-indigo-600 dark:hover:bg-indigo-400 hover:text-white transition-all shadow-sm active:scale-95"
                        >
                          Audit Quote
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* --- WORKABLE AUDIT SIDE PANEL --- */}
      {isAuditOpen && (
        <>
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] transition-opacity duration-300" onClick={closeAudit} />
          
          <div className="fixed inset-y-0 right-0 w-full max-w-lg bg-white dark:bg-slate-950 z-[70] shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col transform transition-transform duration-500 ease-in-out animate-in slide-in-from-right">
            
            <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
              <div>
                <h2 className="text-xl font-black tracking-tight uppercase">Technical Audit</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Validating SPCL Quote • {selectedTask?.id}</p>
              </div>
              <button onClick={closeAudit} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {/* Context */}
              <section className="space-y-4">
                <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">Partner Submission</h3>
                <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-xl border border-slate-100 dark:border-slate-800 relative">
                   <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url('https://transparenttextures.com/patterns/cubes.png')` }} />
                  <h4 className="font-bold text-lg mb-2 leading-tight">{selectedTask?.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">"{selectedTask?.description}"</p>
                </div>
              </section>

              {/* Estimation Details */}
              <section className="space-y-4">
                <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">Quotation Summary</h3>
                <div className="bg-emerald-50 dark:bg-emerald-950/20 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-900 flex justify-between items-center">
                   <div>
                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Total Project Cost</p>
                      <div className="flex items-center gap-1.5 text-3xl font-black text-emerald-700 dark:text-emerald-400 font-mono tracking-tighter">
                         <IndianRupee size={24} /> 4,50,000.00
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-[9px] font-bold text-emerald-600/70 uppercase">Valid for</p>
                      <p className="text-xs font-black text-emerald-600 uppercase">30 Days</p>
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 rounded-xl flex items-center justify-between">
                      <span className="text-[10px] font-black text-slate-400 uppercase">Labor</span>
                      <span className="text-xs font-black">₹1.2L</span>
                   </div>
                   <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 rounded-xl flex items-center justify-between">
                      <span className="text-[10px] font-black text-slate-400 uppercase">Material</span>
                      <span className="text-xs font-black">₹3.3L</span>
                   </div>
                </div>
              </section>

              {/* NBCC Audit Remarks */}
              <section className="space-y-4">
                <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">Institutional Audit Remarks</h3>
                <textarea 
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Type technical observations for ITPO Final Approval..." 
                  className="w-full h-32 bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-xl p-4 text-xs font-bold uppercase tracking-tight focus:border-indigo-600 transition-all outline-none"
                />
              </section>

              <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-[10px] text-amber-800 font-bold leading-relaxed uppercase tracking-tighter italic">
                  Note: Forwarding this audit signals that NBCC has verified the quotation against standard market rates. ITPO will release budget based on your sign-off.
                </p>
              </div>
            </div>

            {/* Panel Footer */}
            <div className="px-8 py-6 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 flex gap-4">
              <button 
                onClick={closeAudit}
                className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest border-2 border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 transition-all active:scale-95"
              >
                Send Back
              </button>
              <button 
                disabled={!remarks || isSubmitting}
                onClick={handleFinalSubmit}
                className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 ${!remarks ? "bg-slate-200 text-slate-400 cursor-not-allowed" : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-500/20 active:scale-95"}`}
              >
                {isSubmitting ? (
                  <><Loader2 className="animate-spin" size={14} /> Processing</>
                ) : (
                  <><Send size={14} /> Forward to ITPO</>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}