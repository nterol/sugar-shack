import { getProductColorAndType } from "@/utils/misc";
import { type Brands, type Products } from "@prisma/client";

export function SectionDescription({
  product,
}: {
  product: Products & { brand: Brands };
}) {
  const { color, name } = getProductColorAndType(product.type);
  return (
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
  );
}
