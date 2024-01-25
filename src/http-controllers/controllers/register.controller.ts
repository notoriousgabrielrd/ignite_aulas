import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { UserAlreadyExistsError } from '@/services-use-cases/errors/user-already-exists-error'
import { makeFactoryService } from '@/services-use-cases/factories/make-register.services'

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
        const registerService = makeFactoryService()
        await registerService.executeRegisterService({
            name, email, password
        })
    } catch (err) {
        if (err instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ message: err.message })
        }

        throw err
    }

    return reply.status(201).send()
}