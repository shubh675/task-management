import { db } from "./db";
import type {
  createTaskListType,
  deleteTaskListType,
  updateTaskListType,
} from "./schema";

export const taskListService = {
  createTaskList: async (taskList: createTaskListType) => {
    return await db.tasklist.create({data:taskList,include:{tasks:true}});
  },

  renameTaskList: async (taskList: updateTaskListType) => {
    return await db.tasklist.update({
      where: { taskListId: taskList.taskListId },
      data: { title: taskList.title },
    });
  },
  deleteTaskList: async (taskList: deleteTaskListType) => {
    return await db.tasklist.delete({
      where: { taskListId: taskList.taskListId},
      
       
    });
  },
getAllTasklistByUserId: async (userId: string) =>{
 const data = await db.tasklist.findMany({where:{userId: userId},include:{tasks:true}});
 return data;
}
};

export default taskListService;