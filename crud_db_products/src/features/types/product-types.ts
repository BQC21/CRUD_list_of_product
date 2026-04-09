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
