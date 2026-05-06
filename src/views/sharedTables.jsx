import { DataTable, StatusPill } from "../components/ui";

const collectionColumns = ["Período", "Inquilino", "Propiedad", "Concepto", "Importe", "Pagado", "Estado"];

export function CollectionsTable({ collections }) {
  return <DataTable columns={collectionColumns} rows={collections} renderRow={(row) => <CollectionRow row={row} />} />;
}

function CollectionRow({ row }) {
  return (
    <tr key={row.id || `${row.tenant}-${row.concept}-${row.period}`} className="hover:bg-stone-50">
      <td className="px-5 py-4 font-medium text-stone-900">{row.period}</td>
      <td className="px-5 py-4">{row.tenant}</td>
      <td className="px-5 py-4">{row.property}</td>
      <td className="px-5 py-4">{row.concept}</td>
      <td className="px-5 py-4">{row.amount}</td>
      <td className="px-5 py-4">{row.paid}</td>
      <td className="px-5 py-4"><StatusPill value={row.state} /></td>
    </tr>
  );
}
