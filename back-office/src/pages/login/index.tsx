/* eslint-disable @next/next/no-img-element */
import { FormEvent, JSX, useState } from "react";
import Image from "next/image";
import Logo from "@/assets/logo/spas-logo.png";
import { LoginError, ValidationErrors } from "@/@types";
import { useRouter } from "next/router";
import AuthModule from "@/modules/AuthModule";
import ApiError from "@/errors/ApiError";
import Head from "next/head";
import { Button } from "@nextui-org/react";
import { MdEmail, MdLock } from "react-icons/md";

export default function Login(): JSX.Element {
  const router = useRouter();
  const [validationErrors, setValidationErrors] = useState({} as ValidationErrors);
  const [loginError, setLoginError] = useState({} as LoginError);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const res = await new AuthModule().signIn(new FormData(e.currentTarget));
      localStorage.setItem(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME, res.data.token);
      router.push("/");
    } catch (err) {
      const error = err as ApiError;
      if (error.statusCode === 422) {
        setValidationErrors(error.data as ValidationErrors);
        setLoginError({} as LoginError);
      } else if (error.statusCode === 401) {
        setLoginError(error.data as LoginError);
        setValidationErrors({} as ValidationErrors);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Head><title>SPAS | Login</title></Head>
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <Image src={Logo} alt="SPAS Logo" className="h-12 w-auto" />
            </div>

            <div className="text-center mb-6">
              <h1 className="text-xl font-semibold text-slate-800">Welcome back</h1>
              <p className="text-sm text-slate-500 mt-1">Sign in to your admin account</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <div className="relative">
                  <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    name="email"
                    type="email"
                    placeholder="admin@example.com"
                    disabled={isProcessing}
                    className={`w-full pl-9 pr-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${
                      validationErrors.errors?.email ? "border-red-400" : "border-slate-300"
                    }`}
                  />
                </div>
                {validationErrors.errors?.email && (
                  <p className="mt-1 text-xs text-red-500">{validationErrors.errors.email[0]}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    disabled={isProcessing}
                    className={`w-full pl-9 pr-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${
                      validationErrors.errors?.password ? "border-red-400" : "border-slate-300"
                    }`}
                  />
                </div>
                {validationErrors.errors?.password && (
                  <p className="mt-1 text-xs text-red-500">{validationErrors.errors.password[0]}</p>
                )}
              </div>

              {loginError?.message && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  <p className="text-xs text-red-600">{loginError.message}</p>
                </div>
              )}

              <Button
                type="submit"
                color="primary"
                className="w-full"
                isLoading={isProcessing}
              >
                Sign In
              </Button>
            </form>
          </div>

          <p className="text-center text-xs text-slate-400 mt-6">SPAS Back Office © {new Date().getFullYear()}</p>
        </div>
      </main>
    </>
  );
}
