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
  TrendingUp, Scale
} from "lucide-react";

const textures = {
  mainBg: "https://www.transparenttextures.com/patterns/symphony.png",
  gridBg: "https://www.transparenttextures.com/patterns/graphy.png",
  accentBg: "https://www.transparenttextures.com/patterns/carbon-fibre.png",
  cardBg: "https://www.transparenttextures.com/patterns/white-diamond.png"
};

const estimationStats = [
  { label: "Total Estimated", value: "₹8.4 Cr", color: "text-slate-900", icon: Scale },
  { label: "Approved Value", value: "₹5.2 Cr", color: "text-emerald-600", icon: CheckCircle2 },
  { label: "Pending Approval", value: "₹2.1 Cr", color: "text-orange-600", icon: Clock },
  { label: "Under Revision", value: "₹1.1 Cr", color: "text-blue-600", icon: FileEdit },
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
    <div className="min-h-screen bg-[#f4f7f9] py-10 relative">
      {/* Global Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `url(${textures.mainBg})` }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Navigation / Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div className="flex items-center gap-4">
            <button className="h-12 w-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm hover:bg-slate-50 transition-all">
                <ArrowLeft className="h-5 w-5 text-slate-600" />
            </button>
            <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">
                    Costing & <span className="text-orange-600">Estimations</span>
                </h1>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Financial Oversight Section</p>
            </div>
          </div>
          <button className="bg-orange-600 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-orange-200 hover:bg-orange-700 transition-all flex items-center gap-2 group">
            <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform" /> 
            CREATE NEW PROPOSAL
          </button>
        </div>

        {/* Financial KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {estimationStats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden group hover:border-orange-500 transition-all">
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `url(${textures.cardBg})` }} />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-slate-50 rounded-xl">
                        <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                    <TrendingUp className="h-4 w-4 text-slate-200" />
                </div>
                <p className="text-2xl font-black text-slate-900 leading-none">{stat.value}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main List Table */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between bg-slate-900 p-6 rounded-3xl relative overflow-hidden shadow-xl">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `url(${textures.accentBg})` }} />
                <div className="relative z-10 flex items-center gap-6">
                    <h3 className="text-white font-bold">Proposal Ledger</h3>
                    <div className="flex gap-2">
                        {["All", "Approved", "Pending"].map((t) => (
                            <button 
                                key={t}
                                onClick={() => setFilter(t)}
                                className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all ${filter === t ? 'bg-orange-600 text-white' : 'bg-white/10 text-slate-400 hover:bg-white/20'}`}
                            >
                                {t.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="relative z-10">
                    <Search className="h-4 w-4 text-slate-400" />
                </div>
            </div>

            <div className="space-y-4">
                {estimationList.map((est, i) => (
                    <div key={i} className="bg-white p-2 pr-6 rounded-3xl border border-slate-200 flex items-center justify-between group hover:shadow-lg transition-all cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className={`h-16 w-16 rounded-[1.25rem] ${est.texture} flex items-center justify-center relative overflow-hidden`}>
                                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `url(${textures.gridBg})` }} />
                                <FileText className="h-6 w-6 text-slate-700 relative z-10" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors">{est.project}</h4>
                                <div className="flex items-center gap-3 mt-1">
                                    <span className="text-[10px] font-bold text-slate-400 font-mono tracking-tighter">{est.id}</span>
                                    <span className="text-[10px] font-black text-slate-300">•</span>
                                    <span className="text-[10px] font-bold text-slate-400">{est.date}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-10">
                            <div className="text-right">
                                <p className="text-sm font-black text-slate-900">{est.amount}</p>
                                <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter">Margin: {est.margin}</p>
                            </div>
                            <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                                est.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                est.status === 'Pending' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                est.status === 'Rejected' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-slate-50 text-slate-500 border-slate-200'
                            }`}>
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

          {/* Side Analytics / Quick View */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `url(${textures.gridBg})` }} />
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                        <h4 className="font-bold text-slate-800 tracking-tight">Status Split</h4>
                        <div className="p-2 bg-orange-50 rounded-lg"><TrendingUp className="h-4 w-4 text-orange-600" /></div>
                    </div>
                    <div className="h-48 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={[{v:40, c:'#10b981'}, {v:30, c:'#f97316'}, {v:20, c:'#3b82f6'}, {v:10, c:'#ef4444'}]} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="v">
                                    {[{v:40, c:'#10b981'}, {v:30, c:'#f97316'}, {v:20, c:'#3b82f6'}, {v:10, c:'#ef4444'}].map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.c} stroke="none" />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-2xl font-black text-slate-900">12</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Proposals</span>
                        </div>
                    </div>
                    <div className="mt-6 space-y-3">
                        <div className="flex justify-between items-center text-xs">
                            <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-emerald-500" /><span className="text-slate-500">Approved</span></div>
                            <span className="font-bold text-slate-900">40%</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                            <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-orange-500" /><span className="text-slate-500">Pending</span></div>
                            <span className="font-bold text-slate-900">30%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions Area */}
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `url(${textures.accentBg})` }} />
                <h4 className="font-bold mb-6 relative z-10 text-lg">Estimation Tools</h4>
                <div className="space-y-3 relative z-10">
                    <button className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all group border border-white/5 hover:border-white/20">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-orange-600 rounded-lg shadow-lg group-hover:scale-110 transition-transform"><Download className="h-4 w-4" /></div>
                            <span className="text-xs font-bold uppercase tracking-widest">Download BOQ Template</span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-500" />
                    </button>
                    <button className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all group border border-white/5 hover:border-white/20">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-600 rounded-lg shadow-lg group-hover:scale-110 transition-transform"><Scale className="h-4 w-4" /></div>
                            <span className="text-xs font-bold uppercase tracking-widest">Cost Comparison Tool</span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-500" />
                    </button>
                </div>
                
                <div className="mt-10 p-6 bg-orange-600 rounded-3xl relative overflow-hidden shadow-lg">
                    <div className="absolute inset-0 opacity-20 pointer-events-none shadow-inner" style={{ backgroundImage: `url(${textures.accentBg})` }} />
                    <p className="text-white text-[10px] font-black uppercase tracking-widest relative z-10 opacity-80">Urgent Requirement</p>
                    <p className="text-white text-sm font-bold relative z-10 mt-2 leading-tight">Submit revisions for CON-102 by 6:00 PM today.</p>
                </div>
            </div>
          </div>

        </div>

        {/* Branding Footer */}
        <footer className="mt-20 pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 opacity-50">
            <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-slate-900 text-white flex items-center justify-center rounded-lg font-black italic">S</div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em]">SP Financial Operations Division</p>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest">Authorized: ITPO Contract Framework 2024</p>
        </footer>
      </div>
    </div>
  );
}