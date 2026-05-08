import { DataTable, PrimaryButton, SecondaryButton, SectionTitle, StatusPill } from "../components/ui";

export function ContractsView({ contracts, onCreate, onDetail }) {
  return (
    <div className="space-y-8">
      <SectionTitle
        eyebrow="Ciclo contractual"
        title="Contratos"
        description="Control de contratos activos, vencimientos, ajustes, garantes, documentos y cobros generados."
        action={<PrimaryButton onClick={() => onCreate("contracts")}>Nuevo contrato</PrimaryButton>}
      />

      <DataTable
        columns={["Contrato", "Propiedad", "Inquilino", "Inicio", "Fin", "Monto", "Estado", "Acción"]}
        rows={contracts}
        renderRow={(row) => (
          <tr key={row.id} className="hover:bg-stone-50">
            <td className="px-5 py-4 font-semibold text-brand">{row.id}</td>
            <td className="px-5 py-4">{row.property}</td>
            <td className="px-5 py-4">{row.tenant}</td>
            <td className="px-5 py-4">{row.start}</td>
            <td className="px-5 py-4">{row.end}</td>
            <td className="px-5 py-4">{row.amount}</td>
            <td className="px-5 py-4"><StatusPill value={row.state} /></td>
            <td className="px-5 py-4">
              <SecondaryButton onClick={() => onDetail("Contrato", row)}>Ver ficha</SecondaryButton>
            </td>
          </tr>
        )}
      />
    </div>
  );
}
