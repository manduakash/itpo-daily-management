"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ClipboardCheck, 
  ShieldAlert, 
  FileText, 
  Download, 
  Eye, 
  Filter, 
  Search, 
  PlusCircle,
  CheckCircle2,
  AlertCircle,
  FileBarChart,
  HardHat,
  Ruler,
  TrendingUp,
  Building2,
  ChevronRight,
  ArrowUpRight
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Status & Severity Badge Helpers ───────────────────────────────
function ReportStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "Approved": "bg-emerald-100 text-emerald-700 border-emerald-200",
    "Pending ITPO": "bg-amber-100 text-amber-700 border-amber-200",
    "Draft": "bg-slate-100 text-slate-700 border-slate-200",
  };
  return (
    <Badge variant="outline" className={cn("text-[9px] font-black uppercase tracking-widest px-3 py-0.5 border-2 rounded-full", styles[status])}>
      {status}
    </Badge>
  );
}

function SeverityBadge({ level }: { level: string }) {
  const styles: Record<string, string> = {
    "High": "text-rose-600 bg-rose-50 border-rose-100",
    "Normal": "text-indigo-600 bg-indigo-50 border-indigo-100",
    "Low": "text-slate-500 bg-slate-50 border-slate-100",
  };
  return (
    <span className={cn("text-[8px] font-black uppercase tracking-tighter px-2 py-0.5 rounded border", styles[level])}>
      {level} Priority
    </span>
  );
}

// ─── Mock Data ───────────────────────────────────────────────────
const reports = [
  { id: "REP-9921", title: "Structural Integrity Audit - Hall 1", type: "Quality Check", date: "24 Oct 2024", status: "Approved", severity: "Normal", author: "Engr. Rajesh Kumar" },
  { id: "REP-8832", title: "Electrical Safety & Fire Compliance", type: "Safety Audit", date: "22 Oct 2024", status: "Pending ITPO", severity: "High", author: "Engr. Amit Sharma" },
  { id: "REP-7745", title: "Plumbing Pressure Test Report", type: "Technical Report", date: "20 Oct 2024", status: "Draft", severity: "Normal", author: "Engr. Sumit Das" },
  { id: "REP-6651", title: "HVAC Duct Alignment Verification", type: "Quality Check", date: "18 Oct 2024", status: "Approved", severity: "Low", author: "Engr. Rajesh Kumar" }
];

export default function SiteReportPage() {
  const [activeTab, setActiveTab] = useState("All Reports");

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-20 font-sans selection:bg-indigo-100 p-10">
      
      {/* APEX SECRETARIAT HEADER */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 relative">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-2 border-indigo-200">
            <ClipboardCheck size={14} className="animate-pulse" /> Compliance & Quality
          </div>
          <h1 className="text-6xl font-black text-slate-800 tracking-tighter uppercase leading-none">Inspection <span className="text-indigo-600">Ledger</span></h1>
          <p className="text-slate-500 font-medium text-xl italic underline underline-offset-8 decoration-indigo-200">
            Formal verification, safety audits, and structural compliance documentation.
          </p>
        </div>

        <div className="flex gap-4">
          <div className="relative hidden lg:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="SEARCH AUDITS..." 
              className="h-16 pl-12 pr-6 rounded-3xl border-2 border-slate-100 font-black uppercase tracking-widest text-[10px] bg-white shadow-xl focus:outline-none focus:border-indigo-300 w-64 transition-all"
            />
          </div>
          <Button 
            className="h-16 px-10 rounded-3xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-black uppercase tracking-widest text-[10px] shadow-2xl hover:shadow-[0_0_20px_theme(colors.indigo.400)] transition-all gap-2 group border-none"
          >
            <PlusCircle size={20} className="text-indigo-100" /> Create New Report
          </Button>
        </div>
      </div>

      {/* ACTION INDICATOR TILES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Reports Filed", value: "128", subtitle: "Total Archive", icon: FileBarChart, color: "from-blue-500 to-indigo-600" },
          { title: "Quality Score", value: "94%", subtitle: "Field Compliance", icon: Ruler, color: "from-emerald-500 to-teal-600" },
          { title: "Open Issues", value: "06", subtitle: "Immediate Action", icon: ShieldAlert, color: "from-rose-500 to-orange-600", alert: true }
        ].map((item, i) => (
          <div key={i} className={`group relative p-8 rounded-[32px] overflow-hidden transition-all duration-500 h-44 flex flex-col justify-between shadow-lg bg-gradient-to-br ${item.color} text-white`}>
            <div className="absolute inset-0 opacity-90 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/diagonal-striped-brick.png')]" />
            <div className="relative z-10 flex flex-col justify-between h-full w-full">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-inner">
                  <item.icon size={20} className="text-white drop-shadow-md" />
                </div>
                {item.alert && <div className="h-2.5 w-2.5 rounded-full bg-white animate-ping shadow-[0_0_10px_white]" />}
              </div>
              <div>
                <p className="text-4xl font-black tracking-tighter drop-shadow-sm leading-none">{item.value}</p>
                <div className="flex flex-col gap-0.5 mt-2">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-95 leading-tight">{item.title}</p>
                  <p className="text-[9px] font-medium opacity-75 uppercase tracking-wider leading-none">{item.subtitle}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        
        {/* LEFT SIDEBAR: FILTERS */}
        <div className="lg:col-span-1 space-y-8">
          <Card className="rounded-[40px] border-none shadow-xl bg-white overflow-hidden p-8 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2">
              <Filter size={14} /> Category Filter
            </h4>
            <div className="space-y-2">
              {["All Reports", "Quality Checks", "Safety Audits", "Pending Review", "Drafts"].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "w-full text-left px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2",
                    activeTab === tab ? "bg-slate-900 text-white border-slate-900 shadow-xl" : "bg-white text-slate-400 border-slate-50 hover:border-slate-100"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </Card>

          <Card className="rounded-[40px] border-none shadow-xl bg-slate-900 text-white overflow-hidden p-8 relative group">
             <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
             <div className="relative z-10 space-y-6">
                <TrendingUp className="text-indigo-400" size={24} />
                <div>
                  <h4 className="text-sm font-black uppercase tracking-tight">Compliance Rate</h4>
                  <p className="text-[9px] text-slate-500 mt-1 uppercase font-bold tracking-[0.2em]">Target Metric: 98%</p>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-black tracking-tighter">96.2%</span>
                  <span className="text-[10px] text-emerald-400 font-black">+2.1% ▲</span>
                </div>
                {/* <Progress value={96} className="h-1.5 bg-white/10 [&>div]:bg-indigo-500" /> */}
             </div>
          </Card>
        </div>

        {/* RIGHT: THE REPORTS LEDGER */}
        <div className="lg:col-span-3">
          <Card className="rounded-[48px] border-none shadow-xl overflow-hidden bg-white">
            <CardHeader className="p-0">
              <div className="p-8 bg-gradient-to-r from-slate-800 to-indigo-950 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                <div className="flex justify-between items-center relative z-10 px-4">
                  <div className="flex items-center gap-4">
                    <FileText className="text-indigo-400" />
                    <CardTitle className="text-lg font-black uppercase tracking-widest">Master Report Ledger</CardTitle>
                  </div>
                  <Button variant="ghost" className="text-[9px] font-black text-indigo-300 uppercase tracking-widest">Download Archive</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 bg-slate-50/30">
              <div className="space-y-4">
                {reports.map((report) => (
                  <div 
                    key={report.id} 
                    className="p-8 rounded-[32px] bg-white border-2 border-slate-50 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300 flex flex-col md:flex-row items-center gap-8 group"
                  >
                    <div className="h-16 w-16 bg-slate-50 rounded-3xl flex items-center justify-center shrink-0 border-2 border-slate-100 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
                      {report.type === "Safety Audit" ? <ShieldAlert className="text-rose-500" /> : <FileText className="text-indigo-600" />}
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] font-black text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">{report.id}</span>
                        <SeverityBadge level={report.severity} />
                      </div>
                      <h3 className="text-xl font-black uppercase tracking-tight text-slate-800 leading-tight pt-1">{report.title}</h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{report.type} • AUTHORED BY {report.author}</p>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-3 shrink-0">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{report.date}</span>
                      <ReportStatusBadge status={report.status} />
                    </div>

                    <div className="flex gap-2 pl-6 border-l-2 border-slate-50">
                      <Button size="icon" variant="ghost" className="h-12 w-12 rounded-2xl bg-slate-50 hover:bg-indigo-600 hover:text-white transition-all">
                        <Eye size={18} />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-12 w-12 rounded-2xl bg-slate-50 hover:bg-slate-900 hover:text-white transition-all">
                        <Download size={18} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-8 flex justify-center">
                <Button variant="ghost" className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-indigo-600 gap-2">
                  Load Full Report Archive <ChevronRight size={14} />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}