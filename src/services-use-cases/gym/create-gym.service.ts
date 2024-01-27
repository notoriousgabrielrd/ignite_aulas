
import { Gym } from "@prisma/client"
import { GymsRepository } from "@/repositories/prisma/gyms-repository"

interface CreateGymServicieRequest {
    title: string
    description?: string | null
    phone?: string | null
    latitude: number
    longitude: number

}

interface CreateGymServiceResponse {
    gym: Gym
}
// Service/Use Cases -> Lida com todas as alterações na percursão do dado ao banco
export class CreateGymService {
    constructor(private gymsRepository: GymsRepository) { }

    execute = async ({ title, description, phone, latitude, longitude }: CreateGymServicieRequest): Promise<CreateGymServiceResponse> => {

        const gym = await this.gymsRepository.create({ title, description, phone, latitude, longitude })

        return { gym }


    }
}

