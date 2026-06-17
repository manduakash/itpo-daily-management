"use client";

import React, { useState } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Cell, PieChart, Pie
} from "recharts";
import { 
  FileText, Plus, Search, Filter, ArrowLeft, 
  IndianRupee, Clock, CheckCircle2, AlertCircle, 
  FileEdit, Download, MoreHorizontal, ChevronRight,
  TrendingUp, Scale, ShieldCheck, LayoutGrid, Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

const textures = {
  mainBg: "https://www.transparenttextures.com/patterns/symphony.png",
  gridBg: "https://www.transparenttextures.com/patterns/graphy.png",
  accentBg: "https://www.transparenttextures.com/patterns/carbon-fibre.png",
  cardBg: "https://www.transparenttextures.com/patterns/white-diamond.png",
  bricks: "https://www.transparenttextures.com/patterns/diagonal-striped-brick.png",
};

const estimationStats = [
  { label: "Total Estimated", value: "₹8.4 Cr", color: "from-indigo-600 to-blue-700", icon: Scale },
  { label: "Approved Value", value: "₹5.2 Cr", color: "from-emerald-500 to-teal-600", icon: CheckCircle2 },
  { label: "Pending Approval", value: "₹2.1 Cr", color: "from-orange-500 to-rose-600", icon: Clock },
  { label: "Under Revision", value: "₹1.1 Cr", color: "from-slate-600 to-slate-800", icon: FileEdit },
];

const estimationList = [
  { id: "EST-9901", project: "Convention Hall 4 Ceiling", amount: "₹45,00,000", date: "Oct 24, 2024", status: "Approved", margin: "12%", texture: "bg-emerald-50" },
  { id: "EST-9905", project: "VVIP Entrance Granite", amount: "₹12,20,000", date: "Oct 22, 2024", status: "Pending", margin: "10%", texture: "bg-orange-50" },
  { id: "EST-9882", project: "Central Plaza Drainage", amount: "₹85,00,000", date: "Oct 15, 2024", status: "Rejected", margin: "15%", texture: "bg-red-50" },
  { id: "EST-9870", project: "Exhibition Hall Lighting", amount: "₹32,00,000", date: "Oct 10, 2024", status: "Draft", margin: "8%", texture: "bg-slate-50" },
];

export default function ShapoorjiEstimations() {
  const [filter, setFilter] = useState("All");

  return (
    <div className="min-h-screen bg-[#f8fafc] py-16 relative font-sans">
      {/* Global Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `url(${textures.mainBg})` }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Navigation / Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border-2 border-slate-800">
                <ShieldCheck size={14} className="text-orange-400" /> Financial Oversight Section
            </div>
            <h1 className="text-6xl font-black text-slate-800 tracking-tighter uppercase leading-none">
                Costing & <span className="text-orange-600">Estimations</span>
            </h1>
            <p className="text-slate-500 font-medium text-xl italic underline underline-offset-8 decoration-slate-200">
                Shapoorji Pallonji • ITPO Project Budgetary Control
            </p>
          </div>
          <button className="h-16 px-10 rounded-3xl bg-gradient-to-r from-orange-600 to-orange-700 text-white font-black uppercase tracking-widest text-[10px] shadow-2xl hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all flex items-center gap-2 group border-none">
            <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform" /> 
            CREATE NEW PROPOSAL
          </button>
        </div>

        {/* Financial KPI Grid - Using the Gradient Style from Reference */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {estimationStats.map((stat, i) => (
            <div key={i} className={cn(
                "group relative p-8 rounded-[32px] overflow-hidden transition-all duration-500 h-44 flex flex-col justify-between shadow-lg hover:shadow-2xl bg-gradient-to-br text-white",
                stat.color
            )}>
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `url(${textures.bricks})` }} />
              <div className="relative z-10 flex flex-col justify-between h-full w-full">
                <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                        <stat.icon className="h-5 w-5 text-white drop-shadow-md" />
                    </div>
                    <TrendingUp className="h-4 w-4 text-white/50" />
                </div>
                <div>
                    <p className="text-4xl font-black tracking-tighter drop-shadow-sm leading-none">{stat.value}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-90 mt-2">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          
          {/* Main List Table */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-[40px] border-none shadow-xl overflow-hidden bg-white">
                <div className="p-8 bg-gradient-to-r from-slate-800 to-slate-950 text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `url(${textures.accentBg})` }} />
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                        <div className="flex items-center gap-5">
                            <div className="h-12 w-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                                <LayoutGrid size={24} className="text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black uppercase tracking-tight">Proposal Ledger</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Financial Document Tracking</p>
                            </div>
                        </div>
                        <div className="flex gap-2 bg-black/20 p-1.5 rounded-2xl">
                            {["All", "Approved", "Pending"].map((t) => (
                                <button 
                                    key={t}
                                    onClick={() => setFilter(t)}
                                    className={`px-5 py-2 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest ${filter === t ? 'bg-orange-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-8 space-y-4 bg-slate-50/30">
                    {estimationList.map((est, i) => (
                        <div key={i} className="bg-white p-4 pr-8 rounded-[2rem] border border-slate-100 flex items-center justify-between group hover:shadow-xl hover:border-orange-100 transition-all cursor-pointer">
                            <div className="flex items-center gap-5">
                                <div className={cn("h-16 w-16 rounded-3xl flex items-center justify-center relative overflow-hidden shrink-0", est.texture)}>
                                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `url(${textures.gridBg})` }} />
                                    <FileText className="h-7 w-7 text-slate-700 relative z-10" />
                                </div>
                                <div>
                                    <h4 className="font-black text-slate-800 text-lg tracking-tight group-hover:text-orange-600 transition-colors">{est.project}</h4>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="font-mono text-[10px] font-black text-orange-700 tracking-wider bg-orange-50 border border-orange-100 px-2 py-0.5 rounded-md">{est.id}</span>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{est.date}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-10">
                                <div className="text-right">
                                    <p className="text-xl font-black text-slate-900 tracking-tighter">{est.amount}</p>
                                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Margin: {est.margin}</p>
                                </div>
                                <div className={cn(
                                    "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.15em] border-2",
                                    est.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                    est.status === 'Pending' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                                    est.status === 'Rejected' ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-slate-50 text-slate-600 border-slate-200'
                                )}>
                                    {est.status}
                                </div>
                                <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                                    <MoreHorizontal className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </div>

          {/* Side Analytics / Quick View */}
          <div className="space-y-8">
            <div className="bg-white rounded-[40px] border-none shadow-lg overflow-hidden">
                <div className="p-6 flex items-center justify-between text-white relative bg-gradient-to-r from-slate-800 to-indigo-900">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(${textures.accentBg})` }} />
                    <div className="flex items-center gap-4 relative z-10">
                        <TrendingUp size={18} className="text-white" />
                        <h3 className="text-[11px] font-black uppercase tracking-[0.2em]">Status Split</h3>
                    </div>
                </div>
                <div className="p-8">
                    <div className="h-48 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie 
                                    data={[{v:40, c:'#10b981'}, {v:30, c:'#f97316'}, {v:20, c:'#3b82f6'}, {v:10, c:'#ef4444'}]} 
                                    innerRadius={60} 
                                    outerRadius={80} 
                                    paddingAngle={8} 
                                    dataKey="v"
                                >
                                    {[{v:40, c:'#10b981'}, {v:30, c:'#f97316'}, {v:20, c:'#3b82f6'}, {v:10, c:'#ef4444'}].map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.c} stroke="none" />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-black text-slate-900 tracking-tighter">12</span>
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Proposals</span>
                        </div>
                    </div>
                    <div className="mt-8 space-y-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Approved</span>
                            </div>
                            <span className="font-black text-slate-900 text-xs">40%</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Pending</span>
                            </div>
                            <span className="font-black text-slate-900 text-xs">30%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions Area */}
            
          </div>

        </div>

        {/* Branding Footer */}
        <footer className="mt-24 pt-10 border-t-4 border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 opacity-40 grayscale hover:grayscale-0 transition-all">
            <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-slate-900 text-white flex items-center justify-center rounded-2xl font-black italic text-xl shadow-lg">S</div>
                <div className="leading-none">
                    <p className="text-[12px] font-black uppercase tracking-[0.3em]">Shapoorji Pallonji</p>
                    <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-slate-500">Financial Operations Division</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-[0.2em]">Authorized: ITPO Contract Framework 2024</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">© 2024 Budgetary Control Portal • SP-ITPO</p>
            </div>
        </footer>
      </div>
    </div>
  );
}