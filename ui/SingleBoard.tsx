"use client";
import React, { useEffect } from "react";
import type { Task, Tasklist } from "@prisma/client";
import useSingleBoardState from "@store/useSingleBoardState";
import SingleTaskList from "./SingleTaskList";
import AddTaskList from "./AddTaskList";
export type TypeTaskLists = (Tasklist & { tasks: Task[] })[] | [];
import { DragDropContext } from "react-beautiful-dnd";

interface SingleBoardProps {
  board: TypeTaskLists;
}

  const SingleBoard = ({ board }: SingleBoardProps) => {
  const addInitialBoard = useSingleBoardState((state) => state.addInitialBoard);
  const boardFromStore = useSingleBoardState((state) => state.board);
  useEffect(() => {
    addInitialBoard(board);
  }, [addInitialBoard, board]);

  return (
    <div className=" mt-16 space-x-4 p-4">
      <div className="flex flex-wrap items-start gap-5">
        {boardFromStore.map((taskList,index) => (
          <SingleTaskList key={taskList.taskListId} taskList={taskList} />
        ))}
        <AddTaskList />
      </div>
    </div>
  );
};

export default SingleBoard;