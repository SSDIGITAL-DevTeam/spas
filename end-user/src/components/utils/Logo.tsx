/* eslint-disable @next/next/no-img-element */
import { JSX } from "react";
import spas from "@/assets/logo/spas-logo.png";

export default function Logo(): JSX.Element {
  // props: Omit<ImageProps, "src" | "alt" | "width" | "height">
  return <img src={spas.src} alt="SPAS" className="w-[150px]" />;
}
