import { type InferGetStaticPropsType } from "next";
import Head from "next/head";

import { prisma } from "@/server/db";
import { ArticleCard } from "@/components/article-card";
import s from "@/styles/home.module.css";
import { useState } from "react";
import { type ProductType } from "@prisma/client";
import { api } from "@/utils/api";

export async function getStaticProps() {
  try {
    const products = await prisma.products.findMany({
      select: {
        id: true,
        image: true,
        name: true,
        handle: true,
        price: true,
        type: true,
        blurDataURL: true,
      },
      take: 9,
      skip: 0,
    });
    return {
      props: {
        productsSSG: products,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>;

export type Article = HomeProps["productsSSG"][0];

const menu: Record<
  ProductType | "ALL",
  { value: ProductType | null; name: string }
> = {
  ALL: { value: null, name: "Toutes" },
  CLEAR: {
    value: "CLEAR",
    name: "Claire",
  },
  AMBER: {
    value: "AMBER",
    name: "Ambrée",
  },
  DARK: {
    value: "DARK",
    name: "Sombre",
  },
};

export default function Home({ productsSSG }: HomeProps) {
  const [filter, setFilter] = useState<ProductType | null>(menu.ALL.value);
  const { data: products } = api.product.getCatalogue.useQuery(
    { type: filter },
    { initialData: productsSSG }
  );
  return (
    <>
      <Head>
        <title>Sugar Shack</title>
        <meta name="description" content="A Maplr maple syrup company" />
        <link
          rel="icon"
          href="https://em-content.zobj.net/thumbs/240/apple/354/maple-leaf_1f341.png"
        />
      </Head>

      <main className="h-full p-6">
        <div className="flex justify-center p-4">
          <div className="rounded-full bg-gray-200 p-2">
            {Object.keys(menu).map((filterKey) => {
              const option = menu[filterKey as keyof typeof menu];
              return (
                <button
                  data-filter={filterKey}
                  data-active={filter === option.value}
                  key={filterKey}
                  className={s.filter_button}
                  onClick={() => setFilter(option.value)}
                >
                  {option.name}
                </button>
              );
            })}
          </div>
        </div>
        <section className={s.main_grid}>
          {products?.map((product) => (
            <ArticleCard key={product.id} product={product} />
          )) ?? <h3>Désolé notre boutique est vide ???</h3>}
        </section>
      </main>
    </>
  );
}
