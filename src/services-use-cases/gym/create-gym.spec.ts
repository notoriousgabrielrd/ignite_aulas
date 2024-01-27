import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymService } from './create-gym.service'

// it.skip || it.only

let gymRepository: InMemoryGymRepository
let sut: CreateGymService

describe('Testes para Gym Services', () => {

    beforeEach(() => {
        gymRepository = new InMemoryGymRepository()
        sut = new CreateGymService(gymRepository)
    })
    it('Deve ser possível criar uma academia', async () => {

        const { gym } = await sut.execute({
            title: 'Academia JS',
            description: '',
            latitude: 16.0596005,
            longitude: 47.9611932,
            phone: ''
        })

        expect(gym.id).toEqual(expect.any(String))
    })

})