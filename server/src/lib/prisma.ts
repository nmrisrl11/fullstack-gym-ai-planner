import "dotenv/config";
import { PrismaClient } from "../../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = `${process.env.DATABASE_URL}`;

if (!connectionString) {
	throw new Error("DATABASE_URL is not defined in environment variables");
}

const adapter = new PrismaPg({ connectionString });

const prisma = new PrismaClient({
	log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
	adapter,
});

export { prisma };
