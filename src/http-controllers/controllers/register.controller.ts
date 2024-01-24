import { z } from 'zod'
import { prisma } from "@/lib/prisma"
import { FastifyRequest, FastifyReply } from 'fastify'
import { hash } from "bcryptjs"
import { registerService } from '@/env/services-use-cases/register.service'

export const register = async (request: FastifyRequest, reply: FastifyReply) => {
    console.log('request', request)
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    try {
        await registerService({
            name, email, password
        })
    } catch (err) {
        return reply.status(409).send()
    }

    return reply.status(201).send()
}