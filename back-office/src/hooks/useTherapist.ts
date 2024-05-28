import { useEffect, useState } from "react";
import { DataWithPagination, Therapist } from "@/@types";
import ApiError from "@/errors/ApiError";
import TherapistModule from "@/modules/TherapistModule";


export function useTherapist() {
    // state
    const [therapist, setTherapist] =  useState<DataWithPagination<Therapist>>()
    const [isTherapistLoading, setIsTherapistLoading] = useState<boolean>(false)
    const [therapistError, setTherapistErrors] = useState<ApiError>({} as ApiError)

      const fetchTherapist = async(
        page: string = '1', 
        searchQuery: string = ''
      ): Promise<void> => {
        setIsTherapistLoading(true)
        
       try {
          const therapistModule = new TherapistModule();
          const res = await therapistModule.all(page, searchQuery);
            setTherapist(res)
        } catch (error) {
            setTherapistErrors(error as ApiError)
        } finally {
            setIsTherapistLoading(false)
        }
      }

    return { therapist, isTherapistLoading, therapistError, fetchTherapist }
}