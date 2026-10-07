# Panduan Kontribusi

## Cabang

- Dilarang push langsung ke `main`.
- Format: `feat/<area>-<fitur>`, contoh `feat/student-tracking`.
- Satu PR = satu fitur kecil. Review maksimal setengah hari.

## Pemilik folder

| Pemilik | Folder |
|---|---|
| A1 | src/types, src/lib (termasuk lib/services), src/hooks, docs |
| A2 | src/proxy.ts, app/(auth), app/page.tsx, components/shared, semua dashboard/*/layout.tsx |
| A3 | components/ui, app/verify, lib/documents |
| Tim B | app/dashboard/student/**/page.tsx saja |
| Tim C | app/dashboard/staff dan executive, hanya page.tsx |

Jangan mengedit folder milik orang lain. Butuh perubahan? Buka issue dan sebut pemiliknya.

## Aturan impor

- Gunakan alias: `@/types/auth`, `@/lib/services/submissions`.
- Halaman memanggil `lib/services/`, tidak membaca mock-data langsung.
- `components/ui` tidak mengimpor komponen lain.
- `components/shared` boleh mengimpor `ui`, tidak boleh `modules`.
- `components/modules/<role>` tidak boleh mengimpor dari modules role lain.
- Dilarang membuat tipe sendiri di dalam halaman. Pakai `src/types`.

## Sebelum membuka PR

1. `npm run lint` tanpa error
2. `npm run build` lolos
3. Tampilan responsif di ponsel
4. Ada skeleton dan empty state
5. Hanya mengubah folder milik sendiri

## Dokumen kondisi proyek

`docs/PROJECT_STATE.md` hanya diperbarui oleh A1 setiap akhir fase (hari 3, 9, 12). Anggota lain tidak mengeditnya.

## Daftar Branch Fitur Awal (Paralel Work)

Untuk memastikan seluruh anggota dapat bekerja secara paralel tanpa mengalami *merge conflict*, setiap anggota tim wajib membuat dan bekerja pada branch berikut sesuai dengan tugasnya:

### Tim A (Platform & Fondasi)
* **A1 (Tech Lead):**
  * `feat/core-structure-routing` (Struktur rute `app/dashboard/...` & pembaruan `USER_FLOW.md`)
  * `feat/core-types-mock-services` (Pengelolaan `src/types`, `mock-data.ts`, & `lib/services`)
* **A2 (Auth & Layout):**
  * `feat/layout-shared-components` (DashboardLayout, Sidebar, Header, skeleton, & empty state)
  * `feat/auth-google-rbac` (Login Google, allowlist, RBAC, & middleware/proxy)
* **A3 (Engine Dokumen & UI):**
  * `feat/ui-base-components` (StatusBadge, QRCodeStamp, StatCard)
  * `feat/document-pdf-generator` (Generator PDF, penomoran surat, & halaman verifikasi QR)

### Tim B (Mahasiswa)
* **B1 (Katalog & Form):**
  * `feat/student-service-catalog` (Halaman katalog 7 layanan akademik)
  * `feat/student-dynamic-form` (Form dinamis `services/[id]` & auto-fill)
* **B2 (Upload & Praktikum):**
  * `feat/student-file-upload` (Komponen `FileUploadZone` drag-and-drop & validasi 5MB)
  * `feat/student-praktikum-payment` (Form & modul pembayaran praktikum)
* **B3 (Dashboard & Tracking):**
  * `feat/student-dashboard-overview` (Overview dashboard mahasiswa & tracking status)
  * `feat/student-revision-download` (Alur revisi, re-upload, & unduh PDF resmi)

### Tim C (Tendik & Executive)
* **C1 (Verifikasi & Approval):**
  * `feat/staff-verification-table` (Overview Tendik & tabel verifikasi antrean)
  * `feat/staff-pdf-viewer-modal` (In-App PDF Viewer Modal)
* **C2 (Praktikum & Master Data):**
  * `feat/staff-praktikum-verification` (Verifikasi pembayaran praktikum)
  * `feat/staff-master-crud` (CRUD data master Mahasiswa/Prodi/Tendik & Pengumuman)
* **C3 (Executive Dashboard):**
  * `feat/executive-dashboard-views` (Dashboard executive prodi & fakultas)
  * `feat/executive-audit-export` (Audit log & fitur ekspor Excel/PDF)

---

## Aturan Alur Kerja Git (Git Workflow)

1. **Inisialisasi Branch:**
   Sebelum mulai bekerja, tarik kode terbaru dari `main` dan buat branch sesuai penugasan di atas:
   ```bash
   git checkout main
   git pull origin main
   git checkout <nama-branch-kamu>

## Aturan khusus Tim B dan Tim C (mode tampilan)

Tim B dan Tim C hanya mengerjakan susunan dan gaya halaman.

Boleh:

- Mengedit `page.tsx` di folder halaman masing-masing.
- Menyusun komponen dari `components/ui`, `components/shared`, dan `components/modules`.
- Gaya Tailwind, teks, dan ikon `lucide-react`.

Tidak boleh:

- Menulis `"use client"`, `useState`, atau `useEffect`.
- Memanggil `lib/services` secara langsung.
- Membuat atau mengubah tipe, komponen `ui`, `shared`, dan `modules`.
- Menjalankan `npm install` atau mengubah `package.json`.

Butuh komponen atau perubahan di luar itu? Buka issue berlabel `minta-komponen` dan sebut pemiliknya (Tim A).

## Aturan khusus Tim B dan Tim C (mode tampilan)

Tim B dan Tim C hanya mengerjakan susunan dan gaya halaman.

Boleh:

- Mengedit `page.tsx` di folder halaman masing-masing.
- Menyusun komponen dari `components/ui`, `components/shared`, dan `components/modules`.
- Gaya Tailwind, teks, dan ikon `lucide-react`.

Tidak boleh:

- Menulis `"use client"`, `useState`, atau `useEffect`.
- Memanggil `lib/services` secara langsung.
- Membuat atau mengubah tipe, komponen `ui`, `shared`, dan `modules`.
- Menjalankan `npm install` atau mengubah `package.json`.

Butuh komponen atau perubahan di luar itu? Buka issue berlabel `minta-komponen` dan sebut pemiliknya (Tim A).
