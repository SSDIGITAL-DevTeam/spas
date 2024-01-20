import { useEffect, useState } from "react";
import { DataWithPagination, Page } from "@/@types";
import ApiError from "@/errors/ApiError";
import PageModule from "@/modules/pageModule";


export function usePage() {
    // state
    const [pages, setPage] =  useState<DataWithPagination<Page>>()
    const [isPageLoading, setIsPageLoading] = useState<boolean>(false)
    const [PageError, setPageErrors] = useState<ApiError>({} as ApiError)

    useEffect(() => {
      const fetchPage = async(): Promise<void> => {
        setIsPageLoading(true)
        
       try {
            const res = await new PageModule().all()
            setPage(res)
        } catch (error) {
            setPageErrors(error as ApiError)
        } finally {
            setIsPageLoading(false)
        }
      }
      fetchPage()
    }, [])

    return { pages, isPageLoading, PageError }
}