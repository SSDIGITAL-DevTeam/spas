import { useState } from "react";
import { DataWithPagination, RequestUpdate } from "@/@types";
import ApiError from "@/errors/ApiError";
import RequestUpdateModule from "@/modules/RequestUpdateModule";

export function useRequestUpdate() {
  // state
  const [requestUpdate, setRequestUpdate] =
    useState<DataWithPagination<RequestUpdate>>();
  const [isRequestUpdateLoading, setIsRequestUpdateLoading] =
    useState<boolean>(false);
  const [requestUpdateError, setRequestUpdateError] = useState<ApiError>(
    {} as ApiError
  );

  const fetchRequestUpdate = async (
    page: string = '1', 
    searchQuery: string = ''
  ): Promise<void> => {
    setIsRequestUpdateLoading(true);

    try {
      const requestUpdateModule = new RequestUpdateModule();
      const res = await requestUpdateModule.all(page, searchQuery);
      setRequestUpdate(res);
    } catch (error) {
      setRequestUpdateError(error as ApiError);
    } finally {
      setIsRequestUpdateLoading(false);
    }
  };

  return {
    requestUpdate,
    isRequestUpdateLoading,
    requestUpdateError,
    fetchRequestUpdate,
  };
}
