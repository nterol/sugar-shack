import { type Article } from "@/pages";
import Image from "next/image";

export function ArticleCard({ product }: { product: Article }) {
  return (
    <article>
      {/* <Image style={{objectFit:}} src={product.image} alt={product.name} /> */}
    </article>
  );
}
