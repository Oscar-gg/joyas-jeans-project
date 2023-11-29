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
  Fit: z.array(z.object({name: z.string(), description: z.string()})),
});
