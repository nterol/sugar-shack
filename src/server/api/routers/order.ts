import { pusher } from "@/server/events";
import { createTRPCRouter, withCartSessionProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const orderRouter = createTRPCRouter({
  placeOrder: withCartSessionProcedure.mutation(async ({ ctx }) => {
    const { withCartID, prisma, session } = ctx;
    if (!withCartID) throw new TRPCError({ code: "UNAUTHORIZED" });
    try {
      const allItems = await prisma.cart.findFirstOrThrow({
        where: { id: withCartID },
        include: { cartItems: true },
      });

      // Validate stocks.
      // If not possible Order cannot be processed
      await prisma.$transaction(async (tx) => {
        await Promise.all(
          allItems.cartItems.map(async (item) => {
            const currentStock = await tx.products.update({
              where: { id: item.productID },
              data: { stock: { decrement: item.quantity } },
            });
            console.log(currentStock.id, currentStock.stock);
            if (currentStock.stock === 0) {
              await pusher?.trigger(`product-${currentStock.id}`, "isOOS", {
                data: {
                  productID: currentStock.id,
                  event: "isOOS",
                },
              });
            }
            if (currentStock.stock < 0) {
              console.log("💣", currentStock.id);
              await pusher?.trigger(`product-${currentStock.id}`, "lowStock", {
                data: {
                  productID: currentStock.id,
                  event: "lowStock",
                },
              });
              throw new Error(
                `some product Products does not have sufficient stock`
              );
            }
          })
        );
      });

      console.log("✅ JUSQUE ICI CA VA");

      await prisma.$transaction(async (tx) => {
        const order = await tx.order.create({
          data: { isOrderValid: true },
        });
        const orderLines = allItems.cartItems.map((item) => ({
          qty: item.quantity,
          productID: item.productID,
          orderID: order.id,
        }));
        await tx.orderlines.createMany({ data: orderLines });
        // if order is successfull delete cart
        await tx.cart.delete({ where: { id: withCartID } });
        session.destroy();
      });
    } catch (error) {
      console.log("🤖", error);
      throw new TRPCError({ code: "UNPROCESSABLE_CONTENT" });
    }
  }),
});
