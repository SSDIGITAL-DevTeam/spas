import { useEffect, useState } from "react";
import { DataWithPagination, Category } from "@/@types";
import ApiError from "@/errors/ApiError";
import CategoryModule from "@/modules/CategoryModule";


export function useCategory() {
  // state
  const [categories, setCategories] = useState<DataWithPagination<Category>>()
  const [isCategoryLoading, setIsCategoryLoading] = useState<boolean>(false)
  const [CategoryError, setCategoryErrors] = useState<ApiError>({} as ApiError)

    const fetchCategory = async (      
        page: string = '1', 
        searchQuery: string = ''
    ): Promise<void> => {
      setIsCategoryLoading(true)

      try {
        const categoryModule = new CategoryModule();
        const res = await categoryModule.all(page, searchQuery);
        setCategories(res)
      } catch (error) {
        setCategoryErrors(error as ApiError)
      } finally {
        setIsCategoryLoading(false)
      }
    }

  return { categories, isCategoryLoading, CategoryError, fetchCategory }
}