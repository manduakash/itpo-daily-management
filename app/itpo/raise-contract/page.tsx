"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardTitle,
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
} from "lucide-react";

export default function RaiseContractPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);

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
            router.push("/itpo");
        }, 1200);
    };

    return (
        <div className="space-y-12 max-w-4xl mx-auto animate-in fade-in duration-1000 pb-20 font-sans selection:bg-indigo-100 p-10">
            
            {/* Header / Back Action */}
            <div className="flex items-center justify-between">
                <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => router.push("/itpo")}
                    className="h-12 px-6 rounded-2xl border-2 border-slate-200 font-black uppercase tracking-widest text-[9px] text-slate-700 bg-white hover:bg-slate-50 transition-all gap-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Dashboard
                </Button>
                <Badge variant="outline" className="border-2 text-[8px] font-black uppercase tracking-widest px-2.5 py-1.5 border-slate-200 text-slate-500 bg-slate-50">
                    Form Ref: ITPO-CRF-2025
                </Badge>
            </div>

            {/* Main Form Card */}
            <Card className="rounded-[48px] border-none shadow-xl overflow-hidden bg-white">
                <div className="p-10 bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900 text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                    
                    <div className="flex items-center gap-5 relative z-10">
                        <div className="h-14 w-14 rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg">
                            <FileText size={28} className="text-white" />
                        </div>
                        <div className="space-y-1">
                            <CardTitle className="text-2xl font-black uppercase tracking-tight drop-shadow-sm">Raise Infrastructure Contract</CardTitle>
                            <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest leading-none">Define maintenance, repairs, or renovations for delegation to NBCC or Shapoorji</p>
                        </div>
                    </div>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <CardContent className="p-10 space-y-8 relative bg-slate-50/30">
                        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/topography.png')]" />
                        
                        {/* Title Field */}
                        <div className="space-y-2 relative z-10">
                            <label htmlFor="title" className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">
                                Contract Title
                            </label>
                            <input 
                                id="title"
                                type="text"
                                placeholder="e.g., Renovation of Convention Hall 3 & 4 Main Stage"
                                required
                                className="w-full h-12 px-4 rounded-xl border-2 border-slate-200 bg-white text-[10px] font-black uppercase tracking-widest outline-none text-slate-700 focus:border-indigo-400 focus:bg-white transition-all shadow-sm placeholder:text-slate-400"
                            />
                        </div>

                        {/* Side-by-Side: Category & Scale */}
                        <div className="grid gap-6 sm:grid-cols-2 relative z-10">
                            <div className="space-y-2">
                                <label htmlFor="category" className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">
                                    Work Category
                                </label>
                                <select 
                                    id="category"
                                    required
                                    className="w-full h-12 px-4 rounded-xl border-2 border-slate-200 bg-white text-[10px] font-black uppercase tracking-widest outline-none text-slate-700 focus:border-indigo-400 transition-all cursor-pointer shadow-sm hover:border-slate-300"
                                >
                                    <option value="">Select Category...</option>
                                    <option value="civil">General Civil</option>
                                    <option value="mechanical">Mechanical / HVAC</option>
                                    <option value="electrical">Electrical Operations</option>
                                    <option value="plumbing">Plumbing Infrastructure</option>
                                    <option value="amc">AMC / CMC Contract</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="scale" className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">
                                    Estimated Work Scale
                                </label>
                                <select 
                                    id="scale"
                                    required
                                    className="w-full h-12 px-4 rounded-xl border-2 border-slate-200 bg-white text-[10px] font-black uppercase tracking-widest outline-none text-slate-700 focus:border-indigo-400 transition-all cursor-pointer shadow-sm hover:border-slate-300"
                                >
                                    <option value="">Select Scale...</option>
                                    <option value="small">Small Scale (Routine Maintenance)</option>
                                    <option value="medium">Medium Scale (Repair / Overhaul)</option>
                                    <option value="large">Large Scale (Renovation / New Dev)</option>
                                </select>
                            </div>
                        </div>

                        {/* Side-by-Side: Priority & Target Deadline */}
                        <div className="grid gap-6 sm:grid-cols-2 relative z-10">
                            <div className="space-y-2">
                                <label htmlFor="priority" className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">
                                    Priority Level
                                </label>
                                <select 
                                    id="priority"
                                    required
                                    className="w-full h-12 px-4 rounded-xl border-2 border-slate-200 bg-white text-[10px] font-black uppercase tracking-widest outline-none text-slate-700 focus:border-indigo-400 transition-all cursor-pointer shadow-sm hover:border-slate-300"
                                >
                                    <option value="">Select Priority...</option>
                                    <option value="low">Low (Routine Improvements)</option>
                                    <option value="medium">Medium (Standard Maintenance)</option>
                                    <option value="high">High (Time Sensitive)</option>
                                    <option value="critical">Critical (Infrastructure Failure)</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="deadline" className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">
                                    Target Completion Deadline
                                </label>
                                <div className="relative flex">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <input 
                                        id="deadline"
                                        type="date"
                                        required
                                        className="w-full h-12 pl-11 pr-4 rounded-xl border-2 border-slate-200 bg-white text-[10px] font-black uppercase tracking-widest outline-none text-slate-700 focus:border-indigo-400 focus:bg-white transition-all shadow-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Side-by-Side: Raising Target & Building Location */}
                        <div className="grid gap-6 sm:grid-cols-2 relative z-10">
                            <div className="space-y-2">
                                <label htmlFor="raisedFor" className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">
                                    Contract Raised For
                                </label>
                                <select 
                                    id="raisedFor"
                                    required
                                    className="w-full h-12 px-4 rounded-xl border-2 border-slate-200 bg-white text-[10px] font-black uppercase tracking-widest outline-none text-slate-700 focus:border-indigo-400 transition-all cursor-pointer shadow-sm hover:border-slate-300"
                                >
                                    <option value="">Select Allocation...</option>
                                    <option value="nbcc_only">NBCC Only (Direct or Decision PMC)</option>
                                    <option value="both">NBCC & Shapoorji Both (Joint Bidding)</option>
                                    <option value="shapoorji_only">Shapoorji Specific Assignment</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="location" className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">
                                    Building / Site Location
                                </label>
                                <div className="relative flex">
                                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <input 
                                        id="location"
                                        type="text"
                                        placeholder="e.g. Block B, Hall 3 Foyer, Open Plaza"
                                        required
                                        className="w-full h-12 pl-11 pr-4 rounded-xl border-2 border-slate-200 bg-white text-[10px] font-black uppercase tracking-widest outline-none text-slate-700 focus:border-indigo-400 focus:bg-white transition-all shadow-sm placeholder:text-slate-400"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Description Field */}
                        <div className="space-y-2 relative z-10">
                            <label htmlFor="description" className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">
                                Detailed Scope of Work
                            </label>
                            <textarea 
                                id="description"
                                placeholder="Describe technical criteria, dimensions, required certifications, structural specifications..."
                                rows={4}
                                required
                                className="w-full p-4 rounded-xl border-2 border-slate-200 bg-white text-[10px] font-black uppercase tracking-widest outline-none text-slate-700 focus:border-indigo-400 focus:bg-white transition-all shadow-sm placeholder:text-slate-400 min-h-[120px]"
                            />
                        </div>

                        {/* Document Upload field */}
                        <div className="space-y-2 relative z-10">
                            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">
                                Attach Layouts / Technical Specifications
                            </label>
                            <div className="border-2 border-dashed border-slate-300 rounded-[24px] p-8 bg-white flex flex-col items-center justify-center text-center hover:border-indigo-400 transition-all relative cursor-pointer shadow-sm">
                                <input 
                                    type="file" 
                                    id="fileUpload" 
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    accept=".pdf,.doc,.docx,.jpg,.png"
                                />
                                <Upload className="h-10 w-10 text-slate-400 mb-3 group-hover:scale-110 transition-transform" />
                                <span className="text-xs font-black uppercase tracking-widest text-slate-700">
                                    {fileName ? fileName : "Drag & drop files here, or click to browse"}
                                </span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
                                    Supports PDF, DOC, PNG, JPG up to 15MB
                                </span>
                            </div>
                        </div>

                        {/* Safety Disclaimer */}
                        <div className="rounded-[24px] border-2 bg-amber-50 border-amber-200 p-6 flex gap-4 items-start relative z-10 shadow-sm">
                            <AlertCircle className="h-6 w-6 text-amber-600 shrink-0 mt-0.5 animate-pulse" />
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-widest text-amber-800 leading-none">System Dispatch Notice</p>
                                <p className="text-xs text-amber-800 leading-relaxed font-bold">
                                    Raising this contract triggers an automated structural workflow. Allocation parameters automatically broadcast parameters into live PMC/Contractor terminal boards.
                                </p>
                            </div>
                        </div>

                    </CardContent>

                    {/* Footer Actions */}
                    <div className="p-10 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-4 relative z-10">
                        <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => router.push("/itpo")}
                            className="h-14 px-8 rounded-2xl border-2 border-slate-200 font-black uppercase tracking-widest text-[10px] text-slate-700 bg-white hover:bg-slate-50 transition-all shadow-sm"
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit" 
                            disabled={isLoading}
                            className="h-14 px-10 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-black uppercase tracking-widest text-[10px] shadow-lg hover:shadow-indigo-200 transition-all gap-2 border-none"
                        >
                            <PlusCircle className="h-5 w-5" />
                            {isLoading ? "Submitting..." : "Raise Contract"}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}