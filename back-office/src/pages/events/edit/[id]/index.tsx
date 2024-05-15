import { Event } from "@/@types";
import ApiError from "@/errors/ApiError";
import EventModule from "@/modules/EventModule";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, JSX, useEffect, useState } from "react";
import toast from "react-hot-toast";

type ValidationErrors = {
  status: boolean;
  errors: {
    name: string;
    description: string;
    start_date: string;
    end_date: string;
  };
};

export default function EditEvent(): JSX.Element {
  // router
  const router = useRouter();

  // states
  const [singleEvent, setSingleEvent] = useState<Event>({} as Event);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState(
    {} as ValidationErrors
  );
  console.log(singleEvent);

  useEffect(() => {
    const fetchSinglePost = async () => {
      try {
        const res = await new EventModule().single(+router.query.id!);
        setSingleEvent(res.data);
      } catch (error) {
      } finally {
      }
    };

    fetchSinglePost();
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
      await new EventModule().update(formData, +router.query.id!);

      toast("Event Updated Successfully", {
        icon: "✅",
        style: {
          backgroundColor: "#F4B202",
          color: "#ffffff",
          paddingBlock: 12,
        },
      });

      router.push(`/events`);
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
        <title>SPAS | Edit - {singleEvent.name}</title>
      </Head>

      <main>
        <Link
          href="/events"
          className="btn bg-primary rounded-lg text-white px-4 py-2"
        >
          Back
        </Link>

        <header className="my-8">
          <h1 className="text-2xl">Edit Event</h1>
        </header>

        <section className="mx-auto max-w-3xl">
          <form onSubmit={(e) => handleCreateBlog(e)}>
            <div className="font-montserrat flex flex-col gap-y-8">
              {/* title */}
              <div>
                <label htmlFor="name">Events Name</label>
                <input
                  className="form-input mt-2 block w-full px-4 py-3 border-2 rounded-lg"
                  name="name"
                  type="text"
                  placeholder="Name..."
                  defaultValue={singleEvent.name}
                />

                {validationErrors.errors?.name && (
                  <p className="text-ligh text-[#D81222] mt-2">
                    {validationErrors.errors.name[0]}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="description">Description</label>
                <textarea
                  className="form-input mt-2 block w-full px-4 py-3 border-2 rounded-lg"
                  name="description"
                  placeholder="Description..."
                  defaultValue={singleEvent.description}
                />

                {validationErrors.errors?.description && (
                  <p className="text-ligh text-[#D81222] mt-2">
                    {validationErrors.errors.description[0]}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="start_date">Start Date</label>
                <input
                  className="form-input mt-2 block w-full px-4 py-3 border-2 rounded-lg"
                  name="start_date"
                  type="date"
                  placeholder="Start Date..."
                  defaultValue={singleEvent?.start_date?.split(" ")[0]}
                  // value={
                  //   singleEvent.start_date
                  //     ? singleEvent.start_date.split(" ")[0]
                  //     : ""
                  // }
                />

                {validationErrors.errors?.start_date && (
                  <p className="text-ligh text-[#D81222] mt-2">
                    {validationErrors.errors.start_date[0]}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="end_date">End Date</label>
                <input
                  className="form-input mt-2 block w-full px-4 py-3 border-2 rounded-lg"
                  name="end_date"
                  type="date"
                  placeholder="Start Date..."
                  defaultValue={singleEvent?.end_date?.split(" ")[0]}
                  // value={
                  //   singleEvent.end_date
                  //     ? singleEvent.end_date.split(" ")[0]
                  //     : ""
                  // }
                />

                {validationErrors.errors?.end_date && (
                  <p className="text-ligh text-[#D81222] mt-2">
                    {validationErrors.errors.end_date[0]}
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
