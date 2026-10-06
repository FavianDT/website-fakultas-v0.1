<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Aturan proyek Portal FTP UNINUS
- Struktur: `src/app`, `src/components/{ui,shared,modules}`, `src/lib`, `src/hooks`, `src/types`.
- Rute dashboard memakai `app/dashboard/...` (tanpa route group), login di `app/(auth)/login`.
- Role: `student | tendik | prodi | fakultas`. Folder `staff` = tendik, `executive` = prodi dan fakultas.
- Warna: primary `#00964D`, accent `#FBBF24`, background `#F8FAFC`.
- Status: `diproses | revisi | ditolak | selesai`.
- Semua data lewat `src/lib/services/` (fungsi async). Jangan baca mock-data langsung dari halaman.
- Hanya Tendik yang boleh ACC, Revisi, Tolak. Prodi dan Fakultas read-only.
- Impor memakai alias `@/`. Tipe hanya dari `src/types`.
- Jangan mengedit file di luar folder yang menjadi tugas Anda (lihat CONTRIBUTING.md).
