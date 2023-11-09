import React from "react";
import type { Task } from "@prisma/client";
import { Draggable } from "react-beautiful-dnd";
const SingleTask: React.FC<Task> = ({ taskId, task, userId, taskListId }) => {
  return (
    <Draggable draggableId={taskId}>
      {(provided) => (
        <div className="rounded border border-gray-200 bg-white p-2 text-black shadow" 
        ref={provided.innerRef} 
        {...provided.draggableProps}
        {...provided.dragHandleProps}>
          {task}
        </div>
      )}
    </Draggable>
  );
};

export default SingleTask;
