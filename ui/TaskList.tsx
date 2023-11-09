"use client";
import React, { useState } from "react";
import SingleTask from "./Task";
import TaskInput from "./TaskInput";
import type { Task, Tasklist } from "@prisma/client";
import api from "@trpc/client-side/react";
import {Droppable} from "react-beautiful-dnd"
type TaskListProps = {
  tasks: Task[];
} & Tasklist;

const TaskList: React.FC<TaskListProps> = ({ title, tasks, taskListId,userId }) => {
  const [newTaskListTitle, setNewTaskListTitle] = useState(title);
  const [editingTitle, setEditingTitle] = useState(false);
  const [addingTask, setAddingTask] = useState(false);


  const utils = api.useUtils();
  const deleteTaskListMutation = api.taskList.deleteTaskList.useMutation({onSuccess(input) {
    utils.taskList.invalidate();
  },});
  
  const renameTaskListMutaion = api.taskList.renameTaskList.useMutation({onSuccess(input) {
    utils.taskList.invalidate();
  },});

  const editTitle = () => {
  //rename task list functionality will be here
  if(!newTaskListTitle || newTaskListTitle.length===0){
    return;
  }
  renameTaskListMutaion.mutate({ taskListId:taskListId, title:newTaskListTitle})
    setEditingTitle(false);
  };

  const deleteTaskList = (taskListId: string | undefined) => {
    if (!taskListId) {
      return;
    }
    deleteTaskListMutation.mutate({ taskListId: taskListId });

  };

  return (
    <Droppable droppableId={taskListId}>
      { (provided)=>(
   <div className="rounded bg-gray-100 p-4 shadow max-w-[350px] w-full h-auto" ref={provided.innerRef} {...provided.droppableProps}>
      
   {editingTitle ? (
     <div className="mb-2 flex">
       <input
         type="text"
         value={newTaskListTitle}
         onChange={(e) => setNewTaskListTitle(e.target.value)}
         className="w-full text-black rounded border border-gray-300 p-2"
       />
       <button
         onClick={editTitle}
         className="ml-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
       >
         Save
       </button>
     </div>
   ) : (
     <h3 className="mb-2 text-lg text-black font-semibold">{newTaskListTitle}</h3>
   )}
  
   <div className="space-y-2">
     {tasks.map((task) => (
       <SingleTask
         key={task.taskId}
         task={task.task}
         taskListId={task.taskListId}
         taskId={task.taskId}
         userId={task.userId}
       />
     ))}
   </div>
   
   {addingTask ? (
     <div className="mb-2">
       <TaskInput taskListId={taskListId} userId={userId} setAddingTask={setAddingTask} onCancel={() => setAddingTask(false)} />
     </div>
   ) : (
     <button
       onClick={() => setAddingTask(true)}
       className="w-full rounded border border-dashed border-blue-500 px-4 py-2 text-blue-500 hover:bg-gray-100"
     >
       + Add a task
     </button>
   )}

   {/* for renaming tasklist and deleting tasks */}

   <div className="mt-2">
     <button
       onClick={() => setEditingTitle(true)}
       className="mr-2 text-blue-500 hover:text-blue-700"
     >
       Rename TaskList
     </button>
     <button
       onClick={() => deleteTaskList(taskListId)}
       className="text-red-500 hover:text-red-700"
     >
       Delete TaskList
     </button>
   </div>
 </div>
      )}
 
    </Droppable>
  );
};

export default TaskList;
