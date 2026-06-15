"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  History,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

// ─── Mock Data for ITPO ───────────────────────────────────────
const userStats = [
  {
    title: "Active Contracts",
    value: "12",
    subtitle: "Currently in execution",
    icon: Clock,
    color: "from-blue-500 to-indigo-600",
    route: "/itpo/contracts",
  },
  {
    title: "Pending Approvals",
    value: "03",
    subtitle: "Estimations & Closures",
    icon: AlertTriangle,
    color: "from-amber-500 to-orange-600",
    alert: true,
    route: "/itpo/approvals",
  },
  {
    title: "Closed Contracts",
    value: "28",
    subtitle: "Successfully completed",
    icon: CheckCircle2,
    color: "from-emerald-500 to-teal-600",
    route: "/itpo/closed",
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
  { id: "CON-1902", name: "Electrical Systems", date: "Sep 28, 2024", status: "Closed" },
  { id: "CON-1855", name: "General Civil Prep", date: "Aug 15, 2024", status: "Closed" },
  { id: "CON-1720", name: "Plumbing Infrastructure", date: "Jul 02, 2024", status: "Closed" },
];

// ─── Status Badge Helper ────────────────────────────────────────────
function ITPOStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "Raised": "bg-slate-100 text-slate-700 border-slate-200",
    "Under Review": "bg-blue-100 text-blue-700 border-blue-200",
    "Estimation Submitted": "bg-purple-100 text-purple-700 border-purple-200",
    "Work In Progress": "bg-amber-100 text-amber-700 border-amber-200",
    "Inspection Pending": "bg-indigo-100 text-indigo-700 border-indigo-200",
    "Closed": "bg-emerald-100 text-emerald-700 border-emerald-200",
  };

  return (
    <Badge variant="outline" className={cn("text-[9px] font-black uppercase tracking-widest px-3 py-0.5 border-2 rounded-full", styles[status] || styles["Raised"])}>
      {status}
    </Badge>
  );
}

export default function ITPODashboard() {
  const router = useRouter();

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-20 font-sans selection:bg-indigo-100 p-10">

      {/* APEX SECRETARIAT HEADER */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 relative">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-2 border-indigo-200">
            <Building2 size={14} className="animate-pulse" /> Bharat Mandapam
          </div>
          <h1 className="text-6xl font-black text-slate-800 tracking-tighter uppercase leading-none">ITPO Secretariat</h1>
          <p className="text-slate-500 font-medium text-xl italic underline underline-offset-8 decoration-indigo-200">
            Secretariat administration panel, dynamic contract monitoring, and structural progress tracking.
          </p>
        </div>
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            onClick={() => router.push("/itpo/contracts")}
            className="h-16 px-8 rounded-3xl border-2 border-indigo-200 font-black uppercase tracking-widest text-[10px] text-indigo-700 bg-white shadow-xl hover:bg-indigo-50 transition-all"
          >
            <History size={20} className="mr-2" /> Global Audit Trail
          </Button>
          <Button 
            onClick={() => router.push("/itpo/raise-contract")}
            className="h-16 px-10 rounded-3xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-black uppercase tracking-widest text-[10px] shadow-2xl hover:shadow-[0_0_20px_theme(colors.indigo.400)] transition-all gap-2 group border-none"
          >
            <PlusCircle size={20} className="text-indigo-100" /> Raise New Contract
          </Button>
        </div>
      </div>

      {/* B1. ACTION INDICATOR TILES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {userStats.map((item, i) => (
          <button
            key={i}
            onClick={() => router.push(item.route)}
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
          </button>
        ))}
      </div>

      {/* MAIN TWO-COLUMN SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column: Active Contracts Ledger (Takes 2/3) */}
        <div className="lg:col-span-2">
          <Card className="rounded-[48px] border-none shadow-xl overflow-hidden bg-white h-full flex flex-col">
            <CardHeader className="p-0">
              <div className="p-10 bg-gradient-to-r from-slate-800 via-slate-950 to-indigo-950 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                  <div className="flex items-center gap-5">
                    <div className="h-14 w-14 rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg">
                      <Wrench size={28} className="text-white" />
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-2xl font-black uppercase tracking-tight drop-shadow-sm">Active Contracts Ledger</CardTitle>
                      <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest leading-none">Live execution progress of ongoing works in Bharat Mandapam</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-6 flex-1 bg-slate-50/30 relative">
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
              
              <div className="relative z-10 space-y-6">
                {activeContracts.map((contract) => (
                  <div 
                    key={contract.id} 
                    className="p-6 rounded-[32px] border border-slate-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Header Details of individual contract */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-black text-indigo-700 tracking-wider bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md">
                            {contract.id}
                          </span>
                          <ITPOStatusBadge status={contract.status} />
                        </div>
                        <h4 className="font-black text-lg text-slate-800 tracking-tight leading-tight mt-2">
                          {contract.description}
                        </h4>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[9px] font-bold text-slate-400 uppercase tracking-widest pt-1">
                          <Wrench size={10} className="text-indigo-500" />
                          <span>{contract.category}</span>
                          <span className="text-slate-200">•</span>
                          <span className="text-slate-600">{contract.agency}</span>
                          <span className="text-slate-200">•</span>
                          <span>{contract.date}</span>
                        </div>
                      </div>

                      {/* Interactive Actions */}
                      <div className="flex-shrink-0">
                        {contract.status === "Inspection Pending" && (
                          <Button 
                            onClick={() => router.push(`/itpo/approvals/${contract.id}`)} 
                            size="sm" 
                            className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl px-5 py-5 font-black text-[10px] uppercase tracking-widest gap-2 shadow-lg border-none"
                          >
                            <Camera size={14} /> Inspect & Close
                          </Button>
                        )}
                        {contract.status === "Estimation Submitted" && (
                          <Button 
                            onClick={() => router.push(`/itpo/approvals/${contract.id}`)} 
                            size="sm" 
                            className="bg-amber-500 hover:bg-amber-600 text-white rounded-2xl px-5 py-5 font-black text-[10px] uppercase tracking-widest gap-2 shadow-lg border-none"
                          >
                            <Eye size={14} /> Review Estimate
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Progress Indicator Track */}
                    <div className="space-y-3 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                      <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-slate-400">
                        <span>Raised</span>
                        <span>Review</span>
                        <span>Estimation</span>
                        <span>WIP</span>
                        <span>Inspection</span>
                      </div>
                      <Progress value={contract.progress} className="h-2.5 bg-slate-100 [&>div]:bg-gradient-to-r [&>div]:from-indigo-500 [&>div]:to-blue-600 rounded-full" />
                      
                      <div className="flex items-start gap-2 pt-1">
                        <MessageSquare size={12} className="text-slate-400 mt-0.5 flex-shrink-0" />
                        <p className="text-[10px] font-bold text-slate-500 italic">
                          <span className="text-indigo-600 font-extrabold uppercase not-italic tracking-wider mr-1">Latest Action:</span> 
                          {contract.lastUpdate}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar Column (Takes 1/3) */}
        <div className="space-y-8 lg:col-span-1">

          {/* Action Required Widget */}
          <Card className="rounded-[40px] border-none shadow-lg bg-white overflow-hidden flex flex-col group hover:shadow-2xl transition-all duration-500">
            <div className="p-6 flex items-center justify-between text-white relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-700">
              <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
              <div className="flex items-center gap-4 relative z-10">
                <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                  <AlertTriangle size={18} className="text-white drop-shadow-md" />
                </div>
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] drop-shadow-sm">Action Required</h3>
              </div>
              <ArrowUpRight size={18} className="text-white/70 relative z-10" />
            </div>

            <div className="p-8 space-y-5 flex-1 relative bg-slate-50/30">
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/topography.png')]" />
              <div className="relative z-10 space-y-4">
                <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm">
                  <p className="text-sm font-bold text-slate-700 leading-relaxed">
                    Contract <span className="font-mono text-indigo-600 font-black">CON-2022</span> (AC Replacement Block B) has been marked as complete by the PMC. Verify work logs to proceed with formal closure.
                  </p>
                </div>
                <Button 
                  onClick={() => router.push("/itpo/approvals")} 
                  className="w-full h-12 rounded-2xl bg-white hover:bg-slate-50 text-indigo-700 border-2 border-indigo-200 font-black uppercase tracking-widest text-[10px] shadow-sm transition-colors"
                >
                  Review Execution Details
                </Button>
              </div>
            </div>
          </Card>

          {/* Recently Closed Works Widget */}
          <Card className="rounded-[40px] border-none shadow-lg bg-white overflow-hidden flex flex-col group hover:shadow-2xl transition-all duration-500">
            <div className="p-6 flex items-center justify-between text-white relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-600">
              <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
              <div className="flex items-center gap-4 relative z-10">
                <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                  <CheckCircle2 size={18} className="text-white drop-shadow-md" />
                </div>
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] drop-shadow-sm">Recently Closed</h3>
              </div>
              <Button 
                variant="ghost" 
                onClick={() => router.push("/itpo/contracts")}
                className="text-white/80 hover:text-white p-0 h-auto font-black uppercase text-[9px] tracking-widest hover:bg-transparent transition-all"
              >
                View All
              </Button>
            </div>

            <div className="p-6 space-y-4 flex-1 relative bg-slate-50/30">
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
              <div className="relative z-10 space-y-4">
                {recentHistory.map((item, i) => (
                  <div key={i} className="flex justify-between items-center bg-white border border-slate-100 p-4 rounded-2xl shadow-sm hover:border-slate-300 transition-colors cursor-pointer">
                    <div className="space-y-1">
                      <p className="text-xs font-black text-slate-800 uppercase tracking-tight leading-none">{item.name}</p>
                      <p className="text-[9px] font-bold text-slate-400 font-mono uppercase tracking-widest">{item.id}</p>
                    </div>
                    <div className="text-right space-y-1.5">
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">{item.date}</p>
                      <ITPOStatusBadge status={item.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}