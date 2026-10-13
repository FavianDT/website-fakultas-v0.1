"use client";

import { useEffect, useState } from "react";
import {
  getSubmissions,
  getSubmissionsByStudent,
} from "@/lib/services/submissions";
import type { SubmissionFilter, SubmissionRecord } from "@/types/layanan";

export function useSubmissions(
  filter: SubmissionFilter = {},
  studentId?: string
): {
  data: SubmissionRecord[] | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
} {
  const { prodi, serviceId, status } = filter;
  const [data, setData] = useState<SubmissionRecord[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshCount, setRefreshCount] = useState<number>(0);

  useEffect(() => {
    let cancelled = false;

    async function loadSubmissions(): Promise<void> {
      setLoading(true);
      setError(null);

      try {
        const submissions = studentId
          ? await getSubmissionsByStudent(studentId)
          : await getSubmissions({ prodi, serviceId, status });
        if (!cancelled) setData(submissions);
      } catch (cause: unknown) {
        if (!cancelled) {
          setError(cause instanceof Error ? cause.message : "Gagal memuat pengajuan.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadSubmissions();
    return () => {
      cancelled = true;
    };
  }, [studentId, prodi, serviceId, status, refreshCount]);

  function refresh(): void {
    setRefreshCount((count: number) => count + 1);
  }

  return { data, loading, error, refresh };
}