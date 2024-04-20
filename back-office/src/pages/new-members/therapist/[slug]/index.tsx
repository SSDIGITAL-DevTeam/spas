import Link from "next/link";
import { JSX } from "react";
import { FaChevronLeft } from "react-icons/fa";
import AssetLogo from "@/assets/dev/company-logo.png";
import { Button, Image, Input } from "@nextui-org/react";

export default function DetailMember(): JSX.Element {
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
          Detail Therapist
        </h1>

        <div className="flex flex-col md:flex-row justify-between mb-8 md:mb-12 md:gap-x-10">
          <div className="md:w-1/2 space-y-4 md:space-y-8">
            <div>
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
            </div>

            <div className="space-y-2">
              <label htmlFor="">Full Name</label>

              <div className="border-2 p-2">
                <span className="pl-2">Jocelyn</span>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="">Passport/Fin No.</label>

              <div className="border-2 p-2">
                <span className="pl-2">ABC123456</span>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="">Date of Birth</label>

              <div className="border-2 p-2">
                <span className="pl-2">1 April 2000</span>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="">Sex</label>

              <div className="border-2 p-2">
                <span className="pl-2">Female</span>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="">Contact No.</label>

              <div className="border-2 p-2">
                <span className="pl-2">08123455</span>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="">Nationality</label>

              <div className="border-2 p-2">
                <span className="pl-2">Singapore</span>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 space-y-4 md:space-y-8">
            <div>
              <h2 className="md:text-lg lg:tex-xl font-bold mb-4 md:mb-8">
                Professional Certificate
              </h2>

              <label htmlFor="">Certificate</label>

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

              <div className="border-2 p-2">
                <span className="pl-2">
                  CIBTAC Level 3 Diploma in Spa Therapy
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="">Issuing Organization</label>

              <div className="border-2 p-2">
                <span className="pl-2">CIBTAC</span>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="">Issue Date</label>

              <div className="border-2 p-2">
                <span className="pl-2">1 April 2020</span>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="">Expiration Date</label>

              <div className="border-2 p-2">
                <span className="pl-2">1 April 2025</span>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="">Sex</label>

              <div className="border-2 p-2">
                <span className="pl-2">Female</span>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="">Contact No.</label>

              <div className="border-2 p-2">
                <span className="pl-2">08123455</span>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="">Credental ID</label>

              <div className="border-2 p-2">
                <span className="pl-2">1A2B3C4DXYZ</span>
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

            <Button color="secondary" size="lg">
              Approve
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
