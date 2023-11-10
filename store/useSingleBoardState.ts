"use client"
import { create } from "zustand";
import type { TypeTaskLists } from "@ui/SingleBoard";
import type { TypeSingleTaskList } from "@ui/SingleTaskList";
import type { Task } from "@prisma/client";

import { combine } from "zustand/middleware";
type State = {
  board: TypeTaskLists;
};

const useSingleBoardState = create(
  combine({ board: [] as TypeTaskLists }, (set) => ({
    addInitialBoard: (board: State["board"]) => set({ board }),
    addTaskList: (taskList: TypeSingleTaskList) =>
      set((state) => ({ board: [...state.board, taskList] })),
    deleteTaskList: (taskListId: string) =>
      set((state) => ({
        board: state.board.filter((board) => board.taskListId !== taskListId),
      })),
    renameTaskList: (taskListId: string, title: string) =>
      set((state) => ({
        board: state.board.map((board) =>
          board.taskListId === taskListId
            ? (board = { ...board, title: title })
            : board,
        ),
      })),
    addTaskToTaskList: (taskListId: string, task: Task) =>
      set((state) => ({
        board: state.board.map((board) =>
          board.taskListId === taskListId
            ? (board = { ...board, tasks: [...board.tasks, task] })
            : board,
        ),
      })),
    deleteTaskFromTaskList: (taskListId: string, taskId: string) =>
      set((state) => ({
        board: state.board.map((board) =>
          board.taskListId === taskListId
            ? (board = {
                ...board,
                tasks: [
                  ...board.tasks.filter((task) => task.taskId !== taskId),
                ],
              })
            : board,
        ),
      })),
      renameTaskInTaskList: (taskListId: string, taskId: string, task: string) => set((state) => ({
        board: state.board.map((board) =>
          board.taskListId === taskListId
            ? {
                ...board,
                tasks: board.tasks.map((t) =>
                  t.taskId === taskId ? { ...t, task } : t
                ),
              }
            : board
        ),
      })),
      

  })),
);

export default useSingleBoardState;
