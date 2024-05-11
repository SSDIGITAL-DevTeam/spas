import ApiError from "@/errors/ApiError";
import PageModule from "@/modules/PageModule";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, JSX, useState } from "react";
import toast from "react-hot-toast";

type ValidationErrors = {
  status: boolean;
  errors: {
    name: string;
    slug: string;
    key: string;
    value: string;
    content: string;
  };
};

export default function CreatePost(): JSX.Element {
  // router
  const router = useRouter();

  // states
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState(
    {} as ValidationErrors
  );

  // handle create category
  const handleCreateBlog = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    setIsProcessing(true);
    e.preventDefault();

    const form: HTMLFormElement = e.currentTarget;
    const formData: FormData = new FormData(form);
    const submit: SubmitEvent = e.nativeEvent as SubmitEvent;
    const status: HTMLButtonElement = submit.submitter as HTMLButtonElement;

    // console.log(postTags);

    try {
      await new PageModule().store(formData);

      toast("Page Created Successfully", {
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
        <title>SPAS | Create</title>
      </Head>

      <main>
        <Link
          href="/pages"
          className="btn bg-primary rounded-lg text-white px-4 py-2"
        >
          Back
        </Link>

        <header className="my-8">
          <h1 className="text-2xl">New Pages</h1>
        </header>

        <section className="mx-auto max-w-3xl">
          <form onSubmit={(e) => handleCreateBlog(e)}>
            <div className="font-montserrat flex flex-col gap-y-8">
              {/* title */}
              <div>
                <label htmlFor="name">Pages Name</label>
                <input
                  className="form-input mt-2 block w-full px-4 py-3 border-2 rounded-lg"
                  name="name"
                  type="text"
                  autoComplete="off"
                  placeholder="Name..."
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
                  autoComplete="off"
                  placeholder="Slug..."
                />

                {validationErrors.errors?.slug && (
                  <p className="text-ligh text-[#D81222] mt-2">
                    {validationErrors.errors.slug[0]}
                  </p>
                )}
              </div>
              <h1 className="text-2xl">Additional Meta</h1>
              <div>
                <label htmlFor="key">Attribute</label>
                <input
                  className="form-input mt-2 block w-full px-4 py-3 border-2 rounded-lg"
                  name="key"
                  type="text"
                  autoComplete="off"
                  placeholder="Attribute..."
                />
                <p className="mt-1">
                  The key that the meta tag should use as attribute name, such
                  as name, property or custom attribute.
                </p>

                {validationErrors.errors?.key && (
                  <p className="text-ligh text-[#D81222] mt-2">
                    {validationErrors.errors.key[0]}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="value">Value</label>
                <input
                  className="form-input mt-2 block w-full px-4 py-3 border-2 rounded-lg"
                  name="value"
                  type="text"
                  autoComplete="off"
                  placeholder="Value..."
                />
                <p className="mt-1">
                  The value that the meta tag should use as value of the
                  attribute, such as title, description, og:image, etc.
                </p>
                {validationErrors.errors?.value && (
                  <p className="text-ligh text-[#D81222] mt-2">
                    {validationErrors.errors.value[0]}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="content">Content</label>
                <input
                  className="form-input mt-2 block w-full px-4 py-3 border-2 rounded-lg"
                  name="content"
                  type="text"
                  autoComplete="off"
                  placeholder="Content..."
                />
                <p className="mt-1">
                  The content that the meta tag should use.
                </p>

                {validationErrors.errors?.content && (
                  <p className="text-ligh text-[#D81222] mt-2">
                    {validationErrors.errors.content[0]}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-12 flex justify-center gap-x-12 font-medium">
              <button
                className="hover:bg-primary hover:text-white transition-all py-1.5 rounded-lg border-2 px-12"
                name="status"
                value="PUBLISHED"
              >
                {isProcessing ? "Save..." : "Save"}
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
