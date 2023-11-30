import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
  adminProcedure,
} from "~/server/api/trpc";

import { generateData } from "~/utils/load";

export const productRouter = createTRPCRouter({
  test: publicProcedure.query(() => {
    return "a";
  }),

  uploadData: adminProcedure.mutation(async ({ ctx }) => {
    try {
      await generateData({ db: ctx.db });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }),

  getProductById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const product = await ctx.db.product.findUnique({
        where: {
          id: input.id,
        },
      });

      return product;
    }),

  getProductIds: publicProcedure
    .input(
      z.object({
        minPrice: z.number().optional(),
        maxPrice: z.number().optional(),
        colorId: z.string().optional(),
        fitID: z.string().optional(),
        brandId: z.string().optional(),
        modelId: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const products = await ctx.db.product.findMany({
        where: {
          AND: [
            {
              price: {
                ...(input.minPrice ? { gte: input.minPrice } : {}),
              },
            },
            {
              price: {
                ...(input.maxPrice ? { lte: input.maxPrice } : {}),
              },
            },
            {
              colorId: {
                contains: input.colorId ?? "",
              },
            },
            {
              fitId: {
                contains: input.fitID ?? "",
              },
            },
            {
              modelId: {
                contains: input.modelId ?? "",
              },
            },
          ],
        },
        select: {
          id: true,
        },
      });

      return products.map((product) => product.id);
    }),

  modifyProduct: adminProcedure
    .input(
      z.object({
        id: z.string(),
        price: z.number(),
        description: z.string(),
        colorId: z.string(),
        fitId: z.string(),
        modelId: z.string(),
        image: z.string(),
        availableCount: z.number(),
        soldCount: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const product = await ctx.db.product.update({
        where: {
          id: input.id,
        },
        data: {
          price: input.price,
          colorId: input.colorId,
          fitId: input.fitId,
          modelId: input.modelId,
          availableCount: input.availableCount,
          soldCount: input.soldCount,
        },
      });

      return product;
    }),
});
