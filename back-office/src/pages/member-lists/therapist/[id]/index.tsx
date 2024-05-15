import Link from "next/link";
import { JSX, useState, useMemo, useEffect, FormEvent } from "react";
import { FaChevronLeft, FaInfoCircle } from "react-icons/fa";
import { Button, Image, Input } from "@nextui-org/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import countryList from "react-select-country-list";
import { Therapist } from "@/@types";
import Head from "next/head";
import TherapistModule from "@/modules/TherapistModule";
import { useRouter } from "next/router";
import Loading from "@/components/partials/Loading";
import toast from "react-hot-toast";
import ApiError from "@/errors/ApiError";

type ValidationErrors = {
  status: boolean;
  errors: {
    name: string;
    passport_finno: string;
    date_of_birth: string;
    sex: string;
    contact_no: string;
    nationality: string;
    address: string;
    professional_certs: string;
    email: string;
    name_cert: string;
    issuing_organization: string;
    date_of_issue: string;
    expired_date: string;
    credential_id: string;
    url: string;
  };
};

export default function DetailMember(): JSX.Element {
  const [singleTherapist, setSingleTherapist] = useState<Therapist>(
    {} as Therapist
  );

  const [startDate, setStartDate] = useState(new Date());
  const options = useMemo(() => countryList().getData(), []);
  const [value, setValue] = useState("");

  const changeHandler = (value: any) => {
    setValue(value);
  };
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState(
    {} as ValidationErrors
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const fetchSingleTherapist = async () => {
      setIsLoading(true);

      try {
        const res = await new TherapistModule().singleTherapist(
          +router.query.id!
        );
        setSingleTherapist(res.data);
        setIsLoading(true);

        // console.log(setSingleTherapist);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchSingleTherapist();
  }, [router]);

  // handle update operator
  const handleCreateBlog = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    setIsProcessing(true);
    e.preventDefault();

    const form: HTMLFormElement = e.currentTarget;
    const formData: FormData = new FormData(form);
    const submit: SubmitEvent = e.nativeEvent as SubmitEvent;
    const status: HTMLButtonElement = submit.submitter as HTMLButtonElement;

    try {
      await new TherapistModule().update(formData, +router.query.id!);

      toast("Operator Updated Successfully", {
        icon: "✅",
        style: {
          backgroundColor: "#F4B202",
          color: "#ffffff",
          paddingBlock: 12,
        },
      });

      router.push(`/member-lists`);
    } catch (error) {
      const err = error as ApiError;
      const validationErrors = err.data as ValidationErrors;
      setValidationErrors(validationErrors);

      toast("Something Wrong", {
        icon: "🚫",
        style: {
          backgroundColor: "#D81222",
          color: "#ffffff",
          paddingBlock: 12,
        },
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Head>
        <title>SPAS | {singleTherapist.name}</title>
      </Head>
      <main>
        <header className="mb-8 md:mb-12">
          <Link
            href={"/member-lists"}
            className="flex gap-x-4 items-center w-max"
          >
            <div className="bg-secondary p-2 rounded-md">
              <FaChevronLeft className="w-4 h-4 md:w-8 md:h-8 text-white" />
            </div>
            <span className="text-base md:text-2xl lg:text-3xl">
              Back to Member Lists
            </span>
          </Link>
        </header>

        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <section className="container p-4 md:p-8">
              <h1 className="text-lg md:text-2xl lg:text-3xl font-semibold mb-8 md:mb-12">
                Detail Therapist
              </h1>

              <form onSubmit={(e) => handleCreateBlog(e)}>
                <div className="flex flex-col md:flex-row justify-between mb-8 md:mb-12 md:gap-x-10">
                  <div className="md:w-1/2 space-y-4 md:space-y-8">
                    <h2 className="md:text-lg lg:tex-xl font-bold mb-4 md:mb-8">
                      Personal Information
                    </h2>

                    <label htmlFor="">Profile Picture</label>

                    <div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        key={singleTherapist.id}
                        src={
                          singleTherapist.cover
                            ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${singleTherapist.cover.url}`
                            : "/no-image.png"
                        }
                        alt={singleTherapist.name}
                        className="object-cover w-80"
                      />
                    </div>

                    <div className="space-y-2">
                      <input type="file" className="" name="url" />
                      <div className="flex items-center gap-x-4">
                        <FaInfoCircle className="text-[#8D98AA]" />
                        <p className="text-xs md:w-3/4">
                          The image file must be at least 2 MB in size, with
                          equal dimensions (e.g., square or a 1:1 aspect ratio)
                        </p>
                      </div>

                      {validationErrors.errors?.url && (
                        <p className="text-ligh text-[#D81222] mt-2">
                          {validationErrors.errors.url[0]}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="">Full Name</label>

                      <Input
                        variant="bordered"
                        name="name"
                        defaultValue={singleTherapist.name}
                      />

                      {validationErrors.errors?.name && (
                        <p className="text-ligh text-[#D81222] mt-2">
                          {validationErrors.errors.name[0]}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="">Passport/Fin No.</label>

                      <Input
                        variant="bordered"
                        name="passport_finno"
                        defaultValue={singleTherapist.passport_finno}
                      />

                      {validationErrors.errors?.passport_finno && (
                        <p className="text-ligh text-[#D81222] mt-2">
                          {validationErrors.errors?.passport_finno[0]}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="">Email</label>

                      <Input
                        variant="bordered"
                        name="email"
                        defaultValue={singleTherapist.user?.email}
                      />

                      {validationErrors.errors?.email && (
                        <p className="text-ligh text-[#D81222] mt-2">
                          {validationErrors.errors?.email[0]}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="">Date of Birth</label>

                      <input
                        className="form-input mt-2 block w-full px-4 py-3 border-2 rounded-lg"
                        name="date_of_birth"
                        type="date"
                        placeholder="date_of_birth..."
                        defaultValue={
                          singleTherapist?.date_of_birth?.split(" ")[0]
                        }
                      />

                      {validationErrors.errors?.date_of_birth && (
                        <p className="text-ligh text-[#D81222] mt-2">
                          {validationErrors.errors?.date_of_birth[0]}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="">Sex</label>

                      <Input
                        variant="bordered"
                        name="sex"
                        defaultValue={singleTherapist.sex}
                      />

                      {validationErrors.errors?.sex && (
                        <p className="text-ligh text-[#D81222] mt-2">
                          {validationErrors.errors?.sex[0]}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="">Contact No.</label>

                      <Input
                        variant="bordered"
                        name="contact_no"
                        defaultValue={singleTherapist.contact_no}
                      />

                      {validationErrors.errors?.contact_no && (
                        <p className="text-ligh text-[#D81222] mt-2">
                          {validationErrors.errors?.contact_no[0]}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="">Nationality</label>

                      <select
                        className="z-20 w-full border-3 pl-2 py-1.5 rounded-md"
                        onChange={changeHandler}
                        name="nationality"
                        defaultValue={singleTherapist.nationality || ""}
                      >
                        {singleTherapist.nationality ? (
                          <option value={singleTherapist.nationality}>
                            {singleTherapist.nationality}
                          </option>
                        ) : (
                          <option value="" disabled>
                            Select a country
                          </option>
                        )}
                        {options.map((country) => (
                          <option value={country.label} key={country.label}>
                            {country.label}
                          </option>
                        ))}
                      </select>

                      {validationErrors.errors?.nationality && (
                        <p className="text-ligh text-[#D81222] mt-2">
                          {validationErrors.errors?.nationality[0]}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="md:w-1/2 space-y-4 md:space-y-8">
                    <div className="md:space-y-8">
                      <h2 className="md:text-lg lg:tex-xl font-bold mb-4 md:mb-8">
                        Professional Certificate
                      </h2>

                      <label htmlFor="">Certificate Picture</label>

                      <div>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          key={singleTherapist.id}
                          src={
                            singleTherapist.professional_certs
                              ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${singleTherapist.professional_certs}`
                              : "/no-image.png"
                          }
                          alt={singleTherapist.name}
                          className="object-cover w-80"
                        />
                      </div>

                      <div className="space-y-2">
                        <input
                          type="file"
                          className=""
                          name="professional_certs"
                        />
                        <div className="flex items-center gap-x-4">
                          <FaInfoCircle className="text-[#8D98AA]" />
                          <p className="text-xs md:w-3/4">
                            The image file must be at least 2 MB in size, with
                            equal dimensions (e.g., square or a 1:1 aspect
                            ratio)
                          </p>
                        </div>

                        {validationErrors.errors?.professional_certs && (
                          <p className="text-ligh text-[#D81222] mt-2">
                            {validationErrors.errors.professional_certs[0]}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="">Certificate Name</label>

                      <Input
                        variant="bordered"
                        name="name_cert"
                        defaultValue={singleTherapist.name_cert}
                      />

                      {validationErrors.errors?.name_cert && (
                        <p className="text-ligh text-[#D81222] mt-2">
                          {validationErrors.errors.name_cert[0]}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="">Issuing Organization</label>

                      <Input
                        variant="bordered"
                        name="issuing_organization"
                        defaultValue={singleTherapist.issuing_organization}
                      />

                      {validationErrors.errors?.issuing_organization && (
                        <p className="text-ligh text-[#D81222] mt-2">
                          {validationErrors.errors.issuing_organization[0]}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="">Issue Date</label>

                      <input
                        className="form-input mt-2 block w-full px-4 py-3 border-2 rounded-lg"
                        name="date_of_issue"
                        type="date"
                        placeholder="date_of_issue..."
                        defaultValue={
                          singleTherapist?.date_of_issue?.split(" ")[0]
                        }
                      />

                      {validationErrors.errors?.date_of_issue && (
                        <p className="text-ligh text-[#D81222] mt-2">
                          {validationErrors.errors.date_of_issue[0]}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="">Expiration Date</label>

                      <input
                        className="form-input mt-2 block w-full px-4 py-3 border-2 rounded-lg"
                        name="expired_date"
                        type="date"
                        placeholder="expired_date..."
                        defaultValue={
                          singleTherapist?.expired_date?.split(" ")[0]
                        }
                      />

                      {validationErrors.errors?.expired_date && (
                        <p className="text-ligh text-[#D81222] mt-2">
                          {validationErrors.errors.expired_date[0]}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="credentialId">Credential ID</label>

                      <Input
                        variant="bordered"
                        name="credential_id"
                        defaultValue={singleTherapist.credential_id}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex flex-col justify-center gap-x-12 gap-y-4 font-medium md:flex-row">
                  <button className="hover:bg-primary hover:text-white transition-all py-1.5 rounded-lg border-2 px-12">
                    {isProcessing ? "Updating..." : "Update"}
                  </button>
                </div>
              </form>
            </section>
          </div>
        )}
      </main>
    </>
  );
}
