import { db } from "./db";
import type {
  userType,
} from "./schema";

 const userService =  {
    createUser: async (user: userType) => {
        return await db.user.create({ data: user });
      },
    getUser: async (email: string) => {
        return await db.user.findUnique({ where: { email: email } });
      }
}

export default userService;





