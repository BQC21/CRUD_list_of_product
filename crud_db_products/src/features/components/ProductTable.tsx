const PRODUCT_ROW = {
  supplierCode: "AND-001",
  supplier: "Andet SAC",
  code: "PANEL-450-MONO",
  type: "Módulo",
  brand: "JA SOLAR",
  description: "Panel Solar Monocristalino 450W",
  pricePen: "S/. 1003.00",
  priceUsd: "$ 267.47",
};

const TABLE_HEADERS = [
  "Cód. Prov.",
  "Proveedor",
  "Código",
  "Tipo",
  "Marca",
  "Descripción",
  "Precio S/.",
  "Precio $",
  "Acciones",
];

export function ProductTable() {
  return (
    <section className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0">
            <thead>
              <tr className="bg-slate-100 text-left">
                {TABLE_HEADERS.map((header) => (
                  <th
                    key={header}
                    className="border-b border-slate-200 px-4 py-4 text-[1.02rem] font-bold text-slate-900"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="px-4 py-5 text-slate-500">{PRODUCT_ROW.supplierCode}</td>
                <td className="px-4 py-5 text-slate-800">{PRODUCT_ROW.supplier}</td>
                <td className="px-4 py-5 font-medium text-slate-900">{PRODUCT_ROW.code}</td>
                <td className="px-4 py-5 text-slate-900">{PRODUCT_ROW.type}</td>
                <td className="px-4 py-5 text-slate-900">{PRODUCT_ROW.brand}</td>
                <td className="px-4 py-5 text-slate-900">{PRODUCT_ROW.description}</td>
                <td className="px-4 py-5 text-slate-900">{PRODUCT_ROW.pricePen}</td>
                <td className="px-4 py-5 text-slate-900">{PRODUCT_ROW.priceUsd}</td>
                <td className="px-4 py-5">
                  <div className="flex items-center gap-4 text-slate-500">
                    <button type="button" className="table-icon-button text-indigo-600">
                      <EditIcon />
                    </button>
                    <button type="button" className="table-icon-button text-red-500">
                      <TrashIcon />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-lg text-slate-500">Mostrando 1 de 1 productos</p>
    </section>
  );
}

function EditIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m16.862 4.487 2.651 2.651a1.875 1.875 0 0 1 0 2.652L9.75 19.553 4.5 21l1.447-5.25L15.71 4.487a1.875 1.875 0 0 1 2.652 0Z"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 11v6M14 11v6" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"
      />
    </svg>
  );
}
