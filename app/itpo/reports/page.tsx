"use client";

import React, { useState } from "react";
import {
    Card,
    CardContent,
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
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Performance Summary Metrics ──────────────────────────────────
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

// ─── Available Pre-compiled Reports ───────────────────────────────
const initialReportLogs = [
    {
        id: "REP-2025-01",
        name: "Q1 Infrastructure Operations & Maintenance Audit",
        category: "Quarterly Audit",
        format: "PDF",
        size: "4.8 MB",
        date: "Today, 09:00 AM",
    },
    {
        id: "REP-2025-02",
        name: "Shapoorji Contractor SLA Performance Index",
        category: "Partner Evaluation",
        format: "XLSX",
        size: "1.2 MB",
        date: "Oct 20, 2025",
    },
    {
        id: "REP-2025-03",
        name: "Convention Hall 1 & 2 Energy Grid Cost Analysis",
        category: "Financial / Utility",
        format: "PDF",
        size: "3.1 MB",
        date: "Oct 10, 2025",
    },
    {
        id: "REP-2025-04",
        name: "NBCC Projects Completion Reconciliation Registry",
        category: "PMC Reconciliation",
        format: "CSV",
        size: "820 KB",
        date: "Sep 30, 2025",
    },
];

export default function ReportsPage() {
    const [reportLogs, setReportLogs] = useState(initialReportLogs);
    const [isGenerating, setIsGenerating] = useState(false);
    const [successBanner, setSuccessBanner] = useState<string | null>(null);

    // Custom report generation simulation
    const handleGenerateReport = (e: React.FormEvent) => {
        e.preventDefault();
        setIsGenerating(true);
        setSuccessBanner(null);

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
            setSuccessBanner("Success: New on-demand performance report compiled and appended below.");
        }, 1500);
    };

    return (
        <div className="space-y-12 animate-in fade-in duration-1000 pb-20 font-sans selection:bg-indigo-100 p-10">

            {/* APEX SECRETARIAT REPORTS HEADER */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 relative">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-2 border-indigo-200">
                        <FileBarChart2 size={14} className="animate-pulse" /> Analytics Center
                    </div>
                    <h1 className="text-6xl font-black text-slate-800 tracking-tighter uppercase leading-none">Reports & Analytics</h1>
                    <p className="text-slate-500 font-medium text-xl italic underline underline-offset-8 decoration-indigo-200">
                        Export contractor metrics, inspect budget adherence audits, and compile on-demand financial reports.
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

            {/* Feedback alert banner */}
            {successBanner && (
                <div className="p-6 rounded-[24px] border-2 bg-emerald-50 border-emerald-200 text-emerald-800 flex gap-4 items-center animate-in fade-in slide-in-from-top-4 duration-300 text-xs font-black uppercase tracking-wider shadow-sm">
                    <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-600 animate-bounce" />
                    <span>{successBanner}</span>
                </div>
            )}

            {/* B1. PERFORMANCE SUMMARY METRICS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {operationalMetrics.map((item, i) => (
                    <div
                        key={i}
                        className={`group relative text-left p-8 rounded-[32px] overflow-hidden transition-all duration-500 h-44 flex flex-col justify-between shadow-lg hover:shadow-2xl bg-gradient-to-br ${item.color} text-white border-none`}
                    >
                        <div className="absolute inset-0 opacity-90 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/diagonal-striped-brick.png')]" />

                        <div className="relative z-10 flex flex-col justify-between h-full w-full">
                            <div className="flex items-center justify-between">
                                <div className="h-10 w-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                                    <item.icon size={20} className="text-white drop-shadow-md" />
                                </div>
                                {item.alert && (
                                    <div className="h-2.5 w-2.5 rounded-full bg-white animate-ping shadow-[0_0_10px_white]" />
                                )}
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

            {/* B2. INTERACTIVE SECTION SPLIT */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Panel: Query Custom Report Form (1/3 Width) */}
                <Card className="col-span-1 rounded-[40px] border-none shadow-lg bg-white overflow-hidden flex flex-col h-full group hover:shadow-2xl transition-all duration-500">
                    <div className="p-8 bg-gradient-to-r from-slate-800 to-indigo-950 text-white relative overflow-hidden">
                        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                        <div className="relative z-10">
                            <h3 className="text-base font-black uppercase tracking-[0.2em] drop-shadow-sm">On-Demand Compiler</h3>
                            <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest leading-none mt-2">Compile tailored infrastructure operations reports</p>
                        </div>
                    </div>

                    <form onSubmit={handleGenerateReport} className="flex-1 flex flex-col justify-between">
                        <CardContent className="p-8 space-y-6 relative bg-slate-50/30 flex-1">
                            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/topography.png')]" />
                            <div className="relative z-10 space-y-6">

                                {/* Partner selection */}
                                <div className="space-y-1.5">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">Target Partner</label>
                                    <select className="w-full h-12 px-4 rounded-xl border-2 border-slate-200 bg-white text-[10px] font-black uppercase tracking-widest outline-none text-slate-700 focus:border-indigo-400 transition-all cursor-pointer shadow-sm hover:border-slate-300" required>
                                        <option value="all">All Partners (NBCC & Shapoorji)</option>
                                        <option value="nbcc">NBCC Only</option>
                                        <option value="sp">Shapoorji Pallonji Only</option>
                                    </select>
                                </div>

                                {/* Category selection */}
                                <div className="space-y-1.5">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">Contract Scope</label>
                                    <select className="w-full h-12 px-4 rounded-xl border-2 border-slate-200 bg-white text-[10px] font-black uppercase tracking-widest outline-none text-slate-700 focus:border-indigo-400 transition-all cursor-pointer shadow-sm hover:border-slate-300" required>
                                        <option value="all">All Categories</option>
                                        <option value="civil">General Civil</option>
                                        <option value="hvac">Mechanical / HVAC</option>
                                        <option value="electrical">Electrical</option>
                                    </select>
                                </div>

                                {/* Date parameters */}
                                <div className="space-y-1.5">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">Date Parameters</label>
                                    <select className="w-full h-12 px-4 rounded-xl border-2 border-slate-200 bg-white text-[10px] font-black uppercase tracking-widest outline-none text-slate-700 focus:border-indigo-400 transition-all cursor-pointer shadow-sm hover:border-slate-300" required>
                                        <option value="30">Last 30 Days</option>
                                        <option value="90">Last 90 Days</option>
                                        <option value="year">Current Fiscal Year</option>
                                    </select>
                                </div>
                            </div>
                        </CardContent>

                        <div className="p-8 border-t border-slate-100 bg-slate-50/50">
                            <Button
                                type="submit"
                                disabled={isGenerating}
                                className="h-14 w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-black uppercase tracking-widest text-[10px] shadow-lg hover:shadow-indigo-200 transition-all gap-2 group border-none"
                            >
                                <RefreshCw className={cn("h-4 w-4", isGenerating && "animate-spin")} />
                                {isGenerating ? "Compiling Report..." : "Generate Performance Report"}
                            </Button>
                        </div>
                    </form>
                </Card>

                {/* Right Panel: Report Download Table (2/3 Width) */}
                <Card className="lg:col-span-2 rounded-[48px] border-none shadow-xl overflow-hidden bg-white">
                    <div className="p-10 bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900 text-white relative overflow-hidden">
                        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                            <div className="flex items-center gap-5">
                                <div className="h-14 w-14 rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg">
                                    <FileBarChart2 size={28} className="text-white" />
                                </div>
                                <div className="space-y-1">
                                    <CardTitle className="text-2xl font-black uppercase tracking-tight drop-shadow-sm">Available Audit Reports</CardTitle>
                                    <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest leading-none">Pre-compiled system reports ready for verification exports</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-indigo-50/50">
                                <TableRow className="border-b-2 border-indigo-100 font-sans">
                                    <TableHead className="px-10 py-6 text-[9px] font-black uppercase tracking-[0.2em] text-indigo-800">Report Reference</TableHead>
                                    <TableHead className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-800 text-center">Format</TableHead>
                                    <TableHead className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-800 text-center">Size</TableHead>
                                    <TableHead className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-800 text-center">Generated Date</TableHead>
                                    <TableHead className="text-right px-10 text-[9px] font-black uppercase tracking-[0.2em] text-indigo-800">Export</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="divide-y divide-indigo-50 font-sans bg-white">
                                {reportLogs.map((report) => (
                                    <TableRow key={report.id} className="border-none hover:bg-indigo-50/50 transition-all group cursor-pointer">

                                        {/* Name Detail */}
                                        <TableCell className="px-10 py-6 max-w-[320px]">
                                            <div className="flex flex-col gap-1.5">
                                                <span className="text-xs font-black text-slate-800 uppercase tracking-tight leading-snug line-clamp-1">
                                                    {report.name}
                                                </span>
                                                <div className="flex gap-2">
                                                    <Badge variant="outline" className="border-2 text-[8px] font-black uppercase tracking-widest px-2.5 py-0.5 border-indigo-100 text-indigo-700 bg-indigo-50/50">
                                                        {report.id}
                                                    </Badge>
                                                    <Badge variant="outline" className="border-2 text-[8px] font-black uppercase tracking-widest px-2.5 py-0.5 border-slate-200 text-slate-500 bg-slate-50">
                                                        {report.category}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </TableCell>

                                        {/* Format Badge */}
                                        <TableCell className="text-center">
                                            <Badge className={cn(
                                                "border-none text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full",
                                                report.format === "PDF" && "bg-rose-100 text-rose-700",
                                                report.format === "XLSX" && "bg-emerald-100 text-emerald-700",
                                                report.format === "CSV" && "bg-blue-100 text-blue-700"
                                            )}>
                                                {report.format}
                                            </Badge>
                                        </TableCell>

                                        {/* File Size */}
                                        <TableCell className="text-center">
                                            <span className="font-mono font-bold text-[11px] px-3 py-1.5 rounded-lg border shadow-inner bg-slate-50 text-slate-700 border-slate-100">
                                                {report.size}
                                            </span>
                                        </TableCell>

                                        {/* Generated Date */}
                                        <TableCell className="text-center">
                                            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-tight">
                                                <Calendar className="h-3.5 w-3.5 shrink-0 text-indigo-500" />
                                                <span>{report.date}</span>
                                            </div>
                                        </TableCell>

                                        {/* Download trigger */}
                                        <TableCell className="text-right px-10 py-6">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-10 w-10 p-0 rounded-xl border-2 border-slate-200 text-slate-700 bg-white hover:bg-slate-50 transition-all shadow-sm"
                                                title={`Download ${report.id}`}
                                            >
                                                <ArrowDownToLine size={16} />
                                            </Button>
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

            </div>

            {/* FOOTER */}
            <div className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Operational records and audit parameters align with the India Trade Promotion Organisation (ITPO) system requirements.
            </div>

        </div>
    );
}