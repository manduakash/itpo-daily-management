"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera, 
  Users, 
  Hammer, 
  AlertTriangle, 
  CheckCircle, 
  ChevronRight, 
  Calendar as CalendarIcon,
  Plus,
  X,
  Clock,
  Save,
  Send
} from "lucide-react";

// --- Mock Projects for Selection ---
const projects = [
  { id: "CON-9901", title: "Convention Hall 1: Flooring" },
  { id: "CON-9905", title: "VVIP Lounge: HVAC" },
  { id: "CON-9844", title: "External Facade Lighting" },
];

export default function DailyProgress() {
  const [selectedProject, setSelectedProject] = useState(projects[0].id);
  const [progress, setProgress] = useState(65);
  const [photos, setPhotos] = useState<number[]>([]);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const addPhoto = () => setPhotos([...photos, Date.now()]);
  const removePhoto = (id: number) => setPhotos(photos.filter(p => p !== id));

  return (
    <div className="p-4 md:p-8 bg-[#F9FBFF] dark:bg-slate-950 min-h-screen">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Daily Progress Report</h1>
          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-xs font-bold text-slate-600">
              <CalendarIcon size={14} className="text-indigo-500" />
              {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-100 rounded-full text-[10px] font-black text-amber-600 uppercase tracking-wider">
              <Clock size={12} /> Draft
            </span>
          </div>
        </motion.div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Save size={18} /> Save Draft
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 dark:shadow-none">
            <Send size={18} /> Submit DPR
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- LEFT COLUMN: WORK DETAILS --- */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Project Selector */}
          <motion.div 
            variants={fadeIn} initial="hidden" animate="visible"
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm"
          >
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 block">Select Assigned Contract</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {projects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedProject(p.id)}
                  className={`relative p-4 rounded-xl text-left border transition-all ${
                    selectedProject === p.id 
                    ? "border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600" 
                    : "border-slate-100 bg-slate-50/50 hover:border-slate-200"
                  }`}
                >
                  <div className={`text-[10px] font-bold mb-1 ${selectedProject === p.id ? "text-indigo-600" : "text-slate-400"}`}>{p.id}</div>
                  <div className={`text-sm font-bold ${selectedProject === p.id ? "text-slate-900" : "text-slate-600"}`}>{p.title}</div>
                  {selectedProject === p.id && (
                    <motion.div layoutId="check" className="absolute top-2 right-2 text-indigo-600">
                      <CheckCircle size={16} />
                    </motion.div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Work Description */}
          <motion.div 
            variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm"
          >
            <div className="flex flex-col gap-6">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">Work Accomplished Today</label>
                <textarea 
                  placeholder="Describe the tasks completed, materials used, and specific site areas covered..."
                  className="w-full min-h-[150px] p-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all"
                />
              </div>

              {/* Interactive Progress Slider */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Overall Progress Update</label>
                  <span className="text-lg font-black text-indigo-600">{progress}%</span>
                </div>
                <input 
                  type="range" min="0" max="100" value={progress}
                  onChange={(e) => setProgress(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400">
                  <span>0% START</span>
                  <span>50% MIDWAY</span>
                  <span>100% COMPLETION</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* --- RIGHT COLUMN: RESOURCES & MEDIA --- */}
        <div className="space-y-6">
          
          {/* Manpower & Machinery */}
          <motion.div 
            variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm"
          >
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Users size={18} className="text-indigo-500" /> Resource Logging
            </h3>
            <div className="space-y-4">
              {[
                { label: "Skilled Labor", icon: Users, color: "from-blue-500/10" },
                { label: "General Labor", icon: Users, color: "from-slate-500/10" },
                { label: "Machinery/Tools", icon: Hammer, color: "from-amber-500/10" }
              ].map((res, i) => (
                <div key={i} className={`flex items-center justify-between p-3 rounded-xl bg-gradient-to-r ${res.color} to-transparent border border-slate-50`}>
                  <div className="flex items-center gap-3">
                    <res.icon size={16} className="text-slate-500" />
                    <span className="text-xs font-bold text-slate-700">{res.label}</span>
                  </div>
                  <input type="number" defaultValue="0" className="w-12 bg-white border border-slate-200 rounded text-center text-xs font-bold py-1" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Photo Upload */}
          <motion.div 
            variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm"
          >
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Camera size={18} className="text-indigo-500" /> Site Media
            </h3>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <AnimatePresence>
                {photos.map((id) => (
                  <motion.div 
                    key={id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="relative aspect-square bg-slate-100 rounded-xl overflow-hidden group"
                  >
                    <img src={`https://api.dicebear.com/7.x/shapes/svg?seed=${id}`} alt="Site" className="object-cover w-full h-full opacity-50" />
                    <button 
                      onClick={() => removePhoto(id)}
                      className="absolute top-1 right-1 p-1 bg-white/80 rounded-full text-rose-500 scale-0 group-hover:scale-100 transition-transform"
                    >
                      <X size={12} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              <button 
                onClick={addPhoto}
                className="aspect-square border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-indigo-500 hover:border-indigo-500 hover:bg-indigo-50/30 transition-all"
              >
                <Plus size={24} />
                <span className="text-[10px] font-bold uppercase">Add Photo</span>
              </button>
            </div>
            <p className="text-[10px] text-slate-400 text-center font-medium italic">Upload up to 6 high-res site images</p>
          </motion.div>

          {/* Site Safety Observation */}
          <motion.div 
            variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.4 }}
            className="bg-rose-50/50 border border-rose-100 rounded-2xl p-5"
          >
            <div className="flex items-center gap-2 mb-3 text-rose-600">
              <AlertTriangle size={18} />
              <h3 className="text-sm font-bold">Safety / Blockers</h3>
            </div>
            <textarea 
              placeholder="Any accidents, safety violations, or blockers for tomorrow?"
              className="w-full bg-transparent border-none text-xs text-rose-800 placeholder:text-rose-300 focus:outline-none resize-none"
              rows={3}
            />
          </motion.div>

        </div>
      </div>
    </div>
  );
}