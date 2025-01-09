/* import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "Valor Dólar a Peso Chileno | Cambio de Dólares a Pesos chilenos actualizado",
  description:
    "Convierte dólares a pesos chilenos con nuestro conversor de divisas. Tipo de cambio actualizado entre Dólar (USD) y Peso Chileno (CLP)",
  openGraph: {
    title: "Dólar a Peso Chileno - Conversor de Divisas",
    description:
      "Convierte dólares a pesos chilenos con precisión y rapidez en nuestro conversor de divisas en línea.",
    url: "https://dolar-valor.cl/",
    images: ["/iconGrid.svg"],
    type: "website",
    locale: "es_CL",
  },
  alternates: {
    canonical: "https://dolar-valor.cl/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        {children}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Convertidor de Dólar a Peso Chileno",
            description:
              "Convierte dólares (USD) a pesos chilenos (CLP) de forma rápida y precisa con nuestro convertidor online. Tipo de cambio actualizado en tiempo real.",
            url: "https://dolar-valor.cl/",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://dolar-valor.cl/?valor={valor}",
              "query-input": "required name=valor",
            },
          })}
        </script>
      </body>
    </html>
  );
}
 */

import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Convertidor Dólar a Peso Chileno | Tipo de Cambio Actualizado",
  description:
    "Convierte dólares a pesos chilenos con nuestro conversor de divisas. Tipo de cambio actualizado entre Dólar (USD) y Peso Chileno (CLP)",
  metadataBase: new URL("https://dolar-valor.cl"),
  alternates: {
    canonical: "https://dolar-valor.cl/",
    languages: {
      "es-CL": "https://dolar-valor.cl/",
    },
  },
  openGraph: {
    title: "Convertidor Dólar a Peso Chileno | Tipo de Cambio Actualizado",
    description:
      "Convierte dólares a pesos chilenos con nuestro conversor de divisas. Tipo de cambio actualizado entre Dólar (USD) y Peso Chileno (CLP)",
    url: "https://dolar-valor.cl/",
    images: [
      {
        url: "https://dolar-valor.cl/OG.webpp",
        alt: "Sitio web Convertidor de Dólar a Peso Chileno",
      },
    ],
    type: "website",
    locale: "es_CL",
    siteName: "Dólar Valor",
  },
  twitter: {
    card: "summary_large_image",
    site: "@tu_usuario_twitter", // Reemplazar con tu usuario
    creator: "@tu_usuario_twitter", // Reemplazar con tu usuario
    title: "Dólar a Peso Chileno - Conversor de Divisas",
    description:
      "Convierte dólares a pesos chilenos con nuestro conversor de divisas. Tipo de cambio actualizado entre Dólar (USD) y Peso Chileno (CLP)",
    images: {
      url: "https://dolar-valor.cl/OG.webp",
      alt: "Sitio web Convertidor de Dólar a Peso Chileno",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Convertidor Dólar a Peso Chileno | Tipo de Cambio Actualizado",
    description:
      "Convierte dólares a pesos chilenos con nuestro conversor de divisas. Tipo de cambio actualizado entre Dólar (USD) y Peso Chileno (CLP)",
    url: "https://dolar-valor.cl/",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://dolar-valor.cl/?cantidad={cantidad}",
      "query-input": "required name=cantidad",
    },
  };

  return (
    <html lang="es">
      <body>
        {children}
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </body>
    </html>
  );
}
