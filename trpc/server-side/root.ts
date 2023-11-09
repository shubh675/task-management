
import { createTRPCRouter } from "./trpc";
import { taskListRouter,userRouter,taskRouter } from "./routers";


export const appRouter = createTRPCRouter({
 user:userRouter,
 task:taskRouter,
 taskList:taskListRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
