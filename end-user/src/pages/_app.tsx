import { JSX } from "react";
import "@/styles/globals.css";
import NextTopLoader from "nextjs-toploader";
import type { AppProps } from "next/app";
import AppLayout from "@/components/layouts/AppLayout";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/router";
import AuthLayout from "@/components/layouts/AuthLayout";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const router = useRouter();
  return (
    <NextUIProvider>
      {router.pathname !== "/auth/sign-in" ? (
        <AppLayout>
          <NextTopLoader />
          <Component {...pageProps} />
        </AppLayout>
      ) : (
        <AuthLayout>
          <NextTopLoader />
          <Component {...pageProps} />
        </AuthLayout>
      )}
    </NextUIProvider>
  );
}
