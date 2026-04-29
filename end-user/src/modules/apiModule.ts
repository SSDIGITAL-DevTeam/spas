const apiUrl: string = process.env.NEXT_PUBLIC_API_URL

export type ApiErrorData = {
    status?: boolean
    message?: string
    errors?: Record<string, string[]>
}

export class ApiRequestError extends Error {
    constructor(
        public statusCode: number,
        public data: ApiErrorData,
        message: string = '',
    ) {
        super(message || data?.message || 'An error occurred.')
    }

    public getFirstError(): string {
        if (this.data?.errors) {
            const firstMessages = Object.values(this.data.errors)[0]
            if (firstMessages?.length) return firstMessages[0]
        }
        return this.data?.message || this.message || 'An error occurred.'
    }
}

export const apiModule = async (
    endpoint: string,
    requestMethod: string = 'GET',
    additionalHeader?: HeadersInit,
    formData?: FormData,
) => {
    const res = await fetch(`${apiUrl}${endpoint}`, {
        method: requestMethod,
        headers: {
            Accept: 'application/json',
            ...additionalHeader,
        },
        body: formData,
    })

    if (!res.ok) {
        let body: ApiErrorData = {}
        try {
            body = await res.json()
        } catch {
            // response body is not JSON
        }
        throw new ApiRequestError(res.status, body, body?.message)
    }

    if (res.status === 204) {
        return
    }

    return res.json()
}
