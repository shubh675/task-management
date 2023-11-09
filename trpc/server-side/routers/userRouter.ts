
import {
  createTRPCRouter,
  publicProcedure,
} from "../trpc";

 const userRouter = createTRPCRouter({
  getSecretMessage: publicProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});


export default userRouter;