import { useEffect, useMemo, useState } from "react";
import { QuantityButtons } from "../../molecules/quantity";
import { type Products } from "@prisma/client";
import { BuyButton } from "../../molecules/buy-button";
import { formatPrice } from "@/utils/misc";
import { api } from "@/utils/api";
import Link from "next/link";

import { CartPopup } from "../../molecules/cart-popup";
import { useProductEvents } from "./hooks/useProductEvents";
import { useAddToCart } from "./hooks/useAddToCart";

type BuySectionProps = {
  // this is not necessary, primitives would suffice
  stock: Products["stock"];
  productID: Products["id"];
  price: Products["price"];
};

export function BuySection({ productID, stock, price }: BuySectionProps) {
  const [quantity, setQuantity] = useState(1);

  const apiContext = api.useContext();

  const { isOOS, isLowStock } = useProductEvents({ stock, productID });

  const addToCart = useAddToCart();
  const handleSubmit = () => {
    addToCart.mutate({ productID, newQty: quantity });
  };

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
          disabled={addToCart.isLoading}
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
      <CartPopup success={addToCart.isSuccess} error={addToCart.isError} />
    </section>
  );
}
