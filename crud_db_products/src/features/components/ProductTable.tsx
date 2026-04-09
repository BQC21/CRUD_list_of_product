import type { Product } from "@/features/components/product-types";

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

type ProductTableProps = {
  products: Product[];
};

function formatPen(value: number) {
  return `S/. ${value.toFixed(2)}`;
}

function formatUsd(value: number) {
  return `$ ${value.toFixed(2)}`;
}

export function ProductTable({ products }: ProductTableProps) {
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
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id} className="bg-white">
                    <td className="px-4 py-5 text-slate-500">{product.supplierCode || "-"}</td>
                    <td className="px-4 py-5 text-slate-800">{product.supplier}</td>
                    <td className="px-4 py-5 font-medium text-slate-900">{product.code}</td>
                    <td className="px-4 py-5 text-slate-900">{product.type}</td>
                    <td className="px-4 py-5 text-slate-900">{product.brand}</td>
                    <td className="px-4 py-5 text-slate-900">{product.description}</td>
                    <td className="px-4 py-5 text-slate-900">{formatPen(product.pricePen)}</td>
                    <td className="px-4 py-5 text-slate-900">{formatUsd(product.priceUsd)}</td>
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
                ))
              ) : (
                <tr className="bg-white">
                  <td colSpan={9} className="px-4 py-10 text-center text-slate-500">
                    No hay productos registrados todavía.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-lg text-slate-500">
        Mostrando {products.length} de {products.length} productos
      </p>
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
