"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Search, Filter, MapPin, 
  Clock, CheckCircle2, 
  ChevronRight, Building2,
  HardHat, Hammer, Droplets, Zap,
  Calendar, LayoutGrid, List, Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Status & Priority Badges ─────────────────────────────────────
function PriorityBadge({ priority }: { priority: string }) {
  const styles: Record<string, string> = {
    "Critical": "bg-rose-100 text-rose-700 border-rose-200",
    "High": "bg-orange-100 text-orange-700 border-orange-200",
    "Medium": "bg-amber-100 text-amber-700 border-amber-200",
    "Low": "bg-slate-100 text-slate-700 border-slate-200",
  };

  return (
    <Badge variant="outline" className={cn("text-[9px] font-black uppercase tracking-widest px-3 py-0.5 border-2 rounded-full", styles[priority])}>
      {priority}
    </Badge>
  );
}

// ─── Mock Data ───────────────────────────────────────────────────
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
    color: "from-blue-500 to-indigo-600",
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
    color: "from-emerald-500 to-teal-600",
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
    color: "from-slate-700 to-slate-900",
    icon: Hammer
  }
];

export default function MyAssignmentsPage() {
  const [filter, setFilter] = useState("All");

  return (
        <div className="space-y-12 animate-in fade-in duration-1000 pb-20 font-sans selection:bg-indigo-100 p-10">

      
      {/* APEX HEADER */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 relative">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-2 border-indigo-200">
            <HardHat size={14} className="animate-pulse" /> Engineering Personnel
          </div>
          <h1 className="text-6xl font-black text-slate-800 tracking-tighter uppercase leading-none">My <span className="text-indigo-600">Assignments</span></h1>
          <p className="text-slate-500 font-medium text-xl italic underline underline-offset-8 decoration-indigo-200">
            Direct execution portal for active infrastructure tasks and maintenance logs.
          </p>
        </div>

        <div className="flex gap-4">
          <div className="relative hidden lg:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="SEARCH TASKS..." 
              className="h-16 pl-12 pr-6 rounded-3xl border-2 border-slate-100 font-black uppercase tracking-widest text-[10px] bg-white shadow-xl focus:outline-none focus:border-indigo-300 w-64 transition-all"
            />
          </div>
          <Button 
            variant="outline"
            className="h-16 px-8 rounded-3xl border-2 border-indigo-200 font-black uppercase tracking-widest text-[10px] text-indigo-700 bg-white shadow-xl hover:bg-indigo-50 transition-all"
          >
            <Filter size={20} className="mr-2" /> Filter Tasks
          </Button>
        </div>
      </div>

      {/* FILTER TABS */}
      <div className="flex flex-wrap items-center gap-3">
        {["All", "In Progress", "Pending", "Completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={cn(
              "px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2",
              filter === tab 
                ? "bg-slate-900 text-white border-slate-900 shadow-xl scale-105" 
                : "bg-white text-slate-400 border-slate-100 hover:border-slate-200"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ASSIGNMENTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {assignments.map((item) => (
          <Card key={item.id} className="rounded-[40px] border-none shadow-xl overflow-hidden bg-white group hover:shadow-2xl transition-all duration-500 p-0">
            {/* Card Header with Pattern */}
            <div className={cn("p-8 relative overflow-hidden bg-gradient-to-br text-white", item.color)}>
              <div className="absolute inset-0 opacity-40 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/diagonal-striped-brick.png')]" />
              
              <div className="relative z-10 flex justify-between items-start">
                <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <item.icon size={24} className="text-white" />
                </div>
                <div className="text-right">
                  <p className="font-mono text-[10px] font-black text-white/80 tracking-widest uppercase">{item.id}</p>
                  <div className="mt-2">
                    <PriorityBadge priority={item.priority} />
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-8">
                <h3 className="text-xl font-black uppercase tracking-tight leading-tight mb-2">{item.title}</h3>
                <p className="text-[10px] font-bold text-white/70 uppercase tracking-[0.2em]">{item.category}</p>
              </div>
            </div>

            <CardContent className="p-8 space-y-6 bg-slate-50/30 relative">
               <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
               
               <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-3 text-slate-500">
                    <MapPin size={16} className="text-indigo-500" />
                    <span className="text-[11px] font-bold uppercase tracking-wide">{item.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500">
                    <Calendar size={16} className="text-indigo-500" />
                    <span className="text-[11px] font-bold uppercase tracking-wide">Deadline: {item.deadline}</span>
                  </div>

                  {/* Progress Indicator */}
                  <div className="pt-4 space-y-3">
                    <div className="flex justify-between items-end">
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Task Completion</span>
                      <span className="text-sm font-black text-slate-800">{item.progress}%</span>
                    </div>
                    <Progress value={item.progress} className="h-2 bg-slate-200 [&>div]:bg-indigo-600 rounded-full" />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <Button className="flex-1 h-14 rounded-2xl bg-white border-2 border-slate-200 text-slate-800 hover:bg-slate-50 font-black uppercase tracking-widest text-[10px] transition-all">
                      Update Progress
                    </Button>
                    <Button size="icon" className="h-14 w-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg">
                      <ChevronRight size={20} />
                    </Button>
                  </div>
               </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FOOTER WIDGET */}
      <Card className="rounded-[48px] border-none shadow-xl overflow-hidden bg-slate-900 text-white relative">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="p-10 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="h-16 w-16 rounded-3xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
              <Activity size={32} className="text-indigo-400 animate-pulse" />
            </div>
            <div>
              <h4 className="text-lg font-black uppercase tracking-tight">Lead Engineer Oversight</h4>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">You are managing 4 active infrastructure contracts</p>
            </div>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <Button className="h-16 px-10 rounded-3xl bg-white/5 hover:bg-white/10 text-white border border-white/10 font-black uppercase tracking-widest text-[10px] flex-1 md:flex-none">
              <Clock size={18} className="mr-2 text-amber-400" /> View Duty Roster
            </Button>
            <Button className="h-16 px-10 rounded-3xl bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest text-[10px] shadow-2xl flex-1 md:flex-none">
              Generate Report
            </Button>
          </div>
        </div>
      </Card>

    </div>
  );
}