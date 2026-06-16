"use client";

import React, { useState, useEffect } from "react";
import { 
  XAxis, YAxis, Tooltip, 
  ResponsiveContainer, AreaChart, Area,
  CartesianGrid 
} from "recharts";
import { 
  ExternalLink, Users, X, CheckCircle2, 
  AlertTriangle, IndianRupee, Loader2, 
  History, ShieldCheck, Activity, ArrowUpRight, 
  Clock, ClipboardList, Send, Briefcase, Wrench
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// ─── Status Badge Helper (Secretariat Style) ──────────────────────────
function ITPOPartnerBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "Awaiting Estimation": "bg-amber-100 text-amber-700 border-amber-200",
    "Estimation Submitted": "bg-purple-100 text-purple-700 border-purple-200",
    "Under Audit": "bg-blue-100 text-blue-700 border-blue-200",
    "Forwarded to ITPO": "bg-emerald-100 text-emerald-700 border-emerald-200",
  };

  return (
    <Badge variant="outline" className={cn("text-[9px] font-black uppercase tracking-widest px-3 py-0.5 border-2 rounded-full", styles[status] || "bg-slate-100 text-slate-700")}>
      {status}
    </Badge>
  );
}

// ─── Mock Data ────────────────────────────────────────────────────────
const kpiStats = [
  { title: "Sent to Shapoorji", value: "24", subtitle: "Large Scale Handovers", icon: ExternalLink, color: "from-indigo-600 to-blue-700" },
  { title: "Awaiting Estimates", value: "09", subtitle: "Pending Partner Quote", icon: Clock, color: "from-amber-500 to-orange-600", alert: true },
  { title: "Quotes for Audit", value: "06", subtitle: "Technical Review Due", icon: ClipboardList, color: "from-emerald-500 to-teal-600" },
];

const workloadTrend = [
  { day: "Mon", forwarded: 4, estimations: 2 },
  { day: "Tue", forwarded: 7, estimations: 5 },
  { day: "Wed", forwarded: 5, estimations: 8 },
  { day: "Thu", forwarded: 8, estimations: 6 },
  { day: "Fri", forwarded: 12, estimations: 9 },
  { day: "Sat", forwarded: 9, estimations: 10 },
];

const partnerQueue = [
  { id: "BM-SPCL-701", title: "Convention Center Hall 1 Roof Restoration", priority: "Critical", type: "General Civil", status: "Awaiting Estimation", daysOpen: "3 Days", description: "Comprehensive structural repair of the main hall roof following structural audit recommendations." },
  { id: "BM-SPCL-712", title: "Main Substation Transformer Upgrade", priority: "High", type: "Electrical", status: "Estimation Submitted", daysOpen: "5 Days", description: "Replacement of 2 nos. 1500kVA transformers with latest high-efficiency models." },
  { id: "BM-SPCL-725", title: "Central Chiller Plant Piping Work", priority: "Medium", type: "Mechanical", status: "Under Audit", daysOpen: "7 Days", description: "Rerouting of secondary chilled water lines for the upcoming exhibition expansion." }
];

export default function NBCCForwardToShapoorji() {
  const [mounted, setMounted] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [remarks, setRemarks] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
        setIsSubmitting(false);
        setSelectedTask(null);
        setRemarks("");
    }, 1500);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-20 font-sans selection:bg-indigo-100 p-10 bg-slate-50/50 min-h-screen relative">
      
      {/* ─── APEX SECRETARIAT HEADER ──────────────────────────── */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 relative">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-2 border-indigo-200">
            <ShieldCheck size={14} className="animate-pulse" /> Partner Secretariat
          </div>
          <h1 className="text-6xl font-black text-slate-800 tracking-tighter uppercase leading-none">SPCL Oversight</h1>
          <p className="text-slate-500 font-medium text-xl italic underline underline-offset-8 decoration-indigo-200">
            Monitoring Large Scale project handovers and auditing partner technical estimations.
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="h-16 px-8 rounded-3xl border-2 border-indigo-200 font-black uppercase tracking-widest text-[10px] text-indigo-700 bg-white shadow-xl hover:bg-indigo-50 transition-all">
            <History size={20} className="mr-2" /> Global Audit Trail
          </Button>
          <Button className="h-16 px-10 rounded-3xl bg-gradient-to-r from-slate-800 to-slate-950 text-white font-black uppercase tracking-widest text-[10px] shadow-2xl hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] transition-all gap-2 border-none">
            <ExternalLink size={20} className="text-indigo-400" /> New Handover
          </Button>
        </div>
      </div>

      {/* ─── KPI ACTION TILES ─────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpiStats.map((item, i) => (
          <div key={i} className={`group relative p-8 rounded-[32px] overflow-hidden transition-all duration-500 h-44 flex flex-col justify-between shadow-lg bg-gradient-to-br ${item.color} text-white`}>
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/diagonal-striped-brick.png')]" />
            <div className="relative z-10 flex flex-col justify-between h-full w-full">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT: PARTNER QUEUE LEDGER (2/3) */}
        <div className="lg:col-span-2">
          <Card className="rounded-[48px] border-none shadow-xl overflow-hidden bg-white h-full flex flex-col">
            <CardHeader className="p-0">
              <div className="p-10 bg-gradient-to-r from-slate-800 via-slate-950 to-indigo-950 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
                  <div className="flex items-center gap-5">
                    <div className="h-14 w-14 rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg">
                      <Briefcase size={28} className="text-white" />
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-2xl font-black uppercase tracking-tight">SPCL Handover Ledger</CardTitle>
                      <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Large Scale project handovers awaiting partner estimation</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-6 flex-1 bg-slate-50/30 relative">
              <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
              
              <div className="relative z-10 space-y-6">
                {partnerQueue.map((task) => (
                  <div key={task.id} className="p-8 rounded-[32px] border border-slate-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300">
                    <div className="flex flex-col xl:flex-row justify-between gap-8">
                      <div className="space-y-4 flex-1">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-black text-indigo-700 tracking-wider bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md">{task.id}</span>
                          <ITPOPartnerBadge status={task.status} />
                        </div>
                        <div>
                          <h4 className="font-black text-2xl text-slate-800 tracking-tight leading-tight">{task.title}</h4>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
                            <span className="flex items-center gap-1.5 text-slate-600"><Wrench size={14} className="text-indigo-500" /> {task.type}</span>
                            <span className="text-slate-200">•</span>
                            <span className="flex items-center gap-1.5 text-rose-600 font-black"><Clock size={14} /> {task.daysOpen} Open</span>
                          </div>
                        </div>
                        <p className="text-xs font-bold text-slate-500 italic leading-relaxed max-w-2xl italic">"{task.description}"</p>
                      </div>
                      <div className="flex flex-col justify-center">
                        {task.status !== "Awaiting Estimation" ? (
                          <Button 
                            onClick={() => setSelectedTask(task)}
                            className="h-16 px-10 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] shadow-lg hover:shadow-indigo-200 transition-all gap-2 border-none"
                          >
                            Audit Quote <ArrowUpRight size={18} />
                          </Button>
                        ) : (
                          <Button variant="outline" className="h-16 px-10 rounded-2xl border-2 border-slate-200 text-slate-400 font-black uppercase tracking-widest text-[10px] cursor-not-allowed">
                            Awaiting SPCL
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT SIDEBAR: ANALYTICS (1/3) */}
        <div className="space-y-8">
          <Card className="rounded-[40px] border-none shadow-lg bg-white overflow-hidden group">
            <div className="p-6 flex items-center justify-between text-white relative bg-gradient-to-r from-indigo-600 to-blue-700">
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
              <div className="flex items-center gap-4 relative z-10">
                <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <Activity size={18} className="text-white" />
                </div>
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em]">Partner Velocity</h3>
              </div>
            </div>
            <div className="p-8 space-y-6">
               <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={workloadTrend}>
                    <defs>
                      <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="day" hide />
                    <YAxis hide />
                    <Tooltip />
                    <Area type="monotone" dataKey="forwarded" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorActual)" />
                    <Area type="monotone" dataKey="estimations" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Partner TAT</p>
                  <p className="text-xl font-black text-slate-800">5.2 Days</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">On-Site Staff</p>
                  <p className="text-xl font-black text-indigo-600">142 Pers</p>
                </div>
              </div>
            </div>
          </Card>

          <div className="p-8 rounded-[40px] bg-slate-900 text-white relative overflow-hidden group shadow-2xl">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            <div className="relative z-10 space-y-4">
              <div className="flex justify-between items-center">
                <ClipboardList size={24} className="text-amber-400 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Technical Audit</span>
              </div>
              <div>
                <h3 className="text-4xl font-black tracking-tighter">06 Files</h3>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1">Files Pending NBCC Audit</p>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 w-[60%]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── TECHNICAL AUDIT PANEL (SECRETARIAT STYLE) ────────── */}
      {selectedTask && (
        <>
          <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-md z-[60] animate-in fade-in" onClick={() => setSelectedTask(null)} />
          <div className="fixed inset-y-0 right-0 w-full max-w-xl bg-white z-[70] shadow-[-20px_0_50px_rgba(0,0,0,0.1)] flex flex-col animate-in slide-in-from-right duration-500">
            
            <div className="p-10 bg-slate-900 text-white relative overflow-hidden">
               <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
               <div className="relative z-10 flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="h-12 w-12 rounded-2xl bg-indigo-500 flex items-center justify-center shadow-lg mb-4">
                       <Send size={24} className="text-white" />
                    </div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter">Handover Audit</h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Validating SPCL Estimation • {selectedTask.id}</p>
                  </div>
                  <button onClick={() => setSelectedTask(null)} className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"><X size={24} /></button>
               </div>
            </div>

            <div className="flex-1 overflow-y-auto p-10 space-y-10">
              <section className="space-y-4">
                <h3 className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.2em]">Partner Submission</h3>
                <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 relative overflow-hidden text-slate-800">
                  <h4 className="font-black text-xl leading-tight mb-2">{selectedTask.title}</h4>
                  <p className="text-sm font-bold text-slate-500 italic">"{selectedTask.description}"</p>
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.2em]">Quotation Audit</h3>
                <div className="bg-emerald-50 p-8 rounded-[32px] border-2 border-emerald-100 flex justify-between items-center shadow-lg shadow-emerald-50">
                   <div>
                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Total Project Cost</p>
                      <div className="flex items-center gap-1.5 text-4xl font-black text-slate-800 font-mono tracking-tighter">
                         <IndianRupee size={28} /> 4,50,000.00
                      </div>
                   </div>
                   <div className="text-right">
                      <Badge className="bg-emerald-600 text-white font-black text-[9px] uppercase tracking-widest px-3 py-1">SPCL Final</Badge>
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex justify-between">
                    <span className="text-[9px] font-black text-slate-400 uppercase">Labor Cost</span>
                    <span className="text-xs font-black">₹1.2L</span>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex justify-between">
                    <span className="text-[9px] font-black text-slate-400 uppercase">Material</span>
                    <span className="text-xs font-black">₹3.3L</span>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.2em]">NBCC Technical Remarks</h3>
                <textarea 
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Enter technical validation remarks for ITPO approval..." 
                  className="h-40 w-full p-6 rounded-[24px] border-2 border-slate-100 font-bold text-sm focus:border-indigo-500 outline-none transition-all resize-none bg-slate-50/50"
                />
              </section>

              <div className="p-6 bg-amber-50 rounded-[24px] border-2 border-amber-100 flex gap-4">
                <AlertTriangle className="h-6 w-6 text-amber-600 shrink-0" />
                <p className="text-[10px] text-amber-800 font-black leading-relaxed uppercase tracking-tight">
                  Secretariat Note: Validation of this estimate confirms that market rates were compared. ITPO Secretariat will process the budget release based on this audit.
                </p>
              </div>
            </div>

            <div className="p-10 border-t border-slate-100 flex gap-4 bg-slate-50/50">
               <Button onClick={() => setSelectedTask(null)} variant="outline" className="flex-1 h-16 rounded-2xl border-2 border-slate-200 font-black uppercase text-[10px] tracking-[0.2em] bg-white">Discard Audit</Button>
               <Button 
                disabled={!remarks || isSubmitting}
                onClick={handleFinalSubmit}
                className="flex-1 h-16 rounded-2xl bg-indigo-600 text-white font-black uppercase text-[10px] tracking-[0.2em] shadow-2xl shadow-indigo-200 border-none flex gap-2"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : <><Send size={16} /> Forward to ITPO</>}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}