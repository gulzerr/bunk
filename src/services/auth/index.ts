import { prisma } from "../../libs/prisma";
import { createUser, fetchUserByEmail, fetchUserByUserName } from "../users";
import { hashPassword } from "../utils/bcrypt";
import { createOrReturnTransaction } from "../utils/utils";
import type { SignupInterface } from "./types";

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
