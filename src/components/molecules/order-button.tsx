type OrderButtonProps = {
  handlePlaceOrder: () => void;
  isLoading: boolean;
};

export function OrderButton({ handlePlaceOrder, isLoading }: OrderButtonProps) {
  return (
    <button
      disabled={isLoading}
      className="w-fit rounded-full bg-primary-main px-3 py-2 disabled:bg-slate-300 "
      onClick={handlePlaceOrder}
    >
      <span className="inline-flex font-bold text-white">
        {isLoading ? "Validation en cours..." : "Valider mon panier"}
      </span>
    </button>
  );
}
