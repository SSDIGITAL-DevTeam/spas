import ApiError from '@/errors/ApiError'
import { DataWithPagination, Post } from '@/@types'
import ApiModule from '@/modules/ApiModule'

export default class PostModule {
    private url: string = '/posts'
    private defaultHeaders: HeadersInit

    public constructor() {
        this.defaultHeaders = {
            Authorization: `Bearer ${localStorage.getItem(
                process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME,
            )}`,
        }
    }

    public async all(page: number = 1): Promise<DataWithPagination<Post>> {
        try {
            return await ApiModule.makeRequestTo<DataWithPagination<Post>>(
                `${this.url}?page=${page}&status=${status.toString()}`,
            ).with({
                headers: this.defaultHeaders,
            })
        } catch (err: any) {
            throw err satisfies ApiError
        }
    }

    public async single(slug: string): Promise<{ data: Post }> {
        try {
            return await ApiModule.makeRequestTo<{ data: Post }>(
                `${this.url}/${slug}`,
            ).with({
                headers: this.defaultHeaders,
            })
        } catch (err: any) {
            throw err satisfies ApiError
        }
    }

    
    public async singlePost(id: number): Promise<{ data: Post }> {
        try {
            return await ApiModule.makeRequestTo<{ data: Post }>(
                `${this.url}/${id}`,
            ).with({
                headers: this.defaultHeaders,
            })
        } catch (err: any) {
            throw err satisfies ApiError
        }
    }

    public async store(formData: FormData): Promise<{ data: Post }> {
        try {
            return await ApiModule.makeRequestTo<{ data: Post }>(this.url).with(
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
    ): Promise<{ data: Post }> {
        try {
            return await ApiModule.makeRequestTo<{ data: Post }>(
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
