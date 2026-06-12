import React from "react";
import { cookies } from "next/headers";
import { RoleBasedSidebar, UserRole } from "@/components/role-based-sidebar";
import "@/app/globals.css"; // Your system global tailwind configurations

export const metadata = {
  title: "Bharat Mandapam Contract Management System",
  description: "Centralized contract operations platform for ITPO, NBCC, and Shapoorji.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Read the cookie securely on the server
  const cookieStore = await cookies();
  const userRoleCookie = cookieStore.get("user-role")?.value;
  
  // Cast value to UserRole, fallback to "itpo" if cookie is not yet set
  const currentRole: UserRole = (userRoleCookie as UserRole) || "nbcc";

  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-background text-foreground flex">
        {/* Render the Dynamic Sidebar server-side */}
        <RoleBasedSidebar currentRole={currentRole} />

        {/* Content canvas adjusted to fit sidebar offset */}
        <div className="flex-1 pl-64 flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}