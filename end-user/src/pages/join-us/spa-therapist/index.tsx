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

import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { PhoneInput, CountryData } from "react-international-phone";
import "react-international-phone/style.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import countryList from "react-select-country-list";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

type TherapistErrorResponse = {
  errors: {
    name: string[];
    passport_finno: string[];
    date_of_birth: string[];
    sex: string[];
    nationality: string[];
    date_of_issue: string[];
    issuing_organization: string[];
    professional_certs: string[];
    email: string[];
    url: string[];
    address: string[];
    contact_no: string[];
    name_cert: string[];
    expired_date: string[];
    credential_id: string[];
  };
};

export default function JoinUs(): JSX.Element {
  const [expiredDate, setExpiredDate] = useState(new Date());
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [issueDate, setIssueDate] = useState(new Date());
  const options = useMemo(() => countryList().getData(), []);

  const [errMsgTherapist, setErrMsgTherapist] =
    useState<TherapistErrorResponse>({} as TherapistErrorResponse);

  const router = useRouter();

  const inputStyle = {
    width: "100%",
    fontSize: "16px",
  };

  const registerTherapist = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form: HTMLFormElement = e.currentTarget;
    const formData: FormData = new FormData(form);
    const formReset = e.target as HTMLFormElement;

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/end-user/therapists`,
        formData
      );

      toast.success("Register success, please check your email", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      formReset.reset();
    } catch (error) {
      console.log(error);
      const errorMessage = error as AxiosError;
      setErrMsgTherapist(errorMessage.response?.data as TherapistErrorResponse);
    }
  };

  // push to sign in when not logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem(
      process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME!
    );
    if (isLoggedIn) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <Head>
        <title>SPAS | Join Us</title>
        <link rel="icon" href="/asset-logo.png" />
        <meta name="author" content="SPAS" />

        <meta
          name="title"
          content="Become a Member | Get Connected with SPAS Community"
        />

        <meta
          name="description"
          content="Our community membership gives you access to first-hand information and networking within the industry. Sign-up now!"
        />

        <meta name="keywords" content="spa, services, membership" />

        <meta name="robots" content="index, follow" />

        <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL} />

        <meta
          property="og:title"
          content="Become a Member | Get Connected with SPAS Community"
        />

        <meta
          property="og:description"
          content="Our community membership gives you access to first-hand information and networking within the industry. Sign-up now!"
        />

        <meta property="og:type" content="website" />

        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/asset-logo.png`}
        />
      </Head>

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
                    <div className="border-2 border-[#E4E4E7] lg:p-2 md:p-8 w-full">
                      <CardBody className="space-y-4">
                        <h2 className="font-bold text-lg md:text-xl">
                          Personal Information
                        </h2>
                        <div className="gap-y-2 flex flex-col">
                          <label>Profile Picture</label>
                          <input type="file" name="url" />
                          <div className="flex items-center gap-x-4">
                            <FaInfoCircle className="text-[#8D98AA]" />
                            <p className="text-xs">Image file size max 2 MB</p>
                          </div>
                          {errMsgTherapist?.errors?.url && (
                            <p className="text-xs text-red-500">
                              {errMsgTherapist.errors.url[0]}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col gap-y-2">
                          <label className="md:text-base text-sm">
                            Full Name
                          </label>
                          <input
                            name="name"
                            type="text"
                            className="border-2 rounded-md py-1.5 pl-4 outline-slate-400"
                          />
                          {errMsgTherapist?.errors?.name && (
                            <p className="text-xs text-red-500">
                              {errMsgTherapist.errors.name[0]}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col gap-y-2">
                          <label className="md:text-base text-sm">
                            Passport/Fin No.
                          </label>
                          <input
                            name="passport_finno"
                            type="text"
                            className="border-2 rounded-md py-1.5 pl-4 outline-slate-400"
                          />
                          {errMsgTherapist?.errors?.passport_finno && (
                            <p className="text-xs text-red-500">
                              {errMsgTherapist.errors.passport_finno[0]}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col gap-y-2">
                          <label className="md:text-base text-sm">
                            Address
                          </label>
                          <input
                            name="address"
                            type="text"
                            className="border-2 rounded-md py-1.5 pl-4 outline-slate-400"
                          />
                          {errMsgTherapist?.errors?.address && (
                            <p className="text-xs text-red-500">
                              {errMsgTherapist.errors.address[0]}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col gap-y-2 w-full">
                          <label className="md:text-base text-sm">
                            Date of Birth
                          </label>
                          <div className=" border-2 pl-4 py-1.5 border-[#E4E4E7] w-full rounded-md">
                            <DatePicker
                              name="date_of_birth"
                              selected={dateOfBirth}
                              onChange={(date) => setDateOfBirth(date!)}
                              className="outline-none"
                              dateFormat={"yyyy/MM/dd"}
                            />
                          </div>
                          {errMsgTherapist?.errors?.date_of_birth && (
                            <p className="text-xs text-red-500">
                              {errMsgTherapist.errors.date_of_birth[0]}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col gap-y-2">
                          <label className="md:text-base text-sm">Email</label>
                          <input
                            name="email"
                            type="email"
                            className="border-2 rounded-md py-1.5 pl-4 outline-slate-400"
                          />
                          {errMsgTherapist?.errors?.email && (
                            <p className="text-xs text-red-500">
                              {errMsgTherapist.errors.email[0]}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col space-y-2">
                          <label className="md:text-base text-sm">Sex</label>
                          <select
                            name="sex"
                            className="border-2 border-[#E4E4E7] pl-4 py-1.5 rounded-md outline-slate-400"
                          >
                            <option value="" disabled>
                              Select an Option
                            </option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                          {errMsgTherapist?.errors?.sex && (
                            <p className="text-xs text-red-500">
                              {errMsgTherapist.errors.sex[0]}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="md:text-base text-sm">
                            Contact No.
                          </label>
                          <PhoneInput
                            inputProps={{ style: inputStyle }}
                            name="contact_no"
                            className="border-2 border-[#E4E4E7] rounded-md"
                            defaultCountry="sg"
                            // onChange={(phone: string) => setPhone(phone)}
                          />
                          {errMsgTherapist?.errors?.contact_no && (
                            <p className="text-xs text-red-500">
                              {errMsgTherapist.errors.contact_no[0]}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col gap-y-2">
                          <label className="md:text-base text-sm">
                            Nationality
                          </label>
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
                          {errMsgTherapist?.errors?.nationality && (
                            <p className="text-xs text-red-500">
                              {errMsgTherapist.errors.nationality[0]}
                            </p>
                          )}
                        </div>
                      </CardBody>
                    </div>

                    <div
                      className="border-2 border-[#E4E4E7] 
                        lg:p-2 md:p-8 w-full"
                    >
                      <CardBody className="space-y-4">
                        <h2 className="font-bold text-lg md:text-xl ">
                          Professional Certificate
                        </h2>
                        <div className="flex flex-col gap-y-2">
                          <label className="md:text-base text-sm">
                            Certificate File
                          </label>
                          <input type="file" name="professional_certs" />
                          <div className="flex items-center gap-x-4">
                            <FaInfoCircle className="text-[#8D98AA]" />
                            <p className="text-xs">Image file size max 2 MB</p>
                          </div>
                          {errMsgTherapist?.errors?.professional_certs && (
                            <p className="text-xs text-red-500">
                              {errMsgTherapist.errors.professional_certs[0]}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col gap-y-2">
                          <label className="md:text-base text-sm">
                            Certificate Name
                          </label>
                          <input
                            name="name_cert"
                            type="text"
                            className="border-2 rounded-md py-1.5 pl-4 outline-slate-400"
                          />
                          {errMsgTherapist?.errors?.name_cert && (
                            <p className="text-xs text-red-500">
                              {errMsgTherapist.errors.name_cert[0]}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col gap-y-2">
                          <label className="md:text-base text-sm">
                            Issuing Organization
                          </label>
                          <input
                            name="issuing_organization"
                            type="text"
                            className="border-2 rounded-md py-1.5 pl-4 outline-slate-400"
                          />
                          {errMsgTherapist?.errors?.issuing_organization && (
                            <p className="text-xs text-red-500">
                              {errMsgTherapist.errors.issuing_organization[0]}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col gap-y-2">
                          <label className="md:text-base text-sm">
                            Issue Date
                          </label>
                          <div className="border-2 border-[#E4E4E7] pl-4 py-1.5 rounded-md">
                            <DatePicker
                              selected={issueDate}
                              onChange={(date) => setIssueDate(date!)}
                              className="outline-none"
                              name="date_of_issue"
                              dateFormat={"yyyy/MM/dd"}
                            />
                            {errMsgTherapist?.errors?.date_of_issue && (
                              <p className="text-xs text-red-500">
                                {errMsgTherapist.errors.date_of_issue[0]}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col gap-y-2">
                          <label className="md:text-base text-sm">
                            Expiration Date
                          </label>
                          <div className="border-2 border-[#E4E4E7] pl-4 py-1.5 rounded-md">
                            <DatePicker
                              selected={expiredDate}
                              onChange={(date) => setExpiredDate(date!)}
                              className="outline-none"
                              name="expired_date"
                              dateFormat={"yyyy/MM/dd"}
                            />
                          </div>
                          {errMsgTherapist?.errors?.expired_date && (
                            <p className="text-xs text-red-500">
                              {errMsgTherapist.errors.expired_date[0]}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col gap-y-2">
                          <label className="md:text-base text-sm">
                            Credential ID
                          </label>
                          <input
                            name="credential_id"
                            type="text"
                            className="border-2 rounded-md py-1.5 pl-4 outline-slate-400"
                          />{" "}
                          {errMsgTherapist?.errors?.credential_id && (
                            <p className="text-xs text-red-500">
                              {errMsgTherapist.errors.credential_id[0]}
                            </p>
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
                      className="md:w-1/4 mx-auto"
                    >
                      Submit Now
                    </Button>
                  </CardFooter>
                </form>
              </Card>

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
