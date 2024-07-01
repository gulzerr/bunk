import { Elysia, t } from "elysia";
import { prisma } from "../../libs/prisma";
import { comparePassword } from "../../services/utils/bcrypt";
import { isAuthenticated } from "../../middlewares/auth";
import { signUp } from "../../services/auth";

export const auth = (app: Elysia) =>
  app.group("/auth", (app) =>
    app
      .post(
        "/signup",
        async ({ body, set }) => {
          try {
            const {
              firstName,
              lastName,
              email,
              password,
              username,
              countryCode,
              dob,
              sex,
              phoneNumber,
            } = body;
            const newUser = await signUp({
              firstName,
              lastName,
              email,
              password,
              username,
              countryCode,
              dob,
              phoneNumber,
              sex,
            });
            return {
              isError: false,
              message: "Account created",
              data: {
                user: newUser,
              },
            };
          } catch (error) {
            const err = error as Error;
            set.status = 400;
            return {
              isError: true,
              message: err.message,
              data: null,
            };
          }
        },
        {
          body: t.Object({
            firstName: t.String(),
            lastName: t.String(),
            email: t.String({
              format: "email",
            }),
            username: t.String(),
            password: t.String(),
            sex: t.Union([
              t.Literal("male"),
              t.Literal("female"),
              t.Literal("diverse"),
            ]),
            dob: t.String(),
            phoneNumber: t.String(),
            countryCode: t.String(),
          }),
        }
      )
      .post(
        "/login",
        // @ts-ignore
        async ({ body, set, jwt, setCookie }) => {
          const { username, password } = body;
          // verify email/username
          const user = await prisma.users.findFirst({
            where: {
              OR: [
                {
                  EMAIL: username,
                },
                {
                  USERNAME: username,
                },
              ],
            },
            select: {
              ID: true,
              HASH: true,
              SALT: true,
            },
          });

          if (!user) {
            set.status = 400;
            return {
              success: false,
              data: null,
              message: "Invalid credentials",
            };
          }

          // verify password
          const match = await comparePassword(password, user.SALT, user.HASH);
          if (!match) {
            set.status = 400;
            return {
              success: false,
              data: null,
              message: "Invalid credentials",
            };
          }

          // generate access

          const accessToken = await jwt.sign({
            userId: user.ID,
          });

          setCookie("access_token", accessToken, {
            maxAge: 15 * 60, // 15 minutes
            path: "/",
          });

          return {
            success: true,
            data: null,
            message: "Account login successfully",
          };
        },
        {
          body: t.Object({
            username: t.String(),
            password: t.String(),
          }),
        }
      )
      .use(isAuthenticated)
      // protected route
      .get("/me", ({ user }) => {
        return {
          success: true,
          message: "Fetch authenticated user details",
          data: {
            user,
          },
        };
      })
  );
