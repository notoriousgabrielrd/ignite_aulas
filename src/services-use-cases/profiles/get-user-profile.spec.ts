import { describe, expect, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository'
import { GetUserProfileService } from './get-user-profile.service'
import { InvalidResourceError } from '../errors/resource-not-found.error'

// it.skip || it.only

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileService

describe('Testes para Profile Services', () => {

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new GetUserProfileService(usersRepository)
    })
    it('Deve ser possível buscar um usuário por ID', async () => {

        const createdUser = await usersRepository.create({
            name: "John Doe",
            email: "johndoe@email.com",
            hashed_password: await hash('123456', 6)
        })


        const { user } = await sut.execute({
            userId: createdUser.id
        })

        expect(user.id).toEqual(expect.any(String))
        expect(user.name).toEqual("John Doe")
    })

    it('Não deve ser possível buscar um usuário por um ID errado', async () => {

        expect(async () =>
            await sut.execute({
                userId: "non-existing-id"
            }),
        ).rejects.toBeInstanceOf(InvalidResourceError)
    })


})