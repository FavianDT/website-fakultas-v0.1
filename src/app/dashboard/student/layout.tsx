export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      {/* Tempatkan Sidebar Mahasiswa di sini */}
      <aside className="w-64 p-4">Sidebar Student</aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}