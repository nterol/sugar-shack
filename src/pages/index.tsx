import { type InferGetStaticPropsType } from "next";
import Head from "next/head";

import { prisma } from "@/server/db";
import { ArticleCard } from "@/components/article-card";

export async function getStaticProps() {
  try {
    const products = await prisma.products.findMany({
      select: { id: true, image: true, name: true, handle: true, price: true },
      take: 9,
      skip: 0,
    });
    return {
      props: {
        products,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>;

export type Article = HomeProps["products"][0];

export default function Home({ products }: HomeProps) {
  return (
    <>
      <Head>
        <title>Sugar Shack</title>
        <meta name="description" content="A Maplr maple syrup company" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {products.map((product) => (
          <ArticleCard key={product.id} product={product} />
        ))}
      </main>
    </>
  );
}
