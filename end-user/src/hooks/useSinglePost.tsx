import { ApiError, Post } from "@/@types";
import { postModule } from "@/modules/postModule";
import { useEffect, useState } from "react";

export function useSinglePost(slug: string) {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [singlePost, setSinglePost] = useState<Post>({} as Post);
	const [errors, setErrors] = useState<ApiError>({} as ApiError);

	useEffect(() => {
		const fetchSinglePost = async () => {
			setIsLoading(true);

			try {
				const res = await postModule.findOne(slug);
				if (res) setSinglePost(res.data);
			} catch (error) {
				setErrors(error as ApiError);
			} finally {
				setIsLoading(false);
			}
		};

		fetchSinglePost();
	}, [slug]);

	return { singlePost, isLoading, errors };
}
