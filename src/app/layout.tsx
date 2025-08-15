import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavbarComponent from "@/components/Navbar";
import Chatbot from "@/components/Chatbot";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.theaethongroup.com"),
  title: {
    default: "The Aethon Group – Branding, Strategy & Digital Growth Experts",
    template: "%s | The Aethon Group",
  },
  description:
    "The Aethon Group is a full-service branding, marketing, and digital strategy firm helping businesses build iconic brands, drive growth, and dominate their market.",
  keywords: [
    "The Aethon Group",
    "branding agency",
    "digital marketing",
    "business strategy",
    "web development",
    "SEO agency",
    "social media marketing",
    "marketing agency India",
    "brand building",
    "creative agency",
  ],
  authors: [{ name: "The Aethon Group", url: "https://www.theaethongroup.com" }],
  openGraph: {
    title: "The Aethon Group – Branding, Strategy & Digital Growth Experts",
    description:
      "From branding to full-scale marketing, The Aethon Group helps businesses grow smarter, faster, and bigger.",
    url: "https://www.theaethongroup.com",
    siteName: "The Aethon Group",
    images: [
      {
        url: "/Weblogo.png",
        width: 1200,
        height: 630,
        alt: "The Aethon Group Branding and Strategy",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@theaethongroup",
    creator: "@theaethongroup",
    title: "The Aethon Group – Branding, Strategy & Digital Growth Experts",
    description:
      "Helping brands scale with creativity, strategy, and data-driven marketing.",
    images: ["/Weblogo.png"],
  },
  alternates: {
    canonical: "https://www.theaethongroup.com",
  },
  category: "business",
   icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/Weblogo.png", type: "image/png", sizes: "32x32" },
      { url: "/icon1.png", type: "image/png", sizes: "16x16" },
      { url: "/icon0.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Extra SEO Tags */}
        <meta
          name="google-site-verification"
          content="your-google-verification-code"
        />
        <meta name="robots" content="index, follow" />
        <meta name="revisit-after" content="7 days" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-title" content="The Aethon Group" />

        {/* ✅ Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "The Aethon Group",
              url: "https://www.theaethongroup.com",
              logo: "https://www.theaethongroup.com/Weblogo.png",
              sameAs: [
                "https://www.facebook.com/theaethongroup",
                "https://www.instagram.com/theaethongroup",
                "https://www.linkedin.com/company/theaethongroup",
              ],
              description:
                "The Aethon Group is a full-service branding, marketing, and digital strategy firm helping businesses build iconic brands, drive growth, and dominate their market.",
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <div className="relative">
          <div className="absolute top-6 left-0 w-full z-50">
            <NavbarComponent />
            <Chatbot mode="manual" />
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
