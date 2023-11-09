"use client"
import React, { useState } from "react";
import { api } from "@trpc/client-side/react";

type TaskInputProps = {
  setAddingTask:React.Dispatch<React.SetStateAction<boolean>>
  onCancel: () => void;
  taskListId:string;
  userId:string;
};

const TaskInput: React.FC<TaskInputProps> = ({ setAddingTask, onCancel,taskListId,userId }) => {
  const [newTask, setNewTask] = useState<string>("");
  const utils = api.useUtils();
  const createTask = api.task.createTask.useMutation({onSuccess(input) {
    utils.taskList.invalidate();
  },});
  
  const handleAddTask = () => {
    if(!newTask || newTask.length===0){
      return
    }
      createTask.mutate({task:newTask,taskListId:taskListId,userId:userId});
      setAddingTask(false);
      setNewTask("");
  
  };

  return (
    <div className="space-y-2">
      <input
        type="text"
        placeholder="Add a task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className="w-full p-2 text-black rounded border border-gray-300"
      />
      <div className="flex space-x-2">
        <button
          onClick={handleAddTask}
          className="w-1/2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
        <button
          onClick={onCancel}
          className="w-1/2 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TaskInput;
