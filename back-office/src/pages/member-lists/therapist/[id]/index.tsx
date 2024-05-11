import Link from "next/link";
import { JSX, useState, useMemo, useEffect } from "react";
import { FaChevronLeft, FaInfoCircle } from "react-icons/fa";
import AssetLogo from "@/assets/dev/company-logo.png";
import { Button, Image, Input } from "@nextui-org/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import countryList from "react-select-country-list";
import { Therapist } from "@/@types";
import Head from "next/head";
import TherapistModule from "@/modules/TherapistModule";
import { useRouter } from "next/router";
import Loading from "@/components/partials/Loading";

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

  return (
    <>
      <Head>
        <title>SPAS | {singleTherapist.name}</title>
      </Head>
      <main>
        <header className="mb-8 md:mb-12">
          <Link
            href={"/new-members"}
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
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${singleTherapist.cover?.url}`}
                      alt={singleTherapist.name}
                      className="object-cover w-80"
                    />
                  </div>

                  <div className="space-y-2">
                    <input type="file" className="" />
                    <div className="flex items-center gap-x-4">
                      <FaInfoCircle className="text-[#8D98AA]" />
                      <p className="text-xs md:w-3/4">
                        The image file must be at least 2 MB in size, with equal
                        dimensions (e.g., square or a 1:1 aspect ratio)
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="">Full Name</label>

                    <Input
                      variant="bordered"
                      defaultValue={singleTherapist.name}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="">Passport/Fin No.</label>

                    <Input
                      variant="bordered"
                      defaultValue={singleTherapist.passport_finno}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="">Email</label>

                    <div className="border-2 p-2">
                      <span className="pl-2">
                        {singleTherapist.user?.email}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="">Date of Birth</label>

                    <div className="border-2 border-[#E4E4E7] py-1 rounded-md">
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date!)}
                        className="pl-4"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="">Sex</label>

                    <Input
                      variant="bordered"
                      defaultValue={singleTherapist.sex}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="">Contact No.</label>

                    <Input
                      variant="bordered"
                      defaultValue={singleTherapist.contact_no}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="">Nationality</label>

                    <select
                      className="z-20 w-full border-3 pl-2 py-1.5 rounded-md"
                      onChange={changeHandler}
                    >
                      {options.map((country) => (
                        <option value={country.value} key={country.label}>
                          {country.label}
                        </option>
                      ))}
                    </select>
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
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${singleTherapist.professional_certs}`}
                        alt={singleTherapist.name}
                        className="object-cover w-80"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="">Certificate Name</label>

                    <Input
                      variant="bordered"
                      defaultValue={singleTherapist.name_cert}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="">Issuing Organization</label>

                    <Input
                      variant="bordered"
                      defaultValue={singleTherapist.issuing_organization}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="">Issue Date</label>

                    <div className="border-2 border-[#E4E4E7] py-1 rounded-md">
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date!)}
                        className="pl-4"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="">Expiration Date</label>

                    <div className="border-2 border-[#E4E4E7] py-1 rounded-md">
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date!)}
                        className="pl-4"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="credentialId">Credential ID</label>

                    <Input
                      variant="bordered"
                      defaultValue={singleTherapist.credential_id}
                    />
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="w-max mx-auto">
                <div className="flex flex-col md:flex-row gap-x-10">
                  <Button color="danger" size="lg">
                    Update
                  </Button>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>
    </>
  );
}
