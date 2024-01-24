import { z } from 'zod'
import { prisma } from "@/lib/prisma"
import { FastifyRequest, FastifyReply } from 'fastify'

export const register = async (request: FastifyRequest, reply: FastifyReply) => {
    console.log('request', request)
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    await prisma.user.create({
        data: {
            email,
            name,
            hashed_password: password
        }
    })

    return reply.status(201).send()
}