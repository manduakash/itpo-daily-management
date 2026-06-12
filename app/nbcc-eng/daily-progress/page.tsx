"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera, 
  Send, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Image as ImageIcon,
  Plus,
  Trash2,
  Calendar,
  FileText,
  TrendingUp,
  MapPin
} from "lucide-react";

// --- Framer Motion Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function DailyProgressPage() {
  const [images, setImages] = useState<string[]>([]);
  const [progress, setProgress] = useState(50);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-10 text-slate-800 font-sans">
      
      {/* Header Section */}
      <motion.div 
        initial="hidden" 
        animate="visible" 
        variants={fadeInUp}
        className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-md">
              Field Report
            </span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-800">
            Daily Progress <span className="text-indigo-600">Logger</span>
          </h1>
          <p className="text-slate-500 font-medium mt-1 flex items-center gap-2">
            <Calendar size={16} /> {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-xl shadow-slate-200/50 border border-white">
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl">
                <Clock size={18} className="animate-pulse" />
                <span className="text-sm font-bold">Shift: 09:00 AM - 06:00 PM</span>
            </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Form Section */}
        <motion.div 
          variants={stagger} 
          initial="hidden" 
          animate="visible" 
          className="lg:col-span-2 space-y-8"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Project Selection Card */}
            <div className="bg-white/70 backdrop-blur-xl border border-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/40">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <FileText className="text-indigo-600" /> Contract Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Active Assignment</label>
                  <select className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500/20 focus:outline-none appearance-none">
                    <option>CON-7721: Electrical Panel Hall 3</option>
                    <option>CON-8102: Plumbing Zone B</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Work Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input disabled value="Bharat Mandapam - Hall 3, Level 1" className="w-full p-4 pl-12 bg-slate-100 border border-slate-100 rounded-2xl text-sm font-bold text-slate-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Daily Update & Manpower */}
            <div className="bg-gradient-to-br from-indigo-50 via-white to-white border border-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/40">
              <h3 className="text-xl font-bold mb-6">Work Log & Resources</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Today's Achievements</label>
                  <textarea 
                    placeholder="Describe what was completed today..." 
                    rows={4}
                    className="w-full p-5 bg-white border border-slate-100 rounded-3xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:outline-none shadow-inner"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-2 text-indigo-600 mb-2">
                      <Users size={16} /> <span className="text-[10px] font-black uppercase">Skilled Labor</span>
                    </div>
                    <input type="number" placeholder="0" className="text-2xl font-black w-full outline-none" />
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-2 text-amber-600 mb-2">
                      <Users size={16} /> <span className="text-[10px] font-black uppercase">Unskilled</span>
                    </div>
                    <input type="number" placeholder="0" className="text-2xl font-black w-full outline-none" />
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-2 text-rose-600 mb-2">
                      <AlertTriangle size={16} /> <span className="text-[10px] font-black uppercase">Incidents</span>
                    </div>
                    <input type="number" placeholder="0" className="text-2xl font-black w-full outline-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Media Upload */}
            <div className="bg-white/70 backdrop-blur-xl border border-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/40">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Site Media</h3>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Max 5 Photos</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button type="button" className="aspect-square rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all">
                  <Camera size={24} />
                  <span className="text-[10px] font-bold uppercase">Add Photo</span>
                </button>
                {/* Mock Uploaded Images */}
                <div className="aspect-square rounded-3xl bg-slate-100 overflow-hidden relative group">
                  <img src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=200" alt="work" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Trash2 className="text-white cursor-pointer" size={20} />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button 
              disabled={isSubmitting}
              className={`w-full py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-sm shadow-2xl transition-all flex items-center justify-center gap-3 ${
                isSubmitting ? "bg-slate-400" : "bg-slate-900 text-white hover:bg-indigo-600 hover:shadow-indigo-200"
              }`}
            >
              {isSubmitting ? "Uploading Logs..." : <>Submit Daily Progress <Send size={18} /></>}
            </button>
          </form>
        </motion.div>

        {/* Right Column: Status & History */}
        <motion.div 
          variants={fadeInUp} 
          initial="hidden" 
          animate="visible" 
          className="space-y-8"
        >
          {/* Progress Card */}
          <div className="bg-white/70 backdrop-blur-xl border border-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/40 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <TrendingUp size={20} className="text-emerald-500" /> Overall Progress
              </h3>
              <div className="text-5xl font-black text-slate-800 mb-4">{progress}%</div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={progress} 
                onChange={(e) => setProgress(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 mb-4" 
              />
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Manually estimate completion</p>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500/5 rounded-full blur-3xl" />
          </div>

          {/* Recent Logs Timeline */}
          <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-900/20 relative overflow-hidden border border-slate-800">
            <h3 className="text-lg font-bold mb-6">Recent Logs</h3>
            <div className="space-y-6 relative border-l border-white/10 ml-2 pl-6">
              {[
                { date: "Yesterday", status: "Approved", activity: "Main panel wiring completed" },
                { date: "22 Oct", status: "Flagged", activity: "Material shortage: 2.5mm wire" },
                { date: "21 Oct", status: "Approved", activity: "Internal conduit mapping done" },
              ].map((log, i) => (
                <div key={i} className="relative">
                  <div className={`absolute -left-[1.9rem] top-1 w-2.5 h-2.5 rounded-full ${log.status === 'Flagged' ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter mb-1">{log.date} • {log.status}</p>
                  <p className="text-sm font-bold text-slate-200 leading-tight">{log.activity}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
              View History
            </button>
          </div>

          {/* Reminder Card */}
          <div className="bg-amber-50 border border-amber-100 p-6 rounded-[2rem] flex items-start gap-4">
            <div className="p-3 bg-amber-200 text-amber-700 rounded-2xl">
              <AlertTriangle size={24} />
            </div>
            <div>
              <p className="text-sm font-black text-amber-800 uppercase tracking-tight">Engineer's Note</p>
              <p className="text-xs font-bold text-amber-700/80 mt-1 leading-relaxed">
                Ensure all safety protocols are logged. High voltage testing scheduled for tomorrow.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}