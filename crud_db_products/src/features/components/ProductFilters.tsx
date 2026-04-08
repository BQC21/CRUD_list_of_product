const FILTERS = [
  {
    id: "type",
    label: "Filtrar por Tipo",
    placeholder: "Todos los Tipos",
  },
  {
    id: "brand",
    label: "Filtrar por Marca",
    placeholder: "Todas las Marcas",
  },
  {
    id: "supplier",
    label: "Filtrar por Proveedor",
    placeholder: "Todos los Proveedores",
  },
];

export function ProductFilters() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {FILTERS.map((filter) => (
        <label key={filter.id} className="space-y-2">
          <span className="block text-lg font-semibold text-slate-600">{filter.label}</span>
          <div className="relative">
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 5h16l-6 7v6l-4-2v-4L4 5Z"
              />
            </svg>
            <select className="filter-control h-12 w-full appearance-none pl-11 pr-10">
              <option>{filter.placeholder}</option>
            </select>
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </label>
      ))}
    </div>
  );
}
