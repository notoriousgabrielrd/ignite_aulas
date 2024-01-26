import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

interface InterfaceAutenticateServiceRequest {
    email: string
    password: string
}
interface InterfaceAutenticateServiceResponse {
    user: User
}



export class AutenticationService {
    constructor(private usersRepository: PrismaUsersRepository) { } // Inversão de dependência. O service não depende mais do Prisma

    async execute({ email, password }: InterfaceAutenticateServiceRequest): Promise<InterfaceAutenticateServiceResponse> {
        // autenticação
        const user = await this.usersRepository.findByEmail(email)

        if (!user) { throw new InvalidCredentialsError() }

        const doesPasswordMatches = await compare(password, user.hashed_password)

        if (!doesPasswordMatches) { throw new InvalidCredentialsError() }

        return {
            user
        }
    }

}