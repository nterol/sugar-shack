import { api } from "@/utils/api";

export default function CartPage() {
  const apiContext = api.useContext();

  const cart = apiContext.cart.getCart.getData();

  console.log({cart})
  return <main>Welcome to your cart</main>;
}
