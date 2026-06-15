"use client";

import React, { useState, useMemo } from "react";
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
  Search,
  Filter,
  Plus,
  ArrowUpRight,
  TrendingUp,
  SlidersHorizontal,
  FolderLock,
  ExternalLink,
  DollarSign,
  Briefcase,
  Layers,
  Sparkles,
  AlertTriangle,
  User,
  ShieldCheck,
  ChevronRight,
  Menu
} from "lucide-react";

// --- Types & Interfaces ---
interface ContractItem {
  id: string;
  title: string;
  category: string;
  agency: string;
  type: "Estimation" | "Inspection" | "Financial Audit";
  budget: number;
  date: string;
  status: "Pending" | "Approved" | "Revision" | "Alert";
  description: string;
  requester: string;
}

// --- High Density Seed Data ---
const INITIAL_CONTRACTS: ContractItem[] = [
  {
    id: "CON-2035",
    title: "Main Foyer Restructuring & Plumbing",
    category: "Plumbing & Sanitization",
    agency: "NBCC (PMC)",
    type: "Estimation",
    budget: 1220000,
    date: "2025-10-24",
    status: "Pending",
    requester: "Aarav Sharma (Project Lead)",
    description: "Retrofitting of central municipal inlets and secondary piping channels inside the main ITPO administrative wing."
  },
  {
    id: "CON-2022",
    title: "Central AC Chiller Unit Replacement",
    category: "Mechanical/HVAC",
    agency: "NBCC & Shapoorji JV",
    type: "Inspection",
    budget: 8500000,
    date: "2025-10-12",
    status: "Pending",
    requester: "Meera Nair (Senior Engineer)",
    description: "Replacement of decommissioned unit #4 with highly efficient modern variable speed screw chillers."
  },
  {
    id: "CON-2045",
    title: "Sanding & Polishing of VIP Lounge Floor",
    category: "General Civil",
    agency: "Shapoorji (Contractor)",
    type: "Estimation",
    budget: 650000,
    date: "2025-10-15",
    status: "Pending",
    requester: "Devendra Verma (F&B Liaison)",
    description: "Premium diamond-abrasive polishing of Italian marble in Section A reception zones ahead of trade summit."
  },
  {
    id: "CON-1982",
    title: "Fiber-Optic Ring Topology Integration",
    category: "IT Infrastructure",
    agency: "Tata Communications Ltd",
    type: "Financial Audit",
    budget: 4500000,
    date: "2025-09-28",
    status: "Approved",
    requester: "Sanjay Paul (CIO Office)",
    description: "Redundant dual-path fiber ring layout across Exhibit Halls 1 through 6 with automated failover switching."
  },
  {
    id: "CON-2011",
    title: "Peripheral Security Fencing Zone 4",
    category: "Security & Surveillance",
    agency: "G4S Solutions",
    type: "Inspection",
    budget: 1800000,
    date: "2025-10-02",
    status: "Revision",
    requester: "Col. R. Singh (Director Security)",
    description: "Multi-point intrusion detection micro-fences linked directly to security operations desk."
  },
  {
    id: "CON-2089",
    title: "Solar Panel Array Structural Frame",
    category: "Renewable Energy",
    agency: "L&T Infrastructure",
    type: "Estimation",
    budget: 14200000,
    date: "2025-10-26",
    status: "Pending",
    requester: "Dr. Alok Sen (Green Energy Cell)",
    description: "Galvanized framing structures supporting 400KW roof-top monocrystalline PV panels."
  },
  {
    id: "CON-1950",
    title: "Substation #3 Transformer Refurbishment",
    category: "Electrical Systems",
    agency: "Siemens India Ltd",
    type: "Financial Audit",
    budget: 3100000,
    date: "2025-09-15",
    status: "Alert",
    requester: "V. K. Rao (Electrical Head)",
    description: "Coil insulation overhaul, oil replacement and load-testing report flagged critical discrepancies in winding resistance."
  },
  {
    id: "CON-1912",
    title: "Acoustic Insulation for Exhibition Hall B",
    category: "Acoustic Engineering",
    agency: "Saint-Gobain Projects",
    type: "Estimation",
    budget: 5400000,
    date: "2025-09-02",
    status: "Approved",
    requester: "Nupur Sen (Curator Panel)",
    description: "Mineral-wool ceiling backing and fabric acoustic wall panels to achieve optimal sound dampening levels."
  }
];

export default function PremiumPastelDashboard() {
  // --- States ---
  const [contracts, setContracts] = useState<ContractItem[]>(INITIAL_CONTRACTS);
  const [selectedId, setSelectedId] = useState<string>("CON-2035");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Form State
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("General Civil");
  const [newAgency, setNewAgency] = useState("");
  const [newType, setNewType] = useState<"Estimation" | "Inspection" | "Financial Audit">("Estimation");
  const [newBudget, setNewBudget] = useState("");
  const [newRequester, setNewRequester] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "info" | "error" | "warn";
  } | null>(null);

  // --- Calculations & KPI Summary ---
  const kpis = useMemo(() => {
    const total = contracts.length;
    const pending = contracts.filter((c) => c.status === "Pending").length;
    const approved = contracts.filter((c) => c.status === "Approved").length;
    const revision = contracts.filter((c) => c.status === "Revision").length;
    const alert = contracts.filter((c) => c.status === "Alert").length;
    const totalBudget = contracts.reduce((acc, curr) => acc + curr.budget, 0);

    return { total, pending, approved, revision, alert, totalBudget };
  }, [contracts]);

  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(contracts.map((c) => c.category)))];
  }, [contracts]);

  // --- Filtered Contracts ---
  const filteredContracts = useMemo(() => {
    return contracts.filter((c) => {
      const matchesSearch =
        c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.agency.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.requester.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = categoryFilter === "All" || c.category === categoryFilter;
      const matchesStatus = statusFilter === "All" || c.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [contracts, searchQuery, categoryFilter, statusFilter]);

  // --- Handlers ---
  const handleApprove = (id: string) => {
    setContracts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "Approved" } : c))
    );
    showNotification(`Approved item ${id}. Financial dispatch cleared.`, "success");
  };

  const handleReject = (id: string) => {
    setContracts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "Alert" } : c))
    );
    showNotification(`Discrepancy registered on ${id}. Flagged for security review.`, "error");
  };

  const handleRequestRevision = (id: string) => {
    setContracts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "Revision" } : c))
    );
    showNotification(`Revision requested for ${id}. Partner agency notified.`, "info");
  };

  const showNotification = (msg: string, type: "success" | "info" | "error" | "warn") => {
    setNotification({ message: msg, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleCreateContract = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newAgency || !newBudget) {
      showNotification("Please fill in essential parameters: Title, Agency, and Budget.", "warn");
      return;
    }

    const budgetNum = parseFloat(newBudget.replace(/[^0-9.]/g, ""));
    if (isNaN(budgetNum) || budgetNum <= 0) {
      showNotification("Invalid budget allocation format.", "warn");
      return;
    }

    const generatedId = `CON-${Math.floor(2000 + Math.random() * 999)}`;
    const newRecord: ContractItem = {
      id: generatedId,
      title: newTitle,
      category: newCategory,
      agency: newAgency,
      type: newType,
      budget: budgetNum,
      date: new Date().toISOString().split("T")[0],
      status: "Pending",
      requester: newRequester || "System Portal",
      description: newDescription || "No project notes supplied."
    };

    setContracts([newRecord, ...contracts]);
    setSelectedId(generatedId);
    showNotification(`Contract registry established for ${generatedId}.`, "success");

    // Clear Form fields
    setNewTitle("");
    setNewAgency("");
    setNewBudget("");
    setNewRequester("");
    setNewDescription("");
  };

  const handleReset = () => {
    setContracts(INITIAL_CONTRACTS);
    setSelectedId("CON-2035");
    showNotification("Contract logs re-seeded to baseline structures.", "info");
  };

  // Safe accessor for selected contract details panel
  const currentSelectedContract = contracts.find((c) => c.id === selectedId) || contracts[0];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] flex flex-row relative antialiased selection:bg-[#B8C0FF]/40 selection:text-slate-900">
      
      {/* 
        Background Textures
        Subtle cubes texture pattern overlay
      */}
      <div 
        className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.015] pointer-events-none z-0" 
        style={{ mixBlendMode: 'multiply' }}
      />
      <div 
        className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/topography.png')] opacity-[0.01] pointer-events-none z-0" 
        style={{ mixBlendMode: 'multiply' }}
      />


      {/* --- MAIN PAGE WORKSPACE --- */}
      <main className="flex-1 max-w-[1600px] mx-auto px-6 py-5 flex flex-col gap-5 z-10 overflow-x-hidden">
        
        {/* --- EXECUTIVE APP HEADER BAR --- */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
              <span>National Trade Infrastructure Division</span>
              <ChevronRight className="h-3 w-3" />
              <span>Pragati Maidan Redevelopment Registry</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Contract Approvals & ERP Clearance Panel
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleReset}
              className="px-3 h-9 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-1.5 transition-all hover:-translate-y-[1px]"
              title="Restores seed records to original values"
            >
              <RotateCcw className="h-3.5 w-3.5 text-slate-500" />
              Reset Workspace Mock
            </button>
            
            <div className="h-9 px-3 rounded-lg bg-slate-100 border border-slate-200 flex items-center gap-2 text-xs font-medium text-slate-600">
              <User className="h-3.5 w-3.5 text-slate-500" />
              <span>Administrator Sector-D</span>
            </div>
          </div>
        </header>

        {/* --- SYSTEM NOTIFICATION BANNER --- */}
        {notification && (
          <div
            className={`px-4 py-3 rounded-xl border flex gap-3 items-center animate-in fade-in slide-in-from-top-4 duration-200 ${
              notification.type === "success" 
                ? "bg-[#CDEAC0] border-[#BDE0A8] text-slate-950" 
                : notification.type === "info"
                ? "bg-[#AFCBFF]/40 border-[#B8C0FF] text-slate-950"
                : notification.type === "error"
                ? "bg-[#FFB4A2] border-[#F7CAD0] text-slate-950"
                : "bg-[#FFD6A5] border-[#F9C74F] text-slate-950"
            }`}
          >
            {notification.type === "success" && <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-800" />}
            {notification.type === "info" && <Info className="h-4 w-4 shrink-0 text-blue-800" />}
            {notification.type === "error" && <XCircle className="h-4 w-4 shrink-0 text-red-800" />}
            {notification.type === "warn" && <AlertTriangle className="h-4 w-4 shrink-0 text-amber-800" />}
            
            <p className="text-xs font-semibold">{notification.message}</p>
          </div>
        )}

        {/* --- KPI SECTION: PASTEL ACCENTS --- */}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          
          {/* Total Budget KPI */}
          <div className="bg-[#E4C1F9] border border-[#CBC0D3]/60 p-4 rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200 group">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-900/80">Aggregate Budget</span>
              <DollarSign className="h-4 w-4 text-purple-800/80 group-hover:scale-105 transition-transform" />
            </div>
            <div className="mt-2.5">
              <p className="text-xl font-bold text-slate-950">
                ₹{(kpis.totalBudget / 10000000).toFixed(2)} Cr
              </p>
              <p className="text-[10px] text-purple-900/60 font-semibold mt-0.5">
                Across {kpis.total} Contracts
              </p>
            </div>
          </div>

          {/* Pending Reviews KPI */}
          <div className="bg-[#FFD6A5] border border-[#F9C74F]/50 p-4 rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200 group">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-900/80">Awaiting Signs</span>
              <Calculator className="h-4 w-4 text-amber-800/80 group-hover:scale-105 transition-transform" />
            </div>
            <div className="mt-2.5">
              <p className="text-xl font-bold text-slate-950">{kpis.pending}</p>
              <p className="text-[10px] text-amber-900/60 font-semibold mt-0.5">
                Requiring physical sign-offs
              </p>
            </div>
          </div>

          {/* Approved Contracts KPI */}
          <div className="bg-[#CDEAC0] border border-[#BDE0A8]/60 p-4 rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200 group">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-950/80">Disbursed Ledger</span>
              <Check className="h-4 w-4 text-emerald-900/80 group-hover:scale-105 transition-transform" />
            </div>
            <div className="mt-2.5">
              <p className="text-xl font-bold text-slate-950">{kpis.approved}</p>
              <p className="text-[10px] text-emerald-900/60 font-semibold mt-0.5">
                Archived and dispatched
              </p>
            </div>
          </div>

          {/* Revision Requested KPI */}
          <div className="bg-[#AFCBFF] border border-[#B8C0FF]/60 p-4 rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200 group">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-900/80">Pending Adjustments</span>
              <SlidersHorizontal className="h-4 w-4 text-blue-800/80 group-hover:scale-105 transition-transform" />
            </div>
            <div className="mt-2.5">
              <p className="text-xl font-bold text-slate-950">{kpis.revision}</p>
              <p className="text-[10px] text-blue-900/60 font-semibold mt-0.5">
                Sent back to contractors
              </p>
            </div>
          </div>

          {/* Alert Flagged KPI */}
          <div className="bg-[#FFB4A2] border border-[#F7CAD0]/70 p-4 rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200 group">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-red-950/80">Security Holds</span>
              <AlertTriangle className="h-4 w-4 text-red-900/80 group-hover:scale-105 transition-transform" />
            </div>
            <div className="mt-2.5">
              <p className="text-xl font-bold text-slate-950">{kpis.alert}</p>
              <p className="text-[10px] text-red-900/60 font-semibold mt-0.5">
                Flagged by engineering boards
              </p>
            </div>
          </div>

          {/* Secondary Auxiliary Support KPI */}
          <div className="bg-[#A9D6E5]/70 border border-[#90E0EF]/60 p-4 rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200 group">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-950/80">Partner Nodes</span>
              <Building2 className="h-4 w-4 text-cyan-900/80 group-hover:scale-105 transition-transform" />
            </div>
            <div className="mt-2.5">
              <p className="text-xl font-bold text-slate-950">5 Agencies</p>
              <p className="text-[10px] text-cyan-900/60 font-semibold mt-0.5">
                Unified structural clearance
              </p>
            </div>
          </div>

        </section>

        {/* --- SEARCH, FILTERS & CONTROL PANEL --- */}
        <section className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-sm">
          <div className="flex flex-col lg:flex-row items-center gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-3.5 w-3.5 text-slate-400" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search registry by ID, description, contractor entity, or focal requester..."
                className="w-full h-10 pl-9 pr-3 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-slate-200 focus:border-slate-400 placeholder:text-slate-400"
              />
            </div>

            {/* Category Select Filter */}
            <div className="w-full lg:w-48 flex flex-col gap-1 shrink-0">
              <div className="flex items-center gap-1.5 pl-1">
                <Filter className="h-3 w-3 text-slate-500" />
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Category</span>
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full h-9 bg-white border border-slate-300 rounded-lg px-2 text-xs focus:ring-2 focus:ring-slate-200 focus:border-slate-400 font-semibold text-slate-700"
              >
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Select Filter */}
            <div className="w-full lg:w-44 flex flex-col gap-1 shrink-0">
              <div className="flex items-center gap-1.5 pl-1">
                <Sparkles className="h-3 w-3 text-slate-500" />
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Audit State</span>
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full h-9 bg-white border border-slate-300 rounded-lg px-2 text-xs focus:ring-2 focus:ring-slate-200 focus:border-slate-400 font-semibold text-slate-700"
              >
                <option value="All">All States</option>
                <option value="Pending">Pending Evaluation</option>
                <option value="Approved">Approved / Cleared</option>
                <option value="Revision">Revision Holds</option>
                <option value="Alert">Alert Warnings</option>
              </select>
            </div>

            {/* Quick Metrics Reset Button */}
            {(searchQuery || categoryFilter !== "All" || statusFilter !== "All") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setCategoryFilter("All");
                  setStatusFilter("All");
                }}
                className="w-full lg:w-auto px-4 h-9 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg shrink-0 mt-5 transition-all"
              >
                Clear Filters
              </button>
            )}

          </div>
        </section>

        {/* --- MAIN SPLIT CONTAINER GRID --- */}
        <div className="grid grid-cols-12 gap-5 items-start">
          
          {/* LEFT: Contract Data Grid Table (8 Columns) */}
          <section className="col-span-12 lg:col-span-8 space-y-4">
            <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-sm overflow-hidden">
              
              <div className="px-4 py-3 bg-slate-50/50 border-b border-[#e2e8f0] flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-slate-700">Contract Appraisal Directory</h2>
                  <p className="text-[11px] text-slate-500">Live system view of items matching search constraints.</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-slate-800">
                    Showing {filteredContracts.length} of {contracts.length} records
                  </span>
                </div>
              </div>

              {filteredContracts.length === 0 ? (
                <div className="p-12 text-center text-slate-500 space-y-3">
                  <AlertTriangle className="h-8 w-8 text-slate-400 mx-auto" />
                  <p className="text-sm font-semibold text-slate-700">No clearance tasks matched the query.</p>
                  <p className="text-xs max-w-sm mx-auto">Try widening the category selection filter or clearing the current query parameters.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/30 border-b border-[#e2e8f0] h-10">
                        <th className="pl-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500 w-[100px]">Registry ID</th>
                        <th className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Task Title</th>
                        <th className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Classification</th>
                        <th className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Contractor</th>
                        <th className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Approved Budget</th>
                        <th className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Status</th>
                        <th className="pr-4 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-500">Operations</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredContracts.map((item) => {
                        const isSelected = item.id === selectedId;
                        return (
                          <tr
                            key={item.id}
                            onClick={() => setSelectedId(item.id)}
                            className={`h-12 border-b border-[#e2e8f0]/80 cursor-pointer transition-colors duration-150 ${
                              isSelected ? "bg-[#B8C0FF]/10" : "hover:bg-slate-50/70"
                            }`}
                          >
                            {/* Contract ID */}
                            <td className="pl-4 font-mono text-xs font-bold text-slate-800">
                              <span className="inline-flex items-center gap-1">
                                {item.id}
                                {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-slate-900" />}
                              </span>
                            </td>

                            {/* Title & Requestor */}
                            <td className="max-w-[200px] truncate pr-2">
                              <div className="flex flex-col">
                                <span className="font-semibold text-xs text-slate-900 truncate" title={item.title}>
                                  {item.title}
                                </span>
                                <span className="text-[10px] text-slate-400 truncate">
                                  by {item.requester}
                                </span>
                              </div>
                            </td>

                            {/* Classification Tag */}
                            <td>
                              <div className="flex flex-col">
                                <span className="text-xs font-medium text-slate-700">{item.category}</span>
                                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wide">
                                  {item.type}
                                </span>
                              </div>
                            </td>

                            {/* Contractor Agency */}
                            <td className="text-xs font-medium text-slate-600 truncate max-w-[120px]" title={item.agency}>
                              {item.agency}
                            </td>

                            {/* Approved Budget */}
                            <td className="font-mono text-xs font-semibold text-slate-900">
                              ₹{item.budget.toLocaleString("en-IN")}
                            </td>

                            {/* Custom Pastel Status Pills */}
                            <td>
                              {item.status === "Pending" && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FFD6A5] text-amber-900 border border-[#F9C74F]/45">
                                  Awaiting
                                </span>
                              )}
                              {item.status === "Approved" && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#CDEAC0] text-emerald-950 border border-[#BDE0A8]/45">
                                  Cleared
                                </span>
                              )}
                              {item.status === "Revision" && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#AFCBFF] text-blue-900 border border-[#B8C0FF]/45">
                                  Revision
                                </span>
                              )}
                              {item.status === "Alert" && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FFB4A2] text-red-950 border border-[#F7CAD0]/45">
                                  Flagged
                                </span>
                              )}
                            </td>

                            {/* Quick Action Operations */}
                            <td className="pr-4 text-right" onClick={(e) => e.stopPropagation()}>
                              <div className="inline-flex items-center gap-1">
                                {item.status !== "Approved" && (
                                  <button
                                    onClick={() => handleApprove(item.id)}
                                    className="p-1.5 rounded bg-[#CDEAC0] hover:bg-[#BDE0A8] border border-[#BDE0A8]/55 text-emerald-950 text-xs transition-transform hover:scale-105"
                                    title="Quick Approve Contract"
                                  >
                                    <Check className="h-3.5 w-3.5" />
                                  </button>
                                )}
                                <button
                                  onClick={() => setSelectedId(item.id)}
                                  className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 border border-slate-300/60 text-slate-700 text-xs transition-transform hover:scale-105"
                                  title="View Full Metadata File"
                                >
                                  <ExternalLink className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </section>

          {/* RIGHT: Selected Appraisal File Viewer Panel (4 Columns) */}
          <section className="col-span-12 lg:col-span-4 space-y-4">
            
            {currentSelectedContract ? (
              <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-sm overflow-hidden sticky top-5">
                
                {/* Panel Header */}
                <div className="p-4 bg-slate-50/70 border-b border-[#e2e8f0] flex items-center justify-between">
                  <div>
                    <span className="font-mono text-xs font-bold text-slate-900 bg-slate-200/60 border border-slate-300/40 px-2 py-0.5 rounded-md">
                      {currentSelectedContract.id}
                    </span>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-1">Contractor File Record</p>
                  </div>
                  
                  {/* Miniature Circle Indicator based on status */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-semibold text-slate-600">Current Signoff:</span>
                    {currentSelectedContract.status === "Pending" && <span className="h-3 w-3 rounded-full bg-[#FFD6A5] border border-[#F9C74F]" />}
                    {currentSelectedContract.status === "Approved" && <span className="h-3 w-3 rounded-full bg-[#BDE0A8] border border-[#CDEAC0]" />}
                    {currentSelectedContract.status === "Revision" && <span className="h-3 w-3 rounded-full bg-[#AFCBFF] border border-[#B8C0FF]" />}
                    {currentSelectedContract.status === "Alert" && <span className="h-3 w-3 rounded-full bg-[#FFB4A2] border border-[#F7CAD0]" />}
                  </div>
                </div>

                {/* Content Payload */}
                <div className="p-5 space-y-4">
                  
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 leading-snug">
                      {currentSelectedContract.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {currentSelectedContract.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5 border-t border-b border-slate-100 py-3.5">
                    
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Assigned Agency</span>
                      <div className="flex items-center gap-1.5">
                        <Building2 className="h-3.5 w-3.5 text-slate-500" />
                        <span className="text-xs font-semibold text-slate-700 truncate max-w-[130px]" title={currentSelectedContract.agency}>
                          {currentSelectedContract.agency}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Classification</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-slate-700">
                          {currentSelectedContract.category}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Target Budget</span>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-mono font-bold text-slate-900">
                          ₹{currentSelectedContract.budget.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Filing Timestamp</span>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                        <span className="text-xs font-semibold text-slate-700">
                          {currentSelectedContract.date}
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Submitter Focal Point Details */}
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-3">
                    <div className="h-7 w-7 rounded-full bg-[#AFCBFF] border border-[#B8C0FF] flex items-center justify-center shrink-0">
                      <User className="h-3.5 w-3.5 text-slate-800" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Engineering Focal</span>
                      <p className="text-xs font-semibold text-slate-700">{currentSelectedContract.requester}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">National Exhibition Infrastructure Cell</p>
                    </div>
                  </div>

                  {/* Process Actions & Operations Block */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Authorize Execution Sequence</span>
                    
                    {currentSelectedContract.status === "Pending" ? (
                      <div className="grid grid-cols-2 gap-2">
                        
                        <button
                          onClick={() => handleRequestRevision(currentSelectedContract.id)}
                          className="h-9 px-3 text-xs font-semibold border border-[#B8C0FF]/55 bg-[#AFCBFF]/40 text-blue-950 rounded-lg hover:bg-[#AFCBFF]/60 transition-all hover:-translate-y-[0.5px] flex items-center justify-center gap-1"
                        >
                          Request Revision
                        </button>

                        <button
                          onClick={() => handleApprove(currentSelectedContract.id)}
                          className="h-9 px-3 text-xs font-semibold bg-[#CDEAC0] border border-[#BDE0A8]/60 text-emerald-950 rounded-lg hover:bg-[#BDE0A8] transition-all hover:-translate-y-[0.5px] flex items-center justify-center gap-1"
                        >
                          <Check className="h-3.5 w-3.5" /> Approve File
                        </button>

                        <button
                          onClick={() => handleReject(currentSelectedContract.id)}
                          className="col-span-2 h-9 text-xs font-semibold border border-[#F7CAD0]/50 bg-[#FFB4A2]/30 text-red-950 rounded-lg hover:bg-[#FFB4A2]/60 transition-all hover:-translate-y-[0.5px] flex items-center justify-center gap-1"
                        >
                          <X className="h-3.5 w-3.5" /> Flag / Hold Discrepancies
                        </button>

                      </div>
                    ) : (
                      <div className="p-3 rounded-lg border text-center space-y-1.5 bg-slate-50/50 border-slate-200">
                        <p className="text-xs font-semibold text-slate-700">
                          Appraisal State set to:{" "}
                          <span className="font-bold underline uppercase">{currentSelectedContract.status}</span>
                        </p>
                        <p className="text-[10px] text-slate-500 leading-normal">
                          This entry has been validated and dispatched. Future adjustments must go through standard override logs.
                        </p>
                        <button
                          onClick={() => {
                            setContracts((prev) =>
                              prev.map((c) =>
                                c.id === currentSelectedContract.id ? { ...c, status: "Pending" } : c
                              )
                            );
                            showNotification(`Returned ${currentSelectedContract.id} to Pending queue.`, "info");
                          }}
                          className="mt-1 h-7 px-2.5 text-[10px] font-bold text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-md transition-all"
                        >
                          Reopen Appraisal Queue
                        </button>
                      </div>
                    )}

                  </div>

                </div>

                {/* Cryptographic Compliance Tag */}
                <div className="bg-slate-50 p-2.5 border-t border-[#e2e8f0] flex items-center justify-between text-[10px] text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-slate-400" />
                    <span>Compliance SEC-1910 Verified</span>
                  </div>
                  <span className="font-mono text-[9px]">v1.4.2-Live</span>
                </div>

              </div>
            ) : (
              <div className="p-6 bg-white border border-[#e2e8f0] rounded-xl text-center text-slate-400">
                Select an entry from the directory to view complete appraisal metadata.
              </div>
            )}

            {/* Quick Helper Tip */}
            <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
              <div className="flex gap-2.5 items-start">
                <Info className="h-4 w-4 text-[#B8C0FF] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-slate-800">Operational Guideline Note</h4>
                  <p className="text-[10px] text-slate-500 leading-normal mt-1">
                    Approval actions automatically dispatch financial instructions via webhook mechanisms. Ensure itemized physical site auditing has occurred before clearing the ledger.
                  </p>
                </div>
              </div>
            </div>

          </section>

        </div>

        {/* --- SYSTEM LOG PROTOCOL COMPLIANCE FOOTER --- */}
        <footer className="mt-8 border-t border-slate-200 pt-4 pb-6 text-center text-[11px] text-slate-500">
          <p>
            ITPO India Trade Promotion Organisation &copy; 2025. Consolidated Digital Appraisal Node.
          </p>
          <p className="mt-1.5 text-slate-400">
            Internal Operations Registry. All system signals, transaction payloads, and workflow transitions are cryptographically secured and bound by statutory public procurement protocols.
          </p>
        </footer>

      </main>

    </div>
  );
}