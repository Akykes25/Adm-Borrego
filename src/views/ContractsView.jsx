import { DataTable, PrimaryButton, SecondaryButton, SectionTitle, StatusPill } from "../components/ui";

const contractSteps = [
  ["1", "Propiedad", "Seleccionar inmueble y validar disponibilidad."],
  ["2", "Inquilinos", "Vincular persona, datos y documentación."],
  ["3", "Garantes", "Agregar garantías y respaldo documental."],
  ["4", "Condiciones", "Monto, ajuste, vencimiento, depósito y punitorios."],
  ["5", "Confirmación", "Revisar cobros a generar antes de activar."],
];

export function ContractsView({ contracts, onCreate, onDetail }) {
  return <div className="space-y-8"><SectionTitle eyebrow="Ciclo contractual" title="Contratos" description="Control de contratos activos, vencimientos, ajustes, garantes, documentos y cobros generados." action={<PrimaryButton onClick={() => onCreate("contracts")}>Nuevo contrato</PrimaryButton>} /><div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]"><DataTable columns={["Contrato", "Propiedad", "Inquilino", "Inicio", "Fin", "Monto", "Estado", "Acción"]} rows={contracts} renderRow={(row) => <tr key={row.id} className="hover:bg-stone-50"><td className="px-5 py-4 font-semibold text-brand">{row.id}</td><td className="px-5 py-4">{row.property}</td><td className="px-5 py-4">{row.tenant}</td><td className="px-5 py-4">{row.start}</td><td className="px-5 py-4">{row.end}</td><td className="px-5 py-4">{row.amount}</td><td className="px-5 py-4"><StatusPill value={row.state} /></td><td className="px-5 py-4"><SecondaryButton onClick={() => onDetail("Contrato", row)}>Ver ficha</SecondaryButton></td></tr>} /><div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Nuevo contrato</p><h2 className="mt-2 text-xl font-semibold text-brand">Formulario por pasos</h2><div className="mt-6 space-y-4">{contractSteps.map(([number, title, text]) => <div key={number} className="flex gap-4 rounded-xl border border-stone-200 bg-paper p-4"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">{number}</div><div><p className="font-semibold text-stone-900">{title}</p><p className="mt-1 text-sm leading-5 text-stone-600">{text}</p></div></div>)}</div></div></div></div>;
}
