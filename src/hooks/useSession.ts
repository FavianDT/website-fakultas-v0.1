"use client";

import { startTransition, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { deleteSession, getSession } from "@/lib/auth";
import type { UserProfile } from "@/types/auth";

export function useSession() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    startTransition(() => {
      void getSession()
        .then((sessionUser) => {
          if (isMounted) {
            setUser(sessionUser);
            setError(null);
          }
        })
        .catch((cause: unknown) => {
          if (isMounted) {
            setUser(null);
            setError(
              cause instanceof Error
                ? cause.message
                : "Sesi pengguna tidak dapat dimuat.",
            );
          }
        })
        .finally(() => {
          if (isMounted) {
            setIsLoading(false);
          }
        });
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      await deleteSession();
      setUser(null);
      router.replace("/login");
      router.refresh();
    } catch (cause: unknown) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Sesi tidak dapat dihapus. Silakan coba lagi.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  return { user, isLoading, error, logout };
}
