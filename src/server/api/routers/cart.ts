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
    console.log({ withCartID, session: ctx.session.user });
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
          // cannot upsert because no enough unique key
          return await prisma.$transaction(async (tx) => {
            const item = await tx.cartItems.findFirst({
              where: { cartID: withCartID, productID: input.productID },
              select: { id: true },
            });
            if (item?.id) {
              await tx.cartItems.update({
                where: { id: item.id },
                data: {
                  quantity: { increment: input.newQty },
                },
              });
            } else {
              await tx.cartItems.create({
                data: {
                  product: { connect: { id: input.productID } },
                  cart: { connect: { id: withCartID } },
                  quantity: input.newQty,
                },
              });
            }
          });
        } catch (err) {
          console.log("Error", err);
        }
      }
      const newCart = await prisma.cart.create({
        data: {
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
        { expiresIn: "30d" }
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
        // again, cannot upsert for not enough unique key
        await prisma.$transaction(async (tx) => {
          const item = await tx.cartItems.findFirst({
            where: { cartID: withCartID, productID: input.productId },
            select: { id: true },
          });
          if (!item?.id) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

          await tx.cartItems.delete({ where: { id: item.id } });
        });
      } catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
});
