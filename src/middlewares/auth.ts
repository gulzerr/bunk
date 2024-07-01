import { Elysia } from "elysia";
import { prisma } from "../libs/prisma";

export const isAuthenticated = (app: Elysia) =>
  // @ts-ignore
  app.derive(async ({ cookie, jwt, set }) => {
    console.log(cookie);
    if (!cookie!.access_token) {
      set.status = 401;
      return {
        success: false,
        message: "Unauthorized",
        data: null,
      };
    }
    const { userId } = await jwt.verify(cookie!.access_token);
    if (!userId) {
      set.status = 401;
      return {
        success: false,
        message: "Unauthorized",
        data: null,
      };
    }

    const user = await prisma.users.findUnique({
      where: {
        ID: userId,
      },
    });
    if (!user) {
      set.status = 401;
      return {
        success: false,
        message: "Unauthorized",
        data: null,
      };
    }
    return {
      user,
    };
  });
