"use client";

import React, { useState } from "react";
import { 
  Hammer, MapPin, Clock, Users, 
  AlertTriangle, CheckCircle2, TrendingUp, 
  MoreVertical, Calendar, ArrowRight,
  Filter, Search, Building2, BarChart3
} from "lucide-react";

// Shadcn UI simulated components
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const textures = {
  mainBg: "https://www.transparenttextures.com/patterns/symphony.png",
  gridBg: "https://www.transparenttextures.com/patterns/graphy.png",
  accentBg: "https://www.transparenttextures.com/patterns/carbon-fibre.png",
};

const ongoingProjects = [
  {
    id: "PRJ-2024-01",
    title: "Convention Hall 3 Facade",
    location: "Level 2, North Wing",
    engineer: "Amit Sharma",
    progress: 78,
    status: "On Track",
    priority: "High",
    startDate: "12 Aug",
    daysLeft: "14 Days",
    health: "good"
  },
  {
    id: "PRJ-2024-05",
    title: "VVIP Lounge Interior Fit-out",
    location: "Ground Floor, Gate 5",
    engineer: "Priya Das",
    progress: 45,
    status: "Delayed",
    priority: "Critical",
    startDate: "01 Sep",
    daysLeft: "45 Days",
    health: "at-risk"
  },
  {
    id: "PRJ-2024-09",
    title: "Plaza Granite Paving",
    location: "Central Courtyard",
    engineer: "Rajesh Kumar",
    progress: 92,
    status: "Inspection Pending",
    priority: "Medium",
    startDate: "20 July",
    daysLeft: "2 Days",
    health: "good"
  },
  {
    id: "PRJ-2024-12",
    title: "Hall 5 HVAC Overhaul",
    location: "Rooftop, Section C",
    engineer: "Sanya Mirza",
    progress: 20,
    status: "WIP",
    priority: "High",
    startDate: "15 Oct",
    daysLeft: "90 Days",
    health: "good"
  }
];

export default function OngoingProjects() {
  return (
    <div className="min-h-screen bg-slate-50/50 py-10 relative">
      {/* Background Texture Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03]" 
        style={{ backgroundImage: `url(${textures.mainBg})` }} 
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 bg-orange-600 flex items-center justify-center rounded-xl shadow-lg">
                <Building2 className="text-white h-6 w-6" />
              </div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">
                Ongoing <span className="text-orange-600">Projects</span>
              </h1>
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Real-time Execution & Site Monitoring</p>
          </div>
          
          <div className="flex gap-3">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input type="text" placeholder="Search project ID..." className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm w-64 outline-none focus:ring-2 focus:ring-orange-500" />
             </div>
             <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
                <Filter className="h-4 w-4" /> Filter
             </button>
          </div>
        </div>

        {/* Status Summary Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            {[
                { label: "Active Sites", count: "12", icon: Hammer, color: "text-blue-600" },
                { label: "On Schedule", count: "09", icon: CheckCircle2, color: "text-emerald-600" },
                { label: "Delayed/Alerts", count: "03", icon: AlertTriangle, color: "text-red-500" },
                { label: "Avg. Progress", count: "64%", icon: TrendingUp, color: "text-orange-600" },
            ].map((stat, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `url(${textures.gridBg})` }} />
                    <div className={`h-10 w-10 rounded-lg bg-slate-50 flex items-center justify-center ${stat.color}`}>
                        <stat.icon className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-xl font-black text-slate-900 leading-none">{stat.count}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
                    </div>
                </div>
            ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {ongoingProjects.map((prj) => (
            <Card key={prj.id} className="border-slate-200 bg-white overflow-hidden group hover:border-orange-500 transition-all duration-300">
              {/* Texture Header */}
              <div className="h-2 bg-slate-100 relative">
                  <div 
                    className={`absolute inset-0 opacity-40 transition-all group-hover:opacity-100 ${
                        prj.health === 'good' ? 'bg-emerald-500' : 'bg-red-500'
                    }`}
                    style={{ backgroundImage: `url(${textures.accentBg})`, width: '100%' }}
                  />
              </div>
              
              <CardContent className="p-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `url(${textures.gridBg})` }} />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-tighter">{prj.id}</span>
                      <h3 className="text-lg font-black text-slate-900 group-hover:text-orange-600 transition-colors leading-tight">{prj.title}</h3>
                      <div className="flex items-center gap-1.5 text-slate-500 mt-1">
                        <MapPin className="h-3 w-3" />
                        <span className="text-[11px] font-bold uppercase tracking-tight">{prj.location}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className={`text-[9px] font-black uppercase tracking-widest ${
                        prj.status === 'Delayed' ? 'bg-red-50 text-red-600 border-red-100' : 
                        prj.status === 'Inspection Pending' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                        'bg-emerald-50 text-emerald-600 border-emerald-100'
                    }`}>
                      {prj.status}
                    </Badge>
                  </div>

                  {/* Progress Section */}
                  <div className="my-6">
                    <div className="flex justify-between items-end mb-2">
                        <div className="flex items-center gap-2">
                            <BarChart3 className="h-3.5 w-3.5 text-slate-400" />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Execution Progress</span>
                        </div>
                        <span className="text-xl font-black text-slate-900">{prj.progress}%</span>
                    </div>
                    <Progress value={prj.progress} className="h-2 bg-slate-100" />
                  </div>

                  {/* Footer Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                            <AvatarFallback className="bg-slate-900 text-white text-[10px] font-bold">
                                {prj.engineer.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Engineer In-Charge</p>
                            <p className="text-xs font-bold text-slate-800">{prj.engineer}</p>
                        </div>
                    </div>
                    
                    <div className="flex gap-4 text-right">
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Deadline</p>
                            <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                                <Clock className="h-3 w-3 text-orange-500" /> {prj.daysLeft}
                            </div>
                        </div>
                        <button className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all">
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Global Alert Bar */}
        <div className="mt-10 p-4 bg-slate-900 rounded-2xl relative overflow-hidden shadow-xl border border-white/5">
             <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `url(${textures.accentBg})` }} />
             <div className="relative z-10 flex items-center justify-between px-4">
                <div className="flex items-center gap-4 text-white">
                    <div className="h-8 w-8 rounded-full bg-red-500/20 flex items-center justify-center">
                        <AlertTriangle className="h-4 w-4 text-red-500 animate-pulse" />
                    </div>
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest">Resource Alert</p>
                        <p className="text-[10px] text-slate-400">Material delivery for VVIP Lounge delayed by 48 hours. Impact: Low.</p>
                    </div>
                </div>
                <button className="text-[10px] font-black text-white uppercase tracking-widest border border-white/20 px-4 py-2 rounded-lg hover:bg-white/10">
                    Acknowledge
                </button>
             </div>
        </div>

        {/* Institutional Footer */}
        <footer className="mt-20 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 opacity-40">
            <div className="flex items-center gap-3 font-black text-slate-900 tracking-tighter text-sm italic">
                <div className="h-6 w-6 bg-slate-900 rounded text-white flex items-center justify-center not-italic text-[10px]">S</div>
                SHAPOORJI PALLONJI SITE OPERATIONS
            </div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">© 2024 Bharat Mandapam CMS • Unit 04</p>
        </footer>
      </div>
    </div>
  );
}