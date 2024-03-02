import { useEffect, useState } from "react";
import { DataWithPagination, Event } from "@/@types";
import ApiError from "@/errors/ApiError";
import EventModule from "@/modules/EventModule";


export function useEvent() {
    // state
    const [events, setEvents] =  useState<DataWithPagination<Event>>()
    const [isEventLoading, setIsEventLoading] = useState<boolean>(false)
    const [EventError, setEventErrors] = useState<ApiError>({} as ApiError)

    const fetchEvent = async(page?: string): Promise<void> => {
      setIsEventLoading(true)
      
      try {
          const res = await new EventModule().all(page)
          setEvents(res)
      } catch (error) {
          setEventErrors(error as ApiError)
      } finally {
          setIsEventLoading(false)
      }
    }

    return { events, isEventLoading, EventError, fetchEvent }
}