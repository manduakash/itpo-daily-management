"use client";

import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Activity,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  HardHat,
  MessageSquare,
  ChevronRight,
  UserCheck,
  Send,
  SlidersHorizontal,
  Briefcase,
  Layers,
  ArrowUpRight,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Project Milestone Steps Matching Case Flows ─────────────────
const initialCase3Steps = [
  { label: "ITPO Raised", status: "complete" },
  { label: "Shapoorji Accepted", status: "complete" },
  { label: "Cost Estimation", status: "complete" },
  { label: "ITPO Approval", status: "complete" },
  { label: "Engineer Assigned", status: "complete" },
  { label: "Work Started", status: "current" },
  { label: "Completion Report", status: "upcoming" },
  { label: "ITPO Inspection", status: "upcoming" },
  { label: "Closure", status: "upcoming" },
];

const initialCase2Steps = [
  { label: "ITPO Raised", status: "complete" },
  { label: "NBCC Review", status: "complete" },
  { label: "Assignged to Sapoorji", status: "complete" },
  { label: "NBCC Started Work", status: "current" },
  { label: "Completion", status: "upcoming" },
  { label: "ITPO Approval", status: "upcoming" },
  { label: "Closure", status: "upcoming" },
];

const initialCase1Steps = [
  { label: "ITPO Raised", status: "complete" },
  { label: "Visible to Contractors", status: "complete" },
  { label: "Cost Estimation Submitted", status: "complete" },
  { label: "Cost Estimation Approved", status: "complete" },
  { label: "Engineers Assigned", status: "complete" },
  { label: "Work Started", status: "complete" },
  { label: "Work in Progress", status: "complete" },
  { label: "Completion Report", status: "complete" },
  { label: "ITPO Inspection", status: "current" },
  { label: "Contract Closure", status: "upcoming" },
];

// ─── Active Projects State Data ──────────────────────────────────
const INITIAL_PROJECTS = [
  {
    id: "PRJ-2041",
    title: "Convention Hall 3 & 4 Renovation",
    location: "Block A - Main Complex",
    agency: "Shapoorji (Case 3 Flow)",
    manager: "Karan Johar (SP Lead)",
    progress: 60,
    statusText: "Work In Progress",
    category: "General Civil",
    lastUpdate: "Plaster work finished on main deck frame. Electrics setup starting.",
    flowType: "Case 3: Direct Shapoorji Flow",
    steps: initialCase3Steps,
  },
  {
    id: "PRJ-2035",
    title: "Main Foyer Restructuring & Plumbing",
    location: "Foyer Block B",
    agency: "NBCC Direct (Case 2 Small)",
    manager: "Vikas Kumar (NBCC PM)",
    progress: 42,
    statusText: "NBCC Direct Execution",
    category: "Plumbing",
    lastUpdate: "Classification verified as Small Scale. Pipe routing mapped.",
    flowType: "Case 2: NBCC Management Flow",
    steps: initialCase2Steps,
  },
  {
    id: "PRJ-2022",
    title: "Central AC Chiller Unit Replacement",
    location: "Block B Plant Room",
    agency: "Shapoorji - Bid Winner (Case 1)",
    manager: "Rahul Sharma (Lead Engineer)",
    progress: 90,
    statusText: "ITPO Inspection",
    category: "Mechanical/HVAC",
    lastUpdate: "Chiller integration complete. Operations logs uploaded; waiting inspection.",
    flowType: "Case 1: Open Bidding Flow",
    steps: initialCase1Steps,
  },
];

// ─── Category Pastel Style Mapper ──────────────────────────────────
function getCategoryBadge(category: string) {
  const styles: Record<string, string> = {
    "General Civil": "bg-[#E4C1F9]/20 text-[#4E1A6E] border-[#CBC0D3]/40",
    "Plumbing": "bg-[#AFCBFF]/20 text-[#1e3a5f] border-[#B8C0FF]/40",
    "Mechanical/HVAC": "bg-[#FFD6A5]/20 text-[#7c4f10] border-[#F9C74F]/40",
  };
  return (
    <Badge variant="outline" className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full", styles[category] || "bg-slate-100 text-slate-700 border-slate-200")}>
      {category}
    </Badge>
  );
}

export default function ProjectTrackingPage() {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0].id);
  const [newLogText, setNewLogText] = useState("");
  const [systemMessage, setSystemMessage] = useState<string | null>(null);

  const activeProject = useMemo(() => {
    return projects.find((p) => p.id === selectedProjectId) || projects[0];
  }, [projects, selectedProjectId]);

  // --- Handlers ---
  const handleAddLogUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogText.trim()) return;

    setProjects(prev => prev.map(p => {
      if (p.id === selectedProjectId) {
        return {
          ...p,
          lastUpdate: newLogText.trim()
        };
      }
      return p;
    }));

    setNewLogText("");
    triggerNotification(`Site progress log broadcasted for project ${selectedProjectId}.`);
  };

  const handleAdvanceStep = (projectId: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const currentIdx = p.steps.findIndex(s => s.status === "current");
        if (currentIdx !== -1 && currentIdx < p.steps.length - 1) {
          const updatedSteps = p.steps.map((step, idx) => {
            if (idx === currentIdx) return { ...step, status: "complete" as const };
            if (idx === currentIdx + 1) return { ...step, status: "current" as const };
            return step;
          });

          // Also dynamically increment project progress metrics
          const newProgress = Math.min(p.progress + 15, 100);
          const isFinished = currentIdx + 1 === p.steps.length - 1;

          return {
            ...p,
            steps: updatedSteps,
            progress: newProgress,
            statusText: isFinished ? "Finalized / Cleared" : p.statusText,
            lastUpdate: `Milestone advanced to: "${updatedSteps[currentIdx + 1].label}" step by ITPO Secretariat approval.`
          };
        }
      }
      return p;
    }));
    triggerNotification(`Workflow advanced to next step for ${projectId}.`);
  };

  const triggerNotification = (msg: string) => {
    setSystemMessage(msg);
    setTimeout(() => {
      setSystemMessage(null);
    }, 4000);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-5 space-y-5  text-[#0f172a] min-h-screen relative font-sans selection:bg-[#B8C0FF]/40">
      
      {/* Background patterns overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.015] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/topography.png')] opacity-[0.01] pointer-events-none z-0" />

      {/* --- PAGE COMPACT HEADER --- */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#e2e8f0] pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <span>Central Secretariat</span>
            <span>/</span>
            <span>Milestone Audits</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Project Lifecycle Tracking</h1>
          <p className="text-xs text-slate-500">
            Monitor partner execution flows, check milestone verifications, and inspect site operation logs.
          </p>
        </div>
        
        {/* Reset / Context Badge */}
        <Badge variant="outline" className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 border-slate-300 text-slate-500 bg-slate-50 rounded-full">
          Case Status Nodes Online
        </Badge>
      </div>

      {/* Dynamic Feedback Banner */}
      {systemMessage && (
        <div className="relative z-10 p-3 rounded-lg border border-[#BDE0A8] bg-[#CDEAC0]/25 text-slate-950 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 size={14} className="text-emerald-800 shrink-0" />
          <span>{systemMessage}</span>
        </div>
      )}

      {/* --- SPLIT SCREEN GRID LAYOUT --- */}
      <div className="grid gap-5 lg:grid-cols-12 relative z-10 items-start">

        {/* Left Column: Projects Directory Panel (4/12 Columns) */}
        <div className="space-y-3 col-span-12 lg:col-span-4">
          <div className="flex items-center justify-between pl-1">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <SlidersHorizontal size={12} className="text-slate-400" />
              Active Project Directory
            </h3>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {projects.length} Registered
            </span>
          </div>

          <div className="space-y-3">
            {projects.map((project) => {
              const isSelected = project.id === selectedProjectId;
              return (
                <Card
                  key={project.id}
                  onClick={() => setSelectedProjectId(project.id)}
                  className={cn(
                    "cursor-pointer border transition-all hover:shadow-md hover:-translate-y-[0.5px] rounded-xl overflow-hidden",
                    isSelected 
                      ? "border-[#B8C0FF] bg-[#B8C0FF]/10 shadow-xs ring-1 ring-[#AFCBFF]/55" 
                      : "border-slate-200 bg-white shadow-xs"
                  )}
                >
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-slate-900">{project.id}</span>
                      {getCategoryBadge(project.category)}
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-xs text-slate-900 line-clamp-1">{project.title}</h4>
                      <span className="text-[11px] text-slate-400 mt-0.5 block">{project.location}</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-semibold text-slate-500">
                        <span>Work Progress</span>
                        <span className="font-bold text-slate-900">{project.progress}%</span>
                      </div>
                      <Progress 
                        value={project.progress} 
                        className="h-1.5 bg-slate-200 rounded-full" 
                      />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Right Column: Execution Tracking Details (8/12 Columns) */}
        <Card className="col-span-12 lg:col-span-8 rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          
          {/* Details Card Header */}
          <CardHeader className="border-b border-slate-200 bg-slate-50/50 p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="font-mono text-xs font-bold text-slate-700 bg-slate-200/50 border border-slate-300/30 px-2 py-0.5 rounded">
                  {activeProject.id}
                </span>
                <CardTitle className="text-sm font-semibold text-slate-900 mt-1.5">
                  {activeProject.title}
                </CardTitle>
                <CardDescription className="text-xs text-slate-500 mt-0.5">
                  {activeProject.location} • {activeProject.flowType}
                </CardDescription>
              </div>

              {/* Status Badge */}
              <Badge className="bg-[#AFCBFF]/20 text-slate-900 border border-[#B8C0FF]/50 shrink-0 h-7 text-xs font-semibold px-3 rounded-full">
                {activeProject.statusText}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="p-5 space-y-5">

            {/* Summary Details Row */}
            <div className="grid gap-4 sm:grid-cols-2 text-xs border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Assigned Partner</span>
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <Building2 className="h-4 w-4 text-[#B8C0FF] shrink-0" /> 
                  {activeProject.agency}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Assigned Manager</span>
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <HardHat className="h-4 w-4 text-[#B8C0FF] shrink-0" /> 
                  {activeProject.manager}
                </span>
              </div>
            </div>

            {/* Visual Timeline Tracker / Stepper */}
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Workflow Milestones & Current Phase
                </h4>
                
                {/* Advanced Control operator */}
                <Button
                  size="sm"
                  onClick={() => handleAdvanceStep(activeProject.id)}
                  className="h-7 px-2.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-[11px] font-semibold gap-1 transition-all hover:-translate-y-[0.5px]"
                >
                  <Plus size={11} />
                  Approve Current Milestone
                </Button>
              </div>

              <div className="relative pl-6 space-y-4 border-l border-slate-200 ml-2">
                {activeProject.steps.map((step, idx) => {
                  const isComplete = step.status === "complete";
                  const isCurrent = step.status === "current";

                  return (
                    <div key={idx} className="relative">
                      
                      {/* Step Indicator Dot (Strict Pastel Palette Mapping) */}
                      <span
                        className={cn(
                          "absolute -left-9 top-0.5 flex h-5 w-5 items-center justify-center rounded-full border text-[10px] font-bold",
                          isComplete && "bg-[#CDEAC0] border-[#BDE0A8] text-emerald-950",
                          isCurrent && "bg-[#AFCBFF] border-[#B8C0FF] text-slate-900 shadow-xs",
                          step.status === "upcoming" && "bg-white border-slate-300 text-slate-400"
                        )}
                      >
                        {isComplete ? (
                          <CheckCircle2 className="h-3 w-3 text-emerald-900" />
                        ) : (
                          idx + 1
                        )}
                      </span>

                      {/* Step label description */}
                      <div className="pl-1.5">
                        <h5
                          className={cn(
                            "text-xs font-semibold",
                            isComplete && "text-slate-500",
                            isCurrent && "text-slate-900 font-bold text-sm",
                            step.status === "upcoming" && "text-slate-400 font-normal"
                          )}
                        >
                          {step.label}
                        </h5>
                        {isCurrent && (
                          <span className="inline-flex items-center gap-1 text-[9px] bg-[#AFCBFF]/20 text-[#1e3a5f] border border-[#B8C0FF]/40 rounded px-1.5 py-0.5 mt-1 font-bold uppercase tracking-wider">
                            Active Operations Stage
                          </span>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* Latest Site Progress Update Box */}
            <div className="rounded-lg bg-[#f8fafc] p-4 border border-slate-200 text-xs space-y-2">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <MessageSquare className="h-3.5 w-3.5 text-slate-400" /> Latest Operations Log Update:
              </h4>
              <p className="text-slate-600 leading-relaxed font-medium">
                {activeProject.lastUpdate}
              </p>
            </div>

            {/* Injected Interactive Log Broadcaster */}
            <form onSubmit={handleAddLogUpdate} className="space-y-2 pt-2 border-t border-slate-100">
              <label htmlFor="logUpdate" className="text-xs font-medium text-slate-600">
                Broadcast Site Progress Update Log
              </label>
              <div className="flex gap-2">
                <input
                  id="logUpdate"
                  type="text"
                  placeholder="Insert notes, e.g. Electrics cleared; starting core structural audits..."
                  value={newLogText}
                  onChange={(e) => setNewLogText(e.target.value)}
                  className="flex-1 h-10 px-3 border border-slate-300 bg-white rounded-lg text-xs focus:ring-2 focus:ring-slate-100 outline-none placeholder:text-slate-400"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="h-10 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold gap-1.5 shrink-0"
                >
                  <Send size={12} />
                  Post Log
                </Button>
              </div>
            </form>

          </CardContent>
        </Card>

      </div>

      {/* --- FOOTER COMPLIANCE --- */}
      <footer className="pt-4 border-t border-slate-200 text-center text-[10px] text-slate-400 font-medium">
        <span>Lifecycle Audit Terminal • Pragati Maidan Redevelopment Project (ITPO)</span>
      </footer>

    </div>
  );
}