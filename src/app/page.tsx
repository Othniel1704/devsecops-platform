import Link from "next/link";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-3xl font-bold tracking-tight">
          Coder vite avec l'IA, en restant sécurisé et conforme
        </h1>
        <p className="mt-4 text-gray-600">
          Guides pratiques, micro-outils gratuits et templates pour développeurs
          qui veulent livrer vite sans sacrifier la sécurité ni la conformité
          RGPD/OWASP.
        </p>
        <div className="mt-6 flex gap-4">
          <Link
            href="/blog"
            className="rounded-md bg-black px-4 py-2 text-white"
          >
            Lire le blog
          </Link>
          <Link
            href="/tools"
            className="rounded-md border border-gray-300 px-4 py-2"
          >
            Voir les outils
          </Link>
        </div>
      </section>
      <Newsletter />
    </div>
  );
}
