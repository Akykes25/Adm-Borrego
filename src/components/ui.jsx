import { cx, getStatusClass } from "../utils/format";

export function TextMark({ children, active = false, large = false }) {
  return <span className={cx("inline-flex shrink-0 items-center justify-center rounded-lg font-bold tracking-tight", large ? "h-11 w-11 text-sm" : "h-8 w-8 text-[11px]", active ? "bg-brand text-white" : "bg-white/10 text-white")}>{children}</span>;
}

export function StatusPill({ value }) {
  return <span className={cx("inline-flex rounded-full border px-3 py-1 text-xs font-medium", getStatusClass(value))}>{value}</span>;
}

export function PrimaryButton({ children, onClick, type = "button", disabled = false }) {
  return <button type={type} onClick={onClick} disabled={disabled} className="rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1B4852] disabled:cursor-not-allowed disabled:opacity-50">{children}</button>;
}

export function SecondaryButton({ children, onClick, type = "button" }) {
  return <button type={type} onClick={onClick} className="rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm font-semibold text-brand transition hover:bg-stone-50">{children}</button>;
}

export function SectionTitle({ eyebrow, title, description, action }) {
  return <div className="flex flex-col gap-4 border-b border-stone-200 pb-6 lg:flex-row lg:items-end lg:justify-between"><div>{eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">{eyebrow}</p>}<h1 className="mt-2 text-2xl font-semibold tracking-tight text-brand sm:text-3xl">{title}</h1>{description && <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-600">{description}</p>}</div>{action}</div>;
}

export function KpiCard({ title, value, detail, status }) {
  const lineColor = status === "positive" ? "bg-positive" : status === "danger" ? "bg-terracotta" : status === "warning" ? "bg-amber-500" : "bg-brand";
  return <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"><div className={cx("h-1.5", lineColor)} /><div className="p-5"><p className="text-sm font-medium text-stone-500">{title}</p><p className="mt-3 text-2xl font-semibold text-ink">{value}</p><p className="mt-2 text-sm text-stone-500">{detail}</p></div></div>;
}

export function DataTable({ columns, rows, renderRow, emptyText = "No hay registros para mostrar." }) {
  return <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"><div className="overflow-x-auto"><table className="min-w-full text-left text-sm"><thead className="bg-paper text-xs uppercase tracking-wide text-stone-500"><tr>{columns.map((column) => <th key={column} className="whitespace-nowrap px-5 py-4 font-semibold">{column}</th>)}</tr></thead><tbody className="divide-y divide-stone-100 text-stone-700">{rows.length ? rows.map(renderRow) : <tr><td className="px-5 py-8 text-center text-stone-500" colSpan={columns.length}>{emptyText}</td></tr>}</tbody></table></div></div>;
}
