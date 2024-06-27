import { Elysia, t } from "elysia";
import { createUser } from "../../services/users/user";
import { logger } from "../../services/utils/utils";

export const createUserCtrl = new Elysia().post(
  "/createUser",
  async ({ body }) => {
    try {
      const { firstName, lastName, email, password, phone } = body;
      const user = await createUser({
        firstName,
        lastName,
        email,
        password,
        phone,
      });
      return {
        isError: false,
        data: user,
      };
    } catch (err) {
      const error = err as Error;
      logger.error(error.message);
      return {
        isError: true,
        message: error.message,
      };
    }
  },
  {
    body: t.Object({
      firstName: t.String(),
      lastName: t.String(),
      email: t.String(),
      password: t.String(),
      phone: t.Object({
        countryCode: t.String(),
        number: t.String(),
      }),
    }),
  }
);
