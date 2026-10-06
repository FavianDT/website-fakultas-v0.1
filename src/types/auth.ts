export type UserRole = "student" | "tendik" | "prodi" | "fakultas";

export type ProdiType =
  | "Informatika"
  | "Industri"
  | "Elektro"
  | "Agroteknologi";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  email_gmail?: string;
  nim_nip: string;
  prodi: ProdiType | null;
  role: UserRole;
}
