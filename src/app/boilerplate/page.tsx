import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Newsletter from "@/components/Newsletter";

export const metadata: Metadata = {
  title: "Boilerplate Next.js + Supabase",
  description:
    "Starter de production Next.js + Supabase avec authentification, sécurité et conformité RGPD déjà configurées.",
};

const features = [
  "Next.js (App Router) + TypeScript + Tailwind, prêt pour la production",
  "Authentification Supabase préconfigurée (email + magic link)",
  "Headers de sécurité (CSP, HSTS, X-Frame-Options...) déjà en place",
  "Politique de confidentialité et bannière cookies de base incluses",
  "Capture d'emails connectée à une table Supabase",
  "Structure de blog en Markdown prête à l'emploi",
];

const checkoutUrl = process.env.NEXT_PUBLIC_CHECKOUT_URL;

export default function BoilerplatePage() {
  return (
    <Container size="narrow" className="py-16">
      <Badge>Boilerplate</Badge>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">
        Starter Next.js + Supabase, sécurisé et conforme RGPD
      </h1>
      <p className="mt-4 text-slate-600">
        Le même niveau d&apos;exigence que ce site, packagé pour démarrer un
        nouveau projet en quelques minutes plutôt qu&apos;en quelques jours.
      </p>

      <Card className="mt-8">
        <ul className="space-y-3">
          {features.map((f) => (
            <li key={f} className="flex gap-3 text-sm text-slate-700">
              <span className="mt-0.5 text-emerald-600">✓</span>
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
          <div>
            <p className="text-2xl font-bold text-slate-900">49€</p>
            <p className="text-xs text-slate-500">Paiement unique, mises à jour incluses</p>
          </div>
          {checkoutUrl ? (
            <Button href={checkoutUrl}>Acheter</Button>
          ) : (
            <Badge tone="amber">Bientôt disponible</Badge>
          )}
        </div>
      </Card>

      {!checkoutUrl && (
        <div className="mt-8">
          <Newsletter
            source="boilerplate-waitlist"
            title="Sois prévenu·e à la sortie"
            subtitle="Le boilerplate n'est pas encore en vente — inscris-toi pour être averti·e dès qu'il est disponible."
            buttonLabel="Me prévenir"
          />
        </div>
      )}
    </Container>
  );
}
