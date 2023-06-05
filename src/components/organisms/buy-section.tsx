import { useEffect, useState } from "react";
import { QuantityButtons } from "../molecules/quantity";
import { type Products } from "@prisma/client";
import { BuyButton } from "../molecules/buy-button";
import { formatPrice } from "@/utils/misc";
import { api } from "@/utils/api";
import Link from "next/link";

type BuySectionProps = {
  // this is not necessary, primitives would suffice
  stock: Products["stock"];
  productID: Products["id"];
  price: Products["price"];
};

export function BuySection({ productID, stock, price }: BuySectionProps) {
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const apiContext = api.useContext();

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

  useEffect(() => {
    if (!error) return;
    const timeID = setTimeout(() => setError(false), 15000);

    return () => clearTimeout(timeID);
  }, [error]);

  const cart = apiContext.cart.getCart.getData();

  return (
    <section className="flex w-full flex-col items-start gap-3">
      <div className="flex w-full items-center gap-2">
        <QuantityButtons
          quantity={quantity}
          handleAdd={() => setQuantity((q) => q + 1)}
          handleSubtract={() => setQuantity((q) => q - 1)}
          max={stock}
        />
        <BuyButton handleSubmit={handleSubmit} />
      </div>
      {quantity > 1 ? (
        <span className="font-bold">{`Total: ${formatPrice(
          quantity * price
        )}`}</span>
      ) : null}
      {cart?.length ? (
        <Link href={"/cart"}>
          <span className="font-bold text-highlight-main">
            Valider mon panier &rarr;
          </span>
        </Link>
      ) : null}
      <div
        data-active={error || success}
        className={`data-[active]:h-fit ${
          error ? "bg-secondary-main" : "bg-white"
        } ${success ? "bg-green-200" : "bg-white"} transition-all`}
      >
        {error ? (
          <span className="p-2 font-bold">
            ⚠️ Il y a eu un problème lors de l&apos;ajout de l&apos;article au
            panier, veuillez réésayer plus tard
          </span>
        ) : null}
        {success ? (
          <span className="font-bold">
            🎉 Le produit a bien été ajouté au panier ! Merci pour votre
            confiance
          </span>
        ) : null}
      </div>
    </section>
  );
}
