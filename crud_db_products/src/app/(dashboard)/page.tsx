"use client";

import { useState } from "react";
// import { SearchBar } from "@/features/components/SearchBar";
import { ProductFilters, type ProductFilterValues } from "@/features/components/ProductFilters";
import { ProductTable } from "@/features/components/ProductTable";
import Button2Modal from "@/app/components/Buttons/button2modal";
import { useProductMutations, useProducts } from "@/features/hooks/useRealtimeProducts";
import type { Product, ProductFormData } from "@/features/types/product-types";
import { current_converter } from "@/features/hooks/useAPIFrankfurter";

const EXCHANGE_RATE = (current_converter("PEN", "USD", 10) as number | undefined) ?? 10; // tasa de cambio fija para conversión PEN-USD

export default function Page() {
  const { products, refetch } = useProducts();
  const { create, update, remove } = useProductMutations();
  const [filters, setFilters] = useState<ProductFilterValues>({
    type: "",
    brand: "",
    supplier: "",
  });
  // const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesType = !filters.type || product.type === filters.type;
    const matchesBrand = !filters.brand || product.brand === filters.brand;
    const matchesSupplier = !filters.supplier || product.supplier === filters.supplier;

    return matchesType && matchesBrand && matchesSupplier;
  });

  async function handleAddProduct(product: ProductFormData) {
    await create(product);
    await refetch();
  }

  async function handleUpdateProduct(updatedProduct: Product) {
    const { id, ...productData } = updatedProduct;
    await update(id, productData);
    await refetch();
  }

  async function handleDeleteProduct(productId: string) {
    await remove(productId);
    await refetch();
  }

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
              onAddProduct={handleAddProduct}
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
          products={filteredProducts}
          totalProducts={products.length}
          exchangeRate={EXCHANGE_RATE}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
        />
      </div>
    </main>
  );
}
