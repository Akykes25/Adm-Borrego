import { useState } from "react";
import { serviceLinks } from "../data/mockData";
import { DataTable, PrimaryButton, SectionTitle, StatusPill } from "../components/ui";
import { cx } from "../utils/format";

const defaultChecklist = ["Factura recibida", "Comprobante subido", "Verificado por administración"];

export function ServicesView({ services, tenants, onCreate }) {
  const tenantsWithServices = tenants.map((tenant) => ({
    ...tenant,
    services: services.filter((service) => service.tenant === tenant.name),
  }));
  const [selectedTenantName, setSelectedTenantName] = useState(null);
  const selectedTenant = tenantsWithServices.find((tenant) => tenant.name === selectedTenantName);

  return (
    <div className="space-y-8">
      <SectionTitle
        eyebrow="Servicios por inquilino"
        title="Servicios"
        description="Seleccioná un inquilino para ver las cuentas de servicios asociadas, responsables, portales externos y comprobantes."
        action={<PrimaryButton onClick={() => onCreate("services")}>Nuevo servicio</PrimaryButton>}
      />

      <TenantServiceList
        tenants={tenantsWithServices}
        selectedTenant={selectedTenant}
        onSelectTenant={setSelectedTenantName}
      />

      <SelectedTenantServices tenant={selectedTenant} />
    </div>
  );
}

function TenantServiceList({ tenants, selectedTenant, onSelectTenant }) {
  return (
    <DataTable
      columns={["Inquilino", "Propiedad", "Servicios", "Estado", "Acción"]}
      rows={tenants}
      renderRow={(tenant) => (
        <TenantServiceRow
          key={tenant.name}
          tenant={tenant}
          isSelected={selectedTenant?.name === tenant.name}
          onSelect={() => onSelectTenant(tenant.name)}
        />
      )}
    />
  );
}

function TenantServiceRow({ tenant, isSelected, onSelect }) {
  return (
    <tr
      className={cx(
        "cursor-pointer transition hover:bg-stone-50",
        isSelected && "bg-sand/70",
      )}
      onClick={onSelect}
    >
      <td className="px-5 py-4 font-semibold text-brand">{tenant.name}</td>
      <td className="px-5 py-4">{tenant.link}</td>
      <td className="px-5 py-4">{tenant.services.length}</td>
      <td className="px-5 py-4"><StatusPill value={tenant.status} /></td>
      <td className="px-5 py-4 text-sm font-semibold text-brand">Ver servicios</td>
    </tr>
  );
}

function SelectedTenantServices({ tenant }) {
  if (!tenant) {
    return (
      <div className="rounded-2xl border border-dashed border-stone-300 bg-paper p-6 text-sm text-stone-600">
        Seleccioná un inquilino de la lista para ver sus servicios.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-3 border-b border-stone-100 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
            Servicios seleccionados
          </p>
          <h2 className="mt-2 text-xl font-semibold text-brand">{tenant.name}</h2>
          <p className="mt-1 text-sm text-stone-500">{tenant.link}</p>
        </div>
        <StatusPill value={`${tenant.services.length} servicios`} />
      </div>

      <div className="mt-5 overflow-x-auto">
        {tenant.services.length ? (
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-paper text-xs uppercase tracking-wide text-stone-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Servicio</th>
                <th className="px-4 py-3 font-semibold">Cuenta</th>
                <th className="px-4 py-3 font-semibold">Responsable</th>
                <th className="px-4 py-3 font-semibold">Propiedad</th>
                <th className="px-4 py-3 font-semibold">Estado</th>
                <th className="px-4 py-3 font-semibold">Portal</th>
                <th className="px-4 py-3 font-semibold">Comprobantes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {tenant.services.map((item) => <ServiceRow key={item.id || `${item.service}-${item.account}`} item={item} />)}
            </tbody>
          </table>
        ) : (
          <div className="rounded-2xl border border-dashed border-stone-300 bg-paper p-4 text-sm text-stone-600">
            Sin servicios cargados para este inquilino.
          </div>
        )}
      </div>
    </div>
  );
}

function ServiceRow({ item }) {
  const serviceLink = item.paymentLink || serviceLinks[item.service];

  return (
    <tr className="hover:bg-stone-50">
      <td className="px-4 py-4 font-semibold text-brand">{item.service}</td>
      <td className="px-4 py-4">{item.account}</td>
      <td className="px-4 py-4">{item.responsible}</td>
      <td className="px-4 py-4">{item.property}</td>
      <td className="px-4 py-4"><StatusPill value={item.state} /></td>
      <td className="px-4 py-4">
        {serviceLink ? <a href={serviceLink} target="_blank" rel="noreferrer" className="font-semibold text-brand underline-offset-4 hover:underline">Abrir portal</a> : "Sin portal"}
      </td>
      <td className="px-4 py-4"><ServiceChecklist item={item} /></td>
    </tr>
  );
}

function ServiceChecklist({ item }) {
  const [checked, setChecked] = useState(() =>
    (item.checklist || []).map((_, index) => item.state === "Pagado" && index < 2),
  );

  function toggleTask(taskIndex, value) {
    setChecked((current) => current.map((item, index) => (index === taskIndex ? value : item)));
  }

  return (
    <div className="min-w-[240px] rounded-xl border border-stone-200 bg-white p-3">
      <div className="flex min-w-0 flex-col gap-3">
        <input
          type="file"
          accept="image/*,.pdf"
          className="w-full min-w-0 text-xs text-stone-600 file:mr-3 file:rounded-lg file:border-0 file:bg-brand file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white"
        />
      </div>

      <div className="mt-3 grid min-w-0 gap-2">
        {(item.checklist || defaultChecklist).map((task, taskIndex) => (
          <label
            key={`${task}-${taskIndex}`}
            className="flex min-w-0 items-center gap-2 rounded-lg border border-stone-100 bg-paper px-3 py-2 text-xs text-stone-700"
          >
            <input
              type="checkbox"
              checked={Boolean(checked[taskIndex])}
              onChange={(event) => toggleTask(taskIndex, event.target.checked)}
            />
            <span className="min-w-0">{task}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
