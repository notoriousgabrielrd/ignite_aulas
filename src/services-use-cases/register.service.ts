import { UserInterfaceRepository } from "@/repositories/users.interface.repository"
import { hash } from "bcryptjs"

interface RegisterServicieRequest {
    name: string,
    email: string,
    password: string
}
// Service/Use Cases -> Lida com todas as alterações na percursão do dado ao banco
export class RegisterService {
    constructor(private usersRepository: UserInterfaceRepository) { }

    executeRegisterService = async ({
        name, email, password
    }: RegisterServicieRequest) => {
        const hashed_password = await hash(password, 6)


        const userWithSameEmail = await this.usersRepository.findByEmail(email)
        if (userWithSameEmail) {
            throw new Error("Email já existe!")
        }

        await this.usersRepository.create({
            name, email, hashed_password
        })
    }
}

