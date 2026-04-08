import { SearchBar } from "@/features/components/SearchBar";
import { ProductFilters } from "@/features/components/ProductFilters";
import { ProductTable } from "@/features/components/ProductTable";

const EXCHANGE_RATE = 3.75;

export default function Page() {
  return (
    <main className="min-h-screen bg-[var(--page-bg)] text-[var(--foreground)]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-3 py-5 sm:px-6 lg:px-8">
        <section className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-[-0.02em] text-slate-900">
              Base de Datos de Productos
            </h1>
            <p className="text-lg text-slate-600">
              Gestión de inventario de productos para energía solar fotovoltaica
            </p>
            <p className="text-lg text-slate-500">
              Tasa de cambio actual: S/. {EXCHANGE_RATE.toFixed(2)} por dólar
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button type="button" className="action-button action-button--success">
              <UploadIcon />
              <span>Carga Masiva</span>
            </button>
            <button type="button" className="action-button action-button--primary">
              <PlusIcon />
              <span>Añadir Producto</span>
            </button>
          </div>
        </section>

        <section className="panel">
          <div className="space-y-6">
            <SearchBar />
            <ProductFilters />
          </div>
        </section>

        <ProductTable />
      </div>
    </main>
  );
}

function UploadIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0-4 4m4-4 4 4" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 15v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
    </svg>
  );
}
