import Link from "next/link";
import Logo from "./Logo";

const links = [
  { href: "/blog", label: "Blog" },
  { href: "/tools", label: "Outils" },
  { href: "/boilerplate", label: "Boilerplate" },
  { href: "/ressources", label: "Ressources" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/">
          <Logo />
        </Link>
        <nav className="flex items-center gap-5 text-sm font-medium text-slate-600">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-emerald-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
