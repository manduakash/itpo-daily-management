"use client";

import React, { useState } from "react";
import { 
  Hammer, MapPin, Clock, Users, 
  AlertTriangle, CheckCircle2, TrendingUp, 
  MoreVertical, Calendar, ArrowRight,
  Filter, Search, Building2, BarChart3,
  ShieldCheck, LayoutGrid, Zap
} from "lucide-react";

// Shadcn UI Components
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const textures = {
  mainBg: "https://www.transparenttextures.com/patterns/symphony.png",
  gridBg: "https://www.transparenttextures.com/patterns/graphy.png",
  accentBg: "https://www.transparenttextures.com/patterns/carbon-fibre.png",
  bricks: "https://www.transparenttextures.com/patterns/diagonal-striped-brick.png",
  cubes: "https://www.transparenttextures.com/patterns/cubes.png",
};

const ongoingProjects = [
  {
    id: "PRJ-2024-01",
    title: "Convention Hall 3 Facade",
    location: "Level 2, North Wing",
    engineer: "Amit Sharma",
    progress: 78,
    status: "On Track",
    priority: "High",
    startDate: "12 Aug",
    daysLeft: "14 Days",
    health: "good"
  },
  {
    id: "PRJ-2024-05",
    title: "VVIP Lounge Interior Fit-out",
    location: "Ground Floor, Gate 5",
    engineer: "Priya Das",
    progress: 45,
    status: "Delayed",
    priority: "Critical",
    startDate: "01 Sep",
    daysLeft: "45 Days",
    health: "at-risk"
  },
  {
    id: "PRJ-2024-09",
    title: "Plaza Granite Paving",
    location: "Central Courtyard",
    engineer: "Rajesh Kumar",
    progress: 92,
    status: "Inspection Pending",
    priority: "Medium",
    startDate: "20 July",
    daysLeft: "2 Days",
    health: "good"
  },
  {
    id: "PRJ-2024-12",
    title: "Hall 5 HVAC Overhaul",
    location: "Rooftop, Section C",
    engineer: "Sanya Mirza",
    progress: 20,
    status: "WIP",
    priority: "High",
    startDate: "15 Oct",
    daysLeft: "90 Days",
    health: "good"
  }
];

export default function OngoingProjects() {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-16 relative font-sans selection:bg-orange-100">
      {/* Background Texture Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03]" 
        style={{ backgroundImage: `url(${textures.mainBg})` }} 
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 mb-12 relative">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border-2 border-slate-800">
              <ShieldCheck size={14} className="text-orange-400" /> Real-time Site Monitoring Node
            </div>
            <h1 className="text-6xl font-black text-slate-800 tracking-tighter uppercase leading-none">
              Ongoing <span className="text-orange-600">Projects</span>
            </h1>
            <p className="text-slate-500 font-medium text-xl italic underline underline-offset-8 decoration-slate-200">
              Shapoorji Pallonji • Bharat Mandapam Maintenance & Execution.
            </p>
          </div>
          
          <div className="flex gap-4">
             <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                <input 
                    type="text" 
                    placeholder="Search Site ID..." 
                    className="pl-12 pr-6 h-16 bg-white border-2 border-slate-100 rounded-3xl text-sm font-bold w-72 outline-none focus:border-orange-500 transition-all shadow-sm" 
                />
             </div>
             <button className="h-16 px-8 rounded-3xl border-2 border-slate-200 font-black uppercase tracking-widest text-[10px] text-slate-700 bg-white shadow-xl hover:bg-slate-50 transition-all flex items-center gap-2">
                <Filter className="h-4 w-4" /> Filter Ops
             </button>
          </div>
        </div>

        {/* --- KPI TILES (ENTERPRISE STYLE) --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[
                { label: "Active Sites", count: "12", icon: Building2, color: "from-indigo-600 to-blue-700" },
                { label: "On Schedule", count: "09", icon: CheckCircle2, color: "from-emerald-500 to-teal-600" },
                { label: "Delayed/Alerts", count: "03", icon: AlertTriangle, color: "from-orange-500 to-rose-600" },
                { label: "Avg. Progress", count: "64%", icon: TrendingUp, color: "from-slate-800 to-slate-950" },
            ].map((stat, i) => (
                <div key={i} className={cn(
                    "group relative p-8 rounded-[32px] overflow-hidden transition-all duration-500 h-44 flex flex-col justify-between shadow-lg hover:shadow-2xl bg-gradient-to-br text-white",
                    stat.color
                )}>
                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `url(${textures.bricks})` }} />
                    <div className="relative z-10 flex flex-col justify-between h-full w-full">
                        <div className="flex items-center justify-between">
                            <div className="h-10 w-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                                <stat.icon size={20} className="text-white drop-shadow-md" />
                            </div>
                            <MoreVertical size={16} className="opacity-50" />
                        </div>
                        <div>
                            <p className="text-4xl font-black tracking-tighter drop-shadow-sm leading-none">{stat.count}</p>
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-95 mt-2">{stat.label}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* --- PROJECTS GRID (WORK LEDGER STYLE) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {ongoingProjects.map((prj) => (
            <Card key={prj.id} className="rounded-[48px] border-none shadow-xl overflow-hidden bg-white p-0 group hover:shadow-2xl transition-all duration-500">
              <CardHeader className="p-0">
                <div className={cn(
                    "p-8 relative overflow-hidden transition-all duration-500",
                    prj.health === 'at-risk' ? "bg-gradient-to-r from-orange-600 to-rose-700" : "bg-gradient-to-r from-slate-800 to-slate-950"
                )}>
                  <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `url(${textures.accentBg})` }} />
                  <div className="flex justify-between items-start relative z-10">
                    <div className="flex items-center gap-5">
                      <div className="h-14 w-14 rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                        <LayoutGrid size={28} className="text-white" />
                      </div>
                      <div className="text-white">
                        <span className="font-mono text-[10px] font-black text-orange-400 tracking-wider uppercase">{prj.id}</span>
                        <CardTitle className="text-2xl font-black uppercase tracking-tight leading-none mt-1">{prj.title}</CardTitle>
                      </div>
                    </div>
                    <Badge variant="outline" className={cn(
                        "text-[9px] font-black uppercase tracking-widest px-3 py-0.5 border-2 rounded-full",
                        prj.status === 'Delayed' ? 'bg-white text-rose-700 border-white' : 'bg-white/20 text-white border-white/30'
                    )}>
                      {prj.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-10 space-y-8 relative">
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `url(${textures.cubes})` }} />
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-orange-600" />
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">{prj.location}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
                    <Zap className={cn("h-3.5 w-3.5", prj.health === 'good' ? "text-emerald-500" : "text-rose-500 animate-pulse")} />
                    <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Health: {prj.health === 'good' ? 'Stable' : 'Critical'}</span>
                  </div>
                </div>

                {/* Progress Section */}
                <div className="space-y-4 bg-slate-50/50 p-6 rounded-[32px] border border-slate-100">
                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Execution Milestone</p>
                            <p className="text-sm font-bold text-slate-800">Phase 04: Component Installation</p>
                        </div>
                        <span className="text-4xl font-black text-slate-900 tracking-tighter">{prj.progress}%</span>
                    </div>
                    <Progress value={prj.progress} className="h-3 bg-slate-100 [&>div]:bg-gradient-to-r [&>div]:from-orange-500 [&>div]:to-orange-700 rounded-full shadow-inner" />
                </div>

                {/* Personnel & Deadline */}
                <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 rounded-2xl border-2 border-white shadow-xl">
                            <AvatarFallback className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white text-[12px] font-black">
                                {prj.engineer.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Site Lead</p>
                            <p className="text-sm font-black text-slate-800 tracking-tight">{prj.engineer}</p>
                        </div>
                    </div>
                    
                    <div className="text-right">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Remaining Time</p>
                        <div className="flex items-center gap-2 bg-slate-900 text-white px-4 py-1.5 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg">
                            <Clock className="h-3.5 w-3.5 text-orange-400" /> {prj.daysLeft}
                        </div>
                    </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* --- GLOBAL ALERT BAR (ENTERPRISE STYLE) --- */}
        <div className="mt-12 p-8 bg-slate-950 rounded-[40px] relative overflow-hidden shadow-2xl border border-white/5">
             <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `url(${textures.accentBg})` }} />
             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 px-4">
                <div className="flex items-center gap-6">
                    <div className="h-16 w-16 rounded-3xl bg-rose-500/20 flex items-center justify-center border border-rose-500/30">
                        <AlertTriangle className="h-8 w-8 text-rose-500 animate-pulse" />
                    </div>
                    <div>
                        <h4 className="text-lg font-black text-white uppercase tracking-tight">Resource Criticality Alert</h4>
                        <p className="text-[11px] text-slate-400 font-medium uppercase tracking-widest mt-1">Material delivery for VVIP Lounge delayed by 48 hours. Node: DEL-CENTRAL-01</p>
                    </div>
                </div>
                <button className="h-14 px-10 rounded-2xl text-[10px] font-black text-white uppercase tracking-[0.2em] border-2 border-white/10 hover:bg-white/5 transition-all shadow-xl">
                    Acknowledge Pulse
                </button>
             </div>
        </div>

        {/* --- FOOTER --- */}
        <footer className="mt-24 pt-10 border-t-4 border-slate-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 opacity-40 grayscale hover:grayscale-0 transition-all">
             <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-slate-900 rounded-2xl flex items-center justify-center font-black text-white text-xl shadow-lg">S</div>
                <div className="leading-none text-left">
                    <p className="text-[12px] font-black uppercase tracking-[0.3em]">Shapoorji Pallonji</p>
                    <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-slate-500">Engineering & Construction Division</p>
                </div>
             </div>
             <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-[0.2em]">Site Monitoring Node: SP-CENTRAL-OPS</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">© 2024 Bharat Mandapam CMS • SP-ITPO Framework</p>
             </div>
          </div>
        </footer>
      </div>
    </div>
  );
}