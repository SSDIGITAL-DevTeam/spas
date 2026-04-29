import Link from "next/link";
import { JSX, useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Button } from "@nextui-org/react";
import OperatorModule from "@/modules/OperatorModule";
import ApiError from "@/errors/ApiError";
import { Operator } from "@/@types";
import Head from "next/head";
import Loading from "@/components/partials/Loading";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import ModalRejected from "@/components/modals/Rejected";

export default function DetailMember(): JSX.Element {
  const [singleOperator, setSingleOperator] = useState<Operator>({} as Operator);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isApproving, setIsApproving] = useState<boolean>(false);
  const [isOpenRejected, setIsOpenRejected] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (!router.query.id) return;

    const fetchSingleOperator = async () => {
      setIsLoading(true);
      try {
        const res = await new OperatorModule().singleOperator(+router.query.id!);
        setSingleOperator(res.data);
      } catch (error) {
        const message = error instanceof ApiError ? error.getFirstError() : "Failed to load operator.";
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSingleOperator();
  }, [router.query.id]);

  const handleApprove = async () => {
    setIsApproving(true);
    try {
      const formData = new FormData();
      formData.append("status", "approve");
      await new OperatorModule().update(formData, singleOperator.id);

      const token = localStorage.getItem(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME || "");
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/send-mail-operator/${singleOperator.id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });

      toast.success("Operator has been approved.");
      router.push("/member-lists");
    } catch (error) {
      const message = error instanceof ApiError ? error.getFirstError() : "Failed to approve operator.";
      toast.error(message);
    } finally {
      setIsApproving(false);
    }
  };

  return (
    <>
      <Head>
        <title>SPAS | {singleOperator.company_name}</title>
      </Head>
      <main>
        <header className="mb-8 md:mb-12">
          <Link href="/new-members" className="flex gap-x-4 items-center w-max">
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
                <div className="md:w-1/2 md:space-y-8">
                  <label>Logo</label>
                  <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={
                        singleOperator.cover
                          ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${singleOperator.cover.url}`
                          : "/no-image.png"
                      }
                      alt={singleOperator.company_name}
                      className="object-cover w-80"
                    />
                  </div>
                </div>
                <div className="md:w-1/2 md:space-y-8">
                  <label>Payment Slip</label>
                  <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={
                        singleOperator.payment_slip
                          ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${singleOperator.payment_slip}`
                          : "/no-image.png"
                      }
                      alt={singleOperator.company_name}
                      className="object-cover w-80"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between flex-col md:flex-row md:gap-x-20">
                <div className="md:w-1/2 space-y-4 md:space-y-8">
                  <div className="space-y-2">
                    <label>Company Name</label>
                    <div className="border-2 p-2">
                      <span className="pl-2">{singleOperator.company_name}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label>UEN No</label>
                    <div className="border-2 p-2">
                      <span className="pl-2">{singleOperator.uen_no}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label>Email</label>
                    <div className="border-2 p-2">
                      <span className="pl-2">{singleOperator.user?.email}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label>Brand Name</label>
                    <div className="border-2 p-2">
                      <span className="pl-2">{singleOperator.brand_name}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label>Contact Company No</label>
                    <div className="border-2 p-2">
                      <span className="pl-2">{singleOperator.contact_no}</span>
                    </div>
                  </div>
                </div>

                <div className="md:w-1/2 space-y-4 md:space-y-8">
                  <div className="flex flex-col gap-y-2">
                    <label>Address</label>
                    <textarea
                      className="border-2 p-2 h-36"
                      disabled
                      defaultValue={singleOperator.address}
                    />
                  </div>
                  <div className="space-y-2">
                    <label>Contact Person</label>
                    <div className="border-2 p-2">
                      <span className="pl-2">{singleOperator.contact_person}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label>Contact Person No</label>
                    <div className="border-2 p-2">
                      <span className="pl-2">{singleOperator.contact_person_no}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="pb-12">
              <div className="w-max mx-auto">
                <div className="flex flex-col md:flex-row gap-x-10 gap-y-4">
                  <Button
                    onClick={() => setIsOpenRejected(true)}
                    color="danger"
                    size="lg"
                  >
                    Reject
                  </Button>
                  <Button
                    onClick={handleApprove}
                    isLoading={isApproving}
                    isDisabled={isApproving}
                    color="secondary"
                    size="lg"
                  >
                    {isApproving ? "Approving..." : "Approve"}
                  </Button>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      <ModalRejected
        isOpen={isOpenRejected}
        setIsOpen={setIsOpenRejected}
        operatorId={singleOperator.id ?? null}
      />
    </>
  );
}
