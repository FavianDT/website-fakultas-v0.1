import { SUBMISSIONS, SERVICES } from "@/lib/mock-data";
import { generateLetter } from "@/lib/documents/generate-letter";
import type {
  SubmissionRecord,
  SubmissionFilter,
  NewSubmissionInput,
  UploadedFile,
} from "@/types/layanan";

const store: SubmissionRecord[] = [...SUBMISSIONS];

function find(id: string): SubmissionRecord {
  const item = store.find((s) => s.id === id);
  if (!item) throw new Error(`Pengajuan ${id} tidak ditemukan`);
  return item;
}

export async function getSubmissions(
  filter: SubmissionFilter = {}
): Promise<SubmissionRecord[]> {
  return store.filter(
    (s) =>
      (!filter.prodi || s.prodi === filter.prodi) &&
      (!filter.serviceId || s.serviceId === filter.serviceId) &&
      (!filter.status || s.status === filter.status)
  );
}

export async function getSubmissionsByStudent(
  studentId: string
): Promise<SubmissionRecord[]> {
  return store.filter((s) => s.studentId === studentId);
}

export async function getServices() {
  return SERVICES;
}

export async function createSubmission(
  input: NewSubmissionInput
): Promise<SubmissionRecord> {
  const record: SubmissionRecord = {
    id: `sub-${store.length + 1}`,
    serviceId: input.serviceId,
    studentId: input.student.id,
    studentName: input.student.name,
    prodi: input.student.prodi,
    status: "diproses",
    tanggalAjuan: new Date().toISOString().slice(0, 10),
    dataForm: input.dataForm,
    berkas: input.berkas,
  };
  store.push(record);
  return record;
}

export async function resubmitRevision(
  id: string,
  berkas: UploadedFile[]
): Promise<SubmissionRecord> {
  const item = find(id);
  if (item.status !== "revisi") {
    throw new Error("Pengajuan hanya dapat diajukan ulang jika berstatus revisi");
  }
  item.berkas = berkas;
  item.status = "diproses";
  item.catatanRevisi = undefined;
  return item;
}

export async function approveSubmission(
  id: string,
  tendikName: string
): Promise<SubmissionRecord> {
  const item = find(id);
  if (item.status !== "diproses") {
    throw new Error("Pengajuan hanya dapat disetujui jika berstatus diproses");
  }
  const letter = await generateLetter(item);
  item.status = "selesai";
  item.nomorSurat = letter.nomorSurat;
  item.pdfUrl = letter.pdfUrl;
  item.diverifikasiOleh = tendikName;
  item.tanggalTerbit = new Date().toISOString().slice(0, 10);
  return item;
}

export async function requestRevision(
  id: string,
  catatan: string
): Promise<SubmissionRecord> {
  const item = find(id);
  if (item.status !== "diproses") {
    throw new Error("Revisi hanya dapat diminta jika pengajuan berstatus diproses");
  }
  item.status = "revisi";
  item.catatanRevisi = catatan;
  return item;
}

export async function rejectSubmission(
  id: string,
  alasan: string
): Promise<SubmissionRecord> {
  const item = find(id);
  if (item.status !== "diproses") {
    throw new Error("Pengajuan hanya dapat ditolak jika berstatus diproses");
  }
  item.status = "ditolak";
  item.alasanTolak = alasan;
  return item;
}
