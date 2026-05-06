import { useMemo, useState } from "react";
import { buildCreateConfigs } from "../config/createConfigs";
import {
  initialCollections,
  initialCondoUnits,
  initialCondos,
  initialContracts,
  initialExpenses,
  initialOwners,
  initialProperties,
  initialServices,
  initialSettings,
  initialSettlements,
  initialTenants,
} from "../data/mockData";
import { getDefaultFormValues, nextId } from "../utils/format";

const defaultServiceChecklist = [
  "Factura recibida",
  "Comprobante pendiente",
  "Verificación pendiente",
];

function createRecord(target, record, currentLength) {
  switch (target) {
    case "properties":
      return { id: nextId("PROP", currentLength), ...record };
    case "contracts":
      return { id: nextId("CONT", currentLength), ...record };
    case "condos":
      return { id: nextId("CONS", currentLength), ...record };
    case "services":
      return { id: nextId("SERV", currentLength), ...record, checklist: defaultServiceChecklist };
    case "tenants":
      return { id: nextId("TEN", currentLength), ...record };
    case "owners":
      return { id: nextId("OWN", currentLength), ...record };
    case "collections":
      return { id: nextId("COL", currentLength), ...record };
    case "expenses":
      return { id: nextId("EXP", currentLength), ...record };
    case "settlements":
      return { id: nextId("SET", currentLength), ...record };
    case "settings":
      return { id: nextId("CFG", currentLength), ...record };
    default:
      return record;
  }
}

export function usePrototypeAdminState() {
  const [activeModule, setActiveModule] = useState("dashboard");
  const [period, setPeriod] = useState("Mayo 2026");
  const [query, setQuery] = useState("");
  const [createModule, setCreateModule] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [lastCreated, setLastCreated] = useState(null);
  const [detail, setDetail] = useState(null);
  const [properties, setProperties] = useState(initialProperties);
  const [contracts, setContracts] = useState(initialContracts);
  const [tenants, setTenants] = useState(initialTenants);
  const [owners, setOwners] = useState(initialOwners);
  const [collections, setCollections] = useState(initialCollections);
  const [expenses, setExpenses] = useState(initialExpenses);
  const [services, setServices] = useState(initialServices);
  const [settlements, setSettlements] = useState(initialSettlements);
  const [condos, setCondos] = useState(initialCondos);
  const [settings, setSettings] = useState(initialSettings);
  const [condoUnits] = useState(initialCondoUnits);

  const data = useMemo(
    () => ({
      period,
      query,
      properties,
      contracts,
      tenants,
      owners,
      collections,
      expenses,
      services,
      settlements,
      condos,
      condoUnits,
      settings,
    }),
    [
      period,
      query,
      properties,
      contracts,
      tenants,
      owners,
      collections,
      expenses,
      services,
      settlements,
      condos,
      condoUnits,
      settings,
    ],
  );

  const createConfigs = useMemo(() => buildCreateConfigs(data), [data]);
  const currentConfig = createModule ? createConfigs[createModule] : null;

  const collectionSetters = {
    properties: setProperties,
    contracts: setContracts,
    tenants: setTenants,
    owners: setOwners,
    collections: setCollections,
    expenses: setExpenses,
    services: setServices,
    settlements: setSettlements,
    condos: setCondos,
    settings: setSettings,
  };

  function openCreate(moduleId) {
    const config = createConfigs[moduleId] || createConfigs.dashboard;
    setCreateModule(moduleId);
    setFormValues(getDefaultFormValues(config));
  }

  function closeCreate() {
    setCreateModule(null);
    setFormValues({});
  }

  function updateFormValue(name, value) {
    setFormValues((current) => ({ ...current, [name]: value }));
  }

  function openDetail(title, row) {
    setDetail({ title, row });
  }

  function closeDetail() {
    setDetail(null);
  }

  function handleQuickAction(moduleId, shouldOpen = false) {
    setActiveModule(moduleId);
    if (shouldOpen) openCreate(moduleId);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!currentConfig) return;

    const target = currentConfig.target;
    const updateCollection = collectionSetters[target];

    if (updateCollection) {
      updateCollection((current) => [
        createRecord(target, { ...formValues }, current.length),
        ...current,
      ]);
    }

    setActiveModule(target === "collections" && createModule === "dashboard" ? "collections" : target);
    setLastCreated(`${currentConfig.title} agregado temporalmente.`);
    closeCreate();
  }

  return {
    activeModule,
    currentConfig,
    data,
    detail,
    formValues,
    lastCreated,
    period,
    query,
    isCreateOpen: Boolean(createModule),
    closeCreate,
    closeDetail,
    handleQuickAction,
    handleSubmit,
    openCreate,
    openDetail,
    setActiveModule,
    setPeriod,
    setQuery,
    updateFormValue,
  };
}
