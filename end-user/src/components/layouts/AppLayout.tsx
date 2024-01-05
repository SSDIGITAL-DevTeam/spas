import { JSX, ReactNode } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/partials/Navbar";
import Footer from "@/components/partials/Footer";

type Props = {
	children: ReactNode;
};

export default function AppLayout({ children }: Props): JSX.Element {
	// router
	const router = useRouter();

	return (
		<>
			<div className="flex min-h-screen flex-col overflow-hidden">
				<Navbar />
				{children}
				<Footer />
			</div>
		</>
	);
}
