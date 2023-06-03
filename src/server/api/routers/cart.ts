import jwt from "jsonwebtoken";
import z from "zod";

import { createTRPCRouter, withCartSessionProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

const addToCartInput = z.object({
  productID: z.string(),
  newQty: z.number(),
});

const removeFromCart = z.object({ productId: z.string() });

export const cartRouter = createTRPCRouter({
  getCart: withCartSessionProcedure.query(async ({ ctx }) => {
    const { prisma, withCartID } = ctx;
    if (withCartID) {
      try {
        return await prisma.cart.findMany({
          where: { id: withCartID },
          select: { cartItems: true },
        });
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }
    return null;
  }),
  addToCart: withCartSessionProcedure
    .input(addToCartInput)
    .mutation(async ({ input, ctx }) => {
      const { session, prisma, withCartID } = ctx;
      if (withCartID) {
        try {
          await prisma.cart.update({
            where: { id: withCartID },
            data: {
              cartItems: {
                connectOrCreate: {
                  where: { productID: input.productID },
                  create: {
                    productID: input.productID,
                    quantity: input.newQty,
                  },
                },
              },
            },
          });
        } catch (err) {
          console.log("Error", err);
        }
      }
      const newCart = await prisma.cart.create({
        data: {
          completed: false,
          cartItems: {
            create: {
              productID: input.productID,
              quantity: input.newQty,
            },
          },
        },
      });
      const token = jwt.sign(
        { domain: process.env.DOMAIN_NAME, cartID: newCart.id },
        process.env.JWT_SECRET as string,
        { expiresIn: "1M" }
      );
      session.user = token;
      await session.save();
    }),
  removeFromCart: withCartSessionProcedure
    .input(removeFromCart)
    .mutation(async ({ ctx, input }) => {
      const { prisma, withCartID } = ctx;

      if (!withCartID) throw new TRPCError({ code: "UNAUTHORIZED" });
      try {
        await prisma.cartItems.delete({
          where: { productID: input.productId, cartID: withCartID },
        });
      } catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
});
