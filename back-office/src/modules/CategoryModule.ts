import ApiError from '@/errors/ApiError'
import { Category, DataWithPagination } from '@/@types'
import ApiModule from '@/modules/ApiModule'

export default class CategoryModule {
    private url: string = '/categories'
    private defaultHeaders: HeadersInit

    public constructor() {
        this.defaultHeaders = {
            Authorization: `Bearer ${localStorage.getItem(
                process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME,
            )}`,
        }
    }

    public async all(): Promise<DataWithPagination<Category>> {
        try {
            return await ApiModule.makeRequestTo<DataWithPagination<Category>>(`${this.url}`).with({
                headers: this.defaultHeaders,
            })
        } catch (err: any) {
            throw err satisfies ApiError
        }
    }

    public async single(id: number): Promise<{ data: Category }> {
        try {
            return await ApiModule.makeRequestTo<{ data: Category }>(
                `${this.url}/${id}`,
            ).with({
                headers: this.defaultHeaders,
            })
        } catch (err: any) {
            throw err satisfies ApiError
        }
    }

    public async store(formData: FormData): Promise<{ data: Category }> {
        try {
            return await ApiModule.makeRequestTo<{ data: Category }>(this.url).with(
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
    ): Promise<{ data: Category }> {
        try {
            return await ApiModule.makeRequestTo<{ data: Category }>(
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