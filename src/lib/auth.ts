"use server";

import { cookies } from "next/headers";

import { listUsers } from "@/lib/services/master";
import type { UserProfile, UserRole } from "@/types/auth";

const SESSION_COOKIE_NAME = "uninus_session";
const SESSION_MAX_AGE = 60 * 60 * 8;

export async function createSession(userId: string): Promise<UserRole> {
  const secureCookie = process.env.NODE_ENV === "production";
  if (secureCookie) {
    throw new Error("Login demo tidak tersedia di production.");
  }

  const user = (await listUsers()).find((candidate) => candidate.id === userId);
  if (!user) {
    throw new Error("Pengguna tidak ditemukan. Silakan pilih akun demo yang tersedia.");
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, user.id, {
    httpOnly: true,
    secure: secureCookie,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  return user.role;
}

export async function getSession(): Promise<UserProfile | null> {
  const userId = (await cookies()).get(SESSION_COOKIE_NAME)?.value;

  if (!userId || process.env.NODE_ENV === "production") {
    return null;
  }

  const user = (await listUsers()).find((candidate) => candidate.id === userId);
  if (!user) {
    return null;
  }

  return user;
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function listDemoUsers(): Promise<
  Pick<UserProfile, "id" | "name" | "role">[]
> {
  if (process.env.NODE_ENV === "production") {
    return [];
  }

  return (await listUsers()).map(({ id, name, role }) => ({ id, name, role }));
}
