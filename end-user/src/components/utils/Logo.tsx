import Image, { ImageProps } from "next/image";
import { JSX } from "react";
import spas from "@/assets/logo/spas-logo.png";

export default function Logo(): JSX.Element {
	// props: Omit<ImageProps, "src" | "alt" | "width" | "height">
	return <Image src={spas} alt="SPAS" className="w-[150px]" />;
}
