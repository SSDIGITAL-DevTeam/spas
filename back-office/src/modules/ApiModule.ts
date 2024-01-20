import ApiError from '@/errors/ApiError'

export default class ApiModule<ResType> {
    public static defaultHeaders: HeadersInit = {
        Accept: 'application/json',
    }

    protected apiUrl: string = process.env.NEXT_PUBLIC_API_URL
    protected request?: RequestInit

    public constructor(private url: string) {}

    public static makeRequestTo<ResType>(url: string): ApiModule<ResType> {
        return new this(url)
    }

    public async with(request?: RequestInit): Promise<ResType> {
        this.request = request

        this.request!.headers = {
            ...request?.headers,
            ...ApiModule.defaultHeaders,
        }

        return await this.run()
    }

    private async run(): Promise<ResType> {
        const res = await fetch(`${this.apiUrl}${this.url}`, this.request)

        if (!res.ok) {
            throw ApiError.make(res.status, await res.json())
        }

        if (res.status === 204) {
            return {} as ResType
        }

        return await res.json()
    }
}
