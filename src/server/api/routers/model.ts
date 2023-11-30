import { z } from "zod";

import {
  createTRPCRouter,
  adminProcedure,
} from "~/server/api/trpc";

// import { generateData } from "~/utils/load";

export const modelRouter = createTRPCRouter({

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
          modelId: input.modelId,
          availableCount: input.availableCount,
          soldCount: input.soldCount,
        },
      });

      return product;
    }),
});
