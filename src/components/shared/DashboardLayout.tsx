"use client";

import { useState } from "react";

import { Header } from "@/components/shared/Header";
import { Sidebar } from "@/components/shared/Sidebar";

export type DashboardRole = "student" | "staff" | "executive";

export function DashboardLayout({
  children,
  role,
}: {
  children: React.ReactNode;
  role: DashboardRole;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <Header
        role={role}
        onToggleMobileMenu={() => setIsSidebarOpen((open) => !open)}
      />
      <Sidebar
        role={role}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="min-h-screen pt-20 pb-8 pl-0 lg:pl-72">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
