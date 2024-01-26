export class InvalidResourceError extends Error {
    constructor() {
        super('O recurso buscado não foi encontrado.')
    }
}