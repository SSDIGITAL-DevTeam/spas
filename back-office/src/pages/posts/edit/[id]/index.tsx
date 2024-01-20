import { Cover, Post, Tag, Category } from "@/@types";
import Loading from "@/components/partials/Loading";
import TinyMceEditor from "@/components/partials/TinyMceEditor";
import ApiError from "@/errors/ApiError";
import { useCategory } from "@/hooks/useCategory";
import PostModule from "@/modules/PostModule";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import {
	ChangeEvent,
	FormEvent,
	JSX,
	KeyboardEvent,
	useEffect,
	useRef,
	useState,
} from "react";
import toast from "react-hot-toast";

type ValidationErrors = {
	status: boolean;
	errors: {
		title: string;
		cover: string;
		status: string;
		content: string;
		category: string;
	};
};

export default function EditPost(): JSX.Element {
	// router
	const router = useRouter();

	// states
	const [singlePost, setSinglePost] = useState<Post>({} as Post);
	const [isProcessing, setIsProcessing] = useState<boolean>(false);
	const [isCoverUploaded, setIsCoverUploaded] = useState<boolean>(false);
	const [postTags, setPostTags] = useState([] as string[]);
	const [validationErrors, setValidationErrors] = useState(
		{} as ValidationErrors
	);

	// fetch posts
	const { categories, isCategoryLoading } = useCategory();

	const cover = singlePost.cover as Cover;

	useEffect(() => {
		const fetchSinglePost = async () => {
			try {
				const res = await new PostModule().single(+router.query.id!);
				setSinglePost(res.data);
				if (res.data.tags) {
					setPostTags(
						res.data.tags?.map(
							(tag: Tag, _index: number) => tag.name
						)
					);
				}
			} catch (error) {
			} finally {
			}
		};

		fetchSinglePost();
	}, [router]);

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

		try {
			await new PostModule().update(formData, +router.query.id!);

			toast("Post Updated Successfully", {
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
				<title>SPAS | Edit - {singlePost.title}</title>
			</Head>

			<main>
				<Link href="/posts" className="btn bg-primary px-4 py-2">
					&larr;
				</Link>

				<header className="my-8">
					<h1 className="text-2xl">Edit Blog</h1>
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
									defaultValue={singlePost.title}
								/>

								{validationErrors.errors?.title && (
									<small className="text-light">
										{validationErrors.errors.title[0]}
									</small>
								)}
							</div>

							{/* blog content */}
							<div className="min-h-[380px] overflow-hidden">
								{/* CK Editor */}
								<TinyMceEditor
									textareaName="content"
									initialValue={singlePost.content}
								/>

								{validationErrors.errors?.content && (
									<small className="text-light">
										{validationErrors.errors.content[0]}
									</small>
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
							<div className="flex flex-col items-center rounded-xl border px-8 pb-8 font-medium">
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
										className="mx-auto aspect-video rounded-lg object-cover"
										ref={imageRef}
										src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${cover?.url}`}
										alt="cover"
									/>

									<p className="mx-auto text-center">
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
												isCoverUploaded ||
												imageRef.current
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
									name="cover"
									id="cover"
									onChange={(e) => handleUpload(e)}
								/>
							</div>

							{validationErrors.errors?.cover && (
								<small className="-mt-8 text-light">
									{validationErrors.errors.cover[0]}
								</small>
							)}

							{/* tags */}
							<div className="flex flex-col gap-y-4">
								<input
									className="form-input block w-full px-4 py-3 border-2 rounded-lg"
									name="tags"
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
												<small
													onClick={() =>
														removeTag(tag)
													}
													className="cursor-pointer rounded-full bg-primary px-3 py-1 text-white"
												>
													{tag}
												</small>
											</div>
										)
									)}
								</div>
							</div>
						</div>

						<div className="mt-12 flex flex-col justify-center gap-x-12 gap-y-4 font-medium md:flex-row">
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
								{isProcessing
									? "Updating..."
									: "Update & Publish"}
							</button>
						</div>
					</form>
				</section>
			</main>
		</>
	);
}
