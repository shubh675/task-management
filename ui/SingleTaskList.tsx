"use client";
import React from "react";
import type { Task, Tasklist } from "@prisma/client";
export type TypeSingleTaskList = Tasklist & { tasks: Task[] };
import SingleTask from "./SingleTask";
import AddTask from "./AddTask";

import { StrictModeDroppable } from "./StrictModeDroppable";
interface SingleTaskProps {
  taskList: TypeSingleTaskList;

}

const SingleTaskList = ({ taskList }: SingleTaskProps) => {
  return (
    <StrictModeDroppable droppableId={taskList.taskListId} >
      {(provided) => (
        <div className="h-auto w-full max-w-[350px] rounded bg-gray-100 p-4 shadow"
        ref={provided.innerRef} {...provided.droppableProps}
        >
          <h3 className="mb-2 text-lg font-semibold text-black">
            {taskList.title}
          </h3>
          <div className="space-y-2">
            {taskList.tasks.map((task,index) => (
              <SingleTask key={task.taskId} task={task}  index={index}/>
            ))}
          </div>
          <AddTask userId={taskList.userId} taskListId={taskList.taskListId} />
          {provided.placeholder}
        </div>
        
      )}
    </StrictModeDroppable>
  );
};

export default SingleTaskList;
