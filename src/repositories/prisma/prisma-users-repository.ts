import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { UserInterfaceRepository } from "../users.interface.repository";


// Repository -> Responsável pelo CRUD diretamente dentro do banco
export class PrismaUsersRepository implements UserInterfaceRepository {

    async findByEmail(email: string) {
        const userEmail = await prisma.user.findUnique({ where: { email } })
        return userEmail
    }

    async create(data: Prisma.UserCreateInput) { // Prisma.UserCreateInput é gerado automaticamente pelo Prisma e funciona como uma tipagem

        const user = await prisma.user.create({
            data
        })
        return user
    }
}