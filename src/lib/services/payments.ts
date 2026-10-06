import { PAYMENTS } from "@/lib/mock-data";
import type { PaymentRecord, NewPaymentInput } from "@/types/layanan";
import type { ProdiType } from "@/types/auth";

const store: PaymentRecord[] = [...PAYMENTS];

export async function getPayments(
  filter: { prodi?: ProdiType; studentId?: string } = {}
): Promise<PaymentRecord[]> {
  return store.filter(
    (p) =>
      (!filter.prodi || p.prodi === filter.prodi) &&
      (!filter.studentId || p.studentId === filter.studentId)
  );
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
  store.push(record);
  return record;
}

export async function verifyPayment(
  id: string,
  approve: boolean,
  tendikName: string,
  catatan?: string
): Promise<PaymentRecord> {
  const item = store.find((p) => p.id === id);
  if (!item) throw new Error(`Pembayaran ${id} tidak ditemukan`);
  item.status = approve ? "selesai" : "ditolak";
  item.catatan = catatan;
  item.diverifikasiOleh = tendikName;
  return item;
}
