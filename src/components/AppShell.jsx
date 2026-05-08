import { modules, periods } from "../data/mockData";
import { cx } from "../utils/format";
import { PrimaryButton, SecondaryButton, TextMark } from "./ui";

export function AppShell({
  activeModule,
  period,
  query,
  lastCreated,
  children,
  onModuleChange,
  onPeriodChange,
  onQueryChange,
  onCreate,
}) {
  return (
    <div className="min-h-screen lg:pl-72">
      <Sidebar activeModule={activeModule} onModuleChange={onModuleChange} />

      <main className="min-w-0">
        <Header
          activeModule={activeModule}
          period={period}
          query={query}
          lastCreated={lastCreated}
          onCreate={onCreate}
          onModuleChange={onModuleChange}
          onPeriodChange={onPeriodChange}
          onQueryChange={onQueryChange}
        />

        <div className="px-4 py-6 sm:px-5 sm:py-8 lg:px-8">{children}</div>
      </main>
    </div>
  );
}

function Sidebar({ activeModule, onModuleChange }) {
  return (
    <aside className="app-sidebar fixed inset-y-0 left-0 z-40 hidden h-screen w-72 shrink-0 overflow-y-auto bg-brand p-4 text-white lg:flex lg:flex-col xl:p-5">
      <div className="rounded-2xl bg-white/10 p-4 xl:p-5">
        <div className="flex items-center gap-3">
          <TextMark large active>
            AD
          </TextMark>
          <div>
            <p className="text-lg font-semibold">Administra</p>
            <p className="text-xs text-white/60">Sistema inmobiliario</p>
          </div>
        </div>
      </div>

      <nav className="mt-5 flex-1 space-y-1 pb-4">
        {modules.map((item) => (
          <ModuleButton
            key={item.id}
            module={item}
            isActive={activeModule === item.id}
            onClick={() => onModuleChange(item.id)}
          />
        ))}
      </nav>

      <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/70">
        <p className="font-semibold text-white">Prototipo visual</p>
        <p className="mt-1">Datos temporales en memoria, sin base de datos ni backend.</p>
      </div>
    </aside>
  );
}

function ModuleButton({ module, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition xl:px-4 xl:py-3",
        isActive ? "bg-sand text-brand" : "text-white/75 hover:bg-white/10 hover:text-white",
      )}
    >
      <span
        className={cx(
          "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[10px] font-bold",
          isActive ? "bg-brand text-white" : "bg-white/10 text-white/80",
        )}
      >
        {module.mark}
      </span>
      {module.label}
    </button>
  );
}

function Header({
  activeModule,
  period,
  query,
  lastCreated,
  onCreate,
  onModuleChange,
  onPeriodChange,
  onQueryChange,
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-stone-200 bg-paper/90 px-4 py-3 backdrop-blur sm:px-5 lg:px-8 lg:py-4">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <MobileBrand />
        <SearchInput query={query} onQueryChange={onQueryChange} />
        <HeaderActions
          activeModule={activeModule}
          period={period}
          onCreate={onCreate}
          onPeriodChange={onPeriodChange}
        />
      </div>

      {lastCreated && (
        <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
          {lastCreated}
        </div>
      )}

      <MobileModuleTabs activeModule={activeModule} onModuleChange={onModuleChange} />
    </header>
  );
}

function MobileBrand() {
  return (
    <div className="flex items-center gap-3 lg:hidden">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-sm font-bold text-white">
        AD
      </div>
      <div>
        <p className="font-semibold text-brand">Administra</p>
        <p className="text-xs text-stone-500">Sistema inmobiliario</p>
      </div>
    </div>
  );
}

function SearchInput({ query, onQueryChange }) {
  return (
    <div className="relative max-w-xl flex-1">
      <span className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-2 border-stone-400 sm:left-4">
        <span className="absolute -bottom-1 -right-1 h-2.5 w-0.5 rotate-[-45deg] rounded-full bg-stone-400" />
      </span>
      <input
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        className="w-full rounded-2xl border border-stone-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-stone-400 focus:border-brand focus:ring-4 focus:ring-brand/10 sm:py-3 sm:pl-12"
        placeholder="Buscar propiedad, inquilino, propietario, contrato o unidad"
      />
    </div>
  );
}

function HeaderActions({ activeModule, period, onCreate, onPeriodChange }) {
  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      <select
        value={period}
        onChange={(event) => onPeriodChange(event.target.value)}
        className="rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 outline-none focus:border-brand"
      >
        {periods.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
      <SecondaryButton>Exportar</SecondaryButton>
      <PrimaryButton onClick={() => onCreate(activeModule)}>Crear nuevo</PrimaryButton>
    </div>
  );
}

function MobileModuleTabs({ activeModule, onModuleChange }) {
  return (
    <div className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
      {modules.map((item) => (
        <button
          key={item.id}
          onClick={() => onModuleChange(item.id)}
          className={cx(
            "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium",
            activeModule === item.id ? "bg-brand text-white" : "bg-white text-stone-600",
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
