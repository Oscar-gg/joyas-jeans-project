import type { PrismaClient } from "@prisma/client";

import data from "~/server/data/alldata.json";
import { ImportedData } from "~/zod/types";

export const generateData = async ({ db }: { db: PrismaClient }) => {
  const dataObject = ImportedData.parse(data);

  for (const color of dataObject.Colors) {
    await db.color.create({
      data: {
        name: color,
      },
    });
  }

  for (const fit of dataObject.Fit) {
    await db.fit.create({
      data: {
        name: fit.name,
        description: fit.description,
      },
    });
  }

  for (const brand of dataObject.Brands) {
    await db.brand.create({
      data: {
        name: brand,
      },
    });
  }

  for (const brandInfo of dataObject.BrandsModels) {
    for (const modelName of brandInfo.models) {
      await db.modelName.create({
        data: {
          name: modelName,
          brand: {
            connect: {
              name: brandInfo.name,
            },
          },
        },
      });
    }
  }
};
