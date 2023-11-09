import api from "./react";
import type {ReactQueryOptions,RouterOutputs,RouterInputs} from "../shared"

type TaskListCreateOptions = ReactQueryOptions['taskList']['create'];

export function useCreateTaskList(options?: TaskListCreateOptions) {
    const utils = api.useUtils();
 
  return  api.taskList.create.useMutation({
    ...options,
    onSuccess() {
      // invalidate all queries on the taskList
      // when a new TaskList is created
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      utils.taskList.invalidate()

      //options?.onSuccess(input)
    },
  })
}
 