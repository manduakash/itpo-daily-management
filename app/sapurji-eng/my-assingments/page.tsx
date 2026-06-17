"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  ChevronRight, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  FileText,
  Hammer,
  Building2,
  HardHat,
  MoreVertical
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Status & Priority Badge Helpers ─────────────────────────────────────
function AssignmentStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "Active": "bg-indigo-100 text-indigo-700 border-indigo-200",
    "Pending Approval": "bg-amber-100 text-amber-700 border-amber-200",
    "Completed": "bg-emerald-100 text-emerald-700 border-emerald-200",
  };

  return (
    <Badge variant="outline" className={cn("text-[9px] font-black uppercase tracking-widest px-3 py-0.5 border-2 rounded-full", styles[status])}>
      {status}
    </Badge>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const styles: Record<string, string> = {
    "Critical": "text-rose-600 bg-rose-50 border-rose-100",
    "High": "text-orange-600 bg-orange-50 border-orange-100",
    "Medium": "text-indigo-600 bg-indigo-50 border-indigo-100",
    "Low": "text-slate-500 bg-slate-50 border-slate-100",
  };
  return (
    <span className={cn("text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded border-2", styles[priority])}>
      {priority} Priority
    </span>
  );
}

// ─── Mock Data ───────────────────────────────────────────────────
const assignments = [
  {
    id: "CON-9901",
    title: "Convention Hall 1: Flooring Renovation",
    location: "Level 2, Zone A",
    category: "General Civil",
    priority: "Critical",
    status: "Active",
    deadline: "Oct 30, 2023",
    progress: 65,
    description: "Installation of Italian marble and leveling of the sub-floor.",
    color: "from-slate-800 to-indigo-950"
  },
  {
    id: "CON-9905",
    title: "VVIP Lounge: HVAC Integration",
    location: "Block C, Entrance 4",
    category: "Mechanical",
    priority: "High",
    status: "Active",
    deadline: "Nov 05, 2023",
    progress: 30,
    description: "Installing secondary ducting for the new lounge area.",
    color: "from-indigo-600 to-blue-700"
  },
  {
    id: "CON-9844",
    title: "External Facade Lighting",
    location: "North Plaza",
    category: "Electrical",
    priority: "Medium",
    status: "Pending Approval",
    deadline: "Nov 12, 2023",
    progress: 0,
    description: "Testing of LED strips on the glass fins of the main building.",
    color: "from-amber-500 to-orange-600"
  }
];

export default function MyAssignments() {
  const [activeTab, setActiveTab] = useState("All Assignments");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAssignments = assignments.filter((item) => {
    const matchesTab = activeTab === "All Assignments" || item.status === activeTab;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-20 font-sans selection:bg-indigo-100 p-10">
      
      {/* APEX HEADER */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 relative">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-2 border-indigo-200">
            <HardHat size={14} className="animate-pulse" /> Shapoorji Site Execution
          </div>
          <h1 className="text-6xl font-black text-slate-800 tracking-tighter uppercase leading-none">Work <span className="text-indigo-600">Ledger</span></h1>
          <p className="text-slate-500 font-medium text-xl italic underline underline-offset-8 decoration-indigo-200">
            Management of active site assignments, resource deployment, and task progress.
          </p>
        </div>

        <div className="flex gap-4">
          <div className="relative hidden lg:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="SEARCH ASSIGNMENTS..." 
              className="h-16 pl-12 pr-6 rounded-3xl border-2 border-slate-100 font-black uppercase tracking-widest text-[10px] bg-white shadow-xl focus:outline-none focus:border-indigo-300 w-64 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
        {["All Assignments", "Active", "Pending Approval", "Completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2",
              activeTab === tab 
                ? "bg-slate-900 text-white border-slate-900 shadow-xl scale-105" 
                : "bg-white text-slate-400 border-slate-100 hover:border-slate-200"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ASSIGNMENTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-10">
        <AnimatePresence mode="popLayout">
          {filteredAssignments.map((work) => (
            <motion.div
              key={work.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card className="rounded-[48px] border-none shadow-xl overflow-hidden bg-white group hover:shadow-2xl transition-all duration-500">
                {/* Header Section */}
                <div className={cn("p-8 relative overflow-hidden bg-gradient-to-br text-white", work.color)}>
                  <div className="absolute inset-0 opacity-40 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/diagonal-striped-brick.png')]" />
                  
                  <div className="relative z-10 flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-[10px] font-black text-white/60 tracking-widest uppercase">ID: {work.id}</span>
                      <h3 className="text-2xl font-black uppercase tracking-tight leading-tight group-hover:text-indigo-200 transition-colors">
                        {work.title}
                      </h3>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                       <AssignmentStatusBadge status={work.status} />
                       <PriorityBadge priority={work.priority} />
                    </div>
                  </div>
                </div>

                <CardContent className="p-10 space-y-8 bg-slate-50/30 relative">
                   <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                   
                   <div className="relative z-10 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center gap-3 text-slate-500">
                          <MapPin size={16} className="text-indigo-500" />
                          <span className="text-[11px] font-black uppercase tracking-widest">{work.location}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-500">
                          <Calendar size={16} className="text-indigo-500" />
                          <span className="text-[11px] font-black uppercase tracking-widest">DUE: {work.deadline}</span>
                        </div>
                      </div>

                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-relaxed border-l-4 border-indigo-100 pl-4">
                        {work.description}
                      </p>

                      {/* Progress Section */}
                      <div className="pt-4 space-y-3">
                        <div className="flex justify-between items-end">
                          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Execution Progress</span>
                          <span className="text-sm font-black text-slate-900">{work.progress}%</span>
                        </div>
                        <Progress value={work.progress} className={cn("h-2.5 bg-slate-200", work.status === 'Completed' ? "[&>div]:bg-emerald-500" : "[&>div]:bg-indigo-600")} />
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-4 pt-4">
                        <Button className="flex-1 h-14 rounded-2xl bg-white border-2 border-slate-200 text-slate-800 hover:bg-slate-50 font-black uppercase tracking-widest text-[10px] shadow-sm transition-all">
                          View Site Details
                        </Button>
                        <Button className="flex-1 h-14 rounded-2xl bg-slate-900 text-white hover:bg-indigo-600 font-black uppercase tracking-widest text-[10px] shadow-xl transition-all flex items-center justify-center gap-2">
                          Update Progress <ChevronRight size={16} />
                        </Button>
                      </div>
                   </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* EMPTY STATE */}
      {filteredAssignments.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 space-y-6">
          <div className="h-24 w-24 rounded-full bg-slate-100 flex items-center justify-center text-slate-300">
            <CheckCircle2 size={48} />
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-black uppercase tracking-tight text-slate-800">No Assignments Found</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Adjust your search parameters or ledger filters</p>
          </div>
        </div>
      )}
    </div>
  );
}