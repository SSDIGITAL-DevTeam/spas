import { JSX, useEffect, useState, FormEvent } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import ApiError from "@/errors/ApiError";
import EventModule from "@/modules/EventModule";
import { useBreadcrumb } from "@/context/BreadcrumbContext";
import { Button } from "@nextui-org/react";
import toast from "react-hot-toast";

type Errors = { name?: string[]; description?: string[]; start_date?: string[]; end_date?: string[] };

export default function CreateEvent(): JSX.Element {
  const router = useRouter();
  const { setBreadcrumbs } = useBreadcrumb();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    setBreadcrumbs([
      { label: "Dashboard", href: "/" },
      { label: "Events", href: "/events" },
      { label: "New Event" },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrors({});
    try {
      await new EventModule().store(new FormData(e.currentTarget));
      toast.success("Event created.");
      router.push("/events");
    } catch (error) {
      const err = error as ApiError;
      setErrors((err.getValidationErrors?.() as Errors) ?? {});
      toast.error(err.getFirstError?.() ?? "Something went wrong.");
    } finally {
      setIsProcessing(false);
    }
  };

  const inputClass = "w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary";

  return (
    <>
      <Head><title>SPAS | New Event</title></Head>

      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-800">New Event</h1>
        <p className="text-sm text-slate-500 mt-0.5">Create a new event</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Event Name <span className="text-red-500">*</span>
            </label>
            <input name="name" type="text" placeholder="Event name..." className={inputClass} />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name[0]}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea
              name="description"
              rows={6}
              placeholder="Event description..."
              className={`${inputClass} resize-y min-h-[140px]`}
            />
            {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description[0]}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input name="start_date" type="date" className={inputClass} />
              {errors.start_date && <p className="mt-1 text-xs text-red-500">{errors.start_date[0]}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                End Date <span className="text-red-500">*</span>
              </label>
              <input name="end_date" type="date" className={inputClass} />
              {errors.end_date && <p className="mt-1 text-xs text-red-500">{errors.end_date[0]}</p>}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" color="primary" size="sm" isLoading={isProcessing}>
              Save Event
            </Button>
            <Button variant="flat" size="sm" onPress={() => router.push("/events")} isDisabled={isProcessing}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
