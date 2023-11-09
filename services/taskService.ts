import { db } from "./db";
import type {
  creteTaskType,
  updateTaskType,
  deleteTaskType,
  moveTaskType,
} from "./schema";

const taskServices = {
  createTask: async (task: creteTaskType) => {
    return await db.task.create({ data: task });
  },
  getAllTaskByTasksListId: async (taskListId: string) => {
    return await db.task.findMany({
      where: { taskListId: taskListId },
    });
  },
  updateTask: async (task: updateTaskType) => {
    return await db.task.update({
      where: { taskId: task.taskId },
      data: { task: task.task },
    });
  },

  deleteTask: async (task: deleteTaskType) => {
    return await db.task.delete({
      where: { taskId: task.taskId },
    });
  },
  moveTask: async (task: moveTaskType) => {
    return await db.task.update({
      where: { taskId: task.taskId },
      data: { taskListId: task.taskListId },
    });
  },
};

export default taskServices;
