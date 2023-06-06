export function CartPopup({
  success,
  error,
}: {
  success: boolean;
  error: boolean;
}) {
  return (
    <div
      data-active={error || success}
      className={`rounded-lg p-2 ${error ? "bg-secondary-main" : ""} ${
        success ? "bg-green-200" : ""
      }  opacity-1  transition-opacity delay-200 ease-out  data-[active="false"]:opacity-0`}
    >
      {error ? (
        <span className="font-bold">
          ⚠️ Il y a eu un problème lors de l&apos;ajout de l&apos;article au
          panier, veuillez réésayer plus tard
        </span>
      ) : null}
      {success ? (
        <span className="font-bold">
          🎉 Le produit a bien été ajouté au panier !
        </span>
      ) : null}
    </div>
  );
}
