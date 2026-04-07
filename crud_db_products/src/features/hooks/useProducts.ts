"use client";

import { useCallback, useEffect, useState } from "react";

import { getProducts, getProductFilterOptions } from "@/features/services/productQueries";
import type { Product, ProductFilterOptions } from "@/features/types/product";

interface UseProductsResult {
    products: Product[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export function useProducts(): UseProductsResult {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await getProducts();
            setProducts(data);
        } catch (err) {
            const message =
            err instanceof Error ? err.message : "Error al cargar los productos";

            setError(message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchProducts();
    }, [fetchProducts]);

    return {
        products,
        loading,
        error,
        refetch: fetchProducts,
    };
}

export function useProductFilterOptions() {
    const [options, setOptions] = useState<ProductFilterOptions>({
        types: [],
        brands: [],
        suppliers: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchOptions = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await getProductFilterOptions();
            setOptions(data);
        } catch (err) {
            const message =
            err instanceof Error ? err.message : "Error al cargar las opciones de filtro";

            setError(message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchOptions();
    }, [fetchOptions]);

    return {
        options,
        loading,
        error,
        refetch: fetchOptions,
    };
}   