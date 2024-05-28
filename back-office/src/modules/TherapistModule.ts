import ApiError from '@/errors/ApiError'
import { DataWithPagination, Therapist } from '@/@types'
import ApiModule from '@/modules/ApiModule'

export default class TherapistModule {
    private url: string = '/therapists'
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
    ): Promise<DataWithPagination<Therapist>> {
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

            return await ApiModule.makeRequestTo<DataWithPagination<Therapist>>(url).with({
                headers: this.defaultHeaders,
            });
        } catch (err: any) {
            // Logging error
            console.error('Error fetching data:', err);

            throw new Error(`Failed to fetch data: ${err.message}`);
        }
    }

    public async singleTherapist(id: number): Promise<{ data: Therapist }> {
        try {
            return await ApiModule.makeRequestTo<{ data: Therapist }>(
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
    ): Promise<{ data: Therapist }> {
        try {
            return await ApiModule.makeRequestTo<{ data: Therapist }>(
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
