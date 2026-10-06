# Alur Pengguna dan Arsitektur Navigasi

Dokumen ini menjelaskan alur kerja tiap role, status pengajuan, dan peta navigasi. Diagram memakai Mermaid (tampil otomatis di GitHub dan VS Code dengan ekstensi Mermaid).

## 1. Alur login dan redirect

```mermaid
flowchart TD
    A["Buka portal"] --> B{"Sesi aktif?"}
    B -- Tidak --> C["/login"]
    C --> D["Login Google atau akun kampus"]
    D --> E{"Email terdaftar di allowlist?"}
    E -- Tidak --> F["Tampilkan: akun belum terdaftar, hubungi Tendik"]
    E -- Ya --> G{"Role dari database"}
    B -- Ya --> G
    G -- student --> H["/dashboard/student"]
    G -- tendik --> I["/dashboard/staff"]
    G -- prodi --> J["/dashboard/executive/prodi"]
    G -- fakultas --> K["/dashboard/executive/fakultas"]
```

Catatan: pada tahap prototipe, login memakai mock dengan Role Switcher Demo. Role Switcher wajib dimatikan di production.

## 2. Status pengajuan layanan

```mermaid
stateDiagram-v2
    [*] --> diproses: Mahasiswa mengajukan
    diproses --> selesai: Tendik ACC
    diproses --> revisi: Tendik minta revisi
    diproses --> ditolak: Tendik tolak
    revisi --> diproses: Mahasiswa upload ulang
    selesai --> [*]
    ditolak --> [*]
```

Aturan transisi yang ditegakkan di `src/lib/services/submissions.ts`:

| Fungsi | Status awal yang valid | Status hasil |
|---|---|---|
| `createSubmission` | (baru) | `diproses` |
| `approveSubmission` | `diproses` | `selesai` |
| `requestRevision` | `diproses` | `revisi` |
| `rejectSubmission` | `diproses` | `ditolak` |
| `resubmitRevision` | `revisi` | `diproses` |

## 3. Alur mahasiswa: dari pengajuan sampai unduh surat

```mermaid
flowchart TD
    A["/dashboard/student"] --> B["/services: katalog 7 layanan"]
    B --> C["/services/[id]: form dinamis"]
    C --> D["Data diri terisi otomatis dari sesi"]
    D --> E["Isi form dan upload berkas pdf, jpg, png maks 5MB"]
    E --> F["createSubmission: status diproses"]
    F --> G["/tracking: pantau status"]
    G --> H{"Status"}
    H -- diproses --> G
    H -- revisi --> I["Lihat catatan revisi, upload ulang berkas"]
    I --> J["resubmitRevision: kembali diproses"]
    J --> G
    H -- ditolak --> K["Lihat alasan penolakan"]
    H -- selesai --> L["Unduh Dokumen PDF Resmi"]
```

Alur pembayaran praktikum:

```mermaid
flowchart TD
    A["/praktikum"] --> B["Isi mata kuliah dan nominal"]
    B --> C["Upload bukti transfer"]
    C --> D["createPayment: status diproses"]
    D --> E["/tracking: pantau status pembayaran"]
    E --> F{"Status"}
    F -- revisi --> G["Upload ulang bukti: resubmitPayment"]
    G --> E
    F -- selesai --> H["Kepesertaan praktikum disetujui"]
    F -- ditolak --> I["Lihat alasan penolakan"]
```

## 4. Alur Tendik (satu-satunya eksekutor)

```mermaid
flowchart TD
    A["/dashboard/staff: metrik antrean"] --> B["/verifications"]
    A --> C["/praktikum"]
    A --> D["/manage"]
    B --> E["Filter prodi, layanan, status"]
    E --> F["Buka berkas di PDF Viewer"]
    F --> G{"Keputusan"}
    G -- ACC --> H["approveSubmission"]
    H --> I["generateLetter: nomor surat, PDF, QR"]
    I --> J["Status selesai, surat tersedia untuk mahasiswa"]
    G -- Minta revisi --> K["requestRevision dengan catatan wajib"]
    G -- Tolak --> L["rejectSubmission dengan alasan"]
    C --> M["Periksa bukti transfer"]
    M --> N{"Keputusan pembayaran"}
    N -- selesai --> O["verifyPayment selesai"]
    N -- revisi --> P["verifyPayment revisi dengan catatan wajib"]
    N -- ditolak --> Q["verifyPayment ditolak dengan catatan wajib"]
    D --> R["CRUD: Mahasiswa, Prodi, Fakultas, Tendik, Layanan, Pengumuman"]
```

## 5. Alur monitoring executive (read-only)

```mermaid
flowchart TD
    A["Login sebagai prodi atau fakultas"] --> B{"Role"}
    B -- prodi --> C["/executive/prodi: data prodi sendiri"]
    B -- fakultas --> D["/executive/fakultas: seluruh fakultas"]
    C --> E["Ringkasan, grafik tren, rekap"]
    D --> E
    E --> F["/executive/audit-log"]
    F --> G["Filter prodi, rentang tanggal, layanan"]
    G --> H["Preview PDF surat terbit dan nama verifikator Tendik"]
    E --> I["Ekspor rekap Excel atau PDF"]
```

Aturan: Prodi dan Fakultas tidak memiliki tombol ACC, Revisi, atau Tolak. Data Kaprodi dibatasi pada prodinya sendiri (aturan ini belum diimplementasikan, tugas A2).

## 6. Verifikasi surat lewat QR (publik, tanpa login)

```mermaid
flowchart TD
    A["Pihak luar memindai QR di surat"] --> B["/verify/[nomor]"]
    B --> C{"Nomor surat ada di data?"}
    C -- Ya --> D["Tampilkan: surat sah, jenis, tanggal terbit, penerbit"]
    C -- Tidak --> E["Tampilkan: surat tidak ditemukan"]
```

Route `/verify/*` wajib dikecualikan dari proteksi login di `src/proxy.ts`.

## 7. Matriks akses rute

| Rute | student | tendik | prodi | fakultas | Publik |
|---|---|---|---|---|---|
| `/login` | ya | ya | ya | ya | ya |
| `/verify/[nomor]` | ya | ya | ya | ya | ya |
| `/dashboard/student/*` | ya | tidak | tidak | tidak | tidak |
| `/dashboard/staff/*` | tidak | ya | tidak | tidak | tidak |
| `/dashboard/executive/prodi` | tidak | tidak | ya | tidak | tidak |
| `/dashboard/executive/fakultas` | tidak | tidak | tidak | ya | tidak |
| `/dashboard/executive` dan `/audit-log` | tidak | tidak | ya | ya | tidak |

Pengguna yang membuka rute di luar haknya dialihkan ke dashboard role masing-masing.

## 8. Navigasi sidebar per role

| Role | Menu |
|---|---|
| student | Beranda, Layanan Akademik, Pembayaran Praktikum, Status dan Riwayat |
| tendik | Beranda, Verifikasi Surat, Verifikasi Praktikum, Kelola Data |
| prodi | Ringkasan Prodi, Audit Log |
| fakultas | Ringkasan Fakultas, Audit Log |

Semua role memiliki topbar berisi logo, judul portal, tombol notifikasi, dan menu profil (Logout).

## 9. Keadaan halaman yang wajib ada

Setiap halaman yang mengambil data wajib menangani tiga keadaan:

| Keadaan | Tampilan |
|---|---|
| Memuat | Skeleton loading |
| Kosong | Komponen empty state dengan ajakan tindakan |
| Gagal | Pesan error dan tombol coba lagi |
