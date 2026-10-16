"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  ClipboardList,
  CreditCard,
  FileCheck2,
  FileText,
  House,
  LayoutGrid,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { DashboardRole } from "@/components/shared/DashboardLayout";

const NAV_ITEMS: Record<DashboardRole, Array<{ label: string; href: string; icon: LucideIcon }>> = {
  student: [
    { label: "Beranda", href: "/dashboard/student", icon: House },
    { label: "Layanan Akademik", href: "/dashboard/student/services", icon: FileText },
    { label: "Pembayaran Praktikum", href: "/dashboard/student/praktikum", icon: CreditCard },
    { label: "Status dan Riwayat", href: "/dashboard/student/tracking", icon: ClipboardList },
  ],
  staff: [
    { label: "Beranda", href: "/dashboard/staff", icon: House },
    { label: "Verifikasi Surat", href: "/dashboard/staff/verifications", icon: FileCheck2 },
    { label: "Verifikasi Praktikum", href: "/dashboard/staff/praktikum", icon: ShieldCheck },
    { label: "Kelola Data", href: "/dashboard/staff/manage", icon: Users },
  ],
  executive: [
    { label: "Ringkasan Prodi", href: "/dashboard/executive/prodi", icon: BarChart3 },
    { label: "Ringkasan Fakultas", href: "/dashboard/executive/fakultas", icon: LayoutGrid },
    { label: "Audit Log", href: "/dashboard/executive/audit-log", icon: FileText },
  ],
};

export function Sidebar({
  role,
  isOpen,
  onClose,
}: {
  role: DashboardRole;
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const items = NAV_ITEMS[role];

  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-slate-950/35 transition-opacity duration-200 lg:hidden ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-[#00964D]/15 bg-[#00964D] text-white shadow-xl transition-transform duration-200 ease-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label={`${role} navigation`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-100">
                UNINUS
              </p>
              <h2 className="text-base font-semibold text-white">Portal FTP</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/70 lg:hidden"
              aria-label="Tutup menu navigasi"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <nav className="flex-1 space-y-2 overflow-y-auto p-3">
            {items.map(({ label, href, icon: Icon }) => {
              const active =
                pathname === href ||
                (href !== "/dashboard/student" && pathname.startsWith(`${href}/`)) ||
                (href === "/dashboard/student" && pathname.startsWith("/dashboard/student"));

              return (
                <Link
                  key={href}
                  href={href}
                  onClick={onClose}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-white/70 ${
                    active
                      ? "bg-white text-[#00964D] shadow-sm"
                      : "text-emerald-50 hover:bg-emerald-700/60"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
