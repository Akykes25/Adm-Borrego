import { useMemo } from "react";
import { includesQuery } from "../utils/format";
import { CollectionsView } from "./CollectionsView";
import { CondosView } from "./CondosView";
import { ContractsView } from "./ContractsView";
import { DashboardView } from "./DashboardView";
import { ExpensesView } from "./ExpensesView";
import { PeopleView } from "./PeopleView";
import { PropertiesView } from "./PropertiesView";
import { ServicesView } from "./ServicesView";
import { SettingsView } from "./SettingsView";
import { SettlementsView } from "./SettlementsView";

export function MainContent({ activeModule, data, onCreate, onQuickAction, onDetail }) {
  const filtered = useMemo(() => {
    const query = data.query;
    const tenants = data.tenants.filter((row) => includesQuery(row, query));
    const services = data.services.filter((row) => includesQuery(row, query));

    return {
      ...data,
      properties: data.properties.filter((row) => includesQuery(row, query)),
      contracts: data.contracts.filter((row) => includesQuery(row, query)),
      tenants,
      owners: data.owners.filter((row) => includesQuery(row, query)),
      collections: data.collections.filter((row) => includesQuery(row, query)),
      expenses: data.expenses.filter((row) => includesQuery(row, query)),
      serviceTenants: filterTenantsByServices(data.tenants, services, query),
      services,
      settlements: data.settlements.filter((row) => includesQuery(row, query)),
      condos: data.condos.filter((row) => includesQuery(row, query)),
      settings: data.settings.filter((row) => includesQuery(row, query)),
    };
  }, [data]);

  switch (activeModule) {
    case "properties":
      return <PropertiesView properties={filtered.properties} onCreate={onCreate} onDetail={onDetail} />;
    case "contracts":
      return <ContractsView contracts={filtered.contracts} onCreate={onCreate} onDetail={onDetail} />;
    case "tenants":
      return <PeopleView type="tenants" people={filtered.tenants} onCreate={onCreate} onDetail={onDetail} />;
    case "owners":
      return <PeopleView type="owners" people={filtered.owners} onCreate={onCreate} onDetail={onDetail} />;
    case "collections":
      return <CollectionsView collections={filtered.collections} onCreate={onCreate} />;
    case "expenses":
      return <ExpensesView expenses={filtered.expenses} onCreate={onCreate} />;
    case "services":
      return <ServicesView services={filtered.services} tenants={filtered.serviceTenants} onCreate={onCreate} />;
    case "settlements":
      return <SettlementsView settlements={filtered.settlements} onCreate={onCreate} />;
    case "condos":
      return <CondosView condos={filtered.condos} condoUnits={data.condoUnits} onCreate={onCreate} />;
    case "settings":
      return <SettingsView settings={filtered.settings} onCreate={onCreate} />;
    default:
      return <DashboardView collections={filtered.collections} period={filtered.period} onCreate={onCreate} onQuickAction={onQuickAction} />;
  }
}

function filterTenantsByServices(tenants, services, query) {
  if (!query.trim()) return tenants;

  const tenantNamesWithMatchingServices = new Set(services.map((service) => service.tenant));

  return tenants.filter(
    (tenant) => includesQuery(tenant, query) || tenantNamesWithMatchingServices.has(tenant.name),
  );
}
