import { Elysia, t } from "elysia";
import { isAuthenticated } from "../../middlewares/auth";
import { login, signUp } from "../../services/auth";

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
        async ({ body, set, jwt, cookie: { accessToken } }) => {
          try {
            const { username, password } = body;
            // verify email/username
            const token = await login({
              username,
              password,
              jwt,
              accessToken,
            });

            return {
              isError: false,
              message: "Logged-in successfully",
              data: {
                access_token: token.value,
              },
            };
          } catch (error) {
            const err = error as Error;
            set.status = 400;
            console.log(`Error in login: ${err.message}`);
            return {
              isError: true,
              message: err.message,
              data: null,
            };
          }
        },
        {
          body: t.Object({
            username: t.String(),
            password: t.String(),
          }),
        }
      )
      .use(isAuthenticated)
      .post(
        "/logout",
        async ({ cookie: { accessToken, refreshToken }, user }) => {
          // remove refresh token and access token from cookies
          accessToken.remove();
          refreshToken.remove();

          return {
            message: "Logout successfully",
          };
        }
      )
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
