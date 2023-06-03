# Sugar Shack

See the live project at this adress: [Sugar Shack](https://demo.com)

## How to

> ⚠️ Before Launching project be sure to complete all environment variables. 

This stack uses `prisma` to manage database.Tables are modeled for a postgresql database.

Launch `npx prisma db push` to format your database. Then launch `npx prisma seed` to populate your db. 
Launch project in dev mode with `npm run dev`, or in production mode with `npm run start:fresh`

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


