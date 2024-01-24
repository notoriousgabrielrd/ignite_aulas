import { fastify } from "fastify";
import { appRoutes } from "./http-controllers/routes";
import { ZodError } from "zod";
import { env } from "./env";


export const app = fastify({
    logger: true
});

app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {

    if (error instanceof ZodError) {
        return reply.status(400).send({ message: "Erro de validação", issues: error.format() })
    }


    if (env.NODE_ENV !== "prod") {
        console.error(error)
    } else {
        // log para uma ferramenta externa Datadog, relix Sentry
    }

    return reply.status(500).send({ message: "Erro interno no server" })


})