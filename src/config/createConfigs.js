import { initialGuarantors, periods } from "../data/mockData";

export function buildCreateConfigs(data) {
  const propertyOptions = data.properties.map((item) => item.address);
  const tenantOptions = data.tenants.map((item) => item.name);
  const ownerOptions = data.owners.map((item) => item.name);
  const guarantorOptions = [...new Set([...initialGuarantors, ...data.tenants.flatMap((item) => item.guarantors || [])])];

  return {
    dashboard: { target: "collections", title: "Registrar movimiento", subtitle: "Carga rápida de un movimiento administrativo. Se agrega como cobro temporal.", submitLabel: "Registrar movimiento", fields: [
      { name: "period", label: "Período", type: "select", options: periods, defaultValue: data.period },
      { name: "tenant", label: "Persona asociada", type: "select", options: tenantOptions, defaultValue: tenantOptions[0] || "Nuevo contacto" },
      { name: "property", label: "Propiedad", type: "select", options: [...propertyOptions, "Sin propiedad asignada"], defaultValue: propertyOptions[0] || "Sin propiedad asignada" },
      { name: "concept", label: "Concepto", defaultValue: "Movimiento administrativo" },
      { name: "amount", label: "Importe", defaultValue: "$ 0" },
      { name: "paid", label: "Pagado", defaultValue: "$ 0" },
      { name: "state", label: "Estado", type: "select", options: ["Pendiente", "Pagado", "Parcial", "Vencido"], defaultValue: "Pendiente" },
    ] },
    properties: { target: "properties", title: "Nueva propiedad", subtitle: "Simula la carga de un inmueble administrado.", submitLabel: "Agregar propiedad", fields: [
      { name: "address", label: "Dirección", defaultValue: "Nueva dirección 123" },
      { name: "type", label: "Tipo", type: "select", options: ["Departamento", "Casa", "Local", "Oficina", "Cochera"], defaultValue: "Departamento" },
      { name: "zone", label: "Barrio", defaultValue: "Nueva Córdoba" },
      { name: "owner", label: "Propietario", type: "select", options: [...ownerOptions, "Nuevo propietario"], defaultValue: ownerOptions[0] || "Nuevo propietario" },
      { name: "tenant", label: "Inquilino", type: "select", options: [...tenantOptions, "Sin inquilino"], defaultValue: "Sin inquilino" },
      { name: "status", label: "Estado", type: "select", options: ["Disponible", "Alquilada", "En reparación", "Suspendida"], defaultValue: "Disponible" },
      { name: "rent", label: "Alquiler", defaultValue: "$ 0" },
    ] },
    contracts: { target: "contracts", title: "Nuevo contrato", subtitle: "Simula el alta de un contrato y muestra cómo quedaría en el listado.", submitLabel: "Crear contrato", fields: [
      { name: "property", label: "Propiedad", type: "select", options: propertyOptions, defaultValue: propertyOptions[0] || "Nueva propiedad" },
      { name: "tenant", label: "Inquilino", type: "select", options: tenantOptions, defaultValue: tenantOptions[0] || "Nuevo inquilino" },
      { name: "owner", label: "Propietario", type: "select", options: ownerOptions, defaultValue: ownerOptions[0] || "Nuevo propietario" },
      { name: "start", label: "Inicio", defaultValue: "01/06/2026" },
      { name: "end", label: "Finalización", defaultValue: "31/05/2028" },
      { name: "amount", label: "Monto actual", defaultValue: "$ 0" },
      { name: "state", label: "Estado", type: "select", options: ["Borrador", "Vigente", "Próximo a vencer", "Vencido", "Rescindido"], defaultValue: "Borrador" },
    ] },
    tenants: { target: "tenants", title: "Nuevo inquilino", subtitle: "Simula la creación de una ficha de inquilino.", submitLabel: "Agregar inquilino", fields: [
      { name: "name", label: "Nombre", defaultValue: "Nuevo inquilino" },
      { name: "phone", label: "Teléfono", defaultValue: "+54 351 000 0000" },
      { name: "email", label: "Email", defaultValue: "inquilino@ejemplo.com" },
      { name: "link", label: "Propiedad vinculada", type: "select", options: [...propertyOptions, "Sin propiedad asignada"], defaultValue: "Sin propiedad asignada" },
      { name: "guarantors", label: "Garantes vinculados", type: "multiSelect", options: guarantorOptions, defaultValue: [] },
      { name: "status", label: "Estado", type: "select", options: ["Al día", "Pendiente", "Parcial", "Revisar"], defaultValue: "Al día" },
    ] },
    owners: { target: "owners", title: "Nuevo propietario", subtitle: "Simula la creación de una ficha de propietario con propiedades existentes.", submitLabel: "Agregar propietario", fields: [
      { name: "name", label: "Nombre o razón social", defaultValue: "Nuevo propietario" },
      { name: "phone", label: "Teléfono", defaultValue: "+54 351 000 0000" },
      { name: "email", label: "Email", defaultValue: "propietario@ejemplo.com" },
      { name: "link", label: "Propiedades asociadas", type: "multiSelect", options: propertyOptions, defaultValue: propertyOptions.slice(0, 1) },
      { name: "status", label: "Estado", type: "select", options: ["Al día", "Revisar", "Pendiente"], defaultValue: "Al día" },
    ] },
    collections: { target: "collections", title: "Registrar cobro", subtitle: "Simula un pago total, parcial o pendiente.", submitLabel: "Registrar cobro", fields: [
      { name: "period", label: "Período", type: "select", options: periods, defaultValue: data.period },
      { name: "tenant", label: "Inquilino", type: "select", options: tenantOptions, defaultValue: tenantOptions[0] || "Nuevo inquilino" },
      { name: "property", label: "Propiedad", type: "select", options: propertyOptions, defaultValue: propertyOptions[0] || "Nueva propiedad" },
      { name: "concept", label: "Concepto", defaultValue: "Alquiler mensual" },
      { name: "amount", label: "Importe", defaultValue: "$ 0" },
      { name: "paid", label: "Pagado", defaultValue: "$ 0" },
      { name: "state", label: "Estado", type: "select", options: ["Pendiente", "Pagado", "Parcial", "Vencido", "Perdonado"], defaultValue: "Pendiente" },
    ] },
    expenses: { target: "expenses", title: "Nuevo gasto", subtitle: "Simula la carga de un gasto general, imputable o descontable.", submitLabel: "Cargar gasto", fields: [
      { name: "date", label: "Fecha", defaultValue: "10/05/2026" },
      { name: "category", label: "Categoría", type: "select", options: ["Reparación", "Servicio", "Administración", "Impuesto", "Mantenimiento"], defaultValue: "Reparación" },
      { name: "property", label: "Propiedad", type: "select", options: [...propertyOptions, "General"], defaultValue: propertyOptions[0] || "General" },
      { name: "responsible", label: "Responsable", type: "select", options: ["Inquilino", "Propietario", "Inmobiliaria", "Compartido"], defaultValue: "Propietario" },
      { name: "amount", label: "Importe", defaultValue: "$ 0" },
      { name: "state", label: "Estado", type: "select", options: ["Pendiente", "Pagado", "Imputado", "Descontado"], defaultValue: "Pendiente" },
    ] },
    services: { target: "services", title: "Nuevo servicio", subtitle: "Simula la carga de una cuenta de servicio vinculada a una propiedad.", submitLabel: "Agregar servicio", fields: [
      { name: "service", label: "Servicio", type: "select", options: ["EPEC", "Ecogas", "Aguas Cordobesas", "Municipalidad", "Rentas", "Internet", "Expensas"], defaultValue: "EPEC" },
      { name: "tenant", label: "Inquilino", type: "select", options: tenantOptions, defaultValue: tenantOptions[0] || "Nuevo inquilino" },
      { name: "property", label: "Propiedad", type: "select", options: propertyOptions, defaultValue: propertyOptions[0] || "Nueva propiedad" },
      { name: "account", label: "Número de cuenta", defaultValue: "0000-000-0" },
      { name: "responsible", label: "Responsable", type: "select", options: ["Inquilino", "Propietario", "Administración"], defaultValue: "Inquilino" },
      { name: "amount", label: "Monto estimado", defaultValue: "$ 0" },
      { name: "due", label: "Próximo vencimiento", defaultValue: "15/06/2026" },
      { name: "state", label: "Estado", type: "select", options: ["Activo", "Pendiente", "Pagado", "Vencido", "Dado de baja"], defaultValue: "Activo" },
    ] },
    settlements: { target: "settlements", title: "Generar liquidación", subtitle: "Simula una liquidación mensual a propietario.", submitLabel: "Generar liquidación", fields: [
      { name: "owner", label: "Propietario", type: "select", options: ownerOptions, defaultValue: ownerOptions[0] || "Nuevo propietario" },
      { name: "period", label: "Período", type: "select", options: periods, defaultValue: data.period },
      { name: "properties", label: "Propiedades incluidas", defaultValue: "1 propiedad" },
      { name: "gross", label: "Total bruto", defaultValue: "$ 0" },
      { name: "discounts", label: "Descuentos", defaultValue: "$ 0" },
      { name: "net", label: "Neto a transferir", defaultValue: "$ 0" },
      { name: "state", label: "Estado", type: "select", options: ["Borrador", "Revisar", "Aprobada", "Pagada", "Enviada"], defaultValue: "Borrador" },
    ] },
    condos: { target: "condos", title: "Nuevo consorcio", subtitle: "Simula el alta de un consorcio administrado.", submitLabel: "Crear consorcio", fields: [
      { name: "name", label: "Nombre", defaultValue: "Nuevo consorcio" },
      { name: "address", label: "Dirección", defaultValue: "Dirección del consorcio" },
      { name: "cuit", label: "CUIT", defaultValue: "30-00000000-0" },
      { name: "units", label: "Cantidad de unidades", defaultValue: "10 unidades" },
      { name: "balance", label: "Saldo inicial", defaultValue: "$ 0" },
      { name: "state", label: "Estado", type: "select", options: ["Activo", "Revisar", "Inactivo"], defaultValue: "Activo" },
    ] },
    settings: { target: "settings", title: "Nueva configuración", subtitle: "Simula una tarjeta de configuración interna.", submitLabel: "Agregar configuración", fields: [
      { name: "title", label: "Título", defaultValue: "Nueva configuración" },
      { name: "text", label: "Descripción", type: "textarea", defaultValue: "Descripción operativa de la configuración." },
    ] },
  };
}
