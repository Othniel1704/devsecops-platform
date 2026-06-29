import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"),
  title: {
    default: "DevSecOps & AI-Driven Development",
    template: "%s · DevSecOps & AI",
  },
  description:
    "Coder vite avec l'IA, sans sacrifier la sécurité ni la conformité. Guides pratiques, micro-outils gratuits et templates pour développeurs.",
  openGraph: {
    title: "DevSecOps & AI-Driven Development",
    description:
      "Coder vite avec l'IA, sans sacrifier la sécurité ni la conformité.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="flex min-h-screen flex-col antialiased" style={{ position: "relative", zIndex: 1 }}>
        <Header />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
