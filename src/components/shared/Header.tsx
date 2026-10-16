"use client";

import { Bell, ChevronDown, LogOut, Menu, UserCircle2 } from "lucide-react";
import { useState } from "react";

import type { DashboardRole } from "@/components/shared/DashboardLayout";
import { useSession } from "@/hooks/useSession";

export function Header({
  role,
  onToggleMobileMenu,
}: {
  role: DashboardRole;
  onToggleMobileMenu: () => void;
}) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, isLoading, error, logout } = useSession();

  const roleLabel: Record<DashboardRole, string> = {
    student: "Mahasiswa",
    staff: "Tendik",
    executive: "Eksekutif",
  };

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <div className="flex h-20 items-center justify-between gap-3 px-4 sm:px-6 lg:pl-72">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-[#00964D] hover:text-[#00964D] focus:outline-none focus:ring-2 focus:ring-[#00964D]/30 lg:hidden"
            aria-label="Buka menu navigasi"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00964D]/10 text-sm font-bold text-[#00964D]">
              U
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500">
                UNINUS
              </p>
              <h1 className="text-sm font-semibold text-slate-900 sm:text-base">
                Portal Layanan Akademik FTP UNINUS
              </h1>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-[#00964D] hover:text-[#00964D] focus:outline-none focus:ring-2 focus:ring-[#00964D]/30"
            aria-label="Lihat notifikasi"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-[#FBBF24] ring-2 ring-white" />
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsProfileOpen((open) => !open)}
              className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2 py-1.5 text-left text-sm text-slate-700 transition hover:border-[#00964D] hover:text-[#00964D] focus:outline-none focus:ring-2 focus:ring-[#00964D]/30"
              aria-haspopup="menu"
              aria-expanded={isProfileOpen}
              aria-label="Menu profil pengguna"
            >
              <UserCircle2 className="h-8 w-8 text-[#00964D]" />
              <span className="hidden sm:block">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-slate-500">
                  {roleLabel[role]}
                </span>
                <span className="block font-medium">
                  {isLoading && !user ? "Memuat..." : user?.name ?? "Pengguna"}
                </span>
              </span>
              <ChevronDown className="h-4 w-4" />
            </button>

            {isProfileOpen ? (
              <div className="absolute right-0 mt-2 w-44 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                <button
                  type="button"
                  onClick={() => void logout()}
                  disabled={isLoading}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00964D]/30 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
                {error ? (
                  <p className="mt-1 px-3 py-2 text-xs text-red-700" role="alert">
                    {error}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
