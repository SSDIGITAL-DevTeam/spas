import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

const ModalApproved = (props: any) => {
  const { isOpen, setIsOpen } = props;

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
        className={`fixed  h-screen inset-0 backdrop-blur-[2px] transition-opacity ${
          isOpen
            ? "opacity-100 duration-300 ease-out bg-black/50"
            : "opacity-0 duration-200 ease-in"
        }`}
      ></div>

      <div className="pointer-events-none fixed md:top-0 lg:top-20 -top-4 inset-0 z-10">
        <div className="flex h-full md:h-3/4 items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
          <div
            className={`pointer-events-auto relative z-20 transform md:w-1/4 overflow-hidden bg-white text-left shadow-xl transition-all rounded-xl ${
              isOpen
                ? "translate-y-0 opacity-100 duration-300 ease-out sm:scale-100"
                : "translate-y-4 opacity-0 duration-200 ease-in sm:translate-y-0 sm:scale-95"
            }`}
          >
            <div className="flex bg-white w-full">
              <div className="w-full">
                <div className="flex flex-col p-4 md:p-8 gap-y-6">
                  <div>
                    <FaCheckCircle className="md:w-12 md:h-12 text-green-500" />
                  </div>
                  <h2 className="lg:text-2xl text-xl font-bold md:w-full text-primary">
                    Approved
                  </h2>
                  <p className="font-semibold">
                    Temporary account will be sent to user registered email
                    address
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalApproved;
