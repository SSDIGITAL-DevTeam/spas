import { JSX, useState, FormEvent, useEffect, ChangeEvent } from "react";
import { Card, CardBody, CardHeader, CardFooter, Button, Image } from "@nextui-org/react";
import Head from "next/head";
import toast, { Toaster } from "react-hot-toast";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import Link from "next/link";
import AssetBank from "@/assets/logo/UOB.webp";
import { IoCopyOutline, IoCopySharp } from "react-icons/io5";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useRouter } from "next/router";
import { apiModule, ApiRequestError } from "@/modules/apiModule";
import FormInput from "@/components/ui/FormInput";
import FormFileInput from "@/components/ui/FormFileInput";

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
  password?: string[];
  password_confirmation?: string[];
};

export default function JoinAsOperator(): JSX.Element {
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<OperatorValidationErrors>({});
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [logoPreview, setLogoPreview] = useState("");
  const [paymentSlipPreview, setPaymentSlipPreview] = useState("");
  const router = useRouter();

  // Redirect disabled for UI testing & robustness
  // useEffect(() => {
  //   const isLoggedIn = localStorage.getItem(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME!);
  //   if (isLoggedIn) router.push("/");
  // }, [router]);

  useEffect(() => {
    return () => {
      if (logoPreview) URL.revokeObjectURL(logoPreview);
      if (paymentSlipPreview) URL.revokeObjectURL(paymentSlipPreview);
    };
  }, [logoPreview, paymentSlipPreview]);

  const handlePreview =
    (setter: (value: string) => void) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      setter(file ? URL.createObjectURL(file) : "");
    };

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
      setLogoPreview("");
      setPaymentSlipPreview("");
    } catch (error) {
      if (error instanceof ApiRequestError) {
        if (error.data?.errors) setFieldErrors(error.data.errors as OperatorValidationErrors);
        else toast.error(error.getFirstError());
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

  return (
    <>
      <Head>
        <title>SPAS | Join as Spa Operator</title>
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

      <main className="pt-32 pb-16 bg-slate-50 min-h-screen">
        <div className="container mx-auto px-4 lg:px-8">
          <Card className="max-w-6xl mx-auto shadow-md">
            <form onSubmit={registerOperator}>
              <CardHeader className="flex flex-col items-center px-6 md:px-8 pt-10 pb-0">
                <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider mb-3">
                  Registration
                </span>
                <h2 className="text-3xl font-bold text-slate-900">Join as Spa Operator</h2>
                <p className="mt-2 text-slate-500 text-center max-w-2xl">
                  Become a part of our professional community. Complete the forms below with your company and payment details.
                </p>
              </CardHeader>

              <div className="grid grid-cols-1 lg:grid-cols-2 px-6 md:px-10 pt-10 pb-0 gap-8">
                {/* Company Information */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 md:p-8 space-y-5 shadow-sm">
                  <div className="mb-6">
                    <h3 className="font-bold text-xl text-slate-800">Company Information</h3>
                    <p className="text-sm text-slate-500 mt-1">Please enter your company details and login credentials.</p>
                  </div>

                  <FormFileInput
                    label="Company Logo"
                    name="url"
                    required
                    accept="image/*"
                    hint="Image file size max 2 MB"
                    previewSrc={logoPreview}
                    previewAlt="Company logo preview"
                    onChange={handlePreview(setLogoPreview)}
                    error={fieldErrors.url?.[0]}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                      label="Company Name"
                      name="company_name"
                      type="text"
                      required
                      placeholder="Company name..."
                      error={fieldErrors.company_name?.[0]}
                    />

                    <FormInput
                      label="Brand Name"
                      name="brand_name"
                      type="text"
                      required
                      placeholder="Brand name..."
                      error={fieldErrors.brand_name?.[0]}
                    />
                  </div>
                  
                  <FormInput
                    label="UEN No."
                    name="uen_no"
                    type="text"
                    required
                    placeholder="UEN number..."
                    error={fieldErrors.uen_no?.[0]}
                  />

                  <FormInput
                    label="Address"
                    name="address"
                    type="text"
                    required
                    placeholder="Company address..."
                    error={fieldErrors.address?.[0]}
                  />

                  <div className="flex flex-col gap-y-1 pb-2">
                    <label className="text-sm font-medium text-slate-700">
                      Contact No. <span className="text-red-500">*</span>
                    </label>
                    <PhoneInput
                      name="contact_no"
                      inputStyle={{ width: "100%", fontSize: "14px", border: "none", outline: "none", paddingTop: "6px", paddingBottom: "6px" }}
                      className="rounded-lg border border-slate-300 overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-colors"
                      defaultCountry="sg"
                    />
                    {fieldErrors.contact_no && (
                      <p className="text-xs text-red-500">{fieldErrors.contact_no[0]}</p>
                    )}
                  </div>

                  <FormInput
                    label="Email"
                    name="email"
                    type="email"
                    required
                    placeholder="company@example.com"
                    error={fieldErrors.email?.[0]}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                      label="Password"
                      name="password"
                      type={showPass ? "text" : "password"}
                      required
                      placeholder="Minimum 8 characters"
                      error={fieldErrors.password?.[0]}
                      endContent={
                        <button type="button" onClick={() => setShowPass((v) => !v)} className="focus:outline-none">
                          {showPass ? <FaRegEyeSlash className="w-4 h-4 text-slate-400" /> : <FaRegEye className="w-4 h-4 text-slate-400" />}
                        </button>
                      }
                    />

                    <FormInput
                      label="Confirm Password"
                      name="password_confirmation"
                      type={showConfirmPass ? "text" : "password"}
                      required
                      placeholder="Re-enter password"
                      error={fieldErrors.password_confirmation?.[0]}
                      endContent={
                        <button type="button" onClick={() => setShowConfirmPass((v) => !v)} className="focus:outline-none">
                          {showConfirmPass ? <FaRegEyeSlash className="w-4 h-4 text-slate-400" /> : <FaRegEye className="w-4 h-4 text-slate-400" />}
                        </button>
                      }
                    />
                  </div>
                </div>

                {/* Contact Person & Payment */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 md:p-8 space-y-6 shadow-sm h-fit">
                  <div>
                    <div className="mb-6">
                      <h3 className="font-bold text-xl text-slate-800">Contact Person</h3>
                      <p className="text-sm text-slate-500 mt-1">Representative details for the company.</p>
                    </div>

                    <div className="space-y-5">
                      <FormInput
                        label="Contact Person Name"
                        name="contact_person"
                        type="text"
                        required
                        placeholder="Contact person name..."
                        error={fieldErrors.contact_person?.[0]}
                      />

                      <div className="flex flex-col gap-y-1 pb-2">
                        <label className="text-sm font-medium text-slate-700">
                          Contact Person No. <span className="text-red-500">*</span>
                        </label>
                        <PhoneInput
                          name="contact_person_no"
                          inputStyle={{ width: "100%", fontSize: "14px", border: "none", outline: "none", paddingTop: "6px", paddingBottom: "6px" }}
                          className="rounded-lg border border-slate-300 overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-colors"
                          defaultCountry="sg"
                        />
                        {fieldErrors.contact_person_no && (
                          <p className="text-xs text-red-500">{fieldErrors.contact_person_no[0]}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <hr className="border-slate-200" />

                  <div>
                    <div className="mb-6">
                      <h3 className="font-bold text-xl text-slate-800">Payment & Documentation</h3>
                      <p className="text-sm text-slate-500 mt-1">Please provide the payment proof for membership fees.</p>
                    </div>

                    <div className="space-y-5">
                      <div className="w-full space-y-3">
                        <p className="text-sm font-medium text-slate-700">Make a payment of SGD$200 to:</p>
                        <div className="bg-secondary/5 border border-secondary/20 rounded-xl p-5 hover:border-secondary/40 transition-colors">
                          <div className="flex flex-col items-center gap-y-4">
                            <Image src={AssetBank.src} alt="UOB bank logo" className="object-contain h-10 w-auto" removeWrapper />
                            <div 
                              className="flex gap-x-3 items-center cursor-pointer group bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm" 
                              onClick={copyClipboard}
                              title="Click to copy account number"
                            >
                              <span className="font-bold tracking-wide text-secondary text-lg">339-317540-9</span>
                              {isCopied ? (
                                <IoCopySharp className="text-secondary w-5 h-5" />
                              ) : (
                                <IoCopyOutline className="text-slate-400 group-hover:text-secondary w-5 h-5 transition-colors" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <FormFileInput
                        label="Payment Slip"
                        name="payment_slip"
                        required
                        accept="image/*"
                        hint="Image file size max 2 MB"
                        previewSrc={paymentSlipPreview}
                        previewAlt="Payment slip preview"
                        onChange={handlePreview(setPaymentSlipPreview)}
                        error={fieldErrors.payment_slip?.[0]}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <CardBody className="px-6 md:px-10 pt-2" />

              <CardFooter className="px-6 md:px-10 pt-4 pb-10 flex flex-col gap-y-4 items-center">
                <Button
                  type="submit"
                  color="primary"
                  className="w-full max-w-sm"
                  size="lg"
                  isLoading={isLoading}
                  isDisabled={isLoading}
                >
                  Submit Registration
                </Button>
                <Link href="/auth/sign-in" className="text-sm text-slate-500 hover:text-primary transition-colors">
                  Already have an account?{" "}
                  <span className="font-semibold text-primary underline underline-offset-2">Sign In</span>
                </Link>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
    </>
  );
}

