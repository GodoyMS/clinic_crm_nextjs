import React from "react";
import CustomModal from "../customModal/CustomModal";
import { useState } from "react";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { setDoctor, updateDoctorById } from "@/features/auth/clinicSlice";
import axios from "axios";
import FormLoader from "../loaders/FormLoader";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { backendURL } from "@/config/config";

const UpdateDoctorProfileForm = ({ open, onClose, profileUrl, idDoctor }) => {
  const [base64Image, setBase64Image] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFormSuccess, setIsFormSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const base64 = e.target.result;
      setBase64Image(base64);
    };
    reader.readAsDataURL(file);
  };

  const resetValues = () => {
    setBase64Image("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await axios

      .put(
        `${backendURL}/api/v1/clinic/doctor/updateClinicDoctorProfileImage/${idDoctor}`,
        { profileImage: base64Image },
        { withCredentials: "include" }
      )
      .then(({ data }) => {
        console.log(data);
        dispatch(updateDoctorById(data.doctor));
      })
      .then(() => setIsLoading(false))
      .then(() => setIsFormSuccess(true))
      .then(() => resetValues())

      .then(() =>
        setTimeout(() => {
          onClose();
          setIsFormSuccess(false);
        }, 2000)
      )
      .catch((e) => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title={"Actualizar foto de perfil"}
    >
      <form onSubmit={handleSubmit} className="py-8">
        <label
          class="block mb-2 text-sm font-medium text-gray-900"
          for="file_input"
        >
          Elegir una foto de perfil
        </label>
        <input
          accept="image/png, image/jpeg,image/svg,image/jpg,image/avif"
          onChange={handleImageUpload}
          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-blue-50 "
          id="file_input"
          type="file"
        />
        <p
          class="mt-1 text-sm text-gray-500 dark:text-gray-300 mb-10"
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
            <button
              onClick={() => setBase64Image("")}
              className=" rounded-2xl px-4 py-2 bg-red-500 text-red-50 text-xs"
            >
              borrar imagen
            </button>
          </div>
        )}
        {base64Image === "" && (
          <Image
            width={900}
            height={1000}
            src={profileUrl}
            className="w-full h-full object-contain"
            alt="Imagen doctor"
          />
        )}
        {isFormSuccess && !isLoading && (
          <button
            disabled={true}
            className=" bg-green-400 w-full  hover:bg-blue-dark flex justify-center gap-3 text-white font-bold py-3 px-6 rounded-lg mt-3 "
          >
            Actualizado
            <CheckCircleIcon className="w-6 h-6" />
          </button>
        )}

        {!isFormSuccess && (
          <button
            type="submit"
            className=" w-full bg-blue-600 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-blue-700 transition ease-in-out duration-300"
          >
            {isLoading ? (
              <div className="w-full flex justify-center">
                <FormLoader colour={"#FFFF"} className={" w-40 h-8   "} />
              </div>
            ) : (
              "Actualizar "
            )}
          </button>
        )}
      </form>
    </CustomModal>
  );
};

export default UpdateDoctorProfileForm;
