import { UserInterfaceRepository } from "@/repositories/users.interface.repository"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "../errors/user-already-exists-error"
import { User } from "@prisma/client"

interface RegisterServicieRequest {
    name: string,
    email: string,
    password: string
}

interface RegisterServiceResponse {
    user: User
}
// Service/Use Cases -> Lida com todas as alterações na percursão do dado ao banco
export class RegisterService {
    constructor(private usersRepository: UserInterfaceRepository) { }

    executeRegisterService = async ({ name, email, password }: RegisterServicieRequest): Promise<RegisterServiceResponse> => {
        const hashed_password = await hash(password, 6)


        const userWithSameEmail = await this.usersRepository.findByEmail(email)
        if (userWithSameEmail) {
            throw new UserAlreadyExistsError()
        }

        const user = await this.usersRepository.create({
            name, email, hashed_password
        })

        return {
            user,
        }
    }
}

