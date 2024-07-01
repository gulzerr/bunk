import type { Prisma } from "@prisma/client";

export interface SignupInterface {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
  countryCode: string;
  dob: string;
  sex: "male" | "female" | "diverse";
  phoneNumber: string;
  tx?: Prisma.TransactionClient;
}
