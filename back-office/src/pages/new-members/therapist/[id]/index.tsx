import Link from "next/link";
import { FormEvent, JSX, useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Button, Image, Input } from "@nextui-org/react";
import Loading from "@/components/partials/Loading";
import TherapistModule from "@/modules/TherapistModule";
import { Therapist } from "@/@types";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import toast from "react-hot-toast";
import TherapistRejected from "@/components/modals/RejectTherapist";

export default function DetailMember(): JSX.Element {
  const [singleTherapist, setSingleTherapist] = useState<Therapist>(
    {} as Therapist
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isApprove, setIsApprove] = useState<boolean>(false);
  const [therapistId, setThearpistId] = useState<number>(0);
  const [selectedTherapistId, setSelectedTherapistId] = useState<number | null>(
    null
  );
  const [isOpenRejected, setIsOpenRejected] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const fetchSingleTherapist = async () => {
      setIsLoading(true);

      try {
        const res = await new TherapistModule().singleTherapist(
          +router.query.id!
        );
        setSingleTherapist(res.data);
        setIsLoading(true);

        // console.log(setSingleTherapist);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchSingleTherapist();
  }, [router]);

  const handleStatusMember = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Menjalankan permintaan PATCH untuk memperbarui status member
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/therapists/${therapistId}`,
        {
          status: isApprove ? "approve" : "pending",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME || ""
            )}`,
          },
        }
      );

      // Menjalankan permintaan untuk mengirim email
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/send-mail-therapist/${therapistId}`,
        {}, // Body data kosong karena tidak memerlukan data tambahan untuk mengirim email
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME || ""
            )}`,
          },
        }
      );
    } catch (error) {
      console.error("Error during PATCH request:", error);
    }

    // Tutup modal
    toast("Therapist has been approved.", {
      icon: "✅",
      style: {
        backgroundColor: "#F4B202",
        color: "#ffffff",
        paddingBlock: 12,
      },
    });
    router.push("/member-lists");
  };

  return (
    <>
      <Head>
        <title>SPAS | {singleTherapist.name}</title>
      </Head>
      <main>
        <header className="mb-8 md:mb-12">
          <Link
            href={"/new-members"}
            className="flex gap-x-4 items-center w-max"
          >
            <div className="bg-secondary p-2 rounded-md">
              <FaChevronLeft className="w-4 h-4 md:w-8 md:h-8 text-white" />
            </div>
            <span className="text-base md:text-2xl lg:text-3xl">
              Back to New Member Lists
            </span>
          </Link>
        </header>

        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <section className="container p-4 md:p-8">
              <h1 className="text-lg md:text-2xl lg:text-3xl font-semibold mb-8 md:mb-12">
                Detail Therapist
              </h1>

              <div className="flex flex-col md:flex-row justify-between mb-8 md:mb-12 md:gap-x-10">
                <div className="md:w-1/2 space-y-4 md:space-y-8">
                  <div className="md:space-y-8">
                    <h2 className="md:text-lg lg:tex-xl font-bold mb-4 md:mb-8">
                      Personal Information
                    </h2>

                    <label htmlFor="">Profile Picture</label>

                    <div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        key={singleTherapist.id}
                        src={
                          singleTherapist.cover
                            ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${singleTherapist.cover.url}`
                            : "/no-image.png"
                        }
                        alt={singleTherapist.name}
                        className="object-cover w-80"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="">Full Name</label>

                    <div className="border-2 p-2">
                      <span className="pl-2">{singleTherapist.name}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="">Passport/Fin No.</label>

                    <div className="border-2 p-2">
                      <span className="pl-2">
                        {singleTherapist.passport_finno}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="">Email</label>

                    <div className="border-2 p-2">
                      <span className="pl-2">
                        {singleTherapist.user?.email}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="">Date of Birth</label>

                    <div className="border-2 p-2">
                      <span className="pl-2">
                        {singleTherapist.date_of_birth}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="">Sex</label>

                    <div className="border-2 p-2">
                      <span className="pl-2">{singleTherapist.sex}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="">Contact No.</label>

                    <div className="border-2 p-2">
                      <span className="pl-2">{singleTherapist.contact_no}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="">Nationality</label>

                    <div className="border-2 p-2">
                      <span className="pl-2">
                        {singleTherapist.nationality}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="md:w-1/2 space-y-4 md:space-y-8">
                  <div className="md:space-y-8">
                    <h2 className="md:text-lg lg:tex-xl font-bold mb-4 md:mb-8">
                      Professional Certificate
                    </h2>

                    <label htmlFor="">Certificate</label>

                    <div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        key={singleTherapist.id}
                        src={
                          singleTherapist.professional_certs
                            ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${singleTherapist.professional_certs}`
                            : "/no-image.png"
                        }
                        alt={singleTherapist.name}
                        className="object-cover w-80"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="">Certificate Name</label>

                    <div className="border-2 p-2">
                      <span className="pl-2">{singleTherapist.name_cert}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="">Issuing Organization</label>

                    <div className="border-2 p-2">
                      <span className="pl-2">
                        {singleTherapist.issuing_organization}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="">Issue Date</label>

                    <div className="border-2 p-2">
                      <span className="pl-2">
                        {singleTherapist.date_of_issue}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="">Expiration Date</label>

                    <div className="border-2 p-2">
                      <span className="pl-2">
                        {singleTherapist.expired_date}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="">Credental ID</label>

                    <div className="border-2 p-2">
                      <span className="pl-2">
                        {singleTherapist.credential_id}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="w-max mx-auto">
                <div className="flex flex-col md:flex-row gap-x-10 gap-y-4">
                  <Button
                    onClick={() => {
                      setSelectedTherapistId(singleTherapist.id);
                      setIsOpenRejected(!isOpenRejected);
                    }}
                    color="danger"
                    size="lg"
                  >
                    Reject
                  </Button>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setThearpistId(singleTherapist.id);
                      setIsApprove(true);
                      handleStatusMember(e);
                    }}
                  >
                    <Button
                      type="submit"
                      color="secondary"
                      size="lg"
                      onClick={() => {
                        setThearpistId(singleTherapist.id);
                        setIsApprove(true);
                      }}
                    >
                      Approve
                    </Button>
                  </form>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>
      <TherapistRejected
        isOpen={isOpenRejected}
        setIsOpen={setIsOpenRejected}
        therapistId={selectedTherapistId}
      />
    </>
  );
}
