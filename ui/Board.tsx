"use client";
import React, { useState } from "react";
import TaskList from "./TaskList";
import { api } from "@trpc/client-side/react";
import { DragDropContext } from "react-beautiful-dnd";
import { useCreateTaskList } from "@trpc/client-side/hooks";
const Board: React.FC = () => {
  const [newTaskListTitle, setNewTaskListTitle] = useState<string>("");
  const [addingTaskList, setAddingTaskList] = useState(false);
  

  const createTaskList = useCreateTaskList()
  
 const getTaskLists = api.taskList.getTasklist.useQuery();

  const addTaskList = async () => {
    if (newTaskListTitle) {
      await  createTaskList.mutateAsync({ title: newTaskListTitle },{onSuccess:()=>{   
              setAddingTaskList(false);
      }});
      setNewTaskListTitle("");
    } else return;
  };

  if (getTaskLists.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    getTaskLists.data && (
     
      <div className=" space-x-4 p-4 mt-16">
         <DragDropContext onDragEnd={()=>{}}>
        <div className="flex flex-wrap gap-5 items-start">
          
          {getTaskLists.data.map((taskList) => (
           
            <TaskList
              key={taskList.taskListId}
              title={taskList.title}
              tasks={taskList.tasks}
              userId={taskList.userId}
              taskListId={taskList.taskListId}
            />
          
          ))}
         
          {addingTaskList ? (
            <div className="rounded bg-gray-100 p-4 shadow">
              <input
                type="text"
                placeholder="Enter task list title"
                value={newTaskListTitle}
                onChange={(e) => setNewTaskListTitle(e.target.value)}
                className="mb-2 w-full rounded border border-gray-300 p-2 text-black"
              />
              <div className="flex space-x-2">
                <button
                  onClick={addTaskList}
                  className="w-1/2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed"
                  disabled={!newTaskListTitle || createTaskList.isLoading}
                >
                  Add
                </button>
                <button
                  onClick={() => setAddingTaskList(false)}
                  className="w-1/2 rounded bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setAddingTaskList(true)}
              className=" h-[50px] w-[250px] rounded border border-dashed border-blue-500 px-4 py-2 text-blue-500 hover:bg-gray-100"
            >
              + Add a task list
            </button>
          )}
        </div>
        </DragDropContext>
      </div>
     
    )
  );
};

export default Board;
