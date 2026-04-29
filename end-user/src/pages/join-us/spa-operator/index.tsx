import { JSX, useState, useMemo, FormEvent, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Image,
} from "@nextui-org/react";
import Head from "next/head";
import { FaInfoCircle } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import Link from "next/link";
import AssetBank from "@/assets/logo/UOB.webp";
import { IoCopyOutline, IoCopySharp } from "react-icons/io5";
import { useRouter } from "next/router";
import { apiModule, ApiRequestError } from "@/modules/apiModule";

type OperatorValidationErrors = {
  company_name?: string[];
  uen_no?: string[];
  brand_name?: string[];
  address?: string[];
  contact_no?: string[];
  contact_person?: string[];
  contact_person_no?: string[];
  url?: string[];
  payment_slip?: string[];
  email?: string[];
};

export default function JoinAsOperator(): JSX.Element {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<OperatorValidationErrors>({});

  const router = useRouter();

  const inputStyle = { width: "100%", fontSize: "16px" };

  const registerOperator = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldErrors({});
    setIsLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await apiModule("/end-user/operators", "POST", {}, formData);
      toast.success("Registration successful! Please check your email.");
      form.reset();
    } catch (error) {
      if (error instanceof ApiRequestError) {
        if (error.data?.errors) {
          setFieldErrors(error.data.errors as OperatorValidationErrors);
        } else {
          toast.error(error.getFirstError());
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const copyClipboard = () => {
    navigator.clipboard?.writeText("339-317540-9");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem(
      process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME!
    );
    if (isLoggedIn) {
      router.push("/");
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>SPAS | Join Us</title>
        <link rel="icon" href="/asset-logo.png" />
        <meta name="author" content="SPAS" />
        <meta name="title" content="Become a Member | Get Connected with SPAS Community" />
        <meta name="description" content="Our community membership gives you access to first-hand information and networking within the industry. Sign-up now!" />
        <meta name="keywords" content="spa, services, membership" />
        <meta name="robots" content="index, follow" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL} />
        <meta property="og:title" content="Become a Member | Get Connected with SPAS Community" />
        <meta property="og:description" content="Our community membership gives you access to first-hand information and networking within the industry. Sign-up now!" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_BASE_URL}/asset-logo.png`} />
      </Head>

      <Toaster position="top-right" />

      <main className="pt-32 lg:pt-30">
        <section className="mb-12 md:mb-24">
          <div className="container p-4 md:p-8">
            <div className="flex w-full flex-col space-y-4 md:space-y-8">
              <Card className="text-base md:w-1/2 md:mx-auto py-8">
                <form onSubmit={registerOperator}>
                  <CardHeader className="text-xl md:text-2xl font-bold text-center flex flex-col items-center justify-center">
                    <h2 className="mb-4 md:mb-8">Join as Spa Operator</h2>
                    <div className="md:w-1/2 space-y-2">
                      <h3 className="text-base md:text-lg">
                        Make a payment of SGD$200 to:
                      </h3>
                      <div className="bg-[#00296620] border-2 border-[#002966] p-4 rounded-xl">
                        <div className="flex flex-col items-center gap-y-4">
                          <Image
                            src={AssetBank.src}
                            className="object-cover w-full"
                            removeWrapper
                          />
                          <div
                            className="flex gap-x-10 items-center cursor-pointer"
                            onClick={copyClipboard}
                          >
                            <h3>339-317540-9</h3>
                            {isCopied ? (
                              <IoCopySharp className="text-secondary" />
                            ) : (
                              <IoCopyOutline />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardBody className="space-y-4">
                    <div className="flex flex-col gap-y-2">
                      <label>Logo</label>
                      <input name="url" type="file" accept="image/*" />
                      <div className="flex items-center gap-x-4">
                        <FaInfoCircle className="text-[#8D98AA]" />
                        <p className="text-xs md:w-3/4">Image file size max 2 MB</p>
                      </div>
                      {fieldErrors.url && (
                        <p className="text-xs text-red-500">{fieldErrors.url[0]}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-y-2 relative">
                      <label className="md:text-base text-sm">Company Name</label>
                      <input
                        name="company_name"
                        type="text"
                        className="border-2 rounded-md py-1.5 pl-4 outline-slate-400"
                      />
                      {fieldErrors.company_name && (
                        <p className="text-xs text-red-500">{fieldErrors.company_name[0]}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-y-2">
                      <label className="md:text-base text-sm">Email</label>
                      <input
                        name="email"
                        type="email"
                        className="border-2 rounded-md py-1.5 pl-4 outline-slate-400"
                      />
                      {fieldErrors.email && (
                        <p className="text-xs text-red-500">{fieldErrors.email[0]}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-y-2">
                      <label className="md:text-base text-sm">UEN NO</label>
                      <input
                        name="uen_no"
                        type="text"
                        className="border-2 rounded-md py-1.5 pl-4 outline-slate-400"
                      />
                      {fieldErrors.uen_no && (
                        <p className="text-xs text-red-500">{fieldErrors.uen_no[0]}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-y-2">
                      <label className="md:text-base text-sm">Brand Name</label>
                      <input
                        name="brand_name"
                        type="text"
                        className="border-2 rounded-md py-1.5 pl-4 outline-slate-400"
                      />
                      {fieldErrors.brand_name && (
                        <p className="text-xs text-red-500">{fieldErrors.brand_name[0]}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-y-2">
                      <label className="md:text-base text-sm">Address</label>
                      <input
                        name="address"
                        type="text"
                        className="border-2 rounded-md py-1.5 pl-4 outline-slate-400"
                      />
                      {fieldErrors.address && (
                        <p className="text-xs text-red-500">{fieldErrors.address[0]}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="md:text-base text-sm">Contact No.</label>
                      <PhoneInput
                        name="contact_no"
                        inputProps={{ style: inputStyle }}
                        className="border border-[#E4E4E7] rounded-md"
                        defaultCountry="sg"
                        hideDropdown
                        disableCountryGuess
                        forceDialCode
                      />
                      {fieldErrors.contact_no && (
                        <p className="text-xs text-red-500">{fieldErrors.contact_no[0]}</p>
                      )}
                    </div>

                    <div className="gap-y-2 flex flex-col">
                      <label className="md:text-base text-sm">Contact Person Name</label>
                      <input
                        name="contact_person"
                        type="text"
                        className="border-2 rounded-md py-1.5 pl-4 outline-slate-400"
                      />
                      {fieldErrors.contact_person && (
                        <p className="text-xs text-red-500">{fieldErrors.contact_person[0]}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="md:text-base text-sm">Contact Person No.</label>
                      <PhoneInput
                        name="contact_person_no"
                        inputProps={{ style: inputStyle }}
                        className="border border-[#E4E4E7] rounded-md"
                        defaultCountry="sg"
                        hideDropdown
                        disableCountryGuess
                        forceDialCode
                      />
                      {fieldErrors.contact_person_no && (
                        <p className="text-xs text-red-500">{fieldErrors.contact_person_no[0]}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-y-2">
                      <label className="md:text-base text-sm">Payment Slip</label>
                      <input name="payment_slip" type="file" accept="image/*" />
                      <div className="flex items-center gap-x-4">
                        <FaInfoCircle className="text-[#8D98AA]" />
                        <p className="text-xs md:w-3/4">Image file size max 2 MB.</p>
                      </div>
                      {fieldErrors.payment_slip && (
                        <p className="text-xs text-red-500">{fieldErrors.payment_slip[0]}</p>
                      )}
                    </div>
                  </CardBody>

                  <CardFooter>
                    <Button
                      color="primary"
                      fullWidth
                      size="lg"
                      type="submit"
                      isLoading={isLoading}
                      isDisabled={isLoading}
                      className="md:w-1/2 mx-auto"
                    >
                      {isLoading ? "Submitting..." : "Submit Now"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>

              <Link
                href="/auth/sign-in"
                className="font-semibold text-secondary w-max mx-auto"
              >
                Already have an account?
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
