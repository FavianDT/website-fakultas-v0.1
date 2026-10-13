import type { UserProfile, ProdiType } from "@/types/auth";
import type {
  ServiceItem,
  ServiceField,
  SubmissionRecord,
  PaymentRecord,
  Pengumuman,
} from "@/types/layanan";

export const PRODI_LIST: { id: ProdiType; nama: string; ikon: string }[] = [
  { id: "Informatika", nama: "Teknik Informatika", ikon: "laptop" },
  { id: "Industri", nama: "Teknik Industri", ikon: "factory" },
  { id: "Elektro", nama: "Teknik Elektro", ikon: "zap" },
  { id: "Agroteknologi", nama: "Agroteknologi", ikon: "leaf" },
];

const fieldKeperluan: ServiceField = {
  name: "keperluan",
  label: "Keperluan",
  type: "textarea",
  required: true,
};

export const SERVICES: ServiceItem[] = [
  {
    id: "mbkm",
    nama: "Surat Formulir Pendaftaran MBKM",
    deskripsi: "Pendaftaran program MBKM.",
    ikon: "briefcase",
    berkasWajib: ["KRS", "Transkrip"],
    fields: [
      { name: "nama_mitra", label: "Nama Mitra", type: "text", required: true },
      { name: "program_mbkm", label: "Program MBKM", type: "select", required: true, options: ["Magang", "Studi Independen", "Pertukaran Mahasiswa", "Wirausaha", "Lainnya"] },
      { name: "posisi", label: "Posisi atau Kegiatan", type: "text", required: true },
      { name: "tanggal_mulai", label: "Tanggal Mulai", type: "date", required: true },
      { name: "tanggal_selesai", label: "Tanggal Selesai", type: "date", required: true },
      fieldKeperluan,
    ],
  },
  {
    id: "kp",
    nama: "Permohonan KP dan Seminar KP",
    deskripsi: "Kerja praktek dan seminarnya.",
    ikon: "building",
    berkasWajib: ["KRS", "Proposal KP"],
    fields: [
      { name: "jenis_pengajuan", label: "Jenis Pengajuan", type: "select", required: true, options: ["Permohonan KP", "Seminar KP"] },
      { name: "nama_perusahaan", label: "Nama Perusahaan", type: "text", required: true },
      { name: "alamat_perusahaan", label: "Alamat Perusahaan", type: "textarea", required: true },
      { name: "judul_kp", label: "Judul Kerja Praktek", type: "text", required: true },
      fieldKeperluan,
    ],
  },
  {
    id: "penelitian",
    nama: "Surat Permohonan Penelitian TA/Skripsi",
    deskripsi: "Izin penelitian tugas akhir.",
    ikon: "search",
    berkasWajib: ["Proposal", "Persetujuan pembimbing"],
    fields: [
      { name: "judul_penelitian", label: "Judul Penelitian", type: "text", required: true },
      { name: "nama_instansi", label: "Nama Instansi Tujuan", type: "text", required: true },
      { name: "alamat_instansi", label: "Alamat Instansi", type: "textarea", required: true },
      { name: "tanggal_mulai", label: "Rencana Mulai Penelitian", type: "date", required: true },
      { name: "tanggal_selesai", label: "Rencana Selesai Penelitian", type: "date", required: true },
      fieldKeperluan,
    ],
  },
  {
    id: "aktif-kuliah",
    nama: "Surat Keterangan Aktif Kuliah",
    deskripsi: "Bukti status mahasiswa aktif.",
    ikon: "file-check",
    berkasWajib: ["KRS semester berjalan"],
    fields: [
      { name: "semester", label: "Semester", type: "select", required: true, options: ["Ganjil", "Genap"] },
      { name: "tahun_akademik", label: "Tahun Akademik", type: "text", required: true },
      fieldKeperluan,
    ],
  },
  {
    id: "skl",
    nama: "Surat Keterangan Lulus (SKL)",
    deskripsi: "Keterangan kelulusan sementara.",
    ikon: "graduation-cap",
    berkasWajib: ["Bukti sidang"],
    fields: [
      { name: "tanggal_sidang", label: "Tanggal Sidang", type: "date", required: true },
      { name: "tanggal_yudisium", label: "Tanggal Yudisium", type: "date", required: true },
      { name: "predikat_lulus", label: "Predikat Kelulusan", type: "select", required: true, options: ["Dengan Pujian", "Sangat Memuaskan", "Memuaskan"] },
      fieldKeperluan,
    ],
  },
  {
    id: "sidang-yudisium",
    nama: "Pendaftaran Sidang dan Yudisium",
    deskripsi: "Daftar sidang dan yudisium.",
    ikon: "calendar",
    berkasWajib: ["Naskah TA", "Bukti bebas pinjaman"],
    fields: [
      { name: "jenis_pendaftaran", label: "Jenis Pendaftaran", type: "select", required: true, options: ["Sidang Tugas Akhir", "Yudisium"] },
      { name: "judul_ta", label: "Judul Tugas Akhir", type: "text", required: true },
      { name: "nama_pembimbing", label: "Nama Pembimbing", type: "text", required: true },
      { name: "tanggal_rencana", label: "Tanggal Rencana Sidang", type: "date", required: true },
      fieldKeperluan,
    ],
  },
  {
    id: "ijazah",
    nama: "Pengajuan Pembuatan Ijazah",
    deskripsi: "Permohonan penerbitan ijazah.",
    ikon: "award",
    berkasWajib: ["SKL", "Pas foto"],
    fields: [
      { name: "nama_di_ijazah", label: "Nama pada Ijazah", type: "text", required: true },
      { name: "tempat_lahir", label: "Tempat Lahir", type: "text", required: true },
      { name: "tanggal_lahir", label: "Tanggal Lahir", type: "date", required: true },
      { name: "alamat", label: "Alamat", type: "textarea", required: true },
      fieldKeperluan,
    ],
  },
];

export const USERS: UserProfile[] = [
  { id: "u-mhs-1", name: "Ahmad Fauzi", email: "ahmad@mahasiswa.uninus.ac.id", nim_nip: "2201001", prodi: "Informatika", role: "student" },
  { id: "u-mhs-2", name: "Siti Rahma", email: "siti@mahasiswa.uninus.ac.id", nim_nip: "2202002", prodi: "Industri", role: "student" },
  { id: "u-tdk-1", name: "Budi Santoso", email: "budi@uninus.ac.id", nim_nip: "198001", prodi: null, role: "tendik" },
  { id: "u-prd-1", name: "Dr. Rina Kusuma", email: "rina@uninus.ac.id", nim_nip: "197501", prodi: "Informatika", role: "prodi" },
  { id: "u-fak-1", name: "Prof. Hendra", email: "hendra@uninus.ac.id", nim_nip: "197001", prodi: null, role: "fakultas" },
];

const berkasContoh = { nama: "krs.pdf", tipe: "pdf" as const, ukuranKb: 220, url: "/mock/krs.pdf" };

export const SUBMISSIONS: SubmissionRecord[] = [
  { id: "sub-1", serviceId: "aktif-kuliah", studentId: "u-mhs-1", studentName: "Ahmad Fauzi", prodi: "Informatika", status: "diproses", tanggalAjuan: "2026-10-01", dataForm: { keperluan: "Beasiswa" }, berkas: [berkasContoh] },
  { id: "sub-2", serviceId: "kp", studentId: "u-mhs-1", studentName: "Ahmad Fauzi", prodi: "Informatika", status: "revisi", tanggalAjuan: "2026-09-28", dataForm: { keperluan: "KP di PT ABC" }, berkas: [berkasContoh], catatanRevisi: "Lampirkan surat penerimaan dari perusahaan." },
  { id: "sub-3", serviceId: "aktif-kuliah", studentId: "u-mhs-2", studentName: "Siti Rahma", prodi: "Industri", status: "selesai", tanggalAjuan: "2026-09-20", dataForm: { keperluan: "Administrasi" }, berkas: [berkasContoh], nomorSurat: "001/FTP/UNINUS/X/2026", pdfUrl: "/mock/surat-001.pdf", diverifikasiOleh: "Budi Santoso", tanggalTerbit: "2026-09-22" },
  { id: "sub-4", serviceId: "ijazah", studentId: "u-mhs-2", studentName: "Siti Rahma", prodi: "Industri", status: "ditolak", tanggalAjuan: "2026-09-15", dataForm: { keperluan: "Ijazah" }, berkas: [berkasContoh], alasanTolak: "Berkas tidak lengkap." },
];

export const PAYMENTS: PaymentRecord[] = [
  { id: "pay-1", studentId: "u-mhs-1", studentName: "Ahmad Fauzi", prodi: "Informatika", mataKuliah: "Praktikum Basis Data", nominal: 250000, buktiTransfer: { nama: "resi.jpg", tipe: "jpg", ukuranKb: 340, url: "/mock/resi.jpg" }, status: "diproses", tanggalAjuan: "2026-10-02" },
];

export const ANNOUNCEMENTS: Pengumuman[] = [
  { id: "ann-1", judul: "Jadwal yudisium periode Oktober", isi: "Pendaftaran dibuka sampai akhir bulan.", tanggal: "2026-10-01" },
];
