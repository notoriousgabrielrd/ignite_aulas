import { beforeEach, describe, expect, it, vi, afterEach } from 'vitest'
import { InMemoryCheckinRepository } from '@/repositories/in-memory/in-memory-checkin.repository'
import { CheckinService } from './checkin.service'

// it.skip || it.only
let checkinRepository: InMemoryCheckinRepository
let sut: CheckinService // S.U.T -> System Under Test

describe('Testes para Checkin Services', () => {
    beforeEach(() => {
        checkinRepository = new InMemoryCheckinRepository()
        sut = new CheckinService(checkinRepository)
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('Deve ser possível checar-se', async () => {

        const { checkIn } = await sut.executeCheckinService({
            gymId: 'gym-01',
            userId: '123-321'
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('Não deve ser possível checar-se 2x no mesmo dia', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
        await sut.executeCheckinService({
            gymId: 'gym-01',
            userId: '123-321'
        })

        expect(async () => {
            await sut.executeCheckinService({
                gymId: 'gym-01',
                userId: '123-321'
            })
        }).rejects.toBeInstanceOf(Error)
    })

    it('Deve ser possível checar-se 2x no mesmo dia, mas em dias diferentes', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
        await sut.executeCheckinService({
            gymId: 'gym-01',
            userId: '123-321'
        })

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))
        const { checkIn } = await sut.executeCheckinService({
            gymId: 'gym-01',
            userId: '123-321'
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

})