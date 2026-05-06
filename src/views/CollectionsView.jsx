import { PrimaryButton, SectionTitle } from "../components/ui";
import { CollectionsTable } from "./sharedTables";

export function CollectionsView({ collections, onCreate }) {
  return <div className="space-y-8"><SectionTitle eyebrow="Ingresos operativos" title="Cobros" description="Registro de alquileres, servicios, punitorios, gastos imputados y pagos parciales asociados a contratos activos." action={<PrimaryButton onClick={() => onCreate("collections")}>Registrar cobro</PrimaryButton>} /><CollectionsTable collections={collections} /></div>;
}
