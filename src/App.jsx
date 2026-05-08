import { AppShell } from "./components/AppShell";
import { CreationPanel } from "./components/CreationPanel";
import { DetailPanel } from "./components/DetailPanel";
import { initialCondos, initialProperties, initialServices, initialTenants, modules } from "./data/mockData";
import { usePrototypeAdminState } from "./hooks/usePrototypeAdminState";
import { MainContent } from "./views/MainContent";

function runPrototypeSmokeTests() {
  const validModuleIds = new Set(modules.map((item) => item.id));
  const requiredModuleIds = ["dashboard", "properties", "contracts", "tenants", "owners", "collections", "expenses", "services", "settlements", "condos", "settings"];
  console.assert(requiredModuleIds.every((id) => validModuleIds.has(id)), "Faltan módulos principales en el menú lateral.");
  console.assert(initialServices.every((service) => service.tenant), "Cada servicio debe estar asociado a un inquilino.");
  console.assert(initialTenants.every((tenant) => Array.isArray(tenant.guarantors)), "Cada inquilino debe poder vincular garantes.");
  console.assert(initialProperties.length > 0 && initialCondos.length > 0, "Debe existir data mockeada de alquileres y consorcios.");
}

runPrototypeSmokeTests();

export default function App() {
  const admin = usePrototypeAdminState();
  const content = (
    <MainContent
      activeModule={admin.activeModule}
      data={admin.data}
      onCreate={admin.openCreate}
      onQuickAction={admin.handleQuickAction}
      onDetail={admin.openDetail}
    />
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-paper font-sans text-ink">
      <AppShell
        activeModule={admin.activeModule}
        period={admin.period}
        query={admin.query}
        lastCreated={admin.lastCreated}
        onModuleChange={admin.setActiveModule}
        onPeriodChange={admin.setPeriod}
        onQueryChange={admin.setQuery}
        onCreate={admin.openCreate}
      >
        {content}
      </AppShell>

      <CreationPanel
        isOpen={admin.isCreateOpen}
        config={admin.currentConfig}
        values={admin.formValues}
        onChange={admin.updateFormValue}
        onClose={admin.closeCreate}
        onSubmit={admin.handleSubmit}
      />

      <DetailPanel detail={admin.detail} onClose={admin.closeDetail} />
    </div>
  );
}
