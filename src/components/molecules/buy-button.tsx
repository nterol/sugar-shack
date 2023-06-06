type BuyButtonProps = {
  handleSubmit: () => void;
  disabled: boolean;
  isOOS: boolean;
};

export function BuyButton({ handleSubmit, disabled, isOOS }: BuyButtonProps) {
  return (
    <button
      disabled={disabled ||isOOS}
      className="w-fit rounded-full bg-primary-main px-3 py-2 disabled:bg-slate-300"
      onClick={handleSubmit}
    >
      <span className="inline-flex font-bold text-white">
        {isOOS ? "Victime de son succès !" : "Ajouter au panier"}
      </span>
    </button>
  );
}
