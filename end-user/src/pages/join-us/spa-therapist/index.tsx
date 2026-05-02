import { JSX, useState, useMemo, FormEvent, useEffect, ChangeEvent } from "react";
import { Card, CardBody, CardHeader, CardFooter, Button } from "@nextui-org/react";
import Head from "next/head";
import toast, { Toaster } from "react-hot-toast";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import countryList from "react-select-country-list";
import Link from "next/link";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useRouter } from "next/router";
import { apiModule, ApiRequestError } from "@/modules/apiModule";
import FormInput from "@/components/ui/FormInput";
import FormFileInput from "@/components/ui/FormFileInput";

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
  password?: string[];
  password_confirmation?: string[];
  professional_certs?: string[];
  name_cert?: string[];
  issuing_organization?: string[];
  date_of_issue?: string[];
  expired_date?: string[];
  credential_id?: string[];
};

const datePickerClass =
  "w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors";
const selectClass =
  "w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white";

export default function JoinAsTherapist(): JSX.Element {
  const [expiredDate, setExpiredDate] = useState(new Date());
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [issueDate, setIssueDate] = useState(new Date());
  const options = useMemo(() => countryList().getData(), []);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<TherapistValidationErrors>({});
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [profilePreview, setProfilePreview] = useState("");
  const [certificatePreview, setCertificatePreview] = useState("");
  const router = useRouter();

  // Redirect disabled for UI testing & robustness
  // useEffect(() => {
  //   const isLoggedIn = localStorage.getItem(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME!);
  //   if (isLoggedIn) router.push("/");
  // }, [router]);

  useEffect(() => {
    return () => {
      if (profilePreview) URL.revokeObjectURL(profilePreview);
      if (certificatePreview) URL.revokeObjectURL(certificatePreview);
    };
  }, [profilePreview, certificatePreview]);

  const handlePreview =
    (setter: (value: string) => void) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      setter(file ? URL.createObjectURL(file) : "");
    };

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
      setProfilePreview("");
      setCertificatePreview("");
    } catch (error) {
      if (error instanceof ApiRequestError) {
        if (error.data?.errors) setFieldErrors(error.data.errors as TherapistValidationErrors);
        else toast.error(error.getFirstError());
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>SPAS | Join as Spa Therapist</title>
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
            <form onSubmit={registerTherapist}>
              <CardHeader className="flex flex-col items-center px-6 md:px-8 pt-10 pb-0">
                <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider mb-3">
                  Registration
                </span>
                <h2 className="text-3xl font-bold text-slate-900">Join as Spa Therapist</h2>
                <p className="mt-2 text-slate-500 text-center max-w-2xl">
                  Become a part of our professional community. Complete the forms below with your personal and professional details.
                </p>
              </CardHeader>

              <div className="grid grid-cols-1 lg:grid-cols-2 px-6 md:px-10 pt-10 pb-0 gap-8">
                {/* Personal Information */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 md:p-8 space-y-5 shadow-sm">
                  <div className="mb-6">
                    <h3 className="font-bold text-xl text-slate-800">Personal Information</h3>
                    <p className="text-sm text-slate-500 mt-1">Please enter your personal details.</p>
                  </div>

                  <FormFileInput
                    label="Profile Picture"
                    name="url"
                    required
                    accept="image/*"
                    hint="Image file size max 2 MB"
                    previewSrc={profilePreview}
                    previewAlt="Profile picture preview"
                    previewClassName="h-40 w-full object-cover"
                    onChange={handlePreview(setProfilePreview)}
                    error={fieldErrors.url?.[0]}
                  />

                  <FormInput
                    label="Full Name"
                    name="name"
                    type="text"
                    required
                    placeholder="Full name..."
                    error={fieldErrors.name?.[0]}
                  />

                  <FormInput
                    label="Passport / FIN No."
                    name="passport_finno"
                    type="text"
                    required
                    placeholder="Passport or FIN number..."
                    error={fieldErrors.passport_finno?.[0]}
                  />

                  <FormInput
                    label="Address"
                    name="address"
                    type="text"
                    required
                    placeholder="Residential address..."
                    error={fieldErrors.address?.[0]}
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
                    {fieldErrors.date_of_birth && (
                      <p className="text-xs text-red-500">{fieldErrors.date_of_birth[0]}</p>
                    )}
                  </div>

                  <FormInput
                    label="Email"
                    name="email"
                    type="email"
                    required
                    placeholder="your@email.com"
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-y-1">
                      <label className="text-sm font-medium text-slate-700">
                        Sex <span className="text-red-500">*</span>
                      </label>
                      <select name="sex" className={selectClass} defaultValue="">
                        <option value="" disabled>Select an option</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                      {fieldErrors.sex && (
                        <p className="text-xs text-red-500">{fieldErrors.sex[0]}</p>
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
                      {fieldErrors.nationality && (
                        <p className="text-xs text-red-500">{fieldErrors.nationality[0]}</p>
                      )}
                    </div>
                  </div>

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
                </div>

                {/* Professional Certificate */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 md:p-8 space-y-5 shadow-sm h-fit">
                  <div className="mb-6">
                    <h3 className="font-bold text-xl text-slate-800">Professional Background</h3>
                    <p className="text-sm text-slate-500 mt-1">Provide your professional certifications.</p>
                  </div>

                  <FormFileInput
                    label="Certificate File"
                    name="professional_certs"
                    required
                    accept="image/*"
                    hint="Image file size max 2 MB"
                    previewSrc={certificatePreview}
                    previewAlt="Certificate preview"
                    onChange={handlePreview(setCertificatePreview)}
                    error={fieldErrors.professional_certs?.[0]}
                  />

                  <FormInput
                    label="Certificate Name"
                    name="name_cert"
                    type="text"
                    required
                    placeholder="Certificate name..."
                    error={fieldErrors.name_cert?.[0]}
                  />

                  <FormInput
                    label="Issuing Organization"
                    name="issuing_organization"
                    type="text"
                    required
                    placeholder="Organization name..."
                    error={fieldErrors.issuing_organization?.[0]}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      {fieldErrors.date_of_issue && (
                        <p className="text-xs text-red-500">{fieldErrors.date_of_issue[0]}</p>
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
                      {fieldErrors.expired_date && (
                        <p className="text-xs text-red-500">{fieldErrors.expired_date[0]}</p>
                      )}
                    </div>
                  </div>

                  <FormInput
                    label="Credential ID"
                    name="credential_id"
                    type="text"
                    placeholder="Credential ID (optional)"
                    error={fieldErrors.credential_id?.[0]}
                  />
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

