import { JSX } from "react";
import Head from "next/head";
import { usePosts } from "@/hooks/usePosts";
import Loading from "@/components/partials/Loading";
import { useSinglePost } from "@/hooks/useSinglePost";
import { Post, Tag } from "@/@types";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Link from "next/link";

export const getServerSideProps = async (
	context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{ slug: string }>> => {
	const slug = context.query.slug as string;

	return {
		props: {
			slug,
		},
	};
};

export default function BlogDetail({ slug }: { slug: string }): JSX.Element {
	// fetch single post with custom hooks
	const { singlePost, isLoading } = useSinglePost(slug);

	console.log(singlePost.title);

	// fetch recent post with custom hooks
	const { posts } = usePosts();
	return (
		<>
			<Head>
				<title>{`SPAS | ${singlePost.title}`}</title>
				<meta name="author" content="SPAS" />

				<meta name="title" content="Details" />

				<meta name="description" content="details" />

				<meta name="keywords" content="spa, services, details" />

				<meta name="robots" content="index, follow" />

				<meta
					property="og:url"
					content={process.env.NEXT_PUBLIC_BASE_URL}
				/>

				<meta property="og:title" content="details" />

				<meta property="og:description" content="Details" />

				<meta property="og:type" content="website" />

				<meta
					property="og:image"
					content={`${process.env.NEXT_PUBLIC_BASE_URL}/asset-special-offer.webp`}
				/>
			</Head>

			{isLoading && <Loading />}

			{!isLoading && (
				<main className="mx-auto max-w-4xl">
					<section className="pt-32">
						<div className="container">
							<header>
								<h2 className="mb-4 text-4xl font-bold">
									{singlePost.title}
								</h2>

								<div className="mb-8 flex flex-wrap gap-4">
									{singlePost.tags?.map(
										(tag: Tag, index: number) => (
											<div
												key={`tag-${index}`}
												className="rounded-lg bg-primary/20 px-4 py-1 text-sm font-medium text-dark/60 md:text-base"
											>
												<span className="dark:text-light">
													#{tag.name}
												</span>
											</div>
										)
									)}
								</div>

								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									className="w-full rounded-2xl"
									src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${singlePost.cover?.url}`}
									alt="Blog Cover"
								/>
							</header>

							<article
								dangerouslySetInnerHTML={{
									__html: singlePost.content,
								}}
								className="apply-dark mt-8 min-w-full md:prose-lg"
							></article>
						</div>
					</section>

					{/* other blog */}
					{/* <section className="py-16">
						<div className="container">
							<div className="flex justify-between">
								<p className="text-2xl font-bold">
									View Other Blog
								</p>

								<Link href="/blog">
									<span className="text-xl font-medium hover:underline">
										See All
									</span>
								</Link>
							</div>

							{posts.data?.length === 0 && (
								<div className="mt-16 rounded-2xl bg-primary/10 p-4 text-center">
									<p className="text-3xl font-semibold">
										Opps..
									</p>

									<p>No Recent Blog At This Time</p>
								</div>
							)}

							{posts.data?.length > 0 && (
								<div className="mt-8 grid grid-cols-2 gap-4">
									{posts.data?.map(
										(
											post: Post,
											index: number
										): JSX.Element => (
											<Link
												key={`other-blog-${index}`}
												href={`/blog/${post.slug}`}
											>
												<div className="flex flex-col gap-y-2 rounded-2xl p-4 hover:bg-primary/25">
													<img
														className="aspect-video rounded-lg object-cover md:rounded-lg"
														src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${post.cover.url}`}
														alt="Blog Cover"
													/>

													<p className="line-clamp-2 font-semibold capitalize md:text-2xl">
														{post?.title}
													</p>

													<p className="line-clamp-3 text-base">
														{post?.content.replace(
															/<[^>]+>/g,
															""
														)}
													</p>
												</div>
											</Link>
										)
									)}
								</div>
							)}
						</div>
					</section> */}
				</main>
			)}
		</>
	);
}
