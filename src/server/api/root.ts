import { productRouter } from "./routers/products";
import { createTRPCRouter } from "~/server/api/trpc";
import { modelRouter } from "~/server/api/routers/model";
import { getRouter } from "~/server/api/routers/get";
import { modifyRouter } from "~/server/api/routers/modify";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  product: productRouter,
  model: modelRouter,
  get: getRouter,
  modify: modifyRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
