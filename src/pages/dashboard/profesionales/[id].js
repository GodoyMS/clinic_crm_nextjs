import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { backendURL } from "@/config/config";

import { useDispatch, useSelector } from "react-redux";
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
import { useEffect } from "react";
import SuccessToast from "@/components/toast/SuccessToast";
import { setDoctor, updateDoctorById } from "@/features/auth/clinicSlice";
import FormLoader from "@/components/loaders/FormLoader";

const Doctor = React.memo(() => {
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
  const [isError, setIsError] = useState(false);
  const [isFormSuccess, setIsFormSuccess] = useState(false);

  const doctors = useSelector((state) => state.clinic.doctors);

  const currentDoctor = doctors.find((obj) => obj._id === id);
  const [names, setNames] = useState("");
  const [job, setJob] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [dni, setDni] = useState("");
  const [showPassWord, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentDoctor?.names) setNames(currentDoctor?.names);
    if (currentDoctor?.job) setJob(currentDoctor?.job);
    if (currentDoctor?.age) setAge(currentDoctor?.age);
    if (currentDoctor?.email) setEmail(currentDoctor?.email);
    if (currentDoctor?.phone) setPhone(currentDoctor?.phone);
    if (currentDoctor?.city) setCity(currentDoctor?.city);
    if (currentDoctor?.password) setPassword(currentDoctor?.password);
    if (currentDoctor?.dni) setDni(currentDoctor?.dni);
  }, []);

  const [isActiveDoctorImageModal, setIsActiveDoctorImageModal] = useState(
    false
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await axios

      .put(
        `${backendURL}/api/v1/clinic/doctor/updateClinicDoctorProfileInfo/${currentDoctor?._id}`,
        { names, job, age, city, phone, email },
        { withCredentials: "include" }
      )
      .then(({ data }) => dispatch(updateDoctorById(data.doctor)))
      .then(() => setIsLoading(false))
      .then(() => setIsFormSuccess(true))

      .then(() => setTimeout(() => setIsFormSuccess(false), 2000))
      .catch((e) => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Head>
        <title>{currentDoctor ? currentDoctor.names : "Doctor"}</title>
      </Head>

      <SuccessToast
        open={isFormSuccess}
        message={"Actualizado"}
        setOpen={setIsFormSuccess}
      />
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
              className="  relative items-center  self-center w-full  "
            >
              <div className=" absolute top-2 right-2">
                <Tooltip
                  animation={"duration-500"}
                  style="auto"
                  content="Reemplazar foto"
                >
                  <button
                    onClick={() => setIsActiveDoctorImageModal(true)}
                    className=" p-2 rounded-full bg-blue-600 hover:bg-blue-700"
                  >
                    <FaUserEdit className=" text-white  cursor-pointer h-5 w-5" />
                  </button>
                </Tooltip>
              </div>

              <Image
                alt=""
                width={600}
                height={900}
                src={currentDoctor.profileImage}
                className="w-full h-full object-cover rounded"
              />
            </div>
            <div className=" w-full pb-10 ">
              <div className="flex w-full flex-col gap-5">
                <div className="w-full  bg-white p-5 rounded-lg ">
                  <h3 className="pt-4 text-2xl text-center">{names}</h3>
                  <form
                    onSubmit={handleSubmit}
                    className="px-0 md:px-8 pt-6  mb-4 bg-white rounded"
                  >
                    <div className="mb-4">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="names"
                      >
                        Nombres
                      </label>
                      <input
                        value={names}
                        onChange={(e) => setNames(e.target.value)}
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="names"
                        type="names"
                        required
                        placeholder="Nombres"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="job"
                      >
                        Cargo
                      </label>
                      <input
                        value={job}
                        onChange={(e) => setJob(e.target.value)}
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="job"
                        required
                        type="text"
                        placeholder="Médico cirujano"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="phone"
                      >
                        Teléfono (Whatsapp)
                      </label>
                      <input
                      required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="phone"
                        type="number"
                        maxLength={8}
                        placeholder="987 271 213"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="email"
                      >
                        Correo electrónico
                      </label>
                      <input
                      required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="ejemplo@gmail.com"
                      />
                    </div>
                    <div className="mb-4 md:flex md:justify-between">
                      <div className="md:ml-2">
                        <label
                          class="block mb-2 text-sm font-bold text-gray-700"
                          htmlFor="age"
                        >
                          Edad
                        </label>
                        <input
                          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          id="age"
                          type="number"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          required
                          placeholder="28"
                        />
                      </div>
                      <div className="mb-4 md:mr-2 md:mb-0">
                        <label
                          class="block mb-2 text-sm font-bold text-gray-700"
                          htmlFor="city"
                        >
                          Ciudad
                        </label>
                        <input
                          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          id="city"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          type="text"
                          placeholder="First Name"
                        />
                      </div>
                    </div>

                    <div className="mb-4 md:flex md:justify-between">
                      <div className="mb-4 md:mr-2 md:mb-0">
                        <label
                          className="block mb-2 text-sm font-bold text-gray-700"
                          htmlFor="password"
                        >
                          Contraseña
                        </label>
                        <input
                          value={password}
                          disabled={true}
                          className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-gray-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          id="password"
                          type={showPassWord ? "text" : "password"}
                          placeholder="******************"
                        />

                        <div class="flex items-center">
                          <input
                            checked={showPassWord}
                            id="checked-checkbox"
                            type="checkbox"
                            onChange={() => setShowPassword(!showPassWord)}
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                          />
                          <label
                            htmlFor="checked-checkbox"
                            class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Mostrar contraseña
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="mb-6 text-center">
                      <button
                        disabled={isLoading}
                        class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                        type="submit"
                      >
                        {isLoading ? (
                          <div className=" flex justify-center">
                            <FormLoader
                              colour={"white"}
                              className={"w-40 h-6"}
                            />
                          </div>
                        ) : (
                          "Guardar información"
                        )}
                      </button>
                    </div>

                    {isError  && <p className=" text-center mt-4 font-sans text-red-600  text-sm">Ocurrió un error</p>}
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
});

export default Doctor;
