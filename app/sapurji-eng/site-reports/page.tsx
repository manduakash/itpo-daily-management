"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  Search, 
  Download, 
  Filter, 
  Calendar, 
  MapPin, 
  ChevronRight, 
  CheckCircle, 
  AlertCircle,
  ShieldCheck,
  Zap,
  Eye,
  Share2,
  FileSearch
} from "lucide-react";

// --- Mock Data for Site Reports ---
const allReports = [
  {
    id: "SR-8802",
    title: "Daily Progress Report - Hall 1",
    date: "12 Oct 2023",
    type: "DPR",
    building: "Convention Centre",
    status: "Verified",
    author: "Engr. Amit Sharma",
    gradient: "from-blue-500/10 to-indigo-500/10",
    iconColor: "text-blue-600",
  },
  {
    id: "SR-8795",
    title: "Safety Inspection Report",
    date: "11 Oct 2023",
    type: "SIR",
    building: "VVIP Lounge Area",
    status: "Flagged",
    author: "Engr. Amit Sharma",
    gradient: "from-rose-500/10 to-orange-500/10",
    iconColor: "text-rose-600",
  },
  {
    id: "SR-8790",
    title: "Quality Audit - Electrical",
    date: "10 Oct 2023",
    type: "QIR",
    building: "Basement Level 1",
    status: "Pending",
    author: "Engr. Amit Sharma",
    gradient: "from-amber-500/10 to-yellow-500/10",
    iconColor: "text-amber-600",
  },
  {
    id: "SR-8782",
    title: "Weekly Material Summary",
    date: "08 Oct 2023",
    type: "WSR",
    building: "All Sites",
    status: "Verified",
    author: "Engr. Amit Sharma",
    gradient: "from-emerald-500/10 to-teal-500/10",
    iconColor: "text-emerald-600",
  },
  {
    id: "SR-8777",
    title: "HVAC Pressure Test Report",
    date: "07 Oct 2023",
    type: "QIR",
    building: "Plenary Hall",
    status: "Verified",
    author: "Engr. Amit Sharma",
    gradient: "from-violet-500/10 to-purple-500/10",
    iconColor: "text-violet-600",
  }
];

const reportTypes = ["All Reports", "DPR", "SIR", "QIR", "WSR"];

export default function SiteReports() {
  const [activeTab, setActiveTab] = useState("All Reports");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReports = allReports.filter((report) => {
    const matchesTab = activeTab === "All Reports" || report.type === activeTab;
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          report.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="p-4 md:p-8 space-y-8 bg-[#F8FAFC] dark:bg-slate-950 min-h-screen">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Site Reports</h1>
          <p className="text-slate-500 text-sm mt-1 flex items-center gap-2">
            <FileSearch size={16} className="text-indigo-500" />
            Archive of all inspection and progress documentation
          </p>
        </motion.div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-semibold text-slate-600 hover:shadow-md transition-all">
            <Download size={18} /> Export List
          </button>
        </div>
      </div>

      {/* --- STATS RIBBON --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Reports", value: "142", color: "text-indigo-600" },
          { label: "Verified", value: "128", color: "text-emerald-600" },
          { label: "Pending", value: "09", color: "text-amber-600" },
          { label: "Issues Flagged", value: "05", color: "text-rose-600" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm"
          >
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            <p className={`text-2xl font-black mt-1 ${stat.color}`}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* --- FILTERS & SEARCH --- */}
      <div className="flex flex-col md:flex-row justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-2">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {reportTypes.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-bold rounded-lg transition-all whitespace-nowrap ${
                activeTab === tab 
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" 
                : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500" />
          <input 
            type="text" 
            placeholder="Search report ID or title..."
            className="pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 w-full md:w-72"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* --- REPORTS GRID --- */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredReports.map((report, i) => (
            <motion.div
              key={report.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -5 }}
              className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all cursor-pointer relative overflow-hidden"
            >
              {/* Type Gradient Background */}
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${report.gradient} opacity-50 group-hover:opacity-100 transition-opacity`} />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2 rounded-lg bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 ${report.iconColor}`}>
                    {report.type === "SIR" ? <ShieldCheck size={20} /> : report.type === "QIR" ? <Zap size={20} /> : <FileText size={20} />}
                  </div>
                  <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${
                    report.status === 'Verified' ? 'bg-emerald-50 text-emerald-600' :
                    report.status === 'Flagged' ? 'bg-rose-50 text-rose-600' :
                    'bg-amber-50 text-amber-600'
                  }`}>
                    {report.status === 'Verified' ? <CheckCircle size={10} /> : <AlertCircle size={10} />}
                    {report.status}
                  </span>
                </div>

                <div className="space-y-1 mb-6">
                  <p className="text-[10px] font-black text-indigo-500 uppercase tracking-tighter">{report.id}</p>
                  <h3 className="text-base font-bold text-slate-800 dark:text-white group-hover:text-indigo-600 transition-colors line-clamp-1">{report.title}</h3>
                  <div className="flex items-center gap-3 mt-2 text-slate-400">
                    <span className="text-[11px] flex items-center gap-1 font-medium italic">
                      <MapPin size={12} /> {report.building}
                    </span>
                    <span className="text-[11px] flex items-center gap-1 font-medium">
                      <Calendar size={12} /> {report.date}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-500 uppercase">
                      {report.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-[11px] font-bold text-slate-500">{report.author}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors">
                      <Share2 size={16} />
                    </button>
                    <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors">
                      <Download size={16} />
                    </button>
                    <button className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-all">
                      <Eye size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* --- EMPTY STATE --- */}
      {filteredReports.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <div className="bg-slate-100 p-6 rounded-full mb-4">
            <FileText size={48} className="text-slate-300" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">No reports found</h2>
          <p className="text-slate-500 max-w-xs">We couldn't find any documents matching your current filter criteria.</p>
        </motion.div>
      )}

    </div>
  );
}