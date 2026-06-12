"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell,
} from "recharts";
import {
  HardHat,
  ClipboardCheck,
  Clock,
  AlertTriangle,
  Camera,
  MapPin,
  ArrowRight,
  CheckCircle,
  Calendar,
  History,
  TrendingUp,
  Filter,
  MoreHorizontal
} from "lucide-react";

// --- Mock Data for Engineer ---
const engineerKPIs = [
  {
    title: "My Active Tasks",
    value: "14",
    description: "4 tasks due this week",
    icon: HardHat,
    gradient: "from-indigo-500/30 via-transparent to-transparent",
    border: "border-indigo-500/20",
    iconColor: "text-indigo-600",
  },
  {
    title: "Daily Reports Due",
    value: "03",
    description: "Pending for Hall 3, 5",
    icon: ClipboardCheck,
    gradient: "from-amber-500/30 via-transparent to-transparent",
    border: "border-amber-500/20",
    iconColor: "text-amber-600",
  },
  {
    title: "Site Progress",
    value: "88%",
    description: "Avg. across 5 sites",
    icon: TrendingUp,
    gradient: "from-emerald-500/30 via-transparent to-transparent",
    border: "border-emerald-500/20",
    iconColor: "text-emerald-600",
  },
  {
    title: "Pending Inspection",
    value: "06",
    description: "Awaiting ITPO sign-off",
    icon: CheckCircle,
    gradient: "from-blue-500/30 via-transparent to-transparent",
    border: "border-blue-500/20",
    iconColor: "text-blue-600",
  },
];

const progressData = [
  { day: "Mon", actual: 40, planned: 45 },
  { day: "Tue", actual: 55, planned: 50 },
  { day: "Wed", actual: 48, planned: 55 },
  { day: "Thu", actual: 70, planned: 65 },
  { day: "Fri", actual: 85, planned: 75 },
  { day: "Sat", actual: 92, planned: 85 },
];

const categoryData = [
  { name: "Civil Work", value: 45, color: "#6366f1" },
  { name: "Electrical", value: 25, color: "#f59e0b" },
  { name: "Finishing", value: 30, color: "#10b981" },
];

const assignmentList = [
  {
    id: "CON-7821",
    site: "Convention Hall 3",
    task: "Granite Flooring & Polishing",
    deadline: "24 Oct 2023",
    progress: 75,
    status: "In Progress",
    priority: "High"
  },
  {
    id: "CON-7844",
    site: "G20 Plenary Hall",
    task: "Acoustic Panel Installation",
    deadline: "28 Oct 2023",
    progress: 40,
    status: "Delayed",
    priority: "Critical"
  },
  {
    id: "CON-7850",
    site: "Basement Parking B",
    task: "Fire Sprinkler Testing",
    deadline: "02 Nov 2023",
    progress: 10,
    status: "Starting",
    priority: "Medium"
  },
];

// --- Framer Motion Variants ---
const containerVar = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVar = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export default function ShapoorjiEngineerDashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div 
      variants={containerVar}
      initial="hidden"
      animate="visible"
      className="p-4 md:p-8 space-y-8 bg-[#F8FAFC] dark:bg-slate-950 min-h-screen font-sans"
    >
      {/* --- HEADER SECTION --- */}
      <motion.div variants={itemVar} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm mb-1 uppercase tracking-wider">
            <div className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
            Live Execution Portal
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Shapoorji Engineer Dashboard
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Welcome back, <span className="font-semibold text-slate-700">Shapoorji Site Team</span>. You have 3 reports due today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <History className="h-4 w-4" />
            Logs
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 dark:shadow-none">
            <Camera className="h-4 w-4" />
            New Site Update
          </button>
        </div>
      </motion.div>

      {/* --- KPI GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {engineerKPIs.map((kpi, i) => (
          <motion.div
            key={i}
            variants={itemVar}
            whileHover={{ y: -5 }}
            className={`relative group overflow-hidden bg-white dark:bg-slate-900 border ${kpi.border} p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300`}
          >
            <div className={`absolute inset-0 bg-gradient-to-b ${kpi.gradient} transition-opacity group-hover:opacity-100`} />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2.5 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 ${kpi.iconColor}`}>
                  <kpi.icon size={20} />
                </div>
                <MoreHorizontal className="text-slate-300 cursor-pointer" size={18} />
              </div>
              <div className="space-y-1">
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{kpi.value}</h3>
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">{kpi.title}</p>
                <p className="text-[11px] text-slate-400 font-medium uppercase tracking-tighter pt-2 flex items-center gap-1">
                   {kpi.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- CHARTS SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress Area Chart */}
        <motion.div variants={itemVar} className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">Daily Execution Trend</h2>
              <p className="text-xs text-slate-500 font-medium">Actual progress vs Planned baseline</p>
            </div>
            <select className="bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-xs font-bold px-3 py-1.5 focus:ring-0">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={progressData}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="actual" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorActual)" />
                <Area type="monotone" dataKey="planned" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Donut Chart */}
        <motion.div variants={itemVar} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Work Distribution</h2>
          <p className="text-xs text-slate-500 mb-8 font-medium">Breakdown by trade</p>
          <div className="flex-1 relative min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} innerRadius={70} outerRadius={90} paddingAngle={8} dataKey="value">
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-slate-900 dark:text-white">14</span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Total Tasks</span>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            {categoryData.map((cat, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="font-medium text-slate-600 dark:text-slate-400">{cat.name}</span>
                </div>
                <span className="font-bold text-slate-800 dark:text-slate-200">{cat.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* --- TASK LIST SECTION --- */}
      <motion.div variants={itemVar} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            My Site Assignments
            <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-bold">LIVE</span>
          </h2>
          <button className="flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
            <Filter size={14} /> Filter Tasks
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                <th className="px-6 py-4">Contract ID & Site</th>
                <th className="px-6 py-4">Execution Task</th>
                <th className="px-6 py-4">Deadline</th>
                <th className="px-6 py-4">Progress</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {assignmentList.map((task, i) => (
                <tr key={i} className="group hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-all">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-indigo-600 mb-0.5">{task.id}</span>
                      <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                        <MapPin size={12} className="text-slate-400" /> {task.site}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{task.task}</span>
                      <span className={`text-[10px] font-bold uppercase mt-1 ${
                        task.priority === 'Critical' ? 'text-rose-500' : 'text-amber-500'
                      }`}>
                        • {task.priority} Priority
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400">
                      <Calendar size={14} className="text-slate-400" />
                      {task.deadline}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-32">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-[10px] font-bold ${
                          task.status === 'Delayed' ? 'text-rose-600' : 'text-indigo-600'
                        }`}>
                          {task.status}
                        </span>
                        <span className="text-[10px] font-bold text-slate-600">{task.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${task.progress}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full rounded-full ${
                            task.status === 'Delayed' ? 'bg-rose-500' : 'bg-indigo-500'
                          }`}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-900 dark:bg-indigo-600 text-white text-xs font-bold rounded-lg hover:scale-105 transition-transform">
                      Update <ArrowRight size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}