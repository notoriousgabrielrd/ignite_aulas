import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { InMemoryCheckinRepository } from '@/repositories/in-memory/in-memory-checkin.repository'
import { CheckinService } from './checkin.service'

// it.skip || it.only
let checkinRepository: InMemoryCheckinRepository
let sut: CheckinService // S.U.T -> System Under Test

describe('Testes para Checkin Services', () => {
    beforeEach(() => {
        checkinRepository = new InMemoryCheckinRepository()
        sut = new CheckinService(checkinRepository)
    })

    it('Deve ser possível checar-se', async () => {
        const { checkIn } = await sut.executeRegisterService({
            gymId: 'gym-01',
            userId: '123-321'
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

})