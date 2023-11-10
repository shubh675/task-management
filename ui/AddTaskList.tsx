"use client"
import React, { useRef, useState } from "react";
import api from "@trpc/client-side/react";
import useSingleBoardState from "@store/useSingleBoardState";
const AddTaskList = () => {
  const [addingTaskList, setAddingTaskList] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const addTaskListMutation = api.taskList.create.useMutation();
  const addTaskList = useSingleBoardState((state) => state.addTaskList);
  const handleAddTaskList = async () => {
    if (
      inputRef.current?.value === undefined ||
      !inputRef ||
      inputRef.current.value.length === 0
    ) {
      return;
    } else if (inputRef.current?.value && inputRef.current.value.length === 0) {
      setAddingTaskList(false);
    }
    await addTaskListMutation.mutateAsync(
      { title: inputRef.current.value },
      {
        onSettled(data, _error, _variables, _variablescontext) {
          if (data) {
            addTaskList(data);
            setAddingTaskList(false);
          }
        },
      },
    );
  };
  return (
    <div>
      {" "}
      {addingTaskList ? (
        <div className="rounded bg-gray-100 p-4 shadow">
          <input
            type="text"
            placeholder="Enter task list title"
            ref={inputRef}
            className="mb-2 w-full rounded border border-gray-300 p-2 text-black"
          />
          <div className="flex space-x-2">
            <button
              onClick={handleAddTaskList}
              className="w-1/2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed"
              disabled={addTaskListMutation.isLoading}
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
          className=" h-[50px] w-[250px] rounded border border-dashed text-blue-900 px-4 py-2 hover:bg-gray-100"
        >
          + Add a task list
        </button>
      )}
    </div>
  );
};

export default AddTaskList;
