import type { Metadata } from "next";
import "./globals.css";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Dólar a Peso Chileno - Conversor de Divisas",
  description: "Convierte dólares a pesos chilenos de forma rápida y precisa con el mejor conversor de divisas en línea.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Dólar a Peso Chileno - Conversor de Divisas" />
        <meta property="og:description" content="Convierte dólares a pesos chilenos con precisión y rapidez en nuestro conversor de divisas en línea." />
        <meta property="og:image" content="/iconGrid.svg" />
        <meta property="og:url" content="https://tuweb.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Conversor de Divisas",
            "description": "Convierte divisas de forma fácil y precisa.",
            "url": "https://tuweb.com/",
          })}
        </script>
      </Head>
      <body>{children}</body>
    </html>
  );
}
