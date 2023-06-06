import superjson from "superjson";

import { prisma } from "@/server/db";
import { sessionOptions } from "@/lib/session";
import { appRouter } from "@/server/api/root";
import { api } from "@/utils/api";
import { withIronSessionSsr } from "iron-session/next";
import { createServerSideHelpers } from "@trpc/react-query/server";
import Link from "next/link";

import { CartItem } from "@/components/organisms/cart-item";
import { formatPrice } from "@/utils/misc";
import { OrderButton } from "@/components/molecules/order-button";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const { session } = req;

    const helpers = createServerSideHelpers({
      router: appRouter,
      ctx: { prisma, session },
      transformer: superjson,
    });

    await helpers.cart.getCartDetails.prefetch();

    return { props: { trpcState: helpers.dehydrate() } };
  },
  sessionOptions
);

export function CartTemplate({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto flex min-h-screen flex-col items-center gap-2 pt-12">
      <h1 className="text-2xl font-bold">Mon panier</h1>
      {children}
    </main>
  );
}

export default function CartPage() {
  const apiContext = api.useContext();

  const { data, error } = api.cart.getCartDetails.useQuery();
  const placeOrder = api.order.placeOrder.useMutation({
    onSettled: async () => {
      await apiContext.cart.invalidate();
    },
  });

  if (placeOrder.isError) {
    return (
      <CartTemplate>
        <p className="w-1/2">
          ⚠️ Nous sommes désolés, certains articles dans votre panier ne sont
          plus disponibles ! En attendant un réassort, nous conservons votre
          panier un mois, toutes nos excuses 🙏
        </p>
      </CartTemplate>
    );
  }

  if (placeOrder.isSuccess) {
    return (
      <CartTemplate>
        <p>✅ Super ! Votre panier a bien été validé 🎉</p>
      </CartTemplate>
    );
  }

  if (error) {
    return (
      <CartTemplate>
        Nous avons du mal à retrouver votre panier 😥..., pourriez vous
        réessayer plus tard ?{" "}
      </CartTemplate>
    );
  }

  if (!data || data[0]?.cartItems.length === 0) {
    return (
      <CartTemplate>
        <p>il semblerait que votre panier soit vide 🤔</p>
        <span>
          Et si nous allions{" "}
          <Link href="/" className="text-primary-main">
            faire du shopping ?
          </Link>
        </span>
      </CartTemplate>
    );
  }

  const total = data[0]?.cartItems.reduce((acc, curr) => {
    return acc + curr.product.price * curr.quantity;
  }, 0);

  return (
    <CartTemplate>
      <section className="flex max-h-full w-max flex-col gap-3 overflow-y-auto">
        {data[0]?.cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
        {total ? (
          <div className="mb-8 flex w-full flex-col justify-start gap-2">
            <hr className="h-[2px] w-full bg-slate-500" />
            <p className="font-bold">Total :{formatPrice(total)}</p>
          </div>
        ) : null}
      </section>
      <section className="mx-auto flex flex-col gap-2">
        <OrderButton
          handlePlaceOrder={() => placeOrder.mutate()}
          isLoading={placeOrder.isLoading}
        />
      </section>
    </CartTemplate>
  );
}
