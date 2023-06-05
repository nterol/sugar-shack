import Link from "next/link";
import { CartIcon } from "./atoms/icons/cart";
import { type CartItems } from "@prisma/client";

type HeaderProps = {
  cart:
    | {
        cartItems: CartItems[];
      }[]
    | null;
};

export function Header({ cart }: HeaderProps) {
  const cartSum =
    cart?.[0]?.cartItems.reduce((acc, curr) => {
      if (!curr) return acc;
      return acc + curr.quantity;
    }, 0) ?? 0;
  return (
    <header className="flex w-full items-center justify-between border-b-[1px] border-slate-100 bg-white p-6">
      <Link href="/">
        <h1 className="text-4xl font-bold text-primary-main">Sugar Shack</h1>
      </Link>
      <nav>
        <Link href="/cart">
          <div className="color-white relative flex aspect-square h-8 items-center justify-center rounded-full bg-primary-main">
            <CartIcon className="h-4 w-4" />
            {cart ? (
              <div className="absolute -right-2 -top-2 flex aspect-square h-6 items-center justify-center rounded-full bg-secondary-main">
                <span className="text-xs font-bold text-white">{cartSum}</span>
              </div>
            ) : null}
          </div>
        </Link>
      </nav>
    </header>
  );
}
