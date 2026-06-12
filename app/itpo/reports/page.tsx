"use client";

import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
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
    Download,
    Calendar,
    ArrowDownToLine,
    TrendingDown,
    Zap,
    Award,
    RefreshCw,
    CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Performance Summary Metrics ──────────────────────────────────
const operationalMetrics = [
    {
        title: "Budget Adherence",
        value: "96.8%",
        subtitle: "Variance of -3.2% (Under Budget)",
        icon: TrendingDown,
        variant: "success",
    },
    {
        title: "Avg. Project Velocity",
        value: "14.2 Days",
        subtitle: "Target timeline deviation minimal",
        icon: Zap,
        variant: "default",
    },
    {
        title: "Quality Audit Index",
        value: "98.4%",
        subtitle: "Pass rate on first inspection",
        icon: Award,
        variant: "alert",
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
        <div className="space-y-6 p-10">

            {/* Header Title */}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">System Reports & Analytics</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Export contractor metrics, inspect budget adherence audits, and compile on-demand financial reports.
                </p>
            </div>

            {/* Feedback alert banner */}
            {successBanner && (
                <div className="p-4 rounded-xl border bg-emerald-500/10 border-emerald-500/20 text-emerald-800 dark:text-emerald-400 flex gap-3 items-center animate-in fade-in slide-in-from-top-4 duration-300 text-xs font-semibold">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                    <span>{successBanner}</span>
                </div>
            )}

            {/* Performance Summary Metrics Grid */}
            <div className="grid gap-4 sm:grid-cols-3">
                {operationalMetrics.map((stat) => (
                    <Card
                        key={stat.title}
                        className={cn(
                            "relative overflow-hidden transition-all hover:shadow-sm",
                            stat.variant === "alert" && "border-indigo-500/30",
                            stat.variant === "success" && "border-green-500/30"
                        )}
                    >
                        <CardHeader
                            className={cn(
                                "flex flex-row items-center justify-between py-2 rounded-none space-y-0",
                                stat.variant === "alert"
                                    ? "bg-indigo-500/5"
                                    : stat.variant === "success"
                                        ? "bg-green-500/5"
                                        : "bg-blue-500/5"
                            )}
                        >
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {stat.title}
                            </CardTitle>
                            <div
                                className={cn(
                                    "p-2 rounded-md",
                                    stat.variant === "alert"
                                        ? "bg-indigo-500/10 text-indigo-600"
                                        : stat.variant === "success"
                                            ? "bg-green-500/10 text-green-600"
                                            : "bg-primary/10 text-primary"
                                )}
                            >
                                <stat.icon className="h-4 w-4" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold tracking-tight mt-2">{stat.value}</div>
                            <p className="text-xs text-muted-foreground mt-1">{stat.subtitle}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Interactive Section Split */}
            <div className="grid gap-6 lg:grid-cols-3">

                {/* Left Panel: Query Custom Report form (1/3 Width) */}
                <Card className="col-span-1 border-border">
                    <CardHeader className="border-b border-border bg-muted/20 pb-4">
                        <CardTitle className="text-base font-semibold">On-Demand Compiler</CardTitle>
                        <CardDescription className="text-xs">
                            Query specific contractor parameters to generate custom metrics.
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleGenerateReport}>
                        <CardContent className="p-5 space-y-4">
                            
                            {/* Partner selection */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Target Partner</label>
                                <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs focus:ring-1 focus:ring-primary" required>
                                    <option value="all">All Partners (NBCC & Shapoorji)</option>
                                    <option value="nbcc">NBCC Only</option>
                                    <option value="sp">Shapoorji Pallonji Only</option>
                                </select>
                            </div>

                            {/* Category selection */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Contract Scope</label>
                                <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs focus:ring-1 focus:ring-primary" required>
                                    <option value="all">All Categories</option>
                                    <option value="civil">General Civil</option>
                                    <option value="hvac">Mechanical / HVAC</option>
                                    <option value="electrical">Electrical</option>
                                </select>
                            </div>

                            {/* Date parameters */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Date Parameters</label>
                                <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs focus:ring-1 focus:ring-primary" required>
                                    <option value="30">Last 30 Days</option>
                                    <option value="90">Last 90 Days</option>
                                    <option value="year">Current Fiscal Year</option>
                                </select>
                            </div>

                        </CardContent>
                        <CardFooter className="border-t border-border pt-4 px-5">
                            <Button 
                                type="submit" 
                                disabled={isGenerating} 
                                className="w-full text-xs font-semibold h-9 gap-1.5"
                            >
                                <RefreshCw className={cn("h-3.5 w-3.5", isGenerating && "animate-spin")} />
                                {isGenerating ? "Compiling Report..." : "Generate Performance Report"}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>

                {/* Right Panel: Report Download Table (2/3 Width) */}
                <Card className="lg:col-span-2 border-border">
                    <CardHeader className="border-b border-border bg-muted/20 pb-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-base font-semibold">Available Audit Reports</CardTitle>
                                <CardDescription className="text-xs">
                                    Pre-compiled systems reports ready for verification exports.
                                </CardDescription>
                            </div>
                            <FileBarChart2 className="h-5 w-5 text-muted-foreground/60 shrink-0" />
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/10">
                                    <TableHead className="pl-6 font-semibold">Report Reference</TableHead>
                                    <TableHead className="font-semibold">Format</TableHead>
                                    <TableHead className="font-semibold">Size</TableHead>
                                    <TableHead className="font-semibold">Generated Date</TableHead>
                                    <TableHead className="text-right pr-6 font-semibold">Export</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {reportLogs.map((report) => (
                                    <TableRow key={report.id} className="hover:bg-muted/40 transition-colors">
                                        
                                        {/* Name Detail */}
                                        <TableCell className="pl-6 py-4 max-w-[260px]">
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-xs text-foreground leading-snug line-clamp-1">
                                                    {report.name}
                                                </span>
                                                <span className="text-[10px] text-muted-foreground font-mono mt-0.5">
                                                    {report.id} • {report.category}
                                                </span>
                                            </div>
                                        </TableCell>

                                        {/* Format Badge */}
                                        <TableCell>
                                            <Badge variant="outline" className={cn(
                                                "text-[10px] font-extrabold uppercase px-1.5 py-0 border-border",
                                                report.format === "PDF" && "text-red-600 bg-red-500/5",
                                                report.format === "XLSX" && "text-emerald-600 bg-emerald-500/5",
                                                report.format === "CSV" && "text-blue-600 bg-blue-500/5"
                                            )}>
                                                {report.format}
                                            </Badge>
                                        </TableCell>

                                        {/* File Size */}
                                        <TableCell className="text-muted-foreground text-xs font-medium">
                                            {report.size}
                                        </TableCell>

                                        {/* Generated Date */}
                                        <TableCell className="text-muted-foreground text-xs whitespace-nowrap">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="h-3.5 w-3.5 shrink-0 text-muted-foreground/70" />
                                                <span>{report.date}</span>
                                            </div>
                                        </TableCell>

                                        {/* Download trigger */}
                                        <TableCell className="text-right pr-6 py-4">
                                            <Button 
                                                variant="outline" 
                                                size="sm" 
                                                className="h-8 w-8 p-0 border-border hover:bg-muted"
                                                title={`Download ${report.id}`}
                                            >
                                                <ArrowDownToLine className="h-3.5 w-3.5 text-muted-foreground/80" />
                                            </Button>
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

            </div>

            <div className="text-center text-[10px] text-muted-foreground mt-4">
                Operational records and audit parameters align with the India Trade Promotion Organisation (ITPO) system requirements.
            </div>

        </div>
    );
}