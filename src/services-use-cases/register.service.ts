import { prisma } from "@/lib/prisma"
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository"
import { hash } from "bcryptjs"

interface RegisterServicieRequest {
    name: string,
    email: string,
    password: string
}

// Service/Use Cases -> Lida com todas as alterações na percursão do dado ao banco
export const registerService = async ({
    name, email, password
}: RegisterServicieRequest) => {
    const hashed_password = await hash(password, 6)
    const userWithSameEmail = await prisma.user.findUnique({
        where: { email }
    })

    if (userWithSameEmail) {
        throw new Error("Email já existe!")
    }

    const prismaUsersRepository = new PrismaUsersRepository
    prismaUsersRepository.create({ name, email, hashed_password })
}