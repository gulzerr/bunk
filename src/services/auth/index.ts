import type { Cookie } from "elysia";
import {
  createUser,
  fetchUserByEmail,
  fetchUserByEmailOrUserName,
  fetchUserByUserName,
} from "../users";
import { comparePassword, hashPassword } from "../utils/bcrypt";
import { createOrReturnTransaction, getExpTimestamp } from "../utils/utils";
import type { SignupInterface } from "./types";
import { ACCESS_TOKEN_EXP } from "../../configs/constants";

export async function signUp(data: SignupInterface) {
  const { email, password, username, tx } = data;
  const newUser = await createOrReturnTransaction(
    tx,
    async (prismaTransactionClient) => {
      // validate duplicate email address
      const emailExists = await fetchUserByEmail(
        email,
        prismaTransactionClient
      );
      if (emailExists) {
        throw new Error("Someone already taken this email address.");
      }

      // validate duplicate username
      const usernameExists = await fetchUserByUserName(
        username,
        prismaTransactionClient
      );
      if (usernameExists) {
        throw new Error("Someone already taken this username.");
      }

      // handle password
      const { hash, salt } = await hashPassword(password);
      const user = await createUser(
        {
          ...data,
          hash: hash,
          salt: salt,
        },
        prismaTransactionClient
      );
      return user;
    }
  );

  return newUser;
}

export async function login(opts: {
  username: string;
  password: string;
  jwt: any;
  accessToken: Cookie<any>;
}) {
  const { username, password, jwt, accessToken } = opts;
  return await createOrReturnTransaction(
    null,
    async (prismaTransactionClient) => {
      const user = await fetchUserByEmailOrUserName(
        username,
        prismaTransactionClient
      );

      if (!user) {
        throw new Error("Invalid credentials");
      }

      // verify password
      const match = await comparePassword(password, user.SALT, user.HASH);
      if (!match) {
        throw new Error("Invalid credentials");
      }
      const accessJWTToken = await jwt.sign({
        sub: user.ID,
        exp: getExpTimestamp(ACCESS_TOKEN_EXP),
      });

      const token = accessToken.set({
        value: accessJWTToken,
        httpOnly: true,
        maxAge: ACCESS_TOKEN_EXP,
        // path: "/",
      });

      return token;
    }
  );
}
// implementation: https://dev.to/harshmangalam/implement-jwt-refresh-token-authentication-with-elysia-js-and-prisma-a-step-by-step-guide-1dc
