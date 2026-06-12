"use client";

import React, { useState, useEffect } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from "recharts";
import { 
  Briefcase, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  IndianRupee, 
  ArrowUpRight,
  TrendingUp,
  Building2,
  ArrowRight,
  Plus
} from "lucide-react";
import Link from "next/link";

// Mock Data
const kpiData = [
  {
    title: "Total Raised Contracts",
    value: "48",
    description: "+4 from last week",
    icon: Briefcase,
    color: "text-blue-600 bg-blue-50 dark:bg-blue-950/50 dark:text-blue-400",
  },
  {
    title: "Pending Your Approval",
    value: "07",
    description: "Requires immediate review",
    icon: Clock,
    color: "text-amber-600 bg-amber-50 dark:bg-amber-950/50 dark:text-amber-400",
  },
  {
    title: "Active Works (WIP)",
    value: "18",
    description: "Assigned to NBCC / Shapoorji",
    icon: TrendingUp,
    color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-400",
  },
  {
    title: "Inspection Pending",
    value: "05",
    description: "Ready for ITPO verification",
    icon: CheckCircle2,
    color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 dark:text-indigo-400",
  },
];

const contractStatusData = [
  { name: "Raised", count: 4 },
  { name: "Under Review", count: 6 },
  { name: "Est. Submitted", count: 7 },
  { name: "Approved", count: 5 },
  { name: "WIP", count: 18 },
  { name: "Inspection", count: 5 },
  { name: "Closed", count: 3 },
];

const categoryData = [
  { name: "General Civil", value: 14, color: "#3b82f6" },
  { name: "Electrical", value: 12, color: "#eab308" },
  { name: "Plumbing", value: 8, color: "#06b6d4" },
  { name: "Mechanical", value: 6, color: "#ec4899" },
  { name: "AMC/CMC", value: 8, color: "#10b981" },
];

const monthlyExpenditure = [
  { month: "Jan", budget: 45, actual: 40 },
  { month: "Feb", budget: 60, actual: 55 },
  { month: "Mar", budget: 85, actual: 92 },
  { month: "Apr", budget: 70, actual: 68 },
  { month: "May", budget: 95, actual: 85 },
  { month: "Jun", budget: 120, actual: 110 },
];

const pendingApprovals = [
  {
    id: "CON-2024-089",
    title: "Renovation of Convention Hall 3 & 4",
    agency: "Shapoorji (Case 3)",
    type: "Civil",
    scale: "Large",
    estimation: "₹45,50,000",
    status: "Estimation Submitted",
  },
  {
    id: "CON-2024-092",
    title: "Plumbing Overhaul & Piping Replacement",
    agency: "NBCC (Case 2)",
    type: "Plumbing",
    scale: "Medium",
    estimation: "₹12,20,000",
    status: "Estimation Submitted",
  },
  {
    id: "CON-2024-101",
    title: "HVAC Unit Replacement Area G",
    agency: "NBCC & Shapoorji (Case 1)",
    type: "Mechanical",
    scale: "Large",
    estimation: "Pending Bids",
    status: "Under Review",
  },
];

export default function ITPODashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="p-8 text-center text-muted-foreground">Loading dashboard layout...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Welcome & Quick Action Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">ITPO Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Overview of infrastructure contracts, estimations, and ongoing maintenance activities.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/itpo/raise-contract">
            <button className="inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground text-sm font-medium h-10 px-4 hover:bg-primary/90 transition-colors">
              <Plus className="h-4 w-4" />
              <span>Raise New Contract</span>
            </button>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <span className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">
                  {kpi.title}
                </span>
                <div className={`p-2 rounded-lg ${kpi.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold tracking-tight">{kpi.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{kpi.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {/* Contract Status Bar Chart */}
        <div className="col-span-1 lg:col-span-2 rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex flex-col space-y-1.5 pb-6">
            <h3 className="text-sm font-semibold tracking-tight">Contract Lifecycle Distribution</h3>
            <p className="text-xs text-muted-foreground">Number of contracts currently sitting in each status phase</p>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={contractStatusData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    borderColor: "hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px"
                  }} 
                />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Share Donut Chart */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex flex-col space-y-1.5 pb-6">
            <h3 className="text-sm font-semibold tracking-tight">Contracts by Category</h3>
            <p className="text-xs text-muted-foreground">Proportional distribution of current work categories</p>
          </div>
          <div className="h-52 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    borderColor: "hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px" 
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Summary Label */}
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-xl font-bold">48</span>
              <span className="text-[10px] text-muted-foreground uppercase font-medium">Total Items</span>
            </div>
          </div>
          {/* Legend Details */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            {categoryData.map((cat, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                <span className="text-muted-foreground truncate">{cat.name} ({cat.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Trends & Pending Approvals */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {/* Budget Execution Trend */}
        <div className="col-span-1 rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex flex-col space-y-1.5 pb-4">
              <h3 className="text-sm font-semibold tracking-tight">Approved Budget vs. Expenditure</h3>
              <p className="text-xs text-muted-foreground">Monthly summary of financial layouts (in Lakhs ₹)</p>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyExpenditure} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      borderColor: "hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px"
                    }} 
                  />
                  <Legend verticalAlign="top" height={36} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "11px" }} />
                  <Line type="monotone" dataKey="budget" name="Approved Limit" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 4 }} />
                  <Line type="monotone" dataKey="actual" name="Actual Cost" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Action Needed Component Table */}
        <div className="col-span-1 lg:col-span-2 rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4">
            <div className="flex flex-col space-y-1.5">
              <h3 className="text-sm font-semibold tracking-tight">Estimations Pending Action</h3>
              <p className="text-xs text-muted-foreground">Estimations submitted by NBCC / Shapoorji awaiting ITPO Approval</p>
            </div>
            <Link href="/itpo/approvals" className="text-xs text-primary font-medium flex items-center gap-1 hover:underline">
              <span>View All</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border text-muted-foreground font-medium">
                  <th className="py-3 px-2">ID</th>
                  <th className="py-3 px-2">Title</th>
                  <th className="py-3 px-2">Assigned Agency</th>
                  <th className="py-3 px-2">Est. Cost</th>
                  <th className="py-3 px-2">Status</th>
                  <th className="py-3 px-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {pendingApprovals.map((item, i) => (
                  <tr key={i} className="hover:bg-accent/40 transition-colors">
                    <td className="py-3.5 px-2 font-mono font-medium">{item.id}</td>
                    <td className="py-3.5 px-2">
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">{item.title}</span>
                        <span className="text-[10px] text-muted-foreground">{item.type} • {item.scale} Scale</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-2 text-muted-foreground">{item.agency}</td>
                    <td className="py-3.5 px-2 font-medium text-foreground">{item.estimation}</td>
                    <td className="py-3.5 px-2">
                      <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-2 text-right">
                      <Link href={`/itpo/approvals/${item.id}`}>
                        <button className="inline-flex h-7 items-center justify-center rounded-md bg-secondary text-secondary-foreground text-[11px] font-semibold px-3 border border-border hover:bg-accent transition-colors">
                          Review
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}