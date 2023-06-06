import { TRPCError } from "@trpc/server";
import z from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const productRouter = createTRPCRouter({
  getCatalogue: publicProcedure
    .input(
      z.object({
        type: z.enum(["AMBER", "CLEAR", "DARK"]).nullish(),
        limit: z.number().min(1).max(50).nullish(),
        cursor: z.number().nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        // const limit = input.limit ?? 50;
        // const { cursor } = input;
        return await ctx.prisma.products.findMany({
          where: input.type ? { type: input.type } : undefined,
          // take: limit + 1,
          // cursor: cursor ? { productCursor: cursor } : undefined,
        });
      } catch (error) {
        new TRPCError({
          message: `${error as string}`,
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
  getProductInfo: publicProcedure
    .input(z.object({ productID: z.string() }))
    .query(async ({ input, ctx }) => {
      try {
        return await ctx.prisma.products.findUnique({
          where: { id: input.productID }, include: {brand:true}
        });
      } catch (error) {
        new TRPCError({
          message: `${error as string}`,
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
});
