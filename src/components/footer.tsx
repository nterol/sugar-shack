export function Footer() {
  return (
    <footer className="flex flex-col items-center justify-start gap-2 bg-highlight-main p-6 text-white md:flex-row md:justify-between">
      <div className="w-full">
        <h3 className="text-xl font-bold">Sugar Shack 2023</h3>

        <p>
          fait avec ❤️ par{" "}
          <a className="underline" href="https://github.com/nterol">
            @nterol
          </a>{" "}
          pour{" "}
          <a className="underline" href="https://maplr.co/">
            Maplr
          </a>
        </p>
      </div>
      <div className="w-full">
        <p className="text-xs">Sugar Shack ne conserve aucune donnée</p>
        <p className="text-xs">
          Toutes ressemblance avec de vrais produits ou marques est parfaitement
          fortuites.
          <br /> L&apos;ensemble du catalogue est généré via openAI 🤖
        </p>
      </div>
    </footer>
  );
}
