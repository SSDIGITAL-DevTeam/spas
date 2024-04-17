import Head from "next/head";
import Link from "next/link";
import React from "react";
import { BsArrowLeftSquareFill } from "react-icons/bs";

import "react-international-phone/style.css";
import AssetBlank from "@/assets/images/blank-therapist.png";
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
import { FaPen } from "react-icons/fa6";
import { PiUploadFill } from "react-icons/pi";
import { FaInfoCircle } from "react-icons/fa";
import { PhoneInput } from "react-international-phone";

export default function OperatorProfile() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const inputStyle = {
    width: "100%",
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
              <div className="space-y-4 flex flex-col items-center md:items-start">
                <Image
                  src={AssetBlank.src}
                  alt="Operators"
                  className="object-cover"
                  radius="none"
                />
                <div className="">
                  <span className="font-bold text-lg md:text-2xl">
                    Brand Name
                  </span>
                </div>
                <div className="flex flex-col text-center md:text-start md:text-lg">
                  <span>SINGAPORE</span>
                  <span>SPAS Community</span>
                </div>
              </div>

              <div className="flex-1">
                <h2 className="font-bold md:text-2xl mb-8 text-center md:text-start">
                  Operators A
                </h2>

                <div className="space-y-14">
                  <div className="flex flex-col gap-y-4 items-center md:items-start">
                    <div className="flex items-center gap-x-4">
                      <div>
                        <LuMapPin className="text-secondary w-6 h-6 md:w-8 md:h-8" />
                      </div>
                      <span className="text-lg">Singapore</span>
                    </div>

                    <div className="flex items-center gap-x-4">
                      <div>
                        <LuPhone className="text-secondary w-6 h-6 md:w-8 md:h-8" />
                      </div>
                      <span className="text-lg">(65) 6278 1800</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-y-4 items-center md:items-start">
                    <h3 className="font-bold md:text-xl">Person In Charge</h3>
                    <div className="flex items-center gap-x-4">
                      <div>
                        <LuUser2 className="text-secondary w-6 h-6 md:w-8 md:h-8" />
                      </div>
                      <span className="text-lg">User</span>
                    </div>

                    <div className="flex items-center gap-x-4">
                      <div>
                        <LuPhone className="text-secondary w-6 h-6 md:w-8 md:h-8" />
                      </div>
                      <span className="text-lg">(65) 6278 1800</span>
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

        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Edit Profile
                </ModalHeader>
                <ModalBody className="grid md:grid-cols-2 md:gap-3 gap-1">
                  <div className="md:space-y-2">
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
                        The image file must be at least 2 MB in size, with equal
                        dimensions (e.g., square or a 1:1 aspect ratio)
                      </p>
                    </div>
                  </div>

                  <div className="md:space-y-2">
                    <label htmlFor="" className="md:text-base text-sm">
                      Company Name
                    </label>
                    <Input
                      variant={"bordered"}
                      color="secondary"
                      size="md"
                      radius="sm"
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
                    />
                  </div>

                  <div className="md:space-y-2">
                    <label htmlFor="">Address</label>
                    <Input
                      variant={"bordered"}
                      color="secondary"
                      size="md"
                      radius="sm"
                    />
                  </div>

                  <div className="md:space-y-2">
                    <label htmlFor="">Contact No.</label>
                    <PhoneInput
                      inputProps={{ style: inputStyle }}
                      style={{}}
                      className="border-2 border-[#E4E4E7] rounded-md"
                      defaultCountry="sg"
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
                    />
                  </div>

                  <div className="md:space-y-2">
                    <label htmlFor="">Contact Person No.</label>
                    <PhoneInput
                      inputProps={{ style: inputStyle }}
                      style={{}}
                      className="border-2 border-[#E4E4E7] rounded-md"
                      defaultCountry="sg"

                      // onChange={(phone: string) => setPhone(phone)}
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Action
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </main>
    </>
  );
}
