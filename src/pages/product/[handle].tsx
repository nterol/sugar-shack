import { BuySection } from "@/components/organisms/buy-section";
import { prisma } from "@/server/db";
import { api } from "@/utils/api";

import { formatPrice } from "@/utils/misc";

import { type InferGetStaticPropsType, type GetStaticPropsContext } from "next";
import Image from "next/image";

// iron-session/next does not work with ssg functions -> tRPC cannot be used in this case
export const getStaticProps = async function getStaticProps(
  ctx: GetStaticPropsContext<{ handle: string }>
) {
  const { handle = "" } = ctx.params ?? {};
  try {
    const product = await prisma.products.findFirst({
      where: { handle },
      include: { brand: true },
    });
    if (!product) throw new Error("Product does not exists in DB");
    return { props: { product } };
  } catch (err) {
    console.log(err);
    return { notFound: true };
  }
};

export async function getStaticPaths() {
  const products = await prisma.products.findMany({ select: { handle: true } });

  return {
    paths: products.map(({ handle }) => ({
      params: { handle },
    })),
    fallback: "blocking",
  };
}

const productType = {
  CLEAR: { name: "Claire", color: "bg-secondary-main" },
  AMBER: { name: "Ambrée", color: "bg-primary-main" },
  DARK: { name: "Sombre", color: "bg-highlight-main" },
};

export default function ProductPage({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const apiContext = api.useContext();

  apiContext.product.getProductInfo.setData({ productID: product.id }, product);

  const { color, name } = productType[product.type];
  return (
    <main className="flex h-screen flex-col items-center gap-12 bg-slate-50 px-6 py-12 md:px-24">
      <section className="flex w-full flex-col gap-4 md:flex-row md:gap-12">
        <div className="relative aspect-square w-full rounded-xl shadow-md">
          <Image
            fill
            src={product.image}
            alt={product.name}
            className="rounded-xl"
          />
        </div>
        <div className="relative flex aspect-square w-full flex-col items-start gap-2 rounded-xl bg-slate-200/75 px-8 py-6 shadow-md md:py-24">
          <h2 className="text-xl font-bold">{product.name}</h2>
          <span
            className={`${color} w-fit rounded-full px-2 py-1 text-xs font-bold  text-white`}
          >
            {name}
          </span>
          <p className="font-bold text-slate-700">
            {formatPrice(product.price)}
          </p>
          <BuySection
            productID={product.id}
            stock={product.stock}
            price={product.price}
          />
        </div>
      </section>
      <section className="flex flex-col gap-2 rounded-xl bg-slate-200 p-6 shadow-md">
        <h3 className="text-xl font-bold">{product.name}</h3>{" "}
        <span
          className={`${color} w-fit rounded-full px-2 py-1 text-xs font-bold text-white`}
        >
          {name}
        </span>
        <p className="w-4/5">{product.description}</p>
        <hr className="h-[2px] bg-slate-500" />
        <h3 className="text-lg font-bold">Présentation du producteur:</h3>
        <a href={`https://${product.brand.url}`}>
          <span className="border-b-2 border-slate-500 text-lg text-slate-500">
            {product.brandName} &rarr;
          </span>
        </a>
        <p className="text-md font-bold">{product.brand.headline}</p>
        <p>{product.brand.presentation}</p>
      </section>
    </main>
  );
}
