import { ApiError, DataWithPagination, Event } from "@/@types";
import { eventModule } from "@/modules/eventModule";
import { useEffect, useState } from "react";

export function useEvents() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [events, setEvents] = useState<DataWithPagination<Event>>(
		{} as DataWithPagination<Event>
	);
	const [errors, setErrors] = useState<ApiError>({} as ApiError);

	const fetchEvents = async () => {
		setIsLoading(true);

		try {
			const res = await eventModule.findAll();
			if (res) setEvents(res);
		} catch (error) {
			setErrors(error as ApiError);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchEvents();
	}, []);

	return { events, isLoading, errors };
}
