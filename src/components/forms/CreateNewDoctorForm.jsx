import { backendURL } from "@/config/config";

import { setDoctor, setPatient } from "@/features/auth/clinicSlice";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import FormLoader from "../loaders/FormLoader";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
const CreateNewDoctorForm = ({ closeModal }) => {
  const [name, setName] = useState("");
  const [dni, setDni] = useState("");
  const [job, setJob] = useState("");
  const [sex, setSex] = useState("Hombre");

  const [base64Image, setBase64Image] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFormSuccess, setIsFormSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  console.log(base64Image);


  const dispatch = useDispatch();
  const resetValues = () => {
    setName("");
    setDni("");
    setBase64Image("");
    setJob("");
    setSex("Hombre");
  };

  const handleSexChange = (event) => {
    setSex(event.target.value);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const base64 = e.target.result;
      setBase64Image(base64);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await axios

      .post(
        `${backendURL}/api/v1/clinic/doctor/registerDoctor`,
        { dni: dni, names: name, job: job, sexo: sex,profileImage:base64Image },
        { withCredentials: "include" }
      )
      .then(({ data }) => dispatch(setDoctor(data.doctor)))
      .then(() => setIsLoading(false))
      .then(() => setIsFormSuccess(true))
      .then(() => resetValues())

      .then(() => setTimeout(() => closeModal(), 2000))
      .catch((e) => setIsError(true))
      .finally(() => setIsLoading(false));
  };
  return (
    <div className="fixed top-0 right-0 left-0 z-50 h-full overflow-y-auto overflow-x-hidden md:inset-0 md:h-full items-center justify-center flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80  xd">
      <div className="relative h-full w-full p-4  max-w-lg">
        <div className="relative rounded-lg bg-white shadow ">
          <div className="flex items-start justify-between rounded-t  border-b p-5">
            <h3 class="text-xl font-medium text-gray-900">
              Nuevo Doctor
            </h3>
            <button
              onClick={closeModal}
              aria-label="Close"
              className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 "
              type="button"
            >
              <svg
                stroke="currentColor"
                fill="none"
                stroke-width="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-5 w-5"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div className="p-6  md:h-full overflow-y-auto ">
            <form
              onSubmit={handleSubmit}
              className="p-6 flex flex-col justify-center"
            >
              <div className="flex flex-col">
                <label htmlFor="name" className="hidden">
                  Nombres
                </label>
                <input
                  required
                  type="name"
                  value={name}
                  onChange={(prev) => setName(prev.target.value)}
                  name="user_name"
                  id="name"
                  placeholder="Nombres"
                  className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400  text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="flex flex-col mt-2">
                <label htmlFor="dni" className="hidden">
                  Dni
                </label>
                <input
                  required
                  value={dni}
                  onChange={(prev) => setDni(prev.target.value)}
                  type="text"
                  name="dni"
                  id="dni"
                  maxLength={8}
                  
                  placeholder="Dni"
                  minLength={8}
                  className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400  text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div className="flex flex-col mt-2">
                <label htmlFor="job" className="hidden">
                  Cargo
                </label>
                <input
                  required
                  value={job}
                  onChange={(prev) => setJob(prev.target.value)}
                  type="text"
                  name="job"
                  id="job"
                  placeholder="Cargo"
                  minLength="8"
                  className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400  text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div className="flex flex-col mt-2">
                <span className=" text-gray-500 mt-4 pb-2 font-semibold pl-2">
                  Sexo
                </span>
                <div class="flex items-center pl-4 border border-gray-200 rounded ">
                  <input
                    type="radio"
                    id="man"
                    value="Hombre"
                    name="sex"
                    checked={sex === "Hombre"}
                    onChange={handleSexChange}
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2"
                  />
                  <label
                    htmlFor="hombre"
                    class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Hombre
                  </label>
                </div>
                <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                  <input
                    type="radio"
                    value="Mujer"
                    name="sex"
                    id="woman"
                    checked={sex === "Mujer"}
                    onChange={handleSexChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2 "
                  />
                  <label
                    htmlFor="mujer"
                    className="w-full py-4 ml-2 text-sm font-medium text-gray-900 "
                  >
                    Mujer
                  </label>
                </div>
              </div>
              <div className="py-8">
                <label
                  class="block mb-2 text-sm font-medium text-gray-900"
                  for="file_input"
                >
                  Subir foto de presentación (Opcional)
                </label>
                <input
                accept="image/png, image/jpeg,image/svg,image/jpg,image/avif"
                  onChange={handleImageUpload}
                  placeholder="ffsd"
                  class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-blue-50 "
                  id="file_input"
                  type="file"
                />
                <p
                  class="mt-1 text-sm text-gray-500 dark:text-gray-300"
                  id="file_input_help"
                >
                  SVG, PNG, JPG o GIF (Max. 500kb).
                </p>
                {base64Image && (
                  <Image
                    className="w-full h-full object-contain rounded-md"
                    width={1000}
                    height={1000}
                    src={base64Image}
                    alt="Uploaded"
                  />
                )}
                {base64Image !== "" && (
                   <div className="flex justify-end mt-4 ">
                   <button onClick={()=>setBase64Image("")} className=" rounded-2xl px-4 py-2 bg-red-500 text-red-50 text-xs">
                     borrar imagen
                   </button>
                 </div>

                )}
               
              </div>

              {isFormSuccess && !isLoading && (
                <button
                  disabled={true}
                  className=" bg-green-400 hover:bg-blue-dark flex justify-center gap-3 text-white font-bold py-3 px-6 rounded-lg mt-3 "
                >
                  Registrado
                  <CheckCircleIcon className="w-6 h-6" />
                </button>
              )}

              {!isFormSuccess && (
                <button
                  type="submit"
                  className=" bg-blue-600 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-blue-700 transition ease-in-out duration-300"
                >
                  {isLoading ? (
                    <div className="w-full flex justify-center">
                      <FormLoader colour={"#FFFF"} className={" w-40 h-8   "} />
                    </div>
                  ) : (
                    "Registrar "
                  )}
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewDoctorForm;
