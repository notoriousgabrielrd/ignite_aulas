import { z } from 'zod'
import { prisma } from "@/lib/prisma"
import { FastifyRequest, FastifyReply } from 'fastify'
import { hash } from "bcryptjs"

export const register = async (request: FastifyRequest, reply: FastifyReply) => {
    console.log('request', request)
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    const hashed_password = await hash(password, 6)
    const userWithSameEmail = await prisma.user.findUnique({
        where: { email }
    })

    if (userWithSameEmail) return reply.status(409).send()

    await prisma.user.create({
        data: {
            email,
            name,
            hashed_password
        }
    })

    return reply.status(201).send()
}