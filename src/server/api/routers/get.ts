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
  getBrandModelsById: publicProcedure
    .input(
      z.object({
        brandId: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.modelName.findMany({
        where: {
          brandId: input.brandId,
        },
        select: {
          id: true,
        },
      });
    }),
  getBrandById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.brand.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  getBrandsIds: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.brand.findMany({
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
      const productCount = await ctx.db.product.count({
        where: {
          modelId: input.id,
        },
        select: {
          id: true,
        },
      });

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

  getModelImageById: publicProcedure
    .input(z.object({ brandId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.modelName.findFirst({
        where: {
          brandId: input.brandId,
        },
        select: {
          image: true,
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
        onlySold: z.boolean().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.product.findMany({
        where: {
          AND: [
            {
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
            {
              ...(input.onlySold ? { soldCount: { gt: 0 } } : {}),
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

  getBrandRoutes: publicProcedure.query(async ({ ctx, input }) => {
    const brands = await ctx.db.brand.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return brands.map((brand) => ({
      name: brand.name,
      path: `/brand/${brand.id}`,
    }));
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
  fitDescription: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const description = await ctx.db.fit.findUnique({
        where: {
          id: input.id,
        },
        select: {
          description: true,
        },
      });

      return description;
    }),

  productCount: publicProcedure
    .input(
      z.object({ fitId: z.string(), colorId: z.string(), modelId: z.string() }),
    )
    .query(async ({ ctx, input }) => {
      console.log(input);
      const products = await ctx.db.product.findMany({
        where: {
          AND: [
            {
              ...(input.fitId !== "" ? { fitId: input.fitId } : {}),
            },
            {
              ...(input.colorId !== "" ? { colorId: input.colorId } : {}),
            },
            {
              ...(input.modelId !== "" ? { model: { id: input.modelId } } : {}),
            },
          ],
        },
        select: {
          price: true,
          availableCount: true,
        },
      });

      console.log(products);

      if (products.length === 0) {
        return 0;
      }

      if (input.fitId !== "" && input.colorId !== "" && input.modelId !== "") {
        return products[0];
      }

      return products.length;
    }),
});
