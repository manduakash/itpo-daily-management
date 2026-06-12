"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area, Cell, PieChart, Pie
} from "recharts";
import {
  Briefcase, Clock, HardHat, ArrowUpRight, Users, 
  FileText, Forward, Construction, Filter, Search, 
  CheckCircle, ChevronRight, Activity
} from "lucide-react";

// --- Framer Motion Variants ---
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

// --- Custom Components ---

const StatCard = ({ title, value, trend, icon: Icon, gradient, delay }: any) => (
  <motion.div
    variants={fadeInUp}
    initial="initial"
    animate="animate"
    transition={{ delay }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className={`relative overflow-hidden rounded-2xl border border-white/50 p-6 shadow-xl shadow-slate-200/50 bg-gradient-to-br ${gradient}`}
  >
    <div className="relative z-10">
      <div className="flex items-center justify-between">
        <div className="p-3 bg-white/50 backdrop-blur-md rounded-xl shadow-sm">
          <Icon className="w-6 h-6 text-slate-700" />
        </div>
        <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 bg-white/40 backdrop-blur-sm rounded-full text-slate-600 uppercase tracking-tighter">
          <Activity size={10} /> {trend}
        </span>
      </div>
      <div className="mt-5">
        <h3 className="text-4xl font-extrabold text-slate-800 tracking-tight">{value}</h3>
        <p className="text-sm font-semibold text-slate-600/80 mt-1 uppercase tracking-wide">{title}</p>
      </div>
    </div>
  </motion.div>
);

const GlassCard = ({ children, className = "" }: any) => (
  <div className={`bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl shadow-2xl shadow-slate-200/40 ${className}`}>
    {children}
  </div>
);

export default function NBCCEngineeringDashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const stats = [
    {
      title: "New Assignments",
      value: "24",
      trend: "Increased",
      icon: Briefcase,
      gradient: "from-blue-50 via-blue-100 to-indigo-200",
    },
    {
      title: "Review Required",
      value: "09",
      trend: "Priority",
      icon: Clock,
      gradient: "from-orange-50 via-orange-100 to-amber-200",
    },
    {
      title: "In Execution",
      value: "11",
      trend: "On Track",
      icon: HardHat,
      gradient: "from-emerald-50 via-emerald-100 to-teal-200",
    },
    {
      title: "SP Forwarded",
      value: "04",
      trend: "Large Scale",
      icon: Forward,
      gradient: "from-purple-50 via-purple-100 to-fuchsia-200",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-10 font-sans text-slate-900">
      
      {/* Top Navigation / Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">N</div>
            <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase">PMC Management</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-800">
           NBCC Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Dashboard</span>
          </h1>
          <p className="text-slate-500 font-medium mt-1">Bharat Mandapam Infrastructure Control</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search contracts..." 
              className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 w-64 shadow-sm"
            />
          </div>
          <button className="p-2.5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:bg-slate-50 transition-all">
            <Filter className="w-5 h-5 text-slate-600" />
          </button>
          <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl hover:shadow-indigo-200 transition-all hover:bg-slate-800">
            <Users size={18} /> Allocate Team
          </button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
      >
        {stats.map((s, i) => (
          <StatCard key={i} {...s} delay={i * 0.1} />
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Chart Area */}
        <motion.div variants={fadeInUp} initial="initial" animate="animate" className="lg:col-span-2 space-y-8">
          <GlassCard className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-slate-800">Operational Distribution</h3>
                <p className="text-sm text-slate-500">NBCC Direct vs. Shapoorji Pallonji (By Category)</p>
              </div>
              <div className="flex gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 rounded-full text-[10px] font-bold text-indigo-600">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full" /> NBCC
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-purple-50 rounded-full text-[10px] font-bold text-purple-600">
                  <div className="w-2 h-2 bg-purple-600 rounded-full" /> SHAPOORJI
                </div>
              </div>
            </div>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: "Civil", nbcc: 12, sp: 5 },
                  { name: "Electrical", nbcc: 9, sp: 3 },
                  { name: "Mechanical", nbcc: 4, sp: 8 },
                  { name: "Plumbing", nbcc: 15, sp: 2 },
                  { name: "AMC", nbcc: 7, sp: 1 },
                ]} barGap={8}>
                  <defs>
                    <linearGradient id="barNbcc" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4f46e5" stopOpacity={1} />
                      <stop offset="100%" stopColor="#818cf8" stopOpacity={0.8} />
                    </linearGradient>
                    <linearGradient id="barSp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a855f7" stopOpacity={1} />
                      <stop offset="100%" stopColor="#d8b4fe" stopOpacity={0.8} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} tick={{fill: '#64748b', fontWeight: 600}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} fontSize={12} tick={{fill: '#64748b'}} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="nbcc" fill="url(#barNbcc)" radius={[6, 6, 0, 0]} barSize={30} />
                  <Bar dataKey="sp" fill="url(#barSp)" radius={[6, 6, 0, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Table Area */}
          <GlassCard className="overflow-hidden">
             <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white/30">
               <h3 className="text-xl font-bold text-slate-800 italic">Critical Review Queue</h3>
               <button className="text-indigo-600 font-bold text-xs hover:tracking-widest transition-all uppercase flex items-center gap-1">
                 Full Ledger <ChevronRight size={14} />
               </button>
             </div>
             <table className="w-full text-left">
               <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                 <tr>
                   <th className="px-8 py-4 text-center">ID</th>
                   <th className="px-8 py-4">Contract Details</th>
                   <th className="px-8 py-4">Scale</th>
                   <th className="px-8 py-4">Status</th>
                   <th className="px-8 py-4"></th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                 {[
                   { id: "NB-88", title: "Facade Lighting - Gate 2", type: "Electrical", scale: "Small", status: "Review", color: "blue" },
                   { id: "NB-92", title: "HVAC Central Plant Repair", type: "Mechanical", scale: "Large", status: "Forwarded", color: "purple" },
                   { id: "NB-10", title: "VIP Lounge Flooring", type: "Civil", scale: "Small", status: "Execution", color: "emerald" },
                 ].map((item, i) => (
                   <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                     <td className="px-8 py-5 text-xs font-bold text-indigo-400 tracking-tighter">#{item.id}</td>
                     <td className="px-8 py-5">
                       <p className="font-bold text-slate-700 text-sm">{item.title}</p>
                       <p className="text-[10px] font-medium text-slate-400 uppercase">{item.type}</p>
                     </td>
                     <td className="px-8 py-5 text-xs font-bold text-slate-500">{item.scale}</td>
                     <td className="px-8 py-5">
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest bg-${item.color}-50 text-${item.color}-600 border border-${item.color}-100`}>
                          {item.status}
                        </span>
                     </td>
                     <td className="px-8 py-5 text-right">
                       <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-200">
                         <ArrowUpRight size={16} />
                       </button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </GlassCard>
        </motion.div>

        {/* Right Sidebar Section */}
        <motion.div variants={fadeInUp} initial="initial" animate="animate" className="space-y-8">
          
          {/* Engineering Workforce Card */}
          <GlassCard className="p-8 bg-gradient-to-b from-slate-900 to-slate-800 text-white border-none relative overflow-hidden">
            <div className="absolute top-[-20%] left-[-20%] w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Construction className="text-amber-400" size={20} /> Field Allocation
              </h3>
              <div className="space-y-8">
                {[
                  { name: "Team Civil Alpha", status: "On Site", progress: 85, color: "bg-indigo-400" },
                  { name: "Team Electro Beta", status: "Standby", progress: 30, color: "bg-amber-400" },
                  { name: "Team HVAC Gamma", status: "On Site", progress: 92, color: "bg-rose-400" },
                ].map((team, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-xs font-black text-white uppercase tracking-widest">{team.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold">{team.status}</p>
                      </div>
                      <span className="text-xs font-bold">{team.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${team.progress}%` }}
                        transition={{ duration: 1, delay: i * 0.2 }}
                        className={`h-full ${team.color}`} 
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-10 py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border border-white/5">
                Optimize Deployments
              </button>
            </div>
          </GlassCard>

          {/* Efficiency Pulse */}
          <GlassCard className="p-8">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <CheckCircle className="text-emerald-500" size={20} /> PMC Efficiency
            </h3>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[
                  { val: 10 }, { val: 40 }, { val: 25 }, { val: 50 }, { val: 45 }, { val: 80 }
                ]}>
                  <defs>
                    <linearGradient id="pulse" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="val" stroke="#10b981" strokeWidth={3} fill="url(#pulse)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex justify-between items-center bg-emerald-50 p-4 rounded-2xl">
               <span className="text-xs font-bold text-emerald-700 uppercase tracking-tighter">Current Score</span>
               <span className="text-2xl font-black text-emerald-700">92%</span>
            </div>
          </GlassCard>

        </motion.div>
      </div>
    </div>
  );
}