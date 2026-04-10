"use client";

import { useState } from "react";
// import { SearchBar } from "@/features/components/SearchBar";
import { ProductFilters, type ProductFilterValues } from "@/features/components/ProductFilters";
import { ProductTable } from "@/features/components/ProductTable";
import Button2Modal from "@/app/components/Buttons/button2modal";
import { useProducts } from "@/features/hooks/useRealtimeProducts";

const EXCHANGE_RATE = 3.75;

export default function Page() {
  const { products } = useProducts();
  const [filters, setFilters] = useState<ProductFilterValues>({
    type: "",
    brand: "",
    supplier: "",
  });
  // const [searchTerm, setSearchTerm] = useState("");

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
            <Button2Modal
              exchangeRate={EXCHANGE_RATE}
              onAddProduct={(product) => products.push(product)}
            />
          </div>
        </section>

        <section className="panel">
          <div className="space-y-6">
            {/* <SearchBar 
              value={searchTerm}
              onChange={(newValue: string) => setSearchTerm(newValue)}
            /> */}
            <ProductFilters
              values={filters}
              onFilterChange={(key, value) =>
                setFilters((current) => ({
                  ...current,
                  [key]: value,
                }))
              }
            />
          </div>
        </section>

        <ProductTable 
          useProducts={useProducts}
          totalProducts={products.length}
          exchangeRate={EXCHANGE_RATE}
          onUpdateProduct={() => {}}
          onDeleteProduct={() => {}}
        />
      </div>
    </main>
  );
}
