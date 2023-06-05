import { type Article } from "@/pages";
import Image from "next/image";
import Link from "next/link";
import s from "@/styles/card-relief.module.css";

export function ArticleCard({ product }: { product: Article }) {
  return (
    <Link href={`/product/${product.handle}`}>
      <article className="relative flex aspect-square w-full flex-col justify-end rounded-2xl p-4 shadow-md">
        <Image
          className="absolute z-0 rounded-2xl"
          fill
          src={product.image}
          placeholder="blur"
          alt={product.name}
          blurDataURL={product.blurDataURL}
        />
        <section
          className={`${
            s.card_relief as string
          } z-10 flex w-full items-center justify-between rounded-xl bg-white p-2 shadow-md`}
        >
          <h2 className="text-lg font-bold">{product.name}</h2>
          <button className="flex aspect-square w-[32px]  items-center justify-center rounded-full bg-gray-300 text-black">
            &rarr;
          </button>
        </section>
      </article>
    </Link>
  );
}
