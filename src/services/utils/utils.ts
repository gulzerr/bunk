import { Prisma } from "@prisma/client";
import pino from "pino";
import { prisma } from "../../libs/prisma";

export const logger = pino({
  level: "info",
});

export async function createOrReturnTransaction<T>(
  transaction: Prisma.TransactionClient | null | undefined,
  callback: (transaction: Prisma.TransactionClient) => Promise<T>
): Promise<T> {
  if (transaction) {
    return callback(transaction);
  }
  return prisma.$transaction((tx) => callback(tx));
}
