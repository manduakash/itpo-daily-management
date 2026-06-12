"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  FileCheck, 
  Award, 
  HardHat, 
  Camera, 
  FileText, 
  ArrowRight, 
  AlertCircle,
  Archive,
  Download,
  ClipboardList,
  ExternalLink,
  ShieldCheck
} from "lucide-react";

// --- Mock Completion Data ---
const completionTasks = [
  {
    id: "CON-9901",
    title: "Convention Hall 1: Flooring",
    completionDate: "Oct 22, 2023",
    inspector: "Mr. R.K. Verma (ITPO)",
    qualityScore: "9.8/10",
    status: "Ready for Handover",
    gradient: "from-emerald-500/10 via-transparent to-transparent",
    snags: 0
  },
  {
    id: "CON-9812",
    title: "VVIP Lounge: HVAC System",
    completionDate: "Oct 20, 2023",
    inspector: "Mr. S. Tyagi (NBCC)",
    qualityScore: "9.2/10",
    status: "Pending Inspection",
    gradient: "from-blue-500/10 via-transparent to-transparent",
    snags: 3
  }
];

const handoverChecklist = [
  { task: "Site Cleared of Debris", done: true },
  { task: "As-Built Drawings Uploaded", done: true },
  { task: "Technical Manuals Submitted", done: true },
  { task: "Keys/Access Codes Tagged", done: false },
  { task: "Final Safety Audit", done: true },
];

export default function CompletionHandover() {
  const [selectedTask, setSelectedTask] = useState(completionTasks[0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-4 md:p-8 space-y-8 bg-[#FBFDFF] dark:bg-slate-950 min-h-screen"
    >
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-widest mb-1">
            <Award size={14} /> Stage: Project Handover
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Completion Gallery</h1>
          <p className="text-slate-500 text-sm mt-1">Formal documentation and handover procedures for finished works.</p>
        </motion.div>

        <motion.button 
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl text-sm font-bold shadow-lg shadow-indigo-200 dark:shadow-none transition-all"
        >
          <FileCheck size={18} /> Request Final Inspection
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- LEFT: COMPLETED CONTRACTS LIST --- */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-2">Recently Finished</h3>
          {completionTasks.map((task) => (
            <motion.div
              key={task.id}
              variants={itemVariants}
              onClick={() => setSelectedTask(task)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all relative overflow-hidden group ${
                selectedTask.id === task.id 
                ? "bg-white border-emerald-200 shadow-md ring-1 ring-emerald-500/20" 
                : "bg-white/50 border-slate-100 hover:border-slate-200"
              }`}
            >
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${task.gradient} opacity-60`} />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-black text-indigo-500 tracking-tighter">{task.id}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    task.status === 'Ready for Handover' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                  }`}>
                    {task.status}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-white group-hover:text-indigo-600 transition-colors">
                  {task.title}
                </h4>
                <div className="flex items-center gap-3 mt-4 text-[11px] font-medium text-slate-400">
                  <span className="flex items-center gap-1"><ShieldCheck size={12}/> Score: {task.qualityScore}</span>
                  <span className="flex items-center gap-1"><AlertCircle size={12}/> Snags: {task.snags}</span>
                </div>
              </div>
            </motion.div>
          ))}
          
          <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 text-xs font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2 uppercase tracking-widest">
            <Archive size={16} /> Archive History
          </button>
        </div>

        {/* --- RIGHT: HANDOVER DETAILS --- */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div 
            key={selectedTask.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
          >
            {/* Completion Banner */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white relative">
              <CheckCircle2 className="absolute top-6 right-8 h-24 w-24 opacity-10" />
              <div className="relative z-10">
                <h2 className="text-2xl font-bold">{selectedTask.title}</h2>
                <p className="text-emerald-50 text-sm mt-1 opacity-90 tracking-wide">Work fully completed and verified on {selectedTask.completionDate}</p>
                
                <div className="flex flex-wrap gap-4 mt-6">
                  <button className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl text-xs font-bold hover:bg-white/30 transition-all">
                    <Download size={14} /> Download Certificate
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-emerald-800/40 backdrop-blur-md rounded-xl text-xs font-bold hover:bg-emerald-800/60 transition-all">
                    <ExternalLink size={14} /> View As-Built Drawings
                  </button>
                </div>
              </div>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Pre-Handover Checklist */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <ClipboardList size={18} className="text-indigo-500" /> Handover Checklist
                </h3>
                <div className="space-y-3">
                  {handoverChecklist.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                      <div className={`rounded-full p-0.5 ${item.done ? 'bg-emerald-500 text-white' : 'border-2 border-slate-200'}`}>
                        {item.done ? <CheckCircle2 size={14} /> : <div className="w-3.5 h-3.5" />}
                      </div>
                      <span className={`text-xs font-semibold ${item.done ? 'text-slate-700' : 'text-slate-400 italic'}`}>{item.task}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inspection Summary */}
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-100 space-y-4">
                  <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Inspection Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-xs text-slate-500">Assigned Inspector</span>
                      <span className="text-xs font-bold text-slate-700">{selectedTask.inspector}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-slate-500">Quality Index</span>
                      <span className="text-xs font-bold text-emerald-600">{selectedTask.qualityScore}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-slate-500">Snags Found</span>
                      <span className={`text-xs font-bold ${selectedTask.snags > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                        {selectedTask.snags} Minor Issues
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 bg-white border border-slate-100 rounded-2xl flex flex-col items-center justify-center text-center">
                    <Camera size={20} className="text-slate-300 mb-2" />
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Final Site Photos</span>
                    <span className="text-xs font-bold mt-1 text-indigo-600">12 Images</span>
                  </div>
                  <div className="p-4 bg-white border border-slate-100 rounded-2xl flex flex-col items-center justify-center text-center">
                    <FileText size={20} className="text-slate-300 mb-2" />
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Tech Manuals</span>
                    <span className="text-xs font-bold mt-1 text-indigo-600">04 Docs</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-6 bg-slate-50/50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
              <button className="px-5 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 transition-colors uppercase tracking-widest">
                Print Report
              </button>
              <button className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-md shadow-emerald-100 group">
                Submit Final Handover Package
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}