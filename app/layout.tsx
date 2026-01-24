import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/components/Navbar/NavbarMain";
import Footer from "@/app/components/Footer/Footer";

export const metadata: Metadata = {
  title: "Coom Endem — Organic Products for Health & Nature Care",
  description: "Discover fresh, natural and certified organic products for your health. Coom Endem offers eco-friendly solutions that care for your body and the planet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
