"use client";
import React, { useEffect } from "react";
import type { Task, Tasklist } from "@prisma/client";
import useSingleBoardState from "@store/useSingleBoardState";
import SingleTaskList from "./SingleTaskList";
import AddTaskList from "./AddTaskList";
export type TypeTaskLists = (Tasklist & { tasks: Task[] })[] | [];
import { DragDropContext, type DropResult } from "react-beautiful-dnd";
import api from "@trpc/client-side/react";

interface SingleBoardProps {
  board: TypeTaskLists;
}

const SingleBoard = ({ board }: SingleBoardProps) => {
  const addInitialBoard = useSingleBoardState((state) => state.addInitialBoard);
  const boardFromStore = useSingleBoardState((state) => state.board);
  const moveTaskBetweenList = useSingleBoardState(
    (state) => state.moveTaskBetweenList,
  );
  const moveTaskMutaion =  api.task.moveTask.useMutation();

  const handleOnDragEnd = async (result: DropResult) => {
    const { destination, source,draggableId } = result;
  
    if (!destination || !source || !draggableId) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      return;
    }

    moveTaskBetweenList(
      source.droppableId,
      destination.droppableId,
      draggableId,
    );

    await moveTaskMutaion.mutateAsync({taskListId:destination.droppableId,taskId:draggableId})
  };

  useEffect(() => {
    addInitialBoard(board);
  }, [addInitialBoard, board]);

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className=" mt-16 space-x-4 p-4">
        <div className="flex flex-wrap items-start gap-5">
          {boardFromStore.map((taskList) => (
            <SingleTaskList key={taskList.taskListId} taskList={taskList} />
          ))}
          <AddTaskList />
        </div>
      </div>
    </DragDropContext>
  );
};

export default SingleBoard;
