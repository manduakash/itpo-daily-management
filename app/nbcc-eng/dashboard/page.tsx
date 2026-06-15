"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area
} from "recharts";
import {
  Briefcase,
  Clock,
  HardHat,
  Forward,
  PlusCircle,
  Wrench,
  Construction,
  Search,
  Filter,
  Users,
  ArrowUpRight,
  CheckCircle2,
  Activity,
  Building2,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

// ─── Status Badge Helper (NBCC Specific) ───────────────────────────
function NBCCStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "New": "bg-blue-100 text-blue-700 border-blue-200",
    "Review": "bg-amber-100 text-amber-700 border-amber-200",
    "Execution": "bg-indigo-100 text-indigo-700 border-indigo-200",
    "Forwarded": "bg-purple-100 text-purple-700 border-purple-200",
    "On Site": "bg-emerald-100 text-emerald-700 border-emerald-200",
  };

  return (
    <Badge variant="outline" className={cn("text-[9px] font-black uppercase tracking-widest px-3 py-0.5 border-2 rounded-full", styles[status] || styles["New"])}>
      {status}
    </Badge>
  );
}

// ─── Mock Data ───────────────────────────────────────
const stats = [
  {
    title: "New Assignments",
    value: "24",
    subtitle: "Awaiting Engineer Allocation",
    icon: Briefcase,
    color: "from-blue-500 to-indigo-600",
    
  },
  {
    title: "Review Required",
    value: "09",
    subtitle: "Critical Estimations",
    icon: Clock,
    color: "from-amber-500 to-orange-600",
    alert: true,
    
  },
  {
    title: "In Execution",
    value: "11",
    subtitle: "Active Field Operations",
    icon: HardHat,
    color: "from-emerald-500 to-teal-600",
    
  },
   {
    title: "sp Forwarded",
    value: "24",
    subtitle: "Awaiting Engineer Allocation",
    icon: Briefcase,
    color: "from-blue-500 to-indigo-600",
    
  },
];

const chartData = [
  { name: "Civil", nbcc: 12, sp: 5 },
  { name: "Electrical", nbcc: 9, sp: 3 },
  { name: "Mechanical", nbcc: 4, sp: 8 },
  { name: "Plumbing", nbcc: 15, sp: 2 },
  { name: "AMC", nbcc: 7, sp: 1 },
];

export default function NBCCEngineeringDashboard() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-20 font-sans selection:bg-indigo-100 p-10">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 relative">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-2 border-indigo-200">
            <Building2 size={14} className="animate-pulse" /> NBCC PMC Division
          </div>
          <h1 className="text-6xl font-black text-slate-800 tracking-tighter uppercase leading-none">Engineering <span className="text-indigo-600">Unit</span></h1>
          <p className="text-slate-500 font-medium text-xl italic underline underline-offset-8 decoration-indigo-200">
            Bharat Mandapam Infrastructure Control & Field Allocation Panel.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="relative hidden lg:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="SEARCH CONTRACTS..." 
              className="h-16 pl-12 pr-6 rounded-3xl border-2 border-slate-100 font-black uppercase tracking-widest text-[10px] bg-white shadow-xl focus:outline-none focus:border-indigo-300 w-64 transition-all"
            />
          </div>
          <Button 
            // onClick={() => router.push("/nbcc/allocate")}
            className="h-16 px-10 rounded-3xl bg-gradient-to-r from-slate-800 to-slate-950 text-white font-black uppercase tracking-widest text-[10px] shadow-2xl hover:shadow-[0_0_20px_theme(colors.slate.400)] transition-all gap-2 group border-none"
          >
            <Users size={20} className="text-slate-400" /> Allocate Team
          </Button>
        </div>
      </div>

      {/* STAT TILES */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((item, i) => (
          <button
            key={i}
            // onClick={() => router.push(item.route)}
            className={`group relative text-left p-8 rounded-[32px] overflow-hidden transition-all duration-500 h-44 flex flex-col justify-between shadow-lg hover:shadow-2xl bg-gradient-to-br ${item.color} text-white border-none`}
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
          </button>
        ))}
      </div>

      {/* MAIN CONTENT SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="rounded-[48px] border-none shadow-xl overflow-hidden bg-white">
            <CardHeader className="p-0">
              <div className="p-10 bg-gradient-to-r from-slate-800 via-slate-950 to-indigo-950 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                <div className="flex justify-between items-center relative z-10">
                  <div className="flex items-center gap-5">
                    <div className="h-14 w-14 rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg">
                      <Activity size={28} className="text-white" />
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-2xl font-black uppercase tracking-tight">Operational Distribution</CardTitle>
                      <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest leading-none">NBCC Direct vs. Shapoorji Pallonji Execution</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-10 bg-slate-50/30">
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} barGap={12}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={10} tick={{fill: '#64748b', fontWeight: 900}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} fontSize={10} tick={{fill: '#64748b'}} />
                    <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }} />
                    <Bar dataKey="nbcc" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={40} />
                    <Bar dataKey="sp" fill="#a855f7" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Table Area */}
          <Card className="rounded-[48px] border-none shadow-xl overflow-hidden bg-white">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white">
               <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-800">Critical Review Queue</h3>
               </div>
               <Button variant="ghost" className="text-indigo-600 font-black text-[10px] uppercase tracking-widest gap-1">
                 Full Ledger <ChevronRight size={14} />
               </Button>
             </div>
             <Table>
               <TableBody>
                 {[
                   { id: "NB-88", title: "Facade Lighting - Gate 2", type: "Electrical", scale: "Small", status: "Review" },
                   { id: "NB-92", title: "HVAC Central Plant Repair", type: "Mechanical", scale: "Large", status: "Forwarded" },
                   { id: "NB-10", title: "VIP Lounge Flooring", type: "Civil", scale: "Small", status: "Execution" },
                 ].map((item, i) => (
                   <TableRow key={i} className="hover:bg-slate-50 transition-all border-slate-50 group">
                     <TableCell className="pl-10 py-6">
                        <span className="font-mono text-[10px] font-black text-indigo-700 bg-indigo-50 px-2 py-1 rounded-md">{item.id}</span>
                     </TableCell>
                     <TableCell>
                       <p className="font-black text-slate-800 text-sm uppercase tracking-tight">{item.title}</p>
                       <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{item.type}</p>
                     </TableCell>
                     <TableCell className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.scale}</TableCell>
                     <TableCell><NBCCStatusBadge status={item.status} /></TableCell>
                     <TableCell className="pr-10 text-right">
                       <Button size="icon" variant="ghost" className="rounded-xl hover:bg-indigo-50 text-indigo-600">
                         <ArrowUpRight size={18} />
                       </Button>
                     </TableCell>
                   </TableRow>
                 ))}
               </TableBody>
             </Table>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Engineering Workforce Card */}
          <Card className="rounded-[40px] border-none shadow-lg bg-slate-900 text-white overflow-hidden relative group">
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            <div className="p-8 relative z-10 space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-400">Field Allocation</h3>
                <Construction size={20} className="text-slate-500" />
              </div>
              
              <div className="space-y-6">
                {[
                  { name: "Team Civil Alpha", status: "On Site", progress: 85, color: "bg-indigo-500" },
                  { name: "Team Electro Beta", status: "Standby", progress: 30, color: "bg-amber-500" },
                  { name: "Team HVAC Gamma", status: "On Site", progress: 92, color: "bg-emerald-500" },
                ].map((team, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-white">{team.name}</p>
                        <p className="text-[9px] font-bold text-slate-500 uppercase">{team.status}</p>
                      </div>
                      <span className="text-[10px] font-black text-indigo-400">{team.progress}%</span>
                    </div>
                    <Progress value={team.progress} className={cn("h-1.5 bg-white/10", `[&>div]:${team.color}`)} />
                  </div>
                ))}
              </div>

              <Button className="w-full h-12 rounded-2xl bg-white/5 hover:bg-white/10 text-white border border-white/10 font-black uppercase tracking-[0.2em] text-[9px] transition-all">
                Optimize Deployments
              </Button>
            </div>
          </Card>

          {/* Efficiency Pulse */}
          <Card className="rounded-[40px] border-none shadow-lg bg-white overflow-hidden">
            <div className="p-6 flex items-center justify-between text-white relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-600">
              <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
              <div className="flex items-center gap-4 relative z-10">
                <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner">
                  <CheckCircle2 size={18} className="text-white drop-shadow-md" />
                </div>
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] drop-shadow-sm">PMC Efficiency</h3>
              </div>
              <Activity size={18} className="text-white/70" />
            </div>
            
            <div className="p-8 bg-slate-50/30">
               <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={[{v:10},{v:40},{v:25},{v:50},{v:45},{v:80}]}>
                    <defs>
                      <linearGradient id="colorEff" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="v" stroke="#10b981" strokeWidth={3} fill="url(#colorEff)" />
                  </AreaChart>
                </ResponsiveContainer>
               </div>
               <div className="mt-6 flex justify-between items-center bg-white border border-slate-100 p-4 rounded-2xl shadow-sm">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Efficiency Score</span>
                  <span className="text-2xl font-black text-emerald-600 tracking-tighter">92.8%</span>
               </div>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}