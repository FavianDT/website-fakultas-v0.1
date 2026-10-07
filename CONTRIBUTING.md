# Panduan Kontribusi

Panduan ini berlaku untuk seluruh 9 anggota tim. Baca bersama `AGENTS.md`, `docs/PROJECT_STATE.md`, dan `docs/USER_FLOW.md`.

## Pembagian tim

| Tim | Anggota | Fokus |
|---|---|---|
| A (Platform) | A1, A2, A3 | Tipe, layanan, hook, auth, layout, komponen, engine dokumen |
| B (Mahasiswa) | B1, B2, B3 | Susunan dan tampilan halaman mahasiswa |
| C (Tendik dan Executive) | C1, C2, C3 | Susunan dan tampilan halaman Tendik dan Executive |

Prinsip: semua yang berisi logika (state, validasi, pengambilan data, interaksi) dikerjakan Tim A. Tim B dan C menyusun tampilan dari komponen yang disiapkan Tim A.

## Cabang

- Dilarang push langsung ke `main`.
- Format: `feat/<area>-<fitur>`, contoh `feat/student-tracking`. Untuk perbaikan: `fix/<area>-<isu>`. Untuk dokumen: `docs/<topik>`.
- Satu cabang = satu fitur kecil, dan satu halaman untuk Tim B dan C.
- Cabang tidak boleh hidup lebih dari 2 hari tanpa merge. Cabang panjang hampir pasti konflik.
- Setiap pagi sinkronkan dengan `main`:

```bash
git checkout main
git pull origin main
git checkout <cabang-kerja>
git merge main
```

## Pull Request

- Judul berformat `tipe(area): deskripsi`, contoh `feat(student): katalog layanan`.
- Gunakan template PR di `.github/pull_request_template.md`.
- Metode merge hanya **Squash and merge**.
- Check CI bernama `build` harus lolos.
- Perlu minimal 1 persetujuan, termasuk dari pemilik folder (lihat `.github/CODEOWNERS`).
- Review halaman Tim B dan C dilakukan oleh Tim A.
- Semua komentar review harus ditutup sebelum merge.
- Review maksimal setengah hari. PR yang menggantung lebih dari sehari harus diangkat di stand-up.

## Pemilik folder

| Pemilik | Folder dan file |
|---|---|
| A1 | `src/types`, `src/lib` (kecuali `lib/documents`), `src/hooks`, `docs`, `package.json`, `package-lock.json` |
| A2 | `src/proxy.ts`, `src/app/(auth)`, `src/app/page.tsx`, `src/components/shared`, `src/app/globals.css`, semua `src/app/dashboard/*/layout.tsx` |
| A3 | `src/components/ui`, `src/app/verify`, `src/lib/documents` |
| A1 dan A3 | `src/components/modules` (semua role) |
| Tim B | Hanya `page.tsx` di `src/app/dashboard/student/` |
| Tim C | Hanya `page.tsx` di `src/app/dashboard/staff/` dan `src/app/dashboard/executive/` |

Jangan mengedit file milik orang lain. Butuh perubahan? Buka issue dan sebut pemiliknya.

File bersama yang paling rawan konflik hanya boleh diubah pemiliknya: `package.json`, `package-lock.json`, `globals.css`, dan semua `layout.tsx`.

## Aturan impor

- Gunakan alias `@/`, contoh `@/types/auth`.
- Tim A boleh memanggil `@/lib/services/*` dari hook dan komponen modules.
- Halaman (`page.tsx`) tidak membaca `mock-data` dan tidak memanggil `lib/services` secara langsung. Halaman hanya merakit komponen.
- `components/ui` tidak mengimpor komponen lain.
- `components/shared` boleh mengimpor `ui`, tidak boleh `modules`.
- `components/modules/<role>` tidak boleh mengimpor dari modules role lain.
- Dilarang membuat tipe di dalam halaman. Pakai `src/types`.

## Aturan khusus Tim B dan Tim C (mode tampilan)

Tim B dan Tim C hanya mengerjakan susunan dan gaya halaman.

Boleh:

- Mengedit `page.tsx` di folder halaman masing-masing.
- Menyusun komponen dari `components/ui`, `components/shared`, dan `components/modules`.
- Gaya Tailwind, teks, dan ikon `lucide-react`.
- Memakai teks penanda (misalnya "Komponen tabel akan di sini") bila komponen dari Tim A belum tersedia, lalu menggantinya saat komponen tiba.

Tidak boleh:

- Menulis `"use client"`, `useState`, `useEffect`, atau `fetch`.
- Memanggil `lib/services` atau membaca `mock-data` secara langsung.
- Membuat atau mengubah tipe, hook, serta komponen di `ui`, `shared`, dan `modules`.
- Menjalankan `npm install` atau mengubah `package.json`.
- Membuka PR yang menyentuh lebih dari satu halaman.

Butuh komponen atau perubahan di luar itu? Buka issue berlabel `minta-komponen` dan sebut pemiliknya (Tim A).

## Urutan ketergantungan

Tim B dan C bergantung pada komponen Tim A. Target merge:

| Komponen | Pemilik | Target merge |
|---|---|---|
| Layout, `Sidebar`, `Header`, `PageHeader`, `EmptyState`, `Skeleton` | A2 | Hari 3 |
| `StatusBadge`, `StatCard` | A3 | Hari 3 |
| Komponen mahasiswa (katalog, form, upload, daftar pengajuan) | A1 dan A3 | Hari 6 |
| Komponen Tendik (tabel verifikasi, PDF viewer, tombol keputusan, tabel praktikum, data master) | A1 dan A3 | Hari 7 |
| Komponen Executive (ringkasan, grafik, tabel audit log) | A1 dan A3 | Hari 7 |

Sebelum komponen tiba, Tim B dan C menyiapkan kerangka halaman dan gaya di sekelilingnya.

## Label issue

| Label | Fungsi |
|---|---|
| `minta-komponen` | Tim B atau C meminta komponen atau perubahan ke Tim A |
| `perubahan-tipe` | Permintaan ubah tipe atau tanda tangan fungsi layanan ke A1 |
| `blocker` | Pekerjaan terhenti menunggu pihak lain |
| `bug` | Kesalahan yang perlu diperbaiki |
| `tim-a`, `tim-b`, `tim-c` | Penanda tim |

Perubahan tipe atau tanda tangan fungsi di `src/lib/services` hanya lewat A1.

## Sebelum membuka PR

1. `npx tsc --noEmit` tanpa error
2. `npm run lint` tanpa error
3. `npm run build` lolos
4. Tampilan responsif di ponsel
5. Ada keadaan memuat dan kosong (lewat `Skeleton` dan `EmptyState`)
6. Hanya mengubah file milik sendiri (cek dengan `git diff --stat`)

## Dokumen kondisi proyek

`docs/PROJECT_STATE.md` hanya diperbarui oleh A1 setiap akhir fase (hari 3, 9, 12). Anggota lain tidak mengeditnya.

## Memakai alat AI

- Alat AI wajib membaca `AGENTS.md` dan dokumen ini lebih dulu.
- Hasil AI harus dibaca ulang oleh penulis PR sebelum dikirim.
- Periksa `git diff --stat` sebelum commit. Jika ada file di luar kepemilikan Anda yang berubah, batalkan perubahan itu.
- Tim B dan C: sertakan batasan mode tampilan di setiap permintaan ke AI, dan minta AI mengubah satu file `page.tsx` saja.