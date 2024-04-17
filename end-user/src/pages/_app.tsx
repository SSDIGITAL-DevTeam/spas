import { JSX } from "react";
import "@/styles/globals.css";
import NextTopLoader from "nextjs-toploader";
import type { AppProps } from "next/app";
import AppLayout from "@/components/layouts/AppLayout";
import { NextUIProvider } from "@nextui-org/react";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <NextUIProvider>
      <AppLayout>
        <NextTopLoader />
        <Component {...pageProps} />
      </AppLayout>
    </NextUIProvider>
  );
}
