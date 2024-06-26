import type { Prisma } from "@prisma/client";

export interface Phone {
  countryCode: string;
  number: string;
}

export interface UserInterface {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  countryCode: string;
  dob: string;
  sex: "male" | "female" | "diverse";
  phoneNumber: string;
  hash: string;
  salt: string;
  status?: "active" | "inactive";
}
