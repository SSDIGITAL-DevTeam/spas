import AssetSuccess from "@/assets/images/success2.gif";
// import Image from "next/image";
const FormSuccess = (props: any) => {
  const { openSuccess, setOpenSuccess } = props;

  return (
    <div
      className={`relative text-black ${
        openSuccess
          ? "pointer-events-auto z-40"
          : "pointer-events-none invisible z-20"
      }`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={() => {
          setOpenSuccess(false);
        }}
        className={`fixed inset-0 backdrop-blur-[2px] transition-opacity ${
          openSuccess
            ? "opacity-100 duration-300 ease-out bg-black/50"
            : "opacity-0 duration-200 ease-in"
        }`}
      ></div>

      <div className="pointer-events-none fixed md:top-0 lg:top-20 -top-4 inset-0 z-10">
        <div className="flex h-3/4 items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
          <div
            className={`pointer-events-auto relative z-20 transform lg:w-[500px] md:w-[400px] overflow-hidden  bg-white rounded-md text-left shadow-xl transition-all  ${
              openSuccess
                ? "translate-y-0 opacity-100 duration-300 ease-out sm:scale-100"
                : "translate-y-4 opacity-0 duration-200 ease-in sm:translate-y-0 sm:scale-95"
            }`}
          >
            <div className="flex max-h-[480px] bg-white w-full overflow-hidden md:overflow-auto  overflow-y-scroll">
              <div className="w-full">
                <div className="flex flex-col px-4 lg:pt-20 pb-10 lg:pb-32">
                  <div className=" items-center w-full  rounded-2xl">
                    <div className="text-center flex flex-col items-center rounded-t-2xl">
                      <img src={AssetSuccess.src} alt="Success" className="" />
                      <span className="text-sm md:text-base lg:text-xl text-primary">
                        Form Submitted
                        {/* E-brochure has been sent to your email */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSuccess;
