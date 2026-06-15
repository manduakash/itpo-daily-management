"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
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
    Search,
    SlidersHorizontal,
    PlusCircle,
    Building2,
    Calendar,
    ArrowUpRight,
    Briefcase,
    History,
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
        "Raised": "bg-slate-100 text-slate-700 border-slate-200",
        "Under Review": "bg-blue-100 text-blue-700 border-blue-200",
        "Estimation Submitted": "bg-purple-100 text-purple-700 border-purple-200",
        "Approved": "bg-emerald-100 text-emerald-700 border-emerald-200",
        "Work In Progress": "bg-amber-100 text-amber-700 border-amber-200",
        "Inspection Pending": "bg-indigo-100 text-indigo-700 border-indigo-200",
        "Closed": "bg-green-100 text-green-700 border-green-200",
    };

    return (
        <Badge variant="outline" className={cn("text-[8px] font-black uppercase tracking-widest px-2.5 py-0.5 border-2 rounded-full", styles[status] || styles["Raised"])}>
            {status}
        </Badge>
    );
}

// ─── Priority Badge Helper ──────────────────────────────────────────
function PriorityBadge({ priority }: { priority: string }) {
    const styles: Record<string, string> = {
        "Low": "bg-slate-50 text-slate-500 border-slate-200",
        "Medium": "bg-blue-50 text-blue-600 border-blue-200",
        "High": "bg-amber-50 text-amber-600 border-amber-200",
        "Critical": "bg-red-500 text-white border-red-600 font-extrabold animate-pulse",
    };

    return (
        <Badge variant="outline" className={cn("text-[8px] font-black uppercase tracking-widest px-2.5 py-0.5 border-2 rounded-full", styles[priority] || styles["Low"])}>
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
        <div className="space-y-12 animate-in fade-in duration-1000 pb-20 font-sans selection:bg-indigo-100 p-10">

            {/* APEX SECRETARIAT REGISTRY HEADER */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 relative">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-2 border-indigo-200">
                        <Briefcase size={14} className="animate-pulse" /> Central Directory
                    </div>
                    <h1 className="text-6xl font-black text-slate-800 tracking-tighter uppercase leading-none">Contract Registry</h1>
                    <p className="text-slate-500 font-medium text-xl italic underline underline-offset-8 decoration-indigo-200">
                        Historical and active listings of delegated infrastructure works in Bharat Mandapam.
                    </p>
                </div>
                <div className="flex gap-4">
                    <Button 
                        variant="outline" 
                        onClick={() => router.push("/itpo")}
                        className="h-16 px-8 rounded-3xl border-2 border-indigo-200 font-black uppercase tracking-widest text-[10px] text-indigo-700 bg-white shadow-xl hover:bg-indigo-50 transition-all"
                    >
                        <History size={20} className="mr-2" /> Operations Console
                    </Button>
                    <Button 
                        onClick={() => router.push("/itpo/raise-contract")}
                        className="h-16 px-10 rounded-3xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-black uppercase tracking-widest text-[10px] shadow-2xl hover:shadow-[0_0_20px_theme(colors.indigo.400)] transition-all gap-2 group border-none"
                    >
                        <PlusCircle size={20} className="text-indigo-100" /> Raise New Contract
                    </Button>
                </div>
            </div>

            {/* B2. FILTERING CONTROL BAR CARD */}
            <Card className="rounded-[40px] border-none shadow-lg bg-white overflow-hidden p-8 flex flex-col md:flex-row gap-6 items-center justify-between relative">
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/topography.png')]" />

                {/* Search field */}
                <div className="relative group flex-1 w-full md:max-w-md flex z-10">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search by ID, title, or agency..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-11 pr-6 py-4 border-2 border-slate-200 bg-slate-50 rounded-2xl text-[10px] font-black uppercase outline-none text-slate-700 focus:border-indigo-400 focus:bg-white transition-all shadow-inner placeholder:text-slate-400"
                    />
                </div>

                {/* Selection drop-downs */}
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto items-stretch sm:items-center z-10">
                    <div className="flex items-center gap-2">
                        <SlidersHorizontal className="h-4 w-4 text-indigo-600" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Filter Controls</span>
                    </div>

                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="h-12 px-4 rounded-xl border-2 border-slate-200 bg-white text-[10px] font-black uppercase tracking-widest outline-none text-slate-700 focus:border-indigo-400 transition-all cursor-pointer shadow-sm hover:border-slate-300"
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
                        className="h-12 px-4 rounded-xl border-2 border-slate-200 bg-white text-[10px] font-black uppercase tracking-widest outline-none text-slate-700 focus:border-indigo-400 transition-all cursor-pointer shadow-sm hover:border-slate-300"
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
            </Card>

            {/* B3. MAIN TABLE CARD CONTAINER */}
            <Card className="rounded-[48px] border-none shadow-xl overflow-hidden bg-white">
                <div className="p-10 bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-800 text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                        <div className="flex items-center gap-5">
                            <div className="h-14 w-14 rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg">
                                <Briefcase size={28} className="text-white" />
                            </div>
                            <div className="space-y-1">
                                <CardTitle className="text-2xl font-black uppercase tracking-tight drop-shadow-sm">Contract Register Ledger</CardTitle>
                                <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest leading-none">Complete repository and verification logs of delegate structural jobs</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-0">
                    <Table>
                        <TableHeader className="bg-indigo-50/50">
                            <TableRow className="border-b-2 border-indigo-100 font-sans">
                                <TableHead className="px-10 py-6 text-[9px] font-black uppercase tracking-[0.2em] text-indigo-800">ID</TableHead>
                                <TableHead className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-800">Title & Category</TableHead>
                                <TableHead className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-800">Assigned Partner</TableHead>
                                <TableHead className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-800 text-center">Priority</TableHead>
                                <TableHead className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-800 text-center">Est. Value</TableHead>
                                <TableHead className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-800 text-center">Status</TableHead>
                                <TableHead className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-800 text-center">Deadline</TableHead>
                                <TableHead className="text-right px-10 text-[9px] font-black uppercase tracking-[0.2em] text-indigo-800">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-indigo-50 font-sans bg-white">
                            {filteredContracts.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center py-12 text-slate-400 text-xs font-bold uppercase tracking-widest">
                                        No contracts match the selected filter criteria.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredContracts.map((contract) => (
                                    <TableRow key={contract.id} className="border-none hover:bg-indigo-50/50 transition-all group cursor-pointer">
                                        
                                        {/* ID Column */}
                                        <TableCell className="px-10 py-6 font-mono font-black text-xs text-indigo-700">
                                            {contract.id}
                                        </TableCell>

                                        {/* Title Column */}
                                        <TableCell className="max-w-[280px]">
                                            <div className="flex flex-col gap-1.5">
                                                <span className="text-xs font-black text-slate-800 uppercase tracking-tight line-clamp-1">{contract.title}</span>
                                                <Badge variant="outline" className="border-2 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 w-fit border-indigo-100 text-indigo-700 bg-indigo-50/50">
                                                    {contract.category}
                                                </Badge>
                                            </div>
                                        </TableCell>

                                        {/* Partner Agency Column */}
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-tight">
                                                <Building2 className="h-4.5 w-4.5 shrink-0 text-slate-400" />
                                                <span>{contract.agency}</span>
                                            </div>
                                        </TableCell>

                                        {/* Priority Column */}
                                        <TableCell className="text-center">
                                            <PriorityBadge priority={contract.priority} />
                                        </TableCell>

                                        {/* Estimation Value Column */}
                                        <TableCell className="text-center">
                                            <span className="font-mono font-bold text-[11px] px-3 py-1.5 rounded-lg border shadow-inner bg-slate-50 text-slate-700 border-slate-100">
                                                {contract.estimation}
                                            </span>
                                        </TableCell>

                                        {/* Status Column */}
                                        <TableCell className="text-center">
                                            <ITPOStatusBadge status={contract.status} />
                                        </TableCell>

                                        {/* Target Date Column */}
                                        <TableCell className="text-center">
                                            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-tight">
                                                <Calendar className="h-3.5 w-3.5 shrink-0 text-indigo-500" />
                                                <span>{contract.deadline}</span>
                                            </div>
                                        </TableCell>

                                        {/* Actions Button */}
                                        <TableCell className="text-right px-10">
                                            <Button
                                                variant="outline"
                                                onClick={() => router.push(`/itpo/approvals/${contract.id}`)}
                                                className="h-10 px-4 rounded-xl border-2 border-slate-200 font-black uppercase tracking-widest text-[9px] text-slate-700 bg-white hover:bg-slate-50 transition-all gap-1.5 shadow-sm"
                                            >
                                                <span>Review</span>
                                                <ArrowUpRight size={12} />
                                            </Button>
                                        </TableCell>

                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </Card>

            {/* B4. SUMMARY METRICS FOOTER */}
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-4">
                <span>Showing {filteredContracts.length} of {allContracts.length} records</span>
                <span className="underline underline-offset-4 decoration-indigo-200">ITPO Secretariat Central Terminal</span>
            </div>

        </div>
    );
}