// app/layout.tsx
"use client";

import React, { useState } from "react";
import { RoleBasedSidebar, UserRole } from "@/components//sidebars/itpo-sidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Toggle this value to test any of the 5 setups instantly:
  const [role, setRole] = useState<UserRole>("itpo");

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-background text-foreground flex">
          
          {/* Dynamic Unified Sidebar */}
          <RoleBasedSidebar currentRole={role} onRoleChange={setRole} />
          
          {/* Working Workspace Offset */}
          <div className="flex-1 pl-64 flex flex-col">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}