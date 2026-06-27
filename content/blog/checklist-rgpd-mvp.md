---
title: "Checklist RGPD pour les projets étudiants et MVP"
date: "2026-07-08"
description: "Les points RGPD à vérifier avant de mettre en ligne un MVP ou un projet étudiant, sans jargon juridique inutile."
---

Un MVP n'a pas besoin d'un service juridique pour respecter les bases du
RGPD. Voici les points qui couvrent la majorité des cas réels.

## 1. Savoir ce que tu collectes

Liste toutes les données personnelles que ton app stocke : email, nom,
adresse IP dans les logs, cookies analytics. Si tu ne sais pas répondre à
cette question, c'est le premier problème à régler.

## 2. Une politique de confidentialité, même simple

Elle doit dire qui collecte quoi, pourquoi, et comment contacter le
responsable. Le [générateur RGPD](/tools/rgpd-generator) de ce site produit
un point de départ correct pour un MVP.

## 3. Pas de cookies de tracking sans consentement

Un cookie de session technique (panier, connexion) ne nécessite pas de
bannière. Un cookie analytics ou publicitaire, oui. Le plus simple pour un
MVP : choisir un outil d'analytics sans cookie (Plausible, Vercel Analytics)
et éviter le sujet entièrement.

## 4. Un moyen réel de supprimer les données

Même un simple email à un contact qui déclenche une suppression manuelle en
base suffit au stade MVP. L'important est que le droit existe et soit
honoré, pas qu'il soit automatisé dès le premier jour.

## 5. Ne pas stocker plus que nécessaire

Si un formulaire ne nécessite pas un numéro de téléphone, ne le demande pas.
Moins de données collectées, c'est moins de risque en cas de fuite — et
moins de travail de conformité.

## Checklist finale

1. Politique de confidentialité publiée et à jour
2. Liste claire des données collectées et de leur finalité
3. Pas de cookie non essentiel sans consentement
4. Process (même manuel) de suppression sur demande
5. Aucune donnée collectée "juste au cas où"

Ce n'est pas un audit juridique complet, mais ça couvre l'essentiel pour ne
pas se mettre en danger sur un projet étudiant ou un MVP.
