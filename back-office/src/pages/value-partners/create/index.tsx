import ApiError from "@/errors/ApiError";
import ValuePartnerModule from "@/modules/ValuePartnerModule";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, JSX, useState } from "react";
import toast from "react-hot-toast";

type PartnerValidationErrors = {
  logo?: string[];
  brand_name?: string[];
  email?: string[];
  phone_number?: string[];
  category_partner_id?: string[];
};

export default function CreateValuePartner(): JSX.Element {
  const router = useRouter();

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<PartnerValidationErrors>({});

  const handleCreate = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    setIsProcessing(true);
    e.preventDefault();

    const formData: FormData = new FormData(e.currentTarget);

    try {
      await new ValuePartnerModule().store(formData);

      toast("Value Partner Created Successfully", {
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
        <title>SPAS | Create Value Partner</title>
      </Head>

      <main>
        <Link
          href="/value-partners"
          className="btn bg-primary rounded-lg text-white px-4 py-2"
        >
          Back
        </Link>

        <header className="my-8">
          <h1 className="text-2xl">New Value Partner</h1>
        </header>

        <section>
          <form onSubmit={handleCreate}>
            <div className="font-montserrat flex flex-col gap-y-8">
              <div>
                <label htmlFor="category_partner_id">Category Partner</label>
                <select
                  name="category_partner_id"
                  className="form-input mt-2 block w-full px-4 py-3 border-2 rounded-lg"
                >
                  <option value="3">Anything</option>
                </select>
                {validationErrors.category_partner_id && (
                  <small className="text-red-500">{validationErrors.category_partner_id[0]}</small>
                )}
              </div>

              <div>
                <label htmlFor="brand_name">Brand Name</label>
                <input
                  className="form-input mt-2 block w-full px-4 py-3 border-2 rounded-lg"
                  name="brand_name"
                  type="text"
                  placeholder="Brand name.."
                />
                {validationErrors.brand_name && (
                  <small className="text-red-500">{validationErrors.brand_name[0]}</small>
                )}
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <input
                  className="form-input mt-2 block w-full px-4 py-3 border-2 rounded-lg"
                  name="email"
                  type="text"
                  placeholder="Email"
                />
                {validationErrors.email && (
                  <small className="text-red-500">{validationErrors.email[0]}</small>
                )}
              </div>

              <div>
                <label htmlFor="phone_number">Phone Number</label>
                <input
                  className="form-input mt-2 block w-full px-4 py-3 border-2 rounded-lg"
                  name="phone_number"
                  type="text"
                  placeholder="Phone number"
                />
                {validationErrors.phone_number && (
                  <small className="text-red-500">{validationErrors.phone_number[0]}</small>
                )}
              </div>

              <div>
                <label htmlFor="logo">Logo</label>
                <input
                  className="form-input mt-2 block w-full px-4 py-3 border-2 rounded-lg"
                  name="logo"
                  type="file"
                  accept="image/jpeg,image/png,image/jpg,image/gif,image/svg+xml"
                />
                {validationErrors.logo && (
                  <small className="text-red-500">{validationErrors.logo[0]}</small>
                )}
              </div>
            </div>

            <div className="mt-12 flex justify-center gap-x-12 font-medium">
              <button
                disabled={isProcessing}
                className="hover:bg-primary hover:text-white transition-all py-1.5 rounded-lg border-2 px-12 disabled:opacity-50"
              >
                {isProcessing ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
