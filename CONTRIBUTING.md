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
| Tim B | app/dashboard/student (kecuali layout.tsx), components/modules/student |
| Tim C | app/dashboard/staff dan executive (kecuali layout.tsx), components/modules/staff dan executive |

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
