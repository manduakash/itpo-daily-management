"use client";

import React, { useState, useEffect } from "react";
import { 
  Search, Filter, Clock, ChevronRight, 
  ShieldCheck, ExternalLink, Download, 
  Briefcase, MapPin, Hammer, Zap, 
  Droplets, Settings, List, LayoutGrid,
  Activity, ArrowUpRight, FileSearch, HardHat,
  Users, CheckCircle2, X, AlertTriangle, IndianRupee, Loader2
} from "lucide-react";

// --- TypeScript Definitions ---
type Category = "General Civil" | "Electrical" | "Mechanical" | "Plumbing" | "AMC/CMC";
type Priority = "Low" | "Medium" | "High" | "Critical";
type Scale = "Small" | "Medium" | "Large";
type Status = "Under Review" | "Estimation Submitted" | "Approved" | "Engineer Assigned" | "Work In Progress" | "Inspection Pending";

interface Contract {
  id: string;
  title: string;
  location: string;
  category: Category;
  priority: Priority;
  scale: Scale;
  status: Status;
  caseType: "Case 1" | "Case 2" | "Case 3";
  deadline: string;
  agency: string;
  description: string;
}

// --- Icons & Styling Maps ---
const categoryIcons: Record<Category, React.ReactNode> = {
  "General Civil": <Hammer className="h-3.5 w-3.5" />,
  "Electrical": <Zap className="h-3.5 w-3.5" />,
  "Mechanical": <Settings className="h-3.5 w-3.5" />,
  "Plumbing": <Droplets className="h-3.5 w-3.5" />,
  "AMC/CMC": <Activity className="h-3.5 w-3.5" />,
};

const kpiData = [
  { title: "Pending Tech Review", value: "12", trend: "Requires Scale Classif.", icon: FileSearch, bg: "bg-amber-50/80 dark:bg-amber-900/10", border: "border-amber-200 dark:border-amber-800", iconBg: "bg-amber-500", textColor: "text-amber-700 dark:text-amber-400" },
  { title: "NBCC Direct (Small)", value: "08", trend: "Internal Execution", icon: HardHat, bg: "bg-emerald-50/80 dark:bg-emerald-900/10", border: "border-emerald-200 dark:border-emerald-800", iconBg: "bg-emerald-600", textColor: "text-emerald-700 dark:text-emerald-400" },
  { title: "Shapoorji (Large)", value: "24", trend: "Forwarded for Est.", icon: ExternalLink, bg: "bg-indigo-50/80 dark:bg-indigo-900/10", border: "border-indigo-200 dark:border-indigo-800", iconBg: "bg-indigo-600", textColor: "text-indigo-700 dark:text-indigo-400" },
  { title: "Deployment Status", value: "92%", trend: "Engineer On-site", icon: Users, bg: "bg-slate-100/80 dark:bg-slate-800/40", border: "border-slate-300 dark:border-slate-700", iconBg: "bg-slate-700", textColor: "text-slate-700 dark:text-slate-300" },
];

export default function NBCCAssignedContracts() {
  const [mounted, setMounted] = useState(false);
  
  // --- WORKABLE STATE ---
  const [contracts, setContracts] = useState<Contract[]>([
    { id: "CON-2025-701", title: "Plenary Hall Interior Renovation", location: "Block A, Level 2", category: "General Civil", priority: "Critical", scale: "Large", status: "Under Review", caseType: "Case 2", deadline: "30 June 2025", agency: "Pending (NBCC Review)", description: "Complete restoration of acoustic wall paneling and ceiling moisture treatment." },
    { id: "CON-2025-705", title: "Parking Lot B Lighting Grid", location: "Outdoor Zone 4", category: "Electrical", priority: "Medium", scale: "Small", status: "Engineer Assigned", caseType: "Case 2", deadline: "20 May 2025", agency: "NBCC Direct", description: "Standard LED replacement and wiring check for the secondary parking bay." },
    { id: "CON-2025-709", title: "HVAC Cooling Tower Maintenance", location: "Utility Terrace", category: "Mechanical", priority: "High", scale: "Large", status: "Estimation Submitted", caseType: "Case 1", deadline: "15 June 2025", agency: "Shapoorji (Proposed)", description: "Quarterly mechanical overhauling and chemical descaling of tower units." },
  ]);

  const [selectedTask, setSelectedTask] = useState<Contract | null>(null);
  const [actionType, setActionType] = useState<"review" | "assign" | "estimation" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Internal selection state for Review
  const [tempScale, setTempScale] = useState<Scale>("Small");

  useEffect(() => { setMounted(true); }, []);

  const openPanel = (task: Contract, type: "review" | "assign" | "estimation") => {
    setSelectedTask(task);
    setActionType(type);
    setTempScale(task.scale); // Default to current scale
  };

  const closePanel = () => {
    setSelectedTask(null);
    setActionType(null);
    setIsSubmitting(false);
  };

  // --- WORKABLE SUBMIT FUNCTION ---
  const handleSubmit = () => {
    if (!selectedTask) return;
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setContracts(prev => prev.map(c => {
        if (c.id === selectedTask.id) {
          if (actionType === 'review') {
            return { 
                ...c, 
                scale: tempScale, 
                status: tempScale === 'Small' ? 'Approved' : 'Estimation Submitted',
                agency: tempScale === 'Small' ? 'NBCC Direct' : 'Shapoorji (Large Scale)' 
            };
          }
          if (actionType === 'assign') {
            return { ...c, status: 'Work In Progress' };
          }
          if (actionType === 'estimation') {
            return { ...c, status: 'Approved' };
          }
        }
        return c;
      }));
      closePanel();
    }, 1000);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#f1f5f9] dark:bg-[#020617] text-slate-900 dark:text-slate-50 relative overflow-hidden">
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: `url('https://transparenttextures.com/patterns/cubes.png')` }} />

      <main className="relative z-10 p-6 lg:p-10 max-w-[1600px] mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black px-2 py-0.5 rounded tracking-tighter uppercase">PMC Assignments</span>
              <span className="text-slate-400 text-xs font-bold flex items-center gap-1 uppercase tracking-widest"><ShieldCheck className="h-3.5 w-3.5" /> Bharat Mandapam</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight uppercase">Assigned Contracts</h1>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 text-xs font-black bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm hover:bg-slate-50 transition-all uppercase tracking-wider">
            <Download className="h-4 w-4" /> Export Queue
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {kpiData.map((kpi, i) => (
            <div key={i} className={`relative overflow-hidden ${kpi.bg} border ${kpi.border} p-6 rounded-2xl shadow-sm group hover:shadow-md transition-all`}>
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `url('https://transparenttextures.com/patterns/cubes.png')` }} />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-5">
                  <div className={`p-2.5 ${kpi.iconBg} text-white rounded-xl shadow-lg`}><kpi.icon className="h-5 w-5" /></div>
                  <ArrowUpRight className="h-5 w-5 text-slate-300" />
                </div>
                <p className={`text-[10px] font-black uppercase tracking-[0.15em] mb-1 opacity-70 ${kpi.textColor}`}>{kpi.title}</p>
                <h3 className="text-3xl font-black tracking-tighter">{kpi.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Table */}
        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
                <th className="py-5 px-8">Contract Details</th>
                <th className="py-5 px-6">Classification</th>
                <th className="py-5 px-6">Agency</th>
                <th className="py-5 px-6 text-center">Deadline</th>
                <th className="py-5 px-8 text-right">Technical Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {contracts.map((task, i) => (
                <tr key={task.id} className="group hover:bg-white dark:hover:bg-slate-800/80 transition-all">
                  <td className="py-6 px-8">
                    <div className="font-mono text-[10px] font-bold text-indigo-500 mb-1">{task.id}</div>
                    <div className="font-bold text-sm">{task.title}</div>
                    <div className="flex items-center gap-3 mt-1.5 opacity-60">
                       <span className="flex items-center gap-1 text-[10px] font-black uppercase"><MapPin size={12}/> {task.location}</span>
                       <span className="flex items-center gap-1 text-[10px] font-black uppercase">{categoryIcons[task.category]} {task.category}</span>
                    </div>
                  </td>
                  <td className="py-6 px-6">
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${task.scale === 'Large' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'}`}>{task.scale} Scale</span>
                  </td>
                  <td className="py-6 px-6 font-black text-[11px] uppercase text-slate-600 dark:text-slate-300">{task.agency}</td>
                  <td className="py-6 px-6 text-center text-amber-600 font-black text-[10px] uppercase"><Clock size={12} className="inline mr-1" />{task.deadline}</td>
                  <td className="py-6 px-8 text-right">
                    <div className="flex flex-col items-end gap-2">
                      {task.status === 'Under Review' && (
                        <button onClick={() => openPanel(task, "review")} className="px-4 py-1.5 text-[10px] font-black uppercase bg-indigo-600 text-white rounded shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all">Technical Review</button>
                      )}
                      {(task.status === 'Engineer Assigned' || task.status === 'Approved') && task.agency === 'NBCC Direct' && (
                        <button onClick={() => openPanel(task, "assign")} className="px-4 py-1.5 text-[10px] font-black uppercase border-2 border-slate-900 dark:border-white rounded hover:bg-slate-900 hover:text-white dark:hover:bg-white transition-all">Assign Engineers</button>
                      )}
                      {task.agency.includes('Shapoorji') && (task.status === 'Estimation Submitted') && (
                        <button onClick={() => openPanel(task, "estimation")} className="px-4 py-1.5 text-[10px] font-black uppercase border border-slate-300 dark:border-slate-700 rounded hover:bg-white dark:hover:bg-slate-800 transition-all">Review Estimation</button>
                      )}
                      <button className="text-[9px] font-black text-slate-400 uppercase hover:text-indigo-600 flex items-center gap-1 tracking-widest">Full Scope <ArrowUpRight size={12} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* --- SIDE MANAGEMENT PANEL (WORKABLE) --- */}
      {selectedTask && (
        <>
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]" onClick={closePanel} />
          <div className="fixed inset-y-0 right-0 w-full max-w-lg bg-white dark:bg-slate-950 z-[70] shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col animate-in slide-in-from-right duration-300">
            
            <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
              <div>
                <h2 className="text-xl font-black uppercase tracking-tight">
                  {actionType === "review" && "Technical Classification"}
                  {actionType === "assign" && "Engineer Allocation"}
                  {actionType === "estimation" && "Estimation Audit"}
                </h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{selectedTask.id} • {selectedTask.category}</p>
              </div>
              <button onClick={closePanel} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors"><X size={20} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              <section className="space-y-4">
                <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">Contract Context</h3>
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url('https://transparenttextures.com/patterns/cubes.png')` }} />
                  <h4 className="font-bold text-lg leading-tight mb-2">{selectedTask.title}</h4>
                  <p className="text-sm text-slate-500">{selectedTask.description}</p>
                </div>
              </section>

              {/* ACTION TYPE: REVIEW */}
              {actionType === "review" && (
                <section className="space-y-6">
                   <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">Project Classification</h3>
                   <div className="grid gap-4">
                      <div 
                        onClick={() => setTempScale("Small")}
                        className={`p-4 border-2 rounded-xl flex items-center gap-4 cursor-pointer transition-all ${tempScale === "Small" ? "border-indigo-600 bg-indigo-50/50" : "border-slate-100 hover:border-slate-300"}`}
                      >
                        <HardHat className={tempScale === "Small" ? "text-indigo-600" : "text-slate-400"} size={24} />
                        <div>
                          <p className="font-black text-xs uppercase">Small Scale (NBCC Direct)</p>
                          <p className="text-[10px] text-slate-500 uppercase font-bold">Internal PMC Execution</p>
                        </div>
                        {tempScale === "Small" && <CheckCircle2 className="ml-auto text-indigo-600" size={20} />}
                      </div>
                      <div 
                        onClick={() => setTempScale("Large")}
                        className={`p-4 border-2 rounded-xl flex items-center gap-4 cursor-pointer transition-all ${tempScale === "Large" ? "border-indigo-600 bg-indigo-50/50" : "border-slate-100 hover:border-slate-300"}`}
                      >
                        <ExternalLink className={tempScale === "Large" ? "text-indigo-600" : "text-slate-400"} size={24} />
                        <div>
                          <p className="font-black text-xs uppercase">Large Scale (Shapoorji)</p>
                          <p className="text-[10px] text-slate-500 uppercase font-bold">Forward to External Partner</p>
                        </div>
                        {tempScale === "Large" && <CheckCircle2 className="ml-auto text-indigo-600" size={20} />}
                      </div>
                   </div>
                </section>
              )}

              {/* ACTION TYPE: ASSIGN */}
              {actionType === "assign" && (
                <section className="space-y-4 font-bold">
                  <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">Select Deployment Team</h3>
                  <div className="space-y-3 font-medium">
                    <select className="w-full bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
                        <option>Select Lead Engineer...</option>
                        <option>Rahul Varma (Civil)</option>
                    </select>
                    <input type="number" placeholder="Field Workforce Count" className="w-full bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs" />
                  </div>
                </section>
              )}

              {/* ACTION TYPE: ESTIMATION */}
              {actionType === "estimation" && (
                <section className="space-y-4">
                  <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">Cost Analysis Summary</h3>
                  <div className="bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800/50">
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Shapoorji Submitted Quote</p>
                    <div className="text-2xl font-black flex items-center gap-1 mt-1 font-mono tracking-tighter">
                      <IndianRupee size={24} /> 4,50,000.00
                    </div>
                  </div>
                  <textarea placeholder="Technical remarks for ITPO Review..." className="w-full h-32 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs outline-none focus:border-indigo-600 transition-colors" />
                </section>
              )}
            </div>

            <div className="px-8 py-6 border-t border-slate-100 dark:border-slate-800 flex gap-4">
              <button onClick={closePanel} className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest border-2 border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 transition-all">Discard</button>
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest bg-indigo-600 text-white rounded-lg shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? <><Loader2 size={14} className="animate-spin" /> Processing...</> : "Submit Selection"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}