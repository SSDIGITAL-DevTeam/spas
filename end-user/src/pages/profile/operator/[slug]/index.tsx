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
  Spinner,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { LuMapPin, LuPhone, LuUser2 } from "react-icons/lu";
import { FaPen, FaUser } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";
import { PhoneInput } from "react-international-phone";
import axios, { AxiosError } from "axios";
import { Branch, Operator } from "@/@types";
import { useRouter } from "next/router";
import { IoLogOut } from "react-icons/io5";
import { Bounce, ToastContainer, toast } from "react-toastify";
import Lottie from "react-lottie-player";
import { SlOptionsVertical } from "react-icons/sl";
import "react-toastify/dist/ReactToastify.css";
import { IoIosTimer, IoMdAdd, IoMdAddCircle, IoMdTime } from "react-icons/io";
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
  const [isOpenModalAddBranch, setIsOpenModalAddBranch] =
    useState<boolean>(false);
  const [isOpenModalDeleteBranch, setIsOpenModalDeleteBranch] =
    useState<boolean>(false);
  const [isOpenModalEditBranch, setIsOpenModalEditBranch] =
    useState<boolean>(false);

  const [profile, setProfile] = useState<Operator>();
  const [id, setId] = useState<string>("");
  const [errMessage, setErrorMessage] = useState<ErrorResponse>(
    {} as ErrorResponse
  );
  const [newSlug, setNewSlug] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [branchId, setBranchId] = useState<number>();
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
      await axios.post(
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

  const handleAddBranch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form: HTMLFormElement = e.currentTarget;
    // const formData: FormData = new FormData(form);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/end-user/operator/branch-offices`,
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              process.env.NEXT_PUBLIC_ACCESS_TOKEN!
            )}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
      const errMessage = error as AxiosError;
      setErrorMessage(errMessage.response?.data as ErrorResponse);
    } finally {
      setIsLoading(false);
      setIsOpenModalAddBranch(false);
      getProfile();
    }
  };

  const handleEditBranch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form: HTMLFormElement = e.currentTarget;
    // const formData: FormData = new FormData(form);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/end-user/operator/branch-offices/${branchId}?_method=PUT`,
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              process.env.NEXT_PUBLIC_ACCESS_TOKEN!
            )}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
      const errMessage = error as AxiosError;
      setErrorMessage(errMessage.response?.data as ErrorResponse);
    } finally {
      setIsLoading(false);
      setIsOpenModalEditBranch(false);
      getProfile();
    }
  };

  const handleDeleteBranch = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/end-user/operator/branch-offices/${branchId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              process.env.NEXT_PUBLIC_ACCESS_TOKEN!
            )}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
      const errMessage = error as AxiosError;
      setErrorMessage(errMessage.response?.data as ErrorResponse);
    } finally {
      setIsLoading(false);
      setIsOpenModalDeleteBranch(false);
      getProfile();
    }
  };

  const openDeleteModal = (id: number) => {
    setBranchId(id);
    setIsOpenModalDeleteBranch(true);
  };

  const openEditModal = (id: number) => {
    setBranchId(id);
    setIsOpenModalEditBranch(true);
  };

  console.log(profile);
  console.log(branchId);
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
        <section className="pb-8">
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
                  startContent={<IoLogOut className="w-6 h-6" />}
                  className="bg-white border-2 border-secondary text-secondary hover:bg-secondary hover:text-white w-max lg:w-full rounded-md"
                  radius="none"
                  size="lg"
                >
                  Logout
                </Button>
              </div>

              <div className="flex-1 space-y-8">
                <div className="border-2 p-4 md:p-8 md:w-3/4 rounded-md">
                  <h2 className="font-bold text-lg md:text-2xl mb-8 text-center md:text-start">
                    {profile?.company_name}
                  </h2>

                  <div className="space-y-8 md:space-y-14">
                    <div className="flex flex-col gap-y-4 md:items-start">
                      <div className="flex items-center gap-x-4">
                        <div>
                          <LuMapPin className="text-secondary w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <span className="text-lg w-3/4">
                          {profile?.address}
                        </span>
                      </div>

                      <div className="flex items-center gap-x-4">
                        <div>
                          <LuPhone className="text-secondary w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <span className="text-lg">{profile?.contact_no}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-y-4 md:items-start">
                      <h3 className="font-bold text-lg md:text-xl text-center md:text-start">
                        Person In Charge
                      </h3>
                      <div className="flex items-center gap-x-4">
                        <div>
                          <LuUser2 className="text-secondary w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <span className="text-lg">
                          {profile?.contact_person}
                        </span>
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

        <section className="pb-10 md:pb-20">
          <div className="container p-4 md:p-8">
            <div className="md:flex items-center justify-between mb-8">
              <h2 className="font-bold text-lg md:text-2xl text-center md:text-start">
                Branches
              </h2>
              {/* Add Branches */}
              <div className="w-max mx-auto md:mx-0 hidden md:block">
                <Button
                  type="button"
                  onClick={() => setIsOpenModalAddBranch(true)}
                  startContent={<IoMdAddCircle className="w-6 h-6" />}
                  className="bg-white border-2 border-secondary text-secondary hover:bg-secondary hover:text-white  rounded-md"
                  radius="none"
                  size="lg"
                >
                  Add Branch
                </Button>
              </div>
            </div>

            {!profile?.branch_office.length ? (
              <p className="text-center md:text-lg pb-10 md:pb-20">
                No Branch Currently
              </p>
            ) : (
              <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-8 mb-8 md:mb-0">
                {profile?.branch_office?.map((branch: Branch) => (
                  <div key={branch.id} className="border-2 p-4 rounded-md">
                    <div className="flex items-center justify-between mb-4 ">
                      <h2 className="font-bold text-lg text-start">
                        {branch.branch_name}
                      </h2>

                      <Dropdown>
                        <DropdownTrigger>
                          <Button className="bg-transparent px-0">
                            <SlOptionsVertical className="rotate-90 md:rotate-0 w-4 h-4 ml-auto text-secondary" />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                          aria-label="Static Actions"
                          className="text-center"
                        >
                          <DropdownItem
                            onClick={() => openEditModal(branch.id)}
                            key="edit"
                            color="secondary"
                            className="text-secondary"
                          >
                            Edit
                          </DropdownItem>

                          <DropdownItem
                            onClick={() => openDeleteModal(branch.id)}
                            key="delete"
                            className="text-danger"
                            color="danger"
                          >
                            Delete
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                      {/* <div>
                        
                      </div> */}
                    </div>

                    <div className="space-y-4 ">
                      <div className="flex flex-col gap-y-4 md:items-start">
                        <div className="flex items-center gap-x-4">
                          <div>
                            <LuMapPin className="text-secondary w-6 h-6 " />
                          </div>
                          <span className="w-3/4">{branch.address}</span>
                        </div>

                        <div className="flex items-center gap-x-4">
                          <div>
                            <LuPhone className="text-secondary w-6 h-6" />
                          </div>
                          <span>{branch.contact_number}</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-y-4 md:items-start">
                        <h3 className="font-bold text-start">
                          Person In Charge
                        </h3>
                        <div className="flex items-center gap-x-4">
                          <div>
                            <LuUser2 className="text-secondary w-6 h-6" />
                          </div>
                          <span>{branch.person_name}</span>
                        </div>

                        <div className="flex items-center gap-x-4">
                          <div>
                            <LuPhone className="text-secondary w-6 h-6" />
                          </div>
                          <span>{branch.person_contact}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="w-max mx-auto md:mx-0 md:hidden">
              <Button
                type="button"
                onClick={() => setIsOpenModalAddBranch(true)}
                startContent={<IoMdAddCircle className="w-6 h-6" />}
                className="bg-white border-2 border-secondary text-secondary hover:bg-secondary hover:text-white  rounded-md"
                radius="none"
                size="lg"
              >
                Add Branch
              </Button>
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

        {/* Modal Edit */}
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
                  <Button
                    color="danger"
                    variant="light"
                    onPress={onClose}
                    radius="none"
                    className="rounded-md"
                  >
                    Close
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    onPress={onClose}
                    radius="none"
                    className="rounded-md"
                  >
                    Request
                  </Button>
                </ModalFooter>
              </form>
            )}
          </ModalContent>
        </Modal>

        {/* Modal Add Branch */}
        <Modal
          isOpen={isOpenModalAddBranch}
          onOpenChange={setIsOpenModalAddBranch}
          size="2xl"
          hideCloseButton
        >
          <ModalContent>
            {(onClose) => (
              <form onSubmit={handleAddBranch}>
                <ModalHeader className="flex flex-col gap-1">
                  Add Branch
                </ModalHeader>
                <ModalBody className="grid md:grid-cols-2 md:gap-3 gap-1">
                  <div className="md:space-y-2">
                    <label htmlFor="" className="md:text-base text-sm">
                      Branch Name
                    </label>
                    <Input
                      name="branch_name"
                      variant={"bordered"}
                      color="secondary"
                      size="md"
                      radius="sm"
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
                    />
                  </div>

                  <div className="md:space-y-2">
                    <label htmlFor="">Email (optional)</label>
                    <Input
                      variant={"bordered"}
                      color="secondary"
                      size="md"
                      radius="sm"
                      name="email"
                    />
                  </div>

                  <div className="md:space-y-2">
                    <label htmlFor="">Contact No.</label>
                    <PhoneInput
                      inputProps={{ style: inputStyle }}
                      className="border border-[#E4E4E7] rounded-md"
                      defaultCountry="sg"
                      name="contact_number"
                    />
                  </div>

                  <div className="md:space-y-2">
                    <label htmlFor="">Contact Person Name</label>
                    <Input
                      variant={"bordered"}
                      color="secondary"
                      size="md"
                      radius="sm"
                      name="person_name"
                    />
                  </div>

                  <div className="md:space-y-2">
                    <label htmlFor="">Contact Person No.</label>
                    <PhoneInput
                      inputProps={{ style: inputStyle }}
                      style={{}}
                      className="border border-[#E4E4E7] rounded-md"
                      defaultCountry="sg"
                      name="person_contact"
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    onPress={onClose}
                    radius="none"
                    className="rounded-md"
                  >
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    radius="none"
                    className="rounded-md"
                  >
                    {isLoading ? (
                      <Spinner color="white" size="sm" />
                    ) : (
                      <span>Add Branch</span>
                    )}
                  </Button>
                </ModalFooter>
              </form>
            )}
          </ModalContent>
        </Modal>

        {/* Modal Request Update Message */}
        <Modal
          isOpen={isOpenModalMessage}
          onOpenChange={setIsOpenModalMessage}
          size="md"
          hideCloseButton
        >
          <ModalContent className="pb-10">
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
                      Please wait. Your data will be reviewed by our admin
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

        {/* Modal Delete Branch */}
        <Modal
          isOpen={isOpenModalDeleteBranch}
          onOpenChange={setIsOpenModalDeleteBranch}
          size="md"
          hideCloseButton
        >
          <ModalContent className="py-8">
            {(onClose) => (
              <div>
                <ModalBody>
                  <div>
                    <h2 className="text-lg  text-center md:w-3/4 mx-auto">
                      Are you sure want to delete this branch?
                    </h2>
                  </div>
                </ModalBody>
                <ModalFooter>
                  {" "}
                  <Button
                    onClick={handleDeleteBranch}
                    radius="none"
                    className="border-2 border-danger text-danger rounded-md bg-white w-max mx-auto hover:bg-danger hover:text-white"
                  >
                    {isLoading ? (
                      <Spinner color="white" size="sm" />
                    ) : (
                      <span>Delete Branch</span>
                    )}
                  </Button>
                  <Button
                    onClick={() => setIsOpenModalDeleteBranch(false)}
                    radius="none"
                    className="border-2 border-secondary text-secondary rounded-md bg-white w-max mx-auto hover:bg-secondary hover:text-white"
                  >
                    Close
                  </Button>
                </ModalFooter>
              </div>
            )}
          </ModalContent>
        </Modal>

        {/* Modal Edit Branch */}
        <Modal
          isOpen={isOpenModalEditBranch}
          onOpenChange={setIsOpenModalEditBranch}
          size="2xl"
          hideCloseButton
        >
          <ModalContent>
            {(onClose) => (
              <form onSubmit={handleEditBranch}>
                <ModalHeader className="flex flex-col gap-1">
                  Edit Branch
                </ModalHeader>
                {profile?.branch_office
                  .filter((branch: Branch) => branch.id == branchId)
                  .map((branch: Branch) => (
                    <ModalBody
                      key={branch.id}
                      className="grid md:grid-cols-2 md:gap-3 gap-1"
                    >
                      <div className="md:space-y-2">
                        <label htmlFor="" className="md:text-base text-sm">
                          Branch Name
                        </label>
                        <Input
                          name="branch_name"
                          variant={"bordered"}
                          color="secondary"
                          size="md"
                          radius="sm"
                          defaultValue={branch.branch_name}
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
                          defaultValue={branch.address}
                        />
                      </div>

                      <div className="md:space-y-2">
                        <label htmlFor="">Email (optional)</label>
                        <Input
                          variant={"bordered"}
                          color="secondary"
                          size="md"
                          radius="sm"
                          name="email"
                          defaultValue={branch.email}
                        />
                      </div>

                      <div className="md:space-y-2">
                        <label htmlFor="">Contact No.</label>
                        <PhoneInput
                          inputProps={{ style: inputStyle }}
                          className="border border-[#E4E4E7] rounded-md"
                          defaultCountry="sg"
                          name="contact_number"
                          value={branch.contact_number}
                        />
                      </div>

                      <div className="md:space-y-2">
                        <label htmlFor="">Contact Person Name</label>
                        <Input
                          variant={"bordered"}
                          color="secondary"
                          size="md"
                          radius="sm"
                          name="person_name"
                          defaultValue={branch.person_name}
                        />
                      </div>

                      <div className="md:space-y-2">
                        <label htmlFor="">Contact Person No.</label>
                        <PhoneInput
                          inputProps={{ style: inputStyle }}
                          style={{}}
                          className="border border-[#E4E4E7] rounded-md"
                          defaultCountry="sg"
                          name="person_contact"
                          value={branch.person_contact}
                        />
                      </div>
                    </ModalBody>
                  ))}

                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    onPress={onClose}
                    radius="none"
                    className="rounded-md"
                  >
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    radius="none"
                    className="rounded-md"
                  >
                    {isLoading ? (
                      <Spinner color="white" size="sm" />
                    ) : (
                      <span>Add Branch</span>
                    )}
                  </Button>
                </ModalFooter>
              </form>
            )}
          </ModalContent>
        </Modal>
      </main>
    </>
  );
}
