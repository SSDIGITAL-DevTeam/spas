const apiUrl: string = process.env.NEXT_PUBLIC_API_URL

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
        throw new Error()
    }

    if (res.status === 204) {
        return
    }

    return res.json()
}
