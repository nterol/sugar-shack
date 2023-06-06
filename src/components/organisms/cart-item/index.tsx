import Image from "next/image";
import { ColorBadge } from "../../atoms/color-badge";
import { TrashIcon } from "../../atoms/icons/trash";
import Link from "next/link";
import { RoundButton } from "../../atoms/round-button";

import { useDeleteItem } from "./hooks/useDeleteItem";
import { type Item } from "./types";

export function CartItem({ item }: { item: Item }) {
  const deleteItem = useDeleteItem({ item });

  const handleDelete = () => {
    deleteItem.mutate({ productId: item.product.id });
  };

  return (
    <article
      key={item.id}
      className="flex justify-center gap-3 rounded-xl bg-white p-3 shadow-md"
    >
      <Image
        height={100}
        width={100}
        style={{ objectFit: "contain" }}
        src={item.product.image}
        alt={item.product.name}
        className="rounded-xl"
      />
      <section className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">{item.product.name}</h2>
        <ColorBadge type={item.product.type} />
        <div className="flex gap-3">
          <p className="font-bold">x {item.quantity}</p>
          <button
            className="aspect-square w-6 text-gray-200 hover:text-red-400"
            onClick={handleDelete}
          >
            <TrashIcon />
          </button>
        </div>
      </section>
      <aside className="flex items-center">
        <Link href={`/product/${item.product.handle}`}>
          <RoundButton height={"h-8"} bgColor="bg-gray-200">
            &rarr;
          </RoundButton>
        </Link>
      </aside>
    </article>
  );
}
