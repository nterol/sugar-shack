import { type ProductType } from "@prisma/client";

const productType = {
  CLEAR: { name: "Claire", color: "bg-secondary-main" },
  AMBER: { name: "Ambrée", color: "bg-primary-main" },
  DARK: { name: "Sombre", color: "bg-highlight-main" },
};

export function ColorBadge({ type }: { type: ProductType }) {
  const { color, name } = productType[type];
  return (
    <span
      className={`${color} w-fit rounded-full px-2 py-1 text-xs font-bold  text-white`}
    >
      {name}
    </span>
  );
}
