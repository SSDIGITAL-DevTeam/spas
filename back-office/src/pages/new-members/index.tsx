import { JSX, useEffect } from "react";
import { Tabs, Tab, Button, Image } from "@nextui-org/react";
import AssetLogo from "@/assets/dev/company-logo.png";
import Link from "next/link";
import Head from "next/head";
import { useOperator } from "@/hooks/useOperator";
import Loading from "@/components/partials/Loading";
import { useTherapist } from "@/hooks/useTherapist";

export default function NewMembers(): JSX.Element {
  const { operator, isOperatorLoading, fetchOperator } = useOperator();

  const { therapist, isTherapistLoading, fetchTherapist } = useTherapist();

  useEffect(() => {
    fetchOperator();
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
        <title>SPAS | New Members</title>
      </Head>
      <main>
        <div className="container p-4 md:p-8">
          <h1 className="text-lg md:text-2xl lg:text-4xl font-semibold mb-8 md:mb-12">
            New Members
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
                        <td colSpan={5}>{isOperatorLoading && <Loading />}</td>
                      </tr>
                      {operator?.data
                        .filter((operator) => operator.status === "pending")
                        .map((operators, index) => (
                          <tr
                            key={operators.id}
                            className="bg-white text-md text-black hover:bg-secondary hover:text-white h-max"
                          >
                            <td className="flex justify-center p-4">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                key={operators.id}
                                src={
                                  operators.cover
                                    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${operators.cover.url}`
                                    : "/no-image.png"
                                }
                                alt={operators.company_name}
                                className="object-cover w-40"
                              />
                            </td>
                            <td className="text-center">
                              {operators.company_name}
                            </td>
                            <td className="text-center">
                              {operators.contact_no}
                            </td>
                            <td className="">
                              <div className="w-max mx-auto">
                                <Button
                                  as={Link}
                                  href={`/new-members/operator/${operators.id}`}
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
                      {therapist?.data
                        .filter((therapist) => therapist.status === "pending")
                        .map((therapists, index) => (
                          <tr
                            key={therapists.id}
                            className="bg-white text-md text-black hover:bg-secondary hover:text-white h-max"
                          >
                            <td className="flex justify-center p-4">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                key={therapists.id}
                                src={
                                  therapists.cover
                                    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${therapists.cover.url}`
                                    : "/no-image.png"
                                }
                                alt={therapists.name}
                                className="object-cover w-40"
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
                                  href={`/new-members/therapist/${therapists.id}`}
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
