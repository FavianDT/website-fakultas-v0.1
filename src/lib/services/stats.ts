import { getSubmissions } from "./submissions";
import { PRODI_LIST } from "@/lib/mock-data";
import type { ProdiType } from "@/types/auth";
import type { SummaryStats, TrendPoint } from "@/types/layanan";

export async function getSummary(
  scope: { prodi?: ProdiType } = {}
): Promise<SummaryStats> {
  const all = await getSubmissions({ prodi: scope.prodi });
  const perProdi = Object.fromEntries(
    PRODI_LIST.map((p) => [p.id, all.filter((s) => s.prodi === p.id && s.status === "selesai").length])
  ) as Record<ProdiType, number>;
  return {
    totalTerbit: all.filter((s) => s.status === "selesai").length,
    totalDiproses: all.filter((s) => s.status === "diproses").length,
    // DATA MOCK
    rataRataHari: 2,
    perProdi,
  };
}

// DATA MOCK
export async function getTrend(
  _scope: { prodi?: ProdiType } = {}
): Promise<TrendPoint[]> {
  void _scope;
  return [
    { bulan: "Jul", layanan: 12, praktikum: 5 },
    { bulan: "Agu", layanan: 18, praktikum: 9 },
    { bulan: "Sep", layanan: 25, praktikum: 14 },
    { bulan: "Okt", layanan: 9, praktikum: 6 },
  ];
}
