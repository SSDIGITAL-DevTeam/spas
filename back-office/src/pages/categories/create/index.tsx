import ApiError from "@/errors/ApiError";
import CategoryModule from "@/modules/CategoryModule";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, JSX, useRef, useState } from "react";
import toast from "react-hot-toast";

type ValidationErrors = {
	status: boolean;
	errors: {
		name: string;
	};
};

export default function CreatePost(): JSX.Element {
	// router
	const router = useRouter();

	// states
	const [isProcessing, setIsProcessing] = useState<boolean>(false);
	const [validationErrors, setValidationErrors] = useState(
		{} as ValidationErrors
	);

	// refs
	const imageRef = useRef<HTMLImageElement | null>(null);

	// handle create category
	const handleCreateBlog = async (
		e: FormEvent<HTMLFormElement>
	): Promise<void> => {
		setIsProcessing(true);
		e.preventDefault();

		const form: HTMLFormElement = e.currentTarget;
		const formData: FormData = new FormData(form);
		const submit: SubmitEvent = e.nativeEvent as SubmitEvent;
		const status: HTMLButtonElement = submit.submitter as HTMLButtonElement;

		// console.log(postTags);

		try {
			await new CategoryModule().store(formData);

			toast("Category Created Successfully", {
				icon: "✅",
				style: {
					backgroundColor: "#F4B202",
					color: "#ffffff",
					paddingBlock: 12,
				},
			});

			router.push(`/categories`);
		} catch (error) {
			const err = error as ApiError;
			const validationErrors = err.data as ValidationErrors;
			setValidationErrors(validationErrors);

			// console.log(err.data);

			toast("Something Wrong", {
				icon: "🚫",
				style: {
					backgroundColor: "#D81222",
					color: "#ffffff",
					paddingBlock: 12,
				},
			});
		} finally {
			setIsProcessing(false);
		}
	};

	return (
		<>
			<Head>
				<title>SPAS | Create</title>
			</Head>

			<main>
				<Link
					href="/categories"
					className="btn bg-primary rounded-lg text-white px-4 py-2"
				>
					Back
				</Link>

				<header className="my-8">
					<h1 className="text-2xl">New Category</h1>
				</header>

				<section className="mx-auto max-w-3xl">
					<form onSubmit={(e) => handleCreateBlog(e)}>
						<div className="font-montserrat flex flex-col gap-y-8">
							{/* title */}
							<div>
								<input
									className="form-input block w-full px-4 py-3 border-2 rounded-lg"
									name="name"
									type="text"
									placeholder="Name..."
								/>

								{validationErrors.errors?.name && (
									<p className="text-ligh text-[#D81222] mt-2">
										{validationErrors.errors.name[0]}
									</p>
								)}
							</div>
						</div>

						<div className="mt-12 flex justify-center gap-x-12 font-medium">
							<button className="hover:bg-primary hover:text-white transition-all py-1.5 rounded-lg border-2 px-12">
								Save
							</button>
						</div>
					</form>
				</section>
			</main>
		</>
	);
}
