export type ValidationErrorValue = string | string[] | undefined
export type ValidationErrors = Record<string, ValidationErrorValue>

export type ApiErrorData = {
    status?: boolean
    message?: string
    errors?: ValidationErrors
}

export default class ApiError extends Error {
    constructor(
        public statusCode: number,
        public data: ApiErrorData,
        public message: string = '',
    ) {
        super(message || data?.message || 'An error occurred.')
    }

    public static make(
        statusCode: number,
        data: ApiErrorData,
        message: string = '',
    ): ApiError {
        return new this(statusCode, data, message || data?.message || '')
    }

    /** Returns the validation errors object, or null if none. */
    public getValidationErrors(): ValidationErrors | null {
        return this.data?.errors ?? null
    }

    /** Returns the first error message from validation errors, or falls back to the main message. */
    public getFirstError(): string {
        const errors = this.getValidationErrors()
        if (errors) {
            const firstMessages = Object.values(errors)[0]
            if (Array.isArray(firstMessages) && firstMessages.length) {
                return firstMessages[0]
            }
            if (typeof firstMessages === 'string' && firstMessages) {
                return firstMessages
            }
        }
        return this.data?.message || this.message || 'An error occurred.'
    }

    /** Returns all validation error messages as a flat array. */
    public getAllErrors(): string[] {
        const errors = this.getValidationErrors()
        if (!errors) return [this.getFirstError()]
        return Object.values(errors)
            .flatMap((value) => (Array.isArray(value) ? value : [value]))
            .filter((value): value is string => Boolean(value))
    }
}
