# La cabane à sucre

Le projet est visible à cette adresse: [Sugar Shack](https://sugar-shack.vercel.app/)

## Comment lancer le projet en local

> ⚠️ Avant de lancer le projet assurez vous de bien compléter les variables d'environnement requises. 

Ce projet utilise une base de données `postgresql` et l'outil `prisma` afin de la gérer. 

La base de données est hosté sur Supabase. Il est toutefois possible de lancer le projet avec une db sqlite en local, remplacez simplement `postgresql` par `sqlite` dans `prisma/schema.prisma` et ajoutez l'adresse local de votr db sur `DATABASE_URL`

1. Complétez la variable `DATABASE_URL` avec l'adresse de votre base de données postgresql | sqlite
2. Utilisez la commande `npx prisma db push` pour formatter votre base de donnée
3. Lancez la commande `npx prisma seed` pour peupler votre base de donnée. 
4. Lancez le projet en mode dev avec `npm run dev`, ou en mode production avec `npm run start:fresh`


## Fonctionnalités

Suger Shack est une site de e-commerce auth-less. Le statut du panier est stocké dans un token JWT dans un cookie crypté chez le client et permet de retrouver son panier pendant un mois. Le token JWT est une surcouche redondante mais je voulais tester. 

Ce site est factice et il n'y a pas de système de paiement puisque que tous les produits sont faux. Néanmoins il n'est pas possible de valider un panier si les produits qu'il contient sont en rupture de stock. En ce cas, `Order` n'est pas crée et un event real-time est envoyé aux pages produits en rupture de stock ou en faible stock. Dans le cas contraire le panier est détruit. 


## Technical stack

Ce projet utilise le boilerplate `create-t3-app` de [T3 Stack](https://create.t3.gg/).

Les technologies utilisés sont: 
- `Next.js` (et donc React) comme framework front
- `Next API Routes` comme API serverless
- `tRPC` afin de manager tous les endpoints et assurer un typing e2e. 
- `Prisma ORM` afin de se connecter et manipuler la base de donnée
- `iron-session` afin de manipuler les sessions
- `JWT` parce que je voulais mettre du piment dans ma vie
- `Pusher` pour lancer des évenement en temps-réel
- `Tailwind CSS` pour le style et un peu de `CSS modules` pour quelques styles custom.
- `Vitest` pour les tests unitaires
- `Playwright` pour les tests end to end. 

J'ai un temps envisagé d'hoster un server dédié à du server-sent-event, mais mettre en place `Pusher` était beaucoup plus rapide.

## Database

e modèle de base de donnée peut se lire assez facilement dans le fichier `prisma/schema.prisma`. 

J'ai quelque peu adapté le contrat d'interface. Certaines tables comme `Catalogue` étaient redondantes et je ne l'ai pas implémenté. A la place j'ai décidé d'être une marketplace et ai ajouté une table `Brand`lié aux `Produits`.

## Motivation


En dehors de certaines tables, les entêtes http spécifiées par le contrat d'interface n'ont pas toujours été respectées. Cela est du au fait que `tRPC` n'autorise pas d'autre méthode HTTP que `POST` et `GET`. De même customiser les code HTTP aurait pris trop de temps. J'estime beaucoup plus la fiabilité qu'offre `tRPC` en terme de typage e2e et ai décidé de ne pas totalement me fier au contrat. 

## Contenu

Les produits, marques et leur image sont tous générés par 
`DALL.E 2` et `chatGPT` de `OpenAI`. 

J'ai tenté de mettre en place une génération automatique depuis le fichier `prisma/seed`. Mais la difficulté à produire des prompts efficaces et la faible quantité de données générées durant ce process m'ont fait changer d'avis. 




