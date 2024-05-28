import { CategoryPartner, ValuePartner } from "@/@types";
import Loading from "@/components/partials/Loading";
import ApiError from "@/errors/ApiError";
import CategoryPartnerModule from "@/modules/CategoryPartner";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, JSX, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@nextui-org/react";

type ValidationErrors = {
  status: boolean;
  errors: {
    name: string;
  };
};

export default function EditValuePartner(): JSX.Element {
  // router
  const router = useRouter();

  // states
  const [singlePartner, setSinglePartner] = useState<CategoryPartner>(
    {} as CategoryPartner
  );
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState(
    {} as ValidationErrors
  );
  const [isLoadingFetch, setIsLoadingFetch] = useState<boolean>(false);

  useEffect(() => {
    const fetchingSinglePartner = async () => {
      setIsLoadingFetch(true);
      try {
        const res = await new CategoryPartnerModule().single(+router.query.id!);

        setSinglePartner(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoadingFetch(false);
      }
    };

    fetchingSinglePartner();
  }, [router]);

  // handle update Partner
  const handleUpdatePartner = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    setIsProcessing(true);
    e.preventDefault();

    const form: HTMLFormElement = e.currentTarget;
    const formData: FormData = new FormData(form);
    const submit: SubmitEvent = e.nativeEvent as SubmitEvent;
    const status: HTMLButtonElement = submit.submitter as HTMLButtonElement;

    try {
      await new CategoryPartnerModule().update(formData, +router.query.id!);

      toast("Partner Updated Successfully", {
        icon: "✅",
        style: {
          backgroundColor: "#F4B202",
          color: "#ffffff",
          paddingBlock: 12,
        },
      });

      router.push(`/value-partners`);
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

  console.log(singlePartner);
  return (
    <>
      <Head>
        <title>SPAS | Edit - Value Partner</title>
      </Head>

      <main>
        <Link
          href="/value-partners"
          className="btn bg-primary rounded-lg text-white px-4 py-2"
        >
          Back
        </Link>

        <header className="my-8">
          <h1 className="text-2xl">Edit Value Partner</h1>
        </header>

        <section className="mx-auto max-w-3xl">
          <div className="container p-4 md:p-8">
            <form onSubmit={(e) => handleUpdatePartner(e)}>
              <div className="font-montserrat flex flex-col gap-y-8">
                {/* title */}
                <div>
                  <label htmlFor="name">Partner Name</label>
                  <input
                    className="form-input mt-2 block w-full px-4 py-3 border-2 rounded-lg"
                    name="name"
                    type="text"
                    placeholder="Name..."
                    defaultValue={singlePartner.name}
                  />

                  {validationErrors.errors?.name && (
                    <small className="text-light">
                      {validationErrors.errors.name[0]}
                    </small>
                  )}
                </div>
              </div>

              <div className="mt-12 flex flex-col justify-center gap-x-12 gap-y-4 font-medium md:flex-row">
                <button className="hover:bg-primary hover:text-white transition-all py-1.5 rounded-lg border-2 px-12">
                  {isProcessing ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </section>

        <section>
          <div className="container p-4 md:p-8">
            <div>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="lg:text-base text-center text-white uppercase bg-secondary">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Logo
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Brand
                    </th>
                    <th scope="col" className=" px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className=" px-6 py-3">
                      Phone
                    </th>
                    <th scope="col" className=" px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td colSpan={5}>{isLoadingFetch && <Loading />}</td>
                  </tr>
                  {singlePartner?.value_partner?.map(
                    (partner: ValuePartner) => (
                      <tr
                        key={partner.id}
                        className="bg-white text-md text-black  hover:bg-slate-50 h-max"
                      >
                        <td className="flex justify-center p-4">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={
                              partner.logo
                                ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${partner.logo}`
                                : "/no-image.png"
                            }
                            alt={partner.brand_name}
                            className="object-cover w-20 h-20 aspect-square "
                          />
                        </td>
                        <td className="text-center">{partner.brand_name}</td>
                        <td className="text-center">{partner.email}</td>
                        <td className="text-center">{partner.phone_number}</td>
                        <td className="">
                          <div className="w-max mx-auto">
                            <Button
                              as={Link}
                              href={`/value-partners/partner/${partner.id}`}
                              radius="sm"
                              color="secondary"
                              className=""
                            >
                              Detail
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
