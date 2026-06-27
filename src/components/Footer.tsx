import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-10 text-sm text-slate-500">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p>DevSecOps & AI-Driven Development — {new Date().getFullYear()}</p>
          <div className="flex gap-5">
            <Link href="/blog" className="hover:text-emerald-700">
              Blog
            </Link>
            <Link href="/tools" className="hover:text-emerald-700">
              Outils
            </Link>
            <Link href="/boilerplate" className="hover:text-emerald-700">
              Boilerplate
            </Link>
            <Link href="/ressources" className="hover:text-emerald-700">
              Ressources
            </Link>
          </div>
        </div>
        <p className="mt-4 text-xs text-slate-400">
          Les outils de ce site fournissent des points de départ informatifs et
          ne constituent pas un avis juridique ou un audit de sécurité complet.
        </p>
      </div>
    </footer>
  );
}
