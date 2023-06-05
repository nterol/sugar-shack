import { prisma } from "@/server/db";
import { type InferGetStaticPropsType, type GetStaticPropsContext } from "next";

export async function getStaticProps(
  ctx: GetStaticPropsContext<{ handle: string }>
) {
  const { handle = "" } = ctx.params ?? {};
  try {
    const product = await prisma.products.findFirst({
      where: { handle },
      include: {
        brand: true,
      },
    });
    if (!product) throw new Error("Product does not exists in DB");
    return { props: { product } };
  } catch (err) {
    console.log(err);
    return { notFound: true };
  }
}

export async function getStaticPaths() {
  const products = await prisma.products.findMany({ select: { handle: true } });

  return {
    paths: products.map(({ handle }) => ({
      params: { handle },
    })),
    fallback: "blocking",
  };
}

export default function ProductPage({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main>
      <h1>{product.name}</h1>
    </main>
  );
}
