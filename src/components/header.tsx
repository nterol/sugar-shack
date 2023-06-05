import Link from "next/link";
import { CartIcon } from "./icons/cart";

export function Header() {
  return (
    <header className="flex w-full items-center justify-between bg-white p-4">
      <h1>Sugar Shack</h1>
      <nav>
        <Link href="/cart">
          <div className="color-white aspect-square h-[32px] rounded-full bg-primary-main">
            <CartIcon className="h-6 w-6" />
          </div>
        </Link>
      </nav>
    </header>
  );
}
