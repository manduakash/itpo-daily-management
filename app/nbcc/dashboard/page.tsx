"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell
} from "recharts";
import {
  FileText, CheckCircle2, Clock, AlertCircle, 
  TrendingUp, Users, Filter, Search, 
  ChevronRight, Download, Plus, LayoutGrid, 
  ArrowUpRight, History, ShieldCheck, Zap,
  Briefcase, Activity, Target
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * STATUS BADGE COMPONENT (ITPO STYLE)
 */
function EnterpriseStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "Completed": "bg-emerald-100 text-emerald-700 border-emerald-200",
    "In Progress": "bg-blue-100 text-blue-700 border-blue-200",
    "Review": "bg-amber-100 text-amber-700 border-amber-200",
    "Delayed": "bg-rose-100 text-rose-700 border-rose-200",
  };

  return (
    <Badge variant="outline" className={cn("text-[9px] font-black uppercase tracking-widest px-3 py-0.5 border-2 rounded-full", styles[status] || "bg-slate-100 text-slate-700")}>
      {status}
    </Badge>
  );
}

// Mock Data
const kpiStats = [
  { label: "Active Projects", value: "124", trend: "+12%", status: "active", icon: Briefcase, color: "from-indigo-600 to-blue-700" },
  { label: "Completion Rate", value: "94.2%", trend: "Optimal", status: "success", icon: CheckCircle2, color: "from-emerald-500 to-teal-600" },
  { label: "Compliance Risk", value: "02", trend: "Critical", status: "risk", icon: AlertCircle, color: "from-orange-500 to-rose-600", alert: true },
];

const contractData = [
  { id: "CNT-2024-001", client: "Acme Corp", project: "Infrastructure Upgrade", value: "$1.2M", status: "Completed", progress: 100, update: "Final audit cleared" },
  { id: "CNT-2024-002", client: "Global Tech", project: "SaaS Integration", value: "$450K", status: "In Progress", progress: 65, update: "Backend migration started" },
  { id: "CNT-2024-003", client: "Nexus Ltd", project: "Security Audit", value: "$85K", status: "Review", progress: 20, update: "Waiting for client docs" },
  { id: "CNT-2024-004", client: "Vertex PI", project: "Cloud Migration", value: "$2.1M", status: "Delayed", progress: 45, update: "Budget re-allocation req" },
];

const timelineData = [
  { name: "Jan", baseline: 400, actual: 240 },
  { name: "Feb", baseline: 300, actual: 350 },
  { name: "Mar", baseline: 500, actual: 480 },
  { name: "Apr", baseline: 280, actual: 390 },
  { name: "May", baseline: 590, actual: 520 },
];

const PIE_COLORS = ["#6366f1", "#10b981", "#f59e0b", "#f43f5e"];

export default function EnterpriseDashboard() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50/50 p-8 space-y-10 font-sans selection:bg-indigo-100 animate-in fade-in duration-1000">
      
      {/* ─── HEADER SECTION ─────────────────────────────────────── */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 relative">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border-2 border-slate-800">
            <ShieldCheck size={14} className="text-emerald-400" /> Enterprise ERP v2.0
          </div>
          <h1 className="text-6xl font-black text-slate-800 tracking-tighter uppercase leading-none">
            Ops Control <span className="text-indigo-600">Center</span>
          </h1>
          <p className="text-slate-500 font-medium text-xl italic underline underline-offset-8 decoration-slate-200">
            Strategic monitoring, financial oversight, and real-time project lifecycle tracking.
          </p>
        </div>
        
        <div className="flex gap-4">
          <Button variant="outline" className="h-16 px-8 rounded-3xl border-2 border-slate-200 font-black uppercase tracking-widest text-[10px] text-slate-700 bg-white shadow-xl hover:bg-slate-50 transition-all">
            <History size={20} className="mr-2" /> System Logs
          </Button>
          <Button className="h-16 px-10 rounded-3xl bg-gradient-to-r from-slate-800 to-slate-950 text-white font-black uppercase tracking-widest text-[10px] shadow-2xl hover:shadow-[0_0_20px_rgba(0,0,0,0.2)] transition-all gap-2 border-none">
            <Plus size={20} className="text-emerald-400" /> Create Contract
          </Button>
        </div>
      </div>

      {/* ─── KPI ACTION TILES ───────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpiStats.map((item, i) => (
          <button
            key={i}
            className={`group relative text-left p-8 rounded-[32px] overflow-hidden transition-all duration-500 h-44 flex flex-col justify-between shadow-lg hover:shadow-2xl bg-gradient-to-br ${item.color} text-white border-none`}
          >
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/diagonal-striped-brick.png')]" />
            <div className="relative z-10 flex flex-col justify-between h-full w-full">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                  <item.icon size={20} className="text-white drop-shadow-md" />
                </div>
              </div>
              <div>
                <p className="text-4xl font-black tracking-tighter drop-shadow-sm leading-none">{item.value}</p>
                <div className="flex flex-col gap-0.5 mt-2">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-95 leading-tight">{item.label}</p>
                  <p className="text-[9px] font-medium opacity-75 uppercase tracking-wider leading-none">Trend: {item.trend}</p>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* ─── MAIN TWO-COLUMN SPLIT ──────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT: MONITORING LEDGER (2/3) */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="rounded-[48px] border-none shadow-xl overflow-hidden bg-white h-full flex flex-col p-0">
            <CardHeader className="p-0">
              <div className="p-10 bg-gradient-to-r from-slate-800 via-slate-900 to-indigo-950 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                <div className="flex flex-col md:flex-row justify-between items-center relative z-10">
                  <div className="flex items-center gap-5">
                    <div className="h-14 w-14 rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg">
                      <Target size={28} className="text-white" />
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-2xl font-black uppercase tracking-tight">Active Project Ledger</CardTitle>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Real-time status of high-value enterprise accounts</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="text-white/50 hover:text-white"><Search size={18} /></Button>
                    <Button variant="ghost" size="icon" className="text-white/50 hover:text-white"><Filter size={18} /></Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-6 flex-1 bg-slate-50/30 relative">
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
              {contractData.map((contract) => (
                <div key={contract.id} className="p-6 rounded-[32px] border border-slate-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-black text-indigo-700 tracking-wider bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md">{contract.id}</span>
                        <EnterpriseStatusBadge status={contract.status} />
                      </div>
                      <h4 className="font-black text-lg text-slate-800 tracking-tight mt-2">{contract.project}</h4>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[9px] font-bold text-slate-400 uppercase tracking-widest pt-1">
                        <Users size={10} className="text-indigo-500" />
                        <span>{contract.client}</span>
                        <span className="text-slate-200">•</span>
                        <span className="text-slate-600 font-black">{contract.value}</span>
                      </div>
                    </div>
                    <Button variant="outline" className="rounded-2xl border-2 border-slate-100 px-4 h-10 font-black text-[9px] uppercase tracking-tighter">View Details</Button>
                  </div>
                  <div className="space-y-3 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                    <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-slate-400">
                      <span>Initiation</span>
                      <span>Development</span>
                      <span>Audit</span>
                      <span>Delivery</span>
                    </div>
                    <Progress value={contract.progress} className="h-2.5 bg-slate-100 [&>div]:bg-gradient-to-r [&>div]:from-indigo-500 [&>div]:to-blue-600 rounded-full" />
                    <p className="text-[10px] font-bold text-slate-500 italic">
                      <span className="text-indigo-600 font-black uppercase not-italic tracking-wider mr-1">Latest Log:</span> {contract.update}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT SIDEBAR (1/3) */}
        <div className="space-y-8">
          
          {/* ANALYTICS WIDGET */}
          <Card className="rounded-[40px] border-none shadow-lg bg-white overflow-hidden group p-0">
            <div className="p-6 flex items-center justify-between text-white relative bg-gradient-to-r from-indigo-600 to-blue-700">
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
              <div className="flex items-center gap-4 relative z-10">
                <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <Activity size={18} className="text-white" />
                </div>
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em]">Execution Flow</h3>
              </div>
              <ArrowUpRight size={18} className="text-white/70" />
            </div>
            <div className="p-8 space-y-6">
               <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={timelineData}>
                    <defs>
                      <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" hide />
                    <YAxis hide />
                    <Tooltip />
                    <Area type="monotone" dataKey="actual" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorActual)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Baseline</p>
                  <p className="text-xl font-black text-slate-800">420ms</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Actual</p>
                  <p className="text-xl font-black text-indigo-600">385ms</p>
                </div>
              </div>
            </div>
          </Card>

          {/* ALLOCATION WIDGET */}
          <Card className="rounded-[40px] border-none shadow-lg bg-white overflow-hidden group p-0">
            <div className="p-6 flex items-center justify-between text-white relative bg-gradient-to-r from-emerald-500 to-teal-600">
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
              <div className="flex items-center gap-4 relative z-10">
                <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <LayoutGrid size={18} className="text-white" />
                </div>
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em]">Budget Split</h3>
              </div>
            </div>
            <div className="p-8">
              <div className="h-[200px] w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Ops', value: 400 },
                        { name: 'R&D', value: 300 },
                        { name: 'CapEx', value: 300 },
                        { name: 'Legal', value: 200 },
                      ]}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={8}
                      dataKey="value"
                    >
                      {PIE_COLORS.map((color, index) => <Cell key={`cell-${index}`} fill={color} stroke="none" />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3 mt-6">
                {['Operations', 'R&D', 'Capital Expenditure', 'Legal'].map((cat, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }} />
                      <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{cat}</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-400">{(Math.random() * 40 + 10).toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* SYSTEM CAPACITY WIDGET */}
          <div className="p-8 rounded-[40px] bg-slate-900 text-white relative overflow-hidden group shadow-2xl">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            <div className="relative z-10 space-y-4">
              <div className="flex justify-between items-center">
                <Zap size={24} className="text-amber-400 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Node Status</span>
              </div>
              <div>
                <h3 className="text-4xl font-black tracking-tighter">88.4%</h3>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1">Global Throughput</p>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 w-[88%]" />
              </div>
              <p className="text-[10px] text-slate-400 italic leading-relaxed">
                All systems operational. Network latency within 12ms threshold.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}