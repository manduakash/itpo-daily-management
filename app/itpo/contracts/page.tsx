"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  Tag,
  DollarSign,
  User,
  Shield,
  FileCheck,
  X,
  CheckCircle,
  Clock,
  RotateCcw
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Extended Mock Data for Contracts ───────────────────────────
const INITIAL_CONTRACTS = [
  {
    id: "CON-2041",
    title: "Convention Hall 3 & 4 Renovation",
    category: "General Civil",
    agency: "Shapoorji (Contractor)",
    status: "Work In Progress",
    priority: "High",
    estimation: "₹45,50,000",
    deadline: "2025-11-30",
    focalPerson: "S. K. Bose (Executive Eng.)",
    description: "Full stage structural reinforcement, fire-retardant wall panel installations, and customized acoustic baffling integration."
  },
  {
    id: "CON-2035",
    title: "Main Foyer Restructuring & Plumbing",
    category: "Plumbing",
    agency: "NBCC (PMC)",
    status: "Estimation Submitted",
    priority: "Medium",
    estimation: "₹12,20,000",
    deadline: "2025-12-15",
    focalPerson: "Aarav Sharma (Project Lead)",
    description: "Upgrades to water supply distribution channels, primary utility loop configuration, and high-efficiency fixture fit-outs."
  },
  {
    id: "CON-2022",
    title: "Central AC Chiller Unit Replacement",
    category: "Mechanical/HVAC",
    agency: "NBCC & Shapoorji Both",
    status: "Inspection Pending",
    priority: "Critical",
    estimation: "₹85,00,000",
    deadline: "2025-11-10",
    focalPerson: "Meera Nair (Senior Engineer)",
    description: "Replacing aging central AC systems with modern energy-compliant low-vibration scroll chillers in Block B."
  },
  {
    id: "CON-1980",
    title: "Substation Transformers Calibration",
    category: "Electrical Operations",
    agency: "NBCC (PMC)",
    status: "Approved",
    priority: "High",
    estimation: "₹24,00,000",
    deadline: "2026-01-10",
    focalPerson: "V. K. Rao (Electrical Head)",
    description: "Comprehensive magnetic flux and fluid dielectric evaluations across three substations to clear environmental standard audits."
  },
  {
    id: "CON-1902",
    title: "Administrative Office Rewiring",
    category: "Electrical Operations",
    agency: "Shapoorji (Contractor)",
    status: "Closed",
    priority: "Low",
    estimation: "₹8,50,000",
    deadline: "2024-09-28",
    focalPerson: "Nupur Sen (Facilities Director)",
    description: "Replacement of outdated distribution grids with flame-resistant low-smoke halogen-free (FR-LSH) wiring circuits."
  },
  {
    id: "CON-1855",
    title: "Open Plaza Granite Re-laying",
    category: "General Civil",
    agency: "Shapoorji (Contractor)",
    status: "Closed",
    priority: "Medium",
    estimation: "₹18,00,000",
    deadline: "2024-08-15",
    focalPerson: "Devendra Verma (F&B Liaison)",
    description: "Re-leveling of concrete sub-base and premium granite finish application in VIP parking access ways."
  },
];

// ─── Status Badge Helper (Soft Premium Pastel Palette) ──────────────
function ITPOStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "Raised": "bg-slate-100 text-slate-700 border-slate-200",
    "Under Review": "bg-[#A9D6E5]/20 text-[#0f172a] border-[#90E0EF]/45",
    "Estimation Submitted": "bg-[#E4C1F9]/20 text-[#4E1A6E] border-[#CBC0D3]/45",
    "Approved": "bg-[#CDEAC0]/25 text-[#2d4a22] border-[#BDE0A8]/45",
    "Work In Progress": "bg-[#FFD6A5]/25 text-[#7c4f10] border-[#F9C74F]/45",
    "Inspection Pending": "bg-[#AFCBFF]/25 text-[#1e3a5f] border-[#B8C0FF]/45",
    "Closed": "bg-[#CDEAC0]/25 text-[#2d4a22] border-[#BDE0A8]/45",
  };

  return (
    <Badge 
      variant="outline" 
      className={cn(
        "text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full", 
        styles[status] || styles["Raised"]
      )}
    >
      {status}
    </Badge>
  );
}

// ─── Priority Badge Helper (Pastel Color Mapping) ────────────────────
function PriorityBadge({ priority }: { priority: string }) {
  const styles: Record<string, string> = {
    "Low": "bg-[#A9D6E5]/35 text-[#1c3d5a] border-[#90E0EF]/35",
    "Medium": "bg-[#AFCBFF]/25 text-[#1e3a5f] border-[#B8C0FF]/35",
    "High": "bg-[#FFD6A5]/25 text-[#7c4f10] border-[#F9C74F]/35",
    "Critical": "bg-[#FFB4A2]/30 text-[#7a1a10] border-[#F7CAD0]/40 font-bold",
  };

  return (
    <Badge 
      variant="outline" 
      className={cn(
        "text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full", 
        styles[priority] || styles["Low"]
      )}
    >
      {priority}
    </Badge>
  );
}

// ─── All Contracts Page Component ──────────────────────────────────
export default function AllContractsPage() {
  const router = useRouter();
  
  // --- States ---
  const [contracts, setContracts] = useState(INITIAL_CONTRACTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedId, setSelectedId] = useState<string>("CON-2041");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // --- Handlers ---
  const handleUpdateStatus = (id: string, newStatus: string) => {
    setContracts(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    showToast(`Contract ${id} status updated to ${newStatus}.`);
  };

  const handleUpdatePriority = (id: string, newPriority: string) => {
    setContracts(prev => prev.map(c => c.id === id ? { ...c, priority: newPriority } : c));
    showToast(`Contract ${id} priority adjusted to ${newPriority}.`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleResetSandbox = () => {
    setContracts(INITIAL_CONTRACTS);
    setSelectedId("CON-2041");
    showToast("Filing register reset to administrative default values.");
  };

  // Filtering logic
  const filteredContracts = useMemo(() => {
    return contracts.filter((contract) => {
      const matchesSearch =
        contract.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contract.agency.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contract.focalPerson.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || 
        contract.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesStatus =
        selectedStatus === "all" || 
        contract.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [contracts, searchTerm, selectedCategory, selectedStatus]);

  // Selected item context
  const selectedContract = useMemo(() => {
    return contracts.find(c => c.id === selectedId) || contracts[0];
  }, [contracts, selectedId]);

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-5 space-y-5 bg-[#f8fafc] text-[#0f172a] min-h-screen relative font-sans selection:bg-[#B8C0FF]/40">
      
      {/* Background patterns overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.015] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/topography.png')] opacity-[0.01] pointer-events-none z-0" />

      {/* --- APEX REGISTRY HEADER --- */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#e2e8f0] pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 bg-[#B8C0FF]/15 text-slate-800 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-[#B8C0FF]/30">
            <Briefcase size={12} className="text-slate-700" /> Central Registry Node
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Infrastructure Contract Registry</h1>
          <p className="text-xs text-slate-500">
            Complete active and historical listing of delegated infrastructure deployments in Bharat Mandapam.
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
              Reset Registry
            </Button>
          )}

          <Button 
            variant="outline" 
            size="sm"
            onClick={() => router.push("/itpo")}
            className="h-9 px-3 rounded-lg border border-slate-200 text-xs font-semibold hover:bg-slate-100 transition-all gap-1.5"
          >
            <History size={13} />
            Operations Console
          </Button>

          <Button 
            size="sm"
            onClick={() => router.push("/itpo/raise-contract")}
            className="h-9 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-all hover:-translate-y-[1px] gap-1.5"
          >
            <PlusCircle size={13} />
            Raise New Contract
          </Button>
        </div>
      </div>

      {/* Action confirmation notification */}
      {toastMessage && (
        <div className="relative z-20 p-3 rounded-lg border border-[#B8C0FF] bg-[#AFCBFF]/20 text-slate-950 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
          <FileCheck size={14} className="text-slate-800 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* --- B2. FILTERING CONTROL BAR CARD --- */}
      <section className="relative z-10 bg-white border border-slate-200 rounded-xl shadow-sm p-4">
        <div className="flex flex-col lg:flex-row gap-3 items-center justify-between">
          
          {/* Search field */}
          <div className="relative flex-1 w-full">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-3.5 w-3.5 text-slate-400" />
            </span>
            <input
              type="text"
              placeholder="Search by index, title, contractor, focal person..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 h-10 border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-slate-100 focus:border-slate-400 outline-none transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Selection drop-downs */}
          <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto items-stretch sm:items-center">
            
            <div className="flex items-center gap-1.5 px-1 shrink-0">
              <SlidersHorizontal className="h-3.5 w-3.5 text-slate-500" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Registry Filters</span>
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-9 px-2 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-slate-100 transition-all cursor-pointer outline-none hover:border-slate-400"
            >
              <option value="all">All Categories</option>
              <option value="General Civil">General Civil</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Mechanical/HVAC">Mechanical / HVAC</option>
              <option value="Electrical Operations">Electrical Operations</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="h-9 px-2 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-slate-100 transition-all cursor-pointer outline-none hover:border-slate-400"
            >
              <option value="all">All Statuses</option>
              <option value="Approved">Approved</option>
              <option value="Work In Progress">Work In Progress</option>
              <option value="Inspection Pending">Inspection Pending</option>
              <option value="Estimation Submitted">Estimation Submitted</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>
      </section>

      {/* --- B3. SPLIT MAIN CONTAINER GRID --- */}
      <div className="grid grid-cols-12 gap-5 relative z-10 items-start">
        
        {/* Left Side: Ledger Table Card (8/12 columns) */}
        <div className="col-span-12 lg:col-span-8 space-y-4">
          <Card className="rounded-xl border border-slate-200 shadow-sm overflow-hidden bg-white">
            <CardHeader className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold text-slate-800">Filing Register Ledger</CardTitle>
                <CardDescription className="text-xs text-slate-500">Historical records of sanctioned work items.</CardDescription>
              </div>
              <span className="text-xs font-mono font-bold text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                {filteredContracts.length} Listed Items
              </span>
            </CardHeader>
            
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50/30">
                      <TableHead className="pl-4 h-10 text-[11px] font-semibold uppercase tracking-wider text-slate-500 w-[100px]">Filing ID</TableHead>
                      <TableHead className="h-10 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Title / Category</TableHead>
                      <TableHead className="h-10 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Contractor Node</TableHead>
                      <TableHead className="h-10 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-center">Priority</TableHead>
                      <TableHead className="h-10 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-right">Est. Budget</TableHead>
                      <TableHead className="h-10 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-center">Status</TableHead>
                      <TableHead className="pr-4 h-10 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-right">Verification</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContracts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-10 text-xs text-slate-400 font-semibold uppercase tracking-wider">
                          No matching active contracts inside directory.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredContracts.map((contract) => {
                        const isSelected = contract.id === selectedId;
                        return (
                          <TableRow 
                            key={contract.id} 
                            onClick={() => setSelectedId(contract.id)}
                            className={cn(
                              "h-12 border-b border-slate-200 cursor-pointer transition-colors",
                              isSelected ? "bg-[#B8C0FF]/10 hover:bg-[#B8C0FF]/15" : "hover:bg-slate-50"
                            )}
                          >
                            
                            {/* Contract ID */}
                            <td className="pl-4 font-mono font-bold text-xs text-slate-800">
                              <span className="inline-flex items-center gap-1.5">
                                {contract.id}
                                {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />}
                              </span>
                            </td>

                            {/* Title & Category Class */}
                            <td className="max-w-[200px] truncate pr-2">
                              <div className="flex flex-col">
                                <span className="text-xs font-semibold text-slate-900 truncate" title={contract.title}>
                                  {contract.title}
                                </span>
                                <span className="text-[10px] text-slate-400 font-medium">
                                  {contract.category}
                                </span>
                              </div>
                            </td>

                            {/* Contractor Agency */}
                            <td className="text-xs text-slate-600 truncate max-w-[120px]" title={contract.agency}>
                              <div className="flex items-center gap-1">
                                <Building2 size={12} className="text-slate-400 shrink-0" />
                                <span className="truncate">{contract.agency}</span>
                              </div>
                            </td>

                            {/* Priority Badge Column */}
                            <td className="text-center">
                              <PriorityBadge priority={contract.priority} />
                            </td>

                            {/* Budget Column */}
                            <td className="text-right font-mono text-xs font-bold text-slate-900">
                              {contract.estimation}
                            </td>

                            {/* Status Pill Column */}
                            <td className="text-center">
                              <ITPOStatusBadge status={contract.status} />
                            </td>

                            {/* Actions Column */}
                            <td className="pr-4 text-right" onClick={(e) => e.stopPropagation()}>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedId(contract.id)}
                                className="h-7 px-2 border border-slate-300 hover:border-slate-400 text-slate-700 text-[11px] font-semibold rounded-lg gap-1 transition-all hover:-translate-y-[0.5px]"
                              >
                                <span>Inspect</span>
                                <ArrowUpRight size={10} />
                              </Button>
                            </td>

                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Contract Inspector Details Card (4/12 columns) */}
        <div className="col-span-12 lg:col-span-4 sticky top-5 space-y-4">
          
          {selectedContract ? (
            <Card className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
              
              <div className="p-4 bg-slate-50/70 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-slate-900 bg-slate-200/50 border border-slate-300/30 px-2 py-0.5 rounded-md">
                    {selectedContract.id}
                  </span>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mt-1">Registry Appraisal Record</p>
                </div>
                <ITPOStatusBadge status={selectedContract.status} />
              </div>

              <div className="p-4 space-y-4">
                
                {/* Info Block */}
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">{selectedContract.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1">{selectedContract.description}</p>
                </div>

                {/* Metadata properties */}
                <div className="grid grid-cols-2 gap-3.5 border-t border-b border-slate-100 py-3">
                  
                  <div className="space-y-0.5">
                    <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Sanctioned Value</span>
                    <div className="flex items-center gap-1 font-mono text-xs font-bold text-slate-900">
                      <DollarSign size={11} className="text-slate-400" />
                      <span>{selectedContract.estimation}</span>
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Target Deadline</span>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                      <Calendar size={12} className="text-slate-400" />
                      <span>{selectedContract.deadline}</span>
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Commissioned PMC</span>
                    <span className="text-xs font-semibold text-slate-700 block truncate" title={selectedContract.agency}>
                      {selectedContract.agency}
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Filing Priority</span>
                    <div className="pt-0.5">
                      <PriorityBadge priority={selectedContract.priority} />
                    </div>
                  </div>

                </div>

                {/* Focal contact person details */}
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2.5">
                  <User size={14} className="text-slate-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">ITPO Secretariat Liaison</span>
                    <p className="text-xs font-bold text-slate-700">{selectedContract.focalPerson}</p>
                    <p className="text-[10px] text-slate-500">Liaison and Physical Audit Supervisor</p>
                  </div>
                </div>

                {/* Dynamic State Modifiers (Pastel Theme) */}
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">State Overrides</span>
                  
                  <div className="grid grid-cols-2 gap-2">
                    
                    {/* Status Promoters */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Advance Status</label>
                      <select
                        value={selectedContract.status}
                        onChange={(e) => handleUpdateStatus(selectedContract.id, e.target.value)}
                        className="h-8 rounded-lg border border-slate-300 bg-white text-[11px] font-semibold text-slate-700 px-1 outline-none focus:ring-1 focus:ring-slate-300"
                      >
                        <option value="Work In Progress">Work In Progress</option>
                        <option value="Estimation Submitted">Estimation Submitted</option>
                        <option value="Approved">Approved</option>
                        <option value="Inspection Pending">Inspection Pending</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>

                    {/* Priority Promoters */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Change Priority</label>
                      <select
                        value={selectedContract.priority}
                        onChange={(e) => handleUpdatePriority(selectedContract.id, e.target.value)}
                        className="h-8 rounded-lg border border-slate-300 bg-white text-[11px] font-semibold text-slate-700 px-1 outline-none focus:ring-1 focus:ring-slate-300"
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                      </select>
                    </div>

                  </div>

                </div>

              </div>

              {/* Security tag footer */}
              <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500 font-medium">
                <span className="inline-flex items-center gap-1">
                  <Shield size={12} className="text-slate-400" />
                  NIC Standard Sanction
                </span>
                <span className="font-mono text-[9px]">ID: 025/AUD</span>
              </div>

            </Card>
          ) : (
            <div className="p-6 bg-white border border-slate-200 rounded-xl text-center text-slate-400 text-xs font-semibold">
              Select an ongoing work profile from the ledger to load structural parameters.
            </div>
          )}

          {/* Context Audit Alert */}
          <div className="bg-[#E4C1F9]/15 border border-[#CBC0D3]/60 p-4 rounded-xl flex items-start gap-2.5 shadow-xs">
            <Clock size={14} className="text-purple-800 mt-0.5 shrink-0 animate-spin-slow" />
            <div>
              <h5 className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">Statutory Clearance Protocol</h5>
              <p className="text-[10px] text-slate-500 leading-normal mt-0.5">
                Modifications of target thresholds or approved budgets require verification logs signed with executive level cryptographic credentials.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* --- B4. COMPACT FOOTER --- */}
      <footer className="pt-4 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-400 font-medium px-1">
        <span>Showing {filteredContracts.length} of {contracts.length} Records</span>
        <span>India Trade Promotion Organisation Central Registry Terminal</span>
      </footer>

    </div>
  );
}