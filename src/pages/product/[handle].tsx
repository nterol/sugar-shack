import { BuySection } from "@/components/organisms/buy-section";
import { prisma } from "@/server/db";
import { formatPrice, stringToURL } from "@/utils/misc";
import { type InferGetStaticPropsType, type GetStaticPropsContext } from "next";
import Image from "next/image";
import Link from "next/link";

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

const productType = {
  CLEAR: { name: "Claire", color: "bg-secondary-main" },
  AMBER: { name: "Ambrée", color: "bg-primary-main" },
  DARK: { name: "Sombre", color: "bg-highlight-main" },
};

export default function ProductPage({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { color, name } = productType[product.type];
  return (
    <main className="flex h-screen flex-col items-center gap-12 bg-slate-50 px-24 py-12">
      <section className="flex w-full gap-12">
        <div className="relative aspect-square w-full rounded-xl shadow-md">
          <Image
            fill
            src={product.image}
            alt={product.name}
            className="rounded-xl"
          />
        </div>
        <div className="relative flex aspect-square w-full flex-col items-start gap-2 rounded-xl bg-slate-200/75 p-8 shadow-md">
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
        <hr />
        <span className="inline-flex items-center gap-1">
          <h3 className="text-lg font-bold">Produit par: </h3>
          <Link href={`/brand/${stringToURL(product.brandName)}`}>
            <span className="border-b-2 border-slate-500 text-slate-500">
              {product.brandName} &rarr;
            </span>
          </Link>
        </span>
      </section>
    </main>
  );
}
