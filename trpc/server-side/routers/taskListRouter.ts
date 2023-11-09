import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { ZupdateTaskList, ZdeleteTaskList } from "@services/schema";

import dbServices from "@services/services";
const taskListRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ title: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const createdTaskList = await dbServices.taskListService.createTaskList({
        title: input.title,
        userId: ctx.user.userId,
      });
      return createdTaskList;
    }),
  getTasklist: protectedProcedure.query(async ({ ctx }) => {
    const taskList = await dbServices.taskListService.getAllTasklistByUserId(
      ctx.user.userId,
    );
    return taskList;
  }),
  renameTaskList: protectedProcedure
    .input(ZupdateTaskList)
    .mutation(async ({ input }) => {
      const taskList = await dbServices.taskListService.renameTaskList({
        taskListId: input.taskListId,
        title: input.title,
      });
      return taskList;
    }),
  deleteTaskList: protectedProcedure
    .input(ZdeleteTaskList)
    .mutation(async ({ input }) => {
      const taskList = await dbServices.taskListService.deleteTaskList({
        taskListId: input.taskListId,
      });
      return taskList;
    }),
});

export default taskListRouter;
