"use client";

import React, { useState, useEffect } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, Legend
} from "recharts";
import { 
  FileText, Download, Filter, Calendar, Search, 
  ChevronRight, Activity, ArrowUpRight, ShieldCheck, 
  Clock, X, FileSearch, HardHat, Users, CheckCircle2,
  TrendingUp, PieChart as PieIcon, BarChart3, Info,
  ExternalLink, IndianRupee
} from "lucide-react";

// --- Mock Data & Constants ---
const kpiData = [
  { title: "Audit Reports", value: "42", trend: "Q3 Compliance", icon: FileSearch, bg: "bg-indigo-50/80 dark:bg-indigo-900/10", border: "border-indigo-200 dark:border-indigo-800", iconBg: "bg-indigo-600", textColor: "text-indigo-700 dark:text-indigo-400" },
  { title: "Budget Utilized", value: "₹4.2Cr", trend: "Within Est. Limit", icon: IndianRupee, bg: "bg-emerald-50/80 dark:bg-emerald-900/10", border: "border-emerald-200 dark:border-emerald-800", iconBg: "bg-emerald-600", textColor: "text-emerald-700 dark:text-emerald-400" },
  { title: "Safety Audits", value: "100%", trend: "Zero Incidents", icon: ShieldCheck, bg: "bg-amber-50/80 dark:bg-amber-900/10", border: "border-amber-200 dark:border-amber-800", iconBg: "bg-amber-500", textColor: "text-amber-700 dark:text-amber-400" },
  { title: "Generated Logs", value: "156", trend: "Daily site exports", icon: FileText, bg: "bg-slate-100/80 dark:bg-slate-800/40", border: "border-slate-300 dark:border-slate-700", iconBg: "bg-slate-700", textColor: "text-slate-700 dark:text-slate-300" },
];

const completionTrend = [
  { month: "Apr", completed: 12, target: 15 },
  { month: "May", completed: 18, target: 20 },
  { month: "Jun", completed: 15, target: 15 },
  { month: "Jul", completed: 22, target: 25 },
  { month: "Aug", completed: 30, target: 30 },
];

const categoryData = [
  { name: "Civil", value: 45, color: "#4f46e5" },
  { name: "Electrical", value: 25, color: "#10b981" },
  { name: "Mechanical", value: 20, color: "#f59e0b" },
  { name: "Plumbing", value: 10, color: "#64748b" },
];

const reportArchive = [
  { id: "REP-2025-001", title: "Quarterly Infrastructure Audit", type: "Institutional", date: "15 Sep 2024", size: "2.4 MB", status: "Verified" },
  { id: "REP-2025-014", title: "Shapoorji Monthly Progress (Large Scale)", type: "External", date: "12 Sep 2024", size: "4.1 MB", status: "Under Review" },
  { id: "REP-2025-022", title: "Internal Maintenance Cost Log", type: "Financial", date: "10 Sep 2024", size: "1.8 MB", status: "Verified" },
];

export default function NBCCReportsDashboard() {
  const [mounted, setMounted] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);

  useEffect(() => { setMounted(true); }, []);

  const handleReportView = (report: any) => {
    setSelectedReport(report);
    setIsReportOpen(true);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#f1f5f9] dark:bg-[#020617] text-slate-900 dark:text-slate-50 relative overflow-hidden font-sans">
      {/* Blueprint Texture Overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: `url('https://transparenttextures.com/patterns/cubes.png')` }} />

      <main className="relative z-10 p-6 lg:p-10 max-w-[1600px] mx-auto space-y-8">
        
        {/* Professional Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black px-2 py-0.5 rounded tracking-tighter uppercase">Analytical Hub</span>
              <span className="text-slate-400 text-xs font-bold flex items-center gap-1 uppercase tracking-widest"><TrendingUp className="h-3.5 w-3.5" /> PMC Performance Logs</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight uppercase">Audit & Reports</h1>
            <p className="text-slate-500 text-sm mt-1 font-medium italic">Comprehensive institutional reporting on Bharat Mandapam project lifecycles.</p>
          </div>
          <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-5 py-2.5 text-xs font-black bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm hover:bg-slate-50 transition-all uppercase tracking-wider">
               <Calendar size={14} /> Custom Range
            </button>
             <button className="flex items-center gap-2 px-5 py-2.5 text-xs font-black bg-indigo-600 text-white rounded-lg shadow-xl shadow-indigo-500/20 hover:scale-[1.02] transition-all uppercase tracking-wider">
               <Download size={14} /> Generate Master Export
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

        {/* Analytics Section */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Completion Velocity Bar Chart */}
          <div className="lg:col-span-2 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Execution Velocity</h3>
                <p className="text-xl font-black tracking-tight uppercase">Monthly Target vs Achievement</p>
              </div>
              <BarChart3 size={24} className="text-slate-200" />
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={completionTrend}>
                  <XAxis dataKey="month" fontSize={10} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 'bold'}} />
                  <YAxis fontSize={10} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 'bold'}} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="target" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={20} />
                  <Bar dataKey="completed" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Trade Share Pie Chart */}
          <div className="bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm flex flex-col">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-8">Workload Trade Share</h3>
            <div className="h-56 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} innerRadius={70} outerRadius={90} paddingAngle={5} dataKey="value">
                    {categoryData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute text-center">
                <PieIcon size={20} className="text-slate-300 mx-auto mb-1" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Trade Mix</span>
              </div>
            </div>
            <div className="space-y-3 mt-8">
              {categoryData.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-[10px] font-black text-slate-500 uppercase">{item.name}</span>
                  </div>
                  <span className="text-[10px] font-black">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Report Archive Table */}
        <div className="bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/20">
            <h3 className="text-sm font-black uppercase tracking-[0.15em]">Report Distribution Archive</h3>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <input type="text" placeholder="Search archive..." className="bg-white border border-slate-200 rounded-md py-1.5 pl-9 pr-4 text-[10px] w-48 outline-none" />
              </div>
              <button className="p-2 hover:bg-white rounded-md border border-transparent hover:border-slate-200 transition-all text-slate-400"><Filter size={14} /></button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 bg-white dark:bg-slate-950/50">
                  <th className="py-4 px-8 border-b border-slate-100 dark:border-slate-800">Report Reference</th>
                  <th className="py-4 px-6 border-b border-slate-100 dark:border-slate-800">Category</th>
                  <th className="py-4 px-6 border-b border-slate-100 dark:border-slate-800">Date Generated</th>
                  <th className="py-4 px-6 border-b border-slate-100 dark:border-slate-800">File Metadata</th>
                  <th className="py-4 px-8 border-b border-slate-100 dark:border-slate-800 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {reportArchive.map((report) => (
                  <tr key={report.id} className="group hover:bg-white dark:hover:bg-slate-800/80 transition-all">
                    <td className="py-6 px-8">
                      <div className="flex items-center gap-4">
                         <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded text-slate-400 group-hover:text-indigo-600 transition-colors">
                            <FileText size={18} />
                         </div>
                         <div>
                            <div className="font-bold text-sm text-slate-800 dark:text-slate-100">{report.title}</div>
                            <div className="text-[10px] font-mono font-bold text-slate-400 mt-0.5">{report.id}</div>
                         </div>
                      </div>
                    </td>
                    <td className="py-6 px-6">
                       <span className="text-[10px] font-black uppercase px-2 py-1 rounded bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-500">{report.type}</span>
                    </td>
                    <td className="py-6 px-6 font-bold text-[11px] text-slate-600 dark:text-slate-300 uppercase tracking-tighter">
                       <Clock size={12} className="inline mr-1 opacity-40" /> {report.date}
                    </td>
                    <td className="py-6 px-6">
                       <div className="text-[10px] font-black uppercase text-slate-400">{report.size}</div>
                       <div className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">{report.status}</div>
                    </td>
                    <td className="py-6 px-8 text-right">
                       <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleReportView(report)}
                            className="p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg text-slate-400 hover:text-indigo-600 transition-all"
                          >
                            <ChevronRight size={20} />
                          </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* --- REPORT PREVIEW DRAWER --- */}
      {isReportOpen && (
        <>
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]" onClick={() => setIsReportOpen(false)} />
          <div className="fixed inset-y-0 right-0 w-full max-w-lg bg-white dark:bg-slate-950 z-[70] shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col animate-in slide-in-from-right duration-300">
            
            <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
              <div>
                <h2 className="text-xl font-black uppercase tracking-tight">Audit Summary</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Reviewing {selectedReport?.id}</p>
              </div>
              <button onClick={() => setIsReportOpen(false)} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors"><X size={20} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {/* Institutional Branding */}
              <div className="p-8 border-2 border-slate-100 rounded-2xl relative overflow-hidden bg-slate-50/50 text-center">
                 <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url('https://transparenttextures.com/patterns/cubes.png')` }} />
                 <ShieldCheck className="h-10 w-10 text-slate-300 mx-auto mb-4" />
                 <h3 className="font-black text-sm uppercase tracking-[0.3em] text-slate-400 mb-2">Bharat Mandapam Audit</h3>
                 <p className="text-xl font-black uppercase tracking-tight">{selectedReport?.title}</p>
              </div>

              {/* metadata Grid */}
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 border border-slate-100 rounded-xl bg-white dark:bg-slate-900">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Generated By</p>
                    <p className="text-xs font-black uppercase tracking-tighter">NBCC PMC System</p>
                 </div>
                 <div className="p-4 border border-slate-100 rounded-xl bg-white dark:bg-slate-900">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Trade Origin</p>
                    <p className="text-xs font-black uppercase tracking-tighter">{selectedReport?.type}</p>
                 </div>
              </div>

              {/* Data Insights Section */}
              <section className="space-y-4">
                 <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">Audit Insights</h3>
                 <div className="space-y-4">
                    <div className="flex items-center gap-4">
                       <div className="h-8 w-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600"><CheckCircle2 size={16}/></div>
                       <p className="text-xs font-bold text-slate-600 leading-relaxed uppercase tracking-tighter">Cost Efficiency maintained at 100% of approved ITPO budget.</p>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="h-8 w-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600"><Activity size={16}/></div>
                       <p className="text-xs font-bold text-slate-600 leading-relaxed uppercase tracking-tighter">Daily site reports successfully merged for Case 2 & 3 workflows.</p>
                    </div>
                 </div>
              </section>

              <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 flex gap-3">
                <Info className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
                <p className="text-[10px] text-indigo-800 font-bold leading-relaxed uppercase tracking-tighter">
                  This report is cryptographically signed and stored in the ITPO master repository. All subsequent modifications will trigger an audit alert.
                </p>
              </div>
            </div>

            {/* Panel Footer */}
            <div className="px-8 py-6 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 flex gap-4">
              <button className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest border-2 border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                 <ExternalLink size={14} /> Open Full Audit
              </button>
              <button className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-lg shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2">
                 <Download size={14} /> Download PDF
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}