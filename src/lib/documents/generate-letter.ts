import type { SubmissionRecord } from "@/types/layanan";

export interface GeneratedLetter {
  nomorSurat: string;
  pdfUrl: string;
  qrUrl: string;
}

let counter = 100;

// VERSI TIRUAN. A3 akan menggantinya dengan PDF dan QR asli.
export async function generateLetter(
  submission: SubmissionRecord
): Promise<GeneratedLetter> {
  counter += 1;
  const nomorSurat = `${String(counter).padStart(3, "0")}/FTP/UNINUS/X/2026`;
  return {
    nomorSurat,
    pdfUrl: `/mock/surat-${submission.id}.pdf`,
    qrUrl: `/verify/${encodeURIComponent(nomorSurat)}`,
  };
}
