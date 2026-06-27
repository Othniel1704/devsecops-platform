import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevSecOps & AI-Driven Development",
  description:
    "Coder vite avec l'IA, sans sacrifier la sécurité ni la conformité.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="font-sans">
        <header className="border-b border-gray-200">
          <nav className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
            <Link href="/" className="font-semibold">
              DevSecOps & AI
            </Link>
            <div className="flex gap-6 text-sm">
              <Link href="/blog">Blog</Link>
              <Link href="/tools">Outils</Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-4xl px-4 py-10">{children}</main>
        <footer className="mx-auto max-w-4xl px-4 py-10 text-sm text-gray-500">
          DevSecOps & AI-Driven Development
        </footer>
      </body>
    </html>
  );
}
