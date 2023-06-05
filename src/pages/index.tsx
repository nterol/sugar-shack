import { type InferGetStaticPropsType } from "next";
import Head from "next/head";

import { prisma } from "@/server/db";
import { ArticleCard } from "@/components/article-card";
import s from "@/styles/home.module.css";

export async function getStaticProps() {
  try {
    const products = await prisma.products.findMany({
      select: {
        id: true,
        image: true,
        name: true,
        handle: true,
        price: true,
        type:true,
        blurDataURL: true,
      },
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

// const types = ["CLEAR", "AMBER", "DARK"];

// const menu = [
//   { value: null, name: "Toutes" },
//   { value: "CLEAR", name: "Claire" },
//   { value: "AMBER", name: "Ambrée" },
//   { value: "DARK", name: "Sombre" },
// ];

export default function Home({ products }: HomeProps) {
  return (
    <>
      <Head>
        <title>Sugar Shack</title>
        <meta name="description" content="A Maplr maple syrup company" />
        <link rel="icon" href="https://em-content.zobj.net/thumbs/240/apple/354/maple-leaf_1f341.png" />
      </Head>

      <main className="h-full p-6">
        <div className="flex">
          <h2>Selectionnez votre couleur</h2>
          {/* <div>{menu.map(option => )}</div> */}
        </div>
        <section className={s.main_grid}>
          {products.map((product) => (
            <ArticleCard key={product.id} product={product} />
          ))}
        </section>
      </main>
    </>
  );
}
