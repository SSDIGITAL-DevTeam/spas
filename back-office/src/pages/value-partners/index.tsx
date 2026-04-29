import { JSX, useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import Loading from "@/components/partials/Loading";
import AssetEdit from "@/assets/svg/asset-edit.svg";
import AssetDelete from "@/assets/svg/asset-delete.svg";
import ApiError from "@/errors/ApiError";
import Modal from "@/components/partials/Modal";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { ValuePartner } from "@/@types";
import ValuePartnerModule from "@/modules/ValuePartnerModule";
import { useValuePartner } from "@/hooks/useValuePartner";
import { Input } from "@nextui-org/react";

export default function ValuePartners(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedPartnerId, setSelectedPartnerId] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const router = useRouter();

  const { valuePartners, isValuePartnerLoading, fetchValuePartner } =
    useValuePartner();

  useEffect(() => {
    fetchValuePartner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = event.target.value;
    setSearchQuery(query);
    await fetchValuePartner("1", query);
  };

  const handleDeleteValuePartner = async (id: number): Promise<void> => {
    setIsDeleting(true);
    try {
      await new ValuePartnerModule().destroy(id);
      toast("Value Partner Deleted", {
        icon: "✅",
        style: {
          backgroundColor: "#F4B202",
          color: "#ffffff",
          paddingBlock: 12,
        },
      });
    } catch (error) {
      const err = error as ApiError;
      toast(err.getFirstError(), {
        icon: "🚫",
        style: {
          backgroundColor: "#D81222",
          color: "#ffffff",
          paddingBlock: 12,
        },
      });
    } finally {
      setIsOpen(false);
      setIsDeleting(false);
      router.reload();
    }
  };

  return (
    <>
      <Head>
        <title>SPAS | Value Partner</title>
      </Head>

      <main>
        <header className="mb-4 flex flex-col items-start justify-between md:flex-row md:items-center gap-y-4">
          <div>
            <h2 className="mb-4 text-4xl">Value Partners</h2>
            <p>You can add, update and delete Value Partner here</p>
          </div>

          <Link
            href={`/value-partners/create`}
            className="bg-secondary hover:bg-primary rounded-lg text-white p-2"
          >
            Add New
          </Link>
        </header>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="w-60 pb-5">
            <Input
              name="search"
              placeholder="Search..."
              variant="bordered"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </form>

        <section>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="lg:text-base text-center text-white uppercase bg-secondary">
                <tr>
                  <th scope="col" className="px-6 py-3">Logo</th>
                  <th scope="col" className="px-6 py-3">Brand Name</th>
                  <th scope="col" className="px-6 py-3">Email</th>
                  <th scope="col" className="px-6 py-3">Category</th>
                  <th scope="col" className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={5}>{isValuePartnerLoading && <Loading />}</td>
                </tr>
                {valuePartners?.data.map((partner: ValuePartner) => (
                  <tr
                    className="bg-white text-md text-black hover:bg-secondary hover:text-white h-max"
                    key={partner.id}
                  >
                    <td className="text-center p-4">
                      {partner.logo && (
                        <img
                          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${partner.logo}`}
                          alt={partner.brand_name}
                          className="w-12 h-12 object-cover rounded mx-auto"
                        />
                      )}
                    </td>
                    <td className="text-center px-6 py-4">{partner.brand_name}</td>
                    <td className="text-center px-6 py-4">{partner.email}</td>
                    <td className="text-center px-6 py-4">
                      {partner.category_partner?.name ?? '-'}
                    </td>
                    <td>
                      <div className="flex gap-x-2 p-2 justify-center">
                        <Link href={`/value-partners/partner/${partner.id}`}>
                          <Image
                            className="w-10 cursor-pointer rounded-lg bg-primary p-2.5"
                            src={AssetEdit}
                            alt="Edit"
                          />
                        </Link>

                        <Image
                          onClick={() => {
                            setSelectedPartnerId(partner.id);
                            setIsOpen(true);
                          }}
                          className="w-10 cursor-pointer rounded-lg bg-red-600 p-2.5"
                          src={AssetDelete}
                          alt="Delete"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="relative flex flex-col items-center gap-y-8 p-8 text-center font-bold text-white">
              <p className="text-xl">
                Are you sure you want to delete <br /> this Value Partner?
              </p>
              <div className="flex gap-x-4">
                <button
                  onClick={() => handleDeleteValuePartner(selectedPartnerId)}
                  disabled={isDeleting}
                  className="btn bg-secondary px-8 disabled:opacity-50"
                >
                  {isDeleting ? "Deleting..." : "Yes"}
                </button>
                <button onClick={() => setIsOpen(false)} className="btn">
                  Cancel
                </button>
              </div>
            </div>
          </Modal>
        </section>
      </main>
    </>
  );
}
