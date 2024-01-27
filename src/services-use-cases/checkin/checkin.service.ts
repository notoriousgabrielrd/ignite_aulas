import { Checkin } from "@prisma/client"
import { CheckInsRepository } from "@/repositories/prisma/checkin-repository"
import { GymsRepository } from "@/repositories/prisma/gyms-repository"
import { InvalidResourceError } from "../errors/resource-not-found.error"
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates"

interface CheckinServicieRequest {
    userId: string
    gymId: string
    latitude: number
    longitude: number
}

interface CheckinServiceResponse {
    checkIn: Checkin
}

// Service/Use Cases -> Lida com todas as alterações na percursão do dado ao banco
export class CheckinService {
    constructor(
        private checkinsRepository: CheckInsRepository,
        private gymsRepository: GymsRepository
    ) { }

    executeCheckinService = async ({ userId, gymId, latitude, longitude }: CheckinServicieRequest): Promise<CheckinServiceResponse> => {
        const MAX_DISTANCE_IN_KILOMETERS = 0.1

        const checkInOnSamedate = await this.checkinsRepository.findByUserIdOnDate(userId, new Date())
        const gym = await this.gymsRepository.findById(gymId)

        if (!gym) throw new InvalidResourceError()

        const distante = getDistanceBetweenCoordinates(
            { latitude, longitude },
            { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
        )

        if (distante > MAX_DISTANCE_IN_KILOMETERS) throw new Error()

        if (checkInOnSamedate) throw new Error()

        const checkin = await this.checkinsRepository.create({
            gym_id: gymId,
            user_id: userId
        })

        return {
            checkIn: checkin
        }

    }
}

