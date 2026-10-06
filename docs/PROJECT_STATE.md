# Kondisi Proyek Portal Layanan FTP UNINUS

Tanggal pembuatan: 2026-10-06. Branch Git aktif: `main`.

## 1. Ringkasan satu paragraf

Portal Layanan Akademik FTP UNINUS adalah aplikasi Next.js App Router yang ditujukan untuk mahasiswa, Tendik, Prodi, dan Fakultas dalam pengajuan layanan akademik dan pemantauan prosesnya. Kondisi kode saat ini adalah fondasi prototipe: tipe domain, mock data, dan fungsi layanan asinkron sudah tersedia, tetapi penyimpanan hanya berupa state modul di memori, seluruh 13 halaman dashboard masih bertuliskan “Halaman dalam pengerjaan”, login hanya berupa halaman judul, dan sebagian mesin dokumen/halaman verifikasi masih tiruan. Semua fakta kondisi aktual dalam dokumen ini berasal dari file yang dibaca dan hasil perintah pada 2026-10-06; bagian rencana pemilik proyek ditandai terpisah.

## 2. Teknologi dan versi

Spesifikasi versi berikut disalin dari `package.json`. Nilai dengan awalan `^` adalah rentang versi yang dideklarasikan, bukan pernyataan versi paket hasil resolusi instalasi.

| Paket | Spesifikasi di `package.json` | Kelompok |
|---|---:|---|
| Next.js | `16.3.8` | dependency |
| React | `19.2.8` | dependency |
| React DOM | `19.2.8` | dependency |
| TypeScript | `^5` | devDependency |
| Tailwind CSS | `^4` | devDependency |
| `@tailwindcss/postcss` | `^4` | devDependency |
| `eslint-config-next` | `16.3.8` | devDependency |
| ESLint | `^9` | devDependency |
| `lucide-react` | `^1.52.0` | dependency |
| `qrcode.react` | `^4.2.0` | dependency |
| `@types/node` | `^20` | devDependency |
| `@types/react` | `^19` | devDependency |
| `@types/react-dom` | `^19` | devDependency |

Script yang tersedia adalah `dev` (`next dev`), `build` (`next build`), `start` (`next start`), dan `lint` (`eslint`). Tidak ada script `test` di `package.json`.

Next.js 16 menggunakan konvensi `proxy.ts`; `middleware.ts` telah deprecated dan berganti nama menjadi `proxy`. Ini diverifikasi dari dokumentasi paket yang terpasang di `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md`, yang menyatakan bahwa konvensi middleware deprecated dan renamed to proxy. Dokumentasi itu membolehkan file pada root proyek atau di dalam `src` jika `app` berada di sana. `AGENTS.md` dan `CONTRIBUTING.md` proyek menetapkan lokasi `src/proxy.ts`. Pada keadaan yang diinventarisasi, file tersebut belum ada.

Alias impor `@/*` di `tsconfig.json` diarahkan ke `./src/*`. Konfigurasi TypeScript memakai `strict: true`, `noEmit: true`, `moduleResolution: "bundler"`, dan JSX `react-jsx`.

## 3. Struktur folder aktual

Pohon berikut menunjukkan seluruh isi `src/` pada saat inventaris. Tag `[berisi kode]` menandai file dengan implementasi/isi nyata, `[placeholder]` menandai halaman atau shell sementara, dan `[kosong]` menandai file penanda tanpa isi. `favicon.ico` merupakan asset biner, bukan source code.

```text
src/ [berisi kode]
├── app/ [berisi kode: App Router]
│   ├── (auth)/ [berisi kode]
│   │   └── login/ [placeholder]
│   │       └── page.tsx [placeholder: judul Login & SSO Fakultas]
│   ├── dashboard/ [berisi kode: rute dashboard tanpa route group]
│   │   ├── executive/ [placeholder]
│   │   │   ├── audit-log/ [placeholder]
│   │   │   │   └── page.tsx [placeholder]
│   │   │   ├── fakultas/ [placeholder]
│   │   │   │   └── page.tsx [placeholder]
│   │   │   ├── prodi/ [placeholder]
│   │   │   │   └── page.tsx [placeholder]
│   │   │   ├── layout.tsx [placeholder: hanya meneruskan children]
│   │   │   └── page.tsx [placeholder]
│   │   ├── staff/ [placeholder]
│   │   │   ├── manage/ [placeholder]
│   │   │   │   └── page.tsx [placeholder]
│   │   │   ├── praktikum/ [placeholder]
│   │   │   │   └── page.tsx [placeholder]
│   │   │   ├── verifications/ [placeholder]
│   │   │   │   └── page.tsx [placeholder]
│   │   │   ├── layout.tsx [placeholder: hanya meneruskan children]
│   │   │   └── page.tsx [placeholder]
│   │   ├── student/ [berisi kode: layout dan halaman stub]
│   │   │   ├── praktikum/ [placeholder]
│   │   │   │   └── page.tsx [placeholder]
│   │   │   ├── services/ [placeholder]
│   │   │   │   ├── [id]/ [placeholder]
│   │   │   │   │   └── page.tsx [placeholder]
│   │   │   │   └── page.tsx [placeholder]
│   │   │   ├── tracking/ [placeholder]
│   │   │   │   └── page.tsx [placeholder]
│   │   │   ├── layout.tsx [placeholder: sidebar statis]
│   │   │   └── page.tsx [placeholder]
│   ├── verify/ [berisi kode minimal]
│   │   └── [nomor]/ [berisi kode minimal]
│   │       └── page.tsx [placeholder: hanya menampilkan parameter nomor]
│   ├── favicon.ico [asset biner]
│   ├── globals.css [berisi kode: hanya import Tailwind]
│   ├── layout.tsx [berisi kode: root layout dan metadata]
│   └── page.tsx [berisi kode: redirect ke /login]
├── components/ [kosong selain file penanda]
│   ├── modules/ [kosong selain file penanda]
│   │   ├── executive/ [.gitkeep kosong]
│   │   ├── staff/ [.gitkeep kosong]
│   │   └── student/ [.gitkeep kosong]
│   ├── shared/ [.gitkeep kosong]
│   └── ui/ [.gitkeep kosong]
├── hooks/ [.gitkeep kosong]
├── lib/ [berisi kode: mock data dan service]
│   ├── documents/ [berisi kode minimal]
│   │   ├── .gitkeep [kosong]
│   │   └── generate-letter.ts [berisi kode: generator surat tiruan]
│   ├── services/ [berisi kode]
│   │   ├── .gitkeep [kosong]
│   │   ├── master.ts [berisi kode]
│   │   ├── payments.ts [berisi kode]
│   │   ├── stats.ts [berisi kode]
│   │   └── submissions.ts [berisi kode]
│   └── mock-data.ts [berisi kode]
└── types/ [berisi kode]
    ├── .gitkeep [kosong]
    ├── auth.ts [berisi kode]
    └── layanan.ts [berisi kode]
```

Sebanyak 13 halaman dashboard (5 student, 4 staff, 4 executive) mengembalikan teks `Halaman dalam pengerjaan`. Halaman login adalah stub kecil. Layout student menyediakan `<aside>` statis berisi “Sidebar Student” dan komentar bahwa sidebar akan ditempatkan di sana; layout staff dan executive hanya merender `children`. `src/app/verify/[nomor]/page.tsx` menerima `params` Promise sesuai pola yang dipakai kode saat ini, lalu menampilkan nilai nomor tanpa mencari atau memvalidasi dokumen.

Folder `docs/` saat inventaris hanya memiliki `.gitkeep`; dokumen ini menjadi file dokumentasi proyek pertama yang ditambahkan pada folder tersebut.

## 4. Tipe data

Semua tipe domain berikut berada di `src/types/`. `auth.ts` mengekspor `UserRole`, `ProdiType`, dan `UserProfile`. `layanan.ts` mengimpor `ProdiType` dari `./auth` dan mengekspor tipe/interface layanan di bawah ini.

| Tipe/interface | Tujuan dan field | Pemakai yang terlihat di source |
|---|---|---|
| `UserRole` | Union `student \| tendik \| prodi \| fakultas`. | `UserProfile`, `listUsers` di `services/master.ts`, dan data user mock. |
| `ProdiType` | Union `Informatika \| Industri \| Elektro \| Agroteknologi`. | `UserProfile`, tipe layanan, mock prodi, filter/statistik dan fungsi master. |
| `UserProfile` | Profil akun: `id`, `name`, `email`, opsional `email_gmail`, `nim_nip`, `prodi: ProdiType \| null`, `role`. | Data `USERS` dan `services/master.ts`. |
| `SubmissionStatus` | Status pengajuan: `diproses \| revisi \| ditolak \| selesai`. | `SubmissionRecord`, `SubmissionFilter`, dan fungsi `services/submissions.ts`. |
| `FieldType` | Jenis field dinamis: `text \| textarea \| date \| number \| select`. | `ServiceField`. |
| `ServiceField` | Definisi field formulir: `name`, `label`, `type`, `required`, `options?`. | `ServiceItem`, mock layanan. |
| `ServiceItem` | Katalog layanan: `id`, `nama`, `deskripsi`, `ikon`, `berkasWajib: string[]`, `fields: ServiceField[]`. | Mock layanan dan service katalog. |
| `UploadedFile` | Metadata file: `nama`, `tipe: "pdf" \| "png" \| "jpg"`, `ukuranKb`, `url`. Ini belum berarti file benar-benar diunggah atau disimpan. | Data mock, submission, payment, dan input resubmit. |
| `SubmissionRecord` | Pengajuan: `id`, `serviceId`, `studentId`, `studentName`, `prodi`, `status`, `tanggalAjuan`, `dataForm: Record<string,string>`, `berkas: UploadedFile[]`; opsional `catatanRevisi`, `alasanTolak`, `nomorSurat`, `pdfUrl`, `diverifikasiOleh`, `tanggalTerbit`. | Mock dan seluruh operasi `services/submissions.ts`; generator surat menerima tipe ini. |
| `PaymentStatus` | Status pembayaran: `diproses \| revisi \| ditolak \| selesai`. | `PaymentRecord` dan `services/payments.ts`. |
| `PaymentRecord` | Pembayaran: `id`, `studentId`, `studentName`, `prodi`, `mataKuliah`, `nominal`, `buktiTransfer: UploadedFile`, `status`, `tanggalAjuan`; opsional `catatan`, `diverifikasiOleh`. | Mock dan `services/payments.ts`. |
| `Pengumuman` | Pengumuman: `id`, `judul`, `isi`, `tanggal`. | Mock dan `services/master.ts`. |
| `SummaryStats` | Ringkasan: `totalTerbit`, `totalDiproses`, `rataRataHari`, `perProdi: Record<ProdiType, number>`. | Hasil `getSummary` pada `services/stats.ts`. |
| `TrendPoint` | Titik tren: `bulan`, `layanan`, `praktikum`. | Hasil `getTrend` pada `services/stats.ts`. |
| `SubmissionFilter` | Filter opsional `prodi`, `serviceId`, `status`. | Parameter `getSubmissions`. |
| `NewSubmissionInput` | Input pembuatan: `serviceId`, `student: { id, name, prodi }`, `dataForm`, `berkas`. | Parameter `createSubmission`. |
| `NewPaymentInput` | Input pembayaran: `student: { id, name, prodi }`, `mataKuliah`, `nominal`, `buktiTransfer`. | Parameter `createPayment`. |

`GeneratedLetter` bukan berada di `src/types`; interface itu dideklarasikan lokal di `src/lib/documents/generate-letter.ts` dengan field `nomorSurat`, `pdfUrl`, dan `qrUrl`.

## 5. Mock data

`src/lib/mock-data.ts` mengekspor `PRODI_LIST`, `SERVICES`, `USERS`, `SUBMISSIONS`, `PAYMENTS`, dan `ANNOUNCEMENTS`. Jumlah dan contoh nilainya:

- **Program studi: 4.** Informatika (nama tampilan “Teknik Informatika”, ikon `laptop`), Industri (“Teknik Industri”, `factory`), Elektro (“Teknik Elektro”, `zap`), Agroteknologi (“Agroteknologi”, `leaf`).
- **Layanan: 7.** Semua layanan menggunakan field formulir bersama `keperluan` bertipe `textarea`, label “Keperluan”, wajib diisi.
  - `mbkm`: “Surat Formulir Pendaftaran MBKM”; lampiran wajib KRS dan Transkrip.
  - `kp`: “Permohonan KP dan Seminar KP”; KRS dan Proposal KP.
  - `penelitian`: “Surat Permohonan Penelitian TA/Skripsi”; Proposal dan Persetujuan pembimbing.
  - `aktif-kuliah`: “Surat Keterangan Aktif Kuliah”; KRS semester berjalan.
  - `skl`: “Surat Keterangan Lulus (SKL)”; Bukti sidang.
  - `sidang-yudisium`: “Pendaftaran Sidang dan Yudisium”; Naskah TA dan Bukti bebas pinjaman.
  - `ijazah`: “Pengajuan Pembuatan Ijazah”; SKL dan Pas foto.
- **User: 5.** Ahmad Fauzi (`u-mhs-1`, mahasiswa, Informatika, NIM `2201001`); Siti Rahma (`u-mhs-2`, mahasiswa, Industri, NIM `2202002`); Budi Santoso (`u-tdk-1`, Tendik, tanpa prodi, NIP `198001`); Dr. Rina Kusuma (`u-prd-1`, Prodi Informatika, NIP `197501`); Prof. Hendra (`u-fak-1`, Fakultas, tanpa prodi, NIP `197001`). Email masing-masing tercantum di `USERS` dalam `mock-data.ts`; email mock mahasiswa memakai `@mahasiswa.uninus.ac.id`, akun staf memakai `@uninus.ac.id`.
- **Pengajuan: 4.** `sub-1` milik Ahmad, layanan aktif kuliah, `diproses`, tanggal `2026-10-01`, keperluan Beasiswa; `sub-2` milik Ahmad, layanan KP, `revisi`, tanggal `2026-09-28`, keperluan “KP di PT ABC”, dengan catatan lampiran surat penerimaan; `sub-3` milik Siti, aktif kuliah, `selesai`, tanggal `2026-09-20`, nomor `001/FTP/UNINUS/X/2026`, URL PDF mock, diverifikasi Budi, tanggal terbit `2026-09-22`; `sub-4` milik Siti, ijazah, `ditolak`, tanggal `2026-09-15`, alasan “Berkas tidak lengkap.” Semua menggunakan mock `krs.pdf` di `/mock/krs.pdf` sebagai lampiran.
- **Pembayaran: 1.** `pay-1` milik Ahmad, Praktikum Basis Data, nominal `250000`, bukti `resi.jpg` (`jpg`, 340 KB, `/mock/resi.jpg`), status `diproses`, tanggal `2026-10-02`.
- **Pengumuman: 1.** `ann-1`, “Jadwal yudisium periode Oktober”, isi “Pendaftaran dibuka sampai akhir bulan.”, tanggal `2026-10-01`.

Keterangan layanan/deskripsi, nama ikon, dan semua nilai mock lengkap berada pada source; daftar di atas merangkum nilai tiap entri tanpa mengubahnya. File lampiran dan PDF ber-URL `/mock/...` adalah rujukan mock, bukan bukti adanya file fisik.

## 6. Lapisan layanan (src/lib/services)

Seluruh service saat ini berupa fungsi `async` dalam empat file. Penyimpanan dibuat pada level modul menggunakan array dan tidak memakai database. `submissions.ts`, `payments.ts`, serta `master.ts` membuat array lokal dari array mock (salinan array tingkat atas); objek record di dalamnya tidak disalin mendalam. Mutasi service berlangsung pada state memori proses. State akan kembali dari mock saat modul/proses server dimulai ulang dan tidak dibagikan secara andal lintas instance/serverless.

### `master.ts`

```ts
listUsers(role?: UserRole): Promise<UserProfile[]>
createUser(data: Omit<UserProfile, "id">): Promise<UserProfile>
updateUser(id: string, data: Partial<UserProfile>): Promise<UserProfile>
removeUser(id: string): Promise<void>
listProdi(): Promise<{ id: ProdiType; nama: string; ikon: string }[]>
listServices(): Promise<ServiceItem[]>
listAnnouncements(): Promise<Pengumuman[]>
createAnnouncement(data: Omit<Pengumuman, "id">): Promise<Pengumuman>
removeAnnouncement(id: string): Promise<void>
```

Return type Promise ditulis sebagai tipe efektif dari fungsi `async`; beberapa fungsi tidak menuliskan anotasi return secara eksplisit di source.

- `listUsers` mengembalikan seluruh array user jika tanpa filter, atau hasil filter role. Tidak ada error validasi.
- `createUser` menambahkan record dengan `id: u-${users.length + 1}`. Tidak memeriksa email duplikat atau validitas role/prodi selain pemeriksaan tipe compile-time.
- `updateUser` mencari ID dan mengganti record dengan gabungan record lama dan `Partial<UserProfile>`. Jika tidak ditemukan, melempar `Error("User tidak ditemukan")`.
- `removeUser` menghapus user jika ditemukan; ID yang tidak ada tidak menghasilkan error.
- `listProdi` mengembalikan `PRODI_LIST` dari mock.
- `listServices` mengembalikan array lokal `services`, yaitu salinan dangkal array `SERVICES`.
- `listAnnouncements` mengembalikan array lokal pengumuman.
- `createAnnouncement` memberi ID `ann-${announcements.length + 1}`, menambahkan record, lalu mengembalikannya.
- `removeAnnouncement` menghapus jika ID ditemukan dan diam jika tidak ditemukan.

### `submissions.ts`

```ts
getSubmissions(filter: SubmissionFilter = {}): Promise<SubmissionRecord[]>
getSubmissionsByStudent(studentId: string): Promise<SubmissionRecord[]>
getServices(): Promise<ServiceItem[]>
createSubmission(input: NewSubmissionInput): Promise<SubmissionRecord>
resubmitRevision(id: string, berkas: UploadedFile[]): Promise<SubmissionRecord>
approveSubmission(id: string, tendikName: string): Promise<SubmissionRecord>
requestRevision(id: string, catatan: string): Promise<SubmissionRecord>
rejectSubmission(id: string, alasan: string): Promise<SubmissionRecord>
```

- Fungsi internal `find(id)` mencari record pada array lokal; jika tidak ditemukan, melempar `Error("Pengajuan ${id} tidak ditemukan")`.
- `getSubmissions` menyaring berdasarkan `prodi`, `serviceId`, dan `status` yang diberikan. Filter kosong menghasilkan semua record.
- `getSubmissionsByStudent` menyaring berdasarkan `studentId`.
- `getServices` mengembalikan `SERVICES` dari mock secara langsung.
- `createSubmission` membuat ID `sub-${store.length + 1}`, menyalin identitas mahasiswa dan data input, menetapkan status `diproses` serta tanggal hari ini dalam format ISO `YYYY-MM-DD`, lalu menambahkan record. Tidak ada validasi bahwa `serviceId`, field wajib, atau berkas wajib benar-benar ada.
- `resubmitRevision` menerima hanya status `revisi`; status lain melempar `Error("Pengajuan hanya dapat diajukan ulang jika berstatus revisi")`. Jika valid, mengganti array `berkas`, mengubah status ke `diproses`, dan menghapus `catatanRevisi`.
- `approveSubmission` menerima hanya status `diproses`; jika tidak, melempar `Error("Pengajuan hanya dapat disetujui jika berstatus diproses")`. Bila lolos, ia `await generateLetter(item)`, kemudian mengubah status ke `selesai`, menyimpan nomor surat dan URL PDF tiruan, `tendikName` sebagai `diverifikasiOleh`, serta tanggal terbit hari ini. Jika generator gagal, mutasi setelah `await` tidak dilakukan.
- `requestRevision` menerima hanya status `diproses`; jika tidak, melempar `Error("Revisi hanya dapat diminta jika pengajuan berstatus diproses")`. Jika valid, status menjadi `revisi` dan `catatanRevisi` disimpan. Nilai kosong tidak divalidasi.
- `rejectSubmission` menerima hanya status `diproses`; jika tidak, melempar `Error("Pengajuan hanya dapat ditolak jika berstatus diproses")`. Jika valid, status menjadi `ditolak` dan `alasanTolak` disimpan. Nilai kosong tidak divalidasi.

### `payments.ts`

```ts
getPayments(
  filter: { prodi?: ProdiType; studentId?: string } = {}
): Promise<PaymentRecord[]>
createPayment(input: NewPaymentInput): Promise<PaymentRecord>
verifyPayment(
  id: string,
  keputusan: "selesai" | "ditolak" | "revisi",
  tendikName: string,
  catatan?: string
): Promise<PaymentRecord>
resubmitPayment(id: string, buktiTransfer: UploadedFile): Promise<PaymentRecord>
```

- Pencarian ID yang gagal pada operasi mutasi melempar `Error("Pembayaran ${id} tidak ditemukan")`.
- `getPayments` dapat menyaring berdasarkan prodi dan/atau student ID.
- `createPayment` memberi ID `pay-${store.length + 1}`, menyalin data input, menetapkan `diproses` dan tanggal hari ini, lalu menambahkan record. Validasi nominal, file, dan identitas belum dilakukan.
- `verifyPayment` hanya menerima record berstatus `diproses`; selain itu melempar `Error("Pembayaran hanya dapat diverifikasi jika berstatus diproses")`. Parameter `keputusan` menentukan status baru secara langsung. Untuk keputusan `ditolak` atau `revisi`, catatan wajib berisi selain whitespace; jika kosong, melempar `Error("Catatan wajib diisi untuk keputusan ditolak atau revisi")`. Setelah valid, `catatan` dan `diverifikasiOleh` disimpan. Untuk keputusan `selesai`, catatan bersifat opsional.
- `resubmitPayment` hanya menerima status `revisi`; selain itu melempar `Error("Pembayaran hanya dapat diajukan ulang jika berstatus revisi")`. Jika valid, mengganti `buktiTransfer`, mengembalikan status ke `diproses`, dan menghapus catatan lama.

Service pembayaran tidak memiliki fungsi operasi lain di luar empat fungsi di atas. Validasi status di service tidak memvalidasi identitas/role pemanggil.

### `stats.ts`

```ts
getSummary(scope: { prodi?: ProdiType } = {}): Promise<SummaryStats>
getTrend(_scope: { prodi?: ProdiType } = {}): Promise<TrendPoint[]>
```

- `getSummary` mengambil submissions melalui `getSubmissions({ prodi: scope.prodi })`, menghitung jumlah status `selesai` (`totalTerbit`), `diproses` (`totalDiproses`), dan `selesai` per prodi. `rataRataHari` masih konstanta `2`, diberi komentar `// DATA MOCK`.
- `getTrend` mengembalikan empat titik data tetap untuk Jul, Agu, Sep, dan Okt, diberi komentar `// DATA MOCK`. Parameter `_scope` tetap ada di signature tetapi tidak dipakai untuk menyaring data.

Semua perubahan array/record hanya berada di memori. Tidak ditemukan koneksi database, transaksi, penyimpanan bersama, atau pemulihan data perubahan setelah proses restart.

## 7. Mesin dokumen

`src/lib/documents/generate-letter.ts` mengekspor `GeneratedLetter` dengan `nomorSurat: string`, `pdfUrl: string`, dan `qrUrl: string`, serta fungsi:

```ts
generateLetter(submission: SubmissionRecord): Promise<GeneratedLetter>
```

Ini secara eksplisit ditandai di source sebagai versi tiruan. Counter modul dimulai dari `100`, dinaikkan setiap pemanggilan, lalu dipakai sebagai nomor tiga digit dengan format `NNN/FTP/UNINUS/X/2026`. Tahun/bulan `X/2026` tetap literal. `pdfUrl` hanya string `/mock/surat-${submission.id}.pdf`; `qrUrl` hanya URL `/verify/${encodeURIComponent(nomorSurat)}`. Tidak ada PDF dibuat, QR tidak dirender di fungsi ini, dan belum ada tanda tangan digital. Yang perlu diganti untuk implementasi nyata: pembuatan/penyimpanan PDF, aturan nomor surat yang disahkan, QR yang mengarah ke data verifikasi, serta integrasi dengan halaman verifikasi dan alur otorisasi yang benar. Alur pemanggil saat ini adalah `approveSubmission` memanggil `generateLetter`, lalu menyimpan hasil nomor dan URL PDF pada record pengajuan.

## 8. Aturan arsitektur yang berlaku

Aturan berikut berasal dari `AGENTS.md` dan `CONTRIBUTING.md`, bukan asumsi implementasi:

> “Semua data lewat fungsi async di src/lib/services/. Jangan baca mock-data langsung dari halaman.” — `AGENTS.md`
>
> “Hanya Tendik yang boleh ACC, Revisi, Tolak. Prodi dan Fakultas read-only.” — `AGENTS.md`
>
> “Proteksi rute memakai src/proxy.ts (Next.js 16), bukan middleware.ts.” — `AGENTS.md`
>
> “Halaman memanggil lib/services/, tidak membaca mock-data langsung.” — `CONTRIBUTING.md`
>
> “components/ui tidak mengimpor komponen lain.” — `CONTRIBUTING.md`
>
> “components/shared boleh mengimpor ui, tidak boleh modules.” — `CONTRIBUTING.md`
>
> “components/modules/<role> tidak boleh mengimpor dari modules role lain.” — `CONTRIBUTING.md`
>
> “Dilarang membuat tipe sendiri di dalam halaman. Pakai src/types.” — `CONTRIBUTING.md`

Konvensi struktur yang tertulis: login pada `src/app/(auth)/login`; dashboard pada `src/app/dashboard/...` tanpa route group; role adalah `student`, `tendik`, `prodi`, `fakultas`; folder `staff` berarti Tendik dan `executive` berarti Prodi/Fakultas; status adalah `diproses`, `revisi`, `ditolak`, `selesai`; alias impor memakai `@/`.

Pemilik folder menurut tabel `CONTRIBUTING.md`:

| Pemilik | Folder/tanggung jawab yang tercantum |
|---|---|
| A1 | `src/types`, `src/lib` termasuk services, `src/hooks`, `docs` |
| A2 | `src/proxy.ts`, `app/(auth)`, `app/page.tsx`, `components/shared`, semua `dashboard/*/layout.tsx` |
| A3 | `components/ui`, `app/verify`, `lib/documents` |
| Tim B | `app/dashboard/student` kecuali `layout.tsx`, `components/modules/student` |
| Tim C | `app/dashboard/staff` dan `executive` kecuali layout, `components/modules/staff` dan `executive` |

Pemeriksaan kode memperlihatkan service approval/revisi/reject hanya memeriksa status record, tidak memverifikasi bahwa pemanggil adalah Tendik. `tendikName` adalah string yang diberikan ke fungsi. Karena belum ada auth/proxy, penerapan aturan akses secara runtime belum diverifikasi dan belum tampak di kode.

## 9. Hasil pemeriksaan kualitas

Perintah dijalankan dari root repo pada 2026-10-06:

- `npx tsc --noEmit`: exit code `0`; tidak menghasilkan output.
- `npm run lint`: exit code `0`; output apa adanya:

```text
> website-fakultas-v0.1@0.1.0 lint
> eslint
```

- `npm run build`: exit code `0`; output apa adanya:

```text
> website-fakultas-v0.1@0.1.0 build
> next build

▲ Next.js 16.3.8 (Turbopack)
✓ Running next.config.ts took 40ms

  Creating an optimized production build ...
✓ Compiled successfully in 495ms
✓ Finished TypeScript in 1335ms
✓ Collecting page data using 11 workers in 1381ms
✓ Generating static pages using 11 workers (17/17) in 507ms
✓ Finalizing page optimization in 30ms

Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /dashboard/executive
├ ○ /dashboard/executive/audit-log
├ ○ /dashboard/executive/fakultas
├ ○ /dashboard/executive/prodi
├ ○ /dashboard/staff
├ ○ /dashboard/staff/manage
├ ○ /dashboard/staff/praktikum
├ ○ /dashboard/staff/verifications
├ ○ /dashboard/student
├ ○ /dashboard/student/praktikum
├ ○ /dashboard/student/services
├ ƒ /dashboard/student/services/[id]
├ ○ /dashboard/student/tracking
├ ○ /login
└ ƒ /verify/[nomor]


○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

Tidak ada error TypeScript atau lint pada pemeriksaan ini. Build sukses tidak berarti halaman placeholder telah memiliki fitur. Masalah/kekosongan yang telah terlihat dalam source: autentikasi dan otorisasi runtime belum ada; route dashboard belum diimplementasikan; form/berkas/nominal belum divalidasi di layanan; service berjalan di memori; data tren dan rata-rata masih mock; verifikasi surat, PDF dan QR masih stub. Tidak ada test script dalam `package.json`, sehingga hasil unit/integration test: belum diverifikasi. Responsivitas perangkat dan interaksi visual juga belum diuji.

## 10. Yang BELUM ada di kode

- **Halaman dashboard:** semua 13 page student, staff, executive masih placeholder “Halaman dalam pengerjaan”; belum ada katalog/form pengajuan, praktikum, tracking, verifikasi Tendik, CRUD, dashboard executive, atau audit log yang berfungsi di UI.
- **Login dan autentikasi:** route `/login` ada, tetapi hanya menampilkan judul “Login & SSO Fakultas”. Google OAuth, allowlist, session, redirect berdasarkan role, dan Role Switcher belum ditemukan di source.
- **Proteksi rute:** `src/proxy.ts` belum ada. `middleware.ts` juga tidak ditemukan. Jadi aturan route protection di `AGENTS.md` adalah aturan target, bukan implementasi aktif.
- **Layout dan komponen:** root layout hanya membungkus `<html lang="id"><body>`. Student layout punya sidebar statis, staff/executive layout hanya meneruskan children. Folder `components/ui`, `components/shared`, dan ketiga folder `components/modules/<role>` hanya memiliki `.gitkeep`; belum ada komponen React di sana.
- **Verifikasi QR:** route `/verify/[nomor]` hanya menampilkan nomor di heading; tidak mencari nomor surat, memeriksa keaslian, atau mengecualikan halaman publik dari login.
- **PDF dan QR asli:** generator surat mengembalikan URL mock serta QR URL biasa. Tidak ada proses render PDF, pembuatan QR, template resmi, atau tanda tangan digital.
- **Database:** seluruh state service berada di array memori proses, tanpa database atau persistence.
- **Penyimpanan berkas:** `UploadedFile` berisi metadata dan URL; implementasi upload, validasi konten file, bucket, atau penyimpanan permanen belum ada.
- **Validasi alur/form:** kode create belum memeriksa layanan yang dikenal, field wajib, dokumen wajib, atau nominal. Catatan pada `requestRevision`/`rejectSubmission` juga belum divalidasi kosong.
- **Keamanan role:** fungsi mutasi tidak memiliki sesi/aktor yang terverifikasi; batasan Tendik belum ditegakkan oleh source runtime.

## 11. Konteks rencana (BUKAN kode)

**Seluruh teks di bawah ini adalah konteks dan keputusan/rencana dari pemilik proyek. Ini bukan hasil pembacaan kode, bukan fitur yang telah diverifikasi, dan tidak boleh dianggap sudah diimplementasikan.**

Tujuan: portal privat (wajib login) untuk Fakultas Teknik dan Pertanian UNINUS. Mahasiswa mengajukan 7 layanan akademik (MBKM, KP dan Seminar KP, Penelitian TA/Skripsi, Surat Aktif Kuliah, SKL, Sidang dan Yudisium, Ijazah) serta pembayaran praktikum. Prinsip: eksekusi terpusat, monitoring terpisah. Hanya Tendik yang memutuskan (ACC, Revisi, Tolak) dan saat ACC sistem menerbitkan nomor surat dan PDF ber-QR Code. Prodi dan Fakultas read-only.

Role: student, tendik, prodi, fakultas. Redirect pasca-login: student ke /dashboard/student, tendik ke /dashboard/staff, prodi ke /dashboard/executive/prodi, fakultas ke /dashboard/executive/fakultas.

Desain: primary #00964D, accent #FBBF24, background #F8FAFC. Badge status: diproses kuning, revisi oranye, ditolak merah, selesai hijau. Empat prodi: Informatika, Industri, Elektro, Agroteknologi.

Keputusan login: Google OAuth (Gmail) dengan allowlist email terdaftar di database. Role diambil dari database, bukan pilihan pengguna. Role Tendik, Prodi, dan Fakultas direncanakan tetap wajib email kampus (@uninus.ac.id). Mahasiswa boleh Gmail. Role Switcher Demo hanya untuk pengujian dan wajib dimatikan di production. Cara menautkan Gmail ke akun mahasiswa belum diputuskan (diinput Tendik atau ditautkan sendiri dengan verifikasi).

Tim: 9 orang dalam 3 tim. Tim A platform (A1 tech lead: tipe, mock, layanan, review; A2: auth, proxy, layout, shared; A3: ui, engine dokumen, verifikasi QR). Tim B mahasiswa (B1 katalog dan form, B2 upload dan praktikum, B3 overview, tracking, revisi). Tim C tendik dan executive (C1 verifikasi, C2 praktikum dan CRUD, C3 dashboard executive dan audit log).

Jadwal 2 minggu: hari 1-2 kontrak (tipe dan lib/services terkunci), hari 3 layout dan auth ter-merge, hari 3-9 fitur paralel, hari 10 feature freeze, hari 11-12 integrasi dan uji silang, hari 13 perbaikan, hari 14 demo. Target hanya prototipe berbasis mock data. Ditunda: Google OAuth asli, database, penyimpanan berkas, template resmi dan tanda tangan digital.

Urutan pemangkasan jika tertinggal: ekspor laporan, grafik tren, CRUD pengumuman dan fakultas, halaman verifikasi QR, alur revisi. Tidak boleh dipotong: login mock dan RBAC, pengajuan mahasiswa, ACC Tendik dengan PDF dan QR, tracking dan unduh.

Keputusan struktur: rute dashboard tanpa route group (app/dashboard/...) agar URL cocok dengan proteksi rute; login di app/(auth)/login; app/page.tsx hanya redirect; komponen dibagi ui (tanpa bisnis), shared (kerangka layout), modules/<role> (fitur per role).

Celah yang sudah diketahui dan belum diputuskan: pembatasan data Kaprodi hanya untuk prodinya sendiri; alur revisi pembayaran praktikum; field form final per layanan; format penomoran surat dan mekanisme pengesahan; halaman verifikasi QR publik harus dikecualikan dari forced login.

## 12. Langkah berikutnya yang disarankan

Urutan berikut mempertahankan struktur, role, status, dan rute yang telah dikunci:

1. Tetapkan kontrak input/output dan ownership untuk service yang sudah ada; tambah validasi form/berkas serta tes untuk transisi status dan kasus error tanpa mengganti status atau signature yang telah menjadi kontrak.
2. Implementasikan komponen `ui`, `shared`, dan `modules/<role>` menurut aturan impor; mulai dari shell dashboard dan halaman placeholder dengan owner folder yang tepat.
3. Implementasikan login mock dan RBAC sesuai role, lalu `src/proxy.ts` untuk proteksi rute Next.js 16; tetap rencanakan pengecualian route verifikasi publik sebelum mengunci matcher. Google OAuth tetap keputusan/rencana terpisah.
4. Hubungkan halaman student ke layanan pengajuan dan praktikum, staff/Tendik ke keputusan serta revisi, dan executive ke tampilan read-only; pastikan Prodi dibatasi pada scope yang disepakati.
5. Putuskan serta implementasikan backend persistence dan penyimpanan berkas sebelum mengandalkan layanan di luar prototipe satu proses.
6. Ganti generator dokumen tiruan dengan format nomor yang disetujui, PDF, QR asli, dan halaman verifikasi; tambahkan pengujian end-to-end dari approval sampai validasi dokumen.
7. Lengkapi empty/loading/error state, responsivitas, dan aksesibilitas; ulangi `npx tsc --noEmit`, `npm run lint`, `npm run build`, serta tes otomatis ketika tersedia.

## 13. Cara melanjutkan dengan AI lain

Untuk memahami konteks sebelum mengubah kode, berikan AI berikut file-file ini:

- `AGENTS.md` dan `CONTRIBUTING.md` untuk batas struktur, aturan impor, dan kepemilikan folder.
- `package.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, dan `postcss.config.mjs` untuk toolchain.
- `src/types/auth.ts`, `src/types/layanan.ts`, `src/lib/mock-data.ts`, semua file `src/lib/services/*.ts`, dan `src/lib/documents/generate-letter.ts` untuk kontrak domain dan perilaku layanan.
- File `src/app/` yang bersangkutan dengan tugas, khususnya layout route; mayoritas page dashboard saat dokumen dibuat masih placeholder.
- Dokumen ini sebagai snapshot keadaan, dengan catatan bahwa keadaan repo bisa berubah setelah tanggal pembuatan.

Paragraf pembuka yang dapat disalin ke percakapan baru:

> Saya melanjutkan Portal Layanan Akademik FTP UNINUS. Baca `AGENTS.md`, `CONTRIBUTING.md`, dan `docs/PROJECT_STATE.md` terlebih dahulu. Pertahankan struktur, route, role, dan status yang dikunci. Dokumen handoff mencatat kondisi repo pada 2026-10-06; verifikasi ulang file aktual sebelum bertindak karena repo mungkin sudah berubah. Implementasi layanan masih memakai mock data dalam memori, sebagian besar halaman dashboard masih placeholder, dan autentikasi/proteksi route belum tersedia. Untuk tugas ini, ubah hanya file yang sesuai ownership dan permintaan saya; jangan commit kecuali diminta.