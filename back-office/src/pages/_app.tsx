import { JSX, useEffect } from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AppLayout from "@/components/layouts/AppLayout";
import { useRouter } from "next/router";
import AuthLayout from "@/components/layouts/AuthLayout";
import { Toaster, toast } from "react-hot-toast";
import AuthModule from "@/modules/AuthModule";
import ApiError from "@/errors/ApiError";
import { NextUIProvider } from "@nextui-org/react";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  // router
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME)) {
      router.push("/login");

      return;
    } else {
      const validatingToken = async () => {
        try {
          await new AuthModule().validateToken(router);

          if (router.pathname === "/login") {
            router.push("/");
            return;
          }
        } catch (error) {
          const err = error as ApiError;

          if (err.statusCode === 401) {
            toast("Token invalid, please relogin", {
              icon: "🚫",
              style: {
                backgroundColor: "#D81222",
                color: "#ffffff",
                paddingBlock: 12,
              },
            });

            setTimeout(() => {
              router.push("/login");
            }, 1000);
            return;
          }
        }
      };

      validatingToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NextUIProvider>
      {router.pathname !== "/login" ? (
        <>
          <Toaster />
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </>
      ) : (
        <AuthLayout>
          <Component {...pageProps} />
          <Toaster />
        </AuthLayout>
      )}
    </NextUIProvider>
  );
}
