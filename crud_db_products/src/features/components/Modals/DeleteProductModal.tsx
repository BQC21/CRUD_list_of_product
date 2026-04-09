"use client";

import { useEffect, useMemo, useState } from "react";
import { AddProductCloseIcon } from "@/app/components/icons/AddProductCloseIcon";
import { AddProductReadonlyField } from "@/app/components/Form_fields/AddProductReadonlyField";
import type { Product } from "@/features/types/product-types";
import { createProductFormStateFromProduct, ProductFormState } from "@/utils/helpers";

// --- Tipo de variables ---
type DeleteProductModalProps = {
    product: Product;
    onDeleteProduct: (product: Product) => void;
    onClose: () => void;
};

export function DeleteProductModal({ product, onDeleteProduct, onClose }: DeleteProductModalProps) {

    const [form, setForm] = useState<ProductFormState>(() => createProductFormStateFromProduct(product));

    // Actualizar campos del formulario
    function updateField<K extends keyof ProductFormState>(field: K, value: ProductFormState[K]) {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    }

    // Aceptar actualizacion
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        onDeleteProduct({
            id: product.id,
            ...form,
        });

        onClose();
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
            <div className="max-h-[95vh] w-full max-w-7xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                <h2 className="text-2xl font-bold text-slate-900">Eliminar Producto</h2>
                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                    aria-label="Cerrar modal"
                >
                    <AddProductCloseIcon />
                </button>
            </div>
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                <p className="text-lg text-slate-500">
                    ¿Está seguro que desea eliminar el siguiente producto?
                </p>
            </div>
            <form onSubmit={handleSubmit} className="max-h-[calc(95vh-88px)] overflow-y-auto px-6 py-6">
                <AddProductReadonlyField
                    label="Código del producto"
                    value={product.code}    
                />
                <AddProductReadonlyField
                    label="Descripción del producto"
                    value={product.description} 
                />
                <div className="mt-8 flex justify-end gap-4 border-t border-slate-200 pt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl border border-slate-300 px-6 py-3 text-lg font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="rounded-xl bg-indigo-700 px-6 py-3 text-lg font-semibold text-white transition hover:bg-indigo-800"
                    >
                        Eliminar Producto
                    </button>
                </div>
            </form>
            </div>
        </div>
    );
}