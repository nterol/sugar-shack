import { useEffect, useMemo, useState } from "react";
import Pusher from "pusher-js";

export function useProductEvents({
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
  