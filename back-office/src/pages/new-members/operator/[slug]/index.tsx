import Link from "next/link";
import { JSX, useState } from "react";
import { FaCheckCircle, FaChevronLeft } from "react-icons/fa";
import AssetLogo from "@/assets/dev/company-logo.png";
import { Button, Image } from "@nextui-org/react";

// import ModalApproved from "@/components/partials/ModalApproved";

export default function DetailMember(): JSX.Element {
  // const [isOpenApproved, setIsOpenApproved] = useState<boolean>(false);
  return (
    <main>
      <header className="mb-8 md:mb-12">
        <Link href={"/new-members"} className="flex gap-x-4 items-center w-max">
          <div className="bg-secondary p-2 rounded-md">
            <FaChevronLeft className="w-4 h-4 md:w-8 md:h-8 text-white" />
          </div>
          <span className="text-base md:text-2xl lg:text-3xl">
            Back to New Member Lists
          </span>
        </Link>
      </header>

      <section className="container p-4 md:p-8">
        <h1 className="text-lg md:text-2xl lg:text-3xl font-semibold mb-8 md:mb-12">
          Detail Operator
        </h1>

        <div className="flex flex-col md:flex-row justify-between mb-8 md:mb-12">
          <div className="md:w-1/2">
            <label htmlFor="">Logo</label>

            <div>
              <Image
                src={AssetLogo.src}
                alt="Operator Logo"
                className="object-cover"
              />
            </div>
          </div>
          <div className="md:w-1/2">
            <label htmlFor="">Payment Slip</label>

            <div>
              <Image
                src={AssetLogo.src}
                alt="Operator Logo"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between flex-col md:flex-row md:gap-x-20">
          <div className="md:w-1/2 space-y-4 md:space-y-8">
            <div className="space-y-2">
              <label htmlFor="">Company Name</label>

              <div className="border-2 p-2">
                <span className="pl-2">Operator A</span>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="">UEN No</label>

              <div className="border-2 p-2">
                <span className="pl-2">12345678</span>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="">Brand Name</label>

              <div className="border-2 p-2">
                <span className="pl-2">SPAS Community</span>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="">Contact Company No</label>

              <div className="border-2 p-2">
                <span className="pl-2">12345678</span>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 space-y-4 md:space-y-8">
            <div className="flex flex-col gap-y-2">
              <label htmlFor="">Address</label>

              <textarea className="border-2 p-2 h-36" disabled>
                Address
              </textarea>
            </div>

            <div className="space-y-2">
              <label htmlFor="">Contact Person</label>

              <div className="border-2 p-2">
                <span className="pl-2">Steve</span>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="">Contact Person No</label>

              <div className="border-2 p-2">
                <span className="pl-2">12345678</span>
              </div>
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

            <Button
              color="secondary"
              size="lg"
              // onClick={() => setIsOpenApproved(true)}
            >
              Approve
            </Button>
          </div>
        </div>
      </section>

      {/* <ModalApproved isOpen={isOpenApproved} setIsOpen={setIsOpenApproved} /> */}
    </main>
  );
}
