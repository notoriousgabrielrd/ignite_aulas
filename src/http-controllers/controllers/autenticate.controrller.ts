import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserAlreadyExistsError } from '@/services-use-cases/errors/user-already-exists-error'
import { AutenticationService } from '@/services-use-cases/autenticate.service'
import { InvalidCredentialsError } from '@/services-use-cases/errors/invalid-credentials-error'

// Controller -> Recebe e devolve as respostas HTTP
export const autenticateController = async (request: FastifyRequest, reply: FastifyReply) => {
    console.log('request', request)
    const registerBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, password } = registerBodySchema.parse(request.body)

    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const autenticateService = new AutenticationService(prismaUsersRepository)
        await autenticateService.execute({
            email, password
        })
    } catch (err) {
        if (err instanceof InvalidCredentialsError) {
            return reply.status(400).send({ message: err.message })
        }

        throw err
    }

    return reply.status(200).send()
}