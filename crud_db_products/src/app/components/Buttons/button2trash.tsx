"use client";

import { DeleteProductModal } from "@/features/components/Modals/DeleteProductModal";
import { TrashIcon } from "@/app/components/icons/TrashIcon";
import { useState } from "react";
import { Product } from "@/features/types/product-types";

type DeleteProductModalProps = {
    product: Product;
    onDeleteProduct: (product: Product) => void;
};

export function Button2Trash({ product, onDeleteProduct }: DeleteProductModalProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
        <button
            type="button"
            onClick={() => setOpen(true)}
            className="table-icon-button text-indigo-600"
            title="Eliminar producto"
        >
            <TrashIcon />
        </button>

        {open && (
            <DeleteProductModal
                product={product}
                onDeleteProduct={(product) => {
                    onDeleteProduct(product);
                    setOpen(false);
                }}
                onClose={() => setOpen(false)}
            />
        )}
        </>
    );
}