"use client"
import React from "react";
import type { Task } from "@prisma/client";

interface SingleTaskProps {
  task: Task;
}
const SingleTask = ({ task }: SingleTaskProps) => {
  return (
    <div className="rounded border border-gray-200 bg-white p-2 text-black shadow">
      {task.task}
    </div>
  );
};

export default SingleTask;
