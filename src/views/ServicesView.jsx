import { useState } from "react";
import { serviceLinks } from "../data/mockData";
import { PrimaryButton, SectionTitle, StatusPill } from "../components/ui";
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
        description="Seleccioná un inquilino para ver qué servicios paga, monto estimado, vencimiento, estado y comprobantes asociados."
        action={<PrimaryButton onClick={() => onCreate("services")}>Nuevo servicio</PrimaryButton>}
      />

      <TenantServiceGrid
        tenants={tenantsWithServices}
        selectedTenant={selectedTenant}
        onSelectTenant={setSelectedTenantName}
      />

      <SelectedTenantServices tenant={selectedTenant} />
    </div>
  );
}

function TenantServiceGrid({ tenants, selectedTenant, onSelectTenant }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {tenants.map((tenant) => (
        <TenantServiceCard
          key={tenant.name}
          tenant={tenant}
          isSelected={selectedTenant?.name === tenant.name}
          onSelect={() => onSelectTenant(tenant.name)}
        />
      ))}
    </div>
  );
}

function TenantServiceCard({ tenant, isSelected, onSelect }) {
  const nextDue = tenant.services[0]?.due || "Sin vencimientos";

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cx(
        "rounded-2xl border bg-white p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-brand hover:shadow-md focus:outline-none focus:ring-4 focus:ring-brand/10",
        isSelected ? "border-brand ring-4 ring-brand/10" : "border-stone-200",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
            Perfil del inquilino
          </p>
          <h2 className="mt-2 text-xl font-semibold text-brand">{tenant.name}</h2>
          <p className="mt-1 text-sm text-stone-500">{tenant.link}</p>
        </div>
        <StatusPill value={tenant.status} />
      </div>

      <div className="mt-5 grid gap-3 text-sm text-stone-700 sm:grid-cols-2">
        <p>
          <span className="font-semibold text-stone-900">Servicios:</span> {tenant.services.length}
        </p>
        <p>
          <span className="font-semibold text-stone-900">Próximo venc.:</span> {nextDue}
        </p>
      </div>

      <p className="mt-5 text-sm font-semibold text-brand">Ver servicios</p>
    </button>
  );
}

function SelectedTenantServices({ tenant }) {
  if (!tenant) {
    return (
      <div className="rounded-2xl border border-dashed border-stone-300 bg-paper p-6 text-sm text-stone-600">
        Seleccioná una tarjeta de inquilino para ver sus servicios.
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

      <div className="mt-5 grid min-w-0 gap-4 xl:grid-cols-2">
        {tenant.services.length ? (
          tenant.services.map((item) => (
            <ServiceCard key={item.id || `${item.service}-${item.account}`} item={item} />
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-stone-300 bg-paper p-4 text-sm text-stone-600">
            Sin servicios cargados para este inquilino.
          </div>
        )}
      </div>
    </div>
  );
}

function ServiceCard({ item }) {
  const serviceLink = item.paymentLink || serviceLinks[item.service];

  return (
    <div className="min-w-0 rounded-2xl border border-stone-200 bg-paper p-4">
      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-lg font-semibold text-brand">{item.service}</p>
          <p className="mt-1 text-sm text-stone-600">Cuenta {item.account}</p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {serviceLink ? (
            <a
              href={serviceLink}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-stone-300 bg-white px-3 py-1 text-xs font-semibold text-brand transition hover:border-brand hover:bg-stone-50"
            >
              Abrir portal
            </a>
          ) : null}
          <StatusPill value={item.state} />
        </div>
      </div>

      <div className="mt-4 grid min-w-0 gap-3 text-sm text-stone-700 sm:grid-cols-2">
        <p><span className="font-semibold text-stone-900">Monto:</span> {item.amount}</p>
        <p><span className="font-semibold text-stone-900">Vencimiento:</span> {item.due}</p>
        <p><span className="font-semibold text-stone-900">Responsable:</span> {item.responsible}</p>
        <p><span className="font-semibold text-stone-900">Propiedad:</span> {item.property}</p>
      </div>

      <ServiceChecklist item={item} />
    </div>
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
    <div className="mt-5 min-w-0 rounded-xl border border-stone-200 bg-white p-4">
      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-semibold text-brand">Comprobantes</p>
        <input
          type="file"
          accept="image/*,.pdf"
          className="w-full min-w-0 text-xs text-stone-600 file:mr-3 file:rounded-lg file:border-0 file:bg-brand file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white sm:w-auto"
        />
      </div>

      <div className="mt-4 grid min-w-0 gap-2 sm:grid-cols-3">
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
