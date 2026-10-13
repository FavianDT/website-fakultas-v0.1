"use client";

import { useEffect, useState } from "react";
import { getPayments } from "@/lib/services/payments";
import type { ProdiType } from "@/types/auth";
import type { PaymentRecord } from "@/types/layanan";

export function usePayments(filter: {
  prodi?: ProdiType;
  studentId?: string;
} = {}): {
  data: PaymentRecord[] | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
} {
  const { prodi, studentId } = filter;
  const [data, setData] = useState<PaymentRecord[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshCount, setRefreshCount] = useState<number>(0);

  useEffect(() => {
    let cancelled = false;

    async function loadPayments(): Promise<void> {
      setLoading(true);
      setError(null);

      try {
        const payments = await getPayments({ prodi, studentId });
        if (!cancelled) setData(payments);
      } catch (cause: unknown) {
        if (!cancelled) {
          setError(cause instanceof Error ? cause.message : "Gagal memuat pembayaran.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadPayments();
    return () => {
      cancelled = true;
    };
  }, [prodi, studentId, refreshCount]);

  function refresh(): void {
    setRefreshCount((count: number) => count + 1);
  }

  return { data, loading, error, refresh };
}