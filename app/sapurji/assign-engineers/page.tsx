"use client";

import React, { useState } from "react";
import { 
  HardHat, Search, Filter, UserPlus, 
  CheckCircle2, Hammer, Zap, Briefcase,
  ChevronDown, UserCheck, AlertCircle, 
  MapPin, Clock
} from "lucide-react";

// Shadcn UI Components (simulated components based on Shadcn patterns)
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

const textures = {
  mainBg: "https://www.transparenttextures.com/patterns/symphony.png",
  gridBg: "https://www.transparenttextures.com/patterns/graphy.png",
  accentBg: "https://www.transparenttextures.com/patterns/carbon-fibre.png",
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
    <div className="min-h-screen bg-slate-50/50 py-10 relative">
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03]" 
        style={{ backgroundImage: `url(${textures.mainBg})` }} 
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 bg-slate-900 flex items-center justify-center rounded-xl shadow-lg">
                <Hammer className="text-orange-500 h-6 w-6" />
              </div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">
                Work <span className="text-orange-600">Assignment</span>
              </h1>
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Map Contracts to Site Engineers</p>
          </div>
          
          <div className="flex gap-3">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input type="text" placeholder="Search contracts..." className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm w-64 outline-none focus:ring-2 focus:ring-orange-500" />
             </div>
             <Button variant="outline" className="rounded-xl border-slate-200"><Filter className="h-4 w-4 mr-2" /> Filter</Button>
          </div>
        </div>

        {/* Assignments Table/List */}
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl overflow-hidden relative">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `url(${textures.gridBg})` }} />
          
          <table className="w-full text-left border-collapse relative z-10">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="p-6 text-[10px] font-black uppercase tracking-widest opacity-70">Contract Details</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest opacity-70">Type & Source</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest opacity-70">Status / Assignee</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest opacity-70 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {contracts.map((contract) => (
                <tr key={contract.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="p-6">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono font-bold text-slate-400 mb-1">{contract.id}</span>
                      <span className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors">{contract.title}</span>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className={`text-[9px] font-black uppercase ${contract.priority === 'Critical' ? 'border-red-200 text-red-600 bg-red-50' : 'border-slate-200 text-slate-500'}`}>
                          {contract.priority}
                        </Badge>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2 mb-1">
                      {contract.type === 'Electrical' ? <Zap className="h-3 w-3 text-amber-500" /> : <Hammer className="h-3 w-3 text-blue-500" />}
                      <span className="text-xs font-bold text-slate-700">{contract.type}</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter italic">via {contract.source}</span>
                  </td>
                  <td className="p-6">
                    {contract.assignedTo ? (
                      <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-lg w-fit">
                        <UserCheck className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="text-xs font-bold text-emerald-700">{contract.assignedTo}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-slate-400 italic text-xs">
                        <Clock className="h-3.5 w-3.5" />
                        Waiting for allocation
                      </div>
                    )}
                  </td>
                  <td className="p-6 text-right">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button 
                          variant={contract.assignedTo ? "outline" : "default"} 
                          className={`rounded-xl font-bold text-xs uppercase tracking-widest h-10 px-6 ${!contract.assignedTo && 'bg-orange-600 hover:bg-orange-700 shadow-lg shadow-orange-100'}`}
                        >
                          {contract.assignedTo ? "Reassign" : "Assign Work"} <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 p-0 rounded-2xl border-slate-200 shadow-2xl overflow-hidden" align="end">
                        {/* Dropdown Header */}
                        <div className="bg-slate-900 p-4 relative">
                          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `url(${textures.accentBg})` }} />
                          <h4 className="text-white text-xs font-black uppercase tracking-widest relative z-10">Select Available Engineer</h4>
                        </div>
                        
                        {/* Dropdown List */}
                        <ScrollArea className="h-72 bg-white">
                          <div className="p-2 space-y-1">
                            {engineers.map((eng) => (
                              <button
                                key={eng.name}
                                onClick={() => handleAssign(contract.id, eng.name)}
                                className="w-full flex flex-col p-3 rounded-xl hover:bg-slate-50 transition-all text-left group"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8 text-[10px] font-bold border-2 border-white shadow-sm">
                                      <AvatarFallback className="bg-orange-100 text-orange-600">{eng.avatar}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <p className="text-xs font-bold text-slate-900">{eng.name}</p>
                                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{eng.role}</p>
                                    </div>
                                  </div>
                                  {eng.load > 85 && <AlertCircle className="h-3 w-3 text-red-500" />}
                                </div>
                                <div className="space-y-1">
                                  <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase">
                                    <span>Current Load</span>
                                    <span className={eng.load > 80 ? 'text-red-500' : 'text-emerald-600'}>{eng.load}%</span>
                                  </div>
                                  <Progress value={eng.load} className={`h-1 ${eng.load > 80 ? 'bg-red-100' : 'bg-slate-100'}`} />
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

        {/* Footer info */}
        <footer className="mt-12 flex justify-between items-center opacity-40 grayscale">
            <div className="flex items-center gap-2">
                <div className="h-6 w-6 bg-slate-900 rounded text-white flex items-center justify-center font-black text-[10px]">S</div>
                <p className="text-[10px] font-black uppercase tracking-widest">Shapoorji Pallonji Workforce Division</p>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest">Authorized Site Control Center</p>
        </footer>
      </div>
    </div>
  );
}