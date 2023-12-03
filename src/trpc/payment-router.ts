import { z } from "zod";
import { protectedProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { getPayloadClient } from "../get-payloads";
import { stripe } from "../lib/stripe";
import type Stripe from "stripe";

export const PaymentRouter = router({
    createSession: protectedProcedure.input(z.object({
        productIds: z.array(z.string()),
    })).mutation( async ({ ctx, input }) => {
        const { user } = ctx
        let {productIds} = input
        
        if (productIds.length === 0) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "No products selected",
            })
        }

        const payload = await getPayloadClient()

        const { docs: products} = await payload.find({
            collection: "products",
            where: {
                id: {
                    in: productIds
                }
        }})

        const filteredProducts = products.filter(prod => Boolean(prod.priceId))

        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = []
        
        filteredProducts.forEach((product) => {
            line_items.push({
              price: product.priceId!,
              quantity: 1,
            })
          })    

        const order = await payload.create({
            collection: "orders",
            data: {
                user: user.id,
                _isPaid: false,
                products: filteredProducts.map(p => p.id),
            }
        })

        line_items.push({
            price: "price_1OIbEiEm1RomdGfiWyHZGMbR",
            quantity: 1,
            adjustable_quantity: {
                enabled: false
            },

        })

        try {
            const stripeSession = await stripe.checkout.sessions.create({
                success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/success?orderId=${order.id}`,
                cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
                payment_method_types: ["card", 
                // "paypal"
            ],
                mode: "payment",
                metadata: {
                    orderId: order.id,
                    userId: user.id,
                },
                line_items
            })
        return {
            url: stripeSession.url
        }

        } catch (error) {
            console.log(error)
            return {url: null}
        }
    }),

    pollOrderStatus: protectedProcedure
    .input(z.object({ orderId: z.string() }))
    .query(async ({ input }) => {
      const { orderId } = input

      const payload = await getPayloadClient()

      const { docs: orders } = await payload.find({
        collection: 'orders',
        where: {
          id: {
            equals: orderId,
          },
        },
      })

      if (!orders.length) {
        throw new TRPCError({ code: 'NOT_FOUND' })
      }

      const [order] = orders

      return { isPaid: order._isPaid }
    }),
})