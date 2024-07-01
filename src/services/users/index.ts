import type { Prisma } from "@prisma/client";
import type { UserInterface } from "./types";

export const createUser = async (
  user: UserInterface,
  prisma: Prisma.TransactionClient
) => {
  const newUser = await prisma.users.create({
    data: {
      FIRST_NAME: user.firstName,
      LAST_NAME: user.lastName,
      EMAIL: user.email,
      HASH: user.hash,
      SALT: user.salt,
      USERNAME: user.username,
      STATUS: "active",
      GENDER: user.sex,
      DOB: user.dob,
      PHONE_NUMBER: user.phoneNumber,
      COUNTRY_CODE: user.countryCode,
    },
  });
  return newUser;
};

export const fetchUserByEmail = async (
  email: string,
  prisma: Prisma.TransactionClient
) => {
  const data = await prisma.users.findUnique({
    where: {
      EMAIL: email,
    },
    select: {
      ID: true,
    },
  });
  return data;
};

export const fetchUserByUserName = async (
  username: string,
  prisma: Prisma.TransactionClient
) => {
  const data = await prisma.users.findUnique({
    where: {
      USERNAME: username,
    },
    select: {
      ID: true,
    },
  });
  return data;
};
