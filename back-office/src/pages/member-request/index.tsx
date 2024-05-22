import { JSX, useEffect } from "react";
import { Tabs, Tab, Button, Image } from "@nextui-org/react";
import AssetLogo from "@/assets/dev/company-logo.png";
import Link from "next/link";
import Head from "next/head";
import { useOperator } from "@/hooks/useOperator";
import { useTherapist } from "@/hooks/useTherapist";
import Loading from "@/components/partials/Loading";
import { useRequestUpdate } from "@/hooks/useRequestUpdate";

export default function MemberRequest(): JSX.Element {
  const { requestUpdate, isRequestUpdateLoading, fetchRequestUpdate } =
    useRequestUpdate();

  const { therapist, isTherapistLoading, fetchTherapist } = useTherapist();

  useEffect(() => {
    fetchRequestUpdate();
    fetchTherapist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getLastPageNumber(page: string | null | undefined) {
    if (!page) {
      return 1; // More concise check for null or undefined
    }

    try {
      const url = new URL(page);
      const params = new URLSearchParams(url.search);
      const pageNumbers = params.getAll("page").map(Number);
      return Math.max(...pageNumbers, 1);
    } catch (error) {
      console.error("Error parsing URL:", error);
      return 1;
    }
  }

  return (
    <>
      <Head>
        <title>SPAS | Member Request Update</title>
      </Head>
      <main>
        <div className="container p-4 md:p-8">
          <h1 className="text-lg md:text-2xl lg:text-4xl font-semibold mb-8 md:mb-12">
            Member Request Update
          </h1>

          <div className="flex w-full flex-col space-y-4 md:space-y-8">
            <Tabs aria-label="Options" color="secondary" className="mx-auto">
              <Tab key="operators" title="Spa Operators" className="relative">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="lg:text-base text-center text-white uppercase bg-secondary">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Logo
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Company Name
                        </th>
                        <th scope="col" className=" px-6 py-3">
                          Contact
                        </th>
                        <th scope="col" className=" px-6 py-3">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td colSpan={5}>
                          {isRequestUpdateLoading && <Loading />}
                        </td>
                      </tr>
                      {requestUpdate?.data
                        .filter((operator) => operator.role === "operator")
                        .map((operator) => (
                          <tr
                            key={operator.brand_name}
                            className="bg-white text-md text-black hover:bg-slate-50 h-max"
                          >
                            <td className="flex justify-center p-4">
                              <img
                                key={operator.brand_name}
                                src={
                                  operator.url_logo_operator
                                    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${operator.url_logo_operator}`
                                    : "no-image.png"
                                }
                                alt={operator.company_name}
                                className="object-cover md:w-20 md:h-20  aspect-square"
                              />
                            </td>
                            <td className="text-center">
                              {operator.company_name}
                            </td>
                            <td className="text-center">
                              {operator.contact_no}
                            </td>
                            <td className="">
                              <div className="w-max mx-auto">
                                <Button
                                  as={Link}
                                  href={`/member-request/operator/${operator.id}`}
                                  radius="sm"
                                  color="secondary"
                                  className=""
                                >
                                  Detail
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </Tab>

              <Tab key="therapist" title="Spa Therapists">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="lg:text-base text-center text-white uppercase bg-secondary">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Profile Picture
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Full Name
                        </th>
                        <th scope="col" className=" px-6 py-3">
                          Contact
                        </th>
                        <th scope="col" className=" px-6 py-3">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td colSpan={5}>{isTherapistLoading && <Loading />}</td>
                      </tr>
                      {requestUpdate?.data
                        .filter((therapist) => therapist.role === "therapist")
                        .map((therapists) => (
                          <tr
                            key={therapists.id}
                            className="bg-white text-md text-black hover:bg-slate-50 h-max"
                          >
                            <td className="flex justify-center p-4">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                key={therapists.id}
                                src={
                                  therapists.url_logo_therapist
                                    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${therapists.url_logo_therapist}`
                                    : "/no-image.png"
                                }
                                alt={therapists.name}
                                className="object-cover md:w-20 md:h-20 aspect-square "
                              />
                            </td>
                            <td className="text-center">{therapists.name}</td>
                            <td className="text-center">
                              {therapists.contact_no}
                            </td>
                            <td className="">
                              <div className="w-max mx-auto">
                                <Button
                                  as={Link}
                                  href={`/member-request/therapist/${therapists.id}`}
                                  radius="sm"
                                  color="secondary"
                                  className=""
                                >
                                  Detail
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </main>
    </>
  );
}
