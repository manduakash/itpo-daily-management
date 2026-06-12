import React from "react";
import { ITPOSidebar } from "@/components/sidebars/itpo-sidebar";
import { Bell, Search, User } from "lucide-react";

interface ITPOLayoutProps {
  children: React.ReactNode;
}

export default function ITPOLayout({ children }: ITPOLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar navigation */}
      <ITPOSidebar />

      {/* Main workspace container */}
      <div className="flex flex-col flex-1 pl-64">
        {/* Top Header */}
        <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between border-b border-border bg-background/95 px-8 backdrop-blur">
          {/* Breadcrumb / Section Label placeholder */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-medium">Contract Management System</span>
            <span className="text-xs text-muted-foreground/60">/</span>
            <span className="text-xs font-semibold text-primary">ITPO Workspace</span>
          </div>

          {/* Top Actions */}
          <div className="flex items-center gap-4">
            {/* Quick Search */}
            <div className="relative hidden md:block w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search contracts, tasks..."
                className="w-full rounded-md border border-input bg-background pl-9 pr-4 py-1.5 text-xs ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>

            {/* Notification Hub */}
            <button className="relative flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background hover:bg-accent transition-colors">
              <Bell className="h-4 w-4 text-foreground" />
              <span className="absolute top-1.5 right-1.5 h-2.0 w-2.0 rounded-full bg-amber-500 animate-pulse" />
            </button>

            {/* Quick Identity Block */}
            <div className="flex h-9 items-center gap-2 rounded-md border border-border bg-background px-3 py-1">
              <span className="text-xs font-semibold">ITPO HQ</span>
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
            </div>
          </div>
        </header>

        {/* Primary Page Canvas */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}