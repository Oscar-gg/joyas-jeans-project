import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
  adminProcedure,
} from "~/server/api/trpc";

import { generateData } from "~/utils/load";

export const modelRouter = createTRPCRouter({
  getModelsNames: publicProcedure
    .input(z.object({ brandName: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.modelName.findMany({
        where: {
          brand: {
            name: { contains: input.brandName ?? "" },
          },
        },
        select: {
          name: true,
        },
      });
    }),

  getModelByName: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.modelName.findUnique({
        where: {
          name: input.name,
        },
        select: {
          name: true,
          _count: {
            select: {
              product: true,
            },
          },
          image: true,
        },
      });
    }),
  modifyProduct: adminProcedure
    .input(
      z.object({
        id: z.string(),
        price: z.number(),
        description: z.string(),
        colorId: z.string(),
        fitId: z.string(),
        brandId: z.string(),
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
          brandId: input.brandId,
          modelId: input.modelId,
          availableCount: input.availableCount,
          soldCount: input.soldCount,
        },
      });

      return product;
    }),
});
