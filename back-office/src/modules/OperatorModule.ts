import ApiError from '@/errors/ApiError'
import { DataWithPagination, Operator } from '@/@types'
import ApiModule from '@/modules/ApiModule'

export default class OperatorModule {
    private url: string = '/operators'
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
        status: 'operator' = 'operator'
    ): Promise<DataWithPagination<Operator>> {
        try {
            return await ApiModule.makeRequestTo<DataWithPagination<Operator>>(
                `${this.url}?page=${page}&status=${status.toString()}`,
            ).with({
                headers: this.defaultHeaders,
            })
        } catch (err: any) {
            throw err satisfies ApiError
        }
    }

    public async singleOperator(id: number): Promise<{ data: Operator }> {
        try {
            return await ApiModule.makeRequestTo<{ data: Operator }>(
                `${this.url}/${id}`,
            ).with({
                headers: this.defaultHeaders,
            })
        } catch (err: any) {
            throw err satisfies ApiError
        }
    }

    public async update(
        formData: FormData,
        id: number,
    ): Promise<{ data: Operator }> {
        try {
            return await ApiModule.makeRequestTo<{ data: Operator }>(
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
}
