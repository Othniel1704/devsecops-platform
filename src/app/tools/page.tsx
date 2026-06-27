import Link from "next/link";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Micro-outils",
  description:
    "Trois micro-outils gratuits pour développeurs : génération RGPD, scan de headers de sécurité, assistant de prompt sécurisé.",
};

const tools = [
  {
    href: "/tools/rgpd-generator",
    title: "Générateur de politique de confidentialité RGPD",
    description:
      "Génère une politique de confidentialité conforme pour un petit projet ou MVP.",
  },
  {
    href: "/tools/security-scanner",
    title: "Scanner de vulnérabilités (headers de sécurité)",
    description:
      "Analyse passive des headers de sécurité HTTP d'une URL publique.",
  },
  {
    href: "/tools/prompt-assistant",
    title: "Assistant de prompt de code sécurisé",
    description:
      "Génère du code suivant des templates sécurisés, via une API LLM.",
  },
];

export default function ToolsIndex() {
  return (
    <Container className="py-16">
      <h1 className="text-3xl font-bold text-slate-900">Micro-outils</h1>
      <p className="mt-2 text-slate-600">
        Gratuits, utilisables sans compte. Tous les résultats restent dans ton navigateur sauf mention contraire.
      </p>
      <ul className="mt-10 grid gap-5 sm:grid-cols-3">
        {tools.map((tool) => (
          <li key={tool.title}>
            <Link href={tool.href}>
              <Card className="h-full">
                <Badge>Disponible</Badge>
                <h2 className="mt-3 font-semibold text-slate-900">{tool.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{tool.description}</p>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
