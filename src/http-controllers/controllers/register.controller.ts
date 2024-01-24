import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { RegisterService } from '@/services-use-cases/register.service'
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'

// Controller -> Recebe e devolve as respostas HTTP
export const register = async (request: FastifyRequest, reply: FastifyReply) => {
    console.log('request', request)
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const registerService = new RegisterService(prismaUsersRepository)
        await registerService.executeRegisterService({
            name, email, password
        })
    } catch (err) {
        return reply.status(409).send()
    }

    return reply.status(201).send()
}