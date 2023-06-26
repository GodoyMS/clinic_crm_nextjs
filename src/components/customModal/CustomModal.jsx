import { Modal } from "flowbite-react";
import React from "react";

const CustomModal = ({ open, onClose, children, title }) => {
  return (
    <>
      {open && (
        <div className="fixed top-0 right-0 left-0 z-50 h-full  overflow-y-auto  overflow-x-hidden md:inset-0 md:h-full justify-center flex items-center bg-gray-900 bg-opacity-50  xd">
          <div className="relative h-full w-full p-4  max-w-lg">
            <div className="relative rounded-lg bg-white shadow ">
              <div className="flex items-start justify-between rounded-t  border-b p-5">
                <h3 className="text-xl font-medium text-gray-900">{title}</h3>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 "
                  type="button"
                >
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-5 w-5"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="p-6  md:h-full overflow-y-auto ">{children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomModal;
