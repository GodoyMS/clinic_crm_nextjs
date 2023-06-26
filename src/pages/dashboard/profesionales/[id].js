import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { backendURL } from "@/config/config";

import { useSelector } from "react-redux";
import BadgeIcon from "@mui/icons-material/Badge";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import Info from "@/components/patients/Info";
import ClinicHistory from "@/components/patients/ClinicHistory";
import Odontogram from "@/components/patients/Odontogram";
import Consent from "@/components/patients/Consent";

import { FaEdit, FaUserEdit } from "react-icons/fa";
import Image from "next/image";
import Head from "next/head";
import { Tooltip } from "flowbite-react";
import CustomModal from "@/components/customModal/CustomModal";
import UpdateDoctorProfileForm from "@/components/forms/UpdateDoctorProfileForm";

const Doctor = () => {
  const [selectedTab, setSelectedTab] = useState("0");

  const tabs = [
    {
      name: "Perfil",
      id: "0",
    },
    {
      name: "Historial de citas",
      id: "1",
    },
  ];
  const router = useRouter();
  const id = router.query.id;
  const [isLoading, setIsLoading] = useState(false);
  const doctors = useSelector((state) => state.clinic.doctors);

  const currentDoctor = doctors.find((obj) => obj._id === id);

  const [isActiveDoctorImageModal, setIsActiveDoctorImageModal] =
    useState(false);

  return (
    <>
      <Head>
        <title>{currentDoctor ? currentDoctor.names : "Doctor"}</title>
      </Head>
      {currentDoctor && (
        
      <div className=" max-w-lg mx-auto border-b my-4 border-zinc-300 dark:border-zinc-500">
      <UpdateDoctorProfileForm
        idDoctor={currentDoctor._id}
        profileUrl={currentDoctor.profileImage}
        open={isActiveDoctorImageModal}
        onClose={() => setIsActiveDoctorImageModal(false)}
      />

      <ul className="flex flex-wrap justify-center gap-3 -mb-px text-sm font-medium text-center text-zinc-700 dark:text-zinc-400 my-2">
        {tabs.map((e) => (
          <li key={e.key} className="mr-2">
            <button
              onClick={() => setSelectedTab(e.id)}
              className={`${
                selectedTab === e.id
                  ? "text-blue-500  font-bold"
                  : "dark:text-zinc-300 text-zinc-500 "
              } inline-flex p-4 border-b-2 border-transparent rounded-t-lg  hover:text-blue-600 hover:border-blue-300 dark:hover:text-blue-500 group`}
            >
              {e.name}
            </button>
          </li>
        ))}
      </ul>
    </div>

      )}

      {currentDoctor && (
        <div className=" mt-20 max-w-5xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full ">
            <div
              style={{ aspectRatio: " 1 / 1" }}
              className="  relative items-center w-full  "
            >
              <div className=" absolute top-2 right-2">
                <Tooltip
                  animation={"duration-500"}
                  style="auto"
                  content="Reemplazar foto"
                >
                  <button onClick={()=>setIsActiveDoctorImageModal(true)} className=" p-2 rounded-full bg-blue-600 hover:bg-blue-700">
               
                      <FaUserEdit className=" text-white  cursor-pointer h-5 w-5" />
           
                  </button>
                 
                </Tooltip>
              </div>

              <Image
                width={600}
                height={900}
                src={currentDoctor.profileImage}
                className="w-full h-full object-cover rounded"
              />
            </div>
            <div className=" w-full ">
              <div className="flex w-full flex-col gap-5">
                <div className="w-full  bg-white p-5 rounded-lg ">
                  <h3 className="pt-4 text-2xl text-center">
                    {currentDoctor.names}
                  </h3>
                  <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                    <div className="mb-4 md:flex md:justify-between">
                      <div className="mb-4 md:mr-2 md:mb-0">
                        <label
                          class="block mb-2 text-sm font-bold text-gray-700"
                          htmlFor="firstName"
                        >
                          First Name
                        </label>
                        <input
                          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          id="firstName"
                          type="text"
                          placeholder="First Name"
                        />
                      </div>
                      <div className="md:ml-2">
                        <label
                          class="block mb-2 text-sm font-bold text-gray-700"
                          htmlFor="lastName"
                        >
                          Last Name
                        </label>
                        <input
                          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          id="lastName"
                          type="text"
                          placeholder="Last Name"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Email"
                      />
                    </div>
                    <div className="mb-4 md:flex md:justify-between">
                      <div className="mb-4 md:mr-2 md:mb-0">
                        <label
                          className="block mb-2 text-sm font-bold text-gray-700"
                          for="password"
                        >
                          Password
                        </label>
                        <input
                          className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          id="password"
                          type="password"
                          placeholder="******************"
                        />
                        <p className="text-xs italic text-red-500">
                          Please choose a password.
                        </p>
                      </div>
                      <div class="md:ml-2">
                        <label
                          className="block mb-2 text-sm font-bold text-gray-700"
                          htmlFor="c_password"
                        >
                          Confirm Password
                        </label>
                        <input
                          className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          id="c_password"
                          type="password"
                          placeholder="******************"
                        />
                      </div>
                    </div>
                    <div className="mb-6 text-center">
                      <button
                        class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                        type="button"
                      >
                        Register Account
                      </button>
                    </div>
                    <hr class="mb-6 border-t" />
                    <div class="text-center">
                      <a
                        className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                        href="#"
                      >
                        Forgot Password?
                      </a>
                    </div>
                    <div className="text-center">
                      <a
                        className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                        href="./index.html"
                      >
                        Already have an account? Login!
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* {currentDoctor && (
        <>
          {selectedTab === tabs[0].id && <Info data={currentDoctor} />}
          {selectedTab === tabs[1].id && (
            <ClinicHistory data={currentDoctor} />
          )}
          {selectedTab === tabs[2].id && <Odontogram data={currentDoctor} />}
          {selectedTab === tabs[3].id && <Consent data={currentDoctor} />}
        </>
      )} */}
    </>
  );
};

export default Doctor;
