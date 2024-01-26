import { UserInterfaceRepository } from "@/repositories/users.interface.repository"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "../errors/user-already-exists-error"
import { Checkin, User } from "@prisma/client"
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

    executeRegisterService = async ({ userId, gymId }: CheckinServicieRequest): Promise<CheckinServiceResponse> => {
        const checkin = await this.checkinsRepository.create({
            gym_id: gymId,
            user_id: userId
        })

        return {
            checkIn: checkin
        }

    }
}

