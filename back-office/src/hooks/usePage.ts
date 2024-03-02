import { useEffect, useState } from "react";
import { DataWithPagination, Page } from "@/@types";
import ApiError from "@/errors/ApiError";
import PageModule from "@/modules/PageModule";


export function usePage() {
    // state
    const [pages, setPage] =  useState<DataWithPagination<Page>>()
    const [isPageLoading, setIsPageLoading] = useState<boolean>(false)
    const [PageError, setPageErrors] = useState<ApiError>({} as ApiError)

      const fetchPage = async(page1?: string): Promise<void> => {
        setIsPageLoading(true)
        
       try {
            const res = await new PageModule().all(page1)
            setPage(res)
        } catch (error) {
            setPageErrors(error as ApiError)
        } finally {
            setIsPageLoading(false)
        }
      }

    return { pages, isPageLoading, PageError, fetchPage }
}