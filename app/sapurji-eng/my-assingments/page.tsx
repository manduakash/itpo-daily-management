"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  ChevronRight, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  FileText,
  Hammer,
  ArrowUpRight,
  MoreVertical
} from "lucide-react";

// --- Mock Data ---
const assignments = [
  {
    id: "CON-9901",
    title: "Convention Hall 1: Flooring Renovation",
    location: "Level 2, Zone A",
    category: "General Civil",
    priority: "Critical",
    status: "Active",
    deadline: "Oct 30, 2023",
    progress: 65,
    description: "Installation of Italian marble and leveling of the sub-floor.",
    gradient: "from-rose-500/5 to-transparent"
  },
  {
    id: "CON-9905",
    title: "VVIP Lounge: HVAC Integration",
    location: "Block C, Entrance 4",
    category: "Mechanical",
    priority: "High",
    status: "Active",
    deadline: "Nov 05, 2023",
    progress: 30,
    description: "Installing secondary ducting for the new lounge area.",
    gradient: "from-amber-500/5 to-transparent"
  },
  {
    id: "CON-9844",
    title: "External Facade Lighting",
    location: "North Plaza",
    category: "Electrical",
    priority: "Medium",
    status: "Pending Approval",
    deadline: "Nov 12, 2023",
    progress: 0,
    description: "Testing of LED strips on the glass fins of the main building.",
    gradient: "from-blue-500/5 to-transparent"
  },
  {
    id: "CON-9721",
    title: "Plumbing Pressure Test",
    location: "Kitchen Area G",
    category: "Plumbing",
    priority: "Low",
    status: "Completed",
    deadline: "Oct 15, 2023",
    progress: 100,
    description: "Final pressure test for main supply lines completed.",
    gradient: "from-emerald-500/5 to-transparent"
  }
];

const tabs = ["All Assignments", "Active", "Pending Approval", "Completed"];

export default function MyAssignments() {
  const [activeTab, setActiveTab] = useState("All Assignments");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAssignments = assignments.filter((item) => {
    const matchesTab = activeTab === "All Assignments" || item.status === activeTab;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="p-4 md:p-8 space-y-8 bg-[#FDFDFD] dark:bg-slate-950 min-h-screen">
      
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">My Assignments</h1>
          <p className="text-slate-500 mt-2 flex items-center gap-2">
            <Hammer className="h-4 w-4 text-indigo-500" />
            Manage and track your active site works
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search contracts..."
              className="pl-10 pr-4 py-2.5 w-full md:w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Filter className="h-5 w-5" />
          </button>
        </motion.div>
      </div>

      {/* --- Filter Tabs --- */}
      <div className="flex items-center border-b border-slate-100 dark:border-slate-800 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-6 py-4 text-sm font-semibold whitespace-nowrap transition-colors ${
              activeTab === tab ? "text-indigo-600" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div 
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
              />
            )}
          </button>
        ))}
      </div>

      {/* --- Assignment Grid --- */}
      <motion.div 
        layout
        className="grid grid-cols-1 xl:grid-cols-2 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredAssignments.map((work) => (
            <motion.div
              key={work.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className={`group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all p-6`}
            >
              {/* Subtle Gradient Glow */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${work.gradient} pointer-events-none`} />

              <div className="relative z-10 flex flex-col h-full">
                {/* Top Row: ID & Status */}
                <div className="flex items-start justify-between mb-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold tracking-widest text-indigo-500 uppercase">{work.id}</span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                      {work.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${
                      work.status === 'Active' ? 'bg-indigo-50 text-indigo-600' :
                      work.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {work.status}
                    </span>
                    <button className="text-slate-300 hover:text-slate-600 transition-colors">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Info Pills */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-50 dark:bg-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700">
                    <MapPin className="h-3.5 w-3.5 text-indigo-400" />
                    {work.location}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-50 dark:bg-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700">
                    <Calendar className="h-3.5 w-3.5 text-indigo-400" />
                    Due: {work.deadline}
                  </div>
                  <div className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-lg border ${
                    work.priority === 'Critical' ? 'text-rose-600 bg-rose-50 border-rose-100' : 
                    'text-amber-600 bg-amber-50 border-amber-100'
                  }`}>
                    <AlertCircle className="h-3.5 w-3.5" />
                    {work.priority}
                  </div>
                </div>

                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-6">
                  {work.description}
                </p>

                {/* Progress Section */}
                <div className="mt-auto pt-6 border-t border-slate-50 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Completion Progress</span>
                    <span className="text-xs font-black text-indigo-600">{work.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${work.progress}%` }}
                      transition={{ duration: 1 }}
                      className={`h-full rounded-full ${
                        work.status === 'Completed' ? 'bg-emerald-500' : 'bg-indigo-500'
                      }`}
                    />
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex items-center justify-between gap-3">
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all group">
                      <FileText className="h-4 w-4 text-slate-400 group-hover:text-indigo-500" />
                      View Details
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 dark:shadow-none group">
                      Update Progress
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* --- Empty State --- */}
      {filteredAssignments.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="h-10 w-10 text-slate-200" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">No Assignments Found</h3>
          <p className="text-slate-500">Try adjusting your filters or search query.</p>
        </div>
      )}
    </div>
  );
}