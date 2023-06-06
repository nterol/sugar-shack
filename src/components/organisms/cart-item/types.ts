import { type CartItems, type Products } from "@prisma/client";

export type Item = Pick<CartItems, "id" | "quantity"> & {
    product: Pick<
      Products,
      "id" | "image" | "name" | "price" | "type" | "handle"
    >};