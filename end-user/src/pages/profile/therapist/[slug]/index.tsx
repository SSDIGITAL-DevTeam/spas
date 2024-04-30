import Head from "next/head";
import moment from "moment";
import { FormEvent, JSX, useEffect, useMemo, useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Image,
  Tab,
  Tabs,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Card,
  CardBody,
  Input,
  // DatePicker
} from "@nextui-org/react";
// import { DatePicker } from "@nextui-org/react";
import { LuMapPin, LuPhone, LuUser2 } from "react-icons/lu";
import { FaRegAddressCard } from "react-icons/fa6";
import { CgCalendarDates } from "react-icons/cg";
import AssetGender from "@/assets/therapist-assets/gender.svg";
import AssetCerfiticate from "@/assets/therapist-assets/certificate.png";
import { PiGlobeHemisphereEastBold } from "react-icons/pi";
import { IoReload } from "react-icons/io5";

import axios from "axios";
import { useRouter } from "next/router";
import { EmployeHistory, Therapist } from "@/@types";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import AssetProfile from "@/assets/dev/profile.png";
import countryList from "react-select-country-list";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TherapistProfile(): JSX.Element {
  // state
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isOpenModalEdit, setisOpenModalEdit] = useState<boolean>(false);
  const [stepNumber, setStepNumber] = useState<number>(1);
  const [profile, setProfile] = useState<Therapist>();
  const [employeHistory, setEmployeHistory] = useState<[]>([]);
  const [id, setId] = useState<string>("");
  const [isAddEmployeHistory, setIsAddEmployeHistory] =
    useState<boolean>(false);

  // states of date picker
  const [startBirthOfDate, setStarBirthOfDate] = useState(new Date());
  const [startExiprationDate, setStartExpirationDate] = useState(new Date());
  const [startOfIssuingDate, setStartOfIssuingDate] = useState(new Date());
  const [startEmployeeDate, setStartEmployeeDate] = useState(new Date());
  const [endEmployeeDate, setEndEmployeeDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());

  // states of input data
  const [address, setAddress] = useState<string>("");
  const [addressNearerstMRT, setAddressNearestMRT] = useState<string>("");
  const [contactNo, setContactNo] = useState<string>("");
  const [credentialId, setCredentialId] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [dateOfIssue, setDateOfIssue] = useState<string>("");
  const [expiredDate, setExpiredDate] = useState<string>("");
  const [issuingOrganization, setIssuingOrganization] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [nameCert, setNameCert] = useState<string>("");
  const [nationality, setNationality] = useState<string>("");
  const [passportFinno, setPassportFinno] = useState<string>("");
  const [sex, setSex] = useState<string>("");

  const [jobTitle, setJobTitle] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [startJob, setStartJob] = useState<string>("");
  const [endJob, setEndJob] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");

  const router = useRouter();
  const slug = router.query.slug;

  const changeHandler = (value: any) => {
    setNationality(value);
  };

  const options = useMemo(() => countryList().getData(), []);
  const inputStyle = {
    width: "100%",
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-out`,
        undefined,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              process.env.NEXT_PUBLIC_ACCESS_TOKEN!
            )}`,
          },
        }
      );

      localStorage.removeItem(`${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`);

      router.push("/auth/sign-in");
    } catch (error) {
      console.log(error);
    }
  };

  const getProfile = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/end-user/therapist/therapists/${slug}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              process.env.NEXT_PUBLIC_ACCESS_TOKEN!
            )}`,
          },
        }
      );
      setName(response.data.data.name);
      setAddress(response.data.data.address);
      setAddressNearestMRT(response.data.data.address_nearest_mrt);
      setContactNo(response.data.data.contact_no);
      setCredentialId(response.data.data.credential_id);
      setDateOfBirth(response.data.data.date_of_birth);
      setDateOfIssue(response.data.data.date_of_issue);
      setExpiredDate(response.data.data.expired_date);
      setIssuingOrganization(response.data.data.issuing_organization);
      setNameCert(response.data.data.name_cert);
      setNationality(response.data.data.nationality);
      setPassportFinno(response.data.data.passport_finno);
      setSex(response.data.data.sex);

      setId(response.data.data.id);
      setProfile(response.data.data);
      setEmployeHistory(response.data.data.employHistorys);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem(
      process.env.NEXT_PUBLIC_ACCESS_TOKEN!
    );
    if (!isLoggedIn) {
      router.push("/auth/sign-in");
    }
  }, []);

  useEffect(() => {
    getProfile();

    // const interval = setInterval(() => {
    //   getProfile();
    // }, 3000);

    // return () => clearInterval(interval);
  }, [slug]);

  const handleEditData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const form: HTMLFormElement = e.currentTarget;

    try {
      const formData: FormData = new FormData();

      formData.append("name", name);
      formData.append("address", address);
      formData.append("contact_no", contactNo);
      formData.append("credential_id", credentialId);
      formData.append("date_of_birth", dateOfBirth);
      formData.append("date_of_issue", dateOfIssue);
      formData.append("expired_date", expiredDate);
      formData.append("issuing_organization", issuingOrganization);
      formData.append("name_cert", nameCert);
      formData.append("nationality", nationality);
      formData.append("passport_finno", passportFinno);
      formData.append("sex", sex);
      formData.append("address_nearest_mrt", addressNearerstMRT);
      formData.append("job_title", jobTitle);
      formData.append("company_name", companyName);
      formData.append("start_date", startJob);
      formData.append("end_date", endJob);
      formData.append("location", location);
      formData.append("description", jobDescription);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/end-user/therapist/therapists/${id}?_method=PUT`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              process.env.NEXT_PUBLIC_ACCESS_TOKEN!
            )}`,
          },
        }
      );

      toast.success("Profile updated", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      router.replace(`/profile/therapist/${res.data.data.slug}`);
    } catch (error) {
      console.log(error);
    }
  };

  // const openModalEdit = (id:string) => {
  //   setisOpenModalEdit(true)
  // }

  const handleEditDataEmployeHistory = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const form: HTMLFormElement = e.currentTarget;
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/end-user/therapist/carrers/${id}?_method=PUT`,
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              process.env.NEXT_PUBLIC_ACCESS_TOKEN!
            )}`,
          },
        }
      );

      toast.success("Employe History updated", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      router.replace(`/profile/therapist/${res.data.data.slug}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddEmployeHistory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form: HTMLFormElement = e.currentTarget;
    const formReset = e.target as HTMLFormElement;
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/end-user/therapist/carrers`,
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              process.env.NEXT_PUBLIC_ACCESS_TOKEN!
            )}`,
          },
        }
      );
      toast.success("Employe History updated", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      getProfile();
      formReset.reset();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(profile);
  return (
    <>
      <Head>
        <title>SPAS | Elevate your Spa & Wellness Business with Us!</title>
        <link rel="icon" href="/asset-logo.png" />
        <meta name="author" content="SPAS" />

        <meta
          name="title"
          content="SPAS | Elevate your Spa & Wellness Business with Us!"
        />

        <meta
          name="description"
          content="Promote and protect business entities, practitioners, stakeholders, and consumers of the Beauty, Spa, and Wellness industry in Singapore."
        />

        <meta name="keywords" content="spa, services" />

        <meta name="robots" content="index, follow" />

        <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL} />

        <meta
          property="og:title"
          content="SPAS | Elevate your Spa & Wellness Business with Us!"
        />

        <meta
          property="og:description"
          content="Promote and protect business entities, practitioners, stakeholders, and consumers of the Beauty, Spa, and Wellness industry in Singapore."
        />

        <meta property="og:type" content="website" />

        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/asset-logo.png`}
        />
      </Head>

      <main className="pt-24">
        <section className="pb-10 md:pb-20">
          <div className="container p-4 md:p-8">
            <div className=" space-y-8">
              <div className="relative md:w-max mx-auto mb-8 space-y-2">
                <div className="space-y-4 flex flex-col items-center">
                  {profile?.cover?.url == undefined ? (
                    <Image
                      src={AssetProfile.src}
                      alt="Operators"
                      className="object-cover aspect-square md:w-40 md:h-40"
                      removeWrapper
                      radius="none"
                    />
                  ) : (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${profile?.cover?.url}`}
                      alt="Operators"
                      className="object-cover aspect-square md:w-40 md:h-40"
                      removeWrapper
                      radius="full"
                    />
                  )}

                  <div className="text-center">
                    <h2 className="font-bold text-lg md:text-2xl ">
                      {profile?.name}
                    </h2>
                  </div>
                </div>

                <div className="md:absolute md:-right-64 top-0 flex flex-col gap-y-2 text-[#A3A3A3] text-sm md:text-base text-center">
                  <Button
                    onPress={onOpen}
                    className="bg-white border-2 border-secondary text-secondary rounded-md w-max mx-auto md:w-full hover:bg-secondary hover:text-white"
                    radius="none"
                    size="lg"
                  >
                    Edit Profile
                  </Button>
                  <span>Last updated on: </span>
                  <span>Tuesday, Jan 22 2024</span>
                </div>
              </div>

              <Tabs className="flex items-center justify-center">
                <Tab title="Personal Information" key="personal" className="">
                  <div className="w-3/4 mx-auto border p-4 md:p-8">
                    <div className="md:columns-2 md:gap-x-40 space-y-4">
                      <div className="flex items-center gap-x-4">
                        <div>
                          <LuUser2 className="text-secondary w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <div className="flex flex-col gap-y-1">
                          <span className="text-[#A3A3A3] text-sm md:text-base">
                            Name
                          </span>
                          <span className="text-secondary text-lg md:text-xl">
                            {profile?.name}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-x-4">
                        <div>
                          <FaRegAddressCard className="text-secondary w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <div className="flex flex-col gap-y-1">
                          <span className="text-[#A3A3A3] text-sm md:text-base">
                            Passport / Fin No.
                          </span>
                          <span className="text-secondary text-lg md:text-xl">
                            {profile?.passport_finno}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-x-4">
                        <div>
                          <CgCalendarDates className="text-secondary w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <div className="flex flex-col gap-y-1">
                          <span className="text-[#A3A3A3] text-sm md:text-base">
                            Date of Birth
                          </span>
                          <span className="text-secondary text-lg md:text-xl">
                            {profile?.date_of_birth}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-x-4">
                        <div>
                          <Image
                            src={AssetGender.src}
                            className="text-secondary w-6 h-6 md:w-8 md:h-8"
                            removeWrapper
                          />
                        </div>
                        <div className="flex flex-col gap-y-1">
                          <span className="text-[#A3A3A3] text-sm md:text-base">
                            Sex
                          </span>
                          <span className="text-secondary text-lg md:text-xl">
                            {profile?.sex}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-x-4">
                        <div>
                          <LuPhone className="text-secondary w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <div className="flex flex-col gap-y-1">
                          <span className="text-[#A3A3A3] text-sm md:text-base">
                            Contact No
                          </span>
                          <span className="text-secondary text-lg md:text-xl">
                            {profile?.contact_no}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-x-4">
                        <div>
                          <PiGlobeHemisphereEastBold className="text-secondary w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <div className="flex flex-col gap-y-1">
                          <span className="text-[#A3A3A3] text-sm md:text-base">
                            Nationality
                          </span>
                          <span className="text-secondary text-lg md:text-xl">
                            {profile?.nationality}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-x-4">
                        <div>
                          <LuMapPin className="text-secondary w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <div className="flex flex-col gap-y-1">
                          <span className="text-[#A3A3A3] text-sm md:text-base">
                            Address
                          </span>
                          <span className="text-secondary text-lg md:text-xl">
                            {profile?.address}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-x-4">
                        <div>
                          <LuMapPin className="text-secondary w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <div className="flex flex-col gap-y-1">
                          <span className="text-[#A3A3A3] text-sm md:text-base">
                            Address nearest MRT
                          </span>
                          <span className="text-secondary text-lg md:text-xl">
                            {profile?.address_nearest_mrt}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>

                <Tab title="Career Information" key="career">
                  <div className="space-y-4 md:space-y-8">
                    <div className="border p-4 md:p-8 md:w-3/4 mx-auto space-y-4 md:space-y-8">
                      <h3 className="text-[#A3A3A3] md:text-lg font-bold ">
                        Employment History
                      </h3>

                      {employeHistory.map((history: EmployeHistory) => (
                        <div
                          key={history.id}
                          className="flex flex-col gap-y-2 cursor-pointer"
                        >
                          <h3 className="text-black text-lg md:text-xl font-bold cursor-pointer">
                            {history.job_title}
                          </h3>
                          <span>{history.company_name}</span>
                          <span>
                            {moment(history.start_date).format("MMMM YYYY")} -{" "}
                            {moment(history.end_date).format("MMMM YYYY")}
                          </span>
                          <span>{history.location}</span>
                          <p>{history.description}</p>
                        </div>
                      ))}

                      <div className="mx-auto w-max">
                        <Button
                          onClick={() =>
                            setIsAddEmployeHistory(!isAddEmployeHistory)
                          }
                          radius="none"
                          className="bg-secondary text-white rounded-md"
                        >
                          Add Employment History
                        </Button>
                      </div>

                      {isAddEmployeHistory && (
                        <div>
                          <form action="" onSubmit={handleAddEmployeHistory}>
                            <div className="grid md:grid-cols-2 lg:gap-x-8 gap-y-4 gap-x-4 mb-4 md:mb-8">
                              <div className="md:space-y-2">
                                <label className="md:text-base text-sm">
                                  Job Title
                                </label>
                                <Input
                                  variant={"bordered"}
                                  color="secondary"
                                  size="md"
                                  radius="sm"
                                  name="job_title"
                                  // onChange={(e) => setJobTitle(e.target.value)}
                                />
                              </div>

                              <div className="md:space-y-2">
                                <label className="md:text-base text-sm">
                                  Start Date
                                </label>
                                <div className="border-2 border-[#E4E4E7] py-1 rounded-md pl-2">
                                  <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date!)}
                                    dateFormat={"yyyy/MM/dd"}
                                    value={profile?.date_of_birth}
                                    name="start_date"
                                  />
                                </div>
                              </div>

                              <div className="md:space-y-2">
                                <label className="md:text-base text-sm">
                                  Company Name
                                </label>
                                <Input
                                  variant={"bordered"}
                                  color="secondary"
                                  size="md"
                                  radius="sm"
                                  name="company_name"
                                  // onChange={(e) => setJobTitle(e.target.value)}
                                />
                              </div>

                              <div className="md:space-y-2">
                                <label className="md:text-base text-sm">
                                  End Date
                                </label>
                                <div className="border-2 border-[#E4E4E7] py-1 rounded-md pl-2">
                                  <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date!)}
                                    dateFormat={"yyyy/MM/dd"}
                                    value={profile?.date_of_birth}
                                    name="end_date"
                                  />
                                </div>
                              </div>

                              <div className="md:space-y-2">
                                <label className="md:text-base text-sm">
                                  Description
                                </label>
                                <Input
                                  variant={"bordered"}
                                  color="secondary"
                                  size="md"
                                  radius="sm"
                                  name="description"
                                  // onChange={(e) => setJobTitle(e.target.value)}
                                />
                              </div>

                              <div className="md:space-y-2">
                                <label className="md:text-base text-sm">
                                  Location
                                </label>
                                <Input
                                  variant={"bordered"}
                                  color="secondary"
                                  size="md"
                                  radius="sm"
                                  name="location"
                                  // onChange={(e) => setJobTitle(e.target.value)}
                                />
                              </div>
                            </div>

                            <div className="mx-auto w-max">
                              <Button
                                radius="none"
                                type="submit"
                                className="bg-secondary text-white rounded-md"
                              >
                                Submit
                              </Button>
                            </div>
                          </form>
                        </div>
                      )}
                    </div>

                    <div className="border p-4 md:p-8 md:w-3/4 mx-auto ">
                      <h3 className="text-[#A3A3A3] md:text-lg font-bold mb-4 md:mb-8">
                        Professional Certifications
                      </h3>

                      <div className="flex flex-col md:flex-row gap-x-8 gap-y-2">
                        <div className="aspect-square">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${profile?.professional_certs}`}
                            alt="Therapist Certificate SPAS"
                            className="w-max lg:w-40 lg:h-40 mx-auto"
                            removeWrapper
                            radius="none"
                          />
                        </div>
                        <div className="flex flex-col gap-y-2">
                          <h3 className="text-black md:text-lg font-bold">
                            {profile?.name_cert}
                          </h3>
                          <span>{profile?.issuing_organization}</span>
                          <span>Issued Nov 2021 - Expires Mar 2025</span>
                          <span>Credential ID: {profile?.credential_id}</span>
                          {/* <div className="w-max">
                            <Button color="secondary" endContent={<IoReload />}>
                              Show credential
                            </Button>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
              </Tabs>

              <div className="md:w-1/4 mx-auto">
                <Button
                  onClick={handleLogout}
                  className="bg-white text-secondary border-2 border-secondary rounded-md hover:bg-secondary hover:text-white w-full"
                  radius="none"
                  size="lg"
                >
                  Log Out
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Modal Edit Profile Information */}
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          size="2xl"
          hideCloseButton
          className="md:h-11/12"
        >
          <ModalContent>
            {(onClose) => (
              <form onSubmit={handleEditData}>
                <ModalHeader className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <h3>Edit Profile</h3>
                  </div>
                </ModalHeader>
                <ModalBody>
                  <div className="flex w-full flex-col">
                    <Tabs aria-label="Options" className="mx-auto">
                      <Tab key="personal" title="Personal Information">
                        <Card className="lg:h-[23rem]">
                          <CardBody className="">
                            <div className="grid md:grid-cols-2 md:gap-x-4 gap-y-4">
                              <div className="md:space-y-2">
                                <label className="md:text-base text-sm">
                                  Profile Picture
                                </label>
                                <input type="file" />
                              </div>

                              <div className="md:space-y-2">
                                <label className="md:text-base text-sm">
                                  Date of Birth
                                </label>
                                <div className="border-2 border-[#E4E4E7] py-1 rounded-md pl-2">
                                  {/* <DatePicker
                                    label="Birth date"
                                    // defaultValue={profile?.date_of_birth}
                                    // onChange={(date) => setDateOfBirth()}
                                    name="date_of_birth"
                                    className="max-w-[284px]"
                                  /> */}
                                  <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date!)}
                                    dateFormat={"yyyy/MM/dd"}
                                    value={profile?.date_of_birth}
                                    name="date_of_birth"
                                  />
                                </div>
                              </div>

                              <div className="md:space-y-2">
                                <label className="md:text-base text-sm">
                                  Full Name
                                </label>
                                <Input
                                  variant={"bordered"}
                                  color="secondary"
                                  size="md"
                                  radius="sm"
                                  defaultValue={name}
                                  name="name"
                                  onChange={(e) => setName(e.target.value)}
                                />
                              </div>

                              <div className="flex flex-col space-y-2">
                                <label className="md:text-base text-sm">
                                  Sex
                                </label>
                                <select
                                  name="sex"
                                  defaultValue={sex}
                                  onChange={(e) => setSex(e.target.value)}
                                  className="border-2 border-[#E4E4E7] py-1 rounded-md"
                                >
                                  <option value="" disabled>
                                    Select an Option
                                  </option>
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                </select>
                              </div>

                              <div className="space-y-2">
                                <label className="md:text-base text-sm">
                                  Contact No.
                                </label>
                                <PhoneInput
                                  inputProps={{ style: inputStyle }}
                                  className="border-2 border-[#E4E4E7] rounded-md"
                                  defaultCountry="sg"
                                  value={contactNo}
                                  onChange={(phone) => setContactNo(phone)}
                                  name="contact_no"
                                />
                              </div>

                              <div className="md:space-y-2">
                                <label className="md:text-base text-sm">
                                  Passport / Fin No. *
                                </label>
                                <Input
                                  variant={"bordered"}
                                  color="secondary"
                                  size="md"
                                  radius="sm"
                                  name="passport_finno"
                                  onChange={(e) =>
                                    setPassportFinno(e.target.value)
                                  }
                                  defaultValue={passportFinno}
                                />
                              </div>

                              <div className="flex flex-col space-y-2">
                                <label className="md:text-base text-sm">
                                  Nationality
                                </label>
                                <select
                                  className="z-20 w-full border-3 pl-2 py-1.5 rounded-md"
                                  onChange={(e) =>
                                    setNationality(e.target.value)
                                  }
                                  defaultValue={nationality}
                                  name="nationality"
                                >
                                  {options.map((country) => (
                                    <option
                                      key={country.label}
                                      value={country.label}
                                    >
                                      {country.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </Tab>

                      <Tab key="certificate" title="Certificate Information">
                        <Card className="lg:min-h-[23rem]">
                          <CardBody>
                            <div className="grid md:grid-cols-2 md:gap-x-4 gap-y-4">
                              <div className="md:space-y-2">
                                <label className="md:text-base text-sm">
                                  Add Certificate
                                </label>
                                <input type="file" name="professional_certs" />
                              </div>

                              <div className="md:space-y-2">
                                <label className="md:text-base text-sm">
                                  Issuing Date
                                </label>
                                <div className="border-2 border-[#E4E4E7] py-1 rounded-md pl-2">
                                  <DatePicker
                                    selected={startOfIssuingDate}
                                    onChange={(date) =>
                                      setStartOfIssuingDate(date!)
                                    }
                                    dateFormat={"yyyy/MM/dd"}
                                    value={profile?.date_of_issue}
                                    name="date_of_issue"
                                  />
                                </div>
                              </div>

                              <div className="md:space-y-2">
                                <label className="md:text-base text-sm">
                                  Name
                                </label>
                                <Input
                                  variant={"bordered"}
                                  color="secondary"
                                  size="md"
                                  radius="sm"
                                  defaultValue={profile?.name_cert}
                                  name="name_cert"
                                  onChange={(e) => setNameCert(e.target.value)}
                                />
                              </div>

                              <div className="md:space-y-2">
                                <label className="md:text-base text-sm">
                                  Expiration Date
                                </label>
                                <div className="border-2 border-[#E4E4E7] py-1 rounded-md pl-2">
                                  <DatePicker
                                    selected={startExiprationDate}
                                    onChange={(date) =>
                                      setStartExpirationDate(date!)
                                    }
                                    dateFormat={"yyyy/MM/dd"}
                                    value={profile?.expired_date}
                                    name="expired_date"
                                  />
                                </div>
                              </div>

                              <div className="md:space-y-2">
                                <label className="md:text-base text-sm">
                                  Issuing Organization
                                </label>
                                <Input
                                  variant={"bordered"}
                                  color="secondary"
                                  size="md"
                                  radius="sm"
                                  defaultValue={issuingOrganization}
                                  onChange={(e) =>
                                    setIssuingOrganization(e.target.value)
                                  }
                                  name="issuing_organization"
                                />
                              </div>

                              <div className="md:space-y-2">
                                <label className="md:text-base text-sm">
                                  Credential ID
                                </label>
                                <Input
                                  variant={"bordered"}
                                  color="secondary"
                                  size="md"
                                  radius="sm"
                                  defaultValue={credentialId}
                                  onChange={(e) =>
                                    setCredentialId(e.target.value)
                                  }
                                  name="credential_id"
                                />
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </Tab>
                    </Tabs>
                  </div>{" "}
                </ModalBody>
                <ModalFooter>
                  <Button variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button color="primary" type="submit" onPress={onClose}>
                    Save Changes
                  </Button>
                  {/* <Button color="primary" onPress={onClose}>
                    Next
                  </Button> */}
                </ModalFooter>
              </form>
            )}
          </ModalContent>
        </Modal>

        {/* Modal Edit employe history */}
        <Modal
          isOpen={isOpenModalEdit}
          onOpenChange={setisOpenModalEdit}
          size="2xl"
          hideCloseButton
          className="md:h-11/12"
        >
          <ModalContent>
            {(onClose) => (
              <form onSubmit={handleEditDataEmployeHistory}>
                <ModalHeader className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <h3>Edit Employe History</h3>
                  </div>
                </ModalHeader>
                <ModalBody>
                  <div className="grid md:grid-cols-2 lg:gap-x-8 gap-y-4 gap-x-4 mb-4 md:mb-8">
                    <div className="md:space-y-2">
                      <label className="md:text-base text-sm">Job Title</label>
                      <Input
                        variant={"bordered"}
                        color="secondary"
                        size="md"
                        radius="sm"
                        name="job_title"
                      />
                    </div>

                    <div className="md:space-y-2">
                      <label className="md:text-base text-sm">Start Date</label>
                      <div className="border-2 border-[#E4E4E7] py-1 rounded-md pl-2">
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date!)}
                          dateFormat={"yyyy/MM/dd"}
                          value={profile?.date_of_birth}
                          name="start_date"
                        />
                      </div>
                    </div>

                    <div className="md:space-y-2">
                      <label className="md:text-base text-sm">
                        Company Name
                      </label>
                      <Input
                        variant={"bordered"}
                        color="secondary"
                        size="md"
                        radius="sm"
                        name="company_name"
                      />
                    </div>

                    <div className="md:space-y-2">
                      <label className="md:text-base text-sm">End Date</label>
                      <div className="border-2 border-[#E4E4E7] py-1 rounded-md pl-2">
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date!)}
                          dateFormat={"yyyy/MM/dd"}
                          value={profile?.date_of_birth}
                          name="end_date"
                        />
                      </div>
                    </div>

                    <div className="md:space-y-2">
                      <label className="md:text-base text-sm">
                        Description
                      </label>
                      <Input
                        variant={"bordered"}
                        color="secondary"
                        size="md"
                        radius="sm"
                        name="description"
                        // onChange={(e) => setJobTitle(e.target.value)}
                      />
                    </div>

                    <div className="md:space-y-2">
                      <label className="md:text-base text-sm">Location</label>
                      <Input
                        variant={"bordered"}
                        color="secondary"
                        size="md"
                        radius="sm"
                        name="location"
                        // onChange={(e) => setJobTitle(e.target.value)}
                      />
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button color="primary" type="submit" onPress={onClose}>
                    Save Changes
                  </Button>
                  {/* <Button color="primary" onPress={onClose}>
                    Next
                  </Button> */}
                </ModalFooter>
              </form>
            )}
          </ModalContent>
        </Modal>

        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </main>
    </>
  );
}
