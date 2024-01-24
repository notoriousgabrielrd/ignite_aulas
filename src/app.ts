import { fastify } from "fastify";
import { appRoutes } from "./http-controllers/routes";


export const app = fastify({
    logger: true
});

app.register(appRoutes)