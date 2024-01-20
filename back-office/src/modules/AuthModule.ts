import { Login } from '@/@types'
import { NextRouter } from 'next/router'
import ApiModule from '@/modules/ApiModule'
import ApiError from '@/errors/ApiError'

export default class AuthModule {
    private url: string = '/auth'
    private defaultHeaders: HeadersInit

    public constructor() {
        this.defaultHeaders = {
            Authorization: `Bearer ${localStorage.getItem(
                process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME,
            )}`,
        }
    }

    public async signIn(formData: FormData): Promise<Login | any> {
        try {
            return await ApiModule.makeRequestTo<Login>(
                `${this.url}/sign-in`,
            ).with({
                method: 'POST',
                body: formData,
            })
        } catch (err: any) {
            throw err satisfies ApiError
        }
    }

    public async signOut(): Promise<void> {
        try {
            return await ApiModule.makeRequestTo<void>(
                `${this.url}/sign-out`,
            ).with({
                method: 'POST',
                headers: this.defaultHeaders,
            })
        } catch (err: any) {
            throw err satisfies ApiError
        }
    }

    public async validateToken(router: NextRouter): Promise<void> {
        if (!localStorage.getItem(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME)) {
            router.push('/')

            return
        }

        try {
            return await ApiModule.makeRequestTo<void>(
                `${this.url}/validate-token`,
            ).with({
                headers: this.defaultHeaders,
            })
        } catch (err: any) {
            throw err satisfies ApiError
        }
    }
}
