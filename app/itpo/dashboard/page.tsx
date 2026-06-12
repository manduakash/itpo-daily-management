"use client";

import React from "react";
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
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import {
    AlertTriangle,
    CheckCircle2,
    Clock,
    PlusCircle,
    Wrench,
    Camera,
    Building2,
    MessageSquare,
    Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

// ─── Mock Data for ITPO ───────────────────────────────────────
const userStats = [
    {
        title: "Active Contracts",
        value: 12,
        subtitle: "Currently in execution",
        icon: Clock,
        variant: "default",
    },
    {
        title: "Pending Approvals",
        value: 3,
        subtitle: "Estimations & Closures",
        icon: AlertTriangle,
        variant: "alert",
    },
    {
        title: "Closed Contracts",
        value: 28,
        subtitle: "Successfully completed",
        icon: CheckCircle2,
        variant: "success",
    },
];

const activeContracts = [
    {
        id: "CON-2041",
        category: "General Civil",
        description: "Renovation of Convention Hall 3 & 4 Main Stage",
        status: "Work In Progress",
        agency: "Shapoorji (Contractor)",
        progress: 65,
        lastUpdate: "Materials delivered; structure frame completed",
        date: "Today, 10:30 AM",
    },
    {
        id: "CON-2035",
        category: "Plumbing",
        description: "Main Foyer water supply line restructuring",
        status: "Estimation Submitted",
        agency: "NBCC (PMC)",
        progress: 30,
        lastUpdate: "NBCC submitted cost estimation of ₹12,20,000",
        date: "Yesterday, 04:15 PM",
    },
    {
        id: "CON-2022",
        category: "Mechanical/HVAC",
        description: "Central AC chiller unit replacement in Block B",
        status: "Inspection Pending",
        agency: "NBCC & Shapoorji Both",
        progress: 90,
        lastUpdate: "Contractors uploaded site photos for final review",
        date: "Oct 12, 02:00 PM",
    },
];

const recentHistory = [
    { id: "CON-1902", category: "Electrical", date: "Sep 28, 2024", status: "Closed" },
    { id: "CON-1855", category: "General Civil", date: "Aug 15, 2024", status: "Closed" },
    { id: "CON-1720", category: "Plumbing", date: "Jul 02, 2024", status: "Closed" },
];

// ─── Status Badge Helper ────────────────────────────────────────────
function ITPOStatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        "Raised": "bg-slate-500/15 text-slate-700 dark:text-slate-400 border-slate-500/20",
        "Under Review": "bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/20",
        "Estimation Submitted": "bg-purple-500/15 text-purple-700 dark:text-purple-400 border-purple-500/20",
        "Work In Progress": "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/20",
        "Inspection Pending": "bg-indigo-500/15 text-indigo-700 dark:text-indigo-400 border-indigo-500/20",
        "Closed": "bg-green-500/15 text-green-700 dark:text-green-400 border-green-500/20",
    };

    return (
        <Badge variant="outline" className={cn("font-medium whitespace-nowrap", styles[status] || styles["Raised"])}>
            {status}
        </Badge>
    );
}

// ─── ITPO Dashboard Component ─────────────────────────────────────
export default function ITPODashboard() {
    const router = useRouter();

    return (
        <div className="space-y-6">

            {/* ─── Page Header & Quick Actions ────────────────────────── */}
            <div className="bg-white dark:bg-slate-950/50 rounded-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-primary/15 p-6 rounded-2xl border border-primary/10">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-heading">
                            Welcome, ITPO Administrator!
                        </h1>
                        <p className="text-muted-foreground mt-1 flex items-center gap-2">
                            <Building2 className="h-4 w-4" />
                            Bharat Mandapam • Secretariat Admin Panel
                        </p>
                    </div>
                    <Button onClick={() => router.push("/itpo/raise-contract")} size="lg" className="gap-2 shadow-lg hover:-translate-y-0.5 transition-transform">
                        <PlusCircle className="h-5 w-5" />
                        Raise New Contract
                    </Button>
                </div>
            </div>

            {/* ─── KPI Cards ────────────────────────────────────────── */}
            <div className="grid gap-4 sm:grid-cols-3">
                {userStats.map((stat) => (
                    <Card
                        key={stat.title}
                        className={cn(
                            "relative overflow-hidden transition-all hover:shadow-md",
                            stat.variant === "alert" && "border-purple-500/50 shadow-purple-500/10",
                            stat.variant === "success" && "border-green-500/30"
                        )}
                    >
                        <CardHeader
                            className={cn(
                                "flex flex-row items-center justify-between py-2 rounded-none space-y-0",
                                stat.variant === "alert"
                                    ? "bg-purple-500/5"
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
                                        ? "bg-purple-500/10 text-purple-600"
                                        : stat.variant === "success"
                                            ? "bg-green-500/10 text-green-600"
                                            : "bg-primary/10 text-primary"
                                )}
                            >
                                <stat.icon className="h-4 w-4" />
                            </div>
                        </CardHeader>

                        <CardContent>
                            <div className="text-3xl font-bold tracking-tight mt-2">
                                {stat.value}
                            </div>

                            <p className="text-xs text-muted-foreground mt-1">
                                {stat.subtitle}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* ─── Main Content Split ───────────────────────────────── */}
            <div className="grid gap-6 lg:grid-cols-3">

                {/* Active Contracts Tracker (Takes up 2/3) */}
                <Card className="lg:col-span-2">
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-lg font-semibold">
                                    Active Contracts Tracker
                                </CardTitle>
                                <CardDescription>
                                    Live execution progress of ongoing works in Bharat Mandapam
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {activeContracts.map((contract) => (
                            <div key={contract.id} className="p-4 rounded-xl border border-border bg-card/50 hover:bg-muted/50 transition-colors">
                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-mono text-sm font-semibold text-primary">{contract.id}</span>
                                            <ITPOStatusBadge status={contract.status} />
                                        </div>
                                        <h4 className="font-medium text-base text-foreground">{contract.description}</h4>
                                        <span className="text-sm text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1 mt-1">
                                            <Wrench className="h-3 w-3 text-primary" /> {contract.category} 
                                            <span className="text-slate-300 dark:text-slate-700">|</span> 
                                            <span className="font-medium">{contract.agency}</span> 
                                            <span className="text-slate-300 dark:text-slate-700">|</span> 
                                            <span>{contract.date}</span>
                                        </span>
                                    </div>

                                    {/* Action Buttons based on status */}
                                    {contract.status === "Inspection Pending" && (
                                        <Button onClick={() => router.push(`/itpo/approvals/${contract.id}`)} size="sm" variant="default" className="bg-purple-600 hover:bg-purple-700 text-white gap-2">
                                            <Camera className="h-4 w-4" /> Inspect & Close
                                        </Button>
                                    )}
                                    {contract.status === "Estimation Submitted" && (
                                        <Button onClick={() => router.push(`/itpo/approvals/${contract.id}`)} size="sm" variant="default" className="bg-amber-600 hover:bg-amber-700 text-white gap-2">
                                            <Eye className="h-4 w-4" /> Review Estimate
                                        </Button>
                                    )}
                                </div>

                                {/* Live Progress Bar */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[10px] sm:text-xs font-medium text-muted-foreground">
                                        <span>Raised</span>
                                        <span>Review</span>
                                        <span>Estimation</span>
                                        <span>WIP</span>
                                        <span>Inspection</span>
                                    </div>
                                    <Progress value={contract.progress} className="h-2" />
                                    <p className="text-xs text-muted-foreground italic mt-2 flex items-center gap-1.5">
                                        <MessageSquare className="h-3 w-3" />
                                        Latest Action: {contract.lastUpdate}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Right Sidebar Column (Takes up 1/3) */}
                <div className="space-y-6">

                    {/* Action Required Widget */}
                    <Card className="border-purple-500/80 bg-purple-500/10 shadow-none">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base font-semibold flex items-center gap-2 text-purple-700 dark:text-purple-400">
                                <AlertTriangle className="h-4 w-4" /> Action Required
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                                Contract <strong className="text-foreground">CON-2022</strong> (AC Replacement Block B) has been marked as complete by the PMC. Verify work logs to complete closure.
                            </p>
                            <Button onClick={() => router.push("/itpo/approvals")} size="sm" variant="outline" className="w-full border-purple-500/30 hover:bg-purple-500/10 text-purple-700 dark:text-purple-400">
                                Review Execution Details
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Recent History Widget */}
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-base font-semibold">
                                    Recently Closed Works
                                </CardTitle>
                                <Button onClick={() => router.push("/itpo/contracts")} variant="ghost" size="sm" className="h-8 text-xs">
                                    View All
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableBody>
                                    {recentHistory.map((item) => (
                                        <TableRow key={item.id} className="hover:bg-transparent">
                                            <TableCell className="py-3 pl-4">
                                                <div className="font-medium text-sm text-foreground">{item.category}</div>
                                                <div className="text-xs text-muted-foreground font-mono">{item.id}</div>
                                            </TableCell>
                                            <TableCell className="py-3 text-right pr-4">
                                                <div className="text-sm text-muted-foreground mb-1">{item.date}</div>
                                                <ITPOStatusBadge status={item.status} />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    );
}