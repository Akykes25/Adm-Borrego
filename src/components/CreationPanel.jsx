import { useState } from "react";
import { cx } from "../utils/format";
import { PrimaryButton, SecondaryButton } from "./ui";

export function CreationPanel({ isOpen, config, values, onChange, onClose, onSubmit }) {
  if (!isOpen || !config) return null;

  if (config.variant === "contractWizard") {
    return (
      <ContractWizard
        config={config}
        values={values}
        onChange={onChange}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-brand/30 backdrop-blur-sm">
      <button
        aria-label="Cerrar panel"
        className="hidden flex-1 cursor-default md:block"
        onClick={onClose}
      />

      <aside className="flex h-full w-full max-w-xl flex-col bg-paper shadow-2xl">
        <PanelHeader config={config} onClose={onClose} />

        <form onSubmit={onSubmit} className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 space-y-5 overflow-y-auto px-5 py-6 sm:px-6">
            {config.fields.map((field) => (
              <FormField
                key={field.name}
                field={field}
                value={values[field.name]}
                values={values}
                onChange={onChange}
              />
            ))}
            <FormPreview fields={config.fields} values={values} />
          </div>

          <PanelFooter config={config} onClose={onClose} />
        </form>
      </aside>
    </div>
  );
}

function ContractWizard({ config, values, onChange, onClose, onSubmit }) {
  const [currentStep, setCurrentStep] = useState(0);
  const step = config.steps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === config.steps.length - 1;

  function goBack() {
    setCurrentStep((current) => Math.max(current - 1, 0));
  }

  function goNext() {
    setCurrentStep((current) => Math.min(current + 1, config.steps.length - 1));
  }

  function handleWizardSubmit(event) {
    event.preventDefault();

    if (!isLastStep) {
      goNext();
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand/35 p-2 backdrop-blur-sm sm:p-4">
      <button aria-label="Cerrar formulario" className="absolute inset-0 cursor-default" onClick={onClose} />

      <form
        onSubmit={handleWizardSubmit}
        className="relative flex h-[calc(100dvh-1rem)] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-stone-200 bg-paper shadow-2xl sm:h-[92dvh] sm:rounded-3xl"
      >
        <div className="shrink-0 border-b border-stone-200 bg-white px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                Carga de contrato
              </p>
              <h2 className="mt-2 text-xl font-semibold text-brand sm:text-2xl">{config.title}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">{config.subtitle}</p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm font-semibold text-stone-600 hover:bg-stone-50"
            >
              Cerrar
            </button>
          </div>

          <WizardProgress steps={config.steps} currentStep={currentStep} />
        </div>

        <div className="min-h-0 flex-1 overflow-hidden">
          <div className="h-full min-h-0 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
            <div className="mb-6 rounded-2xl border border-stone-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                Paso {currentStep + 1} de {config.steps.length}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-brand">{step.title}</h3>
              <p className="mt-1 text-sm text-stone-600">{step.description}</p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {step.fields.map((field) => (
                <FormField
                  key={field.name}
                  field={field}
                  value={values[field.name]}
                  values={values}
                  onChange={onChange}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="shrink-0 border-t border-stone-200 bg-white px-4 py-4 sm:px-6">
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-5 text-stone-500">
              Los archivos se guardan como referencia temporal en este prototipo.
            </p>
            <div className="flex flex-wrap gap-3 sm:flex-nowrap">
              <SecondaryButton onClick={isFirstStep ? onClose : goBack}>
                {isFirstStep ? "Cancelar" : "Anterior"}
              </SecondaryButton>
              {isLastStep ? (
                <PrimaryButton onClick={onSubmit}>{config.submitLabel}</PrimaryButton>
              ) : (
                <PrimaryButton onClick={goNext}>Siguiente</PrimaryButton>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function WizardProgress({ steps, currentStep }) {
  return (
    <div className="mt-5 grid gap-2" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
      {steps.map((step, index) => (
        <div
          key={step.title}
          className={cx(
            "h-2 rounded-full",
            index <= currentStep ? "bg-brand" : "bg-stone-200",
          )}
        />
      ))}
    </div>
  );
}

function PanelHeader({ config, onClose }) {
  return (
    <div className="border-b border-stone-200 bg-white px-5 py-5 sm:px-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
            Carga temporal
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-brand">{config.title}</h2>
          <p className="mt-2 text-sm leading-6 text-stone-600">{config.subtitle}</p>
        </div>

        <button
          onClick={onClose}
          className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm font-semibold text-stone-600 hover:bg-stone-50"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

function FormField({ field, value, values, onChange }) {
  const common = "mt-2 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10";

  if (field.showIf && values[field.showIf.name] !== field.showIf.value) return null;

  if (field.type === "propertyPicker") {
    return <PropertyPickerField field={field} value={value} onChange={onChange} />;
  }

  if (field.type === "serviceExpenses") {
    return <ServiceExpensesField field={field} value={value} onChange={onChange} />;
  }

  return (
    <label className={cx("block", field.type === "file" && "md:col-span-2")}>
      <span className="text-sm font-semibold text-stone-700">{field.label}</span>

      {field.type === "select" && (
        <select
          value={value || ""}
          onChange={(event) => onChange(field.name, event.target.value)}
          className={common}
        >
          {(field.options || []).map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      )}

      {field.type === "multiSelect" && (
        <MultiSelectField field={field} value={value} onChange={onChange} />
      )}

      {field.type === "textarea" && (
        <textarea
          value={value || ""}
          onChange={(event) => onChange(field.name, event.target.value)}
          rows={4}
          className={common}
        />
      )}

      {field.type === "file" && (
        <FileField field={field} value={value} onChange={onChange} />
      )}

      {field.type === "switch" && (
        <SwitchField field={field} value={value} onChange={onChange} />
      )}

      {field.type === "percentage" && (
        <PercentageField field={field} value={value} onChange={onChange} />
      )}

      {field.type === "password" && (
        <input
          type="password"
          value={value || ""}
          onChange={(event) => onChange(field.name, event.target.value)}
          className={common}
        />
      )}

      {!field.type && (
        <input
          value={value || ""}
          onChange={(event) => onChange(field.name, event.target.value)}
          className={common}
        />
      )}
    </label>
  );
}

function PropertyPickerField({ field, value, onChange }) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const selectedProperty = (field.options || []).find((property) => property.address === value);

  return (
    <div className="md:col-span-2">
      <span className="text-sm font-semibold text-stone-700">{field.label}</span>
      <div className="mt-2 rounded-2xl border border-stone-200 bg-white p-4">
        <p className="text-sm font-semibold text-brand">{value || "Sin propiedad seleccionada"}</p>
        {selectedProperty && (
          <p className="mt-1 text-xs text-stone-500">
            {selectedProperty.type} · {selectedProperty.zone} · {selectedProperty.owner}
          </p>
        )}
        <SecondaryButton onClick={() => setIsPickerOpen(true)}>Seleccionar propiedad</SecondaryButton>
      </div>

      {isPickerOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-brand/35 p-4 backdrop-blur-sm">
          <div className="w-full max-w-3xl rounded-3xl border border-stone-200 bg-paper p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Propiedades cargadas</p>
                <h3 className="mt-2 text-2xl font-semibold text-brand">Seleccionar propiedad</h3>
              </div>
              <button type="button" onClick={() => setIsPickerOpen(false)} className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm font-semibold text-stone-600">Cerrar</button>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {(field.options || []).map((property) => (
                <button
                  type="button"
                  key={property.id || property.address}
                  onClick={() => {
                    onChange(field.name, property.address);
                    setIsPickerOpen(false);
                  }}
                  className="rounded-2xl border border-stone-200 bg-white p-4 text-left shadow-sm transition hover:border-brand hover:bg-stone-50"
                >
                  <p className="font-semibold text-brand">{property.address}</p>
                  <p className="mt-1 text-sm text-stone-600">{property.type} · {property.zone}</p>
                  <p className="mt-2 text-xs text-stone-500">Propietario: {property.owner}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ServiceExpensesField({ field, value, onChange }) {
  const selected = value && !Array.isArray(value) ? value : {};
  const services = ["Agua", "Gas", "Luz", "Municipalidad", "Rentas", "Expensas", "Otros Gastos"];

  function toggleService(service, checked) {
    const next = { ...selected };
    if (checked) next[service] = next[service] || {};
    else delete next[service];
    onChange(field.name, next);
  }

  function updateService(service, key, inputValue) {
    onChange(field.name, {
      ...selected,
      [service]: { ...(selected[service] || {}), [key]: inputValue },
    });
  }

  return (
    <div className="md:col-span-2">
      <span className="text-sm font-semibold text-stone-700">{field.label}</span>
      <div className="mt-2 space-y-3 rounded-2xl border border-stone-200 bg-white p-4">
        {services.map((service) => {
          const checked = Boolean(selected[service]);
          return (
            <div key={service} className="rounded-xl border border-stone-100 bg-paper p-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-stone-700">
                <input type="checkbox" checked={checked} onChange={(event) => toggleService(service, event.target.checked)} />
                {service}
              </label>

              {checked && <ServiceExtraFields service={service} values={selected[service] || {}} onChange={updateService} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ServiceExtraFields({ service, values, onChange }) {
  const common = "mt-2 w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand";

  if (["Agua", "Gas", "Luz", "Municipalidad", "Rentas"].includes(service)) {
    return <input value={values.account || ""} onChange={(event) => onChange(service, "account", event.target.value)} className={common} placeholder="Número de cuenta" />;
  }

  if (service === "Expensas") {
    return (
      <div className="grid gap-3 md:grid-cols-3">
        <input value={values.user || ""} onChange={(event) => onChange(service, "user", event.target.value)} className={common} placeholder="Usuario" />
        <input value={values.password || ""} onChange={(event) => onChange(service, "password", event.target.value)} className={common} placeholder="Contraseña" />
        <input value={values.link || ""} onChange={(event) => onChange(service, "link", event.target.value)} className={common} placeholder="Link de expensas" />
      </div>
    );
  }

  return (
    <div className="grid gap-3 md:grid-cols-2">
      <input value={values.amount || ""} onChange={(event) => onChange(service, "amount", event.target.value)} className={common} placeholder="Monto del gasto" />
      <input value={values.link || ""} onChange={(event) => onChange(service, "link", event.target.value)} className={common} placeholder="Link si fuera necesario" />
    </div>
  );
}

function SwitchField({ field, value, onChange }) {
  const checked = Boolean(value);
  return (
    <button
      type="button"
      onClick={() => onChange(field.name, !checked)}
      className={cx("mt-2 flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-semibold", checked ? "border-brand bg-brand text-white" : "border-stone-200 bg-white text-stone-700")}
    >
      <span>{checked ? "Activado" : "Desactivado"}</span>
      <span className={cx("h-6 w-11 rounded-full p-1 transition", checked ? "bg-white/30" : "bg-stone-200")}>
        <span className={cx("block h-4 w-4 rounded-full bg-white transition", checked && "translate-x-5")} />
      </span>
    </button>
  );
}

function PercentageField({ field, value, onChange }) {
  return (
    <div className="mt-2 flex rounded-xl border border-stone-200 bg-white focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/10">
      <input value={value || ""} onChange={(event) => onChange(field.name, event.target.value)} className="min-w-0 flex-1 rounded-l-xl px-4 py-3 text-sm outline-none" />
      <span className="flex items-center rounded-r-xl border-l border-stone-200 px-4 text-sm font-semibold text-brand">%</span>
    </div>
  );
}

function FileField({ field, value, onChange }) {
  const fileNames = Array.isArray(value) ? value : [];

  return (
    <div className="mt-2 rounded-xl border border-stone-200 bg-white p-3">
      <input
        type="file"
        accept={field.accept}
        multiple={field.multiple}
        onChange={(event) => onChange(field.name, Array.from(event.target.files || []).map((file) => file.name))}
        className="w-full text-sm text-stone-600 file:mr-3 file:rounded-lg file:border-0 file:bg-brand file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white"
      />
      <p className="mt-2 text-xs leading-5 text-stone-500">
        {fileNames.length ? fileNames.join(", ") : "Acepta los formatos indicados. En este prototipo se guardan los nombres de archivo."}
      </p>
    </div>
  );
}

function MultiSelectField({ field, value, onChange }) {
  const selectedValues = Array.isArray(value) ? value : [];

  function toggleOption(option, checked) {
    onChange(
      field.name,
      checked
        ? [...selectedValues, option]
        : selectedValues.filter((item) => item !== option),
    );
  }

  return (
    <div className="mt-2 rounded-xl border border-stone-200 bg-white p-3">
      <div className="grid gap-2 sm:grid-cols-2">
        {(field.options || []).map((option) => (
          <label key={option} className="flex items-center gap-2 rounded-lg border border-stone-100 bg-paper px-3 py-2 text-sm text-stone-700">
            <input type="checkbox" checked={selectedValues.includes(option)} onChange={(event) => toggleOption(option, event.target.checked)} />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function FormPreview({ fields, values }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Vista previa</p>
      <div className="mt-4 space-y-2 text-sm text-stone-700">
        {fields.slice(0, 5).map((field) => (
          <p key={field.name}>
            <span className="font-semibold text-brand">{field.label}:</span> {formatPreviewValue(values[field.name])}
          </p>
        ))}
      </div>
    </div>
  );
}

function formatPreviewValue(value) {
  if (Array.isArray(value)) return value.length ? value.join(", ") : "Sin seleccionar";
  if (value && typeof value === "object") return Object.keys(value).length ? Object.keys(value).join(", ") : "Sin seleccionar";
  if (typeof value === "boolean") return value ? "Sí" : "No";
  return value || "Sin completar";
}

function PanelFooter({ config, onClose }) {
  return (
    <div className="border-t border-stone-200 bg-white px-5 py-4 sm:px-6">
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <SecondaryButton onClick={onClose}>Cancelar</SecondaryButton>
        <PrimaryButton type="submit">{config.submitLabel}</PrimaryButton>
      </div>
      <p className="mt-3 text-xs leading-5 text-stone-500">
        Este prototipo agrega el registro solo en memoria. Si recargás la vista, los datos vuelven al estado inicial.
      </p>
    </div>
  );
}
