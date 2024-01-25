import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { RegisterService } from "../register.service"

export const makeFactoryService = () => {
    const prismaUsersRepository = new PrismaUsersRepository()
    const registerService = new RegisterService(prismaUsersRepository)

    return registerService
}