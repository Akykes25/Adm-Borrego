import { DataTable, PrimaryButton, SecondaryButton, SectionTitle, StatusPill } from "../components/ui";

export function PeopleView({ type, people, onCreate, onDetail }) {
  const isTenant = type === "tenants";

  return (
    <div className="space-y-8">
      <SectionTitle
        eyebrow={isTenant ? "Personas vinculadas a contratos" : "Titulares y datos fiscales"}
        title={isTenant ? "Inquilinos" : "Propietarios"}
        description={getDescription(isTenant)}
        action={
          isTenant ? null : <PrimaryButton onClick={() => onCreate(type)}>
            {isTenant ? "Nuevo inquilino" : "Nuevo propietario"}
          </PrimaryButton>
        }
      />

      <PeopleList people={people} isTenant={isTenant} onDetail={onDetail} />
    </div>
  );
}

function getDescription(isTenant) {
  return isTenant
    ? "Ficha del inquilino, deuda, contrato, garantes, gastos imputados, servicios y acceso al portal externo."
    : "Gestión de datos personales, información fiscal, propiedades asociadas, saldos y liquidaciones mensuales.";
}

function PeopleList({ people, isTenant, onDetail }) {
  return (
    <DataTable
      columns={["Nombre", "Contacto", isTenant ? "Propiedad" : "Propiedades", isTenant ? "Garantes" : "Estado", "Acciones"]}
      rows={people}
      renderRow={(person) => <PersonRow key={person.id || person.name} person={person} isTenant={isTenant} onDetail={onDetail} />}
    />
  );
}

function PersonRow({ person, isTenant, onDetail }) {
  const title = isTenant ? "Inquilino" : "Propietario";

  return (
    <tr className="hover:bg-stone-50">
      <td className="px-5 py-4">
        <p className="font-semibold text-brand">{person.name}</p>
        <p className="mt-1 text-xs text-stone-500">{isTenant ? "Contrato activo" : "Propietario activo"}</p>
      </td>
      <td className="px-5 py-4">
        <p>{person.phone}</p>
        <p className="mt-1 text-xs text-stone-500">{person.email}</p>
      </td>
      <td className="px-5 py-4">{Array.isArray(person.link) ? person.link.join(", ") : person.link}</td>
      <td className="px-5 py-4">
        {isTenant ? person.guarantors?.length ? person.guarantors.join(", ") : "Sin garantes" : <StatusPill value={person.status} />}
      </td>
      <td className="px-5 py-4">
        <div className="flex flex-wrap gap-2">
          <SecondaryButton onClick={() => onDetail(title, person)}>Ver ficha</SecondaryButton>
          <SecondaryButton>{isTenant ? "Portal" : "Liquidar"}</SecondaryButton>
        </div>
      </td>
    </tr>
  );
}
