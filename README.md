# DevSecOps & AI-Driven Development — Starter

Starter Next.js (App Router, TypeScript, Tailwind v4) : blog en Markdown, 3 micro-outils
(générateur RGPD, scanner de headers de sécurité, assistant de prompt de code sécurisé),
capture d'emails connectable à Supabase, page de vente boilerplate, page ressources/affiliation,
en-têtes de sécurité HTTP et SEO de base (sitemap, robots, OpenGraph).

## Démarrage

```bash
npm install
cp .env.example .env.local
npm run dev
```

Ouvrir http://localhost:3000. Voir `.env.example` pour les variables optionnelles (Supabase,
Anthropic, liens de paiement/affiliation) — le site fonctionne sans elles, avec des
alternatives propres (liste d'attente, outil désactivé proprement, etc.).

## Structure

- `content/blog/` — articles en Markdown (frontmatter: title, date, description)
- `src/app/blog/` — pages du blog (index + page article, rendu via remark)
- `src/app/tools/` — les 3 micro-outils (RGPD, scanner sécurité, assistant de prompt)
- `src/app/api/subscribe/` — capture d'emails, rate-limitée, prête pour Supabase
- `src/app/api/security-scan/` — scan passif de headers HTTP, protégé contre le SSRF
- `src/app/api/prompt-assistant/` — appel à l'API Anthropic, dégradation propre sans clé
- `src/app/boilerplate/` — page de vente (ou liste d'attente si pas de lien de paiement)
- `src/app/ressources/` — liens d'affiliation avec mention de transparence
- `src/lib/supabase.ts` — client Supabase (clés via `.env.local`)
- `src/lib/rateLimit.ts` — limitation de débit en mémoire (voir limite notée dans le fichier
  pour un déploiement multi-instances)
- `next.config.mjs` — en-têtes de sécurité HTTP (CSP, HSTS, X-Frame-Options...)

## Vérifié avant livraison

`npm install`, `npm run build` et `npm run lint` passent sans erreur sur ce zip exact, depuis
un dossier vide.

Voir le guide de déploiement (guide-demarrage-technique.md) pour la suite : GitHub, Supabase,
Anthropic, Vercel, nom de domaine, activation de la monétisation.
