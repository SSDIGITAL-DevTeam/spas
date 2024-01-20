import TinyMceEditor from "@/components/partials/TinyMceEditor";
import ApiError from "@/errors/ApiError";
import { useCategory } from "@/hooks/useCategory";
import { Category } from "@/@types";
import PostModule from "@/modules/PostModule";
import Head from "next/head";
import Link from "next/link";
import Spin from "@/assets/svg/spin.svg";
import { useRouter } from "next/router";
import {
	ChangeEvent,
	FormEvent,
	JSX,
	KeyboardEvent,
	useRef,
	useState,
} from "react";
import toast from "react-hot-toast";
import Image from "next/image";

type ValidationErrors = {
	status: boolean;
	errors: {
		title: string;
		slug: string;
		status: string;
		published: string;
		cover: string;
		content: string;
		category: string;
		key: string;
		value: string;
		content1: string;
	};
};

export default function CreatePost(): JSX.Element {
	// router
	const router = useRouter();

	// states
	const [isProcessing, setIsProcessing] = useState<boolean>(false);
	const [isCoverUploaded, setIsCoverUploaded] = useState<boolean>(false);
	const [postTags, setPostTags] = useState([] as string[]);
	const [validationErrors, setValidationErrors] = useState(
		{} as ValidationErrors
	);

	// fetch posts
	const { categories, isCategoryLoading } = useCategory();

	// refs
	const imageRef = useRef<HTMLImageElement | null>(null);

	const handleUpload = (e: ChangeEvent<HTMLInputElement>): void => {
		const image: File | null | undefined = e.currentTarget.files?.item(0);

		if (image) {
			setIsCoverUploaded(true);
			imageRef.current!.src = URL.createObjectURL(image);
			imageRef.current?.setAttribute("alt", "Blog Cover");

			return;
		}
		setIsCoverUploaded(false);
		imageRef.current?.removeAttribute("src");
		imageRef.current?.removeAttribute("alt");
	};

	// add tags
	const addTag = (e: KeyboardEvent<HTMLInputElement>): void => {
		if (e.key === "Enter") {
			e.preventDefault();
			const tag = e.currentTarget.value.trim();

			if (tag) {
				setPostTags([...postTags, tag]);
			}

			e.currentTarget.value = "";
		}
	};

	// remove tags
	const removeTag = (tag: string): void => {
		setPostTags([...postTags.filter((item: string) => item !== tag)]);
	};

	// handle create blog
	const handleCreateBlog = async (
		e: FormEvent<HTMLFormElement>
	): Promise<void> => {
		setIsProcessing(true);
		e.preventDefault();

		const form: HTMLFormElement = e.currentTarget;
		const formData: FormData = new FormData(form);
		const submit: SubmitEvent = e.nativeEvent as SubmitEvent;
		const status: HTMLButtonElement = submit.submitter as HTMLButtonElement;

		formData.append("status", status.value);
		postTags.forEach((tag: string, i: number) =>
			formData.append(`tags[${i}][name]`, tag)
		);

		console.log(postTags);

		try {
			await new PostModule().store(formData);

			toast("Post Created Successfully", {
				icon: "✅",
				style: {
					backgroundColor: "#F4B202",
					color: "#ffffff",
					paddingBlock: 12,
				},
			});

			router.push(`/posts?status=PUBLISHED`);
		} catch (error) {
			const err = error as ApiError;
			const validationErrors = err.data as ValidationErrors;
			setValidationErrors(validationErrors);

			// console.log(err);

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
					href="/posts"
					className="btn bg-primary rounded-lg text-white px-4 py-2"
				>
					Back
				</Link>

				<header className="my-8">
					<h1 className="text-2xl">New Blog</h1>
				</header>

				<section className="mx-auto max-w-3xl">
					<form onSubmit={(e) => handleCreateBlog(e)}>
						<div className="font-montserrat flex flex-col gap-y-8">
							{/* title */}
							<div>
								<input
									className="form-input block w-full px-4 py-3 border-2 rounded-lg"
									name="title"
									type="text"
									placeholder="Title..."
								/>

								{validationErrors?.errors?.title && (
									<p className="text-ligh text-[#D81222] mt-2">
										{validationErrors.errors.title[0]}
									</p>
								)}
							</div>

							{/* slug */}
							<div>
								<input
									className="form-input block w-full px-4 py-3 border-2 rounded-lg"
									name="slug"
									type="text"
									placeholder="Slug..."
								/>

								{validationErrors?.errors?.slug && (
									<p className="text-ligh text-[#D81222] mt-2">
										{validationErrors.errors.slug[0]}
									</p>
								)}
							</div>

							{/* blog content */}
							<div className="min-h-[380px] overflow-hidden">
								{/* CK Editor */}
								<TinyMceEditor textareaName="content" />

								{validationErrors?.errors?.content && (
									<p className="text-ligh text-[#D81222] mt-2">
										{validationErrors.errors.content[0]}
									</p>
								)}
							</div>

							<div>
								<div className="flex">
									<div className="flex items-center gap-5">
										{categories?.data.map(
											(
												category: Category,
												index: number
											) => (
												<div className="ap-5">
													<input
														id="inline-checkbox"
														type="checkbox"
														value={category.id}
														name={`categories[${index}][category_id]`}
														className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
													/>
													<label className="ms-2 text-sm font-medium text-black">
														{category.name}
													</label>
												</div>
											)
										)}
									</div>
								</div>

								{validationErrors?.errors?.category && (
									<p className="text-ligh text-[#654648] mt-2">
										{validationErrors.errors.category[0]}
									</p>
								)}
							</div>

							{/* cover */}
							<div className="flex flex-col items-center rounded-xl border p-12 font-medium">
								<label
									htmlFor="cover"
									className="flex flex-col gap-y-8"
								>
									<div
										className={`${
											isCoverUploaded ? "hidden" : "block"
										}`}
									></div>

									{/* preview cover */}
									<img
										className={`${
											isCoverUploaded ? "" : "hidden"
										} mx-auto aspect-video max-w-[300px] object-cover`}
										ref={imageRef}
										alt=""
									/>

									<p className="mx-auto">
										Click the button to upload an image
									</p>

									<div className="flex items-center justify-center gap-x-8">
										<span className="cursor-pointer rounded-lg bg-primary px-8 py-2.5 text-white hover:bg-red-800">
											{isCoverUploaded
												? "Change Cover"
												: "Upload"}
										</span>

										<span
											className={`${
												isCoverUploaded
													? "hidden"
													: "block"
											}`}
										>
											It appears no file is selected
										</span>
									</div>
								</label>

								<input
									className="hidden"
									type="file"
									name="url"
									id="cover"
									onChange={(e) => handleUpload(e)}
								/>
							</div>

							{validationErrors?.errors?.cover && (
								<p className="text-ligh text-[#D81222] mt-2">
									{validationErrors.errors.cover[0]}
								</p>
							)}

							{/* tags */}
							<div className="flex flex-col gap-y-4">
								<input
									className="form-input px-4 py-3 border-2 rounded-lg"
									name="name"
									type="text"
									placeholder="Press enter to add new tag..."
									onKeyDown={(e): void => addTag(e)}
								/>

								{/* preview tags */}
								<div className="flex gap-x-2">
									{postTags?.map(
										(tag: string, index: number) => (
											<div
												key={`tag-${index}`}
												className="relative"
											>
												<p
													onClick={() =>
														removeTag(tag)
													}
													className="cursor-pointer rounded-full bg-primary px-3 py-1 text-white"
												>
													{tag}
												</p>
											</div>
										)
									)}
								</div>
							</div>

							{/* published */}
							<div>
								<input
									className="form-input block w-full px-4 py-3 border-2 rounded-lg"
									name="published_at"
									type="date"
									placeholder="published..."
								/>

								{validationErrors?.errors?.published && (
									<p className="text-ligh text-[#D81222] mt-2">
										{validationErrors.errors.published[0]}
									</p>
								)}
							</div>
							<h1 className="text-2xl">Additional Meta</h1>
							<div>
								<input
									className="form-input block w-full px-4 py-3 border-2 rounded-lg"
									name="key"
									type="text"
									autoComplete="off"
									placeholder="Attribute..."
								/>
								<p className="mt-1">
									The key that the meta tag should use as
									attribute name, such as name, property or
									custom attribute.
								</p>

								{validationErrors?.errors?.key && (
									<p className="text-ligh text-[#D81222] mt-2">
										{validationErrors.errors.key[0]}
									</p>
								)}
							</div>
							<div>
								<input
									className="form-input block w-full px-4 py-3 border-2 rounded-lg"
									name="value"
									type="text"
									autoComplete="off"
									placeholder="Value..."
								/>
								<p className="mt-1">
									The value that the meta tag should use as
									value of the attribute, such as title,
									description, og:image, etc.
								</p>
								{validationErrors?.errors?.value && (
									<p className="text-ligh text-[#D81222] mt-2">
										{validationErrors.errors.value[0]}
									</p>
								)}
							</div>
							<div>
								<input
									className="form-input block w-full px-4 py-3 border-2 rounded-lg"
									name="content1"
									type="text"
									autoComplete="off"
									placeholder="Content..."
								/>
								<p className="mt-1">
									The content that the meta tag should use.
								</p>

								{validationErrors?.errors?.content1 && (
									<p className="text-ligh text-[#D81222] mt-2">
										{validationErrors.errors.content1[0]}
									</p>
								)}
							</div>
						</div>

						<div className="mt-12 flex justify-center gap-x-12 font-medium">
							<button
								className="hover:bg-primary hover:text-white transition-all py-1.5 rounded-lg border-2 px-14"
								name="status"
								value="DRAFT"
							>
								Draft
							</button>

							<button
								className="hover:bg-primary hover:text-white transition-all py-1.5 rounded-lg border-2 px-12"
								name="status"
								value="PUBLISHED"
							>
								{isProcessing ? "Publish..." : "Save & Publish"}
							</button>
						</div>
					</form>
					{/* loading overlay */}
					{isProcessing && (
						<div className="absolute flex items-end justify-center inset-0 h-full bg-white/60 z-10">
							<Image className="mb-72" src={Spin} alt="loading" />
						</div>
					)}
				</section>
			</main>
		</>
	);
}
