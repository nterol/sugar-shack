type BuyButtonProps = {
  handleSubmit: () => void;
};

export function BuyButton({ handleSubmit }: BuyButtonProps) {
  return (
    <button
      className="w-fit rounded-full bg-primary-main px-3 py-2"
      onClick={handleSubmit}
    >
      <span className="inline-flex font-bold text-white">
        Ajouter au panier
      </span>
    </button>
  );
}
