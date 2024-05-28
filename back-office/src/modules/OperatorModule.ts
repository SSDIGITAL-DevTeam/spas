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
        searchQuery: string = ''
    ): Promise<DataWithPagination<Operator>> {
         // Validasi parameter
        if (!/^\d+$/.test(page)) {
            throw new Error('Invalid page number');
        }

        try {
            let url = `${this.url}?page=${page}`;
            if (searchQuery) {
                url += `&search=${encodeURIComponent(searchQuery)}`;
            }

            // Logging URL request
            // console.log(`Request URL: ${url}`);

            return await ApiModule.makeRequestTo<DataWithPagination<Operator>>(url).with({
                headers: this.defaultHeaders,
            });
        } catch (err: any) {
            // Logging error
            console.error('Error fetching data:', err);

            throw new Error(`Failed to fetch data: ${err.message}`);
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
