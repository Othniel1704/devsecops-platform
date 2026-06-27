---
title: "Headers de sécurité HTTP expliqués (CSP, HSTS...)"
date: "2026-07-15"
description: "Ce que font réellement les principaux headers de sécurité HTTP, et comment vérifier les tiens en quelques secondes."
---

Les headers de sécurité HTTP sont l'un des moyens les moins coûteux de
réduire la surface d'attaque d'un site. Voici ce que font les plus
importants.

## Content-Security-Policy (CSP)

Définit quelles sources de scripts, styles et images le navigateur a le
droit de charger. C'est la meilleure défense contre les attaques XSS : même
si un attaquant injecte un script, le navigateur refuse de l'exécuter s'il
ne vient pas d'une source autorisée.

## Strict-Transport-Security (HSTS)

Force le navigateur à toujours utiliser HTTPS pour ce domaine, même si
l'utilisateur tape `http://` ou clique sur un vieux lien. Évite les attaques
de type "downgrade" vers une connexion non chiffrée.

## X-Frame-Options

Empêche ton site d'être chargé dans une `<iframe>` sur un autre domaine —
la protection de base contre le "clickjacking" (faire cliquer un utilisateur
sur un bouton invisible superposé à ton interface).

## X-Content-Type-Options

Avec la valeur `nosniff`, empêche le navigateur de "deviner" le type d'un
fichier différent de celui déclaré par le serveur. Réduit certains vecteurs
d'exécution de fichiers déguisés.

## Referrer-Policy

Contrôle quelles informations sont envoyées dans l'en-tête `Referer` quand un
utilisateur clique vers un autre site — utile pour ne pas fuiter des URLs
internes ou des tokens présents dans l'URL.

## Vérifier les tiens

Plutôt que de vérifier chaque header à la main, le
[scanner de headers](/tools/security-scanner) de ce site fait une requête
passive sur l'URL de ton choix et indique lesquels sont présents.

## Les ajouter sur un projet Next.js

```js
// next.config.mjs
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
];

export default {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};
```

Quelques lignes de configuration, et la majorité des recommandations de
base sont couvertes.
