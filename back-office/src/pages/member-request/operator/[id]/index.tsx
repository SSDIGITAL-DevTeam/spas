import Link from "next/link";
import { JSX, useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Button } from "@nextui-org/react";
import ApiError from "@/errors/ApiError";
import { RequestUpdate } from "@/@types";
import Head from "next/head";
import Loading from "@/components/partials/Loading";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import RequestUpdateModule from "@/modules/RequestUpdateModule";

export default function DetailRequestUpdate(): JSX.Element {
  const [singleRequestUpdate, setSingleRequestUpdate] = useState<RequestUpdate>(
    {} as RequestUpdate
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isApproving, setIsApproving] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (!router.query.id) return;

    const fetchSingleRequestUpdate = async () => {
      setIsLoading(true);
      try {
        const res = await new RequestUpdateModule().single(+router.query.id!);
        setSingleRequestUpdate(res.data);
      } catch (error) {
        const message = error instanceof ApiError ? error.getFirstError() : "Failed to load request.";
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSingleRequestUpdate();
  }, [router.query.id]);

  const handleApprove = async () => {
    setIsApproving(true);
    try {
      const token = localStorage.getItem(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME || "");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/request-updates/approve-operator/${router.query.id}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
        }
      );

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message || "Approval failed.");
      }

      toast.success("Operator request approved.");
      router.push("/member-request");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to approve request.";
      toast.error(message);
    } finally {
      setIsApproving(false);
    }
  };

  return (
    <>
      <Head>
        <title>SPAS | {singleRequestUpdate.company_name}</title>
      </Head>
      <main>
        <header className="mb-8 md:mb-12">
          <Link href="/member-request" className="flex gap-x-4 items-center w-max">
            <div className="bg-secondary p-2 rounded-md">
              <FaChevronLeft className="w-4 h-4 md:w-8 md:h-8 text-white" />
            </div>
            <span className="text-base md:text-2xl lg:text-3xl">
              Back to Member Request
            </span>
          </Link>
        </header>

        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <section className="container p-4 md:p-8">
              <h1 className="text-lg md:text-2xl lg:text-3xl font-semibold mb-8 md:mb-12">
                Operator Update Request
              </h1>

              <div className="flex flex-col md:flex-row justify-between mb-8 md:mb-12">
                <div className="md:w-1/2 md:space-y-8">
                  <label>Logo</label>
                  <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={
                        singleRequestUpdate.url_logo_operator
                          ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${singleRequestUpdate.url_logo_operator}`
                          : "/no-image.png"
                      }
                      alt={singleRequestUpdate.company_name}
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
                      <span className="pl-2">{singleRequestUpdate.company_name}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label>UEN No</label>
                    <div className="border-2 p-2">
                      <span className="pl-2">{singleRequestUpdate.uen_no}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label>Brand Name</label>
                    <div className="border-2 p-2">
                      <span className="pl-2">{singleRequestUpdate.brand_name}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label>Contact Company No</label>
                    <div className="border-2 p-2">
                      <span className="pl-2">{singleRequestUpdate.contact_no}</span>
                    </div>
                  </div>
                </div>

                <div className="md:w-1/2 space-y-4 md:space-y-8">
                  <div className="flex flex-col gap-y-2">
                    <label>Address</label>
                    <textarea
                      className="border-2 p-2 h-36"
                      disabled
                      defaultValue={singleRequestUpdate.address}
                    />
                  </div>
                  <div className="space-y-2">
                    <label>Contact Person</label>
                    <div className="border-2 p-2">
                      <span className="pl-2">{singleRequestUpdate.contact_person}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label>Contact Person No</label>
                    <div className="border-2 p-2">
                      <span className="pl-2">{singleRequestUpdate.contact_person_no}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="pb-12">
              <div className="w-max mx-auto">
                <div className="flex flex-col md:flex-row gap-x-10 gap-y-4">
                  <Button
                    onClick={() => toast.error("Reject feature not yet implemented.")}
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
    </>
  );
}
