import { PrimaryButton, SecondaryButton, SectionTitle, StatusPill } from "../components/ui";

export function PeopleView({ type, people, onCreate, onDetail }) {
  const isTenant = type === "tenants";

  return (
    <div className="space-y-8">
      <SectionTitle
        eyebrow={isTenant ? "Personas vinculadas a contratos" : "Titulares y datos fiscales"}
        title={isTenant ? "Inquilinos" : "Propietarios"}
        description={getDescription(isTenant)}
        action={
          <PrimaryButton onClick={() => onCreate(type)}>
            {isTenant ? "Nuevo inquilino" : "Nuevo propietario"}
          </PrimaryButton>
        }
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {people.map((person) => (
          <PersonCard
            key={person.id || person.name}
            person={person}
            isTenant={isTenant}
            onDetail={onDetail}
          />
        ))}
      </div>
    </div>
  );
}

function getDescription(isTenant) {
  return isTenant
    ? "Ficha del inquilino, deuda, contrato, garantes, gastos imputados, servicios y acceso al portal externo."
    : "Gestión de datos personales, información fiscal, propiedades asociadas, saldos y liquidaciones mensuales.";
}

function PersonCard({ person, isTenant, onDetail }) {
  const title = isTenant ? "Inquilino" : "Propietario";

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-lg font-semibold text-brand">{person.name}</p>
          <p className="mt-1 text-sm text-stone-500">
            {isTenant ? "Contrato activo" : "Propietario activo"}
          </p>
        </div>
        <StatusPill value={person.status} />
      </div>

      <PersonDetails person={person} isTenant={isTenant} />

      <div className="mt-6 flex flex-wrap gap-3">
        <SecondaryButton onClick={() => onDetail(title, person)}>Ver ficha</SecondaryButton>
        <SecondaryButton>{isTenant ? "Portal" : "Liquidar"}</SecondaryButton>
      </div>
    </div>
  );
}

function PersonDetails({ person, isTenant }) {
  return (
    <div className="mt-5 space-y-3 text-sm text-stone-600">
      <p><span className="font-semibold text-stone-900">Teléfono:</span> {person.phone}</p>
      <p><span className="font-semibold text-stone-900">Email:</span> {person.email}</p>
      <p>
        <span className="font-semibold text-stone-900">
          {isTenant ? "Propiedad vinculada" : "Propiedades asociadas"}:
        </span>{" "}
        {Array.isArray(person.link) ? person.link.join(", ") : person.link}
      </p>
      {isTenant && (
        <p>
          <span className="font-semibold text-stone-900">Garantes:</span>{" "}
          {person.guarantors?.length ? person.guarantors.join(", ") : "Sin garantes vinculados"}
        </p>
      )}
    </div>
  );
}
