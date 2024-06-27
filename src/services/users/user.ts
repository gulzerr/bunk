import type { User } from "./types";

export const createUser = async (user: User) => {
  console.log("User created", user);
  return user;
};
