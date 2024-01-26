import { Prisma, User } from "@prisma/client";

// Tipagem de métodos que vão existir dentro da classe UserRepository
export interface UserInterfaceRepository {

    findById(userId: string): Promise<User | null>

    findByEmail(email: string): Promise<User | null>

    create(data: Prisma.UserCreateInput): Promise<User>
}