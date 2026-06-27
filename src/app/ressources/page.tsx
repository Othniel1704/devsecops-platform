import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Ressources recommandées",
  description: "Outils et hébergeurs recommandés pour développeurs.",
};

const resources = [
  {
    name: "Hostinger",
    description: "Hébergement web abordable, bon point de départ pour un premier projet.",
    href: process.env.NEXT_PUBLIC_HOSTINGER_AFFILIATE_URL || "#",
  },
  {
    name: "Infomaniak",
    description: "Hébergeur basé en Europe, orienté confidentialité et conformité RGPD.",
    href: process.env.NEXT_PUBLIC_INFOMANIAK_AFFILIATE_URL || "#",
  },
];

export default function RessourcesPage() {
  return (
    <Container size="narrow" className="py-16">
      <h1 className="text-3xl font-bold text-slate-900">Ressources recommandées</h1>
      <p className="mt-2 text-slate-600">
        Une sélection courte d&apos;outils réellement utilisés, pas une liste
        à rallonge.
      </p>

      <div className="mt-8 rounded-lg bg-amber-50 p-4 text-sm text-amber-800">
        Certains liens ci-dessous sont des liens d&apos;affiliation : si tu
        achètes via ce lien, ce site touche une commission, sans coût
        supplémentaire pour toi.
      </div>

      <ul className="mt-8 space-y-4">
        {resources.map((r) => (
          <li key={r.name}>
            <Card>
              <div className="flex items-center justify-between">
                <a
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="font-semibold text-slate-900 hover:text-emerald-700"
                >
                  {r.name}
                </a>
                <Badge tone="amber">Lien d&apos;affiliation</Badge>
              </div>
              <p className="mt-2 text-sm text-slate-600">{r.description}</p>
            </Card>
          </li>
        ))}
      </ul>
    </Container>
  );
}
