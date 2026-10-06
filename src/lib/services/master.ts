import { USERS, ANNOUNCEMENTS, SERVICES, PRODI_LIST } from "@/lib/mock-data";
import type { UserProfile, UserRole } from "@/types/auth";
import type { Pengumuman, ServiceItem } from "@/types/layanan";

const users: UserProfile[] = [...USERS];
const announcements: Pengumuman[] = [...ANNOUNCEMENTS];
const services: ServiceItem[] = [...SERVICES];

export async function listUsers(role?: UserRole): Promise<UserProfile[]> {
  return role ? users.filter((u) => u.role === role) : users;
}
export async function createUser(data: Omit<UserProfile, "id">) {
  const user = { ...data, id: `u-${users.length + 1}` };
  users.push(user);
  return user;
}
export async function updateUser(id: string, data: Partial<UserProfile>) {
  const i = users.findIndex((u) => u.id === id);
  if (i < 0) throw new Error("User tidak ditemukan");
  users[i] = { ...users[i], ...data };
  return users[i];
}
export async function removeUser(id: string) {
  const i = users.findIndex((u) => u.id === id);
  if (i >= 0) users.splice(i, 1);
}

export async function listProdi() {
  return PRODI_LIST;
}
export async function listServices() {
  return services;
}
export async function listAnnouncements() {
  return announcements;
}
export async function createAnnouncement(data: Omit<Pengumuman, "id">) {
  const item = { ...data, id: `ann-${announcements.length + 1}` };
  announcements.push(item);
  return item;
}
export async function removeAnnouncement(id: string) {
  const i = announcements.findIndex((a) => a.id === id);
  if (i >= 0) announcements.splice(i, 1);
}
