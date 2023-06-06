import { type ProductType } from "@prisma/client";

export function stringToURL(n: string): string {
  return n
    .normalize("NFD")
    .replaceAll(" ", "-")
    .replaceAll("'", "-")
    .replace(/(?<extension>\.[^.]+$|)(?<badchar>[^a-zA-Z0-9-]?)/g, "$1")
    .toLowerCase();
}

export function formatPrice(price: number) {
  return Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  }).format(price);
}

const productType = {
  CLEAR: { name: "Claire", color: "bg-secondary-main" },
  AMBER: { name: "Ambrée", color: "bg-primary-main" },
  DARK: { name: "Sombre", color: "bg-highlight-main" },
};

export const getProductColorAndType = (type: ProductType) => productType[type];
