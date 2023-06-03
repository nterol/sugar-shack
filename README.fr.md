# La cabane à sucre

Le projet est visible à cette adresse: [Sugar Shack](https://demo.com)

## Comment lancer le projet en local

> ⚠️ Avant de lancer le projet assurez vous de bien compléter les variables d'environnement requises. 

Ce projet utilise une base de données `postgresql` et l'outil `prisma` afin de la gérer. 

Voici les étapes à suivre pour lancer le projet
1. Complétez la variable `DATABASE_URL` avec l'adresse de votre base de données postgresql
2. Utilisez la commande `npx prisma db push` pour formatter votre base de donnée
3. Lancez la commande `npx prisma seed` pour populer votre base de donnée. 
4. Lancez le projet en mode dev avec `npm run dev`, ou en mode production avec `npm run start:fresh`



## Technical stack

This project was bootstrapped with `create-t3-app` from the [T3 Stack](https://create.t3.gg/).

Sugar Shack is built wih: 
- `Next.js` (hence React) as rendering framework
- `Next API Routes` to serves the application endpoints through serverless functions. 
- `tRPC` to handle serverless endpoints. 
- `Prisma ORM` to connect and manage the database
- `iron-session` for session handling
- `JWT` because why not
- `Pusher` for real-time events
- `Tailwind CSS` as styling solution, and a bit of `CSS modules` for custom styling
- `Jest` for unit testing

## Features

- [x] Add product to cart
- [ ] Validate Cart
- [x] Cart Retrieval (1 month)
- [ ] Real-time OOS


