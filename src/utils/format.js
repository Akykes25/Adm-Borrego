export function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function nextId(prefix, length) {
  return `${prefix}-${String(length + 1).padStart(3, "0")}`;
}

export function getDefaultFormValues(config) {
  return Object.fromEntries(config.fields.map((field) => [field.name, field.defaultValue ?? ""]));
}

export function includesQuery(row, query) {
  if (!query.trim()) return true;
  const text = Object.values(row).flat().join(" ").toLowerCase();
  return text.includes(query.trim().toLowerCase());
}

export function getStatusClass(value) {
  const normalized = String(value || "").toLowerCase();
  if (["pagado", "vigente", "aprobada", "al día", "activo", "alquilada"].some((item) => normalized.includes(item))) return "bg-emerald-50 text-emerald-800 border-emerald-200";
  if (["vencido", "finalizado", "anulado", "inactivo"].some((item) => normalized.includes(item))) return "bg-orange-50 text-orange-800 border-orange-200";
  if (["parcial", "pendiente", "revisar", "borrador", "imputado", "descontado"].some((item) => normalized.includes(item))) return "bg-amber-50 text-amber-800 border-amber-200";
  return "bg-stone-100 text-stone-700 border-stone-200";
}
