"use client";
import React from "react";
import type { Task } from "@prisma/client";
import { Draggable } from "react-beautiful-dnd";
interface SingleTaskProps {
  task: Task;
  index:number;
}
const SingleTask = ({ task ,index}: SingleTaskProps) => {
  return (
    <Draggable draggableId={task.taskId} index={index}>
      {(provided) => (
        <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
         className="rounded border border-gray-200 bg-white p-2 text-black shadow">
          {task.task}
        </div>
      )}
    </Draggable>
  );
};

export default SingleTask;
