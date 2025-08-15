// components/BusinessSchema.tsx
import Head from "next/head";

export default function BusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "The Aethon Group",
    image: "https://theaethongroup.com/SplashLogo.png",
    "@id": "",
    url: "https://theaethongroup.com",
    telephone: "+91-7439315210",
    address: {
      "@type": "PostalAddress",
      streetAddress: "11/H/16, Moulana Md Ali Road,Khidirpur,Kolkata - 700023.",
      addressLocality: "Kolkata",
      addressRegion: "West Bengal",
      postalCode: "700023",
      addressCountry: "IN"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "22.5726",
      longitude: "88.3639"
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
        opens: "10:00",
        closes: "19:00"
      }
    ],
    sameAs: [
      "https://www.facebook.com/theaethongroup",
      "https://www.instagram.com/theaethongroup"
    ]
  };

  return (
    <Head>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Head>
  );
}
