import { SUBMISSIONS, SERVICES } from "@/lib/mock-data";
import { generateLetter } from "@/lib/documents/generate-letter";
import type {
  SubmissionRecord,
  SubmissionFilter,
  NewSubmissionInput,
  UploadedFile,
} from "@/types/layanan";
import type { UserProfile } from "@/types/auth";

const store: SubmissionRecord[] = structuredClone(SUBMISSIONS);

function cloneRecord(record: SubmissionRecord): SubmissionRecord {
  return structuredClone(record);
}

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
  ).map(cloneRecord);
}

export async function getSubmissionsByStudent(
  studentId: string
): Promise<SubmissionRecord[]> {
  return store.filter((s) => s.studentId === studentId).map(cloneRecord);
}

export async function getServices() {
  return structuredClone(SERVICES);
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
  store.push(cloneRecord(record));
  return cloneRecord(record);
}

export async function resubmitRevision(
  id: string,
  berkas: UploadedFile[],
  dataForm: Record<string, string>
): Promise<SubmissionRecord> {
  const item = find(id);
  if (item.status !== "revisi") {
    throw new Error("Pengajuan hanya dapat diajukan ulang jika berstatus revisi");
  }
  item.berkas = structuredClone(berkas);
  item.dataForm = structuredClone(dataForm);
  item.status = "diproses";
  item.catatanRevisi = undefined;
  return cloneRecord(item);
}

export async function approveSubmission(
  id: string,
  actor: UserProfile
): Promise<SubmissionRecord> {
  if (actor.role !== "tendik") {
    throw new Error("Hanya Tendik yang dapat menyetujui pengajuan");
  }
  const item = find(id);
  if (item.status !== "diproses") {
    throw new Error("Pengajuan hanya dapat disetujui jika berstatus diproses");
  }
  const letter = await generateLetter(item);
  item.status = "selesai";
  item.nomorSurat = letter.nomorSurat;
  item.pdfUrl = letter.pdfUrl;
  item.diverifikasiOleh = actor.name;
  item.tanggalTerbit = new Date().toISOString().slice(0, 10);
  return cloneRecord(item);
}

export async function requestRevision(
  id: string,
  catatan: string,
  actor: UserProfile
): Promise<SubmissionRecord> {
  if (actor.role !== "tendik") {
    throw new Error("Hanya Tendik yang dapat meminta revisi pengajuan");
  }
  const item = find(id);
  if (item.status !== "diproses") {
    throw new Error("Revisi hanya dapat diminta jika pengajuan berstatus diproses");
  }
  item.status = "revisi";
  item.catatanRevisi = catatan;
  return cloneRecord(item);
}

export async function rejectSubmission(
  id: string,
  alasan: string,
  actor: UserProfile
): Promise<SubmissionRecord> {
  if (actor.role !== "tendik") {
    throw new Error("Hanya Tendik yang dapat menolak pengajuan");
  }
  const item = find(id);
  if (item.status !== "diproses") {
    throw new Error("Pengajuan hanya dapat ditolak jika berstatus diproses");
  }
  item.status = "ditolak";
  item.alasanTolak = alasan;
  return cloneRecord(item);
}
