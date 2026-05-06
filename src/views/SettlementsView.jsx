import { DataTable, PrimaryButton, SectionTitle, StatusPill } from "../components/ui";

const columns = ["Propietario", "Período", "Propiedades", "Bruto", "Descuentos", "Neto", "Estado"];

export function SettlementsView({ settlements, onCreate }) {
  return (
    <div className="space-y-8">
      <SectionTitle
        eyebrow="Cierre mensual"
        title="Liquidaciones"
        description="Liquidaciones mensuales para propietarios con ingresos, descuentos, comisión administrativa, ajustes y saldo neto a transferir."
        action={<PrimaryButton onClick={() => onCreate("settlements")}>Generar liquidación</PrimaryButton>}
      />
      <DataTable columns={columns} rows={settlements} renderRow={(row) => <SettlementRow row={row} />} />
    </div>
  );
}

function SettlementRow({ row }) {
  return (
    <tr key={row.id || `${row.owner}-${row.period}`} className="hover:bg-stone-50">
      <td className="px-5 py-4 font-medium text-stone-900">{row.owner}</td>
      <td className="px-5 py-4">{row.period}</td>
      <td className="px-5 py-4">{row.properties}</td>
      <td className="px-5 py-4">{row.gross}</td>
      <td className="px-5 py-4">{row.discounts}</td>
      <td className="px-5 py-4 font-semibold text-brand">{row.net}</td>
      <td className="px-5 py-4"><StatusPill value={row.state} /></td>
    </tr>
  );
}
