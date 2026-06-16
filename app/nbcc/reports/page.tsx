"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FileBarChart2,
  Calendar,
  ArrowDownToLine,
  TrendingDown,
  Zap,
  Award,
  RefreshCw,
  CheckCircle2,
  History,
  Search,
  Filter,
  FileText,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import {
  XAxis, YAxis, Tooltip, 
  ResponsiveContainer, AreaChart, Area,
  CartesianGrid 
} from "recharts";
import { cn } from "@/lib/utils";

// ─── Format Badge Helper (Secretariat Style) ──────────────────────────
function ITPOFormatBadge({ format }: { format: string }) {
  const styles: Record<string, string> = {
    "PDF": "bg-rose-100 text-rose-700 border-rose-200",
    "XLSX": "bg-emerald-100 text-emerald-700 border-emerald-200",
    "CSV": "bg-blue-100 text-blue-700 border-blue-200",
  };

  return (
    <Badge variant="outline" className={cn("text-[9px] font-black uppercase tracking-widest px-3 py-0.5 border-2 rounded-full", styles[format] || "bg-slate-100 text-slate-700")}>
      {format}
    </Badge>
  );
}

// ─── Mock Data ────────────────────────────────────────────────────────
const operationalMetrics = [
  {
    title: "Budget Adherence",
    value: "96.8%",
    subtitle: "Variance of -3.2% (Under Budget)",
    icon: TrendingDown,
    color: "from-emerald-500 to-teal-600",
  },
  {
    title: "Avg. Project Velocity",
    value: "14.2 Days",
    subtitle: "Target timeline deviation minimal",
    icon: Zap,
    color: "from-blue-500 to-indigo-600",
  },
  {
    title: "Quality Audit Index",
    value: "98.4%",
    subtitle: "Pass rate on first inspection",
    icon: Award,
    color: "from-purple-500 to-violet-600",
    alert: true,
  },
];

const performanceTrend = [
  { month: "Jan", score: 82 },
  { month: "Feb", score: 88 },
  { month: "Mar", score: 94 },
  { month: "Apr", score: 91 },
  { month: "May", score: 98 },
];

const initialReportLogs = [
  { id: "REP-2025-01", name: "Q1 Infrastructure Operations & Maintenance Audit", category: "Quarterly Audit", format: "PDF", size: "4.8 MB", date: "Today, 09:00 AM" },
  { id: "REP-2025-02", name: "Shapoorji Contractor SLA Performance Index", category: "Partner Evaluation", format: "XLSX", size: "1.2 MB", date: "Oct 20, 2024" },
  { id: "REP-2025-03", name: "Convention Hall 1 & 2 Energy Grid Cost Analysis", category: "Financial Audit", format: "PDF", size: "3.1 MB", date: "Oct 10, 2024" },
  { id: "REP-2025-04", name: "NBCC Projects Completion Reconciliation Registry", category: "PMC Reconciliation", format: "CSV", size: "820 KB", date: "Sep 30, 2024" },
];

export default function ReportsAnalyticsPage() {
  const [reportLogs, setReportLogs] = useState(initialReportLogs);
  const [isGenerating, setIsGenerating] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleGenerateReport = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      const newReport = {
        id: `REP-2025-0${reportLogs.length + 1}`,
        name: "Custom Query Operational Summary Report",
        category: "On-Demand Query",
        format: "PDF",
        size: "2.4 MB",
        date: "Just Now",
      };
      setReportLogs([newReport, ...reportLogs]);
    }, 1500);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-20 font-sans selection:bg-indigo-100 p-10 bg-slate-50/50 min-h-screen relative">

      {/* ─── APEX SECRETARIAT REPORTS HEADER ──────────────────────────── */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 relative">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-2 border-indigo-200">
            <FileBarChart2 size={14} className="animate-pulse" /> Analytics Center
          </div>
          <h1 className="text-6xl font-black text-slate-800 tracking-tighter uppercase leading-none">Reports & Analytics</h1>
          <p className="text-slate-500 font-medium text-xl italic underline underline-offset-8 decoration-indigo-200">
            Export contractor metrics, inspect budget adherence audits, and compile situational SITREPs.
          </p>
        </div>
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="h-16 px-8 rounded-3xl border-2 border-indigo-200 font-black uppercase tracking-widest text-[10px] text-indigo-700 bg-white shadow-xl hover:bg-indigo-50 transition-all"
          >
            <History size={20} className="mr-2" /> Global Audit Trail
          </Button>
        </div>
      </div>

      {/* ─── PERFORMANCE SUMMARY TILES ─────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {operationalMetrics.map((item, i) => (
          <div
            key={i}
            className={`group relative p-8 rounded-[32px] overflow-hidden transition-all duration-500 h-44 flex flex-col justify-between shadow-lg bg-gradient-to-br ${item.color} text-white border-none`}
          >
            <div className="absolute inset-0 opacity-90 bg-[url('https://www.transparenttextures.com/patterns/diagonal-striped-brick.png')]" />
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
                  <p className="text-[9px] font-medium opacity-75 uppercase tracking-wider leading-none">{item.subtitle}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ─── MAIN TWO-COLUMN SPLIT ────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT: ON-DEMAND COMPILER (1/3) */}
        <Card className="rounded-[40px] border-none shadow-xl bg-white overflow-hidden flex flex-col group p-0">
          <div className="p-8 bg-gradient-to-r from-slate-800 via-slate-950 to-indigo-950 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            <div className="relative z-10">
              <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-4">
                <Filter size={18} className="text-white" />
              </div>
              <h3 className="text-[12px] font-black uppercase tracking-[0.2em]">On-Demand Compiler</h3>
              <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest mt-1">Configure Situational Audit Report</p>
            </div>
          </div>

          <form onSubmit={handleGenerateReport} className="flex-1 flex flex-col justify-between">
            <CardContent className="p-8 space-y-6 bg-slate-50/30 flex-1 relative">
              <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
              <div className="relative z-10 space-y-6">
                
                <div className="space-y-1.5 font-sans">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Target PMC Partner</label>
                  <select className="w-full h-14 px-5 rounded-2xl border-2 border-slate-100 bg-white text-[11px] font-black uppercase tracking-widest outline-none focus:border-indigo-500 transition-all">
                    <option>All Partners (NBCC & SPCL)</option>
                    <option>NBCC (PMC Direct)</option>
                    <option>Shapoorji Pallonji (Contractor)</option>
                  </select>
                </div>

                <div className="space-y-1.5 font-sans">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Audit scope</label>
                  <select className="w-full h-14 px-5 rounded-2xl border-2 border-slate-100 bg-white text-[11px] font-black uppercase tracking-widest outline-none focus:border-indigo-500 transition-all">
                    <option>All Project Categories</option>
                    <option>General Civil Works</option>
                    <option>Energy & Grid Utility</option>
                    <option>HVAC / Mechanical</option>
                  </select>
                </div>

                <div className="p-6 bg-indigo-50/50 rounded-3xl border-2 border-indigo-100/50">
                  <div className="flex justify-between items-center mb-4 text-[9px] font-black uppercase tracking-widest text-indigo-700">
                    <span>Performance Trend</span>
                    <TrendingUp size={14} className="h-4 w-4" />
                  </div>
                  <div className="h-24 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={performanceTrend}>
                        <defs>
                          <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </CardContent>

            <div className="p-8 border-t border-slate-100 bg-slate-50/50">
              <Button
                type="submit"
                disabled={isGenerating}
                className="h-16 w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-black uppercase tracking-widest text-[10px] shadow-xl hover:shadow-indigo-200 transition-all gap-2 border-none"
              >
                <RefreshCw className={cn("h-4 w-4", isGenerating && "animate-spin")} />
                {isGenerating ? "Compiling SITREP..." : "Generate Performance Audit"}
              </Button>
            </div>
          </form>
        </Card>

        {/* RIGHT: REPORT LEDGER (2/3) */}
        <Card className="lg:col-span-2 rounded-[48px] border-none shadow-xl overflow-hidden bg-white p-0">
          <CardHeader className="p-0">
            <div className="p-10 bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
                <div className="flex items-center gap-5">
                  <div className="h-14 w-14 rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg">
                    <FileText size={28} className="text-white" />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-2xl font-black uppercase tracking-tight">Audit Repositories</CardTitle>
                    <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">Pre-compiled archives ready for secretariat verification exports</p>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 cursor-pointer hover:bg-white/20 transition-all">
                  <Search size={20} />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="border-b-2 border-slate-100">
                  <TableHead className="px-10 py-6 text-[9px] font-black uppercase tracking-widest text-slate-400">Report Reference</TableHead>
                  <TableHead className="text-[9px] font-black uppercase tracking-widest text-slate-400 text-center">Format</TableHead>
                  <TableHead className="text-[9px] font-black uppercase tracking-widest text-slate-400 text-center">Generated</TableHead>
                  <TableHead className="text-right px-10 text-[9px] font-black uppercase tracking-widest text-slate-400">Export</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-slate-100 bg-white">
                {reportLogs.map((report) => (
                  <TableRow key={report.id} className="hover:bg-indigo-50/30 transition-all group border-none cursor-pointer">
                    <TableCell className="px-10 py-8">
                      <div className="space-y-2">
                        <span className="text-[13px] font-black text-slate-800 uppercase tracking-tight group-hover:text-indigo-600 transition-colors leading-tight block">{report.name}</span>
                        <div className="flex gap-2">
                          <span className="font-mono text-[9px] font-black text-indigo-700 tracking-wider bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md">{report.id}</span>
                          <span className="text-[9px] font-bold text-slate-400 bg-slate-100/50 px-2 py-0.5 rounded-md uppercase tracking-widest">{report.category}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <ITPOFormatBadge format={report.format} />
                      <p className="text-[8px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{report.size}</p>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="inline-flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-tighter">
                        <Calendar size={14} className="text-indigo-500" /> {report.date}
                      </div>
                    </TableCell>
                    <TableCell className="text-right px-10">
                      <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl border-2 border-slate-100 bg-white hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                        <ArrowDownToLine size={18} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="p-8 border-t border-slate-100 bg-slate-50/30 text-center">
              <button className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] hover:text-indigo-600 transition-colors">
                Load Historical Archives
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ─── FOOTER ─────────────────────────────────────────────────── */}
      <div className="flex flex-col items-center gap-4 py-10 opacity-50">
        <div className="h-px w-24 bg-slate-300" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 text-center max-w-xl leading-relaxed">
          Operational records and performance audits are cryptographically signed and align with the India Trade Promotion Organisation (ITPO) Secretariat compliance protocols.
        </p>
      </div>
    </div>
  );
}