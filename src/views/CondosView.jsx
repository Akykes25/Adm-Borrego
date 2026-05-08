import { useState } from "react";
import { DataTable, PrimaryButton, SecondaryButton, SectionTitle, StatusPill } from "../components/ui";
import { cx } from "../utils/format";

const expenseCategories = [
  {
    number: "1",
    title: "Servicios publicos",
    rows: [
      { concept: "Empresa distribuidora de energia - Periodo Mayo 2026", groupA: "$ 532.918", plan: "$ 0", extraordinary: "$ 0", total: "$ 532.918" },
      { concept: "Municipalidad - Tasa por servicios generales", groupA: "$ 535.564", plan: "$ 0", extraordinary: "$ 0", total: "$ 535.564" },
      { concept: "Agua y saneamiento - Cuenta de servicios", groupA: "$ 885.862", plan: "$ 1.668.303", extraordinary: "$ 0", total: "$ 2.554.166" },
    ],
    total: "$ 3.622.648",
    percentage: "21,05%",
  },
  {
    number: "2",
    title: "Abono de servicios",
    rows: [
      { concept: "Mantenimiento de espacios verdes", groupA: "$ 750.000", plan: "$ 0", extraordinary: "$ 0", total: "$ 750.000" },
      { concept: "Servicio de seguridad privada", groupA: "$ 6.226.731", plan: "$ 0", extraordinary: "$ 0", total: "$ 6.226.731" },
      { concept: "Ascensores - mantenimiento mensual", groupA: "$ 165.396", plan: "$ 0", extraordinary: "$ 0", total: "$ 165.396" },
    ],
    total: "$ 7.142.127",
    percentage: "41,50%",
  },
  {
    number: "3",
    title: "Mantenimiento partes comunes",
    rows: [
      { concept: "Servicio de limpieza de espacios comunes", groupA: "$ 160.000", plan: "$ 0", extraordinary: "$ 0", total: "$ 160.000" },
      { concept: "Reparacion de bombas y tablero general", groupA: "$ 590.000", plan: "$ 0", extraordinary: "$ 0", total: "$ 590.000" },
      { concept: "Arreglo de banos y pintura sector SUM", groupA: "$ 780.000", plan: "$ 0", extraordinary: "$ 0", total: "$ 780.000" },
    ],
    total: "$ 1.530.000",
    percentage: "8,89%",
  },
  {
    number: "4",
    title: "Gastos de administracion y seguros",
    rows: [
      { concept: "Honorarios de administracion", groupA: "$ 946.000", plan: "$ 0", extraordinary: "$ 0", total: "$ 946.000" },
      { concept: "Poliza integral de consorcio", groupA: "$ 116.659", plan: "$ 0", extraordinary: "$ 0", total: "$ 116.659" },
    ],
    total: "$ 1.062.659",
    percentage: "6,17%",
  },
];

const accountSummary = [
  { label: "Saldo inicial", amount: "$ 635.242", locked: true },
  { label: "Ingresos por cobros de expensas en termino", amount: "$ 17.510.656", locked: true },
  { label: "Ingresos por cobros de expensas adeudadas", amount: "$ 7.288.411", locked: true },
  { label: "Egresos por gastos del mes", amount: "-$ 17.206.702", locked: true },
  { label: "Saldo al cierre", amount: "$ 11.234.827", locked: true },
];

const defaultExpenseColumns = [
  { key: "groupA", label: "Expensas ordinarias" },
  { key: "plan", label: "Plan de pago AySA" },
  { key: "extraordinary", label: "Expensas extraordinarias" },
];

const defaultProrationColumns = [
  { key: "previousBalance", label: "Saldo anterior", editable: true },
  { key: "payments", label: "Pagos recibidos", editable: false },
  { key: "debt", label: "Deuda", editable: true },
  { key: "interest", label: "Interes", editable: false },
  { key: "available", label: "Disponible", editable: false },
  { key: "coefficient", label: "Coeficiente", editable: true },
  { key: "expense", label: "Expensas ordinarias", editable: true },
  { key: "extraordinary", label: "Expensas extraordinarias", editable: true },
];

const paymentNotes = [
  "El pago de expensas despues del vencimiento puede generar intereses.",
  "Informar pagos no identificados a la administracion del consorcio.",
  "CBU/CVU para transferencias: 0000000000000000000000.",
  "Alias: CONSORCIO.EJEMPLO.PAGO.",
];

export function CondosView({ condos, condoUnits, onCreate }) {
  const [selectedCondoId, setSelectedCondoId] = useState(null);
  const selectedCondo = condos.find((condo) => condo.id === selectedCondoId);

  return (
    <div className="space-y-8">
      <SectionTitle
        eyebrow="Administracion de consorcios"
        title="Consorcios"
        description="Selecciona un consorcio administrado para consultar unidades, estado de cuenta y liquidacion de expensas."
        action={<PrimaryButton onClick={() => onCreate("condos")}>Nuevo consorcio</PrimaryButton>}
      />

      <ConsortiaList condos={condos} selectedCondoId={selectedCondoId} onSelect={setSelectedCondoId} />

      {selectedCondo ? (
        <CondoDetail key={selectedCondo.id} condo={selectedCondo} units={condoUnits} />
      ) : (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-8 text-center text-sm text-stone-600">
          Selecciona un consorcio para ver sus unidades y la liquidacion de expensas.
        </div>
      )}
    </div>
  );
}

function ConsortiaList({ condos, selectedCondoId, onSelect }) {
  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-brand">Consorcios administrados</h2>
      <DataTable
        columns={["ID", "Nombre", "Direccion", "CUIT", "Unidades", "Saldo", "Estado"]}
        rows={condos}
        renderRow={(row) => (
          <tr
            key={row.id}
            onClick={() => onSelect(row.id)}
            className={cx(
              "cursor-pointer transition hover:bg-stone-50",
              selectedCondoId === row.id && "bg-sand/70",
            )}
          >
            <td className="px-5 py-4 font-semibold text-brand">{row.id}</td>
            <td className="px-5 py-4 font-medium text-stone-900">{row.name}</td>
            <td className="px-5 py-4">{row.address}</td>
            <td className="px-5 py-4">{row.cuit}</td>
            <td className="px-5 py-4">{row.units}</td>
            <td className="px-5 py-4">{row.balance}</td>
            <td className="px-5 py-4"><StatusPill value={row.state} /></td>
          </tr>
        )}
      />
    </div>
  );
}

function CondoDetail({ condo, units }) {
  const [isEditing, setIsEditing] = useState(false);
  const [categories, setCategories] = useState(expenseCategories);
  const [expenseColumns, setExpenseColumns] = useState(defaultExpenseColumns);
  const [summary, setSummary] = useState(accountSummary);
  const [notes, setNotes] = useState(paymentNotes);
  const [editableUnits, setEditableUnits] = useState(() => units.map(normalizeUnit));
  const [prorationColumns, setProrationColumns] = useState(defaultProrationColumns);
  const [savedAt, setSavedAt] = useState(null);
  const liquidationId = `condo-liquidation-${condo.id}`;
  const expenseTotals = getExpenseTotals(categories, expenseColumns);
  const financialSummary = getFinancialSummary(summary, expenseTotals.grandTotal);

  function saveChanges() {
    setIsEditing(false);
    setSavedAt(new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" }));
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Consorcio seleccionado</p>
          <h2 className="mt-2 text-2xl font-semibold text-brand">{condo.name}</h2>
          <p className="mt-1 text-sm text-stone-600">{condo.address} · CUIT {condo.cuit}</p>
        </div>
      </div>

      <UnitsTable units={editableUnits} />
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
        {savedAt && <p className="text-xs font-semibold text-emerald-700 sm:mr-auto">Cambios guardados {savedAt}</p>}
        <SecondaryButton onClick={() => setIsEditing((current) => !current)}>
          {isEditing ? "Ver planilla" : "Editar planilla"}
        </SecondaryButton>
        {isEditing && <PrimaryButton onClick={saveChanges}>Guardar cambios</PrimaryButton>}
        <SecondaryButton onClick={() => printCondoLiquidation(liquidationId)}>Descargar PDF</SecondaryButton>
      </div>
      <ExpenseLiquidation
        condo={condo}
        units={editableUnits}
        categories={categories}
        expenseColumns={expenseColumns}
        summary={summary}
        financialSummary={financialSummary}
        notes={notes}
        prorationColumns={prorationColumns}
        isEditing={isEditing}
        liquidationId={liquidationId}
        onCategoriesChange={setCategories}
        onExpenseColumnsChange={setExpenseColumns}
        onSummaryChange={setSummary}
        onNotesChange={setNotes}
        onUnitsChange={setEditableUnits}
        onProrationColumnsChange={setProrationColumns}
      />
    </div>
  );
}

function UnitsTable({ units }) {
  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold text-brand">Unidades del consorcio seleccionado</h3>
      <DataTable
        columns={["Unidad", "Propietario", "Coeficiente", "Expensa", "Deuda", "Estado"]}
        rows={units}
        renderRow={(row) => (
          <tr key={row.unit} className="hover:bg-stone-50">
            <td className="px-5 py-4 font-semibold text-brand">{row.unit}</td>
            <td className="px-5 py-4">{row.owner}</td>
            <td className="px-5 py-4">{row.coefficient}</td>
            <td className="px-5 py-4">{row.expense}</td>
            <td className="px-5 py-4">{row.debt}</td>
            <td className="px-5 py-4"><StatusPill value={row.state} /></td>
          </tr>
        )}
      />
    </div>
  );
}

function ExpenseLiquidation({ condo, units, categories, expenseColumns, summary, financialSummary, notes, prorationColumns, isEditing, liquidationId, onCategoriesChange, onExpenseColumnsChange, onSummaryChange, onNotesChange, onUnitsChange, onProrationColumnsChange }) {
  return (
    <section id={liquidationId} className="overflow-hidden rounded-2xl border border-stone-300 bg-white shadow-sm">
      <LiquidationHeader condo={condo} />
      <ExpenseCategories categories={categories} columns={expenseColumns} isEditing={isEditing} onChange={onCategoriesChange} onColumnsChange={onExpenseColumnsChange} />
      <FinancialSummary summary={summary} computedSummary={financialSummary} isEditing={isEditing} onChange={onSummaryChange} />
      <ProrationTable units={units} columns={prorationColumns} isEditing={isEditing} onChange={onUnitsChange} onColumnsChange={onProrationColumnsChange} />
      <PaymentNotes notes={notes} isEditing={isEditing} onChange={onNotesChange} />
    </section>
  );
}

function LiquidationHeader({ condo }) {
  return (
    <div>
      <div className="bg-[#078f86] px-5 py-3 text-center text-sm font-bold uppercase tracking-wide text-white">
        Expensas - Liquidacion de Mayo 2026
      </div>
      <div className="liquidation-info-grid grid gap-4 border-b border-stone-300 bg-[#f3ede8] p-5 text-sm md:grid-cols-3">
        <InfoBlock title="Administracion" rows={["Nombre: Administracion Borrego", "Telefono: 351 000 0000", "Mail: administracion@ejemplo.com", "CUIT: 27-00000000-0"]} />
        <InfoBlock title="Consorcio" rows={[`Nombre: ${condo.name}`, `Direccion: ${condo.address}`, `CUIT: ${condo.cuit}`]} />
        <InfoBlock title="Expensas" rows={["Periodo: Mayo 2026", "1er Vencimiento: 10/06/2026", "2do Vencimiento: 20/06/2026"]} />
      </div>
    </div>
  );
}

function InfoBlock({ title, rows }) {
  return (
    <div>
      <p className="mb-2 text-xs font-bold uppercase text-stone-800">{title}</p>
      <div className="space-y-1 text-xs leading-5 text-stone-700">
        {rows.map((row) => <p key={row}>{row}</p>)}
      </div>
    </div>
  );
}

function ExpenseCategories({ categories, columns, isEditing, onChange, onColumnsChange }) {
  function updateCategory(categoryIndex, key, value) {
    onChange((current) => current.map((category, index) => index === categoryIndex ? { ...category, [key]: value } : category));
  }

  function updateRow(categoryIndex, rowIndex, key, value) {
    onChange((current) => current.map((category, index) => {
      if (index !== categoryIndex) return category;
      return {
        ...category,
        rows: category.rows.map((row, currentRowIndex) => currentRowIndex === rowIndex ? { ...row, [key]: value } : row),
      };
    }));
  }

  function addRow(categoryIndex) {
    onChange((current) => current.map((category, index) => index === categoryIndex ? {
      ...category,
      rows: [...category.rows, columns.reduce((row, column) => ({ ...row, [column.key]: "$ 0" }), { concept: "Nuevo concepto" })],
    } : category));
  }

  function removeRow(categoryIndex, rowIndex) {
    onChange((current) => current.map((category, index) => index === categoryIndex ? {
      ...category,
      rows: category.rows.filter((_, currentRowIndex) => currentRowIndex !== rowIndex),
    } : category));
  }

  function addCategory() {
    onChange((current) => [...current, {
      number: String(current.length + 1),
      title: "Nueva categoria",
      rows: [columns.reduce((row, column) => ({ ...row, [column.key]: "$ 0" }), { concept: "Nuevo concepto" })],
    }]);
  }

  function removeCategory(categoryIndex) {
    onChange((current) => current.filter((_, index) => index !== categoryIndex));
  }

  function addColumn() {
    const key = `custom_${Date.now()}`;
    onColumnsChange((current) => [...current, { key, label: "Nueva columna" }]);
    onChange((current) => current.map((category) => ({
      ...category,
      rows: category.rows.map((row) => ({ ...row, [key]: "$ 0" })),
    })));
  }

  function updateColumn(columnKey, label) {
    onColumnsChange((current) => current.map((column) => column.key === columnKey ? { ...column, label } : column));
  }

  function removeColumn(columnKey) {
    onColumnsChange((current) => current.filter((column) => column.key !== columnKey));
    onChange((current) => current.map((category) => ({
      ...category,
      rows: category.rows.map((row) => {
        const { [columnKey]: _removed, ...nextRow } = row;
        return nextRow;
      }),
    })));
  }

  const totals = getExpenseTotals(categories, columns);

  return (
    <div className="p-5">
      <div className="flex items-center justify-between gap-3">
        <LiquidationSectionTitle>Pagos del periodo</LiquidationSectionTitle>
        {isEditing && (
          <div className="no-print mb-3 flex flex-wrap gap-2">
            <button type="button" onClick={addColumn} className="rounded-lg border border-stone-300 px-3 py-2 text-xs font-semibold text-brand">Agregar columna</button>
            <button type="button" onClick={addCategory} className="rounded-lg border border-stone-300 px-3 py-2 text-xs font-semibold text-brand">Agregar categoria</button>
          </div>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-[900px] border-collapse text-xs">
          <thead>
            <tr className="bg-stone-100 text-stone-800">
              <th className="border border-stone-400 px-2 py-2 text-left">Rubros - concepto</th>
              {columns.map((column) => (
                <th key={column.key} className="border border-stone-400 px-2 py-2 text-right">
                  {isEditing ? (
                    <div className="flex min-w-32 gap-1">
                      <EditableCell value={column.label} onChange={(value) => updateColumn(column.key, value)} />
                      <button type="button" onClick={() => removeColumn(column.key)} className="no-print rounded bg-orange-50 px-2 py-1 text-[10px] text-terracotta">Borrar</button>
                    </div>
                  ) : column.label}
                </th>
              ))}
              <th className="border border-stone-400 px-2 py-2 text-right">Total</th>
              {isEditing && <th className="no-print border border-stone-400 px-2 py-2 text-center">Accion</th>}
            </tr>
          </thead>
          <tbody>
            {categories.map((category, categoryIndex) => (
              <ExpenseCategoryRows
                key={`${category.number}-${categoryIndex}`}
                category={category}
                categoryIndex={categoryIndex}
                columns={columns}
                grandTotal={totals.grandTotal}
                isEditing={isEditing}
                onCategoryChange={updateCategory}
                onRowChange={updateRow}
                onRowAdd={addRow}
                onRowRemove={removeRow}
                onCategoryRemove={removeCategory}
              />
            ))}
            <tr className="bg-stone-300 font-bold">
              <td className="border border-stone-400 px-2 py-2">Totales</td>
              {columns.map((column) => <td key={column.key} className="border border-stone-400 px-2 py-2 text-right">{formatCurrency(totals.byColumn[column.key] || 0)}</td>)}
              <td className="border border-stone-400 px-2 py-2 text-right">{formatCurrency(totals.grandTotal)}</td>
              {isEditing && <td className="no-print border border-stone-400 px-2 py-2" />}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ExpenseCategoryRows({ category, categoryIndex, columns, grandTotal, isEditing, onCategoryChange, onRowChange, onRowAdd, onRowRemove, onCategoryRemove }) {
  const categoryTotal = getCategoryTotal(category, columns);

  return (
    <>
      <tr className="bg-stone-200 font-bold uppercase">
        <td className="border border-stone-400 px-2 py-2" colSpan={columns.length + (isEditing ? 3 : 2)}>
          {isEditing ? (
            <div className="flex gap-2">
              <EditableCell value={category.number} onChange={(value) => onCategoryChange(categoryIndex, "number", value)} className="w-14" />
              <EditableCell value={category.title} onChange={(value) => onCategoryChange(categoryIndex, "title", value)} />
              <button type="button" onClick={() => onRowAdd(categoryIndex)} className="no-print rounded bg-white px-2 py-1 text-[10px] text-brand">Agregar fila</button>
              <button type="button" onClick={() => onCategoryRemove(categoryIndex)} className="no-print rounded bg-orange-50 px-2 py-1 text-[10px] text-terracotta">Borrar categoria</button>
            </div>
          ) : `${category.number} ${category.title}`}
        </td>
      </tr>
      {category.rows.map((row, rowIndex) => (
        <tr key={`${row.concept}-${rowIndex}`}>
          <td className="border border-stone-400 px-2 py-2 text-left">{isEditing ? <EditableCell value={row.concept} onChange={(value) => onRowChange(categoryIndex, rowIndex, "concept", value)} /> : row.concept}</td>
          {columns.map((column) => <td key={column.key} className="border border-stone-400 px-2 py-2 text-right">{isEditing ? <EditableCell value={row[column.key] || "$ 0"} onChange={(value) => onRowChange(categoryIndex, rowIndex, column.key, value)} align="right" /> : row[column.key] || "$ 0"}</td>)}
          <td className="border border-stone-400 px-2 py-2 text-right font-semibold">{formatCurrency(getRowTotal(row, columns))}</td>
          {isEditing && <td className="no-print border border-stone-400 px-2 py-2 text-center"><button type="button" onClick={() => onRowRemove(categoryIndex, rowIndex)} className="rounded bg-orange-50 px-2 py-1 text-[10px] text-terracotta">Borrar</button></td>}
        </tr>
      ))}
      <tr className="bg-stone-200 font-bold">
        <td className="border border-stone-400 px-2 py-2">Total categoria {category.number}</td>
        <td className="border border-stone-400 px-2 py-2 text-right" colSpan={columns.length}></td>
        <td className="border border-stone-400 px-2 py-2 text-right">{formatCurrency(categoryTotal)}</td>
        {isEditing && <td className="no-print border border-stone-400 px-2 py-2" />}
      </tr>
    </>
  );
}

function FinancialSummary({ summary, computedSummary, isEditing, onChange }) {
  function updateRow(rowIndex, key, value) {
    onChange((current) => current.map((row, index) => index === rowIndex ? { ...row, [key]: value } : row));
  }

  function addRow() {
    onChange((current) => [...current, { label: "Nuevo movimiento", amount: "$ 0", locked: false }]);
  }

  function removeRow(rowIndex) {
    onChange((current) => current.filter((_, index) => index !== rowIndex));
  }

  return (
    <div className="px-5 pb-5">
      <div className="flex items-center justify-between gap-3">
        <LiquidationSectionTitle>Estado financiero</LiquidationSectionTitle>
        {isEditing && <button type="button" onClick={addRow} className="no-print mb-3 rounded-lg border border-stone-300 px-3 py-2 text-xs font-semibold text-brand">Agregar fila</button>}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-[700px] border-collapse text-xs">
          <tbody>
            {computedSummary.map((row, rowIndex) => (
              <tr key={`${row.label}-${rowIndex}`} className="odd:bg-stone-50">
                <td className="border border-stone-400 px-2 py-2 font-semibold uppercase">{isEditing && !row.locked ? <EditableCell value={row.label} onChange={(next) => updateRow(rowIndex, "label", next)} /> : row.label}</td>
                <td className="border border-stone-400 px-2 py-2 text-right font-bold">
                  {isEditing && !row.locked ? <EditableCell value={row.amount} onChange={(next) => updateRow(rowIndex, "amount", next)} align="right" /> : row.amount}
                </td>
                {isEditing && <td className="no-print border border-stone-400 px-2 py-2 text-center">{!row.locked && <button type="button" onClick={() => removeRow(rowIndex)} className="rounded bg-orange-50 px-2 py-1 text-[10px] text-terracotta">Borrar</button>}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProrationTable({ units, columns, isEditing, onChange, onColumnsChange }) {
  function updateUnit(rowIndex, key, value) {
    onChange((current) => current.map((unit, index) => index === rowIndex ? { ...unit, [key]: value } : unit));
  }

  function addUnit() {
    onChange((current) => [...current, columns.reduce((unit, column) => ({ ...unit, [column.key]: column.key === "coefficient" ? "0,00 %" : "$ 0" }), { unit: "Nueva", owner: "Nuevo propietario", state: "Pendiente" })]);
  }

  function removeUnit(rowIndex) {
    onChange((current) => current.filter((_, index) => index !== rowIndex));
  }

  function addColumn() {
    const key = `custom_${Date.now()}`;
    onColumnsChange((current) => [...current, { key, label: "Nueva columna", editable: true }]);
    onChange((current) => current.map((unit) => ({ ...unit, [key]: "$ 0" })));
  }

  function updateColumn(columnKey, label) {
    onColumnsChange((current) => current.map((column) => column.key === columnKey ? { ...column, label } : column));
  }

  function removeColumn(columnKey) {
    onColumnsChange((current) => current.filter((column) => column.key !== columnKey));
    onChange((current) => current.map((unit) => {
      const { [columnKey]: _removed, ...nextUnit } = unit;
      return nextUnit;
    }));
  }

  return (
    <div className="px-5 pb-5">
      <div className="flex items-center justify-between gap-3">
        <LiquidationSectionTitle>Estado de cuentas y prorrateo de gastos</LiquidationSectionTitle>
        {isEditing && (
          <div className="no-print mb-3 flex flex-wrap gap-2">
            <button type="button" onClick={addColumn} className="rounded-lg border border-stone-300 px-3 py-2 text-xs font-semibold text-brand">Agregar columna</button>
            <button type="button" onClick={addUnit} className="rounded-lg border border-stone-300 px-3 py-2 text-xs font-semibold text-brand">Agregar unidad</button>
          </div>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-[1100px] border-collapse text-[11px]">
          <thead>
            <tr className="bg-stone-100 text-stone-800">
              <th className="border border-stone-400 px-2 py-2">UF</th>
              <th className="border border-stone-400 px-2 py-2">Depto.</th>
              <th className="border border-stone-400 px-2 py-2">Propietario</th>
              {columns.map((column) => (
                <th key={column.key} className="border border-stone-400 px-2 py-2">
                  {isEditing ? (
                    <div className="flex min-w-28 gap-1">
                      <EditableCell value={column.label} onChange={(value) => updateColumn(column.key, value)} />
                      <button type="button" onClick={() => removeColumn(column.key)} className="no-print rounded bg-orange-50 px-2 py-1 text-[10px] text-terracotta">Borrar</button>
                    </div>
                  ) : column.label}
                </th>
              ))}
              <th className="border border-stone-400 px-2 py-2">Total</th>
              {isEditing && <th className="no-print border border-stone-400 px-2 py-2">Accion</th>}
            </tr>
          </thead>
          <tbody>
            {units.map((unit, index) => (
              <tr key={unit.unit}>
                <td className="border border-stone-400 px-2 py-2 text-center">{String(index + 1).padStart(3, "0")}</td>
                <td className="border border-stone-400 px-2 py-2 text-center">{isEditing ? <EditableCell value={unit.unit} onChange={(value) => updateUnit(index, "unit", value)} /> : unit.unit}</td>
                <td className="border border-stone-400 px-2 py-2">{isEditing ? <EditableCell value={unit.owner} onChange={(value) => updateUnit(index, "owner", value)} /> : unit.owner}</td>
                {columns.map((column) => (
                  <td key={column.key} className="border border-stone-400 px-2 py-2 text-right">
                    {isEditing && column.editable ? <EditableCell value={unit[column.key] || "$ 0"} onChange={(value) => updateUnit(index, column.key, value)} align="right" /> : getUnitDisplayValue(unit, column.key)}
                  </td>
                ))}
                <td className="border border-stone-400 px-2 py-2 text-right font-bold">{formatCurrency(getUnitTotal(unit, columns))}</td>
                {isEditing && <td className="no-print border border-stone-400 px-2 py-2 text-center"><button type="button" onClick={() => removeUnit(index)} className="rounded bg-orange-50 px-2 py-1 text-[10px] text-terracotta">Borrar</button></td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EditableCell({ value, onChange, align = "left", className = "" }) {
  return (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={cx("w-full min-w-0 rounded border border-stone-300 bg-white px-2 py-1 text-xs outline-none focus:border-brand", align === "right" && "text-right", className)}
    />
  );
}

function normalizeUnit(unit) {
  return {
    ...unit,
    previousBalance: unit.debt || "$ 0",
    payments: unit.state === "Al día" ? unit.expense : "$ 0",
    interest: unit.state === "Vencido" ? "$ 12.600" : "$ 0",
    available: "$ 0",
    extraordinary: "$ 0",
  };
}

function parseCurrency(value) {
  if (typeof value !== "string") return 0;
  const normalized = value.replace(/[^\d,-]/g, "").replace(/\./g, "").replace(",", ".");
  return Number(normalized) || 0;
}

function formatCurrency(value) {
  const sign = value < 0 ? "-" : "";
  return `${sign}$ ${Math.abs(value).toLocaleString("es-AR", { maximumFractionDigits: 0 })}`;
}

function getRowTotal(row, columns) {
  return columns.reduce((total, column) => total + parseCurrency(row[column.key]), 0);
}

function getCategoryTotal(category, columns) {
  return category.rows.reduce((total, row) => total + getRowTotal(row, columns), 0);
}

function getExpenseTotals(categories, columns) {
  const byColumn = columns.reduce((totals, column) => ({ ...totals, [column.key]: 0 }), {});
  categories.forEach((category) => {
    category.rows.forEach((row) => {
      columns.forEach((column) => {
        byColumn[column.key] += parseCurrency(row[column.key]);
      });
    });
  });
  return {
    byColumn,
    grandTotal: Object.values(byColumn).reduce((total, value) => total + value, 0),
  };
}

function getFinancialSummary(summary, expenseTotal) {
  return summary.map((row) => {
    if (row.label === "Egresos por gastos del mes") return { ...row, amount: formatCurrency(-expenseTotal) };
    if (row.label === "Saldo al cierre") {
      const baseRows = summary.filter((item) => item.label !== "Saldo al cierre" && item.label !== "Egresos por gastos del mes");
      const subtotal = baseRows.reduce((total, item) => total + parseCurrency(item.amount), 0) - expenseTotal;
      return { ...row, amount: formatCurrency(subtotal) };
    }
    return row;
  });
}

function getUnitDisplayValue(unit, key) {
  if (key === "payments") return unit.state === "Al día" ? unit.expense : "$ 0";
  if (key === "interest") return unit.state === "Vencido" ? "$ 12.600" : "$ 0";
  if (key === "available") return "$ 0";
  return unit[key] || "$ 0";
}

function getUnitTotal(unit, columns) {
  return columns.reduce((total, column) => {
    if (["previousBalance", "coefficient", "payments", "available"].includes(column.key)) return total;
    return total + parseCurrency(getUnitDisplayValue(unit, column.key));
  }, 0);
}

function PaymentNotes({ notes, isEditing, onChange }) {
  function updateNote(noteIndex, value) {
    onChange((current) => current.map((note, index) => index === noteIndex ? value : note));
  }

  function addNote() {
    onChange((current) => [...current, "Nueva nota de pago."]);
  }

  function removeNote(noteIndex) {
    onChange((current) => current.filter((_, index) => index !== noteIndex));
  }

  return (
    <div className="border-t border-stone-300 bg-[#f3ede8] p-5 text-xs leading-6 text-stone-700">
      <div className="flex items-center justify-between gap-3">
        <LiquidationSectionTitle>Notas y formas de pago</LiquidationSectionTitle>
        {isEditing && <button type="button" onClick={addNote} className="no-print mb-3 rounded-lg border border-stone-300 bg-white px-3 py-2 text-xs font-semibold text-brand">Agregar nota</button>}
      </div>
      <ul className="mt-3 list-disc space-y-1 pl-5">
        {notes.map((note, noteIndex) => (
          <li key={`${note}-${noteIndex}`}>
            <div className="flex gap-2">
              {isEditing ? <EditableCell value={note} onChange={(value) => updateNote(noteIndex, value)} /> : note}
              {isEditing && <button type="button" onClick={() => removeNote(noteIndex)} className="no-print rounded bg-orange-50 px-2 py-1 text-[10px] text-terracotta">Borrar</button>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LiquidationSectionTitle({ children }) {
  return (
    <div className="mb-3 bg-[#078f86] px-4 py-2 text-center text-xs font-bold uppercase tracking-wide text-white">
      {children}
    </div>
  );
}

function printCondoLiquidation(liquidationId) {
  const liquidation = document.getElementById(liquidationId);
  if (!liquidation) return;

  document.body.classList.add("is-printing-liquidation");
  liquidation.classList.add("print-target");
  window.print();
  window.setTimeout(() => {
    document.body.classList.remove("is-printing-liquidation");
    liquidation.classList.remove("print-target");
  }, 250);
}
