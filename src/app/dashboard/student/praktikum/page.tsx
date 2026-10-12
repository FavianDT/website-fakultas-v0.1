// Halaman Pembayaran Praktikum (mode tampilan, Tim B / B2).
// Tanpa "use client", state, fetch, atau akses lib/services.
// Ganti kotak penanda dengan komponen asli setelah ter-merge:
//   - PageHeader (A2, @/components/shared/PageHeader)
//   - Komponen form praktikum (A1, nama dan path menyusul lewat issue minta-komponen)

const LANGKAH = [
  "Transfer biaya praktikum sesuai nominal yang berlaku untuk mata kuliah Anda.",
  "Simpan bukti transfer dalam bentuk PDF, JPG, atau PNG dengan ukuran maksimal 5 MB. Pastikan tulisannya terbaca jelas.",
  "Isi mata kuliah dan nominal, unggah bukti transfer, lalu kirim.",
  "Pantau statusnya di menu Status dan Riwayat. Jika diminta revisi, unggah ulang bukti transfer yang benar.",
];

export default function PraktikumPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4 sm:p-6">
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-500">
        [Komponen PageHeader akan di sini: judul &quot;Pembayaran Praktikum&quot;]
      </div>

      <section
        aria-labelledby="petunjuk-title"
        className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 sm:p-6"
      >
        <h2
          id="petunjuk-title"
          className="text-base font-semibold text-slate-900"
        >
          Petunjuk pembayaran
        </h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
          {LANGKAH.map((langkah) => (
            <li key={langkah}>{langkah}</li>
          ))}
        </ol>
      </section>

      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500">
        [Komponen FormPraktikum akan di sini]
      </div>
    </div>
  );
}