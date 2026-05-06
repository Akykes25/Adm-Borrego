import { PrimaryButton, SecondaryButton } from "./ui";

export function CreationPanel({ isOpen, config, values, onChange, onClose, onSubmit }) {
  if (!isOpen || !config) return null;

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

function FormField({ field, value, onChange }) {
  const common = "mt-2 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10";

  return (
    <label className="block">
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
          <label
            key={option}
            className="flex items-center gap-2 rounded-lg border border-stone-100 bg-paper px-3 py-2 text-sm text-stone-700"
          >
            <input
              type="checkbox"
              checked={selectedValues.includes(option)}
              onChange={(event) => toggleOption(option, event.target.checked)}
            />
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
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
        Vista previa
      </p>
      <div className="mt-4 space-y-2 text-sm text-stone-700">
        {fields.slice(0, 5).map((field) => (
          <p key={field.name}>
            <span className="font-semibold text-brand">{field.label}:</span>{" "}
            {formatPreviewValue(values[field.name])}
          </p>
        ))}
      </div>
    </div>
  );
}

function formatPreviewValue(value) {
  if (Array.isArray(value)) return value.length ? value.join(", ") : "Sin seleccionar";
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
