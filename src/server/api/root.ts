import { postRouter } from "~/server/api/routers/post";
import { productRouter } from "./routers/products";
import { createTRPCRouter } from "~/server/api/trpc";
import { modelRouter } from "~/server/api/routers/model";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  product: productRouter,
  model: modelRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
