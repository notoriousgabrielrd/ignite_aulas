import { describe, expect, it } from 'vitest'
import { RegisterService } from './register.service'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

// it.skip || it.only

describe('Testes para Register Services', () => {
    it('Deve ser possível registrar-se', async () => {

        const usersRepository = new InMemoryUsersRepository()
        const registerService = new RegisterService(usersRepository)

        const { user } = await registerService.executeRegisterService({
            name: "John Doe",
            email: "johndoe@email.com",
            password: "123456"
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('A senha deve ficar em formato hash', async () => {

        const usersRepository = new InMemoryUsersRepository()
        const registerService = new RegisterService(usersRepository)

        const { user } = await registerService.executeRegisterService({
            name: "John Doe",
            email: "johndoe@email.com",
            password: "123456"
        })

        const isPasswordCorrectlyHashed = await compare('123456', user.hashed_password)

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('Não deve ser possível registrar 2 emails iguais', async () => {

        const usersRepository = new InMemoryUsersRepository()
        const registerService = new RegisterService(usersRepository)

        const email = "johndoe@email.com"

        await registerService.executeRegisterService({
            name: "John Doe",
            email,
            password: "123456"
        })

        expect(async () => {
            await registerService.executeRegisterService({
                name: "John Doe",
                email,
                password: "123456"
            })
        }).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })



})