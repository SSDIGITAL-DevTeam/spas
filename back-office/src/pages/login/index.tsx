/* eslint-disable @next/next/no-img-element */
import { FormEvent, JSX, useState } from "react";
import Image from "next/image";
import Logo from "@/assets/logo/spas-logo.png";
import { LoginError, ValidationErrors } from "@/@types";
import { useRouter } from "next/router";
import AuthModule from "@/modules/AuthModule";
import ApiError from "@/errors/ApiError";
import Spin from "@/assets/svg/spin.svg";
import Head from "next/head";

export default function Login(): JSX.Element {
  // states
  const [validationErrors, setValidationErrors] = useState(
    {} as ValidationErrors
  );
  const [loginError, setLoginError] = useState({} as LoginError);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // router
  const router = useRouter();

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsProcessing(true);
    const authModule: AuthModule = new AuthModule();

    try {
      const res = await authModule.signIn(new FormData(e.currentTarget));
      localStorage.setItem(
        process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME,
        res.data.token
      );

      router.push(`/`);
    } catch (err) {
      const error = err as ApiError;

      if (error.statusCode === 422) {
        setValidationErrors(error.data as ValidationErrors);
        setLoginError({} as LoginError);

        return;
      }

      if (error.statusCode === 401) {
        setLoginError(error.data as LoginError);
        setValidationErrors({} as ValidationErrors);

        return;
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Head>
        <title>SPAS | Login</title>
      </Head>
      <main className="bg-[url('/bg.jpg')] bg-no-repeat bg-right bg-cover">
        <div className="">
          <div className="h-screen">
            <div className="grid lg:grid-cols-2 h-full">
              <div className="flex flex-col gap-y-6 lg:w-3/4 py-5 bg-white shadow-lg justify-center items-center text-center">
                <img src={Logo.src} className="w-[200px]" alt="Logo SPAS" />
                <p>Please enter your login information</p>
                <form onSubmit={handleLogin} className="lg:w-3/4">
                  <div className="flex flex-col relative gap-y-6 p-4 text-left">
                    <div className="w-full">
                      <input
                        name="email"
                        className={`${
                          validationErrors.errors?.email
                            ? "border-primary"
                            : "border-secondary"
                        } w-full px-3 py-2.5 border outline-none rounded-xl`}
                        type="email"
                        placeholder="Email..."
                        disabled={isProcessing}
                      />
                      {validationErrors.errors?.email && (
                        <small className="text-primary">
                          {validationErrors.errors.email[0]}
                        </small>
                      )}
                    </div>
                    <div className="w-full">
                      <input
                        name="password"
                        className={`${
                          validationErrors.errors?.password
                            ? "border-primary"
                            : "border-secondary"
                        } w-full px-3 py-2.5 border outline-none rounded-xl`}
                        type="password"
                        placeholder="Password..."
                        disabled={isProcessing}
                      />
                      {validationErrors.errors?.password && (
                        <small className="text-primary">
                          {validationErrors.errors.password[0]}
                        </small>
                      )}
                    </div>

                    <small className="text-primary text-center">
                      {loginError?.message}
                    </small>
                    <div className="flex">
                      <button className="mx-auto bg-[#002966] hover:bg-[#2127BC] w-full text-white py-2.5 rounded-xl">
                        {isProcessing ? "Logging in..." : "Sign In"}
                      </button>
                    </div>
                    {/* loading overlay */}
                    {isProcessing && (
                      <div className="absolute inset-0 bg-white/60">
                        <img
                          className="mx-auto w-24"
                          src={Spin.src}
                          alt="loading"
                        />
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
