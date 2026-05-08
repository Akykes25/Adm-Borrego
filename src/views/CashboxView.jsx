import { DataTable, PrimaryButton, SectionTitle, StatusPill } from "../components/ui";
import { initialKpis } from "../data/mockData";

export function CashboxView({ collections, expenses, settlements, period, onCreate }) {
  const periodCollections = collections.filter((item) => item.period === period);
  const periodSettlements = settlements.filter((item) => item.period === period);
  const movements = buildCashboxMovements(periodCollections, expenses, periodSettlements);

  return (
    <div className="space-y-8">
      <SectionTitle
        eyebrow="Caja de administraciones"
        title="Caja"
        description="Resumen operativo de ingresos, gastos y liquidaciones de las administraciones inmobiliarias. No incluye movimientos de consorcios."
        action={<PrimaryButton onClick={() => onCreate("cashbox")}>Registrar movimiento</PrimaryButton>}
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {initialKpis.map((item) => <CashboxMetric key={item.title} metric={item} />)}
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="text-lg font-semibold text-brand">Lectura de caja</h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Esta sección cruza los cobros registrados, los gastos cargados y las liquidaciones generadas para explicar el flujo de dinero de las administraciones. La información se muestra separada de consorcios para evitar mezclar expensas con caja inmobiliaria.
            </p>
          </div>
          <div className="rounded-2xl bg-paper p-4 text-sm text-stone-700">
            <p><span className="font-semibold text-stone-900">Período:</span> {period}</p>
            <p className="mt-2"><span className="font-semibold text-stone-900">Cobros:</span> {periodCollections.length}</p>
            <p className="mt-2"><span className="font-semibold text-stone-900">Gastos:</span> {expenses.length}</p>
            <p className="mt-2"><span className="font-semibold text-stone-900">Liquidaciones:</span> {periodSettlements.length}</p>
          </div>
        </div>
      </section>

      <DataTable
        columns={["Tipo", "Detalle", "Administración", "Importe", "Estado"]}
        rows={movements}
        renderRow={(row) => <CashboxRow key={`${row.type}-${row.detail}-${row.amount}`} row={row} />}
      />
    </div>
  );
}

function CashboxMetric({ metric }) {
  const toneClass = {
    positive: "text-positive",
    warning: "text-amber-600",
    danger: "text-terracotta",
    neutral: "text-brand",
  }[metric.status] || "text-brand";

  return (
    <article className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">{metric.title}</p>
      <p className={`mt-4 text-2xl font-semibold ${toneClass}`}>{metric.value}</p>
      <p className="mt-2 text-sm leading-5 text-stone-500">{metric.detail}</p>
    </article>
  );
}

function CashboxRow({ row }) {
  return (
    <tr className="hover:bg-stone-50">
      <td className="px-5 py-4 font-semibold text-brand">{row.type}</td>
      <td className="px-5 py-4">{row.detail}</td>
      <td className="px-5 py-4">{row.admin}</td>
      <td className="px-5 py-4 font-semibold">{row.amount}</td>
      <td className="px-5 py-4"><StatusPill value={row.state} /></td>
    </tr>
  );
}

function buildCashboxMovements(collections, expenses, settlements) {
  return [
    ...collections.map((item) => ({
      type: "Ingreso",
      detail: `${item.concept} - ${item.tenant}`,
      admin: item.property,
      amount: item.paid,
      state: item.state,
    })),
    ...expenses.map((item) => ({
      type: "Gasto",
      detail: `${item.category} - ${item.responsible}`,
      admin: item.property,
      amount: `-${item.amount}`,
      state: item.state,
    })),
    ...settlements.map((item) => ({
      type: "Liquidación",
      detail: `Transferencia a ${item.owner}`,
      admin: item.properties,
      amount: `-${item.net}`,
      state: item.state,
    })),
  ];
}

function parseMoney(value) {
  return Number(String(value || "0").replace(/[^0-9-]/g, "")) || 0;
}
