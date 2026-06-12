"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    Search,
    SlidersHorizontal,
    PlusCircle,
    Building2,
    Calendar,
    ArrowUpRight,
    Briefcase,
    CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Extended Mock Data for Contracts ───────────────────────────
const allContracts = [
    {
        id: "CON-2041",
        title: "Convention Hall 3 & 4 Renovation",
        category: "General Civil",
        agency: "Shapoorji (Contractor)",
        status: "Work In Progress",
        priority: "High",
        estimation: "₹45,50,000",
        deadline: "Nov 30, 2025",
    },
    {
        id: "CON-2035",
        title: "Main Foyer Restructuring & Plumbing",
        category: "Plumbing",
        agency: "NBCC (PMC)",
        status: "Estimation Submitted",
        priority: "Medium",
        estimation: "₹12,20,000",
        deadline: "Dec 15, 2025",
    },
    {
        id: "CON-2022",
        title: "Central AC Chiller Unit Replacement",
        category: "Mechanical/HVAC",
        agency: "NBCC & Shapoorji Both",
        status: "Inspection Pending",
        priority: "Critical",
        estimation: "₹85,00,000",
        deadline: "Nov 10, 2025",
    },
    {
        id: "CON-1980",
        title: "Substation Transformers Calibration",
        category: "Electrical Operations",
        agency: "NBCC (PMC)",
        status: "Approved",
        priority: "High",
        estimation: "₹24,00,000",
        deadline: "Jan 10, 2026",
    },
    {
        id: "CON-1902",
        title: "Administrative Office Rewiring",
        category: "Electrical Operations",
        agency: "Shapoorji (Contractor)",
        status: "Closed",
        priority: "Low",
        estimation: "₹8,50,000",
        deadline: "Sep 28, 2024",
    },
    {
        id: "CON-1855",
        title: "Open Plaza Granite Re-laying",
        category: "General Civil",
        agency: "Shapoorji (Contractor)",
        status: "Closed",
        priority: "Medium",
        estimation: "₹18,00,000",
        deadline: "Aug 15, 2024",
    },
];

// ─── Status Badge Helper ────────────────────────────────────────────
function ITPOStatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        "Raised": "bg-slate-500/15 text-slate-700 dark:text-slate-400 border-slate-500/20",
        "Under Review": "bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/20",
        "Estimation Submitted": "bg-purple-500/15 text-purple-700 dark:text-purple-400 border-purple-500/20",
        "Approved": "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
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

// ─── Priority Badge Helper ──────────────────────────────────────────
function PriorityBadge({ priority }: { priority: string }) {
    const styles: Record<string, string> = {
        "Low": "text-slate-600 bg-slate-500/5 border-slate-500/10",
        "Medium": "text-blue-600 bg-blue-500/5 border-blue-500/10",
        "High": "text-amber-600 bg-amber-500/5 border-amber-500/10",
        "Critical": "text-rose-600 bg-rose-500/5 border-rose-500/10",
    };

    return (
        <Badge variant="outline" className={cn("text-[10px] font-semibold tracking-wide uppercase px-2 py-0", styles[priority] || styles["Low"])}>
            {priority}
        </Badge>
    );
}

// ─── All Contracts Page ─────────────────────────────────────────────
export default function AllContractsPage() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedStatus, setSelectedStatus] = useState("all");

    // Filtering logic
    const filteredContracts = allContracts.filter((contract) => {
        const matchesSearch =
            contract.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contract.agency.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = selectedCategory === "all" || contract.category.toLowerCase().includes(selectedCategory.toLowerCase());
        const matchesStatus = selectedStatus === "all" || contract.status === selectedStatus;

        return matchesSearch && matchesCategory && matchesStatus;
    });

    return (
        <div className="space-y-6 p-10">

            {/* Header Area */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Contract Registry</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Historical and active listings of delegated infrastructure works in Bharat Mandapam.
                    </p>
                </div>
                <Button
                    onClick={() => router.push("/itpo/raise-contract")}
                    className="gap-2 shrink-0 shadow-sm"
                >
                    <PlusCircle className="h-4 w-4" />
                    Raise New Contract
                </Button>
            </div>

            {/* Filtering Control Bar Card */}
            <Card className="border-border/60">
                <CardContent className="p-4 flex flex-col md:flex-row gap-3 items-center justify-between">

                    {/* Search Field */}
                    <div className="relative w-full md:max-w-xs">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground/70" />
                        <Input
                            type="text"
                            placeholder="Search by ID, title, or agency..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 h-9 text-xs focus-visible:ring-primary"
                        />
                    </div>

                    {/* Select Dropdown Filters */}
                    <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto items-stretch sm:items-center">
                        <div className="flex items-center gap-2">
                            <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Filters:</span>
                        </div>

                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="rounded-md border border-input bg-background px-2 py-1 text-xs outline-none h-9 focus:ring-1 focus:ring-ring"
                        >
                            <option value="all">All Categories</option>
                            <option value="civil">General Civil</option>
                            <option value="plumbing">Plumbing</option>
                            <option value="mechanical">Mechanical / HVAC</option>
                            <option value="electrical">Electrical Operations</option>
                        </select>

                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="rounded-md border border-input bg-background px-2 py-1 text-xs outline-none h-9 focus:ring-1 focus:ring-ring"
                        >
                            <option value="all">All Statuses</option>
                            <option value="Raised">Raised</option>
                            <option value="Estimation Submitted">Estimation Submitted</option>
                            <option value="Approved">Approved</option>
                            <option value="Work In Progress">Work In Progress</option>
                            <option value="Inspection Pending">Inspection Pending</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>

                </CardContent>
            </Card>

            {/* Main Table Card container */}
            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/30">
                                <TableHead className="w-[100px] pl-6">ID</TableHead>
                                <TableHead>Title & Category</TableHead>
                                <TableHead>Assigned Partner</TableHead>
                                <TableHead>Priority</TableHead>
                                <TableHead>Est. Value</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Deadline</TableHead>
                                <TableHead className="text-right pr-6">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredContracts.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                                        No contracts match the selected search criteria.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredContracts.map((contract) => (
                                    <TableRow key={contract.id} className="hover:bg-muted/40 transition-colors">

                                        {/* ID Column */}
                                        <TableCell className="font-mono font-bold text-primary pl-6 py-4">
                                            {contract.id}
                                        </TableCell>

                                        {/* Title Column */}
                                        <TableCell className="max-w-[220px]">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-sm text-foreground line-clamp-1">{contract.title}</span>
                                                <span className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1">
                                                    <Briefcase className="h-3 w-3" /> {contract.category}
                                                </span>
                                            </div>
                                        </TableCell>

                                        {/* Partner Agency Column */}
                                        <TableCell className="text-muted-foreground text-xs font-medium">
                                            <div className="flex items-center gap-1.5">
                                                <Building2 className="h-3.5 w-3.5 shrink-0 text-muted-foreground/70" />
                                                <span>{contract.agency}</span>
                                            </div>
                                        </TableCell>

                                        {/* Priority Column */}
                                        <TableCell>
                                            <PriorityBadge priority={contract.priority} />
                                        </TableCell>

                                        {/* Estimation Value Column */}
                                        <TableCell className="font-semibold text-foreground text-xs">
                                            {contract.estimation}
                                        </TableCell>

                                        {/* Status Column */}
                                        <TableCell>
                                            <ITPOStatusBadge status={contract.status} />
                                        </TableCell>

                                        {/* Target Date Column */}
                                        <TableCell className="text-muted-foreground text-xs whitespace-nowrap">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="h-3.5 w-3.5 shrink-0 text-muted-foreground/70" />
                                                <span>{contract.deadline}</span>
                                            </div>
                                        </TableCell>

                                        {/* Actions Button */}
                                        <TableCell className="text-right pr-6">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-8 gap-1 text-xs border-border/80 hover:bg-muted"
                                                onClick={() => router.push(`/itpo/approvals/${contract.id}`)}
                                            >
                                                <span>Review</span>
                                                <ArrowUpRight className="h-3 w-3" />
                                            </Button>
                                        </TableCell>

                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Summary details */}
            <div className="flex justify-between items-center text-xs text-muted-foreground px-1">
                <span>Showing {filteredContracts.length} of {allContracts.length} records</span>
                <span className="font-semibold">ITPO Secretariat Central Terminal</span>
            </div>

        </div>
    );
}