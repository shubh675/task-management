"use client";

import React, { useRef, useState, useEffect } from "react";
import api from "@trpc/client-side/react";
import useSingleBoardState from "@store/useSingleBoardState";
type TypeAddTaskProps = {
  taskListId: string;
  userId: string;
};
const AddTask = ({ taskListId, userId }: TypeAddTaskProps) => {
  const [addingTask, setAddingTask] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const addTaskContainerRef = useRef<HTMLDivElement | null>(null);
  const addTaskMutation = api.task.createTask.useMutation();
  const addTaskToTaskList = useSingleBoardState(
    (state) => state.addTaskToTaskList,
  );
  const handleAddTask = async () => {
    if (
      inputRef.current?.value === undefined ||
      !inputRef ||
      inputRef.current.value.length === 0 ||
      !inputRef.current.value
    ) {
      setAddingTask(false);
      return;
    } else if (inputRef.current?.value && inputRef.current.value.length === 0) {
      setAddingTask(false);
    }
    await addTaskMutation.mutateAsync(
      { taskListId: taskListId, task: inputRef.current.value, userId: userId },
      {
        onSettled(data, _error, _variables, _variablescontext) {
          if (data) {
            addTaskToTaskList(taskListId, data);
            setAddingTask(false);
          }
        },
      },
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        addingTask &&
        inputRef.current &&
        addTaskContainerRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        !addTaskContainerRef.current.contains(event.target as Node)
      ) {
        setAddingTask(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [addingTask]);
  return (
    <div>
      {" "}
      {addingTask ? (
        <div className="mt-4 space-y-2">
          <input
            type="text"
            placeholder="Add a task"
            ref={inputRef}
            className="w-full rounded border border-gray-300 p-2 text-black"
          />
          <div className="flex space-x-2">
            <button
              onClick={handleAddTask}
              className="w-1/2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={addTaskMutation.isLoading}
            >
              Add Task
            </button>
            <button
              onClick={() => setAddingTask(false)}
              className="w-1/2 rounded bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400 disabled:cursor-not-allowed"
              disabled={addTaskMutation.isLoading}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setAddingTask(true)}
          className="mt-4 w-full rounded border border-dashed border-blue-500 px-4 py-2 text-blue-500 hover:bg-gray-100"
        >
          + Add a task
        </button>
      )}
    </div>
  );
};

export default AddTask;
