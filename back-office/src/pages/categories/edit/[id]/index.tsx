import { Category } from "@/@types";
import Loading from "@/components/partials/Loading";
import ApiError from "@/errors/ApiError";
import CategoryModule from "@/modules/CategoryModule";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  ChangeEvent,
  FormEvent,
  JSX,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";

type ValidationErrors = {
  status: boolean;
  errors: {
    name: string;
  };
};

export default function EditCategory(): JSX.Element {
  // router
  const router = useRouter();

  // states
  const [singleCategory, setSingleCategory] = useState<Category>(
    {} as Category
  );
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState(
    {} as ValidationErrors
  );

  useEffect(() => {
    const fetchSinglePost = async () => {
      try {
        const res = await new CategoryModule().single(+router.query.id!);
        setSingleCategory(res.data);
      } catch (error) {
      } finally {
      }
    };

    fetchSinglePost();
  }, [router]);

  // handle update category
  const handleUpdateCategory = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    setIsProcessing(true);
    e.preventDefault();

    const form: HTMLFormElement = e.currentTarget;
    const formData: FormData = new FormData(form);
    const submit: SubmitEvent = e.nativeEvent as SubmitEvent;
    const status: HTMLButtonElement = submit.submitter as HTMLButtonElement;

    try {
      await new CategoryModule().update(formData, +router.query.id!);

      toast("Category Updated Successfully", {
        icon: "✅",
        style: {
          backgroundColor: "#F4B202",
          color: "#ffffff",
          paddingBlock: 12,
        },
      });

      router.push(`/categories`);
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
        <title>SPAS | Edit - {singleCategory.name}</title>
      </Head>

      <main>
        <Link
          href="/categories"
          className="btn bg-primary rounded-lg text-white px-4 py-2"
        >
          Back
        </Link>

        <header className="my-8">
          <h1 className="text-2xl">Edit Category</h1>
        </header>

        <section className="mx-auto max-w-3xl">
          <form onSubmit={(e) => handleUpdateCategory(e)}>
            <div className="font-montserrat flex flex-col gap-y-8">
              {/* title */}
              <div>
                <label htmlFor="name">Categories Name</label>
                <input
                  className="form-input mt-2 block w-full px-4 py-3 border-2 rounded-lg"
                  name="name"
                  type="text"
                  placeholder="Name..."
                  defaultValue={singleCategory.name}
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
        </section>
      </main>
    </>
  );
}
