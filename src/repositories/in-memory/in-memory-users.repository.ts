import { Prisma, User } from "@prisma/client";
import { PrismaUsersRepository } from "../prisma/prisma-users-repository";

export class InMemoryUsersRepository implements PrismaUsersRepository {
    public items: User[] = []

    async findById(userId: string) {
        const user = this.items.find(item => item.id === userId)

        if (!user) return null

        return user
    }

    async findByEmail(email: string) {
        const userEmail = this.items.find(item => item.email === email)
        if (!userEmail) return null

        return userEmail
    }

    async create(data: Prisma.UserCreateInput) {
        const user = {
            id: 'user-1',
            name: data.name,
            email: data.email,
            hashed_password: data.hashed_password,
            creted_at: new Date()
        }

        this.items.push(user)
        return user
    }
}