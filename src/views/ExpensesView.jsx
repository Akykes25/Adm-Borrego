import { DataTable, PrimaryButton, SectionTitle, StatusPill } from "../components/ui";

const columns = ["Fecha", "Categoría", "Propiedad", "Responsable", "Importe", "Estado"];

export function ExpensesView({ expenses, onCreate }) {
  return (
    <div className="space-y-8">
      <SectionTitle
        eyebrow="Egresos y cargos imputables"
        title="Gastos"
        description="Separación entre gastos internos, gastos de propiedad, gastos cobrables al inquilino y gastos descontables al propietario."
        action={<PrimaryButton onClick={() => onCreate("expenses")}>Nuevo gasto</PrimaryButton>}
      />
      <DataTable columns={columns} rows={expenses} renderRow={(row) => <ExpenseRow row={row} />} />
    </div>
  );
}

function ExpenseRow({ row }) {
  return (
    <tr key={row.id || `${row.date}-${row.category}-${row.property}`} className="hover:bg-stone-50">
      <td className="px-5 py-4 font-medium text-stone-900">{row.date}</td>
      <td className="px-5 py-4">{row.category}</td>
      <td className="px-5 py-4">{row.property}</td>
      <td className="px-5 py-4">{row.responsible}</td>
      <td className="px-5 py-4">{row.amount}</td>
      <td className="px-5 py-4"><StatusPill value={row.state} /></td>
    </tr>
  );
}
