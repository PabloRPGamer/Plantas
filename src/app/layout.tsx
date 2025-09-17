import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Plantas comunes en España",
  description: "Mapa interactivo con plantas típicas por región",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          backgroundColor: "#fff",
          color: "#000",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
