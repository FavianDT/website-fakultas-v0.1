export default async function VerifyPage({
  params,
}: {
  params: Promise<{ nomor: string }>;
}) {
  const { nomor } = await params;

  return (
    <div>
      <h1>Verifikasi Dokumen: {nomor}</h1>
    </div>
  );
}