"use client";

import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
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
    CheckCircle2,
    RotateCcw,
    Info,
    XCircle,
    Check,
    X,
    FileText,
    Calculator,
    Camera,
    Building2,
    Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Initial Pending Approvals Mock Data ──────────────────────────
const initialApprovals = [
    {
        id: "CON-2035",
        title: "Main Foyer Restructuring & Plumbing",
        category: "Plumbing",
        agency: "NBCC (PMC)",
        type: "Estimation", // Estimation Approval
        estimation: "₹12,20,000",
        date: "Oct 24, 04:15 PM",
    },
    {
        id: "CON-2022",
        title: "Central AC Chiller Unit Replacement",
        category: "Mechanical/HVAC",
        agency: "NBCC & Shapoorji Both",
        type: "Inspection", // Work Inspection Approval
        estimation: "₹85,00,000",
        date: "Oct 12, 02:00 PM",
    },
    {
        id: "CON-2045",
        title: "Sanding & Polishing of VIP Lounge Floor",
        category: "General Civil",
        agency: "Shapoorji (Contractor)",
        type: "Estimation",
        estimation: "₹6,50,000",
        date: "Oct 15, 09:30 AM",
    },
];

export default function PendingApprovalsPage() {
    const [approvals, setApprovals] = useState(initialApprovals);
    const [systemNotification, setSystemNotification] = useState<{
        message: string;
        type: "success" | "info" | "error";
    } | null>(null);

    // Dynamic Action handlers
    const handleApprove = (id: string) => {
        const item = approvals.find((a) => a.id === id);
        if (!item) return;

        setApprovals(approvals.filter((a) => a.id !== id));
        setSystemNotification({
            message: `APPROVED: ${item.id} has been finalized. Partner nodes have been dispatched financial clearance.`,
            type: "success"
        });
    };

    const handleRequestRevision = (id: string) => {
        const item = approvals.find((a) => a.id === id);
        if (!item) return;

        setApprovals(approvals.filter((a) => a.id !== id));
        setSystemNotification({
            message: `REVISION REQUESTED: ${item.id} returned to partner agency queue for adjustments.`,
            type: "info"
        });
    };

    const handleReject = (id: string) => {
        const item = approvals.find((a) => a.id === id);
        if (!item) return;

        setApprovals(approvals.filter((a) => a.id !== id));
        setSystemNotification({
            message: `REJECTED: ${item.id} has been permanently declined and locked in the registry.`,
            type: "error"
        });
    };

    const handleResetSandbox = () => {
        setApprovals(initialApprovals);
        setSystemNotification(null);
    };

    return (
        <div className="space-y-6 p-10">

            {/* Header section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Pending Approvals Queue</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Consolidated directory of estimations and inspections requiring central ITPO authorization.
                    </p>
                </div>
                {approvals.length < initialApprovals.length && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleResetSandbox}
                        className="gap-2 border-dashed border-border shrink-0"
                    >
                        <RotateCcw className="h-4 w-4" />
                        Reset Simulation Data
                    </Button>
                )}
            </div>

            {/* Notification Banner */}
            {systemNotification && (
                <div
                    className={cn(
                        "p-4 rounded-xl border flex gap-3 items-start animate-in fade-in slide-in-from-top-4 duration-300",
                        systemNotification.type === "success" && "bg-emerald-500/10 border-emerald-500/20 text-emerald-800 dark:text-emerald-400",
                        systemNotification.type === "info" && "bg-blue-500/10 border-blue-500/20 text-blue-800 dark:text-blue-400",
                        systemNotification.type === "error" && "bg-rose-500/10 border-rose-500/20 text-rose-800 dark:text-rose-400"
                    )}
                >
                    {systemNotification.type === "success" && <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />}
                    {systemNotification.type === "info" && <Info className="h-5 w-5 shrink-0 text-blue-600 mt-0.5" />}
                    {systemNotification.type === "error" && <XCircle className="h-5 w-5 shrink-0 text-rose-600 mt-0.5" />}

                    <div className="text-xs font-semibold leading-relaxed">
                        {systemNotification.message}
                    </div>
                </div>
            )}

            {/* Table Layout */}
            <Card className="border-border">
                <CardHeader className="pb-3 border-b border-border bg-muted/20">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-base font-semibold">Active Action Registry</CardTitle>
                            <CardDescription className="text-xs">
                                High-density desk control for approving partner deliverables.
                            </CardDescription>
                        </div>
                        <Badge variant="outline" className="font-semibold px-2.5 py-0.5">
                            {approvals.length} Pending Actions
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    {approvals.length === 0 ? (
                        <div className="py-12 text-center text-muted-foreground space-y-2">
                            <Check className="h-8 w-8 text-emerald-500 mx-auto" />
                            <p className="text-sm font-semibold text-foreground">All Approvals Cleared</p>
                            <p className="text-xs max-w-xs mx-auto">There are no outstanding work tasks or estimations requiring clearance.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/10">
                                        <TableHead className="w-[110px] pl-6 font-semibold">ID</TableHead>
                                        <TableHead className="font-semibold">Workflow Task</TableHead>
                                        <TableHead className="font-semibold">Review Category</TableHead>
                                        <TableHead className="font-semibold">Assigned Partner</TableHead>
                                        <TableHead className="font-semibold">Est. Budget</TableHead>
                                        <TableHead className="font-semibold">Submitted Date</TableHead>
                                        <TableHead className="text-right pr-6 font-semibold">Verification Operations</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {approvals.map((item) => (
                                        <TableRow key={item.id} className="hover:bg-muted/40 transition-colors">

                                            {/* ID Column */}
                                            <TableCell className="font-mono font-bold text-primary pl-6 py-4">
                                                {item.id}
                                            </TableCell>

                                            {/* Workflow Task Title */}
                                            <TableCell className="max-w-[240px]">
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-sm text-foreground leading-snug">{item.title}</span>
                                                    <span className="text-[10px] text-muted-foreground mt-0.5">{item.category}</span>
                                                </div>
                                            </TableCell>

                                            {/* Review Category Type Badge */}
                                            <TableCell>
                                                {item.type === "Estimation" ? (
                                                    <Badge variant="outline" className="text-purple-700 bg-purple-500/15 border-purple-500/25 font-semibold text-[10px] uppercase px-2.5 py-0.5 gap-1 shrink-0">
                                                        <Calculator className="h-3 w-3 shrink-0" />
                                                        <span>Est. Clearance</span>
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="outline" className="text-indigo-700 bg-indigo-500/15 border-indigo-500/25 font-semibold text-[10px] uppercase px-2.5 py-0.5 gap-1 shrink-0">
                                                        <Camera className="h-3 w-3 shrink-0" />
                                                        <span>Site Inspection</span>
                                                    </Badge>
                                                )}
                                            </TableCell>

                                            {/* Partner Agency */}
                                            <TableCell className="text-muted-foreground text-xs font-medium">
                                                <div className="flex items-center gap-1.5">
                                                    <Building2 className="h-3.5 w-3.5 shrink-0 text-muted-foreground/70" />
                                                    <span>{item.agency}</span>
                                                </div>
                                            </TableCell>

                                            {/* Cost Column */}
                                            <TableCell className="font-bold text-foreground text-xs">
                                                {item.estimation}
                                            </TableCell>

                                            {/* Deadline/Date */}
                                            <TableCell className="text-muted-foreground text-xs whitespace-nowrap">
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="h-3.5 w-3.5 shrink-0 text-muted-foreground/70" />
                                                    <span>{item.date}</span>
                                                </div>
                                            </TableCell>

                                            {/* Inline Action Row Buttons */}
                                            <TableCell className="text-right pr-6 py-4">
                                                <div className="inline-flex items-center gap-1.5">

                                                    {/* Reject Action Button */}
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleReject(item.id)}
                                                        className="h-8 w-8 p-0 border-red-500/20 text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/20"
                                                        title="Reject Request"
                                                    >
                                                        <X className="h-3.5 w-3.5" />
                                                    </Button>

                                                    {/* Revision Action Button */}
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleRequestRevision(item.id)}
                                                        className="h-8 px-2 text-xs border-amber-500/25 text-amber-600 hover:bg-amber-50 hover:text-amber-700 dark:hover:bg-amber-950/20"
                                                        title="Request Revision"
                                                    >
                                                        Revision
                                                    </Button>

                                                    {/* Approve Action Button */}
                                                    <Button
                                                        variant="default"
                                                        size="sm"
                                                        onClick={() => handleApprove(item.id)}
                                                        className="h-8 px-2.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white gap-1 font-semibold"
                                                    >
                                                        <Check className="h-3 w-3" /> Approve
                                                    </Button>

                                                </div>
                                            </TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>

            <div className="text-center text-[10px] text-muted-foreground mt-4">
                All digital transactions are logged and structured under India Trade Promotion Organisation (ITPO) protocols.
            </div>

        </div>
    );
}