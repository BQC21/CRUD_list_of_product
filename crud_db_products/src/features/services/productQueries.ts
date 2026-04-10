import { createClient } from "@/lib/supabase/client";
import type { Product, ProductFormData } from "@/features/types/product-types";
import { mapSupabaseRowToProduct, mapProductToSupabaseRow } from "./mapping";

const PRODUCTS_TABLE = "productos";



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