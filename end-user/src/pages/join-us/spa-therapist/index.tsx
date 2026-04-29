import { JSX, useState, useMemo, FormEvent, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
} from "@nextui-org/react";
import Head from "next/head";
import { FaInfoCircle } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import countryList from "react-select-country-list";
import Link from "next/link";
import { useRouter } from "next/router";
import { apiModule, ApiRequestError } from "@/modules/apiModule";

type TherapistValidationErrors = {
  url?: string[];
  name?: string[];
  passport_finno?: string[];
  date_of_birth?: string[];
  sex?: string[];
  contact_no?: string[];
  nationality?: string[];
  address?: string[];
  email?: string[];
  professional_certs?: string[];
  name_cert?: string[];
  issuing_organization?: string[];
  date_of_issue?: string[];
  expired_date?: string[];
  credential_id?: string[];
};

export default function JoinAsTherapist(): JSX.Element {
  const [expiredDate, setExpiredDate] = useState(new Date());
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [issueDate, setIssueDate] = useState(new Date());
  const options = useMemo(() => countryList().getData(), []);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<TherapistValidationErrors>({});

  const router = useRouter();

  const inputStyle = { width: "100%", fontSize: "16px" };

  const registerTherapist = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldErrors({});
    setIsLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await apiModule("/end-user/therapists", "POST", {}, formData);
      toast.success("Registration successful! Please check your email.");
      form.reset();
    } catch (error) {
      if (error instanceof ApiRequestError) {
        if (error.data?.errors) {
          setFieldErrors(error.data.errors as TherapistValidationErrors);
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
              <Card className="text-base py-8">
                <form onSubmit={registerTherapist}>
                  <CardHeader className="text-xl md:text-2xl font-bold text-center flex items-center justify-center">
                    Join as Spa Therapist
                  </CardHeader>

                  <div className="flex flex-col lg:flex-row p-3 lg:p-4 md:p-8 lg:gap-x-10 gap-y-4">
                    {/* Personal Information */}
                    <div className="border-2 border-[#E4E4E7] lg:p-2 md:p-8 w-full">
                      <CardBody className="space-y-4">
                        <h2 className="font-bold text-lg md:text-xl">Personal Information</h2>

                        <div className="gap-y-2 flex flex-col">
                          <label>Profile Picture</label>
                          <input type="file" name="url" accept="image/*" />
                          <div className="flex items-center gap-x-4">
                            <FaInfoCircle className="text-[#8D98AA]" />
                            <p className="text-xs">Image file size max 2 MB</p>
                          </div>
                          {fieldErrors.url && (
                            <p className="text-xs text-red-500">{fieldErrors.url[0]}</p>
                          )}
                        </div>

                        <div className="flex flex-col gap-y-2">
                          <label className="md:text-base text-sm">Full Name</label>
                          <input
                            name="name"
                            type="text"
                            className="border-2 rounded-md py-1.5 pl-4 outline-slate-400"
                          />
                          {fieldErrors.name && (
                            <p className="text-xs text-red-500">{fieldErrors.name[0]}</p>
                          )}
                        </div>

                        <div className="flex flex-col gap-y-2">
                          <label className="md:text-base text-sm">Passport/Fin No.</label>
                          <input
                            name="passport_finno"
                            type="text"
                            className="border-2 rounded-md py-1.5 pl-4 outline-slate-400"
                          />
                          {fieldErrors.passport_finno && (
                            <p className="text-xs text-red-500">{fieldErrors.passport_finno[0]}</p>
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

                        <div className="flex flex-col gap-y-2 w-full">
                          <label className="md:text-base text-sm">Date of Birth</label>
                          <div className="border-2 pl-4 py-1.5 border-[#E4E4E7] w-full rounded-md">
                            <DatePicker
                              name="date_of_birth"
                              selected={dateOfBirth}
                              onChange={(date) => setDateOfBirth(date!)}
                              className="outline-none"
                              dateFormat="yyyy/MM/dd"
                            />
                          </div>
                          {fieldErrors.date_of_birth && (
                            <p className="text-xs text-red-500">{fieldErrors.date_of_birth[0]}</p>
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

                        <div className="flex flex-col space-y-2">
                          <label className="md:text-base text-sm">Sex</label>
                          <select
                            name="sex"
                            className="border-2 border-[#E4E4E7] pl-4 py-1.5 rounded-md outline-slate-400"
                          >
                            <option value="" disabled>Select an Option</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                          {fieldErrors.sex && (
                            <p className="text-xs text-red-500">{fieldErrors.sex[0]}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="md:text-base text-sm">Contact No.</label>
                          <PhoneInput
                            inputProps={{ style: inputStyle }}
                            name="contact_no"
                            className="border-2 border-[#E4E4E7] rounded-md"
                            defaultCountry="sg"
                            hideDropdown
                            disableCountryGuess
                            forceDialCode
                          />
                          {fieldErrors.contact_no && (
                            <p className="text-xs text-red-500">{fieldErrors.contact_no[0]}</p>
                          )}
                        </div>

                        <div className="flex flex-col gap-y-2">
                          <label className="md:text-base text-sm">Nationality</label>
                          <select
                            name="nationality"
                            className="z-20 w-full border-2 pl-2 py-1.5 rounded-md outline-slate-400"
                          >
                            {options.map((country) => (
                              <option key={country.label} value={country.label}>
                                {country.label}
                              </option>
                            ))}
                          </select>
                          {fieldErrors.nationality && (
                            <p className="text-xs text-red-500">{fieldErrors.nationality[0]}</p>
                          )}
                        </div>
                      </CardBody>
                    </div>

                    {/* Professional Certificate */}
                    <div className="border-2 border-[#E4E4E7] lg:p-2 md:p-8 w-full">
                      <CardBody className="space-y-4">
                        <h2 className="font-bold text-lg md:text-xl">Professional Certificate</h2>

                        <div className="flex flex-col gap-y-2">
                          <label className="md:text-base text-sm">Certificate File</label>
                          <input type="file" name="professional_certs" accept="image/*" />
                          <div className="flex items-center gap-x-4">
                            <FaInfoCircle className="text-[#8D98AA]" />
                            <p className="text-xs">Image file size max 2 MB</p>
                          </div>
                          {fieldErrors.professional_certs && (
                            <p className="text-xs text-red-500">{fieldErrors.professional_certs[0]}</p>
                          )}
                        </div>

                        <div className="flex flex-col gap-y-2">
                          <label className="md:text-base text-sm">Certificate Name</label>
                          <input
                            name="name_cert"
                            type="text"
                            className="border-2 rounded-md py-1.5 pl-4 outline-slate-400"
                          />
                          {fieldErrors.name_cert && (
                            <p className="text-xs text-red-500">{fieldErrors.name_cert[0]}</p>
                          )}
                        </div>

                        <div className="flex flex-col gap-y-2">
                          <label className="md:text-base text-sm">Issuing Organization</label>
                          <input
                            name="issuing_organization"
                            type="text"
                            className="border-2 rounded-md py-1.5 pl-4 outline-slate-400"
                          />
                          {fieldErrors.issuing_organization && (
                            <p className="text-xs text-red-500">{fieldErrors.issuing_organization[0]}</p>
                          )}
                        </div>

                        <div className="flex flex-col gap-y-2">
                          <label className="md:text-base text-sm">Issue Date</label>
                          <div className="border-2 border-[#E4E4E7] pl-4 py-1.5 rounded-md">
                            <DatePicker
                              selected={issueDate}
                              onChange={(date) => setIssueDate(date!)}
                              className="outline-none"
                              name="date_of_issue"
                              dateFormat="yyyy/MM/dd"
                            />
                          </div>
                          {fieldErrors.date_of_issue && (
                            <p className="text-xs text-red-500">{fieldErrors.date_of_issue[0]}</p>
                          )}
                        </div>

                        <div className="flex flex-col gap-y-2">
                          <label className="md:text-base text-sm">Expiration Date</label>
                          <div className="border-2 border-[#E4E4E7] pl-4 py-1.5 rounded-md">
                            <DatePicker
                              selected={expiredDate}
                              onChange={(date) => setExpiredDate(date!)}
                              className="outline-none"
                              name="expired_date"
                              dateFormat="yyyy/MM/dd"
                            />
                          </div>
                          {fieldErrors.expired_date && (
                            <p className="text-xs text-red-500">{fieldErrors.expired_date[0]}</p>
                          )}
                        </div>

                        <div className="flex flex-col gap-y-2">
                          <label className="md:text-base text-sm">Credential ID</label>
                          <input
                            name="credential_id"
                            type="text"
                            className="border-2 rounded-md py-1.5 pl-4 outline-slate-400"
                          />
                          {fieldErrors.credential_id && (
                            <p className="text-xs text-red-500">{fieldErrors.credential_id[0]}</p>
                          )}
                        </div>
                      </CardBody>
                    </div>
                  </div>

                  <CardFooter>
                    <Button
                      type="submit"
                      color="primary"
                      size="md"
                      isLoading={isLoading}
                      isDisabled={isLoading}
                      className="md:w-1/4 mx-auto"
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
