"use client";

import { useEffect, useState } from "react";
import { getServices } from "@/lib/services/submissions";
import type { ServiceItem } from "@/types/layanan";

export function useServices(): {
  data: ServiceItem[] | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
} {
  const [data, setData] = useState<ServiceItem[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshCount, setRefreshCount] = useState<number>(0);

  useEffect(() => {
    let cancelled = false;

    async function loadServices(): Promise<void> {
      setLoading(true);
      setError(null);

      try {
        const services = await getServices();
        if (!cancelled) setData(services);
      } catch (cause: unknown) {
        if (!cancelled) {
          setError(cause instanceof Error ? cause.message : "Gagal memuat layanan.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadServices();
    return () => {
      cancelled = true;
    };
  }, [refreshCount]);

  function refresh(): void {
    setRefreshCount((count: number) => count + 1);
  }

  return { data, loading, error, refresh };
}