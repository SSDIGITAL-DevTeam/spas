import { JSX } from "react";
import Image from "next/image";
import AssetLoading from "@/assets/images/loading.svg";

export default function Loading(): JSX.Element {
	return (
		<div className="w-full">
			<Image className="mx-auto" src={AssetLoading} alt="Loading..." />
		</div>
	);
}
