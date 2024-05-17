import { useState } from "react";
import { DataWithPagination, CategoryPartner } from "@/@types";
import ApiError from "@/errors/ApiError";
import CategoryPartnerModule from "@/modules/CategoryPartner";

export function useCategoryPartner() {
  // state
  const [categoryPartners, setCategoryPartners] =
    useState<DataWithPagination<CategoryPartner>>();
  const [isCategoryPartnerLoading, setIsCategoryPartnerLoading] =
    useState<boolean>(false);
  const [categoryPartnerError, setCategoryPartnerError] = useState<ApiError>(
    {} as ApiError
  );

  const fetchCategoryPartner = async (page?: string): Promise<void> => {
    setIsCategoryPartnerLoading(true);

    try {
      const res = await new CategoryPartnerModule().all(page);
      setCategoryPartners(res);
    } catch (error) {
      setCategoryPartnerError(error as ApiError);
    } finally {
      setIsCategoryPartnerLoading(false);
    }
  };

  return {
    categoryPartners,
    isCategoryPartnerLoading,
    categoryPartnerError,
    fetchCategoryPartner,
  };
}
