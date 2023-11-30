import { z } from "zod";

import {
  createTRPCRouter,
  adminProcedure,
} from "~/server/api/trpc";

// import { generateData } from "~/utils/load";
import { ColorModel, FitModel, ModelModel, ProductModel } from "~/zod/types";

export const modifyRouter = createTRPCRouter({
  createOrUpdateModel: adminProcedure
    .input(ModelModel)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.modelName.upsert({
        where: {
          id: input.id ?? "-1",
        },
        create: {
          name: input.name,
          image: input.image,
          brand: {
            connect: {
              id: input.brandId,
            },
          },
        },
        update: {
          name: input.name,
          image: input.image,
          brand: {
            connect: {
              id: input.brandId,
            },
          },
        },
      });

      return true;
    }),

  createOrUpdateColor: adminProcedure
    .input(ColorModel)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.color.upsert({
        where: {
          id: input.id ?? "-1",
        },
        create: {
          name: input.name,
        },
        update: {
          name: input.name,
        },
      });

      return true;
    }),
  createOrUpdateFit: adminProcedure
    .input(FitModel)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.fit.upsert({
        where: {
          id: input.id ?? "-1",
        },
        create: {
          name: input.name,
          description: input.description,
        },
        update: {
          name: input.name,
          description: input.description,
        },
      });

      return true;
    }),
  createOrUpdateProduct: adminProcedure
    .input(ProductModel)
    .mutation(async ({ ctx, input }) => {
      console.log(input);
      await ctx.db.product.upsert({
        where: {
          id: input.id ?? "-1",
        },
        create: {
          availableCount: input.availableCount,
          soldCount: input.soldCount,
          price: input.price,
          color: {
            connect: {
              id: input.colorId,
            },
          },
          fit: {
            connect: {
              id: input.fitId,
            },
          },
          model: {
            connect: {
              id: input.modelId,
            },
          },
        },
        update: {
          availableCount: input.availableCount,
          soldCount: input.soldCount,
          price: input.price,
          color: {
            connect: {
              id: input.colorId,
            },
          },
          fit: {
            connect: {
              id: input.fitId,
            },
          },
          model: {
            connect: {
              id: input.modelId,
            },
          },
        },
      });

      return true;
    }),

  deleteModelById: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.modelName.delete({
        where: {
          id: input.id,
        },
      });

      return true;
    }),
  deleteColorById: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.color.delete({
        where: {
          id: input.id,
        },
      });

      return true;
    }),
  deleteFitById: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.fit.delete({
        where: {
          id: input.id,
        },
      });

      return true;
    }),
  deleteProductById: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.product.delete({
        where: {
          id: input.id,
        },
      });

      return true;
    }),
});
