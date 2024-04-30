import Link from "next/link";
import { JSX, useEffect, useState } from "react";
import { FaCheckCircle, FaChevronLeft, FaInfoCircle } from "react-icons/fa";
import AssetLogo from "@/assets/dev/company-logo.png";
import { Button, Image, Input } from "@nextui-org/react";
import Head from "next/head";
import { Operator } from "@/@types";
import Loading from "@/components/partials/Loading";
import OperatorModule from "@/modules/OperatorModule";
import { useRouter } from "next/router";

export default function DetailMember(): JSX.Element {
  const [singleOperator, setSingleOperator] = useState<Operator>(
    {} as Operator
  );

  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchSingleOperator = async () => {
      setIsLoading(true);

      try {
        const res = await new OperatorModule().singleOperator(
          +router.query.id!
        );
        setSingleOperator(res.data);
        setIsLoading(true);

        // console.log(setSingleOperator);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchSingleOperator();
  }, [router]);

  return (
    <>
      <Head>
        <title>SPAS | {singleOperator.company_name}</title>
      </Head>

      <main>
        <header className="mb-8 md:mb-12">
          <Link
            href={"/member-lists"}
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
                Detail Operator
              </h1>

              <div className="flex flex-col md:flex-row justify-between mb-8 md:mb-12">
                <div className="md:w-1/2 space-y-4 md:space-y-8">
                  <label htmlFor="">Logo</label>

                  <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      key={singleOperator.id}
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${singleOperator.cover?.url}`}
                      alt={singleOperator.company_name}
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
                </div>
              </div>

              <div className="flex justify-between flex-col md:flex-row md:gap-x-20">
                <div className="md:w-1/2 space-y-4 md:space-y-8">
                  <div className="space-y-2">
                    <label htmlFor="">Company Name</label>

                    <Input
                      variant="bordered"
                      defaultValue={
                        singleOperator ? singleOperator.company_name : ""
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="">UEN No</label>

                    <Input
                      variant="bordered"
                      defaultValue={singleOperator.uen_no}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="">Brand Name</label>

                    <Input
                      variant="bordered"
                      defaultValue={singleOperator.brand_name}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="">Contact Company No</label>

                    <Input
                      variant="bordered"
                      defaultValue={singleOperator.contact_no}
                    />
                  </div>
                </div>

                <div className="md:w-1/2 space-y-4 md:space-y-8">
                  <div className="flex flex-col gap-y-2">
                    <label htmlFor="">Address</label>

                    <textarea
                      className="border-2 p-2 h-36 rounded-2xl"
                      defaultValue={singleOperator.address}
                    ></textarea>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="">Contact Person</label>

                    <Input
                      variant="bordered"
                      defaultValue={singleOperator.contact_person}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="">Contact Person No</label>

                    <Input
                      variant="bordered"
                      defaultValue={singleOperator.contact_person_no}
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
