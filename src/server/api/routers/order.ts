import { createTRPCRouter, withCartSessionProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const orderRouter = createTRPCRouter({
  placeOrder: withCartSessionProcedure.mutation(async ({ ctx }) => {
    const { withCartID } = ctx;
    if (!withCartID) throw new TRPCError({ code: "UNAUTHORIZED" });
    try {
      const allItems = await ctx.prisma.cart.findFirstOrThrow({
        where: { id: withCartID },
        include: { cartItems: true },
      });
      console.log({ allItems });

      // await ctx.prisma.products.updateMany({where: }),

      /* 
On real world e-commerce, order would be link to user session
`isOrderValid` would be an enum tight to credit card payment
*/
      await ctx.prisma.orderValidationResponse.create({
        data: {
          isOrderValid: true,
          Orderlines: {
            create: allItems.cartItems.map(({ productID, quantity }) => ({
              productID,
              qty: quantity,
            })),
          },
        },
      });
    } catch (error) {}
  }),
});
