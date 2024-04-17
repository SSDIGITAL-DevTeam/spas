import { JSX, useState, useMemo } from "react";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Input,
  Button,
} from "@nextui-org/react";
import Head from "next/head";
import { FaInfoCircle } from "react-icons/fa";
import { PiUploadFill } from "react-icons/pi";

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Select from "react-select";
import countryList from "react-select-country-list";

export default function JoinUs(): JSX.Element {
  const [startDate, setStartDate] = useState(new Date());

  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value: any) => {
    setValue(value);
  };

  const inputStyle = {
    width: "100%",
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
        <section className="">
          <div className="container p-4 md:p-8">
            <div className="flex w-full flex-col">
              <Tabs
                color="primary"
                aria-label="Tabs colors"
                className="mx-auto"
              >
                <Tab key="operator" title="Operators" className="text-xl">
                  <Card className="text-base md:w-1/2 mx-auto py-8">
                    <CardHeader className="text-xl md:text-2xl font-bold text-center flex items-center justify-center">
                      Join as Spa Operator
                    </CardHeader>
                    <CardBody className="space-y-4">
                      <div className="space-y-2">
                        <Input
                          className="flex "
                          type="file"
                          required
                          endContent={<PiUploadFill />}
                          size="lg"
                        />
                        <div className="flex items-center gap-x-4">
                          <FaInfoCircle className="text-[#8D98AA]" />
                          <p className="text-xs">
                            The image file must be at least 2 MB in size, with
                            equal dimensions (e.g., square or a 1:1 aspect
                            ratio)
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="" className="md:text-base text-sm">
                          Company Name
                        </label>
                        <Input
                          variant={"bordered"}
                          color="secondary"
                          size="sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="" className="md:text-base text-sm">
                          UEN NO
                        </label>
                        <Input
                          variant={"bordered"}
                          color="secondary"
                          size="sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="" className="md:text-base text-sm">
                          Brand Name
                        </label>
                        <Input
                          variant={"bordered"}
                          color="secondary"
                          size="sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="">Address</label>
                        <Input
                          variant={"bordered"}
                          color="secondary"
                          size="sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="">Contact No.</label>
                        <PhoneInput
                          inputProps={{ style: inputStyle }}
                          style={{}}
                          className="border-2 border-[#E4E4E7] rounded-md"
                          defaultCountry="sg"
                          // onChange={(phone: string) => setPhone(phone)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="">Contact Person Name</label>
                        <Input
                          variant={"bordered"}
                          color="secondary"
                          size="sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="">Contact Person No.</label>
                        <PhoneInput
                          inputProps={{ style: inputStyle }}
                          style={{}}
                          className="border-2 border-[#E4E4E7] rounded-md"
                          defaultCountry="sg"

                          // onChange={(phone: string) => setPhone(phone)}
                        />
                      </div>
                    </CardBody>
                    <CardFooter>
                      <Button color="primary" fullWidth size="md">
                        Submit Now
                      </Button>
                    </CardFooter>
                  </Card>
                </Tab>
                <Tab key="therapist" title="Therapist" className="text-xl">
                  <Card className="text-base py-8">
                    <CardHeader className="text-xl md:text-2xl font-bold text-center flex items-center justify-center">
                      Join as Spa Therapist
                    </CardHeader>
                    <div className="flex flex-col md:flex-row p-4 md:p-8 gap-x-10 gap-y-4">
                      <div className="border-2 border-[#E4E4E7] p-2 md:p-8">
                        <CardBody className="space-y-4">
                          <h2 className="font-bold text-lg md:text-xl">
                            Personal Information
                          </h2>
                          <div className="space-y-2">
                            <label htmlFor="">Profile Picture</label>
                            <Input type="file" required />
                            <div className="flex items-center gap-x-4">
                              <FaInfoCircle className="text-[#8D98AA]" />
                              <p className="text-xs">
                                The image file must be at least 2 MB in size,
                                with equal dimensions (e.g., square or a 1:1
                                aspect ratio)
                              </p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="" className="md:text-base text-sm">
                              Full Name
                            </label>
                            <Input
                              variant={"bordered"}
                              color="secondary"
                              size="sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="" className="md:text-base text-sm">
                              Passport/Fin No.
                            </label>
                            <Input
                              variant={"bordered"}
                              color="secondary"
                              size="sm"
                            />
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="" className="md:text-base text-sm">
                              Date of Birth
                            </label>
                            <div className="border-2 border-[#E4E4E7] py-1 rounded-md">
                              <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date!)}
                              />
                            </div>
                          </div>
                          <div className="flex flex-col space-y-2">
                            <label htmlFor="" className="md:text-base text-sm">
                              Sex
                            </label>
                            <select
                              name=""
                              id=""
                              className="border-2 border-[#E4E4E7] py-1 rounded-md"
                            >
                              <option value="" disabled>
                                Select an Option
                              </option>
                              <option value="">Male</option>
                              <option value="">Female</option>
                            </select>
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="" className="md:text-base text-sm">
                              Contact No.
                            </label>
                            <PhoneInput
                              inputProps={{ style: inputStyle }}
                              style={{}}
                              className="border-2 border-[#E4E4E7] rounded-md"
                              defaultCountry="sg"
                              // onChange={(phone: string) => setPhone(phone)}
                            />
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="" className="md:text-base text-sm">
                              Nationality
                            </label>
                            <Select
                              className="z-20"
                              // options={options as CountryData}
                              value={value}
                              onChange={changeHandler}
                            />
                          </div>
                        </CardBody>
                      </div>

                      <div className="border-2 border-[#E4E4E7] p-2 md:p-8">
                        <CardBody className="space-y-4">
                          <h2 className="font-bold text-lg md:text-xl ">
                            Professional Certificate
                          </h2>
                          <div className="space-y-2">
                            <label htmlFor="" className="md:text-base text-sm">
                              Profile Picture
                            </label>
                            <Input type="file" required />
                            <div className="flex items-center gap-x-4">
                              <FaInfoCircle className="text-[#8D98AA]" />
                              <p className="text-xs">
                                The image file must be at least 2 MB in size,
                                with equal dimensions (e.g., square or a 1:1
                                aspect ratio)
                              </p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="" className="md:text-base text-sm">
                              Name
                            </label>
                            <Input
                              variant={"bordered"}
                              color="secondary"
                              size="sm"
                            />
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="" className="md:text-base text-sm">
                              Issuing Organization
                            </label>
                            <Input
                              variant={"bordered"}
                              color="secondary"
                              size="sm"
                            />
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="" className="md:text-base text-sm">
                              Issue Date
                            </label>
                            <div className="border-2 border-[#E4E4E7] py-1 rounded-md">
                              <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date!)}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="" className="md:text-base text-sm">
                              Expiration Date
                            </label>
                            <div className="border-2 border-[#E4E4E7] py-1 rounded-md">
                              <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date!)}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="" className="md:text-base text-sm">
                              {" "}
                              Credential ID
                            </label>
                            <Input
                              variant={"bordered"}
                              color="secondary"
                              size="sm"
                            />
                          </div>
                        </CardBody>
                      </div>
                    </div>
                    <CardFooter>
                      <Button
                        color="primary"
                        size="md"
                        className="md:w-1/2 mx-auto"
                      >
                        Submit Now
                      </Button>
                    </CardFooter>
                  </Card>
                </Tab>
              </Tabs>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
