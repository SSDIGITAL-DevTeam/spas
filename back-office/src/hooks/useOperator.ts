import { useState } from "react";
import { DataWithPagination, Operator } from "@/@types";
import ApiError from "@/errors/ApiError";
import OperatorModule from "@/modules/OperatorModule";


export function useOperator() {
    // state
    const [operator, setOperator] =  useState<DataWithPagination<Operator>>()
    const [isOperatorLoading, setIsOperatorLoading] = useState<boolean>(false)
    const [operatorError, setOperatorErrors] = useState<ApiError>({} as ApiError)

      const fetchOperator = async(
        page: string = '1', 
        searchQuery: string = ''
      ): Promise<void> => {
        setIsOperatorLoading(true)
        
       try {
          const operatorModule = new OperatorModule();
          const res = await operatorModule.all(page, searchQuery);
          setOperator(res)
        } catch (error) {
          setOperatorErrors(error as ApiError)
        } finally {
            setIsOperatorLoading(false)
        }
      }

    return { operator, isOperatorLoading, operatorError, fetchOperator }
}