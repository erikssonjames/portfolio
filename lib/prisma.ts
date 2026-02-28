import { PrismaClient } from "@/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg"

declare global {
  var prisma: PrismaClient | undefined
}

export const prismaClient = global.prisma ?? new PrismaClient({
  adapter: new PrismaPg({ connectionString: `${process.env.DATABASE_URL}` })
});

if (process.env.NODE_ENV !== "production") global.prisma = prismaClient;