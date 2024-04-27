import { useEffect, useState } from "react";
import { DataWithPagination, Therapist } from "@/@types";
import ApiError from "@/errors/ApiError";
import TherapistModule from "@/modules/TherapistModule";


export function useTherapist() {
    // state
    const [therapist, setTherapist] =  useState<DataWithPagination<Therapist>>()
    const [isTherapistLoading, setIsTherapistLoading] = useState<boolean>(false)
    const [therapistError, setTherapistErrors] = useState<ApiError>({} as ApiError)

      const fetchTherapist = async(therapist1?: string): Promise<void> => {
        setIsTherapistLoading(true)
        
       try {
            const res = await new TherapistModule().all(therapist1)
            setTherapist(res)
        } catch (error) {
            setTherapistErrors(error as ApiError)
        } finally {
            setIsTherapistLoading(false)
        }
      }

    return { therapist, isTherapistLoading, setTherapistErrors, fetchTherapist }
}