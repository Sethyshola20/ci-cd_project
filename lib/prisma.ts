import {PrismaClient} from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined
}

export const prisma =
	global.prisma ||
	new PrismaClient({
		log: ["error"],
	});


if (process.env.ENVIRONNEMENT !== "production") global.prisma = prisma;
