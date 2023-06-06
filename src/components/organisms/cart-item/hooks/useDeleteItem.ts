import { api } from "@/utils/api";
import { type Item } from "../types";

export function useDeleteItem({ item }: { item: Item }) {
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

  return deleteItem;
}
