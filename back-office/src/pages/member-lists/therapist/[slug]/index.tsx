import Link from "next/link";
import { JSX, useState, useMemo } from "react";
import { FaChevronLeft, FaInfoCircle } from "react-icons/fa";
import AssetLogo from "@/assets/dev/company-logo.png";
import { Button, Image, Input } from "@nextui-org/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import countryList from "react-select-country-list";

export default function DetailMember(): JSX.Element {
  const [startDate, setStartDate] = useState(new Date());
  const options = useMemo(() => countryList().getData(), []);
  const [value, setValue] = useState("");

  const changeHandler = (value: any) => {
    setValue(value);
  };
  return (
    <main>
      <header className="mb-8 md:mb-12">
        <Link href={"/new-members"} className="flex gap-x-4 items-center w-max">
          <div className="bg-secondary p-2 rounded-md">
            <FaChevronLeft className="w-4 h-4 md:w-8 md:h-8 text-white" />
          </div>
          <span className="text-base md:text-2xl lg:text-3xl">
            Back to Member Lists
          </span>
        </Link>
      </header>

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
              <Image
                src={AssetLogo.src}
                alt="Operator Logo"
                className="object-cover"
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

              <Input variant="bordered" defaultValue="Therapist A" />
            </div>

            <div className="space-y-2">
              <label htmlFor="">Passport/Fin No.</label>

              <Input variant="bordered" defaultValue="12345678" />
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

              <Input variant="bordered" defaultValue="Female" />
            </div>

            <div className="space-y-2">
              <label htmlFor="">Contact No.</label>

              <Input variant="bordered" defaultValue="12345678" />
            </div>

            <div className="space-y-2">
              <label htmlFor="">Nationality</label>

              <select
                className="z-20 w-full border-3 pl-2 py-1.5 rounded-md"
                onChange={changeHandler}
              >
                {options.map((country) => (
                  <option value="" key={country.label}>
                    {country.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="md:w-1/2 space-y-4 md:space-y-8">
            <div>
              <h2 className="md:text-lg lg:tex-xl font-bold mb-4 md:mb-8">
                Professional Certificate
              </h2>

              <label htmlFor="">Certificate Picture</label>

              <div>
                <Image
                  src={AssetLogo.src}
                  alt="Operator Logo"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="">Certificate Name</label>

              <Input
                variant="bordered"
                defaultValue="CIBTAC Level 3 Diploma in Spa Therapy"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="">Issuing Organization</label>

              <Input variant="bordered" defaultValue="CIBTAC" />
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
              <label htmlFor="">Sex</label>

              <Input variant="bordered" defaultValue="Female" />
            </div>

            <div className="space-y-2">
              <label htmlFor="">Contact No.</label>

              <Input variant="bordered" defaultValue="12345678" />
            </div>

            <div className="space-y-2">
              <label htmlFor="">Credental ID</label>

              <Input variant="bordered" defaultValue="CIBTAC" />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="w-max mx-auto">
          <div className="flex flex-col md:flex-row gap-x-10">
            <Button color="danger" size="lg">
              Reject
            </Button>

            <Button color="secondary" size="lg">
              Approve
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
