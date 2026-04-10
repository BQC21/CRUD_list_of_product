export type CurrencyCode = "PEN" | "USD";

export type Product = {
  id: string;
  supplier: string;
  supplierCode: string;
  code: string;
  type: string;
  brand: string;
  unit: string;
  description: string;
  connectionType: string;
  maxPower: string;
  mpptNumber: string;
  dod: string;
  arraysPerMppt: string;
  voc: string;
  vmpp: string;
  isc: string;
  impp: string;
  priceInputCurrency: CurrencyCode;
  pricePen: number;
  priceUsd: number;
  igv: number;
};

export type ProductFormData = Omit<Product, "id">;

export interface UseProductsResult {
    products: Product[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export type ProductFilterOptions = {
    types: string[];
    brands: string[];
    suppliers: string[];
};

export interface UseProductMutationsResult {
    loading: boolean;
    error: string | null;
    create: (product: ProductFormData) => Promise<Product>;
    update: (id: string, product: ProductFormData) => Promise<Product>;
    remove: (id: string) => Promise<void>;
}