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
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  let title = "LENTONE | Premium Hospitality & Cleaning Solutions";
  let favicon = "/favicon.ico";
  let description = "Indian manufacturer of premium-quality hospitality amenities and cleaning solutions serving hotels, restaurants, offices, and commercial businesses.";
  let keywords = "";

  try {
    const titleSnap = await getDoc(doc(db, "pageContent", "global_tab_title"));
    if (titleSnap.exists()) {
      title = titleSnap.data().content || title;
    } else {
      const seoSnap = await getDoc(doc(db, "seo", "home"));
      if (seoSnap.exists()) {
        title = seoSnap.data().title || title;
        description = seoSnap.data().description || description;
        keywords = seoSnap.data().keywords || keywords;
      }
    }

    const faviconSnap = await getDoc(doc(db, "pageContent", "global_favicon"));
    if (faviconSnap.exists() && faviconSnap.data().content) {
      favicon = faviconSnap.data().content;
    }
  } catch (error) {
    console.error("Error generating layout metadata:", error);
  }

  return {
    title,
    description,
    keywords,
    icons: {
      icon: favicon,
    }
  };
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
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
