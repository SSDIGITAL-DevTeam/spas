import Link from "next/link";
import { FormEvent, JSX, useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Button, Image } from "@nextui-org/react";
import ApiError from "@/errors/ApiError";
import { RequestUpdate } from "@/@types";
import Head from "next/head";
import Loading from "@/components/partials/Loading";
import { useRouter } from "next/router";
import axios from "axios";
import toast from "react-hot-toast";
import ModalRejected from "@/components/modals/Rejected";
import RequestUpdateModule from "@/modules/RequestUpdateModule";

type ValidationErrors = {
  status: boolean;
  errors: {
    name: string;
  };
};

export default function DetailRequestUpdate(): JSX.Element {
  const [singleRequestUpdate, setSingleRequestUpdate] = useState<RequestUpdate>(
    {} as RequestUpdate
  );
  const [validationErrors, setValidationErrors] = useState(
    {} as ValidationErrors
  );

  const [isApprove, setIsApprove] = useState<boolean>(false);
  const [operatorId, setOperatorId] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedOperatorId, setSelectedOperatorId] = useState<number | null>(
    null
  );
  const [isOpenRejected, setIsOpenRejected] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const fetchSingleRequestUpdate = async () => {
      setIsLoading(true);

      try {
        const res = await new RequestUpdateModule().single(+router.query.id!);
        setSingleRequestUpdate(res.data);
        setIsLoading(true);

        console.log(setSingleRequestUpdate);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchSingleRequestUpdate();
  }, [router]);

  //   handle update category
  const handleApprovedOperator = async (
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
        `${process.env.NEXT_PUBLIC_API_URL}/request-updates/approve-operator/${router.query.id}`,
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
        <title>SPAS | {singleRequestUpdate.company_name}</title>
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
                <div className="md:w-1/2 md:space-y-8">
                  <label htmlFor="">Logo</label>

                  <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      key={singleRequestUpdate.id}
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
                    <label htmlFor="">Company Name</label>

                    <div className="border-2 p-2">
                      <span className="pl-2">
                        {singleRequestUpdate.company_name}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="">UEN No</label>

                    <div className="border-2 p-2">
                      <span className="pl-2">{singleRequestUpdate.uen_no}</span>
                    </div>
                  </div>

                  {/* <div className="space-y-2">
                    <label htmlFor="">Email</label>

                    <div className="border-2 p-2">
                      <span className="pl-2">{singleRequestUpdate.email}</span>
                    </div>
                  </div> */}

                  <div className="space-y-2">
                    <label htmlFor="">Brand Name</label>

                    <div className="border-2 p-2">
                      <span className="pl-2">
                        {singleRequestUpdate.brand_name}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="">Contact Company No</label>

                    <div className="border-2 p-2">
                      <span className="pl-2">
                        {singleRequestUpdate.contact_no}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="md:w-1/2 space-y-4 md:space-y-8">
                  <div className="flex flex-col gap-y-2">
                    <label htmlFor="">Address</label>

                    <textarea
                      className="border-2 p-2 h-36"
                      disabled
                      defaultValue={singleRequestUpdate.address}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="">Contact Person</label>

                    <div className="border-2 p-2">
                      <span className="pl-2">
                        {singleRequestUpdate.contact_person}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="">Contact Person No</label>

                    <div className="border-2 p-2">
                      <span className="pl-2">
                        {singleRequestUpdate.contact_person_no}
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
                    onClick={() => alert("Opss sorry...")}
                    // onClick={() => {
                    //   setSelectedOperatorId(singleRequestUpdate.id);
                    //   setIsOpenRejected(!isOpenRejected);
                    // }}
                    color="danger"
                    size="lg"
                  >
                    Reject
                  </Button>

                  <form
                    onSubmit={handleApprovedOperator}
                    // onSubmit={(e) => {
                    //   e.preventDefault();
                    //   setOperatorId(singleRequestUpdate.id);
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

      <ModalRejected
        isOpen={isOpenRejected}
        setIsOpen={setIsOpenRejected}
        operatorId={selectedOperatorId}
      />
    </>
  );
}
