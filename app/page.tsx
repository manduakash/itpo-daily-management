"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Building2, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ShieldCheck,
  ChevronRight,
  ArrowRight
} from "lucide-react";

// Mock profiles for development quick-access
const demoProfiles = [
  { role: "itpo", label: "ITPO (Owner)", email: "itpo.admin@itpo.gov.in" },
  { role: "nbcc", label: "NBCC (PMC)", email: "nbcc.pm@nbcc.india.in" },
  { role: "shapoorji", label: "Shapoorji (Contractor)", email: "sp.ops@shapoorji.com" },
  { role: "nbcc_engineer", label: "NBCC Engineer", email: "nbcc.eng01@nbcc.india.in" },
  { role: "shapoorji_engineer", label: "SP Engineer", email: "sp.field05@shapoorji.com" },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("itpo");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication lag
    setTimeout(() => {
      setIsLoading(false);
      // Route appropriately based on role choice
      if (selectedRole === "itpo") router.push("/itpo/dashboard");
      else if (selectedRole === "nbcc") router.push("/nbcc/dashboard");
      else if (selectedRole === "shapoorji") router.push("/sapurji/dashboard");
      else if (selectedRole === "nbcc_engineer") router.push("/nbcc-eng/dashboard");
      else if (selectedRole === "shapoorji_engineer") router.push("/sapurji-eng/dashboard");
    }, 1200);
  };

  const applyDemoProfile = (profile: typeof demoProfiles[0]) => {
    setEmail(profile.email);
    setPassword("••••••••••••");
    setSelectedRole(profile.role);
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-background">
      
      {/* Left Panel: Brand & Info Panel */}
      <div className="md:w-1/2 bg-slate-900 text-white flex flex-col justify-between p-8 md:p-12 lg:p-16 relative overflow-hidden">
        {/* Subtle decorative background patterns */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:16px_16px]" />
        
        {/* Header Branding */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500 text-white shadow-lg">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight">Bharat Mandapam</h1>
            <p className="text-[10px] uppercase tracking-wider text-orange-400 font-semibold">Contract Management System</p>
          </div>
        </div>

        {/* Central Vision Statement */}
        <div className="my-12 md:my-0 relative z-10 max-w-lg">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/10 text-orange-300 border border-white/10 mb-6">
            <ShieldCheck className="h-3 w-3" /> Secure Infrastructure Portal
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight leading-tight">
            Centralized platform for operations, renovations, & site engineering.
          </h2>
          <p className="text-sm text-slate-400 mt-4 leading-relaxed">
            Coordinating workflows seamlessly between ITPO, NBCC, and Shapoorji Pallonji to ensure world-class standards at India&apos;s landmark convention complex.
          </p>
        </div>

        {/* Footer info */}
        <div className="text-xs text-slate-500 relative z-10 flex flex-col gap-2">
          <span>India Trade Promotion Organisation (ITPO) © 2025</span>
          <div className="flex gap-4">
            <a href="#" className="hover:underline hover:text-slate-300">Terms of Service</a>
            <a href="#" className="hover:underline hover:text-slate-300">Privacy Policy</a>
          </div>
        </div>
      </div>

      {/* Right Panel: Login Form & Sandbox */}
      <div className="md:w-1/2 flex flex-col justify-center px-6 py-12 md:px-12 lg:px-20 bg-background">
        <div className="mx-auto w-full max-w-md space-y-8">
          
          {/* Header titles */}
          <div>
            <h3 className="text-2xl font-semibold tracking-tight">System Login</h3>
            <p className="text-sm text-muted-foreground mt-1.5">
              Select your role category and enter credentials to access your terminal workspace.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Role Select Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">Organizational Role</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                required
              >
                <option value="itpo">ITPO (Project Owner)</option>
                <option value="nbcc">NBCC (Project Management Consultant)</option>
                <option value="shapoorji">Shapoorji (Construction & Arch. Partner)</option>
                <option value="nbcc_engineer">NBCC (Field Engineer)</option>
                <option value="shapoorji_engineer">Shapoorji Pallonji (Field Engineer)</option>
              </select>
            </div>

            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/70" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@agency.gov.in"
                  className="w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-muted-foreground">Password</label>
                <a href="#" className="text-xs text-primary hover:underline">Forgot?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/70" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-md border border-input bg-background pl-9 pr-10 py-2 text-sm placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground/70 hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold h-10 hover:bg-primary/90 transition-colors disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  Verifying Credentials...
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  Secure Access Terminal <ChevronRight className="h-4 w-4" />
                </span>
              )}
            </button>
          </form>

          {/* Quick Demo Accounts Sandbox Panel */}
          <div className="rounded-lg border border-border bg-muted/30 p-4 mt-4">
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
              Developer Demo Accounts
            </h4>
            <p className="text-[11px] text-muted-foreground mb-3">
              Click any agency role profile below to auto-populate credentials for instant interface simulation:
            </p>
            <div className="flex flex-col gap-2">
              {demoProfiles.map((profile, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => applyDemoProfile(profile)}
                  className="flex items-center justify-between rounded border border-border bg-card px-2.5 py-1.5 text-xs font-medium hover:bg-accent hover:text-accent-foreground transition-colors text-left"
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-foreground text-[11px]">{profile.label}</span>
                    <span className="text-[10px] text-muted-foreground font-mono">{profile.email}</span>
                  </div>
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}