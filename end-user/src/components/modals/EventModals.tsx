import { useSingleEvent } from "@/hooks/useSingleEvent";
import moment from "moment";

const EventModals = (props: any) => {
  const { isOpen, setIsOpen, eventId } = props;
  const { singleEvent, isLoading } = useSingleEvent(eventId);

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
            ? "bg-black/50 opacity-100 duration-300 ease-out"
            : "opacity-0 duration-200 ease-in"
        }`}
      ></div>

      <div className="pointer-events-none fixed inset-0 -top-4 z-10 md:top-20 lg:top-28">
        <div className="flex h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 md:h-3/4 ">
          <div
            className={`pointer-events-auto relative z-20 transform overflow-hidden rounded-3xl bg-white  text-left shadow-xl transition-all md:w-1/3 ${
              isOpen
                ? "translate-y-0 opacity-100 duration-300 ease-out sm:scale-100"
                : "translate-y-4 opacity-0 duration-200 ease-in sm:translate-y-0 sm:scale-95"
            }`}
          >
            <div className="flex w-full bg-white ">
              <div className="w-full">
                <div className="flex flex-col p-4 text-left md:p-8">
                  <div className="flex items-center justify-between bg-white">
                    <p className="w-screen py-4 text-xl font-bold md:w-full lg:text-3xl">
                      Events Information
                    </p>
                  </div>
                  <hr />

                  <div className="space-y-5 mt-4">
                    <p className="text-2xl">{singleEvent.name}</p>
                    <p className="break-words">{singleEvent.description}</p>
                    <p>
                      <span className="font-semibold">
                        {moment(singleEvent.start_date).format(
                          "dddd, D MMMM YYYY"
                        )}
                      </span>{" "}
                      -{" "}
                      <span className="font-semibold">
                        {moment(singleEvent.end_date).format(
                          "dddd, D MMMM YYYY"
                        )}
                      </span>
                    </p>
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

export default EventModals;
