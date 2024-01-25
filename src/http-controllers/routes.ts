import { FastifyInstance } from "fastify"
import { register } from "./controllers/register.controller"
import { autenticateController } from "@/http-controllers/controllers/autenticate.controrller"

export const appRoutes = async (app: FastifyInstance) => {
    app.post('/users', register)
    app.post('/sessions', autenticateController)
}