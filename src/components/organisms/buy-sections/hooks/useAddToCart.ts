import { api } from "@/utils/api";

export function useAddToCart() {
  const apiContext = api.useContext();

  const addToCart = api.cart.addToCart.useMutation({
    onMutate: async () => {
      await apiContext.cart.getCart.cancel();
      const optimistic = apiContext.cart.getCart.getData();
      if (!optimistic) return;
      apiContext.cart.getCart.setData(undefined, optimistic);
    },

    onSettled: async () => {
      await apiContext.cart.getCart.invalidate();
    },
  });

  return addToCart;
}
