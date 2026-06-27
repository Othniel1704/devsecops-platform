# DevSecOps & AI-Driven Development — Starter

Starter Next.js (App Router, TypeScript, Tailwind) pour le projet : blog en Markdown, premier
micro-outil (générateur RGPD) et capture d'emails prête à connecter à Supabase.

## Démarrage

```bash
npm install
cp .env.example .env.local
npm run dev
```

Ouvrir http://localhost:3000.

## Structure

- `content/blog/` — articles en Markdown (frontmatter: title, date, description)
- `src/app/blog/` — pages du blog (index + page article)
- `src/app/tools/` — micro-outils (générateur RGPD fonctionnel, autres à venir)
- `src/app/api/subscribe/` — endpoint de capture d'emails (à connecter à Supabase)
- `src/lib/supabase.ts` — client Supabase (clés via `.env.local`)

Voir le guide de déploiement (guide-demarrage-technique.md) pour la suite : GitHub, Supabase,
Vercel, nom de domaine.
