import { PrismaClient } from "@prisma/client";

import data from "./data.json";

/* 
    Datum were generated with chatGPT. Images were created with Dall-E.
    None of either these products or brand are real
*/
const prisma = new PrismaClient();

async function main() {
  //   await prisma.$transaction(
  //     data.brands.map((brand) => {
  //       prisma.brands.upsert({
  //         where: {
  //           name: brand.brand,
  //         },
  //         update: {},
  //         create: {
  //             name: brand.brand,
  //             url: brand.brandURL,
  //             hea
  //         }
  //       });
  //     })
  //   );
}
