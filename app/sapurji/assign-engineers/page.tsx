"use client";

import React, { useState } from "react";
import { 
  HardHat, Search, Filter, UserPlus, 
  CheckCircle2, Hammer, Zap, Briefcase,
  ChevronDown, UserCheck, AlertCircle, 
  MapPin, Clock, ShieldCheck, LayoutGrid
} from "lucide-react";

// Shadcn UI Components
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const textures = {
  mainBg: "https://www.transparenttextures.com/patterns/symphony.png",
  gridBg: "https://www.transparenttextures.com/patterns/graphy.png",
  accentBg: "https://www.transparenttextures.com/patterns/carbon-fibre.png",
  bricks: "https://www.transparenttextures.com/patterns/diagonal-striped-brick.png",
};

// Mock Data for Contracts
const contractsData = [
  { id: "CON-772", title: "Exhibition Hall A Facade", type: "Civil", priority: "High", source: "ITPO", assignedTo: null },
  { id: "CON-810", title: "VVIP Lounge Interior", type: "Interior", priority: "Medium", source: "NBCC", assignedTo: "Amit Sharma" },
  { id: "CON-901", title: "Central Plaza Stone Paving", type: "Civil", priority: "Critical", source: "ITPO", assignedTo: null },
  { id: "CON-219", title: "Hall 5 Electrical Overhaul", type: "Electrical", priority: "High", source: "ITPO", assignedTo: null },
];

// Mock Data for Engineers
const engineers = [
  { name: "Amit Sharma", role: "Sr. Civil", load: 85, avatar: "AS" },
  { name: "Priya Das", role: "Electrical", load: 35, avatar: "PD" },
  { name: "Rajesh Kumar", role: "Mechanical", load: 95, avatar: "RK" },
  { name: "Sanya Mirza", role: "Civil Eng", load: 20, avatar: "SM" },
  { name: "Vikram Seth", role: "Structural", load: 55, avatar: "VS" },
];

export default function AssignWorkPortal() {
  const [contracts, setContracts] = useState(contractsData);

  const handleAssign = (contractId: string, engineerName: string) => {
    setContracts(prev => prev.map(c => 
      c.id === contractId ? { ...c, assignedTo: engineerName } : c
    ));
  };

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
              <ShieldCheck size={14} className="text-orange-400" /> Resource Management Node
            </div>
            <h1 className="text-6xl font-black text-slate-800 tracking-tighter uppercase leading-none">
              Work <span className="text-orange-600">Assignment</span>
            </h1>
            <p className="text-slate-500 font-medium text-xl italic underline underline-offset-8 decoration-slate-200">
              Shapoorji Pallonji • Site Control & Engineer Allocation.
            </p>
          </div>
          
          <div className="flex gap-4">
             <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                <input 
                    type="text" 
                    placeholder="Search ledger..." 
                    className="pl-12 pr-6 h-16 bg-white border-2 border-slate-100 rounded-3xl text-sm font-bold w-72 outline-none focus:border-orange-500 transition-all shadow-sm" 
                />
             </div>
             <Button variant="outline" className="h-16 px-8 rounded-3xl border-2 border-slate-200 font-black uppercase tracking-widest text-[10px] text-slate-700 bg-white shadow-xl hover:bg-slate-50">
                <Filter className="h-4 w-4 mr-2" /> Filter Ops
             </Button>
          </div>
        </div>

        {/* --- MAIN ASSIGNMENT TABLE --- */}
        <div className="bg-white rounded-[48px] border-none shadow-2xl overflow-hidden relative">
          {/* Header Row */}
          <div className="p-10 bg-gradient-to-r from-slate-800 to-slate-950 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `url(${textures.accentBg})` }} />
            <div className="flex items-center gap-5 relative z-10">
                <div className="h-14 w-14 rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                    <LayoutGrid size={28} className="text-white" />
                </div>
                <div>
                    <h3 className="text-2xl font-black uppercase tracking-tight">Active Deployment Ledger</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Real-time Engineer Mapping</p>
                </div>
            </div>
          </div>
          
          <div className="overflow-x-auto bg-slate-50/30 relative">
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `url(${textures.gridBg})` }} />
            
            <table className="w-full text-left border-collapse relative z-10">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="p-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Contract Details</th>
                  <th className="p-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Engineering Type</th>
                  <th className="p-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Assignment Status</th>
                  <th className="p-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Deployment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {contracts.map((contract) => (
                  <tr key={contract.id} className="hover:bg-white transition-all duration-300 group">
                    <td className="p-8">
                      <div className="flex flex-col gap-2">
                        <span className="font-mono text-[10px] font-black text-orange-700 tracking-wider bg-orange-50 border border-orange-100 px-2 py-0.5 rounded-md w-fit">
                            {contract.id}
                        </span>
                        <span className="text-lg font-black text-slate-800 tracking-tight group-hover:text-orange-600 transition-colors">
                            {contract.title}
                        </span>
                        <Badge variant="outline" className={cn(
                            "text-[9px] font-black uppercase tracking-widest px-3 py-0.5 border-2 rounded-full w-fit",
                            contract.priority === 'Critical' ? 'bg-rose-50 text-rose-700 border-rose-100' : 
                            contract.priority === 'High' ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-slate-50 text-slate-500'
                        )}>
                          {contract.priority} Priority
                        </Badge>
                      </div>
                    </td>
                    <td className="p-8">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                            "h-10 w-10 rounded-2xl flex items-center justify-center shadow-sm",
                            contract.type === 'Electrical' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                        )}>
                            {contract.type === 'Electrical' ? <Zap size={18} /> : <Hammer size={18} />}
                        </div>
                        <div>
                            <p className="text-sm font-black text-slate-800 uppercase tracking-tight">{contract.type}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Source: {contract.source}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-8">
                      {contract.assignedTo ? (
                        <div className="flex items-center gap-3 bg-emerald-50 border-2 border-emerald-100 px-4 py-2 rounded-2xl w-fit">
                          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-xs font-black text-emerald-700 uppercase tracking-widest">{contract.assignedTo}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 bg-slate-100/50 border-2 border-dashed border-slate-200 px-4 py-2 rounded-2xl w-fit">
                          <Clock className="h-4 w-4 text-slate-400" />
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Awaiting Engineer</span>
                        </div>
                      )}
                    </td>
                    <td className="p-8 text-right">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button 
                            className={cn(
                                "h-12 px-8 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all gap-3 shadow-lg",
                                contract.assignedTo 
                                    ? "bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50" 
                                    : "bg-slate-900 text-white hover:bg-black shadow-slate-200"
                            )}
                          >
                            {contract.assignedTo ? "Reassign" : "Assign Site Eng"} <ChevronDown className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-96 p-0 rounded-[32px] border-none shadow-2xl overflow-hidden ring-1 ring-black/5" align="end">
                          {/* Dropdown Header */}
                          <div className="bg-slate-950 p-6 relative">
                            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `url(${textures.accentBg})` }} />
                            <div className="flex items-center gap-3 relative z-10">
                                <UserPlus className="text-orange-500 h-5 w-5" />
                                <h4 className="text-white text-[11px] font-black uppercase tracking-[0.2em]">Select Deployment Lead</h4>
                            </div>
                          </div>
                          
                          {/* Dropdown List */}
                          <ScrollArea className="h-[400px] bg-white">
                            <div className="p-4 space-y-2">
                              {engineers.map((eng) => (
                                <button
                                  key={eng.name}
                                  onClick={() => handleAssign(contract.id, eng.name)}
                                  className="w-full flex flex-col p-5 rounded-[24px] hover:bg-slate-50 transition-all text-left group border-2 border-transparent hover:border-slate-100"
                                >
                                  <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                      <Avatar className="h-12 w-12 rounded-2xl border-2 border-white shadow-md">
                                        <AvatarFallback className="bg-gradient-to-br from-orange-500 to-rose-600 text-white font-black text-xs">{eng.avatar}</AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <p className="text-sm font-black text-slate-900 tracking-tight">{eng.name}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{eng.role}</p>
                                      </div>
                                    </div>
                                    {eng.load > 85 && (
                                        <div className="bg-rose-100 p-1.5 rounded-lg">
                                            <AlertCircle className="h-4 w-4 text-rose-600" />
                                        </div>
                                    )}
                                  </div>
                                  <div className="space-y-2 w-full">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                      <span className="text-slate-400">Current Workload</span>
                                      <span className={eng.load > 80 ? 'text-rose-600' : 'text-emerald-600'}>{eng.load}%</span>
                                    </div>
                                    <Progress value={eng.load} className="h-2 bg-slate-100" />
                                  </div>
                                </button>
                              ))}
                            </div>
                          </ScrollArea>
                        </PopoverContent>
                      </Popover>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- FOOTER --- */}
        <footer className="mt-24 pt-10 border-t-4 border-slate-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 opacity-40 grayscale hover:grayscale-0 transition-all">
             <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-slate-900 rounded-2xl flex items-center justify-center font-black text-white text-xl shadow-lg">S</div>
                <div className="leading-none">
                    <p className="text-[12px] font-black uppercase tracking-[0.3em]">Shapoorji Pallonji</p>
                    <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-slate-500">Engineering & Construction</p>
                </div>
             </div>
             <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-[0.2em]">Deployment Node: SP-ALLOC-04</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">© 2024 Contract Mgmt Portal • SP-WORKFORCE</p>
             </div>
          </div>
        </footer>
      </div>
    </div>
  );
}