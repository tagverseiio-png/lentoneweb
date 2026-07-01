import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA/WhatsAppCTA";

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

export const metadata: Metadata = {
  title: "LENTONE | Premium Hospitality & Cleaning Solutions",
  description: "Indian manufacturer of premium-quality hospitality amenities and cleaning solutions serving hotels, restaurants, offices, and commercial businesses.",
};

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
