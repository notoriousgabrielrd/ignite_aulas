export class UserAlreadyExistsError extends Error {
    constructor() {
        super('O e-mail selecionado já está cadastrado!')
    }
}