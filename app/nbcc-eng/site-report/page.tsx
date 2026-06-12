"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ClipboardCheck, 
  ShieldAlert, 
  FileText, 
  Download, 
  Eye, 
  Filter, 
  Search, 
  Plus,
  CheckCircle2,
  AlertCircle,
  FileBarChart,
  HardHat,
  Ruler,
  TrendingUp,
  MoreHorizontal
} from "lucide-react";

// --- Framer Motion Variants ---
const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0 }
};

// --- Mock Data ---
const reports = [
  {
    id: "REP-9921",
    title: "Structural Integrity Audit - Hall 1",
    type: "Quality Check",
    date: "24 Oct 2024",
    status: "Approved",
    severity: "Normal",
    author: "Engr. Rajesh Kumar",
    gradient: "from-blue-50 via-indigo-50 to-blue-100"
  },
  {
    id: "REP-8832",
    title: "Electrical Safety & Fire Compliance",
    type: "Safety Audit",
    date: "22 Oct 2024",
    status: "Pending ITPO",
    severity: "High",
    author: "Engr. Amit Sharma",
    gradient: "from-rose-50 via-orange-50 to-rose-100"
  },
  {
    id: "REP-7745",
    title: "Plumbing Pressure Test Report",
    type: "Technical Report",
    date: "20 Oct 2024",
    status: "Draft",
    severity: "Normal",
    author: "Engr. Sumit Das",
    gradient: "from-emerald-50 via-teal-50 to-emerald-100"
  },
  {
    id: "REP-6651",
    title: "HVAC Duct Alignment Verification",
    type: "Quality Check",
    date: "18 Oct 2024",
    status: "Approved",
    severity: "Low",
    author: "Engr. Rajesh Kumar",
    gradient: "from-purple-50 via-fuchsia-50 to-purple-100"
  }
];

export default function SiteReportPage() {
  const [activeTab, setActiveTab] = useState("All Reports");

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-10 text-slate-800">
      
      {/* Header & Stats Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex items-center gap-2 mb-2">
            <ClipboardCheck className="text-indigo-600" size={24} />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Compliance & Quality</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-800">Site Inspection <span className="text-indigo-600">Reports</span></h1>
          <p className="text-slate-500 font-medium mt-1">Formal verification and safety documentation for Bharat Mandapam.</p>
        </motion.div>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-slate-900 text-white px-6 py-4 rounded-2xl font-bold text-sm shadow-xl shadow-slate-200"
        >
          <Plus size={18} /> Create New Report
        </motion.button>
      </div>

      {/* Quick Summary Cards (Full Gradient) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { label: "Reports Filed", val: "128", icon: FileBarChart, grad: "from-indigo-500 to-blue-600" },
          { label: "Quality Score", val: "94%", icon: Ruler, grad: "from-emerald-500 to-teal-600" },
          { label: "Open Issues", val: "06", icon: ShieldAlert, grad: "from-rose-500 to-orange-600" }
        ].map((s, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-6 rounded-3xl bg-gradient-to-br ${s.grad} text-white shadow-lg relative overflow-hidden`}
          >
            <s.icon className="absolute right-[-10%] bottom-[-10%] w-32 h-32 opacity-20" />
            <p className="text-xs font-bold uppercase tracking-widest opacity-80">{s.label}</p>
            <h3 className="text-4xl font-black mt-2">{s.val}</h3>
          </motion.div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left: Filters & Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white/70 backdrop-blur-xl border border-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/50">
            <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
              <Filter size={14} /> Filter Reports
            </h4>
            <div className="space-y-2">
              {["All Reports", "Quality Checks", "Safety Audits", "Pending Review", "Drafts"].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                    activeTab === tab ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" : "text-slate-500 hover:bg-indigo-50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-[2rem] shadow-xl relative overflow-hidden">
             <div className="relative z-10">
                <TrendingUp className="text-amber-400 mb-4" />
                <h4 className="text-lg font-bold leading-tight">Monthly Compliance Rate</h4>
                <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-widest">Target: 98%</p>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-black">96.2%</span>
                  <span className="text-xs text-emerald-400 font-bold">+2.1%</span>
                </div>
             </div>
             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl" />
          </div>
        </div>

        {/* Right: Reports List */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="visible"
          className="lg:col-span-3 space-y-4"
        >
          {reports.map((report) => (
            <motion.div 
              key={report.id}
              variants={item}
              whileHover={{ x: 10 }}
              className={`relative overflow-hidden p-6 rounded-3xl border border-white shadow-xl shadow-slate-200/40 bg-gradient-to-r ${report.gradient} flex flex-col md:flex-row items-center gap-6 group transition-all`}
            >
              {/* Icon Container */}
              <div className="w-16 h-16 bg-white/60 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-sm shrink-0 border border-white">
                {report.type === "Safety Audit" ? <ShieldAlert className="text-rose-500" /> : <FileText className="text-indigo-600" />}
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 mb-1">
                  <span className="text-[10px] font-black text-indigo-600 uppercase tracking-tighter">#{report.id}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                    report.severity === 'High' ? 'bg-rose-500 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {report.severity} Priority
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 leading-tight group-hover:text-indigo-700 transition-colors">{report.title}</h3>
                <p className="text-xs font-semibold text-slate-400 mt-1">{report.type} • Filed by {report.author}</p>
              </div>

              {/* Status & Date */}
              <div className="flex flex-col items-center md:items-end gap-2 shrink-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase">{report.date}</span>
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                  report.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                }`}>
                  {report.status === 'Approved' ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                  {report.status}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 border-l border-white/50 pl-4">
                <button className="p-3 bg-white/50 hover:bg-indigo-600 hover:text-white rounded-xl transition-all shadow-sm">
                  <Eye size={18} />
                </button>
                <button className="p-3 bg-white/50 hover:bg-slate-900 hover:text-white rounded-xl transition-all shadow-sm">
                  <Download size={18} />
                </button>
              </div>
            </motion.div>
          ))}

          {/* Load More Button */}
          <div className="pt-6 flex justify-center">
             <button className="px-8 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-black uppercase tracking-[0.2em] text-slate-500 hover:bg-slate-50 transition-all shadow-sm">
               Load Archive Reports
             </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}