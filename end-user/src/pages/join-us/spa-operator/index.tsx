import { JSX, useState, useMemo, FormEvent } from "react";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Input,
  Button,
  Image,
} from "@nextui-org/react";
import Head from "next/head";
import { FaInfoCircle } from "react-icons/fa";

import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { PhoneInput, CountryData } from "react-international-phone";
import "react-international-phone/style.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Select from "react-select";
import countryList from "react-select-country-list";
import axios, { AxiosError } from "axios";
import Link from "next/link";

import AssetBank from "@/assets/logo/UOB.webp";
import { IoCopyOutline, IoCopySharp } from "react-icons/io5";

type OperatorErrorResponse = {
  errors: {
    company_name: string[];
    uen_no: string[];
    brand_name: string[];
    address: string[];
    contact_no: string[];
    contact_person: string[];
    contact_person_no: string[];
    url: string[];
    payment_slip: string[];
    email: string[];
  };
};

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
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);
  const [errMsgOperator, setErrMsgOperator] = useState<OperatorErrorResponse>(
    {} as OperatorErrorResponse
  );

  const [errMsgTherapist, setErrMsgTherapist] =
    useState<TherapistErrorResponse>({} as TherapistErrorResponse);

  const changeHandler = (value: any) => {
    setValue(value);
  };

  const inputStyle = {
    width: "100%",
    fontSize: "16px",
  };

  const registerOperator = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form: HTMLFormElement = e.currentTarget;
    const formData: FormData = new FormData(form);
    const formReset = e.target as HTMLFormElement;

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/end-user/operators`,

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
      setErrMsgOperator(errorMessage.response?.data as OperatorErrorResponse);
    }
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

  const copyClipboard = () => {
    navigator.clipboard?.writeText("339-317540-9");
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

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
            <div className="flex w-full flex-col space-y-4 md:space-y-8 ">
              <Card className="text-base md:w-1/2 md:mx-auto py-8 ">
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

                      <input name="url" type="file" />
                      <div className="flex items-center gap-x-4">
                        <FaInfoCircle className="text-[#8D98AA]" />
                        <p className="text-xs md:w-3/4">
                          Image file size max 2 MB
                        </p>
                      </div>
                      {errMsgOperator?.errors?.url && (
                        <p className="text-xs text-red-500">
                          {errMsgOperator.errors.url[0]}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-y-2 relative">
                      <label className="md:text-base text-sm">
                        Company Name
                      </label>
                      <input
                        name="company_name"
                        type="text"
                        className={`border-2 rounded-md py-1.5 pl-4 outline-slate-4002`}
                      />{" "}
                      {errMsgOperator?.errors?.company_name && (
                        <p className="text-xs text-red-500">
                          {errMsgOperator.errors.company_name[0]}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-y-2">
                      <label className="md:text-base text-sm">Email</label>
                      <input
                        name="email"
                        type="text"
                        className="border-2 rounded-md py-1.5 pl-4  outline-slate-400"
                      />
                      {errMsgOperator?.errors?.email && (
                        <p className="text-xs text-red-500">
                          {errMsgOperator.errors.email[0]}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-y-2">
                      <label className="md:text-base text-sm ">UEN NO</label>
                      <input
                        name="uen_no"
                        type="text"
                        className="border-2 rounded-md py-1.5 pl-4  outline-slate-400"
                      />
                      {errMsgOperator?.errors?.uen_no && (
                        <p className="text-xs text-red-500">
                          {errMsgOperator.errors.uen_no[0]}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-y-2">
                      <label className="md:text-base text-sm ">
                        Brand Name
                      </label>
                      <input
                        name="brand_name"
                        type="text"
                        className="border-2 rounded-md py-1.5 pl-4 outline-slate-400"
                      />
                      {errMsgOperator?.errors?.brand_name && (
                        <p className="text-xs text-red-500">
                          {errMsgOperator.errors.brand_name[0]}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-y-2">
                      <label className="md:text-base text-sm ">Address</label>
                      <input
                        name="address"
                        type="text"
                        className="border-2 rounded-md py-1.5 pl-4 outline-slate-400"
                      />
                      {errMsgOperator?.errors?.address && (
                        <p className="text-xs text-red-500">
                          {errMsgOperator.errors.address[0]}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="md:text-base text-sm">
                        Contact No.
                      </label>
                      <PhoneInput
                        name="contact_no"
                        inputProps={{ style: inputStyle }}
                        style={{}}
                        className="border border-[#E4E4E7] rounded-md"
                        defaultCountry="sg"
                      />
                      {errMsgOperator?.errors?.contact_no && (
                        <p className="text-xs text-red-500">
                          {errMsgOperator.errors.contact_no[0]}
                        </p>
                      )}
                    </div>

                    <div className="gap-y-2 flex flex-col">
                      <label className="md:text-base text-sm">
                        Contact Person Name
                      </label>
                      <input
                        name="contact_person"
                        type="text"
                        className="border-2 rounded-md py-1.5 pl-4 outline-slate-400"
                      />
                      {errMsgOperator?.errors?.contact_person && (
                        <p className="text-xs text-red-500">
                          {errMsgOperator.errors.contact_person[0]}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="md:text-base text-sm">
                        Contact Person No.
                      </label>
                      <PhoneInput
                        name="contact_person_no"
                        inputProps={{ style: inputStyle }}
                        style={{}}
                        className="border border-[#E4E4E7] rounded-md "
                        defaultCountry="sg"
                      />
                      {errMsgOperator?.errors?.contact_person_no && (
                        <p className="text-xs text-red-500">
                          {errMsgOperator.errors.contact_person_no[0]}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-y-2">
                      <label className="md:text-base text-sm">
                        Payment Slip
                      </label>

                      <input name="payment_slip" type="file" />
                      <div className="flex items-center gap-x-4">
                        <FaInfoCircle className="text-[#8D98AA]" />
                        <p className="text-xs md:w-3/4">
                          Image file size max 2 MB.
                        </p>
                      </div>
                      {errMsgOperator?.errors?.payment_slip && (
                        <p className="text-xs text-red-500">
                          {errMsgOperator.errors.payment_slip[0]}
                        </p>
                      )}
                    </div>
                  </CardBody>
                  <CardFooter>
                    <Button
                      color="primary"
                      fullWidth
                      size="lg"
                      type="submit"
                      className="md:w-1/2 mx-auto"
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
