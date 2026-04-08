import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Base de Datos de Productos",
  description: "Gestión de inventario para productos de energía solar fotovoltaica",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
