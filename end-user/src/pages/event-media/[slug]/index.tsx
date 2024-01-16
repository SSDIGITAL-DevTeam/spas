import { JSX } from "react";
import Head from "next/head";

export default function Detail(): JSX.Element {
	return (
		<>
			<Head>
				<title>SPAS | Details</title>
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
			<main></main>
		</>
	);
}
