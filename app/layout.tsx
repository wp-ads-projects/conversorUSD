import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Head from "next/head";
import { GoogleTagManager, GoogleAnalytics  } from '@next/third-parties/google'

export const metadata = {
  title: "Conversor Dólar a Peso Chileno | Tipo de Cambio Actualizado",
  description:
    "Convierte dólares a pesos chilenos con nuestro conversor de divisas. Tipo de cambio actualizado entre Dólar (USD) y Peso Chileno (CLP).",
  url: "https://conversor-sand.vercel.app/",
  image: "/opengraph.png",
  twitterHandle: "@tu_usuario_twitter",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: metadata.title,
    description: metadata.description,
    url: metadata.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${metadata.url}?cantidad={cantidad}`,
      "query-input": "required name=cantidad",
    },
  };

  return (
    <html lang="es">
      <Head>
        {/* Metadatos principales */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="robots" content="index, follow" />

        {/* Canonical */}
        <link rel="canonical" href={metadata.url} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={metadata.url} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.image} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={metadata.twitterHandle} />
        <meta name="twitter:creator" content={metadata.twitterHandle} />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.image} />
      </Head>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || ''} />
      <body>
        {children}
        <Analytics />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </body>
    </html>
  );
}
