"use client";

import React, { useState, useEffect } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area 
} from "recharts";
import { 
  HardHat, FileText, Clock, ArrowUpRight, 
  MapPin, ClipboardCheck, History, Plus, 
  ArrowLeft, Upload, Save, CheckCircle2, 
  AlertCircle, Filter, Search, MoreVertical,
  Hammer, Zap, Droplets, Settings,
  Briefcase,
  Bell
} from "lucide-react";

// Texture URLs from TransparentTextures
const textures = {
  mainBg: "https://www.transparenttextures.com/patterns/symphony.png",
  cardBg: "https://www.transparenttextures.com/patterns/white-diamond.png",
  accentBg: "https://www.transparenttextures.com/patterns/carbon-fibre.png",
  formBg: "https://www.transparenttextures.com/patterns/cubes.png",
  paperBg: "https://www.transparenttextures.com/patterns/pinstripe-light.png"
};

const contractData = [
  { id: "CON-772", title: "Convention Center Facade Repair", category: "General Civil", priority: "High", scale: "Large", source: "ITPO Direct", progress: 65, status: "WIP", icon: Hammer, color: "bg-orange-600" },
  { id: "CON-810", title: "VVIP Lounge Interior Polishing", category: "Interior", priority: "Medium", scale: "Small", source: "via NBCC", progress: 20, status: "Estimation", icon: HardHat, color: "bg-blue-600" },
  { id: "CON-901", title: "Central Plaza Stone Paving", category: "General Civil", priority: "Critical", scale: "Large", source: "ITPO Direct", progress: 100, status: "Complete", icon: Hammer, color: "bg-slate-900" },
  { id: "CON-442", title: "HVAC System AMC Replacement", category: "Mechanical", priority: "Low", scale: "Medium", source: "via NBCC", progress: 0, status: "Under Review", icon: Zap, color: "bg-emerald-600" },
  { id: "CON-219", title: "Hall 5 Electrical Overhaul", category: "Electrical", priority: "High", scale: "Medium", source: "ITPO Direct", progress: 45, status: "WIP", icon: Zap, color: "bg-amber-500" },
];

export default function ShapoorjiManagementPortal() {
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState("dashboard"); // dashboard, contracts, form, logs

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // --- SUB-COMPONENTS ---

  const PageHeader = ({ title, subtitle, actions }: any) => (
    <div className="relative p-8 mb-8 rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-sm">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `url(${textures.mainBg})` }} />
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">{title}</h1>
          <p className="text-slate-500 text-sm font-medium">{subtitle}</p>
        </div>
        <div className="flex gap-3">{actions}</div>
      </div>
    </div>
  );

  const AssignedContracts = () => (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      <PageHeader 
        title="Assigned Contracts" 
        subtitle="Active work orders and infrastructure assignments"
        actions={
          <>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input type="text" placeholder="Search by ID or Title..." className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm w-64 focus:ring-2 focus:ring-orange-500 outline-none" />
            </div>
            <button className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-sm"><Filter className="h-5 w-5 text-slate-600" /></button>
          </>
        }
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {contractData.map((contract, i) => (
          <div key={i} className="group relative bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
            {/* Texture Layers */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url(${textures.cardBg})` }} />
            
            {/* Folder Tab Header */}
            <div className={`h-24 p-6 relative ${contract.color}`}>
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `url(${textures.accentBg})` }} />
              <div className="relative z-10 flex justify-between items-start">
                <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg">
                  <contract.icon className="h-6 w-6 text-white" />
                </div>
                <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest bg-white/20 text-white backdrop-blur-sm`}>
                  {contract.priority}
                </span>
              </div>
            </div>

            <div className="p-6 relative z-10">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{contract.id} • {contract.source}</span>
                <span className={`text-[10px] font-bold ${contract.status === 'Complete' ? 'text-emerald-600' : 'text-orange-600'}`}>{contract.status}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 leading-tight mb-4 group-hover:text-orange-600 transition-colors">{contract.title}</h3>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1">
                  <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1 uppercase">
                    <span>Progress</span>
                    <span>{contract.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 transition-all duration-1000" style={{ width: `${contract.progress}%` }} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                <button className="text-xs font-bold py-2 px-3 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 transition-all">Details</button>
                <button className="text-xs font-bold py-2 px-3 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 transition-all">Update Site</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const EstimationForm = () => (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 max-w-4xl mx-auto">
      <button onClick={() => setView("dashboard")} className="mb-6 flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-orange-600 transition-all">
        <ArrowLeft className="h-4 w-4" /> CANCEL AND RETURN
      </button>
      
      <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `url(${textures.paperBg})` }} />
        
        <div className="bg-slate-900 p-10 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none shadow-inner" style={{ backgroundImage: `url(${textures.formBg})` }} />
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-black text-white tracking-tighter">ESTIMATION SUBMISSION</h2>
              <p className="text-slate-400 text-xs font-bold tracking-[0.3em] uppercase mt-1">Ref: SP-BHM-FORM-2024</p>
            </div>
            <FileText className="h-12 w-12 text-orange-500" />
          </div>
        </div>

        <form className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <div className="space-y-2 col-span-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Contract</label>
            <select className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-orange-500 appearance-none">
              <option>CON-772: Convention Center Facade</option>
              <option>CON-810: VVIP Lounge Interiors</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Budget Quote (INR)</label>
            <input type="text" placeholder="0.00" className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-orange-500" />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Completion Timeline</label>
            <input type="date" className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-orange-500" />
          </div>

          <div className="space-y-2 col-span-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Scope of Work & Technical Spec</label>
            <textarea rows={5} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-orange-500" placeholder="Describe the labor, material, and methodology..." />
          </div>

          <div className="col-span-2 p-8 border-4 border-dashed border-slate-100 rounded-3xl bg-slate-50/50 flex flex-col items-center justify-center text-center group hover:bg-white hover:border-orange-200 transition-all cursor-pointer">
             <Upload className="h-10 w-10 text-slate-300 group-hover:text-orange-500 mb-4 transition-all" />
             <p className="font-bold text-slate-500">Drop BOQ (Excel) or Drawings (PDF)</p>
             <p className="text-[10px] text-slate-400 uppercase mt-1">Maximum upload size 25MB per file</p>
          </div>

          <div className="col-span-2 flex justify-end pt-6">
            <button type="button" onClick={() => setView("dashboard")} className="px-12 py-4 bg-orange-600 text-white rounded-2xl font-black shadow-2xl shadow-orange-200 hover:bg-orange-700 hover:scale-[1.02] transition-all flex items-center gap-3">
              <Save className="h-5 w-5" /> SUBMIT TO ITPO
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const Dashboard = () => (
    <div className="animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Visual Nav Tiles */}
        <button onClick={() => setView("contracts")} className="relative h-40 rounded-3xl bg-slate-900 overflow-hidden shadow-lg group">
          <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-all" style={{ backgroundImage: `url(${textures.accentBg})` }} />
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white gap-2">
            <Briefcase className="h-8 w-8 text-orange-500" />
            <span className="font-black text-xs uppercase tracking-widest">My Contracts</span>
            <span className="text-[10px] font-bold text-slate-500">24 ACTIVE ITEMS</span>
          </div>
        </button>

        <button onClick={() => setView("estimation-form")} className="relative h-40 rounded-3xl bg-orange-600 overflow-hidden shadow-lg group">
          <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-all" style={{ backgroundImage: `url(${textures.formBg})` }} />
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white gap-2">
            <Plus className="h-8 w-8 text-white" />
            <span className="font-black text-xs uppercase tracking-widest">New Proposal</span>
            <span className="text-[10px] font-bold text-orange-200">BOQ SUBMISSION</span>
          </div>
        </button>

        <button onClick={() => setView("logs")} className="relative h-40 rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm group">
          <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-all" style={{ backgroundImage: `url(${textures.cardBg})` }} />
          <div className="relative z-10 flex flex-col items-center justify-center h-full gap-2">
            <History className="h-8 w-8 text-slate-400 group-hover:text-slate-900 transition-colors" />
            <span className="font-black text-xs text-slate-900 uppercase tracking-widest">History Logs</span>
            <span className="text-[10px] font-bold text-slate-400">AUDIT TRAIL</span>
          </div>
        </button>

        <div className="relative h-40 rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url(${textures.cardBg})` }} />
          <div className="relative z-10 flex flex-col items-center justify-center h-full gap-2">
            <div className="text-3xl font-black text-slate-900 tracking-tighter">98.2%</div>
            <span className="font-black text-xs text-slate-900 uppercase tracking-widest">SLA Rating</span>
            <span className="text-[10px] font-bold text-emerald-500">EXCELLENT</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-8 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `url(${textures.mainBg})` }} />
          <h3 className="text-xl font-bold text-slate-800 mb-8 relative z-10">Monthly Labor Allocation</h3>
          <div className="h-72 relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[{n:'Jan', v:400}, {n:'Feb', v:700}, {n:'Mar', v:500}, {n:'Apr', v:900}, {n:'May', v:1100}]}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="n" fontSize={12} axisLine={false} tickLine={false} />
                <YAxis fontSize={12} axisLine={false} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="v" stroke="#f97316" strokeWidth={4} fill="url(#colorVal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="p-8 bg-slate-900 rounded-[2.5rem] shadow-xl relative overflow-hidden text-white">
           <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${textures.accentBg})` }} />
           <h3 className="text-xl font-bold mb-6 relative z-10">Quick Stats</h3>
           <div className="space-y-6 relative z-10">
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-slate-400 text-xs font-bold uppercase">Total Budget Managed</span>
                <span className="text-orange-500 font-black">₹4.2 Cr</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-slate-400 text-xs font-bold uppercase">Live Site Engineers</span>
                <span className="text-orange-500 font-black">18</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-slate-400 text-xs font-bold uppercase">Safety Compliance</span>
                <span className="text-emerald-500 font-black">100%</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  const Logs = () => (
    <div className="animate-in slide-in-from-right-8 duration-500">
      <PageHeader 
        title="Audit Logs" 
        subtitle="Chronological history of all system interactions"
        actions={<button onClick={() => setView("dashboard")} className="px-6 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">BACK</button>}
      />
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        {[1,2,3,4,5].map((item) => (
          <div key={item} className="p-6 border-b border-slate-100 flex items-center justify-between hover:bg-slate-50 transition-all">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center">
                <History className="h-5 w-5 text-slate-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Estimation Submitted for CON-102</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">24 Oct 2024 • 14:32 PM</p>
              </div>
            </div>
            <span className="text-[10px] font-black px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 uppercase">SUCCESS</span>
          </div>
        ))}
      </div>
    </div>
  );

  // --- MAIN LAYOUT ---

  return (
    <div className="min-h-screen bg-[#f1f3f6] py-10 relative selection:bg-orange-100 selection:text-orange-600">
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `url(${textures.mainBg})` }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Portal Branding */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-slate-900 flex items-center justify-center rounded-2xl shadow-2xl rotate-3">
              <span className="text-white font-black text-2xl">S</span>
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tighter italic uppercase">SHAPOORJI <span className="text-orange-600">PALLONJI</span></h2>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Infrastructure Management Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="p-3 bg-white rounded-2xl shadow-sm border border-slate-200 relative">
              <Bell className="h-5 w-5 text-slate-600" />
              <div className="absolute top-3 right-3 h-2 w-2 bg-orange-600 rounded-full border-2 border-white" />
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-900">Vikram Singh</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Project Manager</p>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-orange-500 shadow-lg border-2 border-white overflow-hidden">
                <div className="h-full w-full opacity-20" style={{ backgroundImage: `url(${textures.accentBg})` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Views */}
        {view === "dashboard" && <Dashboard />}
        {view === "contracts" && <AssignedContracts />}
        {view === "estimation-form" && <EstimationForm />}
        {view === "logs" && <Logs />}

      </div>
    </div>
  );
}