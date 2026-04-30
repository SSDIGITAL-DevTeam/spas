import { JSX, useEffect } from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AppLayout from "@/components/layouts/AppLayout";
import { useRouter } from "next/router";
import AuthLayout from "@/components/layouts/AuthLayout";
import { Toaster, ToastBar, toast } from "react-hot-toast";
import AuthModule from "@/modules/AuthModule";
import ApiError from "@/errors/ApiError";
import { NextUIProvider } from "@nextui-org/react";
import { BreadcrumbProvider } from "@/context/BreadcrumbContext";

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
      <BreadcrumbProvider>
        {router.pathname !== "/login" ? (
          <>
            <Toaster position="top-right" toastOptions={{ duration: 4000 }}>
              {(t) => {
                const isSuccess = t.type === "success";
                const isError = t.type === "error";
                const barColor = isSuccess ? "#22c55e" : isError ? "#ef4444" : "#6366f1";
                const bg = isSuccess ? "#f0fdf4" : isError ? "#fef2f2" : "#fff";
                const border = isSuccess ? "1px solid #bbf7d0" : isError ? "1px solid #fecaca" : "1px solid #e2e8f0";
                const color = isSuccess ? "#166534" : isError ? "#991b1b" : "#1e293b";
                const iconPrimary = isSuccess ? "#22c55e" : isError ? "#ef4444" : "#6366f1";
                return (
                  <ToastBar
                    toast={t}
                    style={{
                      padding: 0,
                      overflow: "hidden",
                      borderRadius: "12px",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
                      border,
                      background: bg,
                      color,
                      minWidth: 260,
                      maxWidth: 380,
                    }}
                  >
                    {({ icon, message }) => (
                      <div style={{ width: "100%" }}>
                        {/* Content row */}
                        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px" }}>
                          <span style={{ color: iconPrimary, display: "flex", alignItems: "center", flexShrink: 0 }}>{icon}</span>
                          <span style={{ fontSize: 13.5, fontWeight: 500, flex: 1 }}>{message}</span>
                        </div>
                        {/* Progress bar */}
                        {t.duration && t.duration > 0 && (
                          <div
                            key={t.id}
                            style={{
                              height: 3,
                              background: barColor,
                              animation: `toast-progress ${t.duration}ms linear forwards`,
                              transformOrigin: "left",
                            }}
                          />
                        )}
                      </div>
                    )}
                  </ToastBar>
                );
              }}
            </Toaster>
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          </>
        ) : (
          <AuthLayout>
            <Component {...pageProps} />
            <Toaster position="top-right" toastOptions={{ duration: 4000 }}>
              {(t) => {
                const isSuccess = t.type === "success";
                const isError = t.type === "error";
                const barColor = isSuccess ? "#22c55e" : isError ? "#ef4444" : "#6366f1";
                const bg = isSuccess ? "#f0fdf4" : isError ? "#fef2f2" : "#fff";
                const border = isSuccess ? "1px solid #bbf7d0" : isError ? "1px solid #fecaca" : "1px solid #e2e8f0";
                const color = isSuccess ? "#166534" : isError ? "#991b1b" : "#1e293b";
                const iconPrimary = isSuccess ? "#22c55e" : isError ? "#ef4444" : "#6366f1";
                return (
                  <ToastBar
                    toast={t}
                    style={{
                      padding: 0,
                      overflow: "hidden",
                      borderRadius: "12px",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
                      border,
                      background: bg,
                      color,
                      minWidth: 260,
                      maxWidth: 380,
                    }}
                  >
                    {({ icon, message }) => (
                      <div style={{ width: "100%" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px" }}>
                          <span style={{ color: iconPrimary, display: "flex", alignItems: "center", flexShrink: 0 }}>{icon}</span>
                          <span style={{ fontSize: 13.5, fontWeight: 500, flex: 1 }}>{message}</span>
                        </div>
                        {t.duration && t.duration > 0 && (
                          <div
                            key={t.id}
                            style={{
                              height: 3,
                              background: barColor,
                              animation: `toast-progress ${t.duration}ms linear forwards`,
                            }}
                          />
                        )}
                      </div>
                    )}
                  </ToastBar>
                );
              }}
            </Toaster>
          </AuthLayout>
        )}
      </BreadcrumbProvider>
    </NextUIProvider>
  );
}
