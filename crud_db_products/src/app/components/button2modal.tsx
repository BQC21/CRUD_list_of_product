"use client";

import { useState } from "react";
import { AddProductModal } from "@/features/components/AddProductModal";
import type { Product } from "@/features/types/product-types";

type Button2ModalProps = {
    exchangeRate: number;
    onAddProduct: (product: Product) => void;
};

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

export default function Button2Modal({ exchangeRate, onAddProduct }: Button2ModalProps) {
    const [open, setOpen] = useState(false);

    return (
    <div>
        <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
            <PlusIcon />
            <span>Añadir Producto</span>
        </button>

        {open && (
            <AddProductModal
                exchangeRate={exchangeRate}
                onAddProduct={(product) => {
                    onAddProduct(product);
                    setOpen(false);
                }}
                onClose={() => setOpen(false)}
            />
        )}
    </div>
    );
}
