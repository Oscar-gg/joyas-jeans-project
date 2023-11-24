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
});
