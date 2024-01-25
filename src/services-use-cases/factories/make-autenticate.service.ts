import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { AutenticationService } from "../autenticate.service"

export const makeAutenticateService = () => {
    const prismaUsersRepository = new PrismaUsersRepository()
    const autenticateService = new AutenticationService(prismaUsersRepository)

    return autenticateService
}