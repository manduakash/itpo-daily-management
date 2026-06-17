"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell
} from "recharts";
import {
  HardHat, FileText, Clock, ArrowUpRight,
  MapPin, ClipboardCheck, History, Plus,
  ArrowLeft, Upload, Save, CheckCircle2,
  AlertCircle, X, ShieldCheck, Zap,
  Briefcase, Activity, Target, Search, Filter, LayoutGrid, ChevronRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Texture URLs for that premium feel
const textures = {
  mainBg: "https://www.transparenttextures.com/patterns/symphony.png",
  cardBg: "https://www.transparenttextures.com/patterns/carbon-fibre.png",
  bricks: "https://www.transparenttextures.com/patterns/diagonal-striped-brick.png",
  cubes: "https://www.transparenttextures.com/patterns/cubes.png",
};

/**
 * CUSTOM STATUS BADGE
 */
function EnterpriseStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "Completed": "bg-emerald-100 text-emerald-700 border-emerald-200",
    "In Progress": "bg-blue-100 text-blue-700 border-blue-200",
    "Pending": "bg-amber-100 text-amber-700 border-amber-200",
    "Rejected": "bg-rose-100 text-rose-700 border-rose-200",
  };

  return (
    <Badge variant="outline" className={cn("text-[9px] font-black uppercase tracking-widest px-3 py-0.5 border-2 rounded-full", styles[status] || "bg-slate-100 text-slate-700")}>
      {status}
    </Badge>
  );
}

export default function ShapoorjiEnterpriseDashboard() {
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState("dashboard");

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const kpiData = [
    { title: "Assigned Contracts", value: "24", trend: "04 New", icon: HardHat, color: "from-indigo-600 to-blue-700", status: "active" },
    { title: "Pending Estimations", value: "06", trend: "High Priority", icon: FileText, color: "from-orange-500 to-rose-600", status: "risk", alert: true },
    { title: "Ongoing Projects", value: "12", trend: "On Schedule", icon: Activity, color: "from-emerald-500 to-teal-600", status: "success" },
  ];

  const ongoingTasks = [
    { id: "CON-772", name: "Exhibition Hall Repair", client: "Bharat Mandapam", value: "₹4.5L", status: "In Progress", progress: 60, update: "Material arrived at Site A" },
    { id: "CON-810", name: "Hall 3 Interior", client: "ITPO Admin", value: "₹12.8L", status: "Pending", progress: 15, update: "Design approval pending" },
    { id: "CON-901", name: "Stone Paving", client: "VIP Entrance", value: "₹2.2L", status: "Completed", progress: 100, update: "Final handover finished" },
  ];

  const timelineData = [
    { name: "Mon", val: 40 }, { name: "Tue", val: 35 }, { name: "Wed", val: 65 }, 
    { name: "Thu", val: 55 }, { name: "Fri", val: 80 }
  ];

  const DashboardHome = () => (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* --- HEADER --- */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 relative">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border-2 border-slate-800">
            <ShieldCheck size={14} className="text-orange-400" /> SP Partner Portal v2.4
          </div>
          <h1 className="text-6xl font-black text-slate-800 tracking-tighter uppercase leading-none">
            Partner <span className="text-orange-600">Ops</span>
          </h1>
          <p className="text-slate-500 font-medium text-xl italic underline underline-offset-8 decoration-slate-200">
            Shapoorji Pallonji • Bharat Mandapam Maintenance Division.
          </p>
        </div>
        
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            onClick={() => setView("logs")}
            className="h-16 px-8 rounded-3xl border-2 border-slate-200 font-black uppercase tracking-widest text-[10px] text-slate-700 bg-white shadow-xl hover:bg-slate-50 transition-all"
          >
            <History size={20} className="mr-2" /> Audit Logs
          </Button>
          <Button 
            onClick={() => setView("estimation-form")}
            className="h-16 px-10 rounded-3xl bg-gradient-to-r from-orange-600 to-orange-700 text-white font-black uppercase tracking-widest text-[10px] shadow-2xl hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all gap-2 border-none"
          >
            <Plus size={20} className="text-white" /> New Estimation
          </Button>
        </div>
      </div>

      {/* --- KPI TILES --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpiData.map((item, i) => (
          <div
            key={i}
            className={`group relative p-8 rounded-[32px] overflow-hidden transition-all duration-500 h-44 flex flex-col justify-between shadow-lg hover:shadow-2xl bg-gradient-to-br ${item.color} text-white`}
          >
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/diagonal-striped-brick.png')]" />
            <div className="relative z-10 flex flex-col justify-between h-full w-full">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                  <item.icon size={20} className="text-white drop-shadow-md" />
                </div>
                {item.alert && <div className="h-2.5 w-2.5 rounded-full bg-white animate-ping shadow-[0_0_10px_white]" />}
              </div>
              <div>
                <p className="text-4xl font-black tracking-tighter drop-shadow-sm leading-none">{item.value}</p>
                <div className="flex flex-col gap-0.5 mt-2">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-95 leading-tight">{item.title}</p>
                  <p className="text-[9px] font-medium opacity-75 uppercase tracking-wider leading-none">Status: {item.trend}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- MAIN GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: WORK LEDGER */}
        <div className="lg:col-span-2">
          <Card className="rounded-[48px] border-none shadow-xl overflow-hidden bg-white p-0">
            <CardHeader className="p-0">
              <div className="p-10 bg-gradient-to-r from-slate-800 to-slate-950 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `url(${textures.cardBg})` }} />
                <div className="flex justify-between items-center relative z-10">
                  <div className="flex items-center gap-5">
                    <div className="h-14 w-14 rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                      <LayoutGrid size={28} className="text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-black uppercase tracking-tight">Active Work Ledger</CardTitle>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ongoing Maintenance & Operations</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-6 bg-slate-50/30 relative">
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `url(${textures.cubes})` }} />
              {ongoingTasks.map((task) => (
                <div key={task.id} className="p-6 rounded-[32px] border border-slate-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-black text-orange-700 tracking-wider bg-orange-50 border border-orange-100 px-2 py-0.5 rounded-md">{task.id}</span>
                        <EnterpriseStatusBadge status={task.status} />
                      </div>
                      <h4 className="font-black text-lg text-slate-800 tracking-tight mt-2">{task.name}</h4>
                      <div className="flex items-center gap-x-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest pt-1">
                        <MapPin size={10} className="text-orange-500" />
                        <span>{task.client}</span>
                        <span className="text-slate-200">•</span>
                        <span className="text-slate-600 font-black">{task.value}</span>
                      </div>
                    </div>
                    <Button variant="outline" className="rounded-2xl border-2 border-slate-100 px-4 h-10 font-black text-[9px] uppercase">View Details</Button>
                  </div>
                  <div className="space-y-3 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                    <Progress value={task.progress} className="h-2.5 bg-slate-100 [&>div]:bg-gradient-to-r [&>div]:from-orange-500 [&>div]:to-orange-700 rounded-full" />
                    <p className="text-[10px] font-bold text-slate-500 italic">
                      <span className="text-orange-600 font-black uppercase not-italic tracking-wider mr-1">Latest Log:</span> {task.update}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-8">
          <Card className="rounded-[40px] border-none shadow-lg bg-white overflow-hidden p-0">
            <div className="p-6 flex items-center justify-between text-white relative bg-gradient-to-r from-slate-800 to-indigo-900">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(${textures.cardBg})` }} />
              <div className="flex items-center gap-4 relative z-10">
                <Activity size={18} className="text-white" />
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em]">Intensity Trend</h3>
              </div>
              <ArrowUpRight size={18} className="text-white/70" />
            </div>
            <div className="p-8">
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={timelineData}>
                    <defs>
                      <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" hide />
                    <YAxis hide />
                    <Tooltip />
                    <Area type="monotone" dataKey="val" stroke="#f97316" strokeWidth={4} fill="url(#colorVal)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>

          <div className="p-8 rounded-[40px] bg-slate-900 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(${textures.cardBg})` }} />
            <div className="relative z-10 space-y-4">
              <div className="flex justify-between items-center">
                <Zap size={24} className="text-orange-400 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Resource Load</span>
              </div>
              <div>
                <h3 className="text-4xl font-black tracking-tighter">92.8%</h3>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1">Labor Capacity</p>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-400 to-orange-600 w-[92%]" />
              </div>
              <p className="text-[10px] text-slate-400 italic leading-relaxed">
                Workforce fully deployed across Halls 1-5.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const EstimationForm = () => (
    <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-8 duration-700">
      <Button 
        variant="ghost" 
        onClick={() => setView("dashboard")} 
        className="mb-8 font-black uppercase tracking-widest text-[10px] text-slate-500 hover:text-slate-800"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Operations
      </Button>

      <Card className="rounded-[48px] border-none shadow-2xl overflow-hidden bg-white">
        <div className="p-10 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(${textures.cardBg})` }} />
          <div className="relative z-10">
            <h2 className="text-4xl font-black uppercase tracking-tighter">New Work Estimation</h2>
            <p className="text-orange-500 text-[10px] font-black tracking-[0.3em] uppercase mt-2">Document ID: SP-EST-2024-099</p>
          </div>
        </div>

        <CardContent className="p-12 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contract Reference</label>
              <select className="w-full h-14 px-6 rounded-2xl border-2 border-slate-100 bg-slate-50 text-sm font-bold focus:border-orange-500 outline-none transition-all appearance-none">
                <option>CON-102: Plaza Renovation</option>
                <option>CON-105: Hall 4 Mechanical</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Proposed Amount (INR)</label>
              <input type="number" placeholder="0.00" className="w-full h-14 px-6 rounded-2xl border-2 border-slate-100 bg-slate-50 text-sm font-bold focus:border-orange-500 outline-none transition-all" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Scope Analysis</label>
            <textarea rows={4} className="w-full p-6 rounded-[32px] border-2 border-slate-100 bg-slate-50 text-sm font-bold focus:border-orange-500 outline-none transition-all" placeholder="Describe the technical requirements..." />
          </div>

          <div className="p-10 border-4 border-dashed border-slate-100 rounded-[40px] bg-slate-50/50 flex flex-col items-center justify-center gap-4 hover:border-orange-200 hover:bg-orange-50/30 transition-all cursor-pointer group">
            <div className="h-16 w-16 rounded-full bg-white shadow-md flex items-center justify-center group-hover:scale-110 transition-transform">
              <Upload className="h-6 w-6 text-orange-600" />
            </div>
            <div className="text-center">
              <p className="text-sm font-black text-slate-700 uppercase tracking-tight">Upload BOQ & Technicals</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">PDF, XLSX up to 25MB</p>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <Button variant="ghost" onClick={() => setView("dashboard")} className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest text-[10px]">Discard</Button>
            <Button className="h-14 px-10 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-black transition-all gap-2">
              <Save size={18} /> Submit for Review
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const LogsHistory = () => (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-700">
      <div className="flex items-center justify-between mb-10">
        <Button variant="ghost" onClick={() => setView("dashboard")} className="font-black uppercase tracking-widest text-[10px] text-slate-500">
          <ArrowLeft className="mr-2 h-4 w-4" /> Dashboard
        </Button>
        <h2 className="text-3xl font-black text-slate-800 tracking-tighter uppercase">Audit Ledger</h2>
      </div>

      <Card className="rounded-[48px] border-none shadow-xl overflow-hidden bg-white">
        <div className="divide-y divide-slate-100">
          {[
            { id: 1, action: "Estimation Submitted", target: "CON-772 Facade Repair", time: "2 hours ago", user: "R. Sharma", status: "success" },
            { id: 2, action: "Engineer Assigned", target: "CON-810 Hall 3 Interior", time: "5 hours ago", user: "System", status: "info" },
            { id: 3, action: "Daily Progress Uploaded", target: "CON-901 Stone Paving", time: "Yesterday", user: "A. Khan", status: "success" },
          ].map((log) => (
            <div key={log.id} className="p-8 hover:bg-slate-50 transition-all flex items-start gap-6 group">
              <div className={cn(
                "h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-110",
                log.status === 'success' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
              )}>
                {log.status === 'success' ? <CheckCircle2 size={20} /> : <Activity size={20} />}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-black text-slate-800 tracking-tight">{log.action}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Ref: {log.target}</p>
                  </div>
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">{log.time}</span>
                </div>
                <div className="mt-4 flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-slate-200" />
                    <span className="text-[9px] font-black text-slate-500 uppercase">Operator: {log.user}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] relative font-sans selection:bg-orange-100">
      {/* Background Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `url(${textures.mainBg})` }} />

      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-16 relative z-10">
        {view === "dashboard" && <DashboardHome />}
        {view === "estimation-form" && <EstimationForm />}
        {view === "logs" && <LogsHistory />}

        <footer className="mt-24 pt-10 border-t-4 border-slate-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 opacity-40 grayscale hover:grayscale-0 transition-all">
             <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-slate-900 rounded-2xl flex items-center justify-center font-black text-white text-xl shadow-lg">S</div>
                <div className="leading-none">
                    <p className="text-[12px] font-black uppercase tracking-[0.3em]">Shapoorji Pallonji</p>
                    <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-slate-500">Engineering & Construction</p>
                </div>
             </div>
             <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-[0.2em]">Enterprise Node: DEL-CENTRAL-01</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">© 2024 Contract Mgmt Portal • SP-ITPO</p>
             </div>
          </div>
        </footer>
      </main>
    </div>
  );
}