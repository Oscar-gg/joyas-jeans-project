import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
  adminProcedure,
} from "~/server/api/trpc";

export const getRouter = createTRPCRouter({
  getModelsIds: publicProcedure
    .input(
      z.object({
        brandName: z.string().optional(),
        search: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.modelName.findMany({
        where: {
          AND: [
            {
              brand: {
                name: { contains: input.brandName ?? "" },
              },
            },
            {
              OR: [
                { name: { contains: input.search ?? "", mode: "insensitive" } },
                {
                  brand: {
                    name: { contains: input.search ?? "", mode: "insensitive" },
                  },
                },
              ],
            },
          ],
        },
        select: {
          id: true,
        },
      });
    }),

  getFitIds: publicProcedure
    .input(
      z.object({
        search: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.fit.findMany({
        where: {
          OR: [
            { name: { contains: input.search ?? "", mode: "insensitive" } },
            {
              description: {
                contains: input.search ?? "",
                mode: "insensitive",
              },
            },
          ],
        },
        select: {
          id: true,
        },
      });
    }),

  getColorIds: publicProcedure
    .input(
      z.object({
        search: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.color.findMany({
        where: {
          OR: [{ name: { contains: input.search ?? "", mode: "insensitive" } }],
        },
        select: {
          id: true,
        },
      });
    }),

  getModelById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.modelName.findUnique({
        where: {
          id: input.id,
        },
        select: {
          name: true,
          _count: {
            select: {
              product: true,
            },
          },
          image: true,
          brandId: true,
          id: true,
          brand: {
            select: {
              name: true,
            },
          },
        },
      });
    }),

  getColorById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.color.findUnique({
        where: {
          id: input.id,
        },
        include: {
          _count: {
            select: {
              product: true,
            },
          },
        },
      });
    }),

  getFitById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.fit.findUnique({
        where: {
          id: input.id,
        },
        include: {
          _count: {
            select: {
              product: true,
            },
          },
        },
      });
    }),

  getProductById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.product.findUnique({
        where: {
          id: input.id,
        },
        include: {
          model: {
            include: {
              brand: {
                select: {
                  name: true,
                },
              },
            },
          },
          color: {
            select: {
              name: true,
              id: true,
            },
          },
          fit: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      });
    }),

  getProductsIds: publicProcedure
    .input(
      z.object({
        search: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.product.findMany({
        where: {
          OR: [
            {
              fit: {
                name: { contains: input.search ?? "", mode: "insensitive" },
              },
            },
            {
              color: {
                name: { contains: input.search ?? "", mode: "insensitive" },
              },
            },
            {
              model: {
                OR: [
                  {
                    name: {
                      contains: input.search ?? "",
                      mode: "insensitive",
                    },
                  },
                  {
                    brand: {
                      name: {
                        contains: input.search ?? "",
                        mode: "insensitive",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
        select: {
          id: true,
        },
      });
    }),

  getBrandSelect: publicProcedure.query(async ({ ctx, input }) => {
    const brands = await ctx.db.brand.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return brands.map((brand) => ({ value: brand.id, label: brand.name }));
  }),

  getModelSelect: publicProcedure.query(async ({ ctx }) => {
    const models = await ctx.db.modelName.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    console.log(models);

    return models.map((model) => ({ value: model.id, label: model.name }));
  }),

  getFitSelect: publicProcedure.query(async ({ ctx }) => {
    const fits = await ctx.db.fit.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return fits.map((fit) => ({ value: fit.id, label: fit.name }));
  }),

  getColorSelect: publicProcedure.query(async ({ ctx }) => {
    const colors = await ctx.db.color.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return colors.map((colors) => ({ value: colors.id, label: colors.name }));
  }),
});
