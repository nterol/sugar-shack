import { TRPCError } from "@trpc/server";
import z from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const productRouter = createTRPCRouter({
  getCatalogue: publicProcedure
    .input(z.object({ type: z.string().optional() }))
    .query(async ({ input, ctx }) => {
      try {
        return await ctx.prisma.catalogueItem.findMany({
          where: input.type ? { type: input.type } : {},
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
          where: { id: input.productID },
        });
      } catch (error) {
        new TRPCError({
          message: `${error as string}`,
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
});
