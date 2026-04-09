"use client";

import { useMemo, useState } from "react";
import { AddProductCloseIcon } from "@/app/components/AddProductCloseIcon";
import { AddProductNumberField } from "@/app/components/AddProductNumberField";
import { AddProductRadioField } from "@/app/components/AddProductRadioField";
import { AddProductReadonlyField } from "@/app/components/AddProductReadonlyField";
import { AddProductSectionTitle } from "@/app/components/AddProductSectionTitle";
import { AddProductSelectField } from "@/app/components/AddProductSelectField";
import { AddProductTextAreaField } from "@/app/components/AddProductTextAreaField";
import { AddProductTextField } from "@/app/components/AddProductTextField";
import type { CurrencyCode, Product } from "@/features/components/product-types";

// --- Tipo de variables ---
type AddProductModalProps = {
  exchangeRate: number;
  onAddProduct: (product: Product) => void;
  onClose: () => void;
};

type ProductFormState = Omit<Product, "id">;

// --- Opciones para llenar los campos ---
const SUPPLIER_OPTIONS = ["Andet SAC", "Sigelet SAC", "AutoSolar SAC", "Novum Solar SAC",
                          "Caral Energía SAC", "Felicity SAC", "RE&GE Import", "Grupo Coinp", "Proyect and Quality"
];
const SUPPLIER_CODE_OPTIONS = ["ANDE", "SIGE", "AUTO", "NOVU", "CARA", "FELI", 
                                "REGE", "COIN", "PROY"];
const PRODUCT_TYPE_OPTIONS = ["Accesorio", "Batería", "Controlador", "Convertidor", "Datalogger", "Estructura",
                              "Inversor", "Módulo", "Monitor", "Smart Meter", "Cable", "Protección", "MC4"];
const BRAND_OPTIONS = ["LIVOLTEK", "GOODWE", "JA SOLAR", "INVT", "PYLONTECH", "VICTRON", "TELPERION",
                        "JINKO", "SOLIS", "SOLUNA", "TRINA", "FELICITY", "SUNTREE", "TIBOX",
                        "CHINT", "INDECO", "SCHNEIDER", "ABB"];
const UNIT_OPTIONS = ["Unidad", "Metros"];
const CONNECTION_TYPE_OPTIONS = ["1F 220V", "3F 220V", "3F 380V", "1F", "3F"];

// --- Contenido para llenar la lista de productos  ---
const INITIAL_FORM: ProductFormState = {
  supplier: SUPPLIER_OPTIONS[0],
  supplierCode: SUPPLIER_CODE_OPTIONS[0],
  code: "",
  type: PRODUCT_TYPE_OPTIONS[0],
  brand: BRAND_OPTIONS[0],
  unit: UNIT_OPTIONS[0],
  description: "",
  connectionType: CONNECTION_TYPE_OPTIONS[0],
  maxPower: "",
  mpptNumber: "1",
  dod: "80",
  arraysPerMppt: "1",
  voc: "400",
  vmpp: "375",
  isc: "10",
  impp: "9.5",
  priceInputCurrency: "PEN",
  pricePen: 0,
  priceUsd: 0,
  igv: 18,
};

function formatReadonlyCurrency(symbol: string, value: number) {
  return `${symbol} ${value.toFixed(2)}`;
}

//////////////////////////////7

export function AddProductModal({ exchangeRate, onAddProduct, onClose }: AddProductModalProps) {
  const [form, setForm] = useState<ProductFormState>(INITIAL_FORM);

  // Calcular cambios de precios
  const computedPrices = useMemo(() => {
    const basePen = form.priceInputCurrency === "PEN" ? form.pricePen : form.priceUsd * exchangeRate;
    const baseUsd = form.priceInputCurrency === "USD" ? form.priceUsd : form.pricePen / exchangeRate;
    const igvFactor = 1 + form.igv / 100;

    return {
      pricePen: Number.isFinite(basePen) ? basePen : 0,
      priceUsd: Number.isFinite(baseUsd) ? baseUsd : 0,
      totalPen: Number.isFinite(basePen) ? basePen * igvFactor : 0,
      totalUsd: Number.isFinite(baseUsd) ? baseUsd * igvFactor : 0,
    };
  }, [exchangeRate, form.igv, form.priceInputCurrency, form.pricePen, form.priceUsd]);

  function updateField<K extends keyof ProductFormState>(field: K, value: ProductFormState[K]) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  // Cambiar la modalidad base de precios
  function handleCurrencyModeChange(currency: CurrencyCode) {
    setForm((current) => ({
      ...current,
      priceInputCurrency: currency,
      pricePen: currency === "PEN" ? current.pricePen : current.priceUsd * exchangeRate,
      priceUsd: currency === "USD" ? current.priceUsd : current.pricePen / exchangeRate,
    }));
  }

  // Aceptar insercion
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onAddProduct({
      id: crypto.randomUUID(),
      ...form,
      pricePen: Number(computedPrices.pricePen.toFixed(2)),
      priceUsd: Number(computedPrices.priceUsd.toFixed(2)),
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="max-h-[95vh] w-full max-w-7xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <h2 className="text-2xl font-bold text-slate-900">Añadir Nuevo Producto</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Cerrar modal"
          >
            <AddProductCloseIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="max-h-[calc(95vh-88px)] overflow-y-auto px-6 py-6">
          <div className="space-y-8">
            <section className="space-y-5">
              <AddProductSectionTitle title="Información Básica" />
              <div className="grid gap-5 md:grid-cols-2">
                <AddProductSelectField
                  label="Proveedor"
                  required
                  value={form.supplier}
                  options={SUPPLIER_OPTIONS}
                  onChange={(value) => updateField("supplier", value)}
                />
                <AddProductTextField
                  label="Código Proveedor"
                  value={form.supplierCode}
                  onChange={(value) => updateField("supplierCode", value)}
                />
                <AddProductTextField
                  label="Código del Producto"
                  required
                  placeholder="PANEL-450-MONO"
                  value={form.code}
                  onChange={(value) => updateField("code", value)}
                />
                <AddProductSelectField
                  label="Tipo de Producto"
                  required
                  value={form.type}
                  options={PRODUCT_TYPE_OPTIONS}
                  onChange={(value) => updateField("type", value)}
                />
                <AddProductSelectField
                  label="Marca"
                  required
                  value={form.brand}
                  options={BRAND_OPTIONS}
                  onChange={(value) => updateField("brand", value)}
                />
                <AddProductSelectField
                  label="Unidad"
                  required
                  value={form.unit}
                  options={UNIT_OPTIONS}
                  onChange={(value) => updateField("unit", value)}
                />
                <div className="md:col-span-2">
                  <AddProductTextAreaField
                    label="Descripción"
                    required
                    placeholder="Descripción detallada del producto"
                    value={form.description}
                    onChange={(value) => updateField("description", value)}
                  />
                </div>
              </div>
            </section>

            <section className="space-y-5">
              <AddProductSectionTitle title="Especificaciones Técnicas" />
              <div className="grid gap-5 md:grid-cols-2">
                <AddProductSelectField
                  label="Tipo de Conexión"
                  value={form.connectionType || CONNECTION_TYPE_OPTIONS[0]}
                  options={CONNECTION_TYPE_OPTIONS}
                  onChange={(value) => updateField("connectionType", value === CONNECTION_TYPE_OPTIONS[0] ? "" : value)}
                />
                <AddProductTextField
                  label="Potencia Máxima"
                  placeholder="5kW"
                  value={form.maxPower}
                  onChange={(value) => updateField("maxPower", value)}
                />
                <AddProductTextField
                  label="Número de MPPT"
                  placeholder="2"
                  value={form.mpptNumber}
                  onChange={(value) => updateField("mpptNumber", value)}
                />
                <AddProductTextField
                  label="DoD (Grado de degradación)"
                  placeholder="95%"
                  value={form.dod}
                  onChange={(value) => updateField("dod", value)}
                />
                <AddProductTextField
                  label="Arreglos por MPPT"
                  placeholder="2"
                  value={form.arraysPerMppt}
                  onChange={(value) => updateField("arraysPerMppt", value)}
                />
                <AddProductTextField
                  label="VOC (Voltaje máximo)"
                  placeholder="550V"
                  value={form.voc}
                  onChange={(value) => updateField("voc", value)}
                />
                <AddProductTextField
                  label="VMPP (Voltaje mínimo)"
                  placeholder="120V"
                  value={form.vmpp}
                  onChange={(value) => updateField("vmpp", value)}
                />
                <AddProductTextField
                  label="ISC (Corriente máxima entrada)"
                  placeholder="12.5A"
                  value={form.isc}
                  onChange={(value) => updateField("isc", value)}
                />
                <AddProductTextField
                  label="IMPP (Corriente máxima salida)"
                  placeholder="11.8A"
                  value={form.impp}
                  onChange={(value) => updateField("impp", value)}
                />
              </div>
            </section>

            <section className="space-y-5">
              <AddProductSectionTitle title="Información de Precios" />
              <div className="space-y-5">
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-slate-800">Ingresar precio en:</p>
                  <div className="flex flex-wrap gap-6">
                    <AddProductRadioField
                      label="Soles (S/.)"
                      checked={form.priceInputCurrency === "PEN"}
                      onChange={() => handleCurrencyModeChange("PEN")}
                    />
                    <AddProductRadioField
                      label="Dólares ($)"
                      checked={form.priceInputCurrency === "USD"}
                      onChange={() => handleCurrencyModeChange("USD")}
                    />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <AddProductNumberField
                    label="Precio (S/.)"
                    required
                    step="0.01"
                    min="0"
                    disabled={form.priceInputCurrency !== "PEN"}
                    value={form.priceInputCurrency === "PEN" ? form.pricePen : computedPrices.pricePen}
                    onChange={(value) => updateField("pricePen", value)}
                  />
                  <AddProductNumberField
                    label="Precio ($)"
                    required
                    step="0.01"
                    min="0"
                    disabled={form.priceInputCurrency !== "USD"}
                    value={form.priceInputCurrency === "USD" ? form.priceUsd : computedPrices.priceUsd}
                    onChange={(value) => updateField("priceUsd", value)}
                  />
                  <AddProductNumberField
                    label="IGV (%)"
                    required
                    step="0.01"
                    min="0"
                    value={form.igv}
                    onChange={(value) => updateField("igv", value)}
                  />
                  <div />
                  <AddProductReadonlyField
                    label="Precio + IGV (S/.)"
                    value={formatReadonlyCurrency("S/.", computedPrices.totalPen)}
                  />
                  <AddProductReadonlyField
                    label="Precio + IGV ($)"
                    value={formatReadonlyCurrency("$", computedPrices.totalUsd)}
                  />
                </div>
              </div>
            </section>
          </div>

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
              Añadir Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
