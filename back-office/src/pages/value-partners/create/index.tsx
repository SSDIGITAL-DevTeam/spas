import ApiError from "@/errors/ApiError";
import CategoryModule from "@/modules/CategoryModule";
import ValuePartnerModule from "@/modules/ValuePartnerModule";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, JSX, useRef, useState } from "react";
import toast from "react-hot-toast";

type ValidationErrors = {
  status: boolean;
  errors: {
    name: string;
  };
};

export default function CreateValuePartner(): JSX.Element {
  // router
  const router = useRouter();

  // states
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState(
    {} as ValidationErrors
  );

  // refs
  const imageRef = useRef<HTMLImageElement | null>(null);

  // handle create category
  const handleCreate = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    setIsProcessing(true);
    e.preventDefault();

    const form: HTMLFormElement = e.currentTarget;
    const formData: FormData = new FormData(form);
    const submit: SubmitEvent = e.nativeEvent as SubmitEvent;
    const status: HTMLButtonElement = submit.submitter as HTMLButtonElement;

    // console.log(postTags);

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
      const validationErrors = err.data as ValidationErrors;
      setValidationErrors(validationErrors);

      // console.log(err.data);

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
        <title>SPAS | Create Value Partner</title>
      </Head>

      <main>
        <Link
          href="/categories"
          className="btn bg-primary rounded-lg text-white px-4 py-2"
        >
          Back
        </Link>

        <header className="my-8">
          <h1 className="text-2xl">New Value Partner</h1>
        </header>

        <section className="">
          <form onSubmit={(e) => handleCreate(e)}>
            <div className="font-montserrat flex flex-col gap-y-8">
              {/* title */}
              <div>
                <label htmlFor="name">Categories Parner</label>
                <select name="category_partner_id">
                  <option value="3">Anything</option>
                </select>
              </div>

              <div>
                <label htmlFor="name">Brand Name</label>
                <input
                  className="form-input mt-2 block w-full px-4 py-3 border-2 rounded-lg"
                  name="brand_name"
                  type="text"
                  placeholder="Brand name.."
                />
              </div>

              <div>
                <label htmlFor="name">Email</label>
                <input
                  className="form-input mt-2 block w-full px-4 py-3 border-2 rounded-lg"
                  name="email"
                  type="text"
                  placeholder="Email"
                />
              </div>

              <div>
                <label htmlFor="name">Phone Number</label>
                <input
                  className="form-input mt-2 block w-full px-4 py-3 border-2 rounded-lg"
                  name="phone_number"
                  type="text"
                  placeholder="Email"
                />
              </div>

              <div>
                <label htmlFor="name">Logo</label>
                <input
                  className="form-input mt-2 block w-full px-4 py-3 border-2 rounded-lg"
                  name="logo"
                  type="file"
                  placeholder="Email"
                />
              </div>
            </div>

            <div className="mt-12 flex justify-center gap-x-12 font-medium">
              <button className="hover:bg-primary hover:text-white transition-all py-1.5 rounded-lg border-2 px-12">
                {isProcessing ? "Save..." : "Save"}
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
