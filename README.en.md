# Sugar Shack

See the live project at this adress: [Sugar Shack](https://sugar-shack.vercel.app/)

## How to

> ⚠️ Before Launching project be sure to complete all environment variables. 

This stack uses `prisma` to manage database.Tables are modeled for a postgresql database.

The project's database is hosted on supabase, but it is possible to use an `sqlite` db locally. Simply change `postgresql` to `sqlite` in `schema.prisma`

   
1. Launch `npx prisma db push` to format your database.
2. Launch `npx prisma seed` to populate your db. 
3. Launch the project in dev mode with `npm run dev`, or in production mode with `npm run start:fresh`.

## Features

Sugar Shack is an auth-less e-commerce website. This means you don't have to to register to "buy" its product, an encrypted cookie stores your cart status in a JWT token for a month and you're good to go. Yes the JWT is redundant, but I wanted to try.

Since it's a mock website there is no payment status on `Order`. But the `placeOrder` endpoint will make sure every `product` in the cart have sufficient stock. If not, the order is not created and a real-time event is sent to every product page on low-stock or out-of-stock state (OOS).

## Technical stack

This project was bootstrapped with `create-t3-app` from the [T3 Stack](https://create.t3.gg/).

The complete list of technos is: 
- `Next.js` (hence React) as rendering framework
- `Next API Routes` to serves the application endpoints through serverless functions. 
- `tRPC` to handle serverless endpoints. 
- `Prisma ORM` to connect and manage the database
- `iron-session` for session handling
- `JWT` because why not
- `Pusher` for real-time events
- `Tailwind CSS` as styling solution, and a bit of `CSS modules` for custom styling
- `Vitest` for unit testing
- `Playwirght`for end to end testing



I considered hosting a special server-sent event dedicated server, but choose `Pusher` in the end. 

## Database

The database model can be read quite litteraly in this file: 
`prisma/schema.prisma`

I took some liberties from the original contract as I thought the `Catalogue` table was quite redundant.
Instead I decided to be a markeplace and added a `Brand` table linked to `Product`.

## Motivation

A part from some table in the original contract I also diregarded the return type of the contract endpoints, specially the HTTP header.

This is because `tRPC` only allow `POST`and `GET` method and customizing response headers would taken too much time.
I much value `tRPC`'s end to end typing and decided to rule against the original contract. 

## Content

The products, brands and their image were all generated with `DALL.E 2` and `chatGPT` from `OpenAI`. 

I considered adding an automatic call to the `openAI SDK` in the `prisma/seed` file. But working with AI to generate such simple data was so long I decided not to. This could be fun though. 




