"use client";

import React, { useState, useEffect } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell 
} from "recharts";
import { 
  HardHat, FileSearch, Users, ExternalLink, ArrowRight, 
  Filter, Search, ChevronRight, Activity, ArrowUpRight, 
  ShieldCheck, Clock, X, CheckCircle2, AlertTriangle, 
  Hammer, Zap, Settings, Droplets, Download, Info
} from "lucide-react";

// Shadcn UI Imports
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

// Types
type Category = "General Civil" | "Electrical" | "Mechanical" | "Plumbing";

interface TechnicalTask {
  id: string;
  title: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  type: Category;
  source: string;
  daysLeft: string;
  description: string;
}

const kpiData = [
  { 
    title: "Pending Tech Review", 
    value: "14", 
    icon: FileSearch, 
    bg: "bg-amber-50/80 dark:bg-amber-900/10", 
    border: "border-amber-200 dark:border-amber-800",
    iconBg: "bg-amber-500",
    textColor: "text-amber-700 dark:text-amber-400"
  },
  { 
    title: "Direct NBCC Execution", 
    value: "09", 
    icon: HardHat, 
    bg: "bg-emerald-50/80 dark:bg-emerald-900/10", 
    border: "border-emerald-200 dark:border-emerald-800",
    iconBg: "bg-emerald-600",
    textColor: "text-emerald-700 dark:text-emerald-400"
  },
  { 
    title: "Forwarded to SPCL", 
    value: "22", 
    icon: ExternalLink, 
    bg: "bg-indigo-50/80 dark:bg-indigo-900/10", 
    border: "border-indigo-200 dark:border-indigo-800",
    iconBg: "bg-indigo-600",
    textColor: "text-indigo-700 dark:text-indigo-400"
  },
  { 
    title: "On-Site Deployment", 
    value: "38", 
    icon: Users, 
    bg: "bg-slate-100/80 dark:bg-slate-800/40", 
    border: "border-slate-300 dark:border-slate-700",
    iconBg: "bg-slate-700",
    textColor: "text-slate-700 dark:text-slate-300"
  },
];

const initialQueue: TechnicalTask[] = [
  { id: "CON-2025-401", title: "G20 Plenary Hall HVAC Tuning", priority: "Critical", type: "Mechanical", source: "ITPO Raised", daysLeft: "2 Days", description: "Calibration of central cooling units in the main plenary hall for upcoming summit." },
  { id: "CON-2025-412", title: "External Pathway Granite Repair", priority: "Medium", type: "General Civil", source: "ITPO Raised", daysLeft: "14 Days", description: "Stone replacement and leveling of the VIP entrance pathway." },
  { id: "CON-2025-418", title: "Main Entrance Digital Signage", priority: "High", type: "Electrical", source: "ITPO Raised", daysLeft: "5 Days", description: "Installation of 4K LED displays for information broadcasting at Gate 1." }
];

export default function NBCCProfessionalReview() {
  const [mounted, setMounted] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TechnicalTask | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [classification, setClassification] = useState<string>("");

  useEffect(() => setMounted(true), []);

  const handleReview = (task: TechnicalTask) => {
    setSelectedTask(task);
    setIsSheetOpen(true);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#fcfcfd] dark:bg-[#020617] text-slate-900 dark:text-slate-50 font-sans selection:bg-indigo-100 relative">
      {/* Blueprint Pattern Background */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: `url('https://transparenttextures.com/patterns/cubes.png')` }} />

      <main className="relative z-10 p-6 lg:p-10 max-w-[1600px] mx-auto space-y-8">
        
        {/* Professional Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-8 w-8 bg-slate-900 dark:bg-white rounded flex items-center justify-center shadow-lg">
                <ShieldCheck className="h-5 w-5 text-white dark:text-slate-900" />
              </div>
              <h2 className="text-xs font-black tracking-[0.2em] text-slate-500 uppercase">
                Bharat Mandapam Operations
              </h2>
            </div>
            <h1 className="text-4xl font-black tracking-tight uppercase">Technical Review Portal</h1>
            <p className="text-slate-500 text-sm mt-1 font-medium italic">NBCC PMC: Classifying Infrastructure Requests under Case 2 Logic.</p>
          </div>

          <div className="flex items-center gap-3 pb-1">
            <div className="relative w-64 hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Search Queue ID..." className="bg-white border-slate-200 text-xs pl-10" />
            </div>
            <Button variant="outline" className="text-xs font-bold uppercase border-2 flex gap-2">
              <Download size={14} /> Export Logs
            </Button>
          </div>
        </div>

        {/* KPI Grid with Professional Tints & Texture */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {kpiData.map((kpi, i) => (
            <Card key={i} className={`relative overflow-hidden border ${kpi.border} ${kpi.bg} shadow-sm group hover:shadow-md transition-all`}>
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none group-hover:opacity-[0.1] transition-opacity" style={{ backgroundImage: `url('https://transparenttextures.com/patterns/cubes.png')` }} />
              <CardContent className="p-6 relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2 rounded-lg ${kpi.iconBg} text-white shadow-lg`}>
                    <kpi.icon size={20} />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-slate-400" />
                </div>
                <p className={`text-[10px] font-black uppercase tracking-[0.15em] mb-1 ${kpi.textColor}`}>
                  {kpi.title}
                </p>
                <h3 className="text-3xl font-black tracking-tighter">{kpi.value}</h3>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Workload Queue Table */}
        <Card className="shadow-sm border-slate-200 dark:border-slate-800 overflow-hidden bg-white/70 backdrop-blur-sm">
          <CardHeader className="bg-slate-50/50 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
                <CardTitle className="text-sm font-black uppercase tracking-[0.15em] text-slate-600">Assignment Pending Technical Review</CardTitle>
              </div>
              <Badge variant="outline" className="text-[10px] font-bold bg-white">{initialQueue.length} Critical Actions</Badge>
            </div>
          </CardHeader>
          <Table>
            <TableHeader className="bg-slate-100/50">
              <TableRow className="border-b border-slate-200 dark:border-slate-800">
                <TableHead className="font-black uppercase text-[10px] px-8 tracking-widest text-slate-500">Ref ID</TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-500">Task Summary</TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-500">Origin</TableHead>
                <TableHead className="font-black uppercase text-[10px] text-center tracking-widest text-slate-500">Days Left</TableHead>
                <TableHead className="text-right font-black uppercase text-[10px] px-8 tracking-widest text-slate-500">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialQueue.map((task) => (
                <tr key={task.id} className="group hover:bg-white dark:hover:bg-slate-800/40 border-b border-slate-100 transition-colors">
                  <TableCell className="px-8 font-mono text-xs font-bold text-slate-400 group-hover:text-indigo-600">{task.id}</TableCell>
                  <TableCell>
                    <div className="font-bold text-sm text-slate-900">{task.title}</div>
                    <div className="text-[10px] text-slate-400 font-black uppercase tracking-tighter mt-1">{task.type}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">{task.source}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1.5 text-amber-600 font-black text-[11px] uppercase">
                      <Clock size={12} /> {task.daysLeft}
                    </div>
                  </TableCell>
                  <TableCell className="px-8 text-right">
                    <Button 
                      onClick={() => handleReview(task)}
                      className="text-[10px] font-black uppercase h-8 px-5 rounded bg-white dark:bg-slate-900 border-2 border-slate-900 dark:border-slate-100 text-slate-900 dark:text-white hover:bg-slate-900 hover:text-white transition-all shadow-sm active:scale-95"
                    >
                      Review
                    </Button>
                  </TableCell>
                </tr>
              ))}
            </TableBody>
          </Table>
          <div className="bg-slate-50/50 p-4 text-center border-t border-slate-200">
             <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors">Load Detailed History</button>
          </div>
        </Card>
      </main>

      {/* --- SHADCN SHEET FOR REVIEW --- */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-lg flex flex-col gap-0 p-0 border-l-4 border-l-indigo-600">
          <SheetHeader className="p-8 border-b bg-slate-50/50">
            <SheetTitle className="text-2xl font-black tracking-tight uppercase">Technical Audit</SheetTitle>
            <SheetDescription className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mt-2 flex items-center gap-2">
              <Info size={14} /> Case 2 Protocol • {selectedTask?.id}
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto p-8 space-y-8">
            {/* Info Section */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Requirement Context</h4>
              <Card className="bg-slate-50/80 shadow-none border-dashed border-2 relative overflow-hidden">
                 <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url('https://transparenttextures.com/patterns/cubes.png')` }} />
                <CardContent className="p-5 relative z-10">
                  <h5 className="font-bold text-base mb-2 leading-tight">{selectedTask?.title}</h5>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">{selectedTask?.description}</p>
                </CardContent>
              </Card>
            </div>

            {/* Classification Card-Style Selection */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Classification Decision</h4>
              <RadioGroup value={classification} onValueChange={setClassification} className="gap-3">
                <div className={`group flex items-center space-x-3 space-y-0 rounded-xl border-2 p-4 transition-all cursor-pointer ${classification === "small" ? "border-indigo-600 bg-indigo-50/50" : "hover:border-slate-300"}`}>
                  <RadioGroupItem value="small" id="small" className="sr-only" />
                  <Label htmlFor="small" className="flex-1 cursor-pointer flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm">
                      <HardHat className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-black uppercase tracking-tight">Small Scale (Internal)</p>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase">Direct NBCC Execution</p>
                    </div>
                  </Label>
                  {classification === "small" && <CheckCircle2 className="h-5 w-5 text-indigo-600" />}
                </div>

                <div className={`group flex items-center space-x-3 space-y-0 rounded-xl border-2 p-4 transition-all cursor-pointer ${classification === "large" ? "border-indigo-600 bg-indigo-50/50" : "hover:border-slate-300"}`}>
                  <RadioGroupItem value="large" id="large" className="sr-only" />
                  <Label htmlFor="large" className="flex-1 cursor-pointer flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm">
                      <ExternalLink className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-black uppercase tracking-tight">Large Scale (Outsourced)</p>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase">Assign to SPCL Pallonji</p>
                    </div>
                  </Label>
                  {classification === "large" && <CheckCircle2 className="h-5 w-5 text-indigo-600" />}
                </div>
              </RadioGroup>
            </div>

            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 flex gap-4">
              <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-[11px] text-amber-800 font-bold leading-relaxed uppercase tracking-tighter">
                Institutional Note: Selection of scale determines the financial approval track. Small scale allows for faster internal resource deployment.
              </p>
            </div>
          </div>

          <SheetFooter className="p-8 border-t bg-slate-50/50">
            <div className="flex w-full gap-4">
              <Button variant="outline" className="flex-1 text-[10px] font-black uppercase tracking-widest border-2 h-12" onClick={() => setIsSheetOpen(false)}>Discard</Button>
              <Button 
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-[10px] font-black uppercase tracking-widest h-12 shadow-lg shadow-indigo-200" 
                disabled={!classification}
                onClick={() => {
                   alert(`Success: ${selectedTask?.id} classified.`);
                   setIsSheetOpen(false);
                }}
              >
                Confirm Decision
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}