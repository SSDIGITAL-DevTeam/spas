import { Page } from "@/@types";
import ApiError from "@/errors/ApiError";
import PageModule from "@/modules/PageModule";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, JSX, useEffect, useState } from "react";
import toast from "react-hot-toast";

type ValidationErrors = {
  status: boolean;
  errors: {
    name: string;
    slug: string;
  };
};

export default function EditPage(): JSX.Element {
  // router
  const router = useRouter();

  // states
  const [singlePage, setSinglePage] = useState<Page>({} as Page);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState(
    {} as ValidationErrors
  );

  useEffect(() => {
    const fetchSinglePage = async () => {
      try {
        const res = await new PageModule().single(+router.query.id!);
        setSinglePage(res.data);
      } catch (error) {
      } finally {
      }
    };

    fetchSinglePage();
  }, [router]);

  // handle update category
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
      await new PageModule().update(formData, +router.query.id!);

      toast("Page Updated Successfully", {
        icon: "✅",
        style: {
          backgroundColor: "#F4B202",
          color: "#ffffff",
          paddingBlock: 12,
        },
      });

      router.push(`/pages`);
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
        <title>SPAS | Edit - {singlePage.name}</title>
      </Head>

      <main>
        <Link
          href="/pages"
          className="btn bg-primary rounded-lg text-white px-4 py-2"
        >
          Back
        </Link>

        <header className="my-8">
          <h1 className="text-2xl">Edit Pages</h1>
        </header>

        <section className="mx-auto max-w-3xl">
          <form onSubmit={(e) => handleCreateBlog(e)}>
            <div className="font-montserrat flex flex-col gap-y-8">
              {/* title */}
              <div>
                <label htmlFor="name">Name Pages</label>
                <input
                  className="form-input mt-2 block w-full px-4 py-3 border-2 rounded-lg"
                  name="name"
                  type="text"
                  placeholder="Name..."
                  defaultValue={singlePage.name}
                />

                {validationErrors.errors?.name && (
                  <p className="text-ligh text-[#D81222] mt-2">
                    {validationErrors.errors.name[0]}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="slug">Slug</label>
                <input
                  className="form-input mt-2 block w-full px-4 py-3 border-2 rounded-lg"
                  name="slug"
                  type="text"
                  placeholder="Slug..."
                  defaultValue={singlePage.slug}
                />

                {validationErrors.errors?.slug && (
                  <p className="text-ligh text-[#D81222] mt-2">
                    {validationErrors.errors.slug[0]}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-12 flex flex-col justify-center gap-x-12 gap-y-4 font-medium md:flex-row">
              <button className="hover:bg-primary hover:text-white transition-all py-1.5 rounded-lg border-2 px-12">
                {isProcessing ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
