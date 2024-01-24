import fastify from "fastify";
import { PrismaClient } from "@prisma/client";

export const app = fastify();

const prisma = new PrismaClient()

prisma.user.create({
    data: {
        email: "johndoe@email.com",
        name: "John Doe"
    }
})
