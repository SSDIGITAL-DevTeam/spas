import Image, { ImageProps } from "next/image";
import { JSX } from "react";
import spas from "@/assets/logo/spas-logo.svg";

export default function Logo(
	props: Omit<ImageProps, "src" | "alt" | "width" | "height">
): JSX.Element {
	return (
		<Image
			src={spas.src}
			alt="SPAS"
			width={spas.width}
			height={spas.height}
			{...props}
		/>
	);
}
