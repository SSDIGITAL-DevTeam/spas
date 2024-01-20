declare namespace NodeJS {
    export interface ProcessEnv {
        readonly NEXT_PUBLIC_BASE_URL: string
        readonly NEXT_PUBLIC_BACKEND_URL: string
        readonly NEXT_PUBLIC_API_URL: string
        readonly NEXT_PUBLIC_ACCESS_TOKEN_NAME: string
    }
}
