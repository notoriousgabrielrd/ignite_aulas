import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";


// Repository -> Responsável pelo CRUD diretamente dentro do banco
export class PrismaUsersRepository {
    async create(data: Prisma.UserCreateInput) { // Prisma.UserCreateInput é gerado automaticamente pelo Prisma e funciona como uma tipagem

        const user = await prisma.user.create({
            data
        })
        return user
    }
}