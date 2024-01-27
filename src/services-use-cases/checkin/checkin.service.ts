import { Checkin } from "@prisma/client"
import { CheckInsRepository } from "@/repositories/prisma/checkin-repository"

interface CheckinServicieRequest {
    userId: string
    gymId: string
}

interface CheckinServiceResponse {
    checkIn: Checkin
}

// Service/Use Cases -> Lida com todas as alterações na percursão do dado ao banco
export class CheckinService {
    constructor(private checkinsRepository: CheckInsRepository) { }

    executeCheckinService = async ({ userId, gymId }: CheckinServicieRequest): Promise<CheckinServiceResponse> => {
        const checkInOnSamedate = await this.checkinsRepository.findByUserIdOnDate(userId, new Date())

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

