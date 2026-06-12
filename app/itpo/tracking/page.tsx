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
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Project Milestone Steps Matching Case Flows ─────────────────
const case3Steps = [
    { label: "ITPO Raised", status: "complete" },
    { label: "Shapoorji Accepted", status: "complete" },
    { label: "Cost Estimation", status: "complete" },
    { label: "ITPO Approval", status: "complete" },
    { label: "Engineer Assigned", status: "complete" },
    { label: "Work Execution", status: "current" },
    { label: "Completion Report", status: "upcoming" },
    { label: "ITPO Inspection", status: "upcoming" },
    { label: "Closure", status: "upcoming" },
];

const case2Steps = [
    { label: "ITPO Raised", status: "complete" },
    { label: "NBCC Review", status: "complete" },
    { label: "Classified Small", status: "complete" },
    { label: "NBCC Direct Execution", status: "current" },
    { label: "Completion", status: "upcoming" },
    { label: "ITPO Approval", status: "upcoming" },
    { label: "Closure", status: "upcoming" },
];

const case1Steps = [
    { label: "ITPO Raised", status: "complete" },
    { label: "Visible to Partners", status: "complete" },
    { label: "Bid Estimation", status: "complete" },
    { label: "ITPO Approved Bid", status: "complete" },
    { label: "Engineers Assigned", status: "complete" },
    { label: "Execution Work", status: "complete" },
    { label: "Progress Updates", status: "complete" },
    { label: "Completion Report", status: "complete" },
    { label: "ITPO Inspection", status: "current" },
    { label: "Contract Closure", status: "upcoming" },
];

// ─── Active Projects Mock Data ──────────────────────────────────
const projects = [
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
        steps: case3Steps,
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
        steps: case2Steps,
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
        steps: case1Steps,
    },
];

export default function ProjectTrackingPage() {
    const [selectedProjectId, setSelectedProjectId] = useState(projects[0].id);
    const activeProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

    return (
        <div className="space-y-6 p-10">

            {/* Page Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Project Lifecycle Tracking</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Monitor execution flows, check milestone verifications, and inspect site logs.
                </p>
            </div>

            {/* Split Screen Grid Layout */}
            <div className="grid gap-6 lg:grid-cols-3">

                {/* Left Column: Projects Directory Panel (1/3 Width) */}
                <div className="space-y-4 col-span-1">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider pl-1">
                        Active Project Directory
                    </h3>
                    <div className="space-y-3">
                        {projects.map((project) => {
                            const isSelected = project.id === selectedProjectId;
                            return (
                                <Card
                                    key={project.id}
                                    onClick={() => setSelectedProjectId(project.id)}
                                    className={cn(
                                        "cursor-pointer border transition-all hover:bg-muted/40",
                                        isSelected ? "border-primary/80 ring-1 ring-primary/40 bg-muted/20" : "border-border bg-card"
                                    )}
                                >
                                    <CardContent className="p-4 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="font-mono text-xs font-bold text-primary">{project.id}</span>
                                            <Badge variant="outline" className="text-[10px] font-semibold py-0 px-1.5 bg-muted">
                                                {project.category}
                                            </Badge>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-sm line-clamp-1">{project.title}</h4>
                                            <span className="text-[11px] text-muted-foreground mt-0.5 block">{project.location}</span>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex justify-between text-[10px] font-medium text-muted-foreground">
                                                <span>Work Progress</span>
                                                <span className="font-bold text-foreground">{project.progress}%</span>
                                            </div>
                                            <Progress value={project.progress} className="h-1.5" />
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>

                {/* Right Column: Execution Tracking Details (2/3 Width) */}
                <Card className="lg:col-span-2 border-border">
                    <CardHeader className="border-b border-border/60 bg-muted/20 pb-5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <span className="font-mono text-xs font-extrabold text-primary">{activeProject.id}</span>
                                <CardTitle className="text-lg font-bold mt-1 text-foreground">
                                    {activeProject.title}
                                </CardTitle>
                                <CardDescription className="text-xs text-muted-foreground mt-0.5">
                                    {activeProject.location} • {activeProject.flowType}
                                </CardDescription>
                            </div>
                            <Badge className="bg-primary/10 text-primary border-primary/20 shrink-0 h-7 text-xs font-semibold px-3">
                                {activeProject.statusText}
                            </Badge>
                        </div>
                    </CardHeader>

                    <CardContent className="p-6 space-y-6">

                        {/* Summary Details Row */}
                        <div className="grid gap-4 sm:grid-cols-2 text-xs border-b border-border/40 pb-5">
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Assigned Partner</span>
                                <span className="font-semibold text-foreground flex items-center gap-1.5">
                                    <Building2 className="h-4 w-4 text-primary shrink-0" /> {activeProject.agency}
                                </span>
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Assigned Manager</span>
                                <span className="font-semibold text-foreground flex items-center gap-1.5">
                                    <HardHat className="h-4 w-4 text-primary shrink-0" /> {activeProject.manager}
                                </span>
                            </div>
                        </div>

                        {/* Visual Timeline Tracker / Stepper */}
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                Workflow Milestones & Current Phase
                            </h4>

                            <div className="relative pl-6 space-y-6 border-l border-border/80 ml-2">
                                {activeProject.steps.map((step, idx) => {
                                    const isComplete = step.status === "complete";
                                    const isCurrent = step.status === "current";

                                    return (
                                        <div key={idx} className="relative">
                                            {/* Step Indicator Dot */}
                                            <span
                                                className={cn(
                                                    "absolute -left-9 top-1 flex h-6 w-6 items-center justify-center rounded-full border text-xs font-semibold",
                                                    isComplete && "bg-emerald-500/10 border-emerald-500 text-emerald-600",
                                                    isCurrent && "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20",
                                                    step.status === "upcoming" && "bg-background border-muted-foreground/30 text-muted-foreground"
                                                )}
                                            >
                                                {isComplete ? (
                                                    <CheckCircle2 className="h-4 w-4 stroke-[3]" />
                                                ) : (
                                                    idx + 1
                                                )}
                                            </span>

                                            {/* Step label description */}
                                            <div className="pl-2">
                                                <h5
                                                    className={cn(
                                                        "text-sm font-semibold",
                                                        isComplete && "text-foreground/80",
                                                        isCurrent && "text-primary text-base font-bold",
                                                        step.status === "upcoming" && "text-muted-foreground"
                                                    )}
                                                >
                                                    {step.label}
                                                </h5>
                                                {isCurrent && (
                                                    <span className="inline-flex items-center gap-1 text-[10px] bg-primary/10 text-primary border border-primary/20 rounded px-1.5 py-0.5 mt-1 font-semibold uppercase tracking-wider">
                                                        Active Stage
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Latest Site Progress Update Box */}
                        <div className="rounded-lg bg-muted/40 p-4 border border-border/40 text-xs">
                            <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1 mb-1.5">
                                <MessageSquare className="h-3.5 w-3.5 text-primary" /> Latest Operations Log Update:
                            </h4>
                            <p className="text-muted-foreground leading-relaxed">
                                {activeProject.lastUpdate}
                            </p>
                        </div>

                    </CardContent>
                </Card>

            </div>
        </div>
    );
}