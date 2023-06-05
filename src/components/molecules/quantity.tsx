import { RoundButton } from "../atoms/round-button";
import { MinusIcon } from "../atoms/icons/minus";
import { PlusIcon } from "../atoms/icons/plus";

type QuantityButtonsProps = {
  quantity: number;
  max: number;
  handleAdd: () => void;
  handleSubtract: () => void;
};

export function QuantityButtons({
  quantity,
  max,
  handleAdd,
  handleSubtract,
}: QuantityButtonsProps) {
  return (
    <div className="flex justify-between gap-2 rounded-full bg-slate-100 p-2 shadow-inner">
      <RoundButton disabled={quantity === 1} handleClick={handleSubtract}>
        <MinusIcon />
      </RoundButton>
      <span className="font-bold">{quantity}</span>
      <RoundButton disabled={quantity === max} handleClick={handleAdd}>
        <PlusIcon />
      </RoundButton>
    </div>
  );
}
