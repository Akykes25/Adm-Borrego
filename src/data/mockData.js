export const modules = [
  { id: "dashboard", label: "Inicio", mark: "IN" },
  { id: "properties", label: "Propiedades", mark: "PR" },
  { id: "contracts", label: "Contratos", mark: "CT" },
  { id: "tenants", label: "Inquilinos", mark: "IQ" },
  { id: "owners", label: "Propietarios", mark: "PO" },
  { id: "collections", label: "Cobros", mark: "CB" },
  { id: "expenses", label: "Gastos", mark: "GT" },
  { id: "services", label: "Servicios", mark: "SV" },
  { id: "settlements", label: "Liquidaciones", mark: "LQ" },
  { id: "condos", label: "Consorcios", mark: "CS" },
  { id: "settings", label: "Configuración", mark: "CF" },
];

export const initialKpis = [
  { title: "Total cobrado", value: "$ 8.420.000", detail: "Mayo 2026", status: "positive" },
  { title: "Pendiente de cobro", value: "$ 1.180.000", detail: "12 operaciones", status: "warning" },
  { title: "A liquidar", value: "$ 6.970.000", detail: "18 propietarios", status: "neutral" },
  { title: "Gastos del mes", value: "$ 740.000", detail: "34 movimientos", status: "danger" },
];

export const initialProperties = [
  { id: "PROP-001", address: "Obispo Trejo 872", type: "Departamento", zone: "Nueva Córdoba", owner: "Laura Méndez", tenant: "Matías Correa", status: "Alquilada", rent: "$ 520.000" },
  { id: "PROP-002", address: "Av. Colón 1640", type: "Local", zone: "Alberdi", owner: "Grupo Sarmiento SRL", tenant: "Sin inquilino", status: "Disponible", rent: "$ 780.000" },
  { id: "PROP-003", address: "Laprida 244", type: "Departamento", zone: "Güemes", owner: "Jorge Salvatierra", tenant: "Agustina Prieto", status: "Alquilada", rent: "$ 460.000" },
];

export const initialContracts = [
  { id: "CONT-1042", property: "Obispo Trejo 872", tenant: "Matías Correa", owner: "Laura Méndez", start: "01/03/2026", end: "28/02/2028", amount: "$ 520.000", state: "Vigente" },
  { id: "CONT-1043", property: "Laprida 244", tenant: "Agustina Prieto", owner: "Jorge Salvatierra", start: "01/01/2026", end: "31/12/2027", amount: "$ 460.000", state: "Vigente" },
  { id: "CONT-0980", property: "Av. Colón 1640", tenant: "Comercial Norte", owner: "Grupo Sarmiento SRL", start: "01/08/2023", end: "31/07/2025", amount: "$ 690.000", state: "Finalizado" },
];

export const initialTenants = [
  { name: "Matías Correa", status: "Al día", phone: "+54 351 000 0000", email: "matias@ejemplo.com", link: "Obispo Trejo 872", guarantors: ["Roberto Correa", "Silvina Paz"] },
  { name: "Agustina Prieto", status: "Parcial", phone: "+54 351 000 0001", email: "agustina@ejemplo.com", link: "Laprida 244", guarantors: ["Claudia Prieto"] },
  { name: "Comercial Norte", status: "Revisar", phone: "+54 351 000 0002", email: "contacto@comercialnorte.com", link: "Av. Colón 1640", guarantors: ["Seguro de caución"] },
];

export const initialGuarantors = ["Roberto Correa", "Silvina Paz", "Claudia Prieto", "Seguro de caución", "Garantía propietaria"];

export const initialOwners = [
  { name: "Laura Méndez", status: "Al día", phone: "+54 351 000 0003", email: "laura@ejemplo.com", link: "Obispo Trejo 872" },
  { name: "Jorge Salvatierra", status: "Al día", phone: "+54 351 000 0004", email: "jorge@ejemplo.com", link: "Laprida 244" },
  { name: "Grupo Sarmiento SRL", status: "Revisar", phone: "+54 351 000 0005", email: "admin@sarmiento.com", link: "Av. Colón 1640" },
];

export const initialCollections = [
  { period: "Mayo 2026", tenant: "Matías Correa", property: "Obispo Trejo 872", concept: "Alquiler mensual", amount: "$ 520.000", paid: "$ 520.000", state: "Pagado" },
  { period: "Mayo 2026", tenant: "Agustina Prieto", property: "Laprida 244", concept: "Alquiler mensual", amount: "$ 460.000", paid: "$ 230.000", state: "Parcial" },
  { period: "Mayo 2026", tenant: "Comercial Norte", property: "Av. Colón 1640", concept: "Expensas vencidas", amount: "$ 180.000", paid: "$ 0", state: "Vencido" },
];

export const initialExpenses = [
  { date: "03/05/2026", category: "Reparación", property: "Obispo Trejo 872", responsible: "Propietario", amount: "$ 85.000", state: "Pendiente" },
  { date: "07/05/2026", category: "Servicio", property: "Laprida 244", responsible: "Inquilino", amount: "$ 22.400", state: "Imputado" },
  { date: "09/05/2026", category: "Administración", property: "General", responsible: "Inmobiliaria", amount: "$ 48.000", state: "Pagado" },
];

export const initialServices = [
  { service: "EPEC", tenant: "Matías Correa", property: "Obispo Trejo 872", account: "0042-001-1", responsible: "Inquilino", amount: "$ 38.200", due: "15/05/2026", state: "Pagado", checklist: ["Factura recibida", "Comprobante subido", "Verificado por administración"] },
  { service: "Ecogas", tenant: "Matías Correa", property: "Obispo Trejo 872", account: "0098-224-8", responsible: "Inquilino", amount: "$ 21.600", due: "18/05/2026", state: "Pendiente", checklist: ["Factura recibida", "Comprobante pendiente", "Verificación pendiente"] },
  { service: "Aguas Cordobesas", tenant: "Agustina Prieto", property: "Laprida 244", account: "0042-001-2", responsible: "Inquilino", amount: "$ 14.900", due: "15/05/2026", state: "Pagado", checklist: ["Factura recibida", "Comprobante subido", "Verificado por administración"] },
  { service: "Municipalidad", tenant: "Comercial Norte", property: "Av. Colón 1640", account: "0042-001-3", responsible: "Inquilino", amount: "$ 62.000", due: "20/05/2026", state: "Vencido", checklist: ["Factura recibida", "Comprobante pendiente", "Verificación pendiente"] },
];

export const initialSettlements = [
  { owner: "Laura Méndez", period: "Mayo 2026", properties: "1 propiedad", gross: "$ 520.000", discounts: "$ 126.600", net: "$ 393.400", state: "Borrador" },
  { owner: "Jorge Salvatierra", period: "Mayo 2026", properties: "1 propiedad", gross: "$ 230.000", discounts: "$ 36.800", net: "$ 193.200", state: "Revisar" },
  { owner: "Grupo Sarmiento SRL", period: "Mayo 2026", properties: "2 propiedades", gross: "$ 1.240.000", discounts: "$ 148.800", net: "$ 1.091.200", state: "Aprobada" },
];

export const initialCondos = [
  { id: "CONS-001", name: "Consorcio Rivera", address: "Bv. Illia 520", cuit: "30-00000000-1", units: "24 unidades", balance: "$ 742.500", state: "Activo" },
  { id: "CONS-002", name: "Consorcio Los Álamos", address: "Av. Vélez Sarsfield 1100", cuit: "30-00000000-2", units: "18 unidades", balance: "$ 318.200", state: "Revisar" },
];

export const initialCondoUnits = [
  { unit: "1A", owner: "Mariana Flores", coefficient: "4,12 %", expense: "$ 96.400", debt: "$ 0", state: "Al día" },
  { unit: "2B", owner: "Héctor Molina", coefficient: "3,84 %", expense: "$ 89.900", debt: "$ 89.900", state: "Pendiente" },
  { unit: "4C", owner: "Lucía Arce", coefficient: "5,20 %", expense: "$ 121.600", debt: "$ 243.200", state: "Vencido" },
];

export const initialSettings = [
  { title: "Usuarios y roles", text: "Alta de usuarios, perfiles administrativos y permisos internos." },
  { title: "Cuentas y monedas", text: "Cuentas receptoras, caja, bancos y moneda operativa." },
  { title: "Plantillas de documentos", text: "Recibos, liquidaciones, contratos y reportes PDF." },
  { title: "Conceptos de gasto", text: "Categorías reutilizables para imputaciones y reportes." },
  { title: "Portales externos", text: "Accesos para inquilinos, propietarios y unidades de consorcio." },
  { title: "Auditoría", text: "Registro de acciones internas y cambios operativos." },
];

export const periods = ["Mayo 2026", "Abril 2026", "Marzo 2026"];

export const quickActions = [
  { label: "Crear contrato", module: "contracts" },
  { label: "Registrar cobro", module: "collections" },
  { label: "Cargar gasto", module: "expenses" },
  { label: "Generar liquidaciones", module: "settlements" },
  { label: "Crear consorcio", module: "condos" },
];
