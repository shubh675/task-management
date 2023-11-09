import { z } from "zod";
//creating a user
export const Zuser = z.object({ name: z.string(), email: z.string() });
export type userType = z.infer<typeof Zuser>;

// creating tasks and tasklist

export const ZcreateTask = z.object({
  taskListId: z.string(),
  task: z.string().min(1),
  userId: z.string(),
});

export type creteTaskType = z.infer<typeof ZcreateTask>;

export const ZcreateTaskList = z.object({
  title: z.string(),
  userId: z.string(),
});

export type createTaskListType = z.infer<typeof ZcreateTaskList>;
// udating tasks and tasks lists

export const ZupdateTask = z.object({
  task: z.string(),
  taskId: z.string(),
});

export type updateTaskType = z.infer<typeof ZupdateTask>;

export const ZupdateTaskList = z.object({
  title: z.string(),
  taskListId: z.string(),
});

export type updateTaskListType = z.infer<typeof ZupdateTaskList>;

// deleleting tasks and tasklists

export const ZdeleteTask = z.object({
  taskId: z.string(),
});

export type deleteTaskListType = z.infer<typeof ZdeleteTaskList>;

export const ZdeleteTaskList = z.object({
  taskListId: z.string(),
});

export type deleteTaskType = z.infer<typeof ZdeleteTask>;

export const ZmoveTask = z.object({
  taskId: z.string(),
  taskListId: z.string(),
}); 

export type moveTaskType = z.infer<typeof ZmoveTask>;