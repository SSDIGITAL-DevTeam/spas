export default class ApiError extends Error {
    constructor(
        public statusCode: number,
        public data: object,
        public message: string = '',
    ) {
        super(message)
    }

    public static make(
        statusCode: number,
        data: object,
        message: string = '',
    ): ApiError {
        return new this(statusCode, data, message)
    }
}
