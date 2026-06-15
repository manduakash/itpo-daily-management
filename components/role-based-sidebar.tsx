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
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type UserRole =
  | "itpo"
  | "nbcc"
  | "shapoorji"
  | "nbcc_engineer"
  | "shapoorji_engineer";

const roleProfiles: Record<
  UserRole,
  {
    label: string;
    org: string;
    accent: string;
  }
> = {
  itpo: {
    label: "ITPO Officer",
    org: "ITPO (Owner)",
    accent: "#B8C0FF",
  },
  nbcc: {
    label: "Project Manager",
    org: "NBCC (PMC/Developer)",
    accent: "#FFD6A5",
  },
  shapoorji: {
    label: "Operations Head",
    org: "Shapoorji (Construction)",
    accent: "#BDE0A8",
  },
  nbcc_engineer: {
    label: "Site Engineer",
    org: "NBCC Engineering Team",
    accent: "#A9D6E5",
  },
  shapoorji_engineer: {
    label: "Field Lead",
    org: "Shapoorji Field Team",
    accent: "#E4C1F9",
  },
};

const navigationMap: Record<
  UserRole,
  Array<{ name: string; href: string; icon: any; badge?: number }>
> = {
  itpo: [
    { name: "Dashboard", href: "/itpo/dashboard", icon: LayoutDashboard },
    { name: "Raise Contract", href: "/itpo/raise-contract", icon: PlusCircle },
    { name: "All Contracts", href: "/itpo/contracts", icon: FolderOpen },
    {
      name: "Pending Approvals",
      href: "/itpo/approvals",
      icon: ClipboardCheck,
      badge: 3,
    },
    { name: "Project Tracking", href: "/itpo/tracking", icon: Activity },
    { name: "Reports", href: "/itpo/reports", icon: FileBarChart2 },
  ],

  nbcc: [
    { name: "Dashboard", href: "/nbcc/dashboard", icon: LayoutDashboard },
    {
      name: "Assigned Contracts",
      href: "/nbcc/assigned-contracts",
      icon: FolderOpen,
    },
    {
      name: "Contract Review",
      href: "/nbcc/contract-review",
      icon: ClipboardCheck,
      badge: 2,
    },
    {
      name: "Engineer Allocation",
      href: "/nbcc/engineer-allocation",
      icon: Users,
    },
    {
      name: "Forward to Shapoorji",
      href: "/nbcc/forward-to-shapoorji",
      icon: Forward,
    },
    {
      name: "Ongoing Projects",
      href: "/nbcc/ongoing-projects",
      icon: Activity,
    },
    { name: "Reports", href: "/nbcc/reports", icon: FileBarChart2 },
  ],

  shapoorji: [
    { name: "Dashboard", href: "/sapurji/dashboard", icon: LayoutDashboard },
    {
      name: "Assigned Contracts",
      href: "/sapurji/assigned-contracts",
      icon: FolderOpen,
    },
    {
      name: "Estimations",
      href: "/sapurji/estimations",
      icon: Calculator,
      badge: 1,
    },
    {
      name: "Assign Engineers",
      href: "/sapurji/assign-engineers",
      icon: Users,
    },
    {
      name: "Ongoing Projects",
      href: "/sapurji/ongoing-projects",
      icon: Activity,
    },
    {
      name: "Completion Reports",
      href: "/sapurji/completion-reports",
      icon: CheckCircle,
    },
  ],

  nbcc_engineer: [
    { name: "Dashboard", href: "/nbcc-eng/dashboard", icon: LayoutDashboard },
    {
      name: "My Assignments",
      href: "/nbcc-eng/my-assignment",
      icon: ClipboardCheck,
      badge: 4,
    },
    {
      name: "Daily Progress",
      href: "/nbcc-eng/daily-progress",
      icon: Calendar,
    },
    {
      name: "Site Reports",
      href: "/nbcc-eng/site-report",
      icon: FileText,
    },
    {
      name: "Completion",
      href: "/nbcc-eng/completion",
      icon: CheckCircle,
    },
  ],

  shapoorji_engineer: [
    {
      name: "Dashboard",
      href: "/sapurji-eng/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "My Assignments",
      href: "/sapurji-eng/my-assingments",
      icon: ClipboardCheck,
      badge: 2,
    },
    {
      name: "Daily Progress",
      href: "/sapurji-eng/daily-progress",
      icon: Calendar,
    },
    {
      name: "Site Reports",
      href: "/sapurji-eng/site-reports",
      icon: FileText,
    },
    {
      name: "Completion",
      href: "/sapurji-eng/completion",
      icon: CheckCircle,
    },
  ],
};

export function RoleBasedSidebar({
  currentRole,
}: {
  currentRole: UserRole;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const profile = roleProfiles[currentRole];
  const menuItems = navigationMap[currentRole] || [];

  const handleSignOut = () => {
    document.cookie =
      "user-role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    router.push("/login");
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-30 w-64 overflow-hidden border-r border-white/10">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] via-[#172554] to-[#1E1B4B]" />

      {/* Carbon Texture @ 20% */}
      <div
        className="
          absolute inset-0
          bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]
          bg-repeat
          opacity-20
          pointer-events-none
        "
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col text-white">
        {/* Header */}
        <div className="h-16 px-5 flex items-center gap-3 border-b border-white/10 backdrop-blur-sm">
          <div className="h-10 w-10 rounded-xl bg-[#B8C0FF]/20 border border-[#B8C0FF]/20 flex items-center justify-center">
            <Building2 className="h-5 w-5 text-[#B8C0FF]" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">
              Bharat Mandapam
            </h2>

            <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
              Contract Management
            </p>
          </div>
        </div>

        {/* Role Card */}
        <div className="p-4 border-b border-white/10">
          <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-slate-400 font-semibold">
            Account Context
          </p>

          <div
            className="rounded-xl border p-3 backdrop-blur-md bg-white/[0.04]"
            style={{
              borderColor: `${profile.accent}40`,
              backgroundColor: `${profile.accent}12`,
            }}
          >
            <p className="text-xs font-semibold text-white">
              {profile.label}
            </p>

            <p className="mt-1 text-[11px] text-slate-300">
              {profile.org}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 custom-scrollbar">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  `
                  group
                  flex items-center justify-between
                  rounded-xl
                  px-3 py-2.5
                  text-sm
                  transition-all
                  duration-200
                  `,
                  isActive
                    ? `
                      bg-gradient-to-r
                      from-[#B8C0FF]/25
                      to-[#A9D6E5]/10
                      border border-[#B8C0FF]/20
                      text-white
                      shadow-lg
                    `
                    : `
                      text-slate-400
                      hover:text-white
                      hover:bg-white/5
                    `
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={cn(
                      "h-4 w-4",
                      isActive
                        ? "text-[#B8C0FF]"
                        : "text-slate-500 group-hover:text-slate-300"
                    )}
                  />

                  <span>{item.name}</span>
                </div>

                {item.badge && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#FFD6A5] px-1 text-[10px] font-bold text-slate-900">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-white/10 p-4 bg-black/10 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
              <User className="h-4 w-4 text-slate-300" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">
                Active Session
              </p>

              <p className="text-[10px] uppercase tracking-wider text-slate-400 truncate">
                {currentRole.replace("_", " ")}
              </p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="
              mt-3
              flex w-full items-center gap-2
              rounded-xl
              px-3 py-2.5
              text-sm text-slate-400
              transition-all duration-200
              hover:bg-[#FFB4A2]/10
              hover:text-white
            "
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}