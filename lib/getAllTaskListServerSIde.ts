import dbServices from "@services/services";
import type { Session } from "next-auth";
import { removeAfterAtSymbol } from "./utilityFunctions/removeAfterAtSymbol";
export async function getAllTaskListServerSide(session: Session | null) {
  try {
    if(!session){
        throw Error("not authorized");
    }

   else if (session?.user?.email) {
      const userExit = await dbServices.userService.getUser(
        session.user?.email,
      );
      if (userExit) {
        const AllTaskList =
          await dbServices.taskListService.getAllTasklistByUserId(
            userExit.userId,
          );
        return AllTaskList;
      } else {
        const userName =
          session?.user?.name ?? removeAfterAtSymbol(session?.user?.email);
        const newUser = await dbServices.userService.createUser({
          name: userName,
          email: session?.user?.email,
        });
        if (newUser) {
          return [];
        }
      }
    }
  
    throw Error("something Went wrong")
  } catch (err) {
    console.log(err);
  }
  return null;
}
