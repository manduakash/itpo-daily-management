"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  PlusCircle, 
  FolderOpen, 
  ClipboardCheck, 
  Activity, 
  FileBarChart2, 
  Building2,
  Users,
  Forward,
  Calculator,
  CheckCircle,
  FileText,
  Calendar,
  LogOut,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";

export type UserRole = "itpo" | "nbcc" | "shapoorji" | "nbcc_engineer" | "shapoorji_engineer";

const roleProfiles: Record<UserRole, { label: string; org: string; color: string }> = {
  itpo: { label: "ITPO Officer", org: "ITPO (Owner)", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
  nbcc: { label: "Project Manager", org: "NBCC (PMC/Developer)", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
  shapoorji: { label: "Operations Head", org: "Shapoorji (Construction)", color: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20" },
  nbcc_engineer: { label: "Site Engineer", org: "NBCC Engineering Team", color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20" },
  shapoorji_engineer: { label: "Field Lead", org: "Shapoorji Field Team", color: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20" },
};

const navigationMap: Record<UserRole, Array<{ name: string; href: string; icon: any; badge?: number }>> = {
  itpo: [
    { name: "Dashboard", href: "/itpo/dashboard", icon: LayoutDashboard },
    { name: "Raise Contract", href: "/itpo/raise-contract", icon: PlusCircle },
    { name: "All Contracts", href: "/itpo/contracts", icon: FolderOpen },
    { name: "Pending Approvals", href: "/itpo/approvals", icon: ClipboardCheck, badge: 3 },
    { name: "Project Tracking", href: "/itpo/tracking", icon: Activity },
    { name: "Reports", href: "/itpo/reports", icon: FileBarChart2 },
  ],
  nbcc: [
    { name: "Dashboard", href: "/nbcc/dashboard", icon: LayoutDashboard },
    { name: "Assigned Contracts", href: "/nbcc/assigned", icon: FolderOpen },
    { name: "Contract Review", href: "/nbcc/review", icon: ClipboardCheck, badge: 2 },
    { name: "Engineer Allocation", href: "/nbcc/engineer-allocation", icon: Users },
    { name: "Forward to Shapoorji", href: "/nbcc/forward", icon: Forward },
    { name: "Ongoing Projects", href: "/nbcc/ongoing", icon: Activity },
    { name: "Reports", href: "/nbcc/reports", icon: FileBarChart2 },
  ],
  shapoorji: [
    { name: "Dashboard", href: "/shapoorji/dashboard", icon: LayoutDashboard },
    { name: "Assigned Contracts", href: "/shapoorji/assigned", icon: FolderOpen },
    { name: "Estimations", href: "/shapoorji/estimations", icon: Calculator, badge: 1 },
    { name: "Assign Engineers", href: "/shapoorji/assign-engineers", icon: Users },
    { name: "Ongoing Projects", href: "/shapoorji/ongoing", icon: Activity },
    { name: "Completion Reports", href: "/shapoorji/completion", icon: CheckCircle },
  ],
  nbcc_engineer: [
    { name: "Dashboard", href: "/nbcc-eng/dashboard", icon: LayoutDashboard },
    { name: "My Assignments", href: "/nbcc-eng/assignments", icon: ClipboardCheck, badge: 4 },
    { name: "Daily Progress", href: "/nbcc-eng/progress", icon: Calendar },
    { name: "Site Reports", href: "/nbcc-eng/site-reports", icon: FileText },
    { name: "Completion", href: "/nbcc-eng/completion", icon: CheckCircle },
  ],
  shapoorji_engineer: [
    { name: "Dashboard", href: "/sp-eng/dashboard", icon: LayoutDashboard },
    { name: "My Assignments", href: "/sp-eng/assignments", icon: ClipboardCheck, badge: 2 },
    { name: "Daily Progress", href: "/sp-eng/progress", icon: Calendar },
    { name: "Site Reports", href: "/sp-eng/site-reports", icon: FileText },
    { name: "Completion", href: "/sp-eng/completion", icon: CheckCircle },
  ],
};

export function RoleBasedSidebar({ currentRole }: { currentRole: UserRole }) {
  const pathname = usePathname();
  const router = useRouter();
  const menuItems = navigationMap[currentRole] || [];
  const profile = roleProfiles[currentRole];

  const handleSignOut = () => {
    // Clear cookie and redirect to login page
    document.cookie = "user-role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    router.push("/login");
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-20 flex h-full w-64 flex-col border-r border-border bg-card text-card-foreground">
      <div className="flex h-16 items-center px-6 border-b border-border gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Building2 className="h-5 w-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold leading-none tracking-tight">Bharat Mandapam</span>
          <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mt-0.5">CMS Platform</span>
        </div>
      </div>

      <div className="p-4 border-b border-border/60 bg-muted/30">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Account Context</span>
        <div className={cn("flex flex-col gap-1 rounded-lg border px-3 py-2 text-xs mt-1", profile?.color)}>
          <span className="font-semibold">{profile?.label || "Unknown Role"}</span>
          <span className="text-[10px] opacity-80 font-medium">{profile?.org || "System Access"}</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-4 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-semibold text-slate-50">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-border p-4">
        <div className="flex items-center gap-3 rounded-lg p-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
            <User className="h-4 w-4" />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-xs font-semibold truncate">Active Session</span>
            <span className="text-[10px] text-muted-foreground truncate">{currentRole.toUpperCase()} Account</span>
          </div>
        </div>
        <button 
          onClick={handleSignOut}
          className="flex w-full items-center gap-2 rounded-md px-3 py-2 mt-2 text-xs font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}