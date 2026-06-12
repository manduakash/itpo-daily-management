"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  PlusCircle, 
  FolderOpen, 
  ClipboardCheck, 
  Activity, 
  FileBarChart2, 
  Building2,
  LogOut,
  User
} from "lucide-react";
import { cn } from "@/lib/utils"; // Standard Shadcn helper

const sidebarItems = [
  {
    name: "Dashboard",
    href: "/itpo/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Raise Contract",
    href: "/itpo/raise-contract",
    icon: PlusCircle,
  },
  {
    name: "All Contracts",
    href: "/itpo/contracts",
    icon: FolderOpen,
  },
  {
    name: "Pending Approvals",
    href: "/itpo/approvals",
    icon: ClipboardCheck,
    badge: 3, // Mock indicator for pending actions
  },
  {
    name: "Project Tracking",
    href: "/itpo/tracking",
    icon: Activity,
  },
  {
    name: "Reports",
    href: "/itpo/reports",
    icon: FileBarChart2,
  },
];

export function ITPOSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-20 flex h-full w-64 flex-col border-r border-border bg-card text-card-foreground">
      {/* Platform Branding */}
      <div className="flex h-16 items-center px-6 border-b border-border gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Building2 className="h-5 w-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold leading-none tracking-tight">Bharat Mandapam</span>
          <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mt-0.5">ITPO Portal</span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 space-y-1 px-4 py-6">
        {sidebarItems.map((item) => {
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
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-semibold text-destructive-foreground">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Information & Actions */}
      <div className="mt-auto border-t border-border p-4">
        <div className="flex items-center gap-3 rounded-lg p-2 hover:bg-accent/50 transition-colors">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
            <User className="h-4 w-4" />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-xs font-semibold truncate">ITPO Officer</span>
            <span className="text-[10px] text-muted-foreground truncate">itpo.admin@itpo.gov.in</span>
          </div>
        </div>
        <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 mt-2 text-xs font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors">
          <LogOut className="h-3.5 w-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}