"use client";

import { ArrowRight, GraduationCap, LockKeyhole } from "lucide-react";
import { startTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { createSession, listDemoUsers } from "@/lib/auth";
import type { UserRole } from "@/types/auth";

const DEMO_ROLES = [
  { role: "student", label: "Mahasiswa" },
  { role: "tendik", label: "Tendik" },
  { role: "prodi", label: "Prodi" },
  { role: "fakultas", label: "Fakultas" },
] as const;

function getDashboardPath(role: UserRole): string {
  switch (role) {
    case "student":
      return "/dashboard/student";
    case "tendik":
      return "/dashboard/staff";
    case "prodi":
      return "/dashboard/executive/prodi";
    case "fakultas":
      return "/dashboard/executive/fakultas";
  }
}

export default function LoginPage() {
  const router = useRouter();
  const demoEnabled = process.env.NODE_ENV !== "production";
  const [users, setUsers] = useState<
    Awaited<ReturnType<typeof listDemoUsers>>
  >([]);
  const [selectedRole, setSelectedRole] = useState<UserRole>("student");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (!demoEnabled) {
      return;
    }

    let isMounted = true;
      startTransition(() => {
        void listDemoUsers()
          .then((availableUsers) => {
            if (isMounted) {
              setUsers(availableUsers);
            }
          })
          .catch((cause: unknown) => {
            if (isMounted) {
              setError(
                cause instanceof Error
                  ? cause.message
                  : "Akun demo tidak dapat dimuat.",
              );
            }
          });
      });

    return () => {
      isMounted = false;
    };
  }, [demoEnabled]);

  const selectedUser = users.find((user) => user.role === selectedRole);

  async function handleDemoLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setNotice(null);

    if (!selectedUser) {
      setError("Akun demo untuk role ini tidak tersedia.");
      return;
    }

    setIsSubmitting(true);
    try {
      const role = await createSession(selectedUser.id);
      router.replace(getDashboardPath(role));
      router.refresh();
    } catch (cause: unknown) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Login demo gagal. Silakan coba lagi.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] lg:grid lg:grid-cols-2">
      <section className="relative flex min-h-[38vh] flex-col justify-between overflow-hidden bg-[#00964D] px-6 py-8 text-white sm:px-10 lg:min-h-screen lg:px-16 lg:py-12">
        <div
          className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full border-[36px] border-white/10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-emerald-700/40"
          aria-hidden="true"
        />

        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FBBF24] text-xl font-black text-[#14532D]">
            U
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-100">
              UNINUS
            </p>
            <p className="font-semibold">Fakultas Teknik dan Pertanian</p>
          </div>
        </div>

        <div className="relative z-10 max-w-xl py-8 lg:py-16">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-emerald-50">
            <GraduationCap className="h-4 w-4 text-[#FBBF24]" />
            Layanan akademik dalam satu portal
          </div>
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Portal Layanan Akademik FTP UNINUS
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-6 text-emerald-50 sm:text-base">
            Akses layanan akademik dan pantau proses pengajuan Anda secara
            terpusat.
          </p>

          <div className="mt-8">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-100">
              Program Studi
            </h2>
            <ul className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
              {[
                "Teknik Informatika",
                "Teknik Industri",
                "Teknik Elektro",
                "Agroteknologi",
              ].map((program) => (
                <li
                  key={program}
                  className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-3"
                >
                  <span
                    className="h-2 w-2 rounded-full bg-[#FBBF24]"
                    aria-hidden="true"
                  />
                  {program}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="relative z-10 text-xs text-emerald-100">
          Portal prototipe Fakultas Teknik dan Pertanian UNINUS
        </p>
      </section>

      <section className="flex items-center justify-center px-4 py-10 sm:px-8 lg:px-12">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-9">
          <div className="mb-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00964D]/10 text-[#00964D]">
              <LockKeyhole className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Selamat datang</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Masuk untuk melanjutkan ke Portal Layanan Akademik FTP UNINUS.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setError(null);
              setNotice(
                "Simulasi Google belum terhubung ke OAuth. Gunakan Role Switcher Demo saat tersedia.",
              );
            }}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-[#00964D] hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-[#00964D]/30"
          >
            <span
              className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 text-xs font-bold text-[#00964D]"
              aria-hidden="true"
            >
              G
            </span>
            Masuk dengan Google
          </button>
          <p className="mt-3 text-center text-xs text-slate-500">
            Tombol ini hanya simulasi; OAuth Google belum diimplementasikan.
          </p>

          {demoEnabled ? (
            <form className="mt-8 border-t border-slate-200 pt-7" onSubmit={handleDemoLogin}>
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-slate-900">
                  Role Switcher Demo
                </h3>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Pilihan masuk memakai akun mock yang tersedia untuk role
                  tersebut.
                </p>
              </div>

              <label
                htmlFor="demo-role"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Masuk sebagai
              </label>
              <select
                id="demo-role"
                value={selectedRole}
                onChange={(event) => {
                  const nextRole = DEMO_ROLES.find(
                    ({ role }) => role === event.target.value,
                  )?.role;
                  if (nextRole) {
                    setSelectedRole(nextRole);
                  }
                }}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm text-slate-800 outline-none transition focus:border-[#00964D] focus:ring-2 focus:ring-[#00964D]/20"
                disabled={isSubmitting}
              >
                {DEMO_ROLES.map(({ role, label }) => (
                  <option
                    key={role}
                    value={role}
                    disabled={!users.some((user) => user.role === role)}
                  >
                    {label}
                  </option>
                ))}
              </select>

              {selectedUser ? (
                <p className="mt-3 text-xs text-slate-500">
                  Akun demo: {selectedUser.name}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting || !selectedUser}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#00964D] px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-[#00964D]/40 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Memproses..." : "Masuk Demo"}
                {!isSubmitting ? <ArrowRight className="h-4 w-4" /> : null}
              </button>
            </form>
          ) : (
            <p className="mt-8 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">
              Login demo dinonaktifkan di production. OAuth Google belum
              tersedia.
            </p>
          )}

          {error ? (
            <p
              className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800"
              role="alert"
            >
              {error}
            </p>
          ) : null}
          {notice ? (
            <p
              className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900"
              role="status"
            >
              {notice}
            </p>
          ) : null}
        </div>
      </section>
    </main>
  );
}