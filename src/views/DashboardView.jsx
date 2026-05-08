import { cashflowSeries, expenseBreakdown, initialKpis } from "../data/mockData";
import { cx } from "../utils/format";

const moneyFormatter = new Intl.NumberFormat("es-AR", {
  maximumFractionDigits: 0,
});

const metricCards = [
  {
    ...initialKpis[0],
    icon: IncomeIcon,
    accent: "text-positive",
  },
  {
    ...initialKpis[1],
    icon: WarningIcon,
    accent: "text-terracotta",
  },
  {
    ...initialKpis[2],
    icon: WalletIcon,
    accent: "text-brand",
  },
  {
    ...initialKpis[3],
    icon: ReceiptIcon,
    accent: "text-stone-600",
  },
];

const chartSeries = [
  ...cashflowSeries,
  { period: "Jun", income: 8900000, expense: 680000 },
];

const expenseRows = [
  { label: "Mantenimiento", percentage: 45, color: { bg: "bg-brand", text: "text-brand" } },
  { label: "Impuestos", percentage: 25, color: { bg: "bg-[#3c4c61]", text: "text-[#3c4c61]" } },
  { label: "Servicios", percentage: 20, color: { bg: "bg-positive", text: "text-positive" } },
  { label: "Honorarios", percentage: 10, color: { bg: "bg-stone-300", text: "text-stone-500" } },
];

export function DashboardView({ collections, period, onQuickAction }) {
  const periodCollections = collections.filter((item) => item.period === period);
  const pendingCollections = periodCollections.filter((item) => item.state !== "Pagado");

  return (
    <main className="text-[#191c1e]">
      <div className="space-y-6">
      <DashboardHeader />

      <TopMetricGrid />

      <section className="grid grid-cols-12 gap-5">
        <IncomeExpensePanel />
        <ExpenseDistributionPanel />
        <CollectionRatePanel collections={periodCollections} period={period} />
        <PaymentsStatusPanel collections={pendingCollections} />
      </section>

      <PendingDetailsPanel
        collections={periodCollections}
        onViewAll={() => onQuickAction("collections")}
      />

      </div>
    </main>
  );
}

function DashboardHeader() {
  return (
    <header className="mb-4 flex items-end justify-between gap-6">
      <div>
        <h1 className="text-[24px] font-bold leading-8 tracking-[-0.02em] text-brand">
          Natalia Borrego
        </h1>
        <p className="text-[14px] leading-5 text-stone-600">
          Dashboard de administración inmobiliaria
        </p>
      </div>

      <p className="pb-1 text-right text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-500">
        Resumen actualizado
      </p>
    </header>
  );
}

function TopMetricGrid() {
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
      {metricCards.map((metric) => (
        <MetricCard key={metric.title} metric={metric} />
      ))}
    </section>
  );
}

function MetricCard({ metric }) {
  return (
    <article className="flex min-h-[142px] flex-col justify-between rounded border border-[#c4c5d5] bg-white p-4">
      <div className="mb-3 flex items-start justify-between gap-4">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500">
          {metric.title}
        </span>
        <MetricIcon icon={metric.icon} className={metric.accent} />
      </div>

      <div>
        <p className="text-[24px] font-bold leading-8 tracking-[-0.02em] text-ink">
          {metric.value}
        </p>
      </div>
    </article>
  );
}

function MetricIcon({ icon: Icon, className }) {
  return (
    <span className={cx("inline-flex h-8 w-8 items-center justify-center", className)}>
      <Icon />
    </span>
  );
}

function IncomeExpensePanel() {
  const maxValue = Math.max(
    ...chartSeries.flatMap((item) => [item.income, item.expense]),
  );

  return (
    <DashboardPanel className="col-span-12 lg:col-span-8">
      <PanelTitleRow title="Ingresos vs Gastos Mensuales">
        <ChartLegend />
      </PanelTitleRow>

      <div className="relative mt-8 h-[360px] w-full">
        <HorizontalGrid />

        <div className="absolute inset-0 flex items-end justify-between px-4 pb-2">
          {chartSeries.map((item) => (
            <ChartColumn
              key={`${item.period}-income`}
              label={`${item.period} - Ingresos`}
              value={item.income}
              maxValue={maxValue}
              className="bg-brand opacity-80"
            />
          ))}
        </div>

        <div className="absolute inset-0 flex items-end justify-between px-4 pb-2">
          {chartSeries.map((item) => (
            <ChartColumn
              key={`${item.period}-expense`}
              label={`${item.period} - Gastos`}
              value={item.expense}
              maxValue={maxValue}
              className="bg-[#c4c5d5] opacity-90"
            />
          ))}
        </div>
      </div>

      <div className="mt-5 flex justify-between px-4 text-[12px] font-semibold uppercase tracking-wide text-stone-500">
        {chartSeries.map((item) => (
          <span key={item.period}>{item.period}</span>
        ))}
      </div>
    </DashboardPanel>
  );
}

function ChartLegend() {
  return (
    <div className="flex gap-4">
      <LegendItem color="bg-brand" label="Ingresos" />
      <LegendItem color="bg-stone-300" label="Gastos" />
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={cx("h-3 w-3 rounded-full", color)} />
      <span className="text-[11px] font-semibold text-stone-600">{label}</span>
    </div>
  );
}

function HorizontalGrid() {
  return (
    <div className="absolute inset-0 flex flex-col justify-between opacity-80">
      {[0, 1, 2, 3].map((line) => (
        <div key={line} className="border-b border-stone-100" />
      ))}
    </div>
  );
}

function ChartColumn({ label, value, maxValue, className }) {
  const height = Math.max((value / maxValue) * 100, 8);

  return (
    <div className="group relative flex h-full w-10 items-end">
      <div
        className={cx("w-full rounded-t transition group-hover:opacity-100", className)}
        style={{ height: `${height}%` }}
      />

      <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-48 -translate-x-1/2 rounded border border-stone-200 bg-white p-2 text-xs text-stone-600 opacity-0 shadow-xl transition group-hover:opacity-100">
        <p className="font-semibold text-brand">{label}</p>
        <p className="mt-1 font-bold text-ink">$ {moneyFormatter.format(value)}</p>
      </div>
    </div>
  );
}

function ExpenseDistributionPanel() {
  const totalExpenses = expenseBreakdown.reduce((total, item) => total + item.amount, 0);

  return (
    <DashboardPanel className="col-span-12 flex flex-col lg:col-span-4">
      <PanelTitleRow title="Distribución de Gastos" />

      <div className="mt-8 space-y-8">
        {expenseRows.map((item) => (
          <DistributionRow
            key={item.label}
            label={item.label}
            percentage={item.percentage}
            amount={(totalExpenses * item.percentage) / 100}
            color={item.color}
          />
        ))}
      </div>

      <p className="mt-auto pt-10 text-center text-[14px] italic text-stone-500">
        Total gastos operativos: $ {moneyFormatter.format(totalExpenses)}
      </p>
    </DashboardPanel>
  );
}

function DistributionRow({ label, percentage, amount, color }) {
  return (
    <div className="group relative space-y-2">
      <div className="flex items-center justify-between text-[12px] font-semibold">
        <span className="text-ink">{label}</span>
        <span className={color.text}>{percentage}%</span>
      </div>

      <div className="h-3 w-full rounded-full bg-stone-100">
        <div
          className={cx("h-3 rounded-full", color.bg)}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="pointer-events-none absolute bottom-full right-0 z-20 mb-2 w-48 rounded border border-stone-200 bg-white p-2 text-xs text-stone-600 opacity-0 shadow-xl transition group-hover:opacity-100">
        <p className="font-semibold text-brand">{label}</p>
        <p className="mt-1 font-bold text-ink">$ {moneyFormatter.format(amount)}</p>
      </div>
    </div>
  );
}

function CollectionRatePanel({ collections, period }) {
  const collectionRateRows = buildCollectionRateRows(collections);
  const averageRate = collectionRateRows.length
    ? Math.round(collectionRateRows.reduce((sum, item) => sum + item.rate, 0) / collectionRateRows.length)
    : 0;

  return (
    <DashboardPanel className="col-span-12 lg:col-span-6">
      <PanelTitleRow title={`Tasa de Cobro por Propiedad - ${period}`}>
        <span className="rounded bg-emerald-100 px-2 py-1 text-[11px] font-bold text-positive">
          Avg. {averageRate}%
        </span>
      </PanelTitleRow>

      <div className="mt-8 space-y-6">
        {collectionRateRows.map((item) => (
          <CollectionRateRow key={item.property} item={item} />
        ))}
      </div>
    </DashboardPanel>
  );
}

function CollectionRateRow({ item }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[12px] font-semibold">
        <span className="text-ink">{item.property}</span>
        <span className="text-brand">{item.rate}%</span>
      </div>
      <p className="text-[11px] text-stone-500">
        Cobrado $ {moneyFormatter.format(item.paid)} de $ {moneyFormatter.format(item.expected)} esperados
      </p>
      <div className="h-2 w-full rounded-full bg-stone-100">
        <div
          className="h-2 rounded-full bg-brand"
          style={{ width: `${item.rate}%` }}
        />
      </div>
    </div>
  );
}

function PaymentsStatusPanel({ collections }) {
  const hasAlerts = collections.some((item) => item.state !== "Pagado");

  return (
    <DashboardPanel className="col-span-12 flex flex-col lg:col-span-6">
      <PanelTitleRow title="Estado de Pagos por Inmueble">
        {hasAlerts ? <WarningBadge /> : null}
      </PanelTitleRow>

      <div className="mt-8 flex-grow overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-left">
          <thead>
            <tr className="border-b border-stone-200 text-[10px] uppercase tracking-[0.12em] text-stone-500">
              <TableHead>Propiedad</TableHead>
              <TableHead>Unidad</TableHead>
              <TableHead align="right">Monto</TableHead>
              <TableHead align="right">Estado</TableHead>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {collections.length ? (
              collections.map((item) => (
                <PaymentStatusRow key={`${item.property}-${item.tenant}`} item={item} />
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-10 text-center text-[13px] font-medium text-stone-500">
                  No se registra ningún inmueble con deuda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardPanel>
  );
}

function PaymentStatusRow({ item }) {
  const isAlert = item.state !== "Pagado";

  return (
    <tr className={cx("transition-colors hover:bg-paper", isAlert && "bg-orange-50/40")}>
      <TableCell strong>
        <span className="inline-flex items-center gap-2">
          {isAlert ? <SmallAlertIcon /> : null}
          {item.property}
        </span>
      </TableCell>
      <TableCell>{getUnitLabel(item.property)}</TableCell>
      <TableCell align="right" strong>{item.amount}</TableCell>
      <TableCell align="right" danger={isAlert}>
        {item.state}
      </TableCell>
    </tr>
  );
}

function PendingDetailsPanel({ collections, onViewAll }) {
  return (
    <section className="overflow-hidden rounded border border-stone-300 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-stone-200 p-6">
        <h2 className="text-[18px] font-semibold leading-6 tracking-[-0.01em] text-ink">
          Detalle de Pagos de Inmuebles
        </h2>

        <button
          type="button"
          onClick={onViewAll}
          className="rounded bg-brand px-4 py-2 text-[12px] font-bold text-white transition hover:bg-[#1B4852]"
        >
          Ver Todos
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead className="bg-paper">
            <tr className="text-[10px] uppercase tracking-[0.12em] text-stone-500">
              <TableHead className="px-6">Propiedad</TableHead>
              <TableHead className="px-6">Inquilino</TableHead>
              <TableHead className="px-6">Vencimiento</TableHead>
              <TableHead align="right" className="px-6">Monto</TableHead>
              <TableHead align="center" className="px-6">Estado</TableHead>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {collections.map((item) => (
              <PendingDetailRow key={`${item.property}-${item.tenant}-${item.concept}`} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function PendingDetailRow({ item }) {
  const isAlert = item.state !== "Pagado";

  return (
    <tr className={cx("transition-colors hover:bg-paper", isAlert && "bg-orange-50/40")}>
      <TableCell className="px-6" strong>
        <span className="inline-flex items-center gap-2">
          {isAlert ? <SmallAlertIcon /> : null}
          {item.property}
        </span>
      </TableCell>
      <TableCell className="px-6">{item.tenant}</TableCell>
      <TableCell className="px-6">Mayo 2026</TableCell>
      <TableCell className="px-6" align="right" strong>{item.amount}</TableCell>
      <td className="px-6 py-3 text-center">
        <span
          className={cx(
            "inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase",
            item.state === "Pagado"
              ? "bg-emerald-50 text-positive"
              : item.state === "Vencido"
              ? "bg-orange-50 text-terracotta"
              : "bg-stone-100 text-stone-600",
          )}
        >
          {item.state}
        </span>
      </td>
    </tr>
  );
}

function DashboardPanel({ children, className }) {
  return (
    <article className={cx("rounded border border-[#c4c5d5] bg-white p-8", className)}>
      {children}
    </article>
  );
}

function PanelTitleRow({ title, children }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="text-[18px] font-semibold leading-6 tracking-[-0.01em] text-ink">
        {title}
      </h2>
      {children}
    </div>
  );
}

function TableHead({ children, align = "left", className }) {
  return (
    <th className={cx("pb-2 font-semibold", getTextAlign(align), className)}>
      {children}
    </th>
  );
}

function TableCell({ children, align = "left", strong = false, danger = false, className }) {
  return (
    <td
      className={cx(
        "py-3 text-[13px] leading-[18px]",
        getTextAlign(align),
        strong ? "font-bold text-ink" : "text-stone-600",
        danger && "text-terracotta",
        className,
      )}
    >
      {children}
    </td>
  );
}

function getTextAlign(align) {
  if (align === "center") return "text-center";
  if (align === "right") return "text-right";
  return "text-left";
}

function getUnitLabel(property) {
  if (property.includes("Laprida")) return "PB A";
  if (property.includes("Colón")) return "Local 4";
  if (property.includes("Obispo")) return "4B";
  return "Unidad";
}

function buildCollectionRateRows(collections) {
  const rowsByProperty = collections.reduce((acc, item) => {
    const current = acc.get(item.property) || {
      property: item.property,
      expected: 0,
      paid: 0,
    };

    current.expected += parseMoney(item.amount);
    current.paid += parseMoney(item.paid);
    acc.set(item.property, current);

    return acc;
  }, new Map());

  return Array.from(rowsByProperty.values()).map((item) => ({
    ...item,
    rate: item.expected ? Math.round((item.paid / item.expected) * 100) : 0,
  }));
}

function parseMoney(value) {
  return Number(String(value || "0").replace(/[^0-9-]/g, "")) || 0;
}

function WarningBadge() {
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-terracotta text-terracotta">
      <WarningIcon />
    </span>
  );
}

function SmallAlertIcon() {
  return (
    <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center text-terracotta">
      <WarningIcon />
    </span>
  );
}

function IncomeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden="true">
      <path d="M4 17.5 9.4 12l3.8 3.7L20 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 8.5h5v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path d="M12 3.5 21 19H3l9-15.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M12 9v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 16.6h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden="true">
      <path d="M4 7.5h14.5A2.5 2.5 0 0 1 21 10v7a2.5 2.5 0 0 1-2.5 2.5h-12A2.5 2.5 0 0 1 4 17V7.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M4 7.5 16 4v3.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M16.5 13.5h.01" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function ReceiptIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden="true">
      <path d="M6 3.5h12v17l-2-1.2-2 1.2-2-1.2-2 1.2-2-1.2-2 1.2v-17Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9 8h6M9 12h6M9 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
