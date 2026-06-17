"use client";

import React, { useState } from "react";
import { 
  ClipboardCheck, 
  FileCheck, 
  Image as ImageIcon, 
  ShieldCheck, 
  Search, 
  Filter, 
  ArrowRight,
  MoreVertical,
  CheckCircle2,
  Clock,
  AlertCircle,
  Upload,
  Download,
  FileText,
  Eye,
  LayoutGrid,
  Zap
} from "lucide-react";

// Shadcn UI Components
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const textures = {
  mainBg: "https://www.transparenttextures.com/patterns/symphony.png",
  gridBg: "https://www.transparenttextures.com/patterns/graphy.png",
  paperBg: "https://www.transparenttextures.com/patterns/pinstripe-light.png",
  accentBg: "https://www.transparenttextures.com/patterns/carbon-fibre.png",
  bricks: "https://www.transparenttextures.com/patterns/diagonal-striped-brick.png",
  cubes: "https://www.transparenttextures.com/patterns/cubes.png",
};

const completionReports = [
  {
    id: "REP-8821",
    contractId: "CON-772",
    title: "North Wing Facade Completion",
    engineer: "Amit Sharma",
    completionDate: "Oct 24, 2024",
    status: "Pending ITPO Verification",
    images: 12,
    documents: ["QualityCert.pdf", "FinalBOQ.xlsx"],
    complianceScore: 100,
    health: 'stable'
  },
  {
    id: "REP-8805",
    contractId: "CON-901",
    title: "Central Plaza Stone Paving",
    engineer: "Rajesh Kumar",
    completionDate: "Oct 20, 2024",
    status: "Verified & Closed",
    images: 24,
    documents: ["MaterialTest.pdf"],
    complianceScore: 98,
    health: 'stable'
  },
  {
    id: "REP-8790",
    contractId: "CON-104",
    title: "Hall 3 Interior Polishing",
    engineer: "Priya Das",
    completionDate: "Oct 18, 2024",
    status: "Reverted",
    images: 8,
    documents: ["WorkLog.pdf"],
    complianceScore: 85,
    health: 'at-risk'
  }
];

export default function CompletionReports() {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-16 relative font-sans selection:bg-orange-100">
      {/* Background Texture Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03]" 
        style={{ backgroundImage: `url(${textures.mainBg})` }} 
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 mb-12 relative">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border-2 border-slate-800">
              <ShieldCheck size={14} className="text-orange-400" /> Quality Assurance Node
            </div>
            <h1 className="text-6xl font-black text-slate-800 tracking-tighter uppercase leading-none">
              Completion <span className="text-orange-600">Reports</span>
            </h1>
            <p className="text-slate-500 font-medium text-xl italic underline underline-offset-8 decoration-slate-200">
              Shapoorji Pallonji • Handover Documentation & Quality Sign-offs.
            </p>
          </div>
          
          <div className="flex gap-4">
             <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                <input 
                    type="text" 
                    placeholder="Search Report ID..." 
                    className="pl-12 pr-6 h-16 bg-white border-2 border-slate-100 rounded-3xl text-sm font-bold w-72 outline-none focus:border-orange-500 transition-all shadow-sm" 
                />
             </div>
             <Button variant="outline" className="h-16 px-8 rounded-3xl border-2 border-slate-200 font-black uppercase tracking-widest text-[10px] text-slate-700 bg-white shadow-xl hover:bg-slate-50 transition-all">
                <Filter className="h-4 w-4 mr-2" /> Filter Archive
             </Button>
          </div>
        </div>

        {/* --- KPI TILES (ENTERPRISE STYLE) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
                { label: "Total Reports Filed", value: "42", icon: FileCheck, color: "from-indigo-600 to-blue-700" },
                { label: "Awaiting Verification", value: "08", icon: Clock, color: "from-orange-500 to-rose-600" },
                { label: "Avg. Compliance Score", value: "99.4%", icon: ShieldCheck, color: "from-emerald-500 to-teal-600" },
            ].map((stat, i) => (
                <div key={i} className={cn(
                    "group relative p-8 rounded-[32px] overflow-hidden transition-all duration-500 h-44 flex flex-col justify-between shadow-lg hover:shadow-2xl bg-gradient-to-br text-white",
                    stat.color
                )}>
                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `url(${textures.bricks})` }} />
                    <div className="relative z-10 flex flex-col justify-between h-full w-full">
                        <div className="flex items-center justify-between">
                            <div className="h-10 w-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                                <stat.icon size={20} className="text-white drop-shadow-md" />
                            </div>
                            <Zap size={16} className="text-white/50 animate-pulse" />
                        </div>
                        <div>
                            <p className="text-4xl font-black tracking-tighter drop-shadow-sm leading-none">{stat.value}</p>
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-95 mt-2">{stat.label}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* --- REPORTS GRID --- */}
        <div className="space-y-8">
          {completionReports.map((report) => (
            <Card key={report.id} className="rounded-[48px] border-none shadow-xl overflow-hidden bg-white p-0 group hover:shadow-2xl transition-all duration-500">
              <div className="flex flex-col md:flex-row min-h-[220px]">
                {/* Status-based Sidebar Accent */}
                <div className={cn(
                    "w-3 shrink-0 transition-all duration-500",
                    report.status.includes('Verified') ? 'bg-emerald-500' : 
                    report.status.includes('Reverted') ? 'bg-rose-500' : 'bg-orange-500'
                )} />

                {/* Left: Info Section */}
                <div className="p-10 flex-1 relative flex flex-col justify-center">
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url(${textures.paperBg})` }} />
                    <div className="relative z-10 space-y-4">
                        <div className="flex items-center gap-4">
                            <span className="font-mono text-[10px] font-black text-orange-700 tracking-wider bg-orange-50 border border-orange-100 px-3 py-1 rounded-md uppercase">
                                {report.id} • {report.contractId}
                            </span>
                            <Badge variant="outline" className={cn(
                                "text-[9px] font-black uppercase tracking-widest px-3 py-0.5 border-2 rounded-full",
                                report.status.includes('Verified') ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                                report.status.includes('Reverted') ? 'bg-rose-100 text-rose-700 border-rose-200' : 'bg-orange-100 text-orange-700 border-orange-200'
                            )}>
                                {report.status}
                            </Badge>
                        </div>
                        <h3 className="text-3xl font-black text-slate-800 tracking-tight group-hover:text-orange-600 transition-colors uppercase italic leading-none">
                            {report.title}
                        </h3>
                        <div className="flex items-center gap-8">
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-orange-600" />
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Handover: {report.completionDate}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                                <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Compliance Score: {report.complianceScore}%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Center: Evidence Section */}
                <div className="p-10 md:w-80 bg-slate-50/50 border-x border-slate-100 flex flex-col justify-center gap-6 relative">
                    <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `url(${textures.cubes})` }} />
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-xl shadow-sm"><ImageIcon className="h-4 w-4 text-slate-400" /></div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Site Evidence</span>
                        </div>
                        <span className="text-lg font-black text-slate-900 tracking-tighter">{report.images} JPGs</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-xl shadow-sm"><FileText className="h-4 w-4 text-slate-400" /></div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Tech Docs</span>
                        </div>
                        <span className="text-lg font-black text-slate-900 tracking-tighter">{report.documents.length} Files</span>
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="p-10 md:w-72 flex flex-col justify-center gap-3 bg-white">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="h-14 w-full bg-slate-900 hover:bg-black text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] shadow-xl transition-all gap-3">
                                <Eye className="h-4 w-4" /> View Report
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl bg-white rounded-[40px] border-none shadow-2xl p-0 overflow-hidden">
                            <div className="p-8 bg-slate-950 text-white relative">
                                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `url(${textures.accentBg})` }} />
                                <DialogHeader className="relative z-10">
                                    <DialogTitle className="text-2xl font-black uppercase tracking-tight">Audit Summary • {report.id}</DialogTitle>
                                    <p className="text-orange-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Contractor Handover Document</p>
                                </DialogHeader>
                            </div>
                            <div className="p-10 space-y-8">
                                <div className="p-6 rounded-3xl border-2 border-slate-100 bg-slate-50/50 space-y-3">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lead Engineer Remarks</p>
                                    <p className="text-sm text-slate-700 italic font-bold leading-relaxed">"Site clearance and quality benchmarks for {report.title} verified. Final BOQ reconciliation is attached with site-specific adhesive tests."</p>
                                </div>
                                <div className="grid grid-cols-1 gap-3">
                                    {report.documents.map((doc, idx) => (
                                        <div key={idx} className="p-4 rounded-2xl border-2 border-slate-100 flex items-center justify-between group/doc hover:border-orange-200 transition-all">
                                            <div className="flex items-center gap-3">
                                                <FileText className="h-4 w-4 text-orange-600" />
                                                <span className="text-xs font-black text-slate-800 uppercase tracking-tight">{doc}</span>
                                            </div>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors">
                                                <Download className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                    <Button variant="outline" className="h-14 w-full border-2 border-slate-100 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] text-slate-700 hover:bg-slate-50 transition-all">
                        <Download className="h-4 w-4 mr-2" /> PDF Archive
                    </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* --- EMPTY STATE / SUBMISSION ZONE --- */}
        <div className="mt-12 p-16 border-4 border-dashed border-slate-100 rounded-[48px] bg-white flex flex-col items-center justify-center text-center relative overflow-hidden group hover:border-orange-200 hover:bg-orange-50/30 transition-all duration-500 cursor-pointer">
             <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `url(${textures.gridBg})` }} />
             <div className="h-24 w-24 bg-white rounded-3xl shadow-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ring-1 ring-black/5">
                <Upload className="h-10 w-10 text-orange-600" />
             </div>
             <h4 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Initiate Handover Protocol</h4>
             <p className="text-sm text-slate-500 max-w-md mt-3 font-bold uppercase tracking-widest opacity-60">Generate Quality Compliance documentation for finished contracts.</p>
             <button className="mt-10 px-12 h-16 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl hover:bg-black transition-all">
                Select Completed Project
             </button>
        </div>

        {/* --- FOOTER --- */}
        <footer className="mt-24 pt-10 border-t-4 border-slate-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 opacity-40 grayscale hover:grayscale-0 transition-all">
             <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-slate-900 rounded-2xl flex items-center justify-center font-black text-white text-xl shadow-lg">S</div>
                <div className="leading-none text-left">
                    <p className="text-[12px] font-black uppercase tracking-[0.3em]">Shapoorji Pallonji</p>
                    <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-slate-500">Compliance & Audit Division</p>
                </div>
             </div>
             <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-[0.2em]">Compliance Node: SP-QA-2024</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">© 2024 Handover Mgmt Portal • SP-ITPO Quality Node</p>
             </div>
          </div>
        </footer>
      </div>
    </div>
  );
}