export class ApiError extends Error{
    constructor(
        message : string,
        public readonly statusCode: number,
        public readonly url: string,
        public readonly method: string
    ){
        super(message)
        this.name = 'ApiError'
    }
}