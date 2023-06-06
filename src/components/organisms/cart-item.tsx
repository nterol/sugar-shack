import { type CartItems, type Products } from "@prisma/client";
import Image from "next/image";
import { ColorBadge } from "../atoms/color-badge";
import { TrashIcon } from "../atoms/icons/trash";
import Link from "next/link";
import { RoundButton } from "../atoms/round-button";
import { api } from "@/utils/api";

export function CartItem({
  item,
}: {
  item: Pick<CartItems, "id" | "quantity"> & {
    product: Pick<
      Products,
      "id" | "image" | "name" | "price" | "type" | "handle"
    >;
  };
}) {
  const apiContext = api.useContext();
  const deleteItem = api.cart.removeFromCart.useMutation({
    onMutate: async () => {
      await apiContext.cart.getCartDetails.cancel();
      await apiContext.cart.getCart.cancel();
      const previous = apiContext.cart.getCartDetails.getData();
      const toDelete = previous?.[0]?.cartItems.findIndex(
        (i) => i.product.id === item.product.id
      );
      const purged = toDelete
        ? previous?.[0]?.cartItems.filter((_, index) => index !== toDelete)
        : previous?.[0]?.cartItems;
      const optimistic = toDelete
        ? [
            {
              cartItems: purged === undefined ? [] : purged,
            },
          ]
        : previous;

      apiContext.cart.getCartDetails.setData(undefined, optimistic);
      // same should be done for getCart but I don't have time and lack data. Let's just invalidate
    },

    onSettled: async () => {
      await apiContext.cart.invalidate();
    },
  });

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
