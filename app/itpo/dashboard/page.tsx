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
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
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
  Search,
  Filter,
  Check,
  X,
  Plus,
  RotateCcw,
  BookOpen
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Initial Mock Data ───────────────────────────────────────
const INITIAL_STATS = [
  {
    key: "active",
    title: "Active Contracts",
    value: "12",
    subtitle: "Currently in execution",
    icon: Clock,
    color: "bg-[#AFCBFF] border-[#B8C0FF]/60 text-slate-900",
    route: "/itpo/contracts",
  },
  {
    key: "pending",
    title: "Pending Approvals",
    value: "03",
    subtitle: "Estimations & Closures",
    icon: AlertTriangle,
    color: "bg-[#FFD6A5] border-[#F9C74F]/50 text-slate-900",
    alert: true,
    route: "/itpo/approvals",
  },
  {
    key: "closed",
    title: "Closed Contracts",
    value: "28",
    subtitle: "Successfully completed",
    icon: CheckCircle2,
    color: "bg-[#CDEAC0] border-[#BDE0A8]/60 text-slate-900",
    route: "/itpo/closed",
  },
];

const INITIAL_CONTRACTS = [
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

const INITIAL_HISTORY = [
  { id: "CON-1902", name: "Electrical Systems", date: "Sep 28, 2024", status: "Closed" },
  { id: "CON-1855", name: "General Civil Prep", date: "Aug 15, 2024", status: "Closed" },
  { id: "CON-1720", name: "Plumbing Infrastructure", date: "Jul 02, 2024", status: "Closed" },
];

// ─── Status Badge Helper (Strict Pastel Palette) ────────────────────
function ITPOStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "Raised": "bg-[#AFCBFF]/20 text-slate-800 border-[#AFCBFF]/40",
    "Under Review": "bg-[#A9D6E5]/20 text-slate-800 border-[#A9D6E5]/40",
    "Estimation Submitted": "bg-[#E4C1F9]/20 text-slate-800 border-[#CBC0D3]/40",
    "Work In Progress": "bg-[#FFD6A5]/20 text-slate-800 border-[#F9C74F]/40",
    "Inspection Pending": "bg-[#AFCBFF]/25 text-slate-800 border-[#B8C0FF]/40",
    "Closed": "bg-[#CDEAC0]/25 text-slate-800 border-[#BDE0A8]/45",
  };

  return (
    <Badge 
      variant="outline" 
      className={cn(
        "text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full", 
        styles[status] || "bg-slate-100 text-slate-600 border-slate-200"
      )}
    >
      {status}
    </Badge>
  );
}

export default function ITPODashboard() {
  const router = useRouter();

  // --- State Hooks ---
  const [contracts, setContracts] = useState(INITIAL_CONTRACTS);
  const [history, setHistory] = useState(INITIAL_HISTORY);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; type: "success" | "info" } | null>(null);

  // New Contract Form State
  const [formId, setFormId] = useState("CON-2050");
  const [formCategory, setFormCategory] = useState("General Civil");
  const [formDesc, setFormDesc] = useState("");
  const [formAgency, setFormAgency] = useState("");

  // --- Dynamic Stats Calculations ---
  const stats = useMemo(() => {
    const activeCount = contracts.length;
    const pendingCount = contracts.filter(c => c.status === "Estimation Submitted" || c.status === "Inspection Pending").length;
    const closedCount = history.length;

    return INITIAL_STATS.map(s => {
      if (s.key === "active") return { ...s, value: String(activeCount).padStart(2, '0') };
      if (s.key === "pending") return { ...s, value: String(pendingCount).padStart(2, '0') };
      if (s.key === "closed") return { ...s, value: String(closedCount).padStart(2, '0') };
      return s;
    });
  }, [contracts, history]);

  // --- Handlers ---
  const handlePromoteStatus = (id: string) => {
    setContracts(prev => {
      return prev.map(c => {
        if (c.id === id) {
          if (c.status === "Estimation Submitted") {
            triggerFeedback(`Estimation reviewed. Promoted CON-${id} to Work In Progress.`, "success");
            return { ...c, status: "Work In Progress", progress: 50, lastUpdate: "Authorized cost structure. Mobilizing civil crews." };
          }
          if (c.status === "Inspection Pending") {
            // Move to history/closed
            triggerFeedback(`Inspection cleared. Contract CON-${id} successfully closed.`, "success");
            setTimeout(() => {
              setHistory(h => [{ id: c.id, name: c.category, date: "Today", status: "Closed" }, ...h]);
              setContracts(current => current.filter(item => item.id !== id));
            }, 500);
            return { ...c, status: "Closed", progress: 100 };
          }
        }
        return c;
      });
    });
  };

  const triggerFeedback = (message: string, type: "success" | "info") => {
    setFeedback({ message, type });
    setTimeout(() => {
      setFeedback(null);
    }, 4000);
  };

  const handleCreateContract = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formDesc || !formAgency) {
      triggerFeedback("Please fill out description and agency parameters.", "info");
      return;
    }

    const newRecord = {
      id: formId,
      category: formCategory,
      description: formDesc,
      status: "Work In Progress",
      agency: formAgency,
      progress: 10,
      lastUpdate: "Work order initiated. Project startup phase.",
      date: "Just now",
    };

    setContracts([newRecord, ...contracts]);
    setIsCreatorOpen(false);
    triggerFeedback(`Work order ${formId} successfully added to ledger.`, "success");

    // Cycle next dummy id
    const nextNum = parseInt(formId.split("-")[1]) + 1;
    setFormId(`CON-${nextNum}`);
    setFormDesc("");
    setFormAgency("");
  };

  const handleResetSandbox = () => {
    setContracts(INITIAL_CONTRACTS);
    setHistory(INITIAL_HISTORY);
    triggerFeedback("Secretariat database logs reset to factory baseline.", "info");
  };

  // Filter logic
  const filteredContracts = contracts.filter(c => 
    c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.agency.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-5 pb-10 bg-[#f8fafc] text-[#0f172a] min-h-screen relative font-sans selection:bg-[#B8C0FF]/40 p-6 md:p-8">
      
      {/* Subtle Pattern Textures */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.015] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/topography.png')] opacity-[0.01] pointer-events-none z-0" />

      {/* --- APEX SECRETARIAT COMPACT HEADER --- */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#e2e8f0] pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 bg-[#B8C0FF]/15 text-slate-800 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-[#B8C0FF]/30">
            <Building2 size={12} className="text-slate-700" /> Bharat Mandapam
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">ITPO Secretariat Panel</h1>
          <p className="text-xs text-slate-500">
            Executive monitoring console, unified progress validation, and compliance tracking.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          {contracts.length !== INITIAL_CONTRACTS.length && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleResetSandbox}
              className="h-9 px-3 rounded-lg border border-slate-200 text-xs font-semibold hover:bg-slate-100 transition-all gap-1.5"
            >
              <RotateCcw size={13} />
              Reset State
            </Button>
          )}

          <Button 
            variant="outline" 
            size="sm"
            onClick={() => router.push("/itpo/contracts")}
            className="h-9 px-3 rounded-lg border border-slate-200 text-xs font-semibold hover:bg-slate-100 transition-all gap-1.5"
          >
            <History size={13} />
            Global Audit Trail
          </Button>

          <Button 
            size="sm"
            onClick={() => setIsCreatorOpen(!isCreatorOpen)}
            className="h-9 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-all hover:-translate-y-[1px] gap-1.5"
          >
            <PlusCircle size={13} />
            Raise New Contract
          </Button>
        </div>
      </div>

      {/* Feedback Notification Toast */}
      {feedback && (
        <div className={cn(
          "relative z-20 p-3 rounded-lg border flex gap-2 items-center text-xs font-semibold animate-in fade-in slide-in-from-top-2",
          feedback.type === "success" ? "bg-[#CDEAC0] border-[#BDE0A8] text-slate-950" : "bg-[#AFCBFF]/40 border-[#B8C0FF] text-slate-950"
        )}>
          <Check className="h-4 w-4 shrink-0 text-slate-900" />
          <span>{feedback.message}</span>
        </div>
      )}

      {/* --- B1. COMPACT ACTION INDICATOR TILES (No Neon Gradients, Pastel Palette) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
        {stats.map((item, i) => {
          const IconComponent = item.icon;
          return (
            <button
              key={i}
              onClick={() => router.push(item.route)}
              className={cn(
                "group relative text-left p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-[1px]",
                item.color
              )}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-800">{item.title}</span>
                <div className="h-7 w-7 rounded-lg bg-white/40 border border-white/60 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <IconComponent size={14} className="text-slate-800" />
                </div>
              </div>
              <div className="mt-2">
                <p className="text-xl font-bold tracking-tight text-slate-900">{item.value}</p>
                <p className="text-[10px] text-slate-600 font-medium">{item.subtitle}</p>
              </div>
              {item.alert && (
                <span className="absolute top-2 right-2 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* --- INLINE CREATOR DRAWER / FORM PANEL (Hidden/Shown dynamically) --- */}
      {isCreatorOpen && (
        <Card className="relative z-10 border border-slate-200 rounded-xl bg-white shadow-sm p-4 animate-in fade-in duration-200">
          <div className="flex justify-between items-center border-b border-slate-100 pb-2 mb-3">
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Raise New Secretariat Contract</h4>
              <p className="text-[10px] text-slate-500">Add an active project clearance requirement to the ledger.</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsCreatorOpen(false)}
              className="h-6 w-6 p-0 hover:bg-slate-100"
            >
              <X size={14} />
            </Button>
          </div>
          <form onSubmit={handleCreateContract} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
            <div>
              <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">Filing ID</label>
              <input 
                type="text" 
                value={formId} 
                onChange={(e) => setFormId(e.target.value)}
                className="h-9 w-full border border-slate-300 rounded-lg px-2.5 text-xs font-mono bg-slate-50"
                readOnly
              />
            </div>
            <div>
              <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">Classification Category</label>
              <select 
                value={formCategory} 
                onChange={(e) => setFormCategory(e.target.value)}
                className="h-9 w-full border border-slate-300 rounded-lg px-2 text-xs font-semibold text-slate-700 bg-white"
              >
                <option value="General Civil">General Civil</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Mechanical/HVAC">Mechanical/HVAC</option>
                <option value="Electrical Systems">Electrical Systems</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">Appointed Contractor / PMC</label>
              <input 
                type="text" 
                placeholder="e.g. Shapoorji Pallonji" 
                value={formAgency} 
                onChange={(e) => setFormAgency(e.target.value)}
                className="h-9 w-full border border-slate-300 rounded-lg px-2.5 text-xs focus:ring-2 focus:ring-slate-100"
                required
              />
            </div>
            <div>
              <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">Detailed Description Scope</label>
              <input 
                type="text" 
                placeholder="Brief summary of required works" 
                value={formDesc} 
                onChange={(e) => setFormDesc(e.target.value)}
                className="h-9 w-full border border-slate-300 rounded-lg px-2.5 text-xs focus:ring-2 focus:ring-slate-100"
                required
              />
            </div>
            <div className="md:col-span-4 flex justify-end gap-2 border-t border-slate-100 pt-3">
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => setIsCreatorOpen(false)} 
                className="h-8 text-xs font-semibold text-slate-600 rounded-lg"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                size="sm" 
                className="h-8 text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 rounded-lg"
              >
                Deploy Order Log
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* --- MAIN TWO-COLUMN COMPACT SPLIT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 relative z-10 items-start">

        {/* Left Column: Active Contracts Ledger (Takes 8/12 Columns) */}
        <div className="lg:col-span-8 space-y-4">
          <Card className="rounded-xl border border-slate-200 shadow-sm bg-white overflow-hidden flex flex-col">
            
            <CardHeader className="p-4 border-b border-slate-200 bg-slate-50/50">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="space-y-0.5">
                  <CardTitle className="text-sm font-semibold text-slate-800 uppercase tracking-wide">Active Contracts Ledger</CardTitle>
                  <CardDescription className="text-xs text-slate-500">Live monitoring data and verification gates for active works.</CardDescription>
                </div>
                
                {/* Embedded High-Density Search */}
                <div className="relative w-full sm:w-60">
                  <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                    <Search className="h-3 w-3 text-slate-400" />
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search active IDs, agencies..."
                    className="w-full h-8 pl-8 pr-2.5 bg-white border border-slate-300 rounded-lg text-xs placeholder:text-slate-400 focus:ring-2 focus:ring-slate-100"
                  />
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-4 space-y-3 flex-1">
              {filteredContracts.length === 0 ? (
                <div className="p-12 text-center text-slate-500 space-y-2">
                  <AlertTriangle className="h-6 w-6 text-slate-400 mx-auto" />
                  <p className="text-xs font-semibold text-slate-700">No active work orders matched search constraints.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredContracts.map((contract) => (
                    <div 
                      key={contract.id} 
                      className="p-3.5 rounded-lg border border-slate-200 bg-white shadow-xs hover:shadow-sm transition-all flex flex-col justify-between"
                    >
                      {/* Header row details */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] font-bold text-slate-900 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">
                              {contract.id}
                            </span>
                            <ITPOStatusBadge status={contract.status} />
                          </div>
                          <h4 className="font-semibold text-xs text-slate-900 mt-1.5 leading-snug">
                            {contract.description}
                          </h4>
                          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[10px] font-medium text-slate-500 pt-0.5">
                            <Wrench size={10} className="text-slate-400 shrink-0" />
                            <span className="text-slate-700">{contract.category}</span>
                            <span className="text-slate-300">•</span>
                            <span className="text-slate-700">{contract.agency}</span>
                            <span className="text-slate-300">•</span>
                            <span className="text-slate-400">{contract.date}</span>
                          </div>
                        </div>

                        {/* Integrated Operations Buttons */}
                        <div className="flex-shrink-0 pt-1">
                          {contract.status === "Inspection Pending" && (
                            <Button 
                              onClick={() => handlePromoteStatus(contract.id)} 
                              size="sm" 
                              className="bg-[#CDEAC0] hover:bg-[#BDE0A8] text-slate-950 rounded-lg px-2.5 h-8 font-semibold text-[11px] gap-1 border border-[#BDE0A8]/50 hover:-translate-y-[1px] transition-all"
                            >
                              <Camera size={12} /> Inspect & Close
                            </Button>
                          )}
                          {contract.status === "Estimation Submitted" && (
                            <Button 
                              onClick={() => handlePromoteStatus(contract.id)} 
                              size="sm" 
                              className="bg-[#FFD6A5] hover:bg-[#F9C74F]/70 text-slate-950 rounded-lg px-2.5 h-8 font-semibold text-[11px] gap-1 border border-[#F9C74F]/40 hover:-translate-y-[1px] transition-all"
                            >
                              <Eye size={12} /> Review Estimate
                            </Button>
                          )}
                          {contract.status === "Work In Progress" && (
                            <span className="text-[10px] font-medium text-slate-400 italic">Executing</span>
                          )}
                        </div>
                      </div>

                      {/* Progress Track (High Density) */}
                      <div className="space-y-1.5 bg-slate-50/50 p-2.5 rounded-lg border border-slate-150">
                        <div className="flex justify-between text-[8px] font-bold uppercase tracking-wider text-slate-400">
                          <span>Raised</span>
                          <span>Under Review</span>
                          <span>Estimation</span>
                          <span>WIP</span>
                          <span>Cleared</span>
                        </div>
                        <Progress value={contract.progress} className="h-1.5 bg-slate-200/60 rounded-full" />
                        
                        <div className="flex items-start gap-1 pt-0.5">
                          <MessageSquare size={10} className="text-slate-400 mt-0.5 flex-shrink-0" />
                          <p className="text-[10px] text-slate-500 leading-normal">
                            <span className="font-semibold text-slate-700">Latest Action Update:</span>{" "}
                            {contract.lastUpdate}
                          </p>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar Column (Takes 4/12 Columns) */}
        <div className="lg:col-span-4 space-y-4">

          {/* Action Required Pastel Widget */}
          <Card className="rounded-xl border border-[#F7CAD0]/80 bg-[#FFB4A2]/20 shadow-sm overflow-hidden flex flex-col">
            <div className="p-3.5 border-b border-[#F7CAD0]/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-md bg-[#FFB4A2]/55 border border-[#F7CAD0] flex items-center justify-center shrink-0">
                  <AlertTriangle size={12} className="text-slate-800" />
                </div>
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-800">Clearance Thresholds</h3>
              </div>
              <ArrowUpRight size={13} className="text-slate-600" />
            </div>

            <div className="p-4 space-y-3">
              <div className="bg-white/80 border border-[#F7CAD0]/40 p-3 rounded-lg text-xs text-slate-700">
                <p className="leading-relaxed">
                  Contract <span className="font-mono text-slate-900 font-bold">CON-2022</span> (AC Replacement Block B) was marked for final inspection clearance. Immediate review of contractor photos is requested to process clearance.
                </p>
              </div>
              <Button 
                onClick={() => router.push("/itpo/approvals")} 
                className="w-full h-8 text-[11px] font-semibold bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-lg transition-all"
              >
                Review Log Execution Details
              </Button>
            </div>
          </Card>

          {/* Recently Closed Works Widget */}
          <Card className="rounded-xl border border-[#B8C0FF]/50 bg-white shadow-sm overflow-hidden flex flex-col">
            <div className="p-3.5 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-md bg-[#AFCBFF]/40 border border-[#B8C0FF]/60 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={12} className="text-slate-800" />
                </div>
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-800">Archived Signoffs</h3>
              </div>
              <Button 
                variant="ghost" 
                onClick={() => router.push("/itpo/contracts")}
                className="text-slate-500 hover:text-slate-800 p-0 h-auto font-semibold text-[10px] uppercase tracking-wider hover:bg-transparent"
              >
                View Ledger
              </Button>
            </div>

            <div className="p-3.5 space-y-2">
              {history.map((item, i) => (
                <div key={i} className="flex justify-between items-center bg-slate-50/50 border border-slate-200/60 p-2.5 rounded-lg hover:bg-slate-100/50 transition-colors cursor-pointer">
                  <div className="space-y-0.5">
                    <p className="text-[11px] font-bold text-slate-800 truncate max-w-[140px]">{item.name}</p>
                    <p className="text-[9px] font-mono text-slate-400 font-bold">{item.id}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-[9px] font-medium text-slate-400 leading-none">{item.date}</p>
                    <ITPOStatusBadge status={item.status} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Manual Assistance Panel */}
          <div className="p-4 rounded-xl border border-[#90E0EF]/65 bg-[#A9D6E5]/15 flex items-start gap-2.5">
            <BookOpen size={14} className="text-slate-700 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">Secretariat Directive</h5>
              <p className="text-[10px] text-slate-500 leading-normal mt-0.5">
                Physical project clearance records are linked to compliance schedules under Bharat Mandapam trade guidelines. Refer inquiries to Division Sector-C desk operations.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* --- LOG PROTOCOL COMPLIANCE FOOTER --- */}
      <footer className="pt-6 border-t border-[#e2e8f0] text-center text-[10px] text-slate-400">
        <p>National Secretariat Audit Panel • Pragati Maidan Operations Hub • Compliance Framework 2025</p>
      </footer>

    </div>
  );
}