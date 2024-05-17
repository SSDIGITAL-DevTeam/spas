import Head from "next/head";
import React, { FormEvent, useEffect, useState } from "react";
import "react-international-phone/style.css";
import {
  Button,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { LuMapPin, LuPhone, LuUser2 } from "react-icons/lu";
import { FaPen, FaUser } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";
import { PhoneInput } from "react-international-phone";
import axios, { AxiosError } from "axios";
import { Operator } from "@/@types";
import { useRouter } from "next/router";
import { IoLogOut } from "react-icons/io5";
import { Bounce, ToastContainer, toast } from "react-toastify";
import Lottie from "react-lottie-player";

import "react-toastify/dist/ReactToastify.css";
import { IoIosTimer, IoMdTime } from "react-icons/io";
import AssetWaitingAnimation from "@/assets/animation/waiting.json";

type ErrorResponse = {
  errors: {
    company_name: string[];
    uen_no: string[];
    brand_name: string[];
    address: string[];
    contact_no: string[];
    contact_person: string[];
    contact_person_no: string[];
    url: string[];
    email: string[];
  };
};

export default function OperatorProfile() {
  // states
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isOpenModalMessage, setIsOpenModalMessage] = useState<boolean>(false);
  const [profile, setProfile] = useState<Operator>();
  const [id, setId] = useState<string>("");
  const [errMessage, setErrorMessage] = useState<ErrorResponse>(
    {} as ErrorResponse
  );
  const [newSlug, setNewSlug] = useState<string>("");

  const router = useRouter();

  const slug = router.query.slug;

  // phone css
  const inputStyle = {
    width: "100%",
  };

  // get profile data
  const getProfile = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/end-user/operators/${slug}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              process.env.NEXT_PUBLIC_ACCESS_TOKEN!
            )}`,
          },
        }
      );

      setNewSlug(response.data.data.slug);

      setProfile(response.data.data);
      setId(response.data.data.id);
    } catch (error) {
      console.log(error);
    }
  };

  // push to sign in when not logged in
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

  // function edit data form
  const handleRequestEditData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form: HTMLFormElement = e.currentTarget;
    const formData: FormData = new FormData(form);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/end-user/operator/request-operators`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              process.env.NEXT_PUBLIC_ACCESS_TOKEN!
            )}`,
          },
        }
      );

      setIsOpenModalMessage(true);
      // toast.success(
      //   "Request submitted, please wait until request approved by admin",
      //   {
      //     position: "bottom-right",
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "light",
      //     transition: Bounce,
      //   }
      // );
      // getProfile();
      // router.replace(`/profile/operator/${res.data.data.slug}`);
    } catch (error) {
      console.log(error);
      const errMessage = error as AxiosError;
      setErrorMessage(errMessage.response?.data as ErrorResponse);
    }
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

  return (
    <>
      {" "}
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
            <div className="flex flex-col gap-y-8 md:flex-row gap-x-20">
              <div className="space-y-4 flex flex-col items-center md:items-start md:max-w-64">
                {profile?.cover?.url == undefined ? (
                  <FaUser className="text-gray-400 md:w-40 md:h-40" />
                ) : (
                  <Image
                    // src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${profile?.cover?.url}`}
                    src={profile?.cover?.url}
                    alt="Operators"
                    className="object-cover aspect-square w-1/2 md:w-40 md:h-40"
                    removeWrapper
                    radius="full"
                  />
                )}

                <div className="">
                  <span className="font-bold text-lg md:text-2xl">
                    {profile?.brand_name}
                  </span>
                </div>

                <div className="flex flex-col text-center md:text-start md:text-lg">
                  <span>SINGAPORE</span>
                  <span>SPAS Community</span>
                </div>

                <Button
                  onClick={handleLogout}
                  startContent={<IoLogOut />}
                  className="bg-white border-2 border-secondary text-secondary hover:bg-secondary hover:text-white w-max lg:w-full rounded-md"
                  radius="none"
                  size="lg"
                >
                  Logout
                </Button>
              </div>

              <div className="flex-1">
                <h2 className="font-bold md:text-2xl mb-8 text-center md:text-start">
                  {profile?.company_name}
                </h2>

                <div className="space-y-14">
                  <div className="flex flex-col gap-y-4 items-center md:items-start">
                    <div className="flex items-center gap-x-4">
                      <div>
                        <LuMapPin className="text-secondary w-6 h-6 md:w-8 md:h-8" />
                      </div>
                      <span className="text-lg">{profile?.address}</span>
                    </div>

                    <div className="flex items-center gap-x-4">
                      <div>
                        <LuPhone className="text-secondary w-6 h-6 md:w-8 md:h-8" />
                      </div>
                      <span className="text-lg">{profile?.contact_no}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-y-4 items-center md:items-start">
                    <h3 className="font-bold md:text-xl">Person In Charge</h3>
                    <div className="flex items-center gap-x-4">
                      <div>
                        <LuUser2 className="text-secondary w-6 h-6 md:w-8 md:h-8" />
                      </div>
                      <span className="text-lg">{profile?.contact_person}</span>
                    </div>

                    <div className="flex items-center gap-x-4">
                      <div>
                        <LuPhone className="text-secondary w-6 h-6 md:w-8 md:h-8" />
                      </div>
                      <span className="text-lg">
                        {profile?.contact_person_no}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" text-[#A3A3A3] text-sm md:text-base text-center">
                <Button
                  onPress={onOpen}
                  startContent={<FaPen />}
                  className="bg-white border-2 border-secondary text-secondary rounded-md w-max mx-auto md:w-full hover:bg-secondary hover:text-white"
                  radius="none"
                  size="lg"
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </section>

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

        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          size="2xl"
          hideCloseButton
        >
          <ModalContent>
            {(onClose) => (
              <form onSubmit={handleRequestEditData}>
                <ModalHeader className="flex flex-col gap-1">
                  Edit Profile
                </ModalHeader>
                <ModalBody className="grid md:grid-cols-2 md:gap-3 gap-1">
                  <div className="md:space-y-2">
                    <input className="" type="file" name="url" />
                    <div className="flex items-center gap-x-4">
                      <FaInfoCircle className="text-[#8D98AA]" />
                      <p className="text-xs">Image file size max 2 MB</p>
                    </div>
                  </div>

                  <div className="md:space-y-2">
                    <label htmlFor="" className="md:text-base text-sm">
                      Company Name
                    </label>
                    <Input
                      name="company_name"
                      variant={"bordered"}
                      color="secondary"
                      size="md"
                      radius="sm"
                      defaultValue={profile?.company_name}
                    />
                  </div>

                  <div className="md:space-y-2">
                    <label htmlFor="" className="md:text-base text-sm">
                      UEN NO
                    </label>
                    <Input
                      variant={"bordered"}
                      color="secondary"
                      size="md"
                      radius="sm"
                      defaultValue={profile?.uen_no}
                    />
                  </div>

                  <div className="md:space-y-2">
                    <label htmlFor="" className="md:text-base text-sm">
                      Brand Name
                    </label>
                    <Input
                      variant={"bordered"}
                      color="secondary"
                      size="md"
                      radius="sm"
                      name="brand_name"
                      defaultValue={profile?.brand_name}
                    />
                  </div>

                  <div className="md:space-y-2">
                    <label htmlFor="">Address</label>
                    <Input
                      variant={"bordered"}
                      color="secondary"
                      size="md"
                      radius="sm"
                      name="address"
                      defaultValue={profile?.address}
                    />
                  </div>

                  <div className="md:space-y-2">
                    <label htmlFor="">Contact No.</label>
                    <PhoneInput
                      inputProps={{ style: inputStyle }}
                      style={{}}
                      className="border-2 border-[#E4E4E7] rounded-md"
                      defaultCountry="sg"
                      value={profile?.contact_no}
                      name="contact_no"
                      // placeholder={profile?.contact_no}

                      // onChange={(phone: string) => setPhone(phone)}
                    />
                  </div>

                  <div className="md:space-y-2">
                    <label htmlFor="">Contact Person Name</label>
                    <Input
                      variant={"bordered"}
                      color="secondary"
                      size="md"
                      radius="sm"
                      name="contact_person"
                      defaultValue={profile?.contact_person}
                    />
                  </div>

                  <div className="md:space-y-2">
                    <label htmlFor="">Contact Person No.</label>
                    <PhoneInput
                      inputProps={{ style: inputStyle }}
                      style={{}}
                      className="border-2 border-[#E4E4E7] rounded-md"
                      defaultCountry="sg"
                      value={profile?.contact_person_no}
                      name="contact_person_no"
                      // defaultValue={profile?.contact_person_no}
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" type="submit" onPress={onClose}>
                    Request
                  </Button>
                </ModalFooter>
              </form>
            )}
          </ModalContent>
        </Modal>

        <Modal
          isOpen={isOpenModalMessage}
          onOpenChange={setIsOpenModalMessage}
          size="md"
          hideCloseButton
        >
          <ModalContent>
            {(onClose) => (
              <div>
                <ModalHeader className="w-max mx-auto">
                  <Lottie
                    loop
                    animationData={AssetWaitingAnimation}
                    play
                    style={{ width: 150, height: 150 }}
                  />
                </ModalHeader>
                <ModalBody>
                  <div>
                    <h2 className="text-lg  text-center md:w-3/4 mx-auto">
                      Request submitted, please wait until approved by admin
                    </h2>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    onClick={() => setIsOpenModalMessage(false)}
                    radius="none"
                    className="border-2 border-secondary rounded-md bg-white w-max mx-auto hover:bg-secondary hover:text-white"
                  >
                    Close
                  </Button>
                </ModalFooter>
              </div>
            )}
          </ModalContent>
        </Modal>
      </main>
    </>
  );
}
