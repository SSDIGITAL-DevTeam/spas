import { ApiError, Event } from "@/@types";
import { eventModule } from "@/modules/eventModule";
import { useEffect, useState } from "react";

export function useSingleEvent(id: number) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [singleEvent, setSingleEvent] = useState<Event>({} as Event);
  const [errors, setErrors] = useState<ApiError>({} as ApiError);

  useEffect(() => {
    const fetchSingleEvent = async () => {
      setIsLoading(true);

      try {
        const res = await eventModule.findOne(id);
        if (res) setSingleEvent(res.data);
      } catch (error) {
        setErrors(error as ApiError);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSingleEvent();
  }, [id]);

  return { singleEvent, isLoading, errors };
}
