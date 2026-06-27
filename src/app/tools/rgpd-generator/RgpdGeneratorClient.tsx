"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function RgpdGeneratorClient() {
  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [collectsCookies, setCollectsCookies] = useState(false);
  const [dataCollected, setDataCollected] = useState("");
  const [generated, setGenerated] = useState("");

  function generate() {
    const text = `Politique de confidentialité — ${companyName || "[Nom du projet]"}

Dernière mise à jour : ${new Date().toLocaleDateString("fr-FR")}

1. Données collectées
${companyName || "Ce site"} collecte les données suivantes : ${
      dataCollected || "[à préciser]"
    }.

2. Cookies
${
  collectsCookies
    ? "Ce site utilise des cookies."
    : "Ce site n'utilise pas de cookies de suivi."
}

3. Contact
Pour toute question relative à vos données personnelles, contactez : ${
      contactEmail || "[email de contact]"
    }.

4. Vos droits
Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de
suppression de vos données. Pour exercer ce droit, contactez-nous à l'adresse
ci-dessus.

⚠️ Ce document est un point de départ généré automatiquement, pas un avis
juridique. Faites-le valider par un professionnel avant publication.`;
    setGenerated(text);
  }

  function download() {
    const blob = new Blob([generated], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "politique-de-confidentialite.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Container size="narrow" className="py-16">
      <h1 className="text-2xl font-bold text-slate-900">
        Générateur de politique de confidentialité
      </h1>
      <p className="mt-2 text-slate-600">
        Remplis ce formulaire pour générer un point de départ. Tout reste dans
        ton navigateur — rien n&apos;est envoyé à un serveur. Ce n&apos;est pas
        un avis juridique.
      </p>

      <div className="mt-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Nom du projet
          </label>
          <input
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Email de contact
          </label>
          <input
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Données collectées
          </label>
          <input
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
            placeholder="ex: email, nom, adresse IP"
            value={dataCollected}
            onChange={(e) => setDataCollected(e.target.value)}
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={collectsCookies}
            onChange={(e) => setCollectsCookies(e.target.checked)}
          />
          Le site utilise des cookies
        </label>

        <Button onClick={generate}>Générer</Button>
      </div>

      {generated && (
        <div className="mt-8">
          <pre className="whitespace-pre-wrap rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            {generated}
          </pre>
          <Button onClick={download} variant="secondary" className="mt-4">
            Télécharger en .txt
          </Button>
        </div>
      )}
    </Container>
  );
}
