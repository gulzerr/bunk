import { Elysia, t } from "elysia";
import { logger } from "../../services/utils/utils";
import { isAuthenticated } from "../../middlewares/auth";

export const createUserCtrl = new Elysia().use(isAuthenticated).post(
  "/createUser",
  async ({ body, cookie }) => {
    try {
      const { firstName, lastName, email, password, phone } = body;
      const user = {
        firstName,
        lastName,
        email,
        password,
        phone,
      };
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
