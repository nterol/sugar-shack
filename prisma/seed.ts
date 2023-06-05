import { PrismaClient, type ProductType } from "@prisma/client";
import { getPlaiceholder } from "plaiceholder";

import data from "./data.json";
import { stringToURL } from "@/utils/misc";

const prisma = new PrismaClient();

function generateFloat(v = 40): number {
  const random = Math.random() * v;
  return Number(Number(random).toFixed(2));
}

async function main() {
  const { brands, products } = data;
  const withBlurDataURL = await Promise.all(
    products.map(async ({ image, ...rest }) => {
      const { base64 } = await getPlaiceholder(image);
      return { ...rest, image, blurDataURL: base64 };
    })
  );

  console.log(`image -> base64 ✅`);

  await prisma.$transaction([
    ...brands.map((brand) =>
      prisma.brands.upsert({
        where: { name: brand.name },
        update: {},
        create: { ...brand, handle: stringToURL(brand.name) },
      })
    ),
    ...withBlurDataURL.map(
      ({ name, description, image, brand, type, blurDataURL }) => {
        const handle = stringToURL(name);
        const price = generateFloat();
        const stock = Math.floor(Math.random() * 100);

        return prisma.products.upsert({
          where: { handle },
          update: {},
          create: {
            type: type as keyof typeof ProductType,
            name,
            description,
            handle,
            blurDataURL,
            stock,
            price,
            image,
            brand: {
              connect: {
                name: brand,
              },
            },
          },
        });
      }
    ),
  ]);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.log(error);
    await prisma.$disconnect();
    process.exit(1);
  });
