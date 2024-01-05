import Link from "next/link";
import { Dispatch, JSX, ReactNode, SetStateAction } from "react";

type Props = {
	children: ReactNode;
	href: string;
	setIsOpenNav: Dispatch<SetStateAction<boolean>>;
	isActive(path: string): boolean;
};

export default function NavLink(props: Props): JSX.Element {
	const { children, href, setIsOpenNav, isActive } = props;

	return (
		<Link
			className={`block rounded-lg border px-2 py-4 lg:border-0 ${
				isActive(href) && "text-gradient font-bold"
			}`}
			onClick={(): void => setIsOpenNav(false)}
			href={href}
		>
			{children}
		</Link>
	);
}
