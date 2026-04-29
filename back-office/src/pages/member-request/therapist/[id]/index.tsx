import Link from "next/link";
import { JSX, useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Button } from "@nextui-org/react";
import Loading from "@/components/partials/Loading";
import ApiError from "@/errors/ApiError";
import { RequestUpdate } from "@/@types";
import { useRouter } from "next/router";
import Head from "next/head";
import toast from "react-hot-toast";
import RequestUpdateModule from "@/modules/RequestUpdateModule";

export default function DetailRequestUpdateTherapist(): JSX.Element {
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
        `${process.env.NEXT_PUBLIC_API_URL}/request-updates/approve-therapist/${router.query.id}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
        }
      );

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message || "Approval failed.");
      }

      toast.success("Therapist request approved.");
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
        <title>SPAS | {singleRequestUpdate.name}</title>
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
                Therapist Update Request
              </h1>

              <div className="flex flex-col md:flex-row justify-between mb-8 md:mb-12 md:gap-x-10">
                <div className="md:w-1/2 space-y-4 md:space-y-8">
                  <div className="md:space-y-8">
                    <h2 className="md:text-lg font-bold mb-4 md:mb-8">Personal Information</h2>
                    <label>Profile Picture</label>
                    <div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={
                          singleRequestUpdate.url_logo_therapist
                            ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${singleRequestUpdate.url_logo_therapist}`
                            : "/no-image.png"
                        }
                        alt={singleRequestUpdate.name}
                        className="object-cover w-80"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label>Full Name</label>
                    <div className="border-2 p-2">
                      <span className="pl-2">{singleRequestUpdate.name}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label>Passport/Fin No.</label>
                    <div className="border-2 p-2">
                      <span className="pl-2">{singleRequestUpdate.passport_finno}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label>Date of Birth</label>
                    <div className="border-2 p-2">
                      <span className="pl-2">{singleRequestUpdate.date_of_birth}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label>Sex</label>
                    <div className="border-2 p-2">
                      <span className="pl-2">{singleRequestUpdate.sex}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label>Contact No.</label>
                    <div className="border-2 p-2">
                      <span className="pl-2">{singleRequestUpdate.contact_no}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label>Nationality</label>
                    <div className="border-2 p-2">
                      <span className="pl-2">{singleRequestUpdate.nationality}</span>
                    </div>
                  </div>
                </div>

                <div className="md:w-1/2 space-y-4 md:space-y-8">
                  <div className="md:space-y-8">
                    <h2 className="md:text-lg font-bold mb-4 md:mb-8">Professional Certificate</h2>
                    <label>Certificate</label>
                    <div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={
                          singleRequestUpdate.professional_certs
                            ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${singleRequestUpdate.professional_certs}`
                            : "/no-image.png"
                        }
                        alt={singleRequestUpdate.name}
                        className="object-cover w-80"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label>Certificate Name</label>
                    <div className="border-2 p-2">
                      <span className="pl-2">{singleRequestUpdate.name_cert}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label>Issuing Organization</label>
                    <div className="border-2 p-2">
                      <span className="pl-2">{singleRequestUpdate.issuing_organization}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label>Issue Date</label>
                    <div className="border-2 p-2">
                      <span className="pl-2">{singleRequestUpdate.date_of_issue}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label>Expiration Date</label>
                    <div className="border-2 p-2">
                      <span className="pl-2">{singleRequestUpdate.expired_date}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label>Credential ID</label>
                    <div className="border-2 p-2">
                      <span className="pl-2">{singleRequestUpdate.credential_id}</span>
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
