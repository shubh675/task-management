import { ZcreateTask, ZdeleteTask, ZupdateTask,ZmoveTask } from "@services/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import dbServices from "@services/services";
import z from "zod"
const taskRouter = createTRPCRouter({
  createTask: protectedProcedure
    .input(ZcreateTask)
    .mutation(async ({ ctx, input }) => {
      return await dbServices.taskServices.createTask({
        task: input.task,
        taskListId: input.taskListId,
        userId: ctx.user.userId,
      });
    }),
    updateTask: protectedProcedure.input(ZupdateTask).mutation(async ({ ctx, input }) => {
      return await dbServices.taskServices.updateTask({
        taskId: input.taskId,
        task: input.task,
      });
    }),

    deleteTask: protectedProcedure.input(ZdeleteTask).mutation(async ({ ctx, input }) => {
      return await dbServices.taskServices.deleteTask({
        taskId: input.taskId,
      });
    }),
   moveTask: protectedProcedure.input(ZmoveTask).mutation(async ({ input }) => {
    return await dbServices.taskServices.moveTask({
      taskId: input.taskId,
      taskListId: input.taskListId,
    });
   }),
   getTaskById:protectedProcedure.input(z.object({taskListId:z.string()})).query(async ({ input }) => {
    const tasks= await dbServices.taskServices.getAllTaskByTasksListId(input.taskListId);
    return tasks;
  }),

});

export default taskRouter;
