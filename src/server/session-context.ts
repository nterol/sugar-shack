import { getIronSession } from "iron-session";

import { sessionOptions } from "@/lib/session";
import { type inferAsyncReturnType } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";

export async function createSessionContext(opts: CreateNextContextOptions) {
  const session = await getIronSession(opts.req, opts.res, sessionOptions);
  return { session };
}

export type SessionContext = inferAsyncReturnType<typeof createSessionContext>;
