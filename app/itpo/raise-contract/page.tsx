"use client";

import React, { useState } from "react";
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
import {
  Upload,
  ArrowLeft,
  PlusCircle,
  Building2,
  FileText,
  Calendar,
  AlertCircle,
  DollarSign,
  Briefcase,
  Check,
  RotateCcw
} from "lucide-react";

export default function RaiseContractPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form states for simulation
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [scale, setScale] = useState("");
  const [priority, setPriority] = useState("");
  const [deadline, setDeadline] = useState("");
  const [raisedFor, setRaisedFor] = useState("");
  const [location, setLocation] = useState("");
  const [estimatedBudget, setEstimatedBudget] = useState("");
  const [description, setDescription] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API execution
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const handleResetForm = () => {
    setTitle("");
    setCategory("");
    setScale("");
    setPriority("");
    setDeadline("");
    setRaisedFor("");
    setLocation("");
    setEstimatedBudget("");
    setDescription("");
    setFileName(null);
    setIsSubmitted(false);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-5 space-y-5  text-[#0f172a] min-h-screen relative font-sans selection:bg-[#B8C0FF]/40">
      
      {/* Background textures overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.015] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/topography.png')] opacity-[0.01] pointer-events-none z-0" />

      {/* --- PAGE HEADER ACTION BAR --- */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#e2e8f0] pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <span>Central Secretariat</span>
            <span>/</span>
            <span>Contract Delegation</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Raise Infrastructure Work Order</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => router.push("/itpo")}
            className="h-9 px-3.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-all hover:-translate-y-[0.5px] gap-1.5"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Dashboard
          </Button>
          
          <Badge variant="outline" className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 border-slate-300 text-slate-500 bg-slate-50 rounded-full">
            Form Ref: ITPO-CRF-2025
          </Badge>
        </div>
      </div>

      {/* SUCCESS SIMULATOR BANNER */}
      {isSubmitted && (
        <div className="relative z-10 p-4 rounded-xl border border-[#BDE0A8] bg-[#CDEAC0]/20 text-slate-900 flex items-center justify-between animate-in fade-in duration-300">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-[#CDEAC0] flex items-center justify-center border border-[#BDE0A8]">
              <Check className="h-4 w-4 text-emerald-950" />
            </div>
            <div>
              <p className="text-xs font-bold">Filing Registry Dispatched</p>
              <p className="text-[11px] text-slate-600">The infrastructure proposal has been registered. Parameters are broadcast into live PMC boards.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleResetForm}
              className="h-8 text-xs font-semibold border-slate-300 hover:bg-slate-100"
            >
              Raise Another
            </Button>
            <Button
              size="sm"
              onClick={() => router.push("/itpo")}
              className="h-8 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white"
            >
              Go to Registry
            </Button>
          </div>
        </div>
      )}

      {/* --- FORM CONTAINER --- */}
      <Card className="relative z-10 rounded-xl border border-slate-200 shadow-sm overflow-hidden bg-white">
        
        {/* Card Executive Branding */}
        <CardHeader className="p-5 border-b border-slate-200 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-[#E4C1F9] border border-[#CBC0D3]/60 flex items-center justify-center">
              <FileText size={18} className="text-[#4E1A6E]" />
            </div>
            <div>
              <CardTitle className="text-sm font-semibold text-slate-700">Contract Allocation Manifest</CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Define structural parameters, budgets, and priority scales for delegation to partners.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="p-5 space-y-5">

            {/* SECTION 1: CORE WORK ORDER PARAMETERS (4 INPUTS IN A SINGLE LINE) */}
            <div className="space-y-1.5">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Section A: Core Parameters</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* 1. Contract Title */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="title" className="text-xs font-medium text-slate-600">
                    Contract Title
                  </label>
                  <input 
                    id="title"
                    type="text"
                    placeholder="e.g. Renovation of Hall Stage"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="h-10 px-3 border border-slate-300 bg-white rounded-lg text-sm focus:ring-2 focus:ring-slate-200 focus:border-slate-400 outline-none transition-all placeholder:text-slate-400"
                  />
                </div>

                {/* 2. Work Category */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="category" className="text-xs font-medium text-slate-600">
                    Work Category
                  </label>
                  <select 
                    id="category"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="h-10 px-2 border border-slate-300 bg-white rounded-lg text-sm focus:ring-2 focus:ring-slate-200 focus:border-slate-400 outline-none transition-all cursor-pointer font-semibold text-slate-700"
                  >
                    <option value="">Select Category...</option>
                    <option value="civil">General Civil</option>
                    <option value="mechanical">Mechanical / HVAC</option>
                    <option value="electrical">Electrical Operations</option>
                    <option value="plumbing">Plumbing Infrastructure</option>
                    <option value="amc">AMC / CMC Contract</option>
                  </select>
                </div>

                {/* 3. Work Scale */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="scale" className="text-xs font-medium text-slate-600">
                    Estimated Work Scale
                  </label>
                  <select 
                    id="scale"
                    required
                    value={scale}
                    onChange={(e) => setScale(e.target.value)}
                    className="h-10 px-2 border border-slate-300 bg-white rounded-lg text-sm focus:ring-2 focus:ring-slate-200 focus:border-slate-400 outline-none transition-all cursor-pointer font-semibold text-slate-700"
                  >
                    <option value="">Select Scale...</option>
                    <option value="small">Small Scale (Routine Maintenance)</option>
                    <option value="medium">Medium Scale (Repair / Overhaul)</option>
                    <option value="large">Large Scale (Renovation / New Dev)</option>
                  </select>
                </div>

                {/* 4. Priority Level */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="priority" className="text-xs font-medium text-slate-600">
                    Priority Level
                  </label>
                  <select 
                    id="priority"
                    required
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="h-10 px-2 border border-slate-300 bg-white rounded-lg text-sm focus:ring-2 focus:ring-slate-200 focus:border-slate-400 outline-none transition-all cursor-pointer font-semibold text-slate-700"
                  >
                    <option value="">Select Priority...</option>
                    <option value="low">Low (Routine Improvements)</option>
                    <option value="medium">Medium (Standard Maintenance)</option>
                    <option value="high">High (Time Sensitive)</option>
                    <option value="critical">Critical (Infrastructure Failure)</option>
                  </select>
                </div>

              </div>
            </div>

            {/* SECTION 2: ALLOCATION & TARGETS (4 INPUTS IN A SINGLE LINE) */}
            <div className="space-y-1.5 pt-2">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Section B: Allocations & Targets</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                {/* 5. Target Deadline */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="deadline" className="text-xs font-medium text-slate-600">
                    Target Completion Deadline
                  </label>
                  <div className="relative flex">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                    <input 
                      id="deadline"
                      type="date"
                      required
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      className="w-full h-10 pl-9 pr-3 border border-slate-300 bg-white rounded-lg text-sm focus:ring-2 focus:ring-slate-200 focus:border-slate-400 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* 6. Contract Raised For */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="raisedFor" className="text-xs font-medium text-slate-600">
                    Allocated Agency PMC
                  </label>
                  <select 
                    id="raisedFor"
                    required
                    value={raisedFor}
                    onChange={(e) => setRaisedFor(e.target.value)}
                    className="h-10 px-2 border border-slate-300 bg-white rounded-lg text-sm focus:ring-2 focus:ring-slate-200 focus:border-slate-400 outline-none transition-all cursor-pointer font-semibold text-slate-700"
                  >
                    <option value="">Select Allocation...</option>
                    <option value="nbcc_only">NBCC Only (Direct PMC)</option>
                    <option value="both">NBCC & Shapoorji Both (Joint Bidding)</option>
                    <option value="shapoorji_only">Shapoorji Specific Assignment</option>
                  </select>
                </div>

                {/* 7. Site Location */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="location" className="text-xs font-medium text-slate-600">
                    Building / Location Site
                  </label>
                  <div className="relative flex">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                    <input 
                      id="location"
                      type="text"
                      placeholder="e.g. Block B, Hall 3 Foyer"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full h-10 pl-9 pr-3 border border-slate-300 bg-white rounded-lg text-sm focus:ring-2 focus:ring-slate-200 focus:border-slate-400 outline-none transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* 8. Estimated Value */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="budget" className="text-xs font-medium text-slate-600">
                    Sanctioned Budget (INR)
                  </label>
                  <div className="relative flex">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                    <input 
                      id="budget"
                      type="text"
                      placeholder="e.g. 4500000"
                      required
                      value={estimatedBudget}
                      onChange={(e) => setEstimatedBudget(e.target.value)}
                      className="w-full h-10 pl-9 pr-3 border border-slate-300 bg-white rounded-lg text-sm font-mono focus:ring-2 focus:ring-slate-200 focus:border-slate-400 outline-none transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* SECTION 3: WORK SCOPE & SPECIFICATIONS (FULL WIDTH TEXTAREA) */}
            <div className="flex flex-col gap-1.5 pt-2">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Section C: Technical Specifications</h3>
              <div className="flex flex-col gap-1">
                <label htmlFor="description" className="text-xs font-medium text-slate-600">
                  Detailed Scope of Work
                </label>
                <textarea 
                  id="description"
                  placeholder="Describe electrical metrics, architectural parameters, certified material requirements, and explicit structural standards..."
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 border border-slate-300 bg-white rounded-lg text-sm outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-400 transition-all placeholder:text-slate-400 min-h-[90px]"
                />
              </div>
            </div>

            {/* SECTION 4: FILE UPLOAD AREA (SOFT SUPPORTING PASTEL BLUE STYLE) */}
            <div className="flex flex-col gap-1.5 pt-2">
              <label className="text-xs font-medium text-slate-600">
                Attach Layouts & Technical Designs
              </label>
              
              <div className="border border-dashed border-[#90E0EF] rounded-lg p-5 bg-[#A9D6E5]/10 flex flex-col items-center justify-center text-center hover:bg-[#A9D6E5]/15 transition-all relative cursor-pointer group">
                <input 
                  type="file" 
                  id="fileUpload" 
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept=".pdf,.doc,.docx,.jpg,.png"
                />
                <Upload className="h-7 w-7 text-[#1c4e5e] mb-2 group-hover:scale-105 transition-transform duration-200" />
                <span className="text-xs font-semibold text-slate-800">
                  {fileName ? fileName : "Drag and drop layouts here, or click to browse files"}
                </span>
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mt-1">
                  PDF, DOC, PNG, JPG up to 15MB
                </span>
              </div>
            </div>

            {/* SECTION 5: STATUTORY POLICY NOTICE (SOFT PASTEL PENDING REVIEW BACKGROUND) */}
            <div className="rounded-lg border border-[#F9C74F]/50 bg-[#FFD6A5]/15 p-4 flex gap-3 items-start shadow-xs">
              <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-800">Automated System Dispatch Notice</p>
                <p className="text-xs text-slate-600 leading-normal">
                  Filing this manifest triggers automated workflow instances. Work scales and budget parameters are instantly broadcasted to the respective contractor nodes in the ITPO registry system.
                </p>
              </div>
            </div>

          </CardContent>

          {/* CARD FOOTER OPERATIONS */}
          <div className="p-4 border-t border-slate-200 bg-slate-50/50 flex justify-end gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => router.push("/itpo")}
              className="h-10 px-4 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-all shadow-xs"
            >
              Cancel
            </Button>
            
            <Button 
              type="submit" 
              disabled={isLoading || isSubmitted}
              className="h-10 px-5 rounded-lg bg-slate-900 text-white hover:bg-slate-850 font-semibold text-xs transition-all hover:-translate-y-[1px] gap-1.5 shadow-sm"
            >
              <PlusCircle className="h-4 w-4" />
              {isLoading ? "Broadcasting Entry..." : "Raise Manifest Proposal"}
            </Button>
          </div>

        </form>

      </Card>

      {/* --- PAGE FOOTER --- */}
      <footer className="pt-4 border-t border-slate-200 text-center text-[10px] text-slate-400 font-medium">
        <span>Filing Portal • India Trade Promotion Organisation • National Secretariat System Node</span>
      </footer>

    </div>
  );
}