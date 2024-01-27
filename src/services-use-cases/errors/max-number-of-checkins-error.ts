export class MaxNumberOfCheckinsError extends Error {
    constructor() {
        super('Usuário ultrapassou o número máximo de checkins diários.')
    }
}