import { type AppType } from "next/app";
import { withIronSessionSsr } from "iron-session/next";
import { createServerSideHelpers } from "@trpc/react-query/server";
import superjson from "superjson";

import { prisma } from "@/server/db";
import { sessionOptions } from "@/lib/session";
import { api } from "@/utils/api";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { appRouter } from "@/server/api/root";
import "@/styles/globals.css";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const { session } = req;
    const helpers = createServerSideHelpers({
      router: appRouter,
      ctx: { prisma, session },
      transformer: superjson,
    });

    await helpers.cart.getCart.prefetch();

    return {
      props: { trcpState: helpers.dehydrate() },
    };
  },
  sessionOptions
);

const MyApp: AppType = ({ Component, pageProps }) => {
  const { data: cart } = api.cart.getCart.useQuery();

  return (
    <>
      <Header cart={cart ?? null} />
      <Component {...pageProps} />
      <Footer />
    </>
  );
};

export default api.withTRPC(MyApp);
