import { z } from "zod";

// export const RoleZod = z.enum([
//   "admin",
//   "organizationMember",
//   "authenticated",
//   "unauthenticated",
// ]);

export const ImportedData = z.object({
  Brands: z.array(z.string()),
  Colors: z.array(z.string()),
  BrandsModels: z.array(
    z.object({ name: z.string(), models: z.array(z.string()) }),
  ),
  Fit: z.array(z.object({ name: z.string(), description: z.string() })),
});

export const ModelModel = z.object({
  id: z.string().optional().nullable(),
  name: z.string(),
  image: z.string(),
  brandId: z.string(),
});

export const ColorModel = z.object({
  id: z.string().optional().nullable(),
  name: z.string(),
});

export const FitModel = z.object({
  id: z.string().optional().nullable(),
  name: z.string(),
  description: z.string(),
});

export const ProductModel = z.object({
  id: z.string().optional().nullable(),
  price: z.number(),
  availableCount: z.number(),
  soldCount: z.number(),
  colorId: z.string(),
  fitId: z.string(),
  modelId: z.string(),
});
