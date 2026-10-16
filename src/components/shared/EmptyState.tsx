export function EmptyState({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center shadow-sm">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#00964D]/10 text-xl font-bold text-[#00964D]">
        !
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
      {description ? (
        <p className="mt-2 max-w-md text-sm text-slate-600">{description}</p>
      ) : null}
    </div>
  );
}
