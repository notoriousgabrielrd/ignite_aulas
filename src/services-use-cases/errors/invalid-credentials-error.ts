export class InvalidCredentialsError extends Error {
    constructor() {
        super('Credenciais não são válidas.')
    }
}