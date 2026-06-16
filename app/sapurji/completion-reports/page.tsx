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
  Eye
} from "lucide-react";

// Shadcn UI simulated components
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

const textures = {
  mainBg: "https://www.transparenttextures.com/patterns/symphony.png",
  gridBg: "https://www.transparenttextures.com/patterns/graphy.png",
  paperBg: "https://www.transparenttextures.com/patterns/pinstripe-light.png",
  accentBg: "https://www.transparenttextures.com/patterns/carbon-fibre.png",
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
    complianceScore: 100
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
    complianceScore: 98
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
    complianceScore: 85
  }
];

export default function CompletionReports() {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-10 relative">
      {/* Subtle Background Texture */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03]" 
        style={{ backgroundImage: `url(${textures.mainBg})` }} 
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 bg-slate-900 flex items-center justify-center rounded-xl shadow-lg">
                <ClipboardCheck className="text-orange-500 h-6 w-6" />
              </div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">
                Completion <span className="text-orange-600">Reports</span>
              </h1>
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Handover documentation and quality sign-offs</p>
          </div>
          
          <div className="flex gap-3">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input type="text" placeholder="Search report ID..." className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm w-64 outline-none focus:ring-2 focus:ring-orange-500" />
             </div>
             <Button variant="outline" className="rounded-xl bg-white border-slate-200">
                <Filter className="h-4 w-4 mr-2" /> Filter
             </Button>
          </div>
        </div>

        {/* Top Summary Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `url(${textures.gridBg})` }} />
                <div>
                    <p className="text-2xl font-black text-slate-900">42</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Reports Filed</p>
                </div>
                <div className="h-12 w-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-600">
                    <FileCheck className="h-6 w-6" />
                </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `url(${textures.gridBg})` }} />
                <div>
                    <p className="text-2xl font-black text-slate-900">08</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Awaiting Verification</p>
                </div>
                <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                    <Clock className="h-6 w-6" />
                </div>
            </div>
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-200 shadow-lg flex items-center justify-between relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `url(${textures.accentBg})` }} />
                <div>
                    <p className="text-2xl font-black text-white">99.4%</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Avg. Compliance Score</p>
                </div>
                <div className="h-12 w-12 bg-white/10 rounded-full flex items-center justify-center text-emerald-500">
                    <ShieldCheck className="h-6 w-6" />
                </div>
            </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 gap-6">
          {completionReports.map((report) => (
            <Card key={report.id} className="border-slate-200 bg-white group hover:border-orange-500 transition-all duration-300 relative overflow-hidden">
               {/* Vertical Status Accent */}
               <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                  report.status.includes('Verified') ? 'bg-emerald-500' : 
                  report.status.includes('Reverted') ? 'bg-red-500' : 'bg-orange-500'
               }`} />
               
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                    {/* Left: Info Section */}
                    <div className="p-6 flex-1 relative">
                        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `url(${textures.paperBg})` }} />
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                                    {report.id} / {report.contractId}
                                </span>
                                <Badge variant="outline" className={`text-[9px] font-black uppercase tracking-wider ${
                                    report.status.includes('Verified') ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                    report.status.includes('Reverted') ? 'bg-red-50 text-red-600 border-red-100' : 'bg-orange-50 text-orange-600 border-orange-100'
                                }`}>
                                    {report.status}
                                </Badge>
                            </div>
                            <h3 className="text-xl font-black text-slate-900 group-hover:text-orange-600 transition-colors">{report.title}</h3>
                            <div className="flex items-center gap-6 mt-4">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                                    <span className="text-xs font-bold text-slate-500">Completed: {report.completionDate}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                                    <span className="text-xs font-bold text-slate-500">Score: {report.complianceScore}%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Center: Evidence Section */}
                    <div className="p-6 md:w-72 bg-slate-50/50 border-x border-slate-100 flex flex-col justify-center gap-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-slate-600">
                                <ImageIcon className="h-4 w-4" />
                                <span className="text-xs font-bold uppercase tracking-tight">Site Images</span>
                            </div>
                            <span className="text-xs font-black text-slate-900">{report.images}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-slate-600">
                                <FileText className="h-4 w-4" />
                                <span className="text-xs font-bold uppercase tracking-tight">Docs Filed</span>
                            </div>
                            <span className="text-xs font-black text-slate-900">{report.documents.length}</span>
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="p-6 md:w-56 flex flex-col justify-center gap-2">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs uppercase tracking-widest h-10">
                                    <Eye className="h-4 w-4 mr-2" /> View Report
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl bg-white rounded-3xl">
                                <DialogHeader>
                                    <DialogTitle>Completion Summary - {report.id}</DialogTitle>
                                </DialogHeader>
                                <div className="p-4 space-y-4">
                                    <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 space-y-2">
                                        <p className="text-xs font-bold text-slate-400 uppercase">Engineer Remarks</p>
                                        <p className="text-sm text-slate-700 italic font-medium">"Final site clearing and granite polishing completed as per section 4B of contract. Quality tests for stone adhesive passed."</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {report.documents.map((doc, idx) => (
                                            <div key={idx} className="p-3 rounded-lg border border-slate-200 flex items-center justify-between">
                                                <span className="text-xs font-bold text-slate-600 truncate">{doc}</span>
                                                <Download className="h-4 w-4 text-orange-500 cursor-pointer" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                        <Button variant="outline" className="w-full border-slate-200 rounded-xl font-bold text-xs uppercase tracking-widest h-10">
                            Download Archive
                        </Button>
                    </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State / Bottom Action */}
        <div className="mt-8 p-10 border-2 border-dashed border-slate-200 rounded-[2.5rem] bg-white flex flex-col items-center justify-center text-center relative overflow-hidden group hover:border-orange-500 transition-all">
             <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `url(${textures.gridBg})` }} />
             <div className="h-16 w-16 bg-orange-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Upload className="h-8 w-8 text-orange-600" />
             </div>
             <h4 className="text-lg font-black text-slate-900">File New Completion Report</h4>
             <p className="text-sm text-slate-500 max-w-md mt-2 font-medium">Select a project that has finished execution to begin the handover documentation process.</p>
             <button className="mt-6 px-10 py-3 bg-orange-600 text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-orange-100 hover:bg-orange-700 transition-all">
                Select Project
             </button>
        </div>

        {/* Footer */}
        <footer className="mt-20 pb-10 flex justify-between items-center opacity-40">
            <div className="flex items-center gap-3">
                <div className="h-6 w-6 bg-slate-900 rounded text-white flex items-center justify-center font-black text-[10px]">S</div>
                <p className="text-[10px] font-black uppercase tracking-widest">Shapoorji Pallonji Compliance Division</p>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest tracking-tighter italic">Ref: HANDOVER-MGMT-2024</p>
        </footer>
      </div>
    </div>
  );
}