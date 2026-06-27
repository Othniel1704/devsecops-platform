---
title: "Sécuriser une base MySQL contre les injections en 2026"
date: "2026-07-01"
description: "Les techniques essentielles pour protéger une base MySQL contre les injections SQL, avec des exemples concrets."
---

Les injections SQL restent l'une des vulnérabilités les plus exploitées sur les
applications web, malgré des décennies de littérature sur le sujet. Cet article
couvre les bases concrètes pour s'en protéger sur un projet MySQL en 2026.

## Le problème : concaténer des requêtes

Le code suivant est vulnérable, même s'il paraît anodin :

```js
const query = `SELECT * FROM users WHERE email = '${email}'`;
connection.query(query);
```

Si `email` contient `' OR '1'='1`, la requête renvoie tous les utilisateurs. Le
problème n'est pas MySQL : c'est la concaténation de texte non fiable dans une
requête SQL.

## La solution : les requêtes préparées

Avec `mysql2`, on remplace la valeur par un paramètre :

```js
const [rows] = await connection.execute(
  "SELECT * FROM users WHERE email = ?",
  [email]
);
```

Le driver échappe et type la valeur avant de l'envoyer au serveur : la chaîne
ne peut plus être interprétée comme du SQL.

## Checklist rapide

1. Aucune valeur utilisateur n'est concaténée directement dans une requête.
2. Toutes les requêtes utilisent des paramètres liés (`?` ou nommés).
3. Le compte MySQL applicatif a le minimum de privilèges nécessaires (pas de `DROP`, `GRANT`).
4. Les messages d'erreur SQL ne sont jamais renvoyés tels quels au client.

Ces quatre points couvrent la majorité des cas réels rencontrés sur des projets
étudiants et des MVP.
