import Link from "next/link";
import { CartIcon } from "@/components/atoms/icons/cart";
import { type inferRouterOutputs } from "@trpc/server";
import { type AppRouter } from "@/server/api/root";

type GetCart = inferRouterOutputs<AppRouter>["cart"]["getCart"];

type HeaderProps = {
  cart: GetCart;
};

export function Header({ cart }: HeaderProps) {
  const cartSum =
    cart?.cartItems.reduce((acc, curr) => {
      if (!curr) return acc;
      return acc + curr.quantity;
    }, 0) ?? 0;
  return (
    <header className="flex w-full items-center justify-between border-b-[1px] border-slate-100 bg-white p-6">
      <Link href="/">
        <h1 className="text-4xl font-bold text-primary-main">Sugar Shack 🍁</h1>
      </Link>
      <nav>
        <Link href="/cart">
          <div className="color-white relative flex aspect-square h-8 items-center justify-center rounded-full bg-primary-main">
            <CartIcon className="h-4 w-4" />
            {cart ? (
              <div
                data-type="badge"
                className="absolute -right-2 -top-2 flex aspect-square h-6 items-center justify-center rounded-full bg-secondary-main"
              >
                <span className="text-xs font-bold text-white">{cartSum}</span>
              </div>
            ) : null}
          </div>
        </Link>
      </nav>
    </header>
  );
}
