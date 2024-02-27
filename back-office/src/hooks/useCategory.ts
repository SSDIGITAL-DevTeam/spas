import { useEffect, useState } from "react";
import { DataWithPagination, Category } from "@/@types";
import ApiError from "@/errors/ApiError";
import CategoryModule from "@/modules/CategoryModule";


export function useCategory() {
  // state
  const [categories, setCategories] = useState<DataWithPagination<Category>>()
  const [isCategoryLoading, setIsCategoryLoading] = useState<boolean>(false)
  const [CategoryError, setCategoryErrors] = useState<ApiError>({} as ApiError)

  useEffect(() => {
    const fetchCategory = async (): Promise<void> => {
      setIsCategoryLoading(true)

      try {
        const res = await new CategoryModule().all()
        setCategories(res)
      } catch (error) {
        setCategoryErrors(error as ApiError)
      } finally {
        setIsCategoryLoading(false)
      }
    }
    fetchCategory()
  }, [])

  return { categories, isCategoryLoading, CategoryError }
}