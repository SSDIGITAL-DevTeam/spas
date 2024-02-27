import { JSX } from "react";
import Head from "next/head";
import Link from "next/link";
import { usePosts } from "@/hooks/usePosts";
import { useEvent } from "@/hooks/useEvent";
import { usePage } from "@/hooks/usePage";
import Loading from "@/components/partials/Loading";

export default function Dashboard() {
	// fetch posts
	const { posts, isPostsLoading } = usePosts();

	// fetch event
	const { events, isEventLoading } = useEvent();

	// fetch page
	const { pages, isPageLoading } = usePage();

	return (
		<>
			<Head>
				<title>SPAS | Dashboard</title>
			</Head>

			<header className="flex justify-between">
				<div>
					<h1 className="text-4xl">DASHBOARD</h1>

					<p>Welcome To Dashboard</p>
				</div>

				<div className="hidden md:block">
					<p className="text-base">Admin</p>
				</div>
			</header>

			<main>
				<section className="overflow-x-auto pt-8">
					<div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
						<Link href={`/posts`}>
							<div className="rounded-xl bg-secondary text-white p-8 text-center font-semibold">
								<p className="text-6xl md:text-8xl">
									{isPostsLoading && !posts?.data && (
										<Loading />
									)}
									{posts?.data?.length}
								</p>

								<p>Blogs</p>
							</div>
						</Link>

						<Link href={`/pages`}>
							<div className="rounded-xl bg-secondary text-white p-8 text-center font-semibold">
								<p className="text-6xl md:text-8xl">
									{isPageLoading && !pages?.data && (
										<Loading />
									)}
									{pages?.data?.length}
								</p>

								<p>Pages</p>
							</div>
						</Link>

						<Link href={`/events`}>
							<div className="rounded-xl bg-secondary text-white p-8 text-center font-semibold">
								<p className="text-6xl md:text-8xl">
									{isEventLoading && !events?.data && (
										<Loading />
									)}
									{events?.data?.length}
								</p>

								<p>Events</p>
							</div>
						</Link>
					</div>
				</section>

			</main>
		</>
	);
}
