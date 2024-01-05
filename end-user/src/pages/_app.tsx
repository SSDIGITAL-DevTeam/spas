import { JSX } from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AppLayout from "@/components/layouts/AppLayout";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<>
			<AppLayout>
				<Component {...pageProps} />;
			</AppLayout>
		</>
	);
}
