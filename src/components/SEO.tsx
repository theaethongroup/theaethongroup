// components/SEO.tsx
import Head from "next/head";

export default function SEO({ title, description, url, image }: any) {
  const siteName = "The Aethon Group";
  const defaultImage = "public/SplashLogo.png";

  return (
    <Head>
      <title>{title ? `${title} | ${siteName}` : siteName}</title>
      <meta name="description" content={description || "Premium Branding & Strategy Company"} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph */}
      <meta property="og:title" content={title || siteName} />
      <meta property="og:description" content={description || ""} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || ""} />
      <meta property="og:image" content={image || defaultImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || siteName} />
      <meta name="twitter:description" content={description || ""} />
      <meta name="twitter:image" content={image || defaultImage} />
    </Head>
  );
}
