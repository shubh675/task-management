"use client"
import React from "react";
import type { Task, Tasklist } from "@prisma/client";
export type TypeSingleTaskList = Tasklist & { tasks: Task[] };
import SingleTask from "./SingleTask";
import AddTask from "./AddTask";

interface SingleTaskProps {
  taskList: TypeSingleTaskList;
}

const SingleTaskList = ({ taskList }: SingleTaskProps) => {
  return (
    <div className="h-auto w-full max-w-[350px] rounded bg-gray-100 p-4 shadow">
      <h3 className="mb-2 text-lg font-semibold text-black">
        {taskList.title}
      </h3>
      <div className="space-y-2">
        {taskList.tasks.map((task) => (
          <SingleTask key={task.taskId} task={task} />
        ))}
      </div>
      <AddTask userId={taskList.userId} taskListId={taskList.taskListId}/>
    </div>
  );
};

export default SingleTaskList;
