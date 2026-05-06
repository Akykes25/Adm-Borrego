import { PrimaryButton, SectionTitle, TextMark } from "../components/ui";

export function SettingsView({ settings, onCreate }) {
  return (
    <div className="space-y-8">
      <SectionTitle
        eyebrow="Parámetros del sistema"
        title="Configuración"
        description="Vista preliminar para usuarios, roles, permisos, monedas, cuentas, conceptos de gasto, plantillas y portales externos."
        action={<PrimaryButton onClick={() => onCreate("settings")}>Nueva configuración</PrimaryButton>}
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {settings.map((item) => (
          <SettingsCard key={item.id || item.title} item={item} />
        ))}
      </div>
    </div>
  );
}

function SettingsCard({ item }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <TextMark active>OK</TextMark>
      <h2 className="mt-4 text-lg font-semibold text-brand">{item.title}</h2>
      <p className="mt-2 text-sm leading-6 text-stone-600">{item.text}</p>
    </div>
  );
}
