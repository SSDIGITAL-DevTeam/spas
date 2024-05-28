import ApiError from "@/errors/ApiError";
import { DataWithPagination, ValuePartner } from "@/@types";
import ApiModule from "@/modules/ApiModule";

export default class ValuePartnerModule {
  private url: string = "/value-partners";
  private defaultHeaders: HeadersInit;

  public constructor() {
    this.defaultHeaders = {
      Authorization: `Bearer ${localStorage.getItem(
        process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME
      )}`,
    };
  }

  public async all(
    page: string = "1",
    searchQuery: string = ''
  ): Promise<DataWithPagination<ValuePartner>> {
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

      return await ApiModule.makeRequestTo<DataWithPagination<ValuePartner>>(url).with({
          headers: this.defaultHeaders,
        });
    } catch (err: any) {
        // Logging error
        console.error('Error fetching data:', err);

        throw new Error(`Failed to fetch data: ${err.message}`);
    }
  }

  public async single(id: number): Promise<{ data: ValuePartner }> {
    try {
      return await ApiModule.makeRequestTo<{ data: ValuePartner }>(
        `${this.url}/${id}`
      ).with({
        headers: this.defaultHeaders,
      });
    } catch (err: any) {
      throw err satisfies ApiError;
    }
  }

  public async store(formData: FormData): Promise<{ data: ValuePartner }> {
    try {
      return await ApiModule.makeRequestTo<{ data: ValuePartner }>(
        this.url
      ).with({
        method: "POST",
        headers: this.defaultHeaders,
        body: formData,
      });
    } catch (err: any) {
      throw err satisfies ApiError;
    }
  }

  public async update(
    formData: FormData,
    id: number
  ): Promise<{ data: ValuePartner }> {
    try {
      return await ApiModule.makeRequestTo<{ data: ValuePartner }>(
        `${this.url}/${id}?_method=PUT`
      ).with({
        method: "POST",
        headers: this.defaultHeaders,
        body: formData,
      });
    } catch (err: any) {
      throw err satisfies ApiError;
    }
  }

  public async destroy(id: number): Promise<void> {
    try {
      return await ApiModule.makeRequestTo<void>(`${this.url}/${id}`).with({
        method: "DELETE",
        headers: this.defaultHeaders,
      });
    } catch (err: any) {
      throw err satisfies ApiError;
    }
  }
}
