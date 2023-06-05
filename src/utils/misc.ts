export function stringToURL(n: string): string {
  return n
    .normalize("NFD")
    .replaceAll(" ", "-")
    .replaceAll("'", "-")
    .replace(/(?<extension>\.[^.]+$|)(?<badchar>[^a-zA-Z0-9-]?)/g, "$1");
}

export function formatPrice(price: number) {
  return Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  }).format(price);
}
