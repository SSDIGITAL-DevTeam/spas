import { ValuePartner } from "@/@types";
import ApiError, { ValidationErrors } from "@/errors/ApiError";
import CategoryPartnerModule from "@/modules/CategoryPartner";
import ValuePartnerModule from "@/modules/ValuePartnerModule";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, JSX, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button, Image } from "@nextui-org/react";

type PartnerValidationErrors = {
  logo?: string[];
  brand_name?: string[];
  email?: string[];
  phone_number?: string[];
  category_partner_id?: string[];
};

export default function DetailPartner(): JSX.Element {
  const router = useRouter();

  const [singlePartner, setSinglePartner] = useState<ValuePartner>(
    {} as ValuePartner
  );
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<PartnerValidationErrors>({});

  useEffect(() => {
    const fetchingSinglePartner = async () => {
      try {
        const res = await new ValuePartnerModule().single(+router.query.id!);
        setSinglePartner(res.data);
      } catch (error) {
        const err = error as ApiError;
        toast(err.getFirstError(), {
          icon: "🚫",
          style: {
            backgroundColor: "#D81222",
            color: "#ffffff",
            paddingBlock: 12,
          },
        });
      }
    };

    if (router.query.id) {
      fetchingSinglePartner();
    }
  }, [router.query.id]);

  const handleUpdatePartner = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    setIsProcessing(true);
    e.preventDefault();

    const form: HTMLFormElement = e.currentTarget;
    const formData: FormData = new FormData(form);

    try {
      await new ValuePartnerModule().update(formData, +router.query.id!);

      setValidationErrors({});
      toast("Partner Updated Successfully", {
        icon: "✅",
        style: {
          backgroundColor: "#F4B202",
          color: "#ffffff",
          paddingBlock: 12,
        },
      });

      router.reload();
    } catch (error) {
      const err = error as ApiError;
      const errors = err.getValidationErrors() as PartnerValidationErrors | null;
      setValidationErrors(errors ?? {});

      toast(err.getFirstError(), {
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

        <section className="">
          <div className="container p-4 md:p-8">
            <form onSubmit={(e) => handleUpdatePartner(e)}>
              <div className="font-montserrat flex flex-col gap-y-8">
                {/* Logo */}
                <div>
                  <label htmlFor="logo">Brand Logo</label>
                  <Image
                    src={singlePartner?.logo ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${singlePartner?.logo}` : '/no-image.png'}
                    alt={singlePartner?.brand_name || 'value partner logo'}
                    className="object-cover md:w-40 md:h-40 aspect-square"
                  />
                  <input
                    className="form-input mt-2 block w-full px-4 py-3 border-2 rounded-lg"
                    name="logo"
                    type="file"
                  />
                  {validationErrors.logo && (
                    <small className="text-red-500">{validationErrors.logo[0]}</small>
                  )}
                </div>

                {/* Brand name */}
                <div>
                  <label htmlFor="brand_name">Brand Name</label>
                  <input
                    className="form-input mt-2 block w-full px-4 py-3 border-2 rounded-lg"
                    name="brand_name"
                    type="text"
                    placeholder="Name..."
                    defaultValue={singlePartner?.brand_name}
                  />
                  {validationErrors.brand_name && (
                    <small className="text-red-500">{validationErrors.brand_name[0]}</small>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    className="form-input mt-2 block w-full px-4 py-3 border-2 rounded-lg"
                    name="email"
                    type="text"
                    placeholder="Email.."
                    defaultValue={singlePartner?.email}
                  />
                  {validationErrors.email && (
                    <small className="text-red-500">{validationErrors.email[0]}</small>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone_number">Phone</label>
                  <input
                    className="form-input mt-2 block w-full px-4 py-3 border-2 rounded-lg"
                    name="phone_number"
                    placeholder="Phone.."
                    defaultValue={singlePartner?.phone_number}
                  />
                  {validationErrors.phone_number && (
                    <small className="text-red-500">{validationErrors.phone_number[0]}</small>
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
      </main>
    </>
  );
}
