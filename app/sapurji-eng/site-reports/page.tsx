"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Search, 
  Download, 
  Filter, 
  Calendar, 
  MapPin, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck,
  Zap,
  Eye,
  Share2,
  FileSearch,
  Building2,
  User,
  Activity,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Status Badge Helper ──────────────────────────────────────────
function ReportStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "Verified": "bg-emerald-100 text-emerald-700 border-emerald-200",
    "Flagged": "bg-rose-100 text-rose-700 border-rose-200",
    "Pending": "bg-amber-100 text-amber-700 border-amber-200",
  };

  return (
    <Badge variant="outline" className={cn("text-[9px] font-black uppercase tracking-widest px-3 py-0.5 border-2 rounded-full", styles[status])}>
      {status}
    </Badge>
  );
}

// ─── Mock Data ────────────────────────────────────────────────────
const allReports = [
  { id: "SR-8802", title: "DAILY PROGRESS REPORT - HALL 1", date: "12 OCT 2023", type: "DPR", building: "CONVENTION CENTRE", status: "Verified", author: "ENGR. AMIT SHARMA", color: "from-blue-600 to-indigo-700" },
  { id: "SR-8795", title: "SAFETY INSPECTION REPORT", date: "11 OCT 2023", type: "SIR", building: "VVIP LOUNGE AREA", status: "Flagged", author: "ENGR. AMIT SHARMA", color: "from-rose-600 to-orange-700" },
  { id: "SR-8790", title: "QUALITY AUDIT - ELECTRICAL", date: "10 OCT 2023", type: "QIR", building: "BASEMENT LEVEL 1", status: "Pending", author: "ENGR. AMIT SHARMA", color: "from-amber-500 to-orange-600" },
  { id: "SR-8782", title: "WEEKLY MATERIAL SUMMARY", date: "08 OCT 2023", type: "WSR", building: "ALL SITES", status: "Verified", author: "ENGR. AMIT SHARMA", color: "from-emerald-600 to-teal-700" },
];

const reportTypes = ["All Reports", "DPR", "SIR", "QIR", "WSR"];

export default function SiteReports() {
  const [activeTab, setActiveTab] = useState("All Reports");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReports = allReports.filter((report) => {
    const matchesTab = activeTab === "All Reports" || report.type === activeTab;
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          report.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-20 font-sans selection:bg-indigo-100 p-10">
      
      {/* APEX SECRETARIAT HEADER */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 relative">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-2 border-indigo-200">
            <FileSearch size={14} className="animate-pulse" /> Shapoorji Document Archive
          </div>
          <h1 className="text-6xl font-black text-slate-800 tracking-tighter uppercase leading-none">Site <span className="text-indigo-600">Reports</span></h1>
          <p className="text-slate-500 font-medium text-xl italic underline underline-offset-8 decoration-indigo-200">
            Official repository of field inspections, quality audits, and progress documentation.
          </p>
        </div>

        <div className="flex gap-4">
          <Button 
            variant="outline"
            className="h-16 px-8 rounded-3xl border-2 border-indigo-200 font-black uppercase tracking-widest text-[10px] text-indigo-700 bg-white shadow-xl hover:bg-indigo-50 transition-all"
          >
            <Download size={20} className="mr-2" /> Export Archive
          </Button>
        </div>
      </div>

      {/* STAT TILES */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Reports", value: "142", color: "from-blue-600 to-indigo-700", icon: FileText },
          { label: "Verified Docs", value: "128", color: "from-emerald-500 to-teal-600", icon: ShieldCheck },
          { label: "Pending Review", value: "09", color: "from-amber-500 to-orange-600", icon: Clock },
          { label: "Issues Flagged", value: "05", color: "from-rose-500 to-rose-700", icon: AlertCircle, alert: true },
        ].map((stat, i) => (
          <div key={i} className={cn("group relative p-8 rounded-[32px] overflow-hidden transition-all duration-500 h-40 flex flex-col justify-between shadow-lg bg-gradient-to-br text-white", stat.color)}>
            <div className="absolute inset-0 opacity-90 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/diagonal-striped-brick.png')]" />
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between">
                <stat.icon size={20} className="opacity-80" />
                {stat.alert && <div className="h-2 w-2 rounded-full bg-white animate-ping" />}
              </div>
              <div>
                <p className="text-3xl font-black tracking-tighter">{stat.value}</p>
                <p className="text-[9px] font-black uppercase tracking-widest opacity-80">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FILTERS & SEARCH */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0">
          {reportTypes.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2",
                activeTab === tab 
                  ? "bg-slate-900 text-white border-slate-900 shadow-xl" 
                  : "bg-white text-slate-400 border-slate-100 hover:border-slate-200"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full lg:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="SEARCH REPORT ID OR TITLE..." 
            className="h-16 pl-12 pr-6 w-full rounded-3xl border-2 border-slate-100 font-black uppercase tracking-widest text-[10px] bg-white shadow-xl focus:outline-none focus:border-indigo-300 transition-all"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* REPORTS LEDGER GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredReports.map((report, i) => (
            <motion.div
              key={report.id} layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card className="rounded-[40px] border-none shadow-xl overflow-hidden bg-white group hover:shadow-2xl transition-all duration-500">
                {/* Dark Header with Gradient Accent */}
                <div className={cn("p-8 relative overflow-hidden bg-gradient-to-br text-white", report.color)}>
                  <div className="absolute inset-0 opacity-40 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/diagonal-striped-brick.png')]" />
                  <div className="relative z-10 flex justify-between items-start">
                    <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                      {report.type === "SIR" ? <ShieldCheck size={24} /> : report.type === "QIR" ? <Zap size={24} /> : <FileText size={24} />}
                    </div>
                    <ReportStatusBadge status={report.status} />
                  </div>
                  <div className="relative z-10 mt-6">
                    <p className="font-mono text-[9px] font-black text-white/60 tracking-widest uppercase mb-1">{report.id}</p>
                    <h3 className="text-xl font-black uppercase tracking-tight leading-tight group-hover:text-indigo-200 transition-colors line-clamp-2">
                      {report.title}
                    </h3>
                  </div>
                </div>

                <CardContent className="p-8 space-y-6 bg-slate-50/30 relative">
                   <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                   
                   <div className="relative z-10 space-y-4">
                      <div className="flex items-center gap-3 text-slate-500">
                        <MapPin size={16} className="text-indigo-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest">{report.building}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-500">
                        <Calendar size={16} className="text-indigo-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest">{report.date}</span>
                      </div>

                      <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                        <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center border-2 border-white">
                           <User size={14} className="text-slate-500" />
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{report.author}</span>
                      </div>

                      <div className="flex gap-2 pt-4">
                        <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl border-2 border-slate-100 hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                          <Share2 size={18} />
                        </Button>
                        <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl border-2 border-slate-100 hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                          <Download size={18} />
                        </Button>
                        <Button className="flex-1 h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest text-[9px] shadow-lg flex items-center justify-center gap-2">
                          <Eye size={16} /> VIEW REPORT
                        </Button>
                      </div>
                   </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* EMPTY STATE */}
      {filteredReports.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 space-y-6">
          <div className="h-24 w-24 rounded-full bg-slate-100 flex items-center justify-center text-slate-300">
            <Activity size={48} />
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-black uppercase tracking-tight text-slate-800">Archive Not Found</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Try adjusting your document filters</p>
          </div>
        </div>
      )}

    </div>
  );
}