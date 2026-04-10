import { createClient } from "@/lib/supabase/client";
import type { Product, ProductFormData } from "@/features/types/product-types";

const PRODUCTS_TABLE = "productos";

type SupabaseProductRow = {
  id?: number | string;
  cod_prov?: string;
  proveedor?: string;
  codigo?: string;
  tipo?: string;
  marca?: string;
  unidad?: string;
  descripcion?: string;
  tipo_conexion?: string;
  pot_maxima?: number;
  mppt?: number;
  dod?: number;
  array_mppt?: number;
  voc?: number;
  vmpp?: number;
  isc?: number;
  impp?: number;
  precio_soles?: number;
  precio_dolares?: number;
  igv?: number;
};

// Map Supabase row to Product type
function mapSupabaseRowToProduct(row: SupabaseProductRow): Product {
  return {
    id: row.id?.toString() || "",
    supplierCode: row.cod_prov || "",
    supplier: row.proveedor || "",
    code: row.codigo || "",
    type: row.tipo || "",
    brand: row.marca || "",
    unit: row.unidad || "",
    description: row.descripcion || "",
    connectionType: row.tipo_conexion || "",
    maxPower: row.pot_maxima?.toString() || "",
    mpptNumber: row.mppt?.toString() || "",
    dod: row.dod?.toString() || "",
    arraysPerMppt: row.array_mppt?.toString() || "",
    voc: row.voc?.toString() || "",
    vmpp: row.vmpp?.toString() || "",
    isc: row.isc?.toString() || "",
    impp: row.impp?.toString() || "",
    priceInputCurrency: "PEN",
    pricePen: row.precio_soles || 0,
    priceUsd: row.precio_dolares || 0,
    igv: row.igv || 0,
  };
}

// Map Product form data to Supabase row format
function mapProductToSupabaseRow(product: ProductFormData): SupabaseProductRow {
  return {
    cod_prov: product.supplierCode,
    proveedor: product.supplier,
    codigo: product.code,
    tipo: product.type,
    marca: product.brand,
    unidad: product.unit,
    descripcion: product.description,
    tipo_conexion: product.connectionType,
    pot_maxima: Number(product.maxPower) || undefined,
    mppt: Number(product.mpptNumber) || undefined,
    dod: Number(product.dod) || undefined,
    array_mppt: Number(product.arraysPerMppt) || undefined,
    voc: Number(product.voc) || undefined,
    vmpp: Number(product.vmpp) || undefined,
    isc: Number(product.isc) || undefined,
    impp: Number(product.impp) || undefined,
    precio_soles: product.pricePen,
    precio_dolares: product.priceUsd,
    igv: product.igv,
  };
}

export async function createProduct(product: ProductFormData): Promise<Product> {
  const supabase = createClient();
  const supabaseRow = mapProductToSupabaseRow(product);

  const { data, error } = await supabase
    .from(PRODUCTS_TABLE)
    .insert(supabaseRow)
    .select()
    .single();

  if (error) {
    throw new Error(`Error al crear el producto: ${error.message}`);
  }

  return mapSupabaseRowToProduct(data);
}

export async function getProducts(): Promise<Product[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from(PRODUCTS_TABLE)
    .select("*");

  if (error) {
    throw new Error(`Error al obtener los productos: ${error.message}`);
  }

  return data.map(mapSupabaseRowToProduct);
}

export async function getProductById(id: string): Promise<Product> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from(PRODUCTS_TABLE)
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(`Error al obtener el producto: ${error.message}`);
  }

  return mapSupabaseRowToProduct(data);
}

export async function updateProduct(id: string, product: ProductFormData): Promise<Product> {
  const supabase = createClient();
  const supabaseRow = mapProductToSupabaseRow(product);

  const { data, error } = await supabase
    .from(PRODUCTS_TABLE)
    .update(supabaseRow)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(`Error al actualizar el producto: ${error.message}`);
  }

  return mapSupabaseRowToProduct(data);
}

export async function deleteProduct(id: string): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase
    .from(PRODUCTS_TABLE)
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(`Error al eliminar el producto: ${error.message}`);
  }
}

export async function getProductFilterOptions(): Promise<{
  types: string[];
  brands: string[];
  suppliers: string[];
}> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from(PRODUCTS_TABLE)
    .select("type, brand, supplier");

  if (error) {
    throw new Error(`Error al obtener las opciones de filtrado: ${error.message}`);
  }

  const types = Array.from(new Set(data.map((item) => item.type)));
  const brands = Array.from(new Set(data.map((item) => item.brand)));
  const suppliers = Array.from(new Set(data.map((item) => item.supplier)));

  return { types, brands, suppliers };
}