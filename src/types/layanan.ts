import type { ProdiType } from "@/types/auth";

export type SubmissionStatus = "diproses" | "revisi" | "ditolak" | "selesai";

export type FieldType = "text" | "textarea" | "date" | "number" | "select";

export interface ServiceField {
  name: string;
  label: string;
  type: FieldType;
  required: boolean;
  options?: string[];
}

export interface ServiceItem {
  id: string;
  nama: string;
  deskripsi: string;
  ikon: string;
  berkasWajib: string[];
  fields: ServiceField[];
}

export interface UploadedFile {
  nama: string;
  tipe: "pdf" | "png" | "jpg";
  ukuranKb: number;
  url: string;
}

export interface SubmissionRecord {
  id: string;
  serviceId: string;
  studentId: string;
  studentName: string;
  prodi: ProdiType;
  status: SubmissionStatus;
  tanggalAjuan: string;
  dataForm: Record<string, string>;
  berkas: UploadedFile[];
  catatanRevisi?: string;
  alasanTolak?: string;
  nomorSurat?: string;
  pdfUrl?: string;
  diverifikasiOleh?: string;
  tanggalTerbit?: string;
}

export type PaymentStatus = "diproses" | "revisi" | "ditolak" | "selesai";

export interface PaymentRecord {
  id: string;
  studentId: string;
  studentName: string;
  prodi: ProdiType;
  mataKuliah: string;
  nominal: number;
  buktiTransfer: UploadedFile;
  status: PaymentStatus;
  tanggalAjuan: string;
  catatan?: string;
  diverifikasiOleh?: string;
}

export interface Pengumuman {
  id: string;
  judul: string;
  isi: string;
  tanggal: string;
}

export interface SummaryStats {
  totalTerbit: number;
  totalDiproses: number;
  rataRataHari: number;
  perProdi: Record<ProdiType, number>;
}

export interface TrendPoint {
  bulan: string;
  layanan: number;
  praktikum: number;
}

export interface SubmissionFilter {
  prodi?: ProdiType;
  serviceId?: string;
  status?: SubmissionStatus;
}

export interface NewSubmissionInput {
  serviceId: string;
  student: { id: string; name: string; prodi: ProdiType };
  dataForm: Record<string, string>;
  berkas: UploadedFile[];
}

export interface NewPaymentInput {
  student: { id: string; name: string; prodi: ProdiType };
  mataKuliah: string;
  nominal: number;
  buktiTransfer: UploadedFile;
}
