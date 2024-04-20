import { JSX } from "react";
import { Tabs, Tab, Button, Image } from "@nextui-org/react";
import AssetLogo from "@/assets/dev/company-logo.png";
import Link from "next/link";

export default function NewMembers(): JSX.Element {
  return (
    <main>
      <div className="container p-4 md:p-8">
        <h1 className="text-lg md:text-2xl lg:text-4xl font-semibold mb-8 md:mb-12">
          Member Lists
        </h1>

        <div className="flex w-full flex-col space-y-4 md:space-y-8">
          <Tabs aria-label="Options" color="secondary" className="mx-auto">
            <Tab key="operators" title="Spa Operators" className="relative">
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
                  {[1, 2, 3, 4, 5].map((operator) => (
                    <tr key={operator}>
                      <td className="flex justify-center p-4">
                        <Image
                          src={AssetLogo.src}
                          removeWrapper
                          alt="Company Logo"
                          className="object-cover"
                        />
                      </td>
                      <td className="text-center">Operators {operator}</td>
                      <td className="text-center">+65 81272829</td>
                      <td className="">
                        <div className="w-max mx-auto">
                          <Button
                            as={Link}
                            href="/member-lists/operator/slug"
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
            </Tab>

            <Tab key="therapist" title="Spa Therapists">
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
                  {[1, 2, 3, 4, 5].map((therapist) => (
                    <tr key={therapist}>
                      <td className="flex justify-center p-4">
                        <Image
                          src={AssetLogo.src}
                          removeWrapper
                          alt="Company Logo"
                          className="object-cover"
                        />
                      </td>
                      <td className="text-center">Therapist {therapist}</td>
                      <td className="text-center">+65 81272829</td>
                      <td className="">
                        <div className="w-max mx-auto">
                          <Button
                            as={Link}
                            href="/member-lists/therapist/slug"
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
            </Tab>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
