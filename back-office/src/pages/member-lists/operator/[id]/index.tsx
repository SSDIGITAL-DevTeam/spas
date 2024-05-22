import Link from "next/link";
import { FormEvent, JSX, useEffect, useState } from "react";
import { FaCheckCircle, FaChevronLeft, FaInfoCircle } from "react-icons/fa";
import { Button, Image, Input } from "@nextui-org/react";
import Head from "next/head";
import { Operator } from "@/@types";
import Loading from "@/components/partials/Loading";
import OperatorModule from "@/modules/OperatorModule";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import ApiError from "@/errors/ApiError";

type ValidationErrors = {
  status: boolean;
  errors: {
    company_name: string;
    uen_no: string;
    brand_name: string;
    address: string;
    contact_no: string;
    contact_person: string;
    contact_person_no: string;
    email: string;
    url: string;
  };
};

export default function DetailMember(): JSX.Element {
  const [singleOperator, setSingleOperator] = useState<Operator>(
    {} as Operator
  );
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState(
    {} as ValidationErrors
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

  // handle update operator
  const handleCreateBlog = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    setIsProcessing(true);
    e.preventDefault();

    const form: HTMLFormElement = e.currentTarget;
    const formData: FormData = new FormData(form);
    const submit: SubmitEvent = e.nativeEvent as SubmitEvent;
    const status: HTMLButtonElement = submit.submitter as HTMLButtonElement;

    try {
      await new OperatorModule().update(formData, +router.query.id!);

      toast("Operator Updated Successfully", {
        icon: "✅",
        style: {
          backgroundColor: "#F4B202",
          color: "#ffffff",
          paddingBlock: 12,
        },
      });

      router.push(`/member-lists`);
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

              <form onSubmit={(e) => handleCreateBlog(e)}>
                <div className="flex flex-col md:flex-row justify-between mb-8 md:mb-12">
                  <div className="md:w-1/2 space-y-4 md:space-y-8">
                    <label htmlFor="">Logo</label>

                    <div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        key={singleOperator.id}
                        src={
                          singleOperator.cover
                            ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${singleOperator.cover.url}`
                            : "/no-image.png"
                        }
                        alt={singleOperator.company_name}
                        className="object-cover w-80"
                      />
                    </div>

                    <div className="space-y-2">
                      <input type="file" className="" name="url" />
                      <div className="flex items-center gap-x-4">
                        <FaInfoCircle className="text-[#8D98AA]" />
                        <p className="text-xs md:w-3/4">
                          The image file must be at least 2 MB in size, with
                          equal dimensions (e.g., square or a 1:1 aspect ratio)
                        </p>
                      </div>
                    </div>

                    {validationErrors.errors?.url && (
                      <p className="text-ligh text-[#D81222] mt-2">
                        {validationErrors.errors.url[0]}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-between flex-col md:flex-row md:gap-x-20">
                  <div className="md:w-1/2 space-y-4 md:space-y-8">
                    <div className="space-y-2"> 
                      <label htmlFor="">Company Name</label>

                      <Input
                        variant="bordered"
                        name="company_name"
                        defaultValue={
                          singleOperator ? singleOperator.company_name : ""
                        }
                      />

                      {validationErrors.errors?.company_name && (
                        <p className="text-ligh text-[#D81222] mt-2">
                          {validationErrors.errors.company_name[0]}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="">UEN No</label>

                      <Input
                        variant="bordered"
                        name="uen_no"
                        defaultValue={singleOperator.uen_no}
                      />

                      {validationErrors.errors?.uen_no && (
                        <p className="text-ligh text-[#D81222] mt-2">
                          {validationErrors.errors.uen_no[0]}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="">Email</label>

                      <Input
                        variant="bordered"
                        name="email"
                        defaultValue={singleOperator.user?.email}
                      />

                      {validationErrors.errors?.email && (
                        <p className="text-ligh text-[#D81222] mt-2">
                          {validationErrors.errors.email[0]}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="">Brand Name</label>

                      <Input
                        variant="bordered"
                        name="brand_name"
                        defaultValue={singleOperator.brand_name}
                      />

                      {validationErrors.errors?.brand_name && (
                        <p className="text-ligh text-[#D81222] mt-2">
                          {validationErrors.errors.brand_name[0]}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <label htmlFor="">Address</label>

                      <textarea
                        className="border-2 p-2 h-36 rounded-2xl"
                        name="address"
                        defaultValue={singleOperator.address}
                      ></textarea>

                      {validationErrors.errors?.address && (
                        <p className="text-ligh text-[#D81222] mt-2">
                          {validationErrors.errors.address[0]}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="md:w-1/2 space-y-4 md:space-y-8">
                    <div className="space-y-2">
                      <label htmlFor="">Contact Company No</label>

                      <Input
                        variant="bordered"
                        name="contact_no"
                        defaultValue={singleOperator.contact_no}
                      />

                      {validationErrors.errors?.contact_no && (
                        <p className="text-ligh text-[#D81222] mt-2">
                          {validationErrors.errors.contact_no[0]}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="">Contact Person</label>

                      <Input
                        variant="bordered"
                        name="contact_person"
                        defaultValue={singleOperator.contact_person}
                      />

                      {validationErrors.errors?.contact_person && (
                        <p className="text-ligh text-[#D81222] mt-2">
                          {validationErrors.errors.contact_person[0]}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="">Contact Person No</label>

                      <Input
                        variant="bordered"
                        name="contact_person_no"
                        defaultValue={singleOperator.contact_person_no}
                      />

                      {validationErrors.errors?.contact_person_no && (
                        <p className="text-ligh text-[#D81222] mt-2">
                          {validationErrors.errors.contact_person_no[0]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex flex-col justify-center gap-x-12 gap-y-4 font-medium md:flex-row">
                  <button className="hover:bg-primary hover:text-white transition-all py-1.5 rounded-lg border-2 px-12">
                    {isProcessing ? "Updating..." : "Update"}
                  </button>
                </div>
              </form>
            </section>
          </div>
        )}
      </main>
    </>
  );
}
