import { getProductColorAndType } from "@/utils/misc";
import { type ProductType } from "@prisma/client";


export function ColorBadge({ type }: { type: ProductType }) {
  const { color, name } = getProductColorAndType(type)
  return (
    <span
      className={`${color} w-fit rounded-full px-2 py-1 text-xs font-bold  text-white`}
    >
      {name}
    </span>
  );
}
