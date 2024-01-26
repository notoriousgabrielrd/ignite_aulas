import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";
import { User } from "@prisma/client";
import { InvalidResourceError } from "../errors/resource-not-found.error";

interface InterfaceGetUserProfileServiceRequest {
    userId: string
}
interface InterfaceGetUserProfileServiceResponse {
    user: User
}

export class GetUserProfileService {
    constructor(private usersRepository: PrismaUsersRepository) { } // Inversão de dependência. O service não depende mais do Prisma

    async execute({ userId }: InterfaceGetUserProfileServiceRequest): Promise<InterfaceGetUserProfileServiceResponse> {
        // autenticação
        const user = await this.usersRepository.findById(userId)

        if (!user) { throw new InvalidResourceError() }

        return {
            user
        }
    }

}