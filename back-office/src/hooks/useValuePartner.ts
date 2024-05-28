import { useState } from "react";
import { DataWithPagination, ValuePartner } from "@/@types";
import ApiError from "@/errors/ApiError";
import ValuePartnerModule from "@/modules/ValuePartnerModule";

export function useValuePartner() {
  // state
  const [valuePartners, setValuePartners] =
    useState<DataWithPagination<ValuePartner>>();
  const [isValuePartnerLoading, setIsValuePartnerLoading] =
    useState<boolean>(false);
  const [valuePartnerError, setValuePartnerError] = useState<ApiError>(
    {} as ApiError
  );

  const fetchValuePartner = async (
    page: string = '1', 
    searchQuery: string = ''
  ): Promise<void> => {
    setIsValuePartnerLoading(true);

    try {
      const valueModule = new ValuePartnerModule();
      const res = await valueModule.all(page, searchQuery);
      setValuePartners(res);
    } catch (error) {
      setValuePartnerError(error as ApiError);
    } finally {
      setIsValuePartnerLoading(false);
    }
  };

  return {
    valuePartners,
    isValuePartnerLoading,
    valuePartnerError,
    fetchValuePartner,
  };
}
