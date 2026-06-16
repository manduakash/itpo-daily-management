"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  Building2,
  ChevronRight,
  Activity,
  PlusCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Status Badge Helper ---
function ExecutionStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "In Progress": "bg-indigo-100 text-indigo-700 border-indigo-200",
    "Delayed": "bg-rose-100 text-rose-700 border-rose-200",
    "Starting": "bg-amber-100 text-amber-700 border-amber-200",
    "Completed": "bg-emerald-100 text-emerald-700 border-emerald-200",
  };

  return (
    <Badge variant="outline" className={cn("text-[9px] font-black uppercase tracking-widest px-3 py-0.5 border-2 rounded-full", styles[status])}>
      {status}
    </Badge>
  );
}

// --- Mock Data ---
const engineerKPIs = [
  {
    title: "My Active Tasks",
    value: "14",
    subtitle: "4 tasks due this week",
    icon: HardHat,
    color: "from-indigo-600 to-blue-700",
  },
  {
    title: "Daily Reports Due",
    value: "03",
    subtitle: "Pending: Hall 3, 5",
    icon: ClipboardCheck,
    color: "from-amber-500 to-orange-600",
    alert: true,
  },
  {
    title: "Site Progress",
    value: "88%",
    subtitle: "Avg across 5 sites",
    icon: TrendingUp,
    color: "from-emerald-500 to-teal-600",
  },
  {
    title: "Pending Inspections",
    value: "02",
    subtitle: "Avg across 5 sites",
    icon: TrendingUp,
    color: "from-purple-500 to-violet-600",
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
  { name: "Civil Work", value: 45, color: "#4f46e5" },
  { name: "Electrical", value: 25, color: "#f59e0b" },
  { name: "Finishing", value: 30, color: "#10b981" },
];

const assignmentList = [
  { id: "CON-7821", site: "Convention Hall 3", task: "Granite Flooring & Polishing", deadline: "24 Oct 2023", progress: 75, status: "In Progress", priority: "High" },
  { id: "CON-7844", site: "G20 Plenary Hall", task: "Acoustic Panel Installation", deadline: "28 Oct 2023", progress: 40, status: "Delayed", priority: "Critical" },
  { id: "CON-7850", site: "Basement Parking B", task: "Fire Sprinkler Testing", deadline: "02 Nov 2023", progress: 10, status: "Starting", priority: "Medium" },
];

export default function ShapoorjiEngineerDashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-20 font-sans selection:bg-indigo-100 p-10">
      
      {/* APEX HEADER */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 relative">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-2 border-indigo-200">
            <Building2 size={14} className="animate-pulse" /> Shapoorji Site Execution
          </div>
          <h1 className="text-6xl font-black text-slate-800 tracking-tighter uppercase leading-none">Engineer <span className="text-indigo-600">Portal</span></h1>
          <p className="text-slate-500 font-medium text-xl italic underline underline-offset-8 decoration-indigo-200">
            Site-level execution monitoring, daily work logs, and resource allocation.
          </p>
        </div>

        <div className="flex gap-4">
          <Button 
            variant="outline" 
            className="h-16 px-8 rounded-3xl border-2 border-indigo-200 font-black uppercase tracking-widest text-[10px] text-indigo-700 bg-white shadow-xl hover:bg-indigo-50 transition-all"
          >
            <History size={20} className="mr-2" /> Global Audit Logs
          </Button>
          <Button 
            className="h-16 px-10 rounded-3xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-black uppercase tracking-widest text-[10px] shadow-2xl hover:shadow-[0_0_20px_theme(colors.indigo.400)] transition-all gap-2 group border-none"
          >
            <Camera size={20} className="text-indigo-100" /> New Site Update
          </Button>
        </div>
      </div>

      {/* KPI ACTION TILES */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {engineerKPIs.map((item, i) => (
          <div
            key={i}
            className={`group relative p-8 rounded-[32px] overflow-hidden transition-all duration-500 h-44 flex flex-col justify-between shadow-lg bg-gradient-to-br ${item.color} text-white`}
          >
            <div className="absolute inset-0 opacity-90 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/diagonal-striped-brick.png')]" />
            <div className="relative z-10 flex flex-col justify-between h-full w-full">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                  <item.icon size={20} className="text-white drop-shadow-md" />
                </div>
                {item.alert && <div className="h-2.5 w-2.5 rounded-full bg-white animate-ping shadow-[0_0_10px_white]" />}
              </div>
              <div>
                <p className="text-4xl font-black tracking-tighter drop-shadow-sm leading-none">{item.value}</p>
                <div className="flex flex-col gap-0.5 mt-2">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-95 leading-tight">{item.title}</p>
                  <p className="text-[9px] font-medium opacity-75 uppercase tracking-wider leading-none">{item.subtitle}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CHARTS SECTION SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* EXECUTION TREND CHART */}
        <div className="lg:col-span-2">
          <Card className="rounded-[48px] border-none shadow-xl overflow-hidden bg-white h-full flex flex-col p-0">
            <CardHeader className="p-0">
              <div className="p-10 bg-gradient-to-r from-slate-800 to-indigo-950 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                <div className="flex justify-between items-center relative z-10 px-2">
                  <div className="flex items-center gap-5">
                    <div className="h-14 w-14 rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                      <TrendingUp size={28} className="text-white" />
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-2xl font-black uppercase tracking-tight">Execution Trend</CardTitle>
                      <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Actual Progress vs. Planned Baseline</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-10 bg-slate-50/30 flex-1">
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={progressData}>
                    <defs>
                      <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} fontSize={10} tick={{fill: '#64748b', fontWeight: 900}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} fontSize={10} tick={{fill: '#64748b'}} />
                    <Tooltip cursor={{stroke: '#4f46e5'}} contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }} />
                    <Area type="monotone" dataKey="actual" stroke="#4f46e5" strokeWidth={4} fill="url(#colorActual)" />
                    <Area type="monotone" dataKey="planned" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" fill="none" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* WORK DISTRIBUTION SIDEBAR */}
        <div className="lg:col-span-1 space-y-10">
          <Card className="rounded-[40px] border-none shadow-xl bg-white overflow-hidden p-8 flex flex-col h-full relative group">
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8 flex items-center gap-2">
              <Activity size={16} className="text-indigo-600" /> Work Distribution
            </h3>
            <div className="flex-1 relative flex items-center justify-center min-h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} innerRadius={80} outerRadius={110} paddingAngle={8} dataKey="value">
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-black text-slate-800 tracking-tighter">14</span>
                <span className="text-[9px] uppercase font-black text-slate-400 tracking-widest">Total Tasks</span>
              </div>
            </div>
            <div className="mt-8 space-y-3">
              {categoryData.map((cat, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-[10px] font-black uppercase tracking-tight text-slate-600">{cat.name}</span>
                  </div>
                  <span className="text-xs font-black text-slate-900">{cat.value}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* TASK LEDGER SECTION */}
      <Card className="rounded-[48px] border-none shadow-xl overflow-hidden bg-white p-0">
        <CardHeader className="p-0">
          <div className="p-8 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            <div className="flex justify-between items-center relative z-10 px-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                  <Activity size={20} className="text-indigo-400" />
                </div>
                <CardTitle className="text-lg font-black uppercase tracking-widest">Site Assignment Ledger</CardTitle>
              </div>
              <Badge className="bg-indigo-500 text-white font-black text-[9px] uppercase tracking-widest px-4 py-1.5 rounded-full border-none shadow-lg">Live Portal</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
                  <th className="px-10 py-6">Contract ID & Site</th>
                  <th className="px-10 py-6">Execution Task</th>
                  <th className="px-10 py-6">Deadline</th>
                  <th className="px-10 py-6">Progress Status</th>
                  <th className="px-10 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {assignmentList.map((task, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-all group">
                    <td className="px-10 py-8">
                      <div className="flex flex-col gap-1">
                        <span className="font-mono text-[10px] font-black text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded w-fit">{task.id}</span>
                        <span className="text-sm font-black text-slate-800 uppercase tracking-tight flex items-center gap-1.5">
                          <MapPin size={12} className="text-indigo-500" /> {task.site}
                        </span>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="space-y-1">
                        <p className="text-sm font-black text-slate-700 uppercase tracking-tight">{task.task}</p>
                        <p className={cn("text-[9px] font-black uppercase tracking-widest", task.priority === 'Critical' ? 'text-rose-600' : 'text-amber-600')}>
                          {task.priority} Priority
                        </p>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        <Calendar size={14} className="text-indigo-500" /> {task.deadline}
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="w-48 space-y-2">
                        <div className="flex justify-between items-end">
                          <ExecutionStatusBadge status={task.status} />
                          <span className="text-[10px] font-black text-slate-900">{task.progress}%</span>
                        </div>
                        <Progress value={task.progress} className={cn("h-2 bg-slate-100", task.status === 'Delayed' ? "[&>div]:bg-rose-500" : "[&>div]:bg-indigo-600")} />
                      </div>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <Button className="h-12 px-6 rounded-2xl bg-slate-900 hover:bg-indigo-600 text-white font-black text-[9px] uppercase tracking-[0.2em] transition-all gap-2">
                        Update <ChevronRight size={14} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}