import axios from "axios";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoMdCloseCircle } from "react-icons/io";

const ModalRejected = (props: any) => {
  const { isOpen, setIsOpen, operatorId } = props;

  const router = useRouter();

  const handleRejectMember = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const inputs = document.getElementsByTagName("input");

      for (let i = 0; i < inputs.length; i++) {
        formData.append(inputs[i].name, inputs[i].value);
      }

      // Menjalankan permintaan untuk mengirim email
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/reject-operator/${operatorId}`,
        formData,
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
    toast("Send Issue Successfully", {
      icon: "✅",
      style: {
        backgroundColor: "#F4B202",
        color: "#ffffff",
        paddingBlock: 12,
      },
    });
    router.push("/new-members");
  };

  return (
    <div
      className={`relative text-[#2B2B2B] ${
        isOpen
          ? "pointer-events-auto z-40"
          : "pointer-events-none invisible z-20"
      }`}
      //   aria-labelledby="modal-title"
      //   role="dialog"
      //   aria-modal="true"
    >
      <div
        onClick={() => {
          setIsOpen(false);
        }}
        className={`fixed inset-0 backdrop-blur-[2px] transition-opacity ${
          isOpen
            ? "opacity-100 duration-300 ease-out bg-black/50"
            : "opacity-0 duration-200 ease-in"
        }`}
      ></div>

      <div className="pointer-events-none fixed md:top-0 lg:top-20 -top-4 inset-0 z-10">
        <div className="flex h-full md:h-3/4 items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
          <div
            className={`pointer-events-auto relative z-20 transform md:w-2/4 overflow-hidden bg-white text-left shadow-xl transition-all rounded-xl ${
              isOpen
                ? "translate-y-0 opacity-100 duration-300 ease-out sm:scale-100"
                : "translate-y-4 opacity-0 duration-200 ease-in sm:translate-y-0 sm:scale-95"
            }`}
          >
            <form onSubmit={handleRejectMember} className="space-x-4">
              <div className="flex bg-white w-full">
                <div className="w-full">
                  <div className="flex flex-col p-4 md:p-8 gap-y-6">
                    <div>
                      <IoMdCloseCircle className="md:w-14 md:h-14 text-red-500" />
                    </div>
                    <h2 className="lg:text-2xl text-xl font-bold md:w-full text-primary">
                      Reject
                      {/* <p>Operator ID: {operatorId}</p> */}
                    </h2>

                    <div>
                      <input
                        type="text"
                        placeholder="Provide issue"
                        name="provide_issue"
                        className="pl-2 py-2 focus:outline-none border w-full"
                      />
                    </div>
                    <p className="font-semibold">
                      Rejected Issue will be sent to user registered email
                      address
                    </p>
                    <div>
                      <button
                        onClick={() => {
                          setIsOpen(false);
                        }}
                        type="submit"
                        className="bg-[#212529] text-white text-center py-2 hover:bg-white hover:text-black border-2 transition-all ease-in-out rounded-full w-full"
                      >
                        Send Issue
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalRejected;
