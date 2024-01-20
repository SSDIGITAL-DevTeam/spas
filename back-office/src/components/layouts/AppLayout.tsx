import { JSX, ReactNode, useState } from "react";
import Sidebar from "@/components/partials/Sidebar";
import Image from "next/image";
import Hamburger from "@/assets/svg/hum.svg";
import ForkKnife from "@/assets/svg/x.svg";

type Props = {
	children: ReactNode;
};

export default function AppLayout({ children }: Props): JSX.Element {
	// states
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	return (
		<>
			<div className="flex min-h-screen">
				<Sidebar
					isMenuOpen={isMenuOpen}
					setIsMenuOpen={setIsMenuOpen}
				/>

				<div className="p-4 lg:pl-72">
					<div className="fixed left-4 right-4 top-1/2 h-[95vh] -translate-y-1/2 overflow-y-auto rounded-xl p-4 bg-white shadow-xl md:p-8 lg:left-72">
						{children}
					</div>
				</div>
			</div>

			<div className="fixed bottom-6 right-6 z-10 lg:hidden">
				<Image
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					className="w-14 rounded-full bg-light/20 px-2 py-2 text-lg text-light duration-300"
					src={isMenuOpen ? ForkKnife : Hamburger}
					alt="Hamburger Menu"
				/>
			</div>
		</>
	);
}
