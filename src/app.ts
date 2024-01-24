import { fastify } from "fastify";
import { z } from 'zod'
import { prisma } from "./lib/prisma"


export const app = fastify({
    logger: true
});

app.post('/users', async (request, reply) => {
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
})
