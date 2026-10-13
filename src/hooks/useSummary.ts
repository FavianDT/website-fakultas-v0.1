"use client";

import { useEffect, useState } from "react";
import { getSummary, getTrend } from "@/lib/services/stats";
import type { ProdiType } from "@/types/auth";
import type { SummaryStats, TrendPoint } from "@/types/layanan";

export function useSummary(scope: { prodi?: ProdiType } = {}): {
  data: { summary: SummaryStats; trend: TrendPoint[] } | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
} {
  const { prodi } = scope;
  const [data, setData] = useState<{
    summary: SummaryStats;
    trend: TrendPoint[];
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshCount, setRefreshCount] = useState<number>(0);

  useEffect(() => {
    let cancelled = false;

    async function loadSummary(): Promise<void> {
      setLoading(true);
      setError(null);

      try {
        const [summary, trend] = await Promise.all([
          getSummary({ prodi }),
          getTrend({ prodi }),
        ]);
        if (!cancelled) setData({ summary, trend });
      } catch (cause: unknown) {
        if (!cancelled) {
          setError(cause instanceof Error ? cause.message : "Gagal memuat ringkasan.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadSummary();
    return () => {
      cancelled = true;
    };
  }, [prodi, refreshCount]);

  function refresh(): void {
    setRefreshCount((count: number) => count + 1);
  }

  return { data, loading, error, refresh };
}