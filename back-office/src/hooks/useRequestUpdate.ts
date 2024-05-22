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

  const fetchRequestUpdate = async (page?: string): Promise<void> => {
    setIsRequestUpdateLoading(true);

    try {
      const res = await new RequestUpdateModule().all(page);
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
