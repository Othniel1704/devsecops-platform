import Link from "next/link";
import Newsletter from "@/components/Newsletter";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getAllPosts } from "@/lib/posts";

const tools = [
  {
    href: "/tools/rgpd-generator",
    title: "Générateur RGPD",
    description: "Génère une politique de confidentialité pour un MVP en 2 minutes.",
    status: "Disponible",
  },
  {
    href: "/tools/security-scanner",
    title: "Scanner de headers",
    description: "Vérifie les headers de sécurité HTTP d'une URL publique.",
    status: "Disponible",
  },
  {
    href: "/tools/prompt-assistant",
    title: "Assistant de prompt",
    description: "Génère du code suivant des templates sécurisés via une API LLM.",
    status: "Disponible",
  },
];

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <Container className="space-y-20 py-16">
      <section className="text-center">
        <Badge>Sécurité · IA · Conformité RGPD</Badge>
        <h1 className="mx-auto mt-4 max-w-2xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Coder vite avec l&apos;IA, en restant sécurisé et conforme
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600">
          Guides pratiques, micro-outils gratuits et templates pour développeurs
          qui veulent livrer vite sans sacrifier la sécurité ni la conformité
          RGPD/OWASP.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href="/blog">Lire le blog</Button>
          <Button href="/tools" variant="secondary">
            Voir les outils
          </Button>
        </div>
      </section>

      <section>
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-semibold text-slate-900">Micro-outils gratuits</h2>
          <Link href="/tools" className="text-sm font-medium text-emerald-700 hover:text-emerald-800">
            Tout voir →
          </Link>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href}>
              <Card className="h-full">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900">{tool.title}</h3>
                  <Badge tone="slate">{tool.status}</Badge>
                </div>
                <p className="mt-2 text-sm text-slate-600">{tool.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {posts.length > 0 && (
        <section>
          <div className="flex items-baseline justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Derniers articles</h2>
            <Link href="/blog" className="text-sm font-medium text-emerald-700 hover:text-emerald-800">
              Tout voir →
            </Link>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="h-full">
                  <p className="text-xs text-slate-400">{post.date}</p>
                  <h3 className="mt-1 font-semibold text-slate-900">{post.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{post.description}</p>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Newsletter />
    </Container>
  );
}
