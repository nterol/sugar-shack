import { type ProductType } from "@prisma/client";
import s from "./filter-options.module.css";

export const menu: Record<
  ProductType | "ALL",
  { value: ProductType | null; name: string }
> = {
  ALL: { value: null, name: "Toutes" },
  CLEAR: {
    value: "CLEAR",
    name: "Claire",
  },
  AMBER: {
    value: "AMBER",
    name: "Ambrée",
  },
  DARK: {
    value: "DARK",
    name: "Sombre",
  },
};

type FilterOptionsProps = {
  filter: ProductType | null;
  setFilter: (n: ProductType | null) => () => void;
};

export function FilterOptions({ filter, setFilter }: FilterOptionsProps) {
  return (
    <div className="rounded-full bg-gray-200 p-2">
      {Object.keys(menu).map((filterKey) => {
        const option = menu[filterKey as keyof typeof menu];
        return (
          <button
            data-filter={filterKey}
            data-active={filter === option.value}
            key={filterKey}
            className={s.filter_button}
            onClick={setFilter(option.value)}
          >
            {option.name}
          </button>
        );
      })}
    </div>
  );
}
