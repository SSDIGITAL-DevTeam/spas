import Link from "next/link";
import { FormEvent, JSX, useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Button, Image, Input } from "@nextui-org/react";
import Loading from "@/components/partials/Loading";
import ApiError from "@/errors/ApiError";
import { RequestUpdate, Therapist } from "@/@types";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import toast from "react-hot-toast";
import TherapistRejected from "@/components/modals/RejectTherapist";
import RequestUpdateModule from "@/modules/RequestUpdateModule";

type ValidationErrors = {
  status: boolean;
  errors: {
    name: string;
  };
};

export default function DetailRequestUpdateTherapist(): JSX.Element {
  const [singleRequestUpdate, setSingleRequestUpdate] = useState<RequestUpdate>(
    {} as RequestUpdate
  );
  const [validationErrors, setValidationErrors] = useState(
    {} as ValidationErrors
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isApprove, setIsApprove] = useState<boolean>(false);
  const [therapistId, setThearpistId] = useState<number>(0);
  const [selectedTherapistId, setSelectedTherapistId] = useState<number | null>(
    null
  );
  const [isOpenRejected, setIsOpenRejected] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const fetchsingleRequestUpdate = async () => {
      setIsLoading(true);

      try {
        const res = await new RequestUpdateModule().single(+router.query.id!);
        setSingleRequestUpdate(res.data);
        setIsLoading(true);

        // console.log(setSingleRequestUpdate);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchsingleRequestUpdate();
  }, [router]);

  const handleApprovedTherapist = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    setIsProcessing(true);
    e.preventDefault();

    const form: HTMLFormElement = e.currentTarget;
    const formData: FormData = new FormData(form);
    const submit: SubmitEvent = e.nativeEvent as SubmitEvent;
    const status: HTMLButtonElement = submit.submitter as HTMLButtonElement;

    try {
      //   await new RequestUpdateModule().update(formData, +router.query.id!);
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/request-updates/approve-therapist/${router.query.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME || ""
            )}`,
          },
        }
      );

      toast("Operator Request Approved", {
        icon: "✅",
        style: {
          backgroundColor: "#F4B202",
          color: "#ffffff",
          paddingBlock: 12,
        },
      });

      router.push(`/member-request`);
    } catch (error) {
      const err = error as ApiError;
      const validationErrors = err.data as ValidationErrors;
      setValidationErrors(validationErrors);

      toast("Something Wrong", {
        icon: "🚫",
        style: {
          backgroundColor: "#D81222",
          color: "#ffffff",
          paddingBlock: 12,
        },
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Head>
        <title>SPAS | {singleRequestUpdate.name}</title>
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
                Detail Therapist
              </h1>

              <div className="flex flex-col md:flex-row justify-between mb-8 md:mb-12 md:gap-x-10">
                <div className="md:w-1/2 space-y-4 md:space-y-8">
                  <div className="md:space-y-8">
                    <h2 className="md:text-lg lg:tex-xl font-bold mb-4 md:mb-8">
                      Personal Information
                    </h2>

                    <label htmlFor="">Profile Picture</label>

                    <div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        key={singleRequestUpdate.id}
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
                    <label htmlFor="">Full Name</label>

                    <div className="border-2 p-2">
                      <span className="pl-2">{singleRequestUpdate.name}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="">Passport/Fin No.</label>

                    <div className="border-2 p-2">
                      <span className="pl-2">
                        {singleRequestUpdate.passport_finno}
                      </span>
                    </div>
                  </div>

                  {/* <div className="space-y-2">
                    <label htmlFor="">Email</label>

                    <div className="border-2 p-2">
                      <span className="pl-2">
                        {singleRequestUpdate.user?.email}
                      </span>
                    </div>
                  </div> */}

                  <div className="space-y-2">
                    <label htmlFor="">Date of Birth</label>

                    <div className="border-2 p-2">
                      <span className="pl-2">
                        {singleRequestUpdate.date_of_birth}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="">Sex</label>

                    <div className="border-2 p-2">
                      <span className="pl-2">{singleRequestUpdate.sex}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="">Contact No.</label>

                    <div className="border-2 p-2">
                      <span className="pl-2">
                        {singleRequestUpdate.contact_no}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="">Nationality</label>

                    <div className="border-2 p-2">
                      <span className="pl-2">
                        {singleRequestUpdate.nationality}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="md:w-1/2 space-y-4 md:space-y-8">
                  <div className="md:space-y-8">
                    <h2 className="md:text-lg lg:tex-xl font-bold mb-4 md:mb-8">
                      Professional Certificate
                    </h2>

                    <label htmlFor="">Certificate</label>

                    <div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        key={singleRequestUpdate.id}
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
                    <label htmlFor="">Certificate Name</label>

                    <div className="border-2 p-2">
                      <span className="pl-2">
                        {singleRequestUpdate.name_cert}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="">Issuing Organization</label>

                    <div className="border-2 p-2">
                      <span className="pl-2">
                        {singleRequestUpdate.issuing_organization}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="">Issue Date</label>

                    <div className="border-2 p-2">
                      <span className="pl-2">
                        {singleRequestUpdate.date_of_issue}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="">Expiration Date</label>

                    <div className="border-2 p-2">
                      <span className="pl-2">
                        {singleRequestUpdate.expired_date}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="">Credental ID</label>

                    <div className="border-2 p-2">
                      <span className="pl-2">
                        {singleRequestUpdate.credential_id}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="w-max mx-auto">
                <div className="flex flex-col md:flex-row gap-x-10 gap-y-4">
                  <Button
                    onClick={() => {
                      setSelectedTherapistId(singleRequestUpdate.id);
                      setIsOpenRejected(!isOpenRejected);
                    }}
                    color="danger"
                    size="lg"
                  >
                    Reject
                  </Button>

                  <form
                    onSubmit={handleApprovedTherapist}
                    // onSubmit={(e) => {
                    //   e.preventDefault();
                    //   setThearpistId(singleRequestUpdate.id);
                    //   setIsApprove(true);
                    //   handleStatusMember(e);
                    // }}
                  >
                    <Button type="submit" color="secondary" size="lg">
                      Approve
                    </Button>
                  </form>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>
      <TherapistRejected
        isOpen={isOpenRejected}
        setIsOpen={setIsOpenRejected}
        therapistId={selectedTherapistId}
      />
    </>
  );
}
