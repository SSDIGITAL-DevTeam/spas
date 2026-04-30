import { JSX, useState, useMemo, FormEvent } from "react";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Image,
} from "@nextui-org/react";
import Head from "next/head";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import countryList from "react-select-country-list";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { IoCopyOutline, IoCopySharp } from "react-icons/io5";
import AssetBank from "@/assets/logo/UOB.webp";
import FormInput from "@/components/ui/FormInput";
import FormFileInput from "@/components/ui/FormFileInput";

type OperatorErrorResponse = {
  errors: {
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
};

type TherapistErrorResponse = {
  errors: {
    name?: string[];
    passport_finno?: string[];
    date_of_birth?: string[];
    sex?: string[];
    nationality?: string[];
    date_of_issue?: string[];
    issuing_organization?: string[];
    professional_certs?: string[];
    email?: string[];
    url?: string[];
    address?: string[];
    contact_no?: string[];
    name_cert?: string[];
    expired_date?: string[];
    credential_id?: string[];
    password?: string[];
    password_confirmation?: string[];
  };
};

const datePickerClass =
  "w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors";
const selectClass =
  "w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white";

export default function JoinUs(): JSX.Element {
  const [expiredDate, setExpiredDate] = useState(new Date());
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [issueDate, setIssueDate] = useState(new Date());
  const [isCopied, setIsCopied] = useState(false);
  const options = useMemo(() => countryList().getData(), []);

  const [errMsgOperator, setErrMsgOperator] = useState<OperatorErrorResponse>(
    {} as OperatorErrorResponse
  );
  const [errMsgTherapist, setErrMsgTherapist] = useState<TherapistErrorResponse>(
    {} as TherapistErrorResponse
  );

  const [showOperatorPass, setShowOperatorPass] = useState(false);
  const [showOperatorConfirmPass, setShowOperatorConfirmPass] = useState(false);
  const [showTherapistPass, setShowTherapistPass] = useState(false);
  const [showTherapistConfirmPass, setShowTherapistConfirmPass] = useState(false);

  const [isSubmittingOperator, setIsSubmittingOperator] = useState(false);
  const [isSubmittingTherapist, setIsSubmittingTherapist] = useState(false);

  const copyClipboard = () => {
    navigator.clipboard?.writeText("339-317540-9");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  };

  const registerOperator = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmittingOperator(true);
    setErrMsgOperator({} as OperatorErrorResponse);
    const formData = new FormData(e.currentTarget);
    const form = e.currentTarget;
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/end-user/operators`, formData);
      toast.success("Registration successful! Please wait for approval.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
      form.reset();
    } catch (error) {
      const errorMessage = error as AxiosError;
      setErrMsgOperator(errorMessage.response?.data as OperatorErrorResponse);
    } finally {
      setIsSubmittingOperator(false);
    }
  };

  const registerTherapist = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmittingTherapist(true);
    setErrMsgTherapist({} as TherapistErrorResponse);
    const formData = new FormData(e.currentTarget);
    const form = e.currentTarget;
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/end-user/therapists`, formData);
      toast.success("Registration successful! Please wait for approval.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
      form.reset();
    } catch (error) {
      const errorMessage = error as AxiosError;
      setErrMsgTherapist(errorMessage.response?.data as TherapistErrorResponse);
    } finally {
      setIsSubmittingTherapist(false);
    }
  };

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

      <main className="pt-32 lg:pt-30">
        <section className="mb-12 md:mb-24">
          <div className="container p-4 md:p-8">
            <div className="flex w-full flex-col space-y-4 md:space-y-8">
              <Tabs color="primary" aria-label="Join Us" className="mx-auto">

                {/* ── OPERATOR TAB ── */}
                <Tab key="operator" title="Operators" className="text-xl">
                  <Card className="text-base md:w-1/2 mx-auto py-8 shadow-md">
                    <form onSubmit={registerOperator}>
                      <CardHeader className="text-xl md:text-2xl font-bold text-center flex flex-col items-center justify-center gap-y-4">
                        <h2 className="mb-2 md:mb-4">Join as Spa Operator</h2>
                        <div className="md:w-1/2 space-y-2">
                          <h3 className="text-base md:text-lg font-medium">
                            Make a payment of SGD$200 to:
                          </h3>
                          <div className="bg-[#00296620] border-2 border-[#002966] p-4 rounded-xl">
                            <div className="flex flex-col items-center gap-y-4">
                              <Image src={AssetBank.src} className="object-cover" removeWrapper />
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

                      <CardBody className="space-y-4 px-6 md:px-8">
                        <FormFileInput
                          label="Company Logo"
                          name="url"
                          required
                          accept="image/*"
                          hint="Image file size max 2 MB"
                          error={errMsgOperator?.errors?.url?.[0]}
                        />

                        <FormInput
                          label="Company Name"
                          name="company_name"
                          type="text"
                          required
                          placeholder="Company name..."
                          error={errMsgOperator?.errors?.company_name?.[0]}
                        />

                        <FormInput
                          label="Email"
                          name="email"
                          type="email"
                          required
                          placeholder="company@example.com"
                          error={errMsgOperator?.errors?.email?.[0]}
                        />

                        <FormInput
                          label="Password"
                          name="password"
                          type={showOperatorPass ? "text" : "password"}
                          required
                          placeholder="Minimum 8 characters"
                          error={errMsgOperator?.errors?.password?.[0]}
                          endContent={
                            <button
                              type="button"
                              onClick={() => setShowOperatorPass((v) => !v)}
                              className="focus:outline-none"
                            >
                              {showOperatorPass ? (
                                <FaRegEyeSlash className="w-4 h-4" />
                              ) : (
                                <FaRegEye className="w-4 h-4" />
                              )}
                            </button>
                          }
                        />

                        <FormInput
                          label="Confirm Password"
                          name="password_confirmation"
                          type={showOperatorConfirmPass ? "text" : "password"}
                          required
                          placeholder="Re-enter password"
                          error={errMsgOperator?.errors?.password_confirmation?.[0]}
                          endContent={
                            <button
                              type="button"
                              onClick={() => setShowOperatorConfirmPass((v) => !v)}
                              className="focus:outline-none"
                            >
                              {showOperatorConfirmPass ? (
                                <FaRegEyeSlash className="w-4 h-4" />
                              ) : (
                                <FaRegEye className="w-4 h-4" />
                              )}
                            </button>
                          }
                        />

                        <FormInput
                          label="UEN No."
                          name="uen_no"
                          type="text"
                          required
                          placeholder="UEN number..."
                          error={errMsgOperator?.errors?.uen_no?.[0]}
                        />

                        <FormInput
                          label="Brand Name"
                          name="brand_name"
                          type="text"
                          required
                          placeholder="Brand name..."
                          error={errMsgOperator?.errors?.brand_name?.[0]}
                        />

                        <FormInput
                          label="Address"
                          name="address"
                          type="text"
                          required
                          placeholder="Company address..."
                          error={errMsgOperator?.errors?.address?.[0]}
                        />

                        <div className="flex flex-col gap-y-1">
                          <label className="text-sm font-medium text-slate-700">
                            Contact No. <span className="text-red-500">*</span>
                          </label>
                          <PhoneInput
                            name="contact_no"
                            inputStyle={{ width: "100%", fontSize: "14px", border: "none", outline: "none" }}
                            className="rounded-lg border border-slate-300 overflow-hidden"
                            defaultCountry="sg"
                          />
                          {errMsgOperator?.errors?.contact_no && (
                            <p className="text-xs text-red-500">{errMsgOperator.errors.contact_no[0]}</p>
                          )}
                        </div>

                        <FormInput
                          label="Contact Person Name"
                          name="contact_person"
                          type="text"
                          required
                          placeholder="Contact person name..."
                          error={errMsgOperator?.errors?.contact_person?.[0]}
                        />

                        <div className="flex flex-col gap-y-1">
                          <label className="text-sm font-medium text-slate-700">
                            Contact Person No. <span className="text-red-500">*</span>
                          </label>
                          <PhoneInput
                            name="contact_person_no"
                            inputStyle={{ width: "100%", fontSize: "14px", border: "none", outline: "none" }}
                            className="rounded-lg border border-slate-300 overflow-hidden"
                            defaultCountry="sg"
                          />
                          {errMsgOperator?.errors?.contact_person_no && (
                            <p className="text-xs text-red-500">{errMsgOperator.errors.contact_person_no[0]}</p>
                          )}
                        </div>

                        <FormFileInput
                          label="Payment Slip"
                          name="payment_slip"
                          required
                          accept="image/*"
                          hint="Image file size max 2 MB"
                          error={errMsgOperator?.errors?.payment_slip?.[0]}
                        />
                      </CardBody>

                      <CardFooter className="px-6 md:px-8 pt-2">
                        <Button
                          color="primary"
                          fullWidth
                          size="lg"
                          type="submit"
                          isLoading={isSubmittingOperator}
                          isDisabled={isSubmittingOperator}
                        >
                          Submit Now
                        </Button>
                      </CardFooter>
                    </form>
                  </Card>
                </Tab>

                {/* ── THERAPIST TAB ── */}
                <Tab key="therapist" title="Therapist" className="text-xl">
                  <Card className="text-base py-8 shadow-md">
                    <form onSubmit={registerTherapist}>
                      <CardHeader className="text-xl md:text-2xl font-bold text-center flex items-center justify-center">
                        Join as Spa Therapist
                      </CardHeader>

                      <div className="flex flex-col lg:flex-row p-4 md:p-8 lg:gap-x-10 gap-y-6">
                        {/* Personal Information */}
                        <div className="rounded-xl border border-slate-200 p-4 md:p-6 w-full space-y-4">
                          <h2 className="font-bold text-lg md:text-xl text-slate-800">
                            Personal Information
                          </h2>

                          <FormFileInput
                            label="Profile Picture"
                            name="url"
                            required
                            accept="image/*"
                            hint="Image file size max 2 MB"
                            error={errMsgTherapist?.errors?.url?.[0]}
                          />

                          <FormInput
                            label="Full Name"
                            name="name"
                            type="text"
                            required
                            placeholder="Full name..."
                            error={errMsgTherapist?.errors?.name?.[0]}
                          />

                          <FormInput
                            label="Passport / FIN No."
                            name="passport_finno"
                            type="text"
                            required
                            placeholder="Passport or FIN number..."
                            error={errMsgTherapist?.errors?.passport_finno?.[0]}
                          />

                          <FormInput
                            label="Address"
                            name="address"
                            type="text"
                            required
                            placeholder="Residential address..."
                            error={errMsgTherapist?.errors?.address?.[0]}
                          />

                          <div className="flex flex-col gap-y-1">
                            <label className="text-sm font-medium text-slate-700">
                              Date of Birth <span className="text-red-500">*</span>
                            </label>
                            <DatePicker
                              name="date_of_birth"
                              selected={dateOfBirth}
                              onChange={(date) => setDateOfBirth(date!)}
                              className={datePickerClass}
                              wrapperClassName="w-full"
                              dateFormat="yyyy/MM/dd"
                            />
                            {errMsgTherapist?.errors?.date_of_birth && (
                              <p className="text-xs text-red-500">{errMsgTherapist.errors.date_of_birth[0]}</p>
                            )}
                          </div>

                          <FormInput
                            label="Email"
                            name="email"
                            type="email"
                            required
                            placeholder="your@email.com"
                            error={errMsgTherapist?.errors?.email?.[0]}
                          />

                          <FormInput
                            label="Password"
                            name="password"
                            type={showTherapistPass ? "text" : "password"}
                            required
                            placeholder="Minimum 8 characters"
                            error={errMsgTherapist?.errors?.password?.[0]}
                            endContent={
                              <button
                                type="button"
                                onClick={() => setShowTherapistPass((v) => !v)}
                                className="focus:outline-none"
                              >
                                {showTherapistPass ? (
                                  <FaRegEyeSlash className="w-4 h-4" />
                                ) : (
                                  <FaRegEye className="w-4 h-4" />
                                )}
                              </button>
                            }
                          />

                          <FormInput
                            label="Confirm Password"
                            name="password_confirmation"
                            type={showTherapistConfirmPass ? "text" : "password"}
                            required
                            placeholder="Re-enter password"
                            error={errMsgTherapist?.errors?.password_confirmation?.[0]}
                            endContent={
                              <button
                                type="button"
                                onClick={() => setShowTherapistConfirmPass((v) => !v)}
                                className="focus:outline-none"
                              >
                                {showTherapistConfirmPass ? (
                                  <FaRegEyeSlash className="w-4 h-4" />
                                ) : (
                                  <FaRegEye className="w-4 h-4" />
                                )}
                              </button>
                            }
                          />

                          <div className="flex flex-col gap-y-1">
                            <label className="text-sm font-medium text-slate-700">
                              Sex <span className="text-red-500">*</span>
                            </label>
                            <select name="sex" className={selectClass} defaultValue="">
                              <option value="" disabled>Select an option</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                            </select>
                            {errMsgTherapist?.errors?.sex && (
                              <p className="text-xs text-red-500">{errMsgTherapist.errors.sex[0]}</p>
                            )}
                          </div>

                          <div className="flex flex-col gap-y-1">
                            <label className="text-sm font-medium text-slate-700">
                              Contact No. <span className="text-red-500">*</span>
                            </label>
                            <PhoneInput
                              name="contact_no"
                              inputStyle={{ width: "100%", fontSize: "14px", border: "none", outline: "none" }}
                              className="rounded-lg border border-slate-300 overflow-hidden"
                              defaultCountry="sg"
                            />
                            {errMsgTherapist?.errors?.contact_no && (
                              <p className="text-xs text-red-500">{errMsgTherapist.errors.contact_no[0]}</p>
                            )}
                          </div>

                          <div className="flex flex-col gap-y-1">
                            <label className="text-sm font-medium text-slate-700">
                              Nationality <span className="text-red-500">*</span>
                            </label>
                            <select name="nationality" className={selectClass} defaultValue="">
                              <option value="" disabled>Select nationality</option>
                              {options.map((country) => (
                                <option key={country.label} value={country.label}>
                                  {country.label}
                                </option>
                              ))}
                            </select>
                            {errMsgTherapist?.errors?.nationality && (
                              <p className="text-xs text-red-500">{errMsgTherapist.errors.nationality[0]}</p>
                            )}
                          </div>
                        </div>

                        {/* Professional Certificate */}
                        <div className="rounded-xl border border-slate-200 p-4 md:p-6 w-full space-y-4">
                          <h2 className="font-bold text-lg md:text-xl text-slate-800">
                            Professional Certificate
                          </h2>

                          <FormFileInput
                            label="Certificate File"
                            name="professional_certs"
                            required
                            accept="image/*"
                            hint="Image file size max 2 MB"
                            error={errMsgTherapist?.errors?.professional_certs?.[0]}
                          />

                          <FormInput
                            label="Certificate Name"
                            name="name_cert"
                            type="text"
                            required
                            placeholder="Certificate name..."
                            error={errMsgTherapist?.errors?.name_cert?.[0]}
                          />

                          <FormInput
                            label="Issuing Organization"
                            name="issuing_organization"
                            type="text"
                            required
                            placeholder="Organization name..."
                            error={errMsgTherapist?.errors?.issuing_organization?.[0]}
                          />

                          <div className="flex flex-col gap-y-1">
                            <label className="text-sm font-medium text-slate-700">
                              Issue Date <span className="text-red-500">*</span>
                            </label>
                            <DatePicker
                              name="date_of_issue"
                              selected={issueDate}
                              onChange={(date) => setIssueDate(date!)}
                              className={datePickerClass}
                              wrapperClassName="w-full"
                              dateFormat="yyyy/MM/dd"
                            />
                            {errMsgTherapist?.errors?.date_of_issue && (
                              <p className="text-xs text-red-500">{errMsgTherapist.errors.date_of_issue[0]}</p>
                            )}
                          </div>

                          <div className="flex flex-col gap-y-1">
                            <label className="text-sm font-medium text-slate-700">
                              Expiration Date <span className="text-red-500">*</span>
                            </label>
                            <DatePicker
                              name="expired_date"
                              selected={expiredDate}
                              onChange={(date) => setExpiredDate(date!)}
                              className={datePickerClass}
                              wrapperClassName="w-full"
                              dateFormat="yyyy/MM/dd"
                            />
                            {errMsgTherapist?.errors?.expired_date && (
                              <p className="text-xs text-red-500">{errMsgTherapist.errors.expired_date[0]}</p>
                            )}
                          </div>

                          <FormInput
                            label="Credential ID"
                            name="credential_id"
                            type="text"
                            required
                            placeholder="Credential ID..."
                            error={errMsgTherapist?.errors?.credential_id?.[0]}
                          />
                        </div>
                      </div>

                      <CardFooter className="px-4 md:px-8 pt-2">
                        <Button
                          type="submit"
                          color="primary"
                          size="lg"
                          className="md:w-1/2 mx-auto"
                          isLoading={isSubmittingTherapist}
                          isDisabled={isSubmittingTherapist}
                        >
                          Submit Now
                        </Button>
                      </CardFooter>
                    </form>
                  </Card>
                </Tab>
              </Tabs>

              <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />

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
