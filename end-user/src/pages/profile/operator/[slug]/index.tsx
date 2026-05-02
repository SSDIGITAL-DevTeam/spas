import Head from "next/head";
import dynamic from "next/dynamic";
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
import { SlOptionsVertical } from "react-icons/sl";
import "react-toastify/dist/ReactToastify.css";
import { IoIosTimer, IoMdAdd, IoMdAddCircle, IoMdTime } from "react-icons/io";
import AssetWaitingAnimation from "@/assets/animation/waiting.json";

const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });

type ErrorField =
  | "company_name"
  | "uen_no"
  | "brand_name"
  | "address"
  | "contact_no"
  | "contact_person"
  | "contact_person_no"
  | "url_logo_operator"
  | "url"
  | "email";

type ErrorResponse = {
  message?: string;
  errors?: Partial<Record<ErrorField, string[]>>;
};

const getFirstErrorMessage = (errorResponse?: ErrorResponse): string => {
  const firstFieldError = Object.values(errorResponse?.errors ?? {})[0]?.[0];
  return firstFieldError ?? errorResponse?.message ?? "Request failed. Please check your form.";
};

const getFieldErrorMessage = (errorResponse: ErrorResponse, field: ErrorField): string | undefined => {
  return errorResponse.errors?.[field]?.[0];
};

export default function OperatorProfile() {
  // states
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isOpenModalMessage, setIsOpenModalMessage] = useState<boolean>(false);
  const [isOpenModalAddBranch, setIsOpenModalAddBranch] =
    useState<boolean>(false);
  const [isOpenModalDeleteBranch, setIsOpenModalDeleteBranch] =
    useState<boolean>(false);
  const [isOpenModalEditBranch, setIsOpenModalEditBranch] =
    useState<boolean>(false);

  const [profile, setProfile] = useState<Operator>();
  const [logoPreview, setLogoPreview] = useState("");
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

  const currentLogoSrc = profile?.cover?.url
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${profile.cover.url}`
    : "";
  const editLogoPreviewSrc = logoPreview || currentLogoSrc;

  useEffect(() => {
    return () => {
      if (logoPreview) URL.revokeObjectURL(logoPreview);
    };
  }, [logoPreview]);

  const handleLogoPreviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setLogoPreview(file ? URL.createObjectURL(file) : "");
  };

  // get profile data
  const getProfile = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/end-user/operators/${slug}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME!
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
      process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME!
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
    setErrorMessage({} as ErrorResponse);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/end-user/operator/request-operators`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME!
            )}`,
          },
        }
      );

      onClose();
      setLogoPreview("");
      setIsOpenModalMessage(true);
    } catch (error) {
      console.log(error);
      const errMessage = error as AxiosError;
      const responseData = errMessage.response?.data as ErrorResponse | undefined;
      setErrorMessage(responseData ?? ({} as ErrorResponse));
      toast.error(getFirstErrorMessage(responseData));
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
              process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME!
            )}`,
          },
        }
      );

      localStorage.removeItem(`${process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME}`);

      router.push("/auth/sign-in");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddBranch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form: HTMLFormElement = e.currentTarget;
    const formData: FormData = new FormData(form);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/end-user/operator/branch-offices`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME!
            )}`,
          },
        }
      );
      toast.success("Branch added successfully");
      setIsOpenModalAddBranch(false);
      getProfile();
    } catch (error) {
      console.log(error);
      const errMessage = error as AxiosError;
      setErrorMessage(errMessage.response?.data as ErrorResponse);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditBranch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form: HTMLFormElement = e.currentTarget;
    const formData: FormData = new FormData(form);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/end-user/operator/branch-offices/${branchId}?_method=PUT`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME!
            )}`,
          },
        }
      );
      toast.success("Branch updated successfully");
      setIsOpenModalEditBranch(false);
      getProfile();
    } catch (error) {
      console.log(error);
      const errMessage = error as AxiosError;
      setErrorMessage(errMessage.response?.data as ErrorResponse);
    } finally {
      setIsLoading(false);
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
              process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME!
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
      <main className="pt-28 bg-slate-50 min-h-screen">
        <section className="py-10 lg:py-14">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col gap-8 md:flex-row md:gap-10 items-start rounded-2xl border border-slate-200 bg-white p-5 md:p-8 shadow-sm">
              {/* Avatar + identity */}
              <div className="flex flex-col items-center md:items-start gap-3 md:w-56 flex-shrink-0">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-sm flex items-center justify-center">
                  {!profile?.cover?.url.length ? (
                    <FaUser className="text-slate-300 w-10 h-10" />
                  ) : (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${profile?.cover?.url}`}
                      alt="Operators"
                      className="object-cover w-full h-full aspect-square"
                      removeWrapper
                      radius="none"
                    />
                  )}
                </div>
                <div className="text-center md:text-start">
                  <span className="font-bold text-lg text-slate-900">{profile?.brand_name}</span>
                  <div className="flex flex-col text-slate-500 text-sm mt-1">
                    <span>{profile?.uen_no || "UEN not set"}</span>
                    <span>SPAS Operator</span>
                  </div>
                </div>
              </div>

              {/* Info card */}
              <div className="flex-1 space-y-8">
                <div className="border border-slate-100 p-5 md:p-7 rounded-2xl bg-slate-50">
                  <h2 className="font-bold text-xl md:text-2xl mb-6 text-slate-900">
                    {profile?.company_name}
                  </h2>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <LuMapPin className="text-primary w-4 h-4" />
                        </div>
                        <span className="text-slate-700 text-sm">{profile?.address}</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <LuPhone className="text-primary w-4 h-4" />
                        </div>
                        <span className="text-slate-700 text-sm">{profile?.contact_no}</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-700 text-sm mb-3">Person In Charge</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <LuUser2 className="text-primary w-4 h-4" />
                          </div>
                          <span className="text-slate-700 text-sm">{profile?.contact_person}</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <LuPhone className="text-primary w-4 h-4" />
                          </div>
                          <span className="text-slate-700 text-sm">{profile?.contact_person_no}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Edit button */}
              <div className="flex-shrink-0">
                <Button
                  onPress={() => {
                    setErrorMessage({} as ErrorResponse);
                    onOpen();
                  }}
                  startContent={<FaPen className="w-3.5 h-3.5" />}
                  className="bg-primary text-white rounded-xl shadow-sm hover:bg-secondary transition-colors"
                  size="md"
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-12 lg:pb-20 bg-slate-50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-bold text-xl md:text-2xl text-slate-900">
                  Branches
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Manage outlet locations and branch contact details.
                </p>
              </div>
              <div className="hidden md:block">
                <Button
                  type="button"
                  onClick={() => setIsOpenModalAddBranch(true)}
                  startContent={<IoMdAddCircle className="w-5 h-5" />}
                  className="bg-primary text-white rounded-xl shadow-sm"
                  size="md"
                >
                  Add Branch
                </Button>
              </div>
            </div>

            {!profile?.branch_office.length ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-14 text-center">
                <p className="text-slate-500 font-medium">No branches currently</p>
                <p className="text-sm text-slate-400 mt-1">Add your first branch to complete the operator profile.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
                {profile?.branch_office?.map((branch: Branch) => (
                  <div key={branch.id} className="border border-slate-200 p-5 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-3 mb-5">
                      <h2 className="font-bold text-lg text-start text-slate-900">
                        {branch.branch_name}
                      </h2>

                      <Dropdown>
                        <DropdownTrigger>
                          <Button isIconOnly size="sm" variant="light" className="text-slate-500">
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

                    <div className="space-y-5">
                      <div className="flex flex-col gap-y-3 md:items-start">
                        <div className="flex items-start gap-x-3">
                          <div className="mt-0.5 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <LuMapPin className="text-primary w-4 h-4" />
                          </div>
                          <span className="text-sm text-slate-600 leading-relaxed">{branch.address}</span>
                        </div>

                        <div className="flex items-center gap-x-3">
                          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <LuPhone className="text-primary w-4 h-4" />
                          </div>
                          <span className="text-sm text-slate-600">{branch.contact_number}</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-y-3 md:items-start border-t border-slate-100 pt-4">
                        <h3 className="font-semibold text-sm text-slate-900">
                          Person In Charge
                        </h3>
                        <div className="flex items-center gap-x-3">
                          <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                            <LuUser2 className="text-slate-500 w-4 h-4" />
                          </div>
                          <span className="text-sm text-slate-600">{branch.person_name}</span>
                        </div>

                        <div className="flex items-center gap-x-3">
                          <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                            <LuPhone className="text-slate-500 w-4 h-4" />
                          </div>
                          <span className="text-sm text-slate-600">{branch.person_contact}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-center md:hidden">
              <Button
                type="button"
                onClick={() => setIsOpenModalAddBranch(true)}
                startContent={<IoMdAddCircle className="w-5 h-5" />}
                className="bg-primary text-white rounded-xl"
                size="md"
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
          size="3xl"
          hideCloseButton
        >
          <ModalContent className="rounded-2xl overflow-hidden">
            {(onClose) => (
              <form onSubmit={handleRequestEditData}>
                <ModalHeader className="flex flex-col gap-1 border-b border-slate-100 px-6 py-5">
                  <span className="text-lg font-semibold text-slate-900">Edit Profile</span>
                  <span className="text-sm font-normal text-slate-500">
                    Submit changes for admin review before they go live.
                  </span>
                </ModalHeader>
                <ModalBody className="grid grid-cols-1 md:grid-cols-2 gap-5 overflow-y-auto max-h-[70vh] px-6 py-5">
                  <div className="md:col-span-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Company Logo
                    </label>
                    {editLogoPreviewSrc ? (
                      <div className="mb-3 h-36 w-full overflow-hidden rounded-xl border border-slate-200 bg-white">
                        <Image
                          src={editLogoPreviewSrc}
                          alt="Company logo preview"
                          className="h-full w-full object-contain p-3"
                          removeWrapper
                          radius="none"
                        />
                      </div>
                    ) : (
                      <div className="mb-3 flex h-36 w-full items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-400">
                        Logo preview
                      </div>
                    )}
                    <input
                      className="w-full text-sm"
                      type="file"
                      name="url_logo_operator"
                      accept="image/*"
                      onChange={handleLogoPreviewChange}
                    />
                    <div className="mt-2 flex items-center gap-x-2 text-slate-500">
                      <FaInfoCircle className="w-4 h-4" />
                      <p className="text-xs">Upload only if you want to replace the current logo. Max 2 MB.</p>
                    </div>
                    {getFieldErrorMessage(errMessage, "url_logo_operator") && (
                      <p className="mt-2 text-xs font-medium text-red-500">
                        {getFieldErrorMessage(errMessage, "url_logo_operator")}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">
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
                    {getFieldErrorMessage(errMessage, "company_name") && (
                      <p className="text-xs font-medium text-red-500">
                        {getFieldErrorMessage(errMessage, "company_name")}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">
                      UEN NO
                    </label>
                    <Input
                      name="uen_no"
                      variant={"bordered"}
                      color="secondary"
                      size="md"
                      radius="sm"
                      defaultValue={profile?.uen_no}
                    />
                    {getFieldErrorMessage(errMessage, "uen_no") && (
                      <p className="text-xs font-medium text-red-500">
                        {getFieldErrorMessage(errMessage, "uen_no")}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">
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
                    {getFieldErrorMessage(errMessage, "brand_name") && (
                      <p className="text-xs font-medium text-red-500">
                        {getFieldErrorMessage(errMessage, "brand_name")}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-sm font-medium text-slate-700">Address</label>
                    <Input
                      variant={"bordered"}
                      color="secondary"
                      size="md"
                      radius="sm"
                      name="address"
                      defaultValue={profile?.address}
                    />
                    {getFieldErrorMessage(errMessage, "address") && (
                      <p className="text-xs font-medium text-red-500">
                        {getFieldErrorMessage(errMessage, "address")}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">Contact No.</label>
                    <PhoneInput
                      inputProps={{ style: inputStyle }}
                      style={{}}
                      className="border border-slate-200 rounded-xl overflow-hidden bg-white"
                      defaultCountry="sg"
                      value={profile?.contact_no}
                      name="contact_no"
                    />
                    {getFieldErrorMessage(errMessage, "contact_no") && (
                      <p className="text-xs font-medium text-red-500">
                        {getFieldErrorMessage(errMessage, "contact_no")}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">Contact Person Name</label>
                    <Input
                      variant={"bordered"}
                      color="secondary"
                      size="md"
                      radius="sm"
                      name="contact_person"
                      defaultValue={profile?.contact_person}
                    />
                    {getFieldErrorMessage(errMessage, "contact_person") && (
                      <p className="text-xs font-medium text-red-500">
                        {getFieldErrorMessage(errMessage, "contact_person")}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">Contact Person No.</label>
                    <PhoneInput
                      inputProps={{ style: inputStyle }}
                      style={{}}
                      className="border border-slate-200 rounded-xl overflow-hidden bg-white"
                      defaultCountry="sg"
                      value={profile?.contact_person_no}
                      name="contact_person_no"
                    />
                    {getFieldErrorMessage(errMessage, "contact_person_no") && (
                      <p className="text-xs font-medium text-red-500">
                        {getFieldErrorMessage(errMessage, "contact_person_no")}
                      </p>
                    )}
                  </div>
                </ModalBody>
                <ModalFooter className="border-t border-slate-100 px-6 py-4">
                  <Button
                    variant="light"
                    onPress={() => {
                      setLogoPreview("");
                      onClose();
                    }}
                    className="rounded-xl"
                  >
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    className="rounded-xl"
                  >
                    Submit Request
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
          <ModalContent className="rounded-2xl overflow-hidden">
            {(onClose) => (
              <form onSubmit={handleAddBranch}>
                <ModalHeader className="flex flex-col gap-1 border-b border-slate-100 px-6 py-5">
                  <span className="text-lg font-semibold text-slate-900">Add Branch</span>
                  <span className="text-sm font-normal text-slate-500">
                    Add outlet details so members can identify the correct branch contact.
                  </span>
                </ModalHeader>
                <ModalBody className="grid grid-cols-1 md:grid-cols-2 gap-5 px-6 py-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">
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

                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-sm font-medium text-slate-700">Address</label>
                    <Input
                      variant={"bordered"}
                      color="secondary"
                      size="md"
                      radius="sm"
                      name="address"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">Email (optional)</label>
                    <Input
                      variant={"bordered"}
                      color="secondary"
                      size="md"
                      radius="sm"
                      name="email"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">Contact No.</label>
                    <PhoneInput
                      inputProps={{ style: inputStyle }}
                      className="border border-slate-200 rounded-xl overflow-hidden bg-white"
                      defaultCountry="sg"
                      name="contact_number"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">Contact Person Name</label>
                    <Input
                      variant={"bordered"}
                      color="secondary"
                      size="md"
                      radius="sm"
                      name="person_name"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">Contact Person No.</label>
                    <PhoneInput
                      inputProps={{ style: inputStyle }}
                      style={{}}
                      className="border border-slate-200 rounded-xl overflow-hidden bg-white"
                      defaultCountry="sg"
                      name="person_contact"
                    />
                  </div>
                </ModalBody>
                <ModalFooter className="border-t border-slate-100 px-6 py-4">
                  <Button
                    variant="light"
                    onPress={onClose}
                    className="rounded-xl"
                  >
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    className="rounded-xl"
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
                      <span>Save Branch</span>
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
