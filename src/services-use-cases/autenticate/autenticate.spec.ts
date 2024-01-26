import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository'
import { AutenticationService } from './autenticate.service'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

// it.skip || it.only
let usersRepository: InMemoryUsersRepository
let sut: AutenticationService // S.U.T -> System Under Test

describe('Testes para Autenticate Services', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new AutenticationService(usersRepository)
    })

    it('Deve ser possível autenticar-se', async () => {



        await usersRepository.create({
            name: 'John Doe',
            email: "johndoe@email.com",
            hashed_password: await hash('123456', 6)
        })

        const { user } = await sut.execute({
            email: "johndoe@email.com",
            password: "123456"
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('Não deve ser possível autenticar-se com email errado', async () => {



        expect(async () =>
            await sut.execute({
                email: "johndoe@email.com",
                password: "123456"
            }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('Não deve ser possível autenticar-se com senha errada', async () => {



        await usersRepository.create({
            name: 'John Doe',
            email: "johndoe@email.com",
            hashed_password: await hash('123456', 6)
        })

        expect(async () =>
            await sut.execute({
                email: "johndoe@email.com",
                password: "123123"
            }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

})