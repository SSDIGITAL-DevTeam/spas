import ApiError from '@/errors/ApiError'
import { DataWithPagination, Event } from '@/@types'
import ApiModule from '@/modules/ApiModule'

export default class EventModule {
    private url: string = '/events'
    private defaultHeaders: HeadersInit

    public constructor() {
        this.defaultHeaders = {
            Authorization: `Bearer ${localStorage.getItem(
                process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME,
            )}`,
        }
    }

    public async all(page: string = '1'): Promise<DataWithPagination<Event>> {
        try {
            return await ApiModule.makeRequestTo<DataWithPagination<Event>>(
                `${this.url}?page=${page}`,
            ).with({
                headers: this.defaultHeaders,
            })
        } catch (err: any) {
            throw err satisfies ApiError
        }
    }

    public async single(id: number): Promise<{ data: Event }> {
        try {
            return await ApiModule.makeRequestTo<{ data: Event }>(
                `${this.url}/${id}`,
            ).with({
                headers: this.defaultHeaders,
            })
        } catch (err: any) {
            throw err satisfies ApiError
        }
    }

    public async store(formData: FormData): Promise<{ data: Event }> {
        try {
            return await ApiModule.makeRequestTo<{ data: Event }>(this.url).with(
                {
                    method: 'POST',
                    headers: this.defaultHeaders,
                    body: formData,
                },
            )
        } catch (err: any) {
            throw err satisfies ApiError
        }
    }
    
    public async update(
        formData: FormData,
        id: number,
    ): Promise<{ data: Event }> {
        try {
            return await ApiModule.makeRequestTo<{ data: Event }>(
                `${this.url}/${id}?_method=PUT`,
            ).with({
                method: 'POST',
                headers: this.defaultHeaders,
                body: formData,
            })
        } catch (err: any) {
            throw err satisfies ApiError
        }
    }

    public async destroy(id: number): Promise<void> {
        try {
            return await ApiModule.makeRequestTo<void>(
                `${this.url}/${id}`,
            ).with({
                method: 'DELETE',
                headers: this.defaultHeaders,
            })
        } catch (err: any) {
            throw err satisfies ApiError
        }
    }
}