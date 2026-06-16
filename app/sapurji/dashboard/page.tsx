"use client";

import React, { useState, useEffect } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area 
} from "recharts";
import { 
  HardHat, FileText, Clock, ArrowUpRight, 
  MapPin, ClipboardCheck, History, Plus, 
  ArrowLeft, Upload, Save, CheckCircle2, 
  AlertCircle, X
} from "lucide-react";

// Texture URLs from TransparentTextures
const textures = {
  mainBg: "https://www.transparenttextures.com/patterns/symphony.png",
  cardBg: "https://www.transparenttextures.com/patterns/graphy.png",
  accentBg: "https://www.transparenttextures.com/patterns/carbon-fibre.png",
  formBg: "https://www.transparenttextures.com/patterns/shattered.png",
};

export default function ShapoorjiDashboard() {
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState("dashboard"); // dashboard, estimation-form, logs

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const kpiData = [
    { title: "Assigned Contracts", value: "24", icon: HardHat, color: "text-orange-600 bg-orange-100" },
    { title: "Pending Estimations", value: "06", icon: FileText, color: "text-blue-600 bg-blue-100" },
    { title: "Ongoing Projects", value: "12", icon: Clock, color: "text-emerald-600 bg-emerald-100" },
    { title: "Inspection Pending", value: "03", icon: ClipboardCheck, color: "text-purple-600 bg-purple-100" },
  ];

  const logHistory = [
    { id: 1, action: "Estimation Submitted", target: "CON-772 Facade Repair", time: "2 hours ago", user: "R. Sharma", status: "success" },
    { id: 2, action: "Engineer Assigned", target: "CON-810 Hall 3 Interior", time: "5 hours ago", user: "System", status: "info" },
    { id: 3, action: "Daily Progress Uploaded", target: "CON-901 Stone Paving", time: "Yesterday", user: "A. Khan", status: "success" },
    { id: 4, action: "Estimation Rejected", target: "CON-442 HVAC AMC", time: "2 days ago", user: "ITPO Admin", status: "error" },
  ];

  // --- RENDERING COMPONENTS ---

  const DashboardHome = () => (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Partner Dashboard</h1>
          <p className="text-slate-500 text-sm italic">Shapoorji Pallonji • Bharat Mandapam Division</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setView("logs")}
            className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
          >
            <History className="h-4 w-4" />
            View Logs
          </button>
          <button 
            onClick={() => setView("estimation-form")}
            className="flex items-center gap-2 bg-orange-600 px-4 py-2 rounded-lg text-sm font-semibold text-white hover:bg-orange-700 transition-all shadow-md"
          >
            <Plus className="h-4 w-4" />
            New Estimation
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {kpiData.map((kpi, i) => (
          <div key={i} className="relative p-6 rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden group">
            <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: `url(${textures.cardBg})` }} />
            <div className="flex items-center justify-between relative z-10">
              <div className={`p-2.5 rounded-lg ${kpi.color}`}>
                <kpi.icon className="h-5 w-5" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-slate-300 group-hover:text-orange-500 transition-colors" />
            </div>
            <div className="mt-4 relative z-10">
              <p className="text-2xl font-bold text-slate-900">{kpi.value}</p>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">{kpi.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 p-6 rounded-xl border border-slate-200 bg-white shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `url(${textures.cardBg})` }} />
          <h3 className="font-bold text-slate-800 mb-6 relative z-10">Work Intensity Trend</h3>
          <div className="h-72 relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[{d:'Mon', v:40}, {d:'Tue', v:35}, {d:'Wed', v:65}, {d:'Thu', v:55}, {d:'Fri', v:80}]}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="d" fontSize={12} axisLine={false} tickLine={false} />
                <YAxis fontSize={12} axisLine={false} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="v" stroke="#f97316" strokeWidth={2} fill="url(#colorVal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `url(${textures.cardBg})` }} />
          <h3 className="font-bold text-slate-800 mb-4 relative z-10">Ongoing Tasks</h3>
          <div className="space-y-4 relative z-10 text-xs">
            {["Exhibition Hall Repair", "Convention Center Wiring", "VVIP Lounge Polishing"].map((task, i) => (
              <div key={i} className="p-3 border rounded-lg hover:bg-slate-50 transition-colors">
                <p className="font-bold text-slate-700">{task}</p>
                <div className="mt-2 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-orange-500 h-full w-[60%]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  const EstimationForm = () => (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button onClick={() => setView("dashboard")} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-6 transition-colors font-semibold">
        <ArrowLeft className="h-4 w-4" /> Back to Overview
      </button>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{ backgroundImage: `url(${textures.formBg})` }} />
        
        <div className="bg-slate-900 p-6 text-white relative">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `url(${textures.accentBg})` }} />
          <h2 className="text-xl font-bold">New Work Estimation</h2>
          <p className="text-slate-400 text-xs mt-1 tracking-widest uppercase">Submission Form • SP-EST-2024</p>
        </div>

        <form className="p-8 space-y-6 relative z-10 bg-white/50 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-tight">Contract Reference</label>
              <select className="w-full p-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none">
                <option>CON-102: Plaza Renovation</option>
                <option>CON-105: Hall 4 Mechanical</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-tight">Estimation Amount (₹)</label>
              <input type="number" placeholder="4,50,000" className="w-full p-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-tight">Technical Description</label>
            <textarea rows={4} placeholder="Scope of work, materials required, and labor breakdown..." className="w-full p-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
          </div>

          <div className="p-6 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors flex flex-col items-center justify-center gap-2 cursor-pointer group">
            <Upload className="h-8 w-8 text-slate-400 group-hover:text-orange-500 transition-colors" />
            <p className="text-sm font-bold text-slate-600">Upload BOQ & Technical Documents</p>
            <p className="text-[10px] text-slate-400 uppercase">PDF, XLSX up to 10MB</p>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button type="button" onClick={() => setView("dashboard")} className="px-6 py-2 rounded-lg text-sm font-bold text-slate-500 hover:bg-slate-50 transition-all">Cancel</button>
            <button type="button" onClick={() => setView("dashboard")} className="px-8 py-2 bg-orange-600 text-white rounded-lg text-sm font-bold shadow-lg hover:bg-orange-700 transition-all flex items-center gap-2">
              <Save className="h-4 w-4" /> Submit to ITPO
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const LogsHistory = () => (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => setView("dashboard")} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-semibold">
          <ArrowLeft className="h-4 w-4" /> Dashboard
        </button>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Audit Log & Activity History</h2>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `url(${textures.cardBg})` }} />
        
        <div className="divide-y divide-slate-100 relative z-10">
          {logHistory.map((log) => (
            <div key={log.id} className="p-6 hover:bg-slate-50 transition-colors flex items-start gap-4">
              <div className={`p-2 rounded-full shrink-0 ${
                log.status === 'success' ? 'bg-emerald-100 text-emerald-600' : 
                log.status === 'error' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
              }`}>
                {log.status === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-bold text-slate-900">{log.action}</h4>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{log.time}</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Project: <span className="text-slate-700 font-semibold">{log.target}</span></p>
                <p className="text-[10px] text-slate-400 mt-2">Performed by: {log.user}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f9fafb] relative">
      {/* Background Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `url(${textures.mainBg})` }} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        {view === "dashboard" && <DashboardHome />}
        {view === "estimation-form" && <EstimationForm />}
        {view === "logs" && <LogsHistory />}

        <footer className="mt-16 pt-8 border-t border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
             <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-slate-900 rounded flex items-center justify-center font-bold text-white text-xs">S</div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em]">Shapoorji Pallonji Co. Ltd</p>
             </div>
             <p className="text-[10px] font-bold uppercase tracking-[0.2em]">© 2024 Contract Mgmt Portal • SP-ITPO</p>
          </div>
        </footer>
      </main>
    </div>
  );
}