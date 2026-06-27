import Link from "next/link";

const tools = [
  {
    href: "/tools/rgpd-generator",
    title: "Générateur de politique de confidentialité RGPD",
    status: "Disponible",
    description:
      "Génère une politique de confidentialité conforme pour un petit projet ou MVP.",
  },
  {
    href: "#",
    title: "Scanner de vulnérabilités (headers de sécurité)",
    status: "À venir",
    description:
      "Analyse passive des headers de sécurité HTTP d'une URL publique.",
  },
  {
    href: "#",
    title: "Assistant de prompt de code sécurisé",
    status: "À venir",
    description:
      "Génère du code suivant des templates sécurisés, via une API LLM.",
  },
];

export default function ToolsIndex() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Micro-outils</h1>
      <ul className="mt-6 space-y-4">
        {tools.map((tool) => (
          <li key={tool.title} className="rounded-md border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <Link href={tool.href} className="font-medium hover:underline">
                {tool.title}
              </Link>
              <span className="text-xs text-gray-500">{tool.status}</span>
            </div>
            <p className="mt-1 text-sm text-gray-600">{tool.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
