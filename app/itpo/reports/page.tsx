"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
  Building2,
  Filter,
  ArrowUpRight,
  Download
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Performance Summary Metrics (Strict Premium Pastel Palette) ─────
const operationalMetrics = [
  {
    title: "Budget Adherence",
    value: "96.8%",
    subtitle: "Variance of -3.2% (Under Budget)",
    icon: TrendingDown,
    color: "bg-[#CDEAC0] border-[#BDE0A8]/60 text-slate-900",
    textMuted: "text-emerald-900/70"
  },
  {
    title: "Avg. Project Velocity",
    value: "14.2 Days",
    subtitle: "Target timeline deviation minimal",
    icon: Zap,
    color: "bg-[#AFCBFF] border-[#B8C0FF]/60 text-slate-900",
    textMuted: "text-blue-900/70"
  },
  {
    title: "Quality Audit Index",
    value: "98.4%",
    subtitle: "Pass rate on first inspection",
    icon: Award,
    color: "bg-[#E4C1F9] border-[#CBC0D3]/60 text-slate-900",
    textMuted: "text-purple-900/70",
    alert: true,
  },
];

// ─── Available Pre-compiled Reports ───────────────────────────────
const INITIAL_REPORT_LOGS = [
  {
    id: "REP-2025-01",
    name: "Q1 Infrastructure Operations & Maintenance Audit",
    category: "Quarterly Audit",
    format: "PDF",
    size: "4.8 MB",
    date: "2025-10-25",
  },
  {
    id: "REP-2025-02",
    name: "Shapoorji Contractor SLA Performance Index",
    category: "Partner Evaluation",
    format: "XLSX",
    size: "1.2 MB",
    date: "2025-10-20",
  },
  {
    id: "REP-2025-03",
    name: "Convention Hall 1 & 2 Energy Grid Cost Analysis",
    category: "Financial / Utility",
    format: "PDF",
    size: "3.1 MB",
    date: "2025-10-10",
  },
  {
    id: "REP-2025-04",
    name: "NBCC Projects Completion Reconciliation Registry",
    category: "PMC Reconciliation",
    format: "CSV",
    size: "820 KB",
    date: "2025-09-30",
  },
];

export default function ReportsPage() {
  const router = useRouter();
  const [reportLogs, setReportLogs] = useState(INITIAL_REPORT_LOGS);
  const [isGenerating, setIsGenerating] = useState(false);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  // Form selections states
  const [targetPartner, setTargetPartner] = useState("all");
  const [contractScope, setContractScope] = useState("all");
  const [dateParam, setDateParam] = useState("30");

  // Custom report generation simulation
  const handleGenerateReport = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setSuccessBanner(null);

    setTimeout(() => {
      setIsGenerating(false);
      const formattedPartner = targetPartner === "all" ? "Aggregate" : targetPartner.toUpperCase();
      const formattedScope = contractScope === "all" ? "Comprehensive" : contractScope.charAt(0).toUpperCase() + contractScope.slice(1);
      
      const newReport = {
        id: `REP-2025-0${reportLogs.length + 1}`,
        name: `Custom Query ${formattedPartner} ${formattedScope} Performance Report`,
        category: "On-Demand Query",
        format: "PDF",
        size: "2.4 MB",
        date: new Date().toISOString().split("T")[0],
      };
      setReportLogs([newReport, ...reportLogs]);
      setSuccessBanner("Operational performance report compiled and appended to the registry ledger below.");
    }, 1500);
  };

  const handleDownload = (id: string) => {
    setSuccessBanner(`Downloading document payload package for ${id}...`);
    setTimeout(() => {
      setSuccessBanner(null);
    }, 3000);
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
            <span>Analytics Center</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Reports & Analytics</h1>
          <p className="text-xs text-slate-500">
            Export partner metrics, inspect budget adherence audits, and compile on-demand financial performance summaries.
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/itpo")}
            className="h-9 px-3 rounded-lg border border-slate-200 text-xs font-semibold hover:bg-slate-100 transition-all gap-1.5"
          >
            <History size={13} className="text-slate-500" />
            Operations Console
          </Button>
        </div>
      </div>

      {/* Feedback Alert Banner */}
      {successBanner && (
        <div className="relative z-20 p-3 rounded-lg border border-[#BDE0A8] bg-[#CDEAC0]/20 text-slate-950 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 size={14} className="text-emerald-800 shrink-0 animate-bounce" />
          <span>{successBanner}</span>
        </div>
      )}

      {/* --- B1. PERFORMANCE SUMMARY METRICS --- */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
        {operationalMetrics.map((item, i) => {
          const IconComponent = item.icon;
          return (
            <div
              key={i}
              className={cn(
                "relative text-left p-4 rounded-xl border flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-[1px] transition-all duration-200",
                item.color
              )}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-800">{item.title}</span>
                <div className="h-7 w-7 rounded-lg bg-white/40 border border-white/60 flex items-center justify-center">
                  <IconComponent size={14} className="text-slate-800" />
                </div>
              </div>
              <div className="mt-3">
                <p className="text-xl font-bold tracking-tight text-slate-900">{item.value}</p>
                <p className={cn("text-[10px] font-medium", item.textMuted)}>{item.subtitle}</p>
              </div>
              {item.alert && (
                <span className="absolute top-2 right-2 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
              )}
            </div>
          );
        })}
      </section>

      {/* --- B2. INTERACTIVE SECTION SPLIT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 relative z-10 items-start">

        {/* Left Panel: Query Custom Report Form (4/12 columns) */}
        <Card className="col-span-12 lg:col-span-4 rounded-xl border border-slate-200 shadow-sm bg-white overflow-hidden flex flex-col">
          <CardHeader className="p-4 border-b border-slate-200 bg-slate-50/50">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-[#AFCBFF]/40 border border-[#B8C0FF]/60 flex items-center justify-center shrink-0">
                <Filter size={12} className="text-slate-800" />
              </div>
              <div>
                <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-800">On-Demand Compiler</CardTitle>
                <CardDescription className="text-[10px] text-slate-500">Compile custom performance and SLA index records.</CardDescription>
              </div>
            </div>
          </CardHeader>

          <form onSubmit={handleGenerateReport}>
            <CardContent className="p-4 space-y-4">
              
              {/* Partner Selection */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-600">Target Partner Node</label>
                <select 
                  value={targetPartner}
                  onChange={(e) => setTargetPartner(e.target.value)}
                  className="h-10 px-2 border border-slate-300 bg-white rounded-lg text-xs font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-slate-100"
                  required
                >
                  <option value="all">All Partners (NBCC & Shapoorji)</option>
                  <option value="nbcc">NBCC Only</option>
                  <option value="sp">Shapoorji Pallonji Only</option>
                </select>
              </div>

              {/* Category Selection */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-600">Contract Scope Scope</label>
                <select 
                  value={contractScope}
                  onChange={(e) => setContractScope(e.target.value)}
                  className="h-10 px-2 border border-slate-300 bg-white rounded-lg text-xs font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-slate-100"
                  required
                >
                  <option value="all">All Categories</option>
                  <option value="civil">General Civil</option>
                  <option value="hvac">Mechanical / HVAC</option>
                  <option value="electrical">Electrical</option>
                </select>
              </div>

              {/* Date parameters */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-600">Audit Scope Limit</label>
                <select 
                  value={dateParam}
                  onChange={(e) => setDateParam(e.target.value)}
                  className="h-10 px-2 border border-slate-300 bg-white rounded-lg text-xs font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-slate-100"
                  required
                >
                  <option value="30">Last 30 Days</option>
                  <option value="90">Last 90 Days</option>
                  <option value="year">Current Fiscal Year</option>
                </select>
              </div>

            </CardContent>

            <div className="p-4 border-t border-slate-200 bg-slate-50/50">
              <Button
                type="submit"
                disabled={isGenerating}
                className="h-10 w-full rounded-lg bg-slate-900 text-white hover:bg-slate-850 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all hover:-translate-y-[1px]"
              >
                <RefreshCw className={cn("h-3.5 w-3.5", isGenerating && "animate-spin")} />
                {isGenerating ? "Compiling Query..." : "Compile Operational Report"}
              </Button>
            </div>
          </form>
        </Card>

        {/* Right Panel: Report Download Table (8/12 columns) */}
        <Card className="col-span-12 lg:col-span-8 rounded-xl border border-slate-200 shadow-sm overflow-hidden bg-white">
          <CardHeader className="p-4 border-b border-slate-200 bg-slate-50/50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold text-slate-800">Pre-compiled Audit Records</CardTitle>
                <CardDescription className="text-xs text-slate-500">
                  Pre-compiled monthly and on-demand documents prepared for formal audits.
                </CardDescription>
              </div>
              <Badge variant="outline" className="text-[10px] font-semibold bg-white border-slate-300 text-slate-700 rounded-md">
                {reportLogs.length} Documents Available
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/30">
                    <TableHead className="pl-4 h-10 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Report Reference File</TableHead>
                    <TableHead className="h-10 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-center">Format</TableHead>
                    <TableHead className="h-10 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-center">Size</TableHead>
                    <TableHead className="h-10 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-center">Generated Date</TableHead>
                    <TableHead className="pr-4 h-10 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-right">Export</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportLogs.map((report) => (
                    <TableRow key={report.id} className="h-12 border-b border-slate-200 hover:bg-slate-50/70 transition-colors">

                      {/* File details */}
                      <TableCell className="pl-4 max-w-[280px]">
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-slate-900 leading-snug truncate" title={report.name}>
                            {report.name}
                          </span>
                          <div className="flex gap-1.5 mt-0.5">
                            <span className="font-mono text-[9px] font-bold text-slate-700 bg-slate-100 border border-slate-200 px-1 rounded">
                              {report.id}
                            </span>
                            <span className="text-[9px] text-slate-400 font-semibold uppercase">
                              {report.category}
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      {/* Format indicators */}
                      <TableCell className="text-center">
                        <Badge variant="outline" className={cn(
                          "text-[9px] font-bold uppercase px-2 py-0.5 rounded-full border-none",
                          report.format === "PDF" && "bg-[#FFB4A2]/30 text-[#7a1a10]",
                          report.format === "XLSX" && "bg-[#CDEAC0]/30 text-[#2a4e21]",
                          report.format === "CSV" && "bg-[#AFCBFF]/30 text-[#1a3e5a]"
                        )}>
                          {report.format}
                        </Badge>
                      </TableCell>

                      {/* File sizes */}
                      <TableCell className="text-center">
                        <span className="font-mono text-xs text-slate-800">
                          {report.size}
                        </span>
                      </TableCell>

                      {/* Generated Target Dates */}
                      <TableCell className="text-center">
                        <div className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
                          <Calendar size={12} className="text-slate-400 shrink-0" />
                          <span>{report.date}</span>
                        </div>
                      </TableCell>

                      {/* Action trigger triggers */}
                      <TableCell className="pr-4 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownload(report.id)}
                          className="h-8 w-8 p-0 rounded-lg border border-slate-300 hover:border-slate-400 hover:bg-slate-100 text-slate-700 transition-all"
                          title={`Download ${report.id}`}
                        >
                          <Download size={13} />
                        </Button>
                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* --- FOOTER COMPREHENSIVE --- */}
      <footer className="pt-4 border-t border-slate-200 text-center text-[10px] text-slate-400 font-medium">
        <span>Audited Ledger Logs • Compiled under National Secretariat compliance procedures</span>
      </footer>

    </div>
  );
}