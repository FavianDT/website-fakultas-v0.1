import { USERS, ANNOUNCEMENTS, SERVICES, PRODI_LIST } from "@/lib/mock-data";
import type { UserProfile, UserRole } from "@/types/auth";
import type { Pengumuman, ServiceItem } from "@/types/layanan";

const users: UserProfile[] = structuredClone(USERS);
const announcements: Pengumuman[] = structuredClone(ANNOUNCEMENTS);
const services: ServiceItem[] = structuredClone(SERVICES);

function nextId(prefix: string, records: { id: string }[]): string {
  let index = records.length + 1;
  while (records.some((record) => record.id === `${prefix}-${index}`)) {
    index += 1;
  }
  return `${prefix}-${index}`;
}

export async function listUsers(role?: UserRole): Promise<UserProfile[]> {
  return structuredClone(role ? users.filter((u) => u.role === role) : users);
}
export async function createUser(data: Omit<UserProfile, "id">) {
  const user = { ...data, id: nextId("u", users) };
  users.push(user);
  return structuredClone(user);
}
export async function updateUser(id: string, data: Partial<UserProfile>) {
  const i = users.findIndex((u) => u.id === id);
  if (i < 0) throw new Error("User tidak ditemukan");
  users[i] = { ...users[i], ...data };
  return structuredClone(users[i]);
}
export async function removeUser(id: string) {
  const i = users.findIndex((u) => u.id === id);
  if (i >= 0) users.splice(i, 1);
}

export async function listProdi() {
  return structuredClone(PRODI_LIST);
}
export async function listServices() {
  return structuredClone(services);
}
export async function listAnnouncements() {
  return structuredClone(announcements);
}
export async function createAnnouncement(data: Omit<Pengumuman, "id">) {
  const item = { ...data, id: nextId("ann", announcements) };
  announcements.push(item);
  return structuredClone(item);
}
export async function removeAnnouncement(id: string) {
  const i = announcements.findIndex((a) => a.id === id);
  if (i >= 0) announcements.splice(i, 1);
}
