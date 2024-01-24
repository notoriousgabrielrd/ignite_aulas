import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"

interface RegisterServicieRequest {
    name: string,
    email: string,
    password: string
}

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

    await prisma.user.create({
        data: {
            email,
            name,
            hashed_password
        }
    })
}