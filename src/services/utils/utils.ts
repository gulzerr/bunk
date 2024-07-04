import { Prisma } from "@prisma/client";
import pino from "pino";
import * as log4js from "log4js";
import { prisma } from "../../libs/prisma";

// export const logger = pino({
//   level: "info",
// });

log4js.configure({
  appenders: { cheese: { type: "file", filename: "cheese.log" } },
  categories: { default: { appenders: ["cheese"], level: "error" } },
});
export const logger = log4js.getLogger();

export async function createOrReturnTransaction<T>(
  transaction: Prisma.TransactionClient | null | undefined,
  callback: (transaction: Prisma.TransactionClient) => Promise<T>
): Promise<T> {
  if (transaction) {
    return callback(transaction);
  }
  return prisma.$transaction((tx: Prisma.TransactionClient) => callback(tx));
}

export function getExpTimestamp(seconds: number) {
  const currentTimeMillis = Date.now();
  const secondsIntoMillis = seconds * 1000;
  const expirationTimeMillis = currentTimeMillis + secondsIntoMillis;

  return Math.floor(expirationTimeMillis / 1000);
}
