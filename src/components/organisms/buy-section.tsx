import { useEffect, useMemo, useState } from "react";
import { QuantityButtons } from "../molecules/quantity";
import { type Products } from "@prisma/client";
import { BuyButton } from "../molecules/buy-button";
import { formatPrice } from "@/utils/misc";
import { api } from "@/utils/api";
import Link from "next/link";
import Pusher from "pusher-js";
import { CartPopup } from "../molecules/cart-popup";

type BuySectionProps = {
  // this is not necessary, primitives would suffice
  stock: Products["stock"];
  productID: Products["id"];
  price: Products["price"];
};

function useProductEvents({
  productID,
  stock,
}: {
  stock: number;
  productID: string;
}) {
  const [isOOS, setIsOOS] = useState(stock === 0);
  const [isLowStock, setIsLowStock] = useState(stock < 5 && stock > 0);

  const pusher = useMemo(
    () =>
      new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
        cluster: "eu",
      }),
    []
  );

  useEffect(() => {
    const channel = pusher.subscribe(`product-${productID}`);

    channel.bind("isOOS", () => setIsOOS(true));
    channel.bind("isLowStock", () => setIsLowStock(true));
    return () => {
      channel.unsubscribe();
    };
  }, [productID, pusher]);

  return { isOOS, isLowStock };
}

export function BuySection({ productID, stock, price }: BuySectionProps) {
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const apiContext = api.useContext();

  const { isOOS, isLowStock } = useProductEvents({ stock, productID });

  const cartMutation = api.cart.addToCart.useMutation({
    onError: () => {
      setError(false);
    },
    onMutate: async () => {
      await apiContext.cart.getCart.cancel();
      const optimistic = apiContext.cart.getCart.getData();
      if (!optimistic) return;
      apiContext.cart.getCart.setData(undefined, optimistic);
    },
    onSuccess: () => {
      setSuccess(true);
    },
    onSettled: async () => {
      await apiContext.cart.getCart.invalidate();
    },
  });

  const handleSubmit = () => {
    cartMutation.mutate({ productID, newQty: quantity });
  };

  useEffect(() => {
    if (!success) return;
    const timeID = setTimeout(() => setSuccess(false), 15000);

    return () => clearTimeout(timeID);
  }, [success]);

  // useEffect(() => {
  //   if (!error) return;
  //   const timeID = setTimeout(() => setError(false), 15000);

  //   return () => clearTimeout(timeID);
  // }, [error]);

  const cart = apiContext.cart.getCart.getData();

  return (
    <section className="flex w-full flex-col items-start gap-3">
      {isLowStock ? (
        <p className="text-red-300">Les stocks de ce produit sont faibles</p>
      ) : null}
      <div className="flex w-full items-center gap-2">
        <QuantityButtons
          quantity={quantity}
          handleAdd={() => setQuantity((q) => q + 1)}
          handleSubtract={() => setQuantity((q) => q - 1)}
          max={stock}
        />
        <BuyButton
          isOOS={isOOS}
          disabled={cartMutation.isLoading}
          handleSubmit={handleSubmit}
        />
      </div>
      {quantity > 1 ? (
        <span className="font-bold">{`Total: ${formatPrice(
          quantity * price
        )}`}</span>
      ) : null}
      {cart ? (
        <Link href={"/cart"}>
          <span className="font-bold text-highlight-main">
            Valider mon panier &rarr;
          </span>
        </Link>
      ) : null}
      <CartPopup success={success} error={error} />
    </section>
  );
}
