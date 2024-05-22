import ApiError from "@/errors/ApiError";
import { DataWithPagination, RequestUpdate } from "@/@types";
import ApiModule from "@/modules/ApiModule";

export default class RequestUpdateModule {
  private url: string = "/request-updates";
  private defaultHeaders: HeadersInit;

  public constructor() {
    this.defaultHeaders = {
      Authorization: `Bearer ${localStorage.getItem(
        process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME
      )}`,
    };
  }

  public async all(
    page: string = "1"
  ): Promise<DataWithPagination<RequestUpdate>> {
    try {
      return await ApiModule.makeRequestTo<DataWithPagination<RequestUpdate>>(
        `${this.url}?page=${page}`
      ).with({
        headers: this.defaultHeaders,
      });
    } catch (err: any) {
      throw err satisfies ApiError;
    }
  }

  public async single(id: number): Promise<{ data: RequestUpdate }> {
    try {
      return await ApiModule.makeRequestTo<{ data: RequestUpdate }>(
        `${this.url}/${id}`
      ).with({
        headers: this.defaultHeaders,
      });
    } catch (err: any) {
      throw err satisfies ApiError;
    }
  }

  public async store(formData: FormData): Promise<{ data: RequestUpdate }> {
    try {
      return await ApiModule.makeRequestTo<{ data: RequestUpdate }>(
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
  ): Promise<{ data: RequestUpdate }> {
    try {
      return await ApiModule.makeRequestTo<{ data: RequestUpdate }>(
        `${this.url}/${id}`
      ).with({
        method: "PUT",
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
