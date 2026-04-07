export interface Product {
    id: string;
    supplierCode: string;
    supplier: string;
    code: string;
    type: string;
    brand: string;
    description: string;
    connection: string;
    pot_maxima: number;
    mppt: number;
    dod: number;
    array_mppt: number;
    voc: number;
    vmpp: number;
    isc: number;
    impp: number;
    fuente_electrica: string;
    unit: string;
    igv: number;
    pricePen: number;
    priceUsd: number;
    pricePen_igv: number;
    priceUsd_igv: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface ProductFilters { // estado de los filtros
    search: string;
    type: string;
    brand: string;
    supplier: string;
}

export type ProductFormData = Omit<Product, "createdAt" | "updatedAt"> & { // datos para crear o actualizar un producto
    createdAt?: string;
    updatedAt?: string;
};

export interface ProductFilterOptions { // opciones de filtrado
    types: string[];
    brands: string[];
    suppliers: string[];
}

export interface ProductListResponse { // respuesta de la API para listar productos
    data: Product[];
    total: number;
}

export type ProductId = Product["id"];
