import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA/WhatsAppCTA";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  preload: false,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  preload: false,
});

import { unstable_cache } from "next/cache";

const getCachedGlobalTabTitle = unstable_cache(
  async () => {
    const titleSnap = await getDoc(doc(db, "pageContent", "global_tab_title"));
    return titleSnap.exists() ? titleSnap.data() : null;
  },
  ["global_tab_title"],
  { revalidate: 3600, tags: ["content"] }
);

const getCachedGlobalFavicon = unstable_cache(
  async () => {
    const faviconSnap = await getDoc(doc(db, "pageContent", "global_favicon"));
    return faviconSnap.exists() ? faviconSnap.data() : null;
  },
  ["global_favicon"],
  { revalidate: 3600, tags: ["content"] }
);

const getCachedSEOHome = unstable_cache(
  async () => {
    const seoSnap = await getDoc(doc(db, "seo", "home"));
    return seoSnap.exists() ? seoSnap.data() : null;
  },
  ["seo_home"],
  { revalidate: 3600, tags: ["seo"] }
);

export async function generateMetadata(): Promise<Metadata> {
  let title = "LENTONE | Premium Hospitality & Cleaning Solutions";
  let favicon = "/favicon.ico";
  let description =
    "Indian manufacturer of premium-quality hospitality amenities and cleaning solutions serving hotels, restaurants, offices, and commercial businesses.";
  let keywords =
    "hospitality amenities, commercial cleaning products, hotel supplies, private label manufacturer India";

  try {
    const titleData = await getCachedGlobalTabTitle();
    if (titleData && titleData.content) {
      title = titleData.content;
    } else {
      const seoData = await getCachedSEOHome();
      if (seoData) {
        title = seoData.title || title;
        description = seoData.description || description;
        keywords = seoData.keywords || keywords;
      }
    }

    const faviconData = await getCachedGlobalFavicon();
    if (faviconData && faviconData.content && !faviconData.content.startsWith("data:")) {
      favicon = faviconData.content;
    }
  } catch (error) {
    console.error("Error generating layout metadata:", error);
  }

  return {
    metadataBase: new URL("https://www.lentone.in"),
    title,
    description,
    keywords,
    icons: {
      icon: [
        { url: favicon, sizes: "any" },
        { url: "/icon-48x48.png", sizes: "48x48", type: "image/png" },
        { url: "/icon-96x96.png", sizes: "96x96", type: "image/png" },
        { url: "/icon-144x144.png", sizes: "144x144", type: "image/png" },
        { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
        { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
      ],
      shortcut: favicon,
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    openGraph: {
      title,
      description,
      url: "https://www.lentone.in",
      siteName: "LENTONE",
      images: [
        {
          url: "/logo.png",
          width: 500,
          height: 500,
          alt: "LENTONE Brand Logo",
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    manifest: "/manifest.webmanifest",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon-48x48.png" sizes="48x48" type="image/png" />
        <link rel="icon" href="/icon-96x96.png" sizes="96x96" type="image/png" />
        <link rel="icon" href="/icon-192x192.png" sizes="192x192" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" type="image/png" />
      </head>
      <body className={`${playfair.variable} ${inter.variable}`}>
        <Header />
        <main style={{ minHeight: "calc(100vh - 400px)" }}>
          {children}
        </main>
        <Footer />
        <WhatsAppCTA />
      </body>
    </html>
  );
}
