import { PAYMENTS } from "@/lib/mock-data";
import type { PaymentRecord, NewPaymentInput, UploadedFile } from "@/types/layanan";
import type { ProdiType, UserProfile } from "@/types/auth";

const store: PaymentRecord[] = structuredClone(PAYMENTS);

function cloneRecord(record: PaymentRecord): PaymentRecord {
  return structuredClone(record);
}

export async function getPayments(
  filter: { prodi?: ProdiType; studentId?: string } = {}
): Promise<PaymentRecord[]> {
  return store.filter(
    (p) =>
      (!filter.prodi || p.prodi === filter.prodi) &&
      (!filter.studentId || p.studentId === filter.studentId)
  ).map(cloneRecord);
}

export async function createPayment(
  input: NewPaymentInput
): Promise<PaymentRecord> {
  const record: PaymentRecord = {
    id: `pay-${store.length + 1}`,
    studentId: input.student.id,
    studentName: input.student.name,
    prodi: input.student.prodi,
    mataKuliah: input.mataKuliah,
    nominal: input.nominal,
    buktiTransfer: input.buktiTransfer,
    status: "diproses",
    tanggalAjuan: new Date().toISOString().slice(0, 10),
  };
  store.push(cloneRecord(record));
  return cloneRecord(record);
}

export async function verifyPayment(
  id: string,
  keputusan: "selesai" | "ditolak" | "revisi",
  actor: UserProfile,
  catatan?: string
): Promise<PaymentRecord> {
  if (actor.role !== "tendik") {
    throw new Error("Hanya Tendik yang dapat memverifikasi pembayaran");
  }
  const item = store.find((p) => p.id === id);
  if (!item) throw new Error(`Pembayaran ${id} tidak ditemukan`);
  if (item.status !== "diproses") {
    throw new Error("Pembayaran hanya dapat diverifikasi jika berstatus diproses");
  }
  if (keputusan !== "selesai" && !catatan?.trim()) {
    throw new Error("Catatan wajib diisi untuk keputusan ditolak atau revisi");
  }
  item.status = keputusan;
  item.catatan = catatan;
  item.diverifikasiOleh = actor.name;
  return cloneRecord(item);
}

export async function resubmitPayment(
  id: string,
  buktiTransfer: UploadedFile
): Promise<PaymentRecord> {
  const item = store.find((p) => p.id === id);
  if (!item) throw new Error(`Pembayaran ${id} tidak ditemukan`);
  if (item.status !== "revisi") {
    throw new Error("Pembayaran hanya dapat diajukan ulang jika berstatus revisi");
  }
  item.buktiTransfer = structuredClone(buktiTransfer);
  item.status = "diproses";
  item.catatan = undefined;
  return cloneRecord(item);
}
