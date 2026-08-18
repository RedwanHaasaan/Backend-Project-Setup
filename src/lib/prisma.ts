import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import { env } from "../config/env.js";
import AppError from "../errors/AppError.js";

const connectionString = env.dbUrl;
if (!connectionString) {
  throw new AppError(404, "DATABASE URL is not defined", "", "Please provide your connection string");
}
console.log("DATABASE HOST:", new URL(connectionString).hostname);
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };