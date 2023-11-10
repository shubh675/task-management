import dbServices from "@services/services";
import type { Session } from "next-auth";
export async function getUserIdFromSession(session: Session) {
  try {
    if(!session){
        throw Error("not authorized");
    }

   else if (session?.user?.email) {
      const userExit = await dbServices.userService.getUser(
        session.user?.email,
      );
      if (userExit) {
        return userExit.userId;
      }
    }
    throw Error("something went wrong")
  } catch (error) {
    console.log(error);
  }
}
