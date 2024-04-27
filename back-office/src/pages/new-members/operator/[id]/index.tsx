import Link from "next/link";
import { FormEvent, JSX, useEffect, useState } from "react";
import { FaCheckCircle, FaChevronLeft } from "react-icons/fa";
import { Button, Image } from "@nextui-org/react";
import OperatorModule from "@/modules/OperatorModule";
import { Operator } from "@/@types";
import Head from "next/head";
import Loading from "@/components/partials/Loading";
import { useRouter } from "next/router";
import axios from "axios";

// import ModalApproved from "@/components/partials/ModalApproved";

export default function DetailMember(): JSX.Element {
  const [singleOperator, setSingleOperator] = useState<Operator>(
    {} as Operator
  );
  const [isApprove, setIsApprove] = useState<boolean>(false);
  const [operatorId, setOperatorId] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

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

  const handleStatusMember = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Menjalankan permintaan PATCH untuk memperbarui status member
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/operators/${operatorId}`,
        {
          status: isApprove ? "approve" : "pending",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME || ""
            )}`,
          },
        }
      );

      // Menjalankan permintaan untuk mengirim email
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/send-mail-operator/${operatorId}`,
        {}, // Body data kosong karena tidak memerlukan data tambahan untuk mengirim email
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME || ""
            )}`,
          },
        }
      );
    } catch (error) {
      console.error("Error during PATCH request:", error);
    }

    // Tutup modal
    router.push("/member-lists");
  };

  return (
    <>
      <Head>
        <title>SPAS | {singleOperator.company_name}</title>
      </Head>
      <main>
        <header className="mb-8 md:mb-12">
          <Link
            href={"/new-members"}
            className="flex gap-x-4 items-center w-max"
          >
            <div className="bg-secondary p-2 rounded-md">
              <FaChevronLeft className="w-4 h-4 md:w-8 md:h-8 text-white" />
            </div>
            <span className="text-base md:text-2xl lg:text-3xl">
              Back to New Member Lists
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
                <div className="md:w-1/2">
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
                </div>
                <div className="md:w-1/2">
                  <label htmlFor="">Payment Slip</label>

                  <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      key={singleOperator.id}
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${singleOperator.payment_slip}`}
                      alt={singleOperator.company_name}
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
                      <span className="pl-2">
                        {singleOperator.company_name}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="">UEN No</label>

                    <div className="border-2 p-2">
                      <span className="pl-2">{singleOperator.uen_no}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="">Brand Name</label>

                    <div className="border-2 p-2">
                      <span className="pl-2">{singleOperator.brand_name}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="">Contact Company No</label>

                    <div className="border-2 p-2">
                      <span className="pl-2">{singleOperator.contact_no}</span>
                    </div>
                  </div>
                </div>

                <div className="md:w-1/2 space-y-4 md:space-y-8">
                  <div className="flex flex-col gap-y-2">
                    <label htmlFor="">Address</label>

                    <textarea
                      className="border-2 p-2 h-36"
                      disabled
                      defaultValue={singleOperator.address}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="">Contact Person</label>

                    <div className="border-2 p-2">
                      <span className="pl-2">
                        {singleOperator.contact_person}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="">Contact Person No</label>

                    <div className="border-2 p-2">
                      <span className="pl-2">
                        {singleOperator.contact_person_no}
                      </span>
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
                  
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setOperatorId(singleOperator.id);
                      setIsApprove(true);
                      handleStatusMember(e);
                    }}
                  >
                    <Button
                      type="submit"
                      color="secondary"
                      size="lg"
                      onClick={() => {
                        setOperatorId(singleOperator.id);
                        setIsApprove(true);
                      }}
                    >
                      Approve
                    </Button>
                  </form>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* <ModalApproved isOpen={isOpenApproved} setIsOpen={setIsOpenApproved} /> */}
      </main>
    </>
  );
}
