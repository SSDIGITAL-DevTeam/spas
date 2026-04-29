import ApiError from '@/errors/ApiError'
import { DataWithPagination, Post } from '@/@types'
import ApiModule from '@/modules/ApiModule'
import { PostStatusEnum } from '@/enums'

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

    public async all(
        page: string = '1', 
        status: PostStatusEnum = PostStatusEnum.PUBLISHED,
        searchQuery: string = ''
    ): Promise<DataWithPagination<Post>> {
        // Validasi parameter
        if (!/^\d+$/.test(page)) {
            throw new Error('Invalid page number');
        }
        if (!Object.values(PostStatusEnum).includes(status)) {
            throw new Error('Invalid status value');
        }

        let url = `${this.url}?page=${page}&status=${status.toString()}`;
        if (searchQuery) {
            url += `&search=${encodeURIComponent(searchQuery)}`;
        }

        return await ApiModule.makeRequestTo<DataWithPagination<Post>>(url).with({
            headers: this.defaultHeaders,
        });
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
