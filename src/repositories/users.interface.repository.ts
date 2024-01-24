import { Prisma, User } from "@prisma/client";

// Tipagem de métodos que vão existir dentro da classe UserRepository
export interface UserInterfaceRepository {

    findByEmail(email: string): Promise<User | null>

    create(data: Prisma.UserCreateInput): Promise<User>
}