import { beforeEach, describe, expect, it, vi, afterEach } from 'vitest'
import { InMemoryCheckinRepository } from '@/repositories/in-memory/in-memory-checkin.repository'
import { CheckinService } from './checkin.service'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

// it.skip || it.only
let checkinRepository: InMemoryCheckinRepository
let gymsRepository: InMemoryGymRepository
let sut: CheckinService // S.U.T -> System Under Test

describe('Testes para Checkin Services', () => {
    beforeEach(() => {
        checkinRepository = new InMemoryCheckinRepository()
        gymsRepository = new InMemoryGymRepository()
        sut = new CheckinService(checkinRepository, gymsRepository)
        vi.useFakeTimers()

        gymsRepository.items.push({
            id: 'gym-01',
            title: 'Academia JS',
            description: '',
            latitude: new Decimal(0),
            longitude: new Decimal(0),
            phone: ''
        })
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('Deve ser possível checar-se', async () => {

        const { checkIn } = await sut.executeCheckinService({
            gymId: 'gym-01',
            userId: '123-321',
            latitude: 0,
            longitude: 0
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('Não deve ser possível checar-se 2x no mesmo dia', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
        await sut.executeCheckinService({
            gymId: 'gym-01',
            userId: '123-321',
            latitude: 0,
            longitude: 0
        })

        expect(async () => {
            await sut.executeCheckinService({
                gymId: 'gym-01',
                userId: '123-321',
                latitude: 0,
                longitude: 0
            })
        }).rejects.toBeInstanceOf(Error)
    })

    it('Deve ser possível checar-se 2x no mesmo dia, mas em dias diferentes', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
        await sut.executeCheckinService({
            gymId: 'gym-01',
            userId: '123-321',
            latitude: 0,
            longitude: 0
        })

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))
        const { checkIn } = await sut.executeCheckinService({
            gymId: 'gym-01',
            userId: '123-321',
            latitude: 0,
            longitude: 0
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('Não deve ser possível checar-se distante da academia', async () => {
        //16.0596005,-47.9611932

        gymsRepository.items.push({
            id: 'gym-02',
            title: 'Academia JS',
            description: '',
            latitude: new Decimal(16.0596005),
            longitude: new Decimal(47.9611932),
            phone: ''
        })

        expect(async () => {
            await sut.executeCheckinService({
                gymId: 'gym-02',
                userId: '123-321',
                latitude: -16.0428182,
                longitude: -47.861419
            })
        }).rejects.toBeInstanceOf(Error)

    })

})