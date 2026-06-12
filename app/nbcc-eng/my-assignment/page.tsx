"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, Filter, Calendar, MapPin, 
  Clock, AlertCircle, CheckCircle2, 
  ChevronRight, MoreVertical, LayoutGrid, 
  List, HardHat, Hammer, Droplets, Zap
} from "lucide-react";

// --- Framer Motion Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// --- Mock Data ---
const assignments = [
  {
    id: "CON-7721",
    title: "Electrical Panel Maintenance - Hall 3",
    location: "Level 1, Bharat Mandapam",
    category: "Electrical",
    priority: "Critical",
    deadline: "24 Oct 2024",
    progress: 65,
    status: "In Progress",
    gradient: "from-blue-50 via-blue-100 to-indigo-200",
    icon: Zap
  },
  {
    id: "CON-8102",
    title: "Plumbing Pipe Replacement",
    location: "VIP Lounge Area, Zone B",
    category: "Plumbing",
    priority: "High",
    deadline: "26 Oct 2024",
    progress: 30,
    status: "In Progress",
    gradient: "from-emerald-50 via-emerald-100 to-teal-200",
    icon: Droplets
  },
  {
    id: "CON-6690",
    title: "General Civil - Floor Repairing",
    location: "Main Entrance Lobby",
    category: "General Civil",
    priority: "Medium",
    deadline: "30 Oct 2024",
    progress: 100,
    status: "Completed",
    gradient: "from-orange-50 via-orange-100 to-amber-200",
    icon: Hammer
  },
  {
    id: "CON-9011",
    title: "HVAC Filter Cleaning & Service",
    location: "Conference Room G, Level 2",
    category: "Mechanical",
    priority: "Low",
    deadline: "02 Nov 2024",
    progress: 0,
    status: "Assigned",
    gradient: "from-purple-50 via-purple-100 to-fuchsia-200",
    icon: HardHat
  }
];

export default function MyAssignmentsPage() {
  const [filter, setFilter] = useState("All");

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-10">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">My Assignments</h1>
          <p className="text-slate-500 font-medium">NBCC Direct Execution | Management Console</p>
        </motion.div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search tasks..." 
              className="pl-10 pr-4 py-2 bg-white/70 backdrop-blur-md border border-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm w-64"
            />
          </div>
          <button className="p-2 bg-white rounded-xl border border-white shadow-sm hover:bg-slate-50">
            <Filter className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 mb-8"
      >
        {["All", "In Progress", "Pending", "Completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
              filter === tab 
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" 
              : "bg-white text-slate-500 hover:bg-indigo-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </motion.div>

      {/* Assignment Cards Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {assignments.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className={`group relative overflow-hidden rounded-3xl border border-white shadow-xl shadow-slate-200/60 p-6 bg-gradient-to-br ${item.gradient}`}
            >
              {/* Top Row: Icon & ID */}
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white/60 backdrop-blur-md rounded-2xl shadow-sm">
                  <Icon className="w-6 h-6 text-slate-700" />
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase mb-1">
                    #{item.id}
                  </span>
                  <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-tighter ${
                    item.priority === "Critical" ? "bg-rose-500 text-white" : 
                    item.priority === "High" ? "bg-orange-500 text-white" : "bg-slate-200 text-slate-600"
                  }`}>
                    {item.priority}
                  </span>
                </div>
              </div>

              {/* Title & Info */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-800 leading-tight group-hover:text-indigo-700 transition-colors">
                  {item.title}
                </h3>
                <div className="flex flex-col gap-2 mt-3">
                  <div className="flex items-center gap-2 text-slate-500">
                    <MapPin size={14} className="text-slate-400" />
                    <span className="text-xs font-semibold">{item.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <Calendar size={14} className="text-slate-400" />
                    <span className="text-xs font-semibold">Deadline: {item.deadline}</span>
                  </div>
                </div>
              </div>

              {/* Progress Section */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-600">Completion</span>
                  <span className="text-xs font-black text-indigo-600">{item.progress}%</span>
                </div>
                <div className="h-2 w-full bg-white/50 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.progress}%` }}
                    transition={{ duration: 1 }}
                    className="h-full bg-indigo-600 rounded-full shadow-[0_0_8px_rgba(79,70,229,0.4)]"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button className="flex-1 py-3 bg-white/80 backdrop-blur-sm border border-white text-slate-700 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                  Update Progress
                </button>
                <button className="p-3 bg-white/40 backdrop-blur-sm border border-white text-slate-700 rounded-2xl hover:bg-white transition-all">
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Background Glass Ornament */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/20 rounded-full blur-2xl" />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Footer Info / Floating Action */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 p-6 bg-white/50 backdrop-blur-md rounded-3xl border border-white flex flex-col md:flex-row items-center justify-between shadow-sm"
      >
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <div className="flex -space-x-3">
             {[1, 2, 3].map((i) => (
               <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                 EN
               </div>
             ))}
          </div>
          <p className="text-xs font-bold text-slate-500 tracking-tight">
            You are currently lead engineer for <span className="text-indigo-600 underline">4 active contracts</span>
          </p>
        </div>
        <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl text-xs font-bold shadow-xl hover:scale-105 transition-all">
          <Clock size={16} className="text-amber-400" /> View Duty Roster
        </button>
      </motion.div>
    </div>
  );
}