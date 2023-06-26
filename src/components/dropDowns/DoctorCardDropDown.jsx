import React, { useState } from "react";
import {
  BsThreeDots,
  BsFillTrash3Fill,
  BsWhatsapp,
  BsClockHistory,
} from "react-icons/bs";
import CustomModal from "../customModal/CustomModal";
import { Modal } from "flowbite-react";
import axios from "axios";
import { backendURL } from "@/config/config";
import FormLoader from "../loaders/FormLoader";
import { useDispatch } from "react-redux";
import { deleteDoctorById, setAllDoctors } from "@/features/auth/clinicSlice";
import Link from "next/link";
import { FaUserAlt } from "react-icons/fa";
const DoctorCardDropDown = ({ id, phone }) => {
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isdeleteSucces, setIsDeleteSucces] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const handleDeleteDoctor = async () => {
    await axios
      .delete(`${backendURL}/api/v1/clinic/doctor/deleteClinicDoctor/${id}`, {
        withCredentials: "include",
      })
      .then(({ data }) => dispatch(deleteDoctorById(id)))
      .then(() => setIsDeleteSucces(true))
      .then(() =>
        setTimeout(() => {
          setDeleteModalOpen(false), setIsDeleteSucces(false);
        }, 2000)
      )
      .catch((e) => setIsError(true));
  };

  return (
    <>
      <CustomModal
        title={"Eliminar paciente"}
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      >
        <p>¿Estás seguro de eliminar este integrante?</p>
        <span className="text-gray-500 text-sm">
          Esta acción es irreversible
        </span>

        <div className="flex gap-4 justify-center py-8">
          <button
            onClick={handleDeleteDoctor}
            disabled={isdeleteSucces}
            className={` ${
              isdeleteSucces ? "bg-green-500" : "bg-red-600 hover:bg-red-700 "
            }  text-white font-bold py-3 px-6 rounded-lg mt-3 0 transition ease-in-out duration-300`}
          >
            {!isdeleteSucces && "Eliminar "}
            {isdeleteSucces && "Eliminado"}
          </button>

          {!isdeleteSucces && (
            <button
              onClick={() => setDeleteModalOpen(false)}
              className=" bg-gray-100 hover:bg-blue-dark text-gray-700 font-bold py-3 px-6 rounded-lg mt-3 hover:bg-gray-500 hover:text-gray-50 transition ease-in-out duration-300"
            >
              Cancelar
            </button>
          )}
        </div>
        {isError && (
          <div className="text-gray-600 text-center">Ocurrio un error</div>
        )}
      </CustomModal>

      <button
        onClick={() => setIsButtonActive(!isButtonActive)}
        className="focus:ring-2 rounded-md focus:outline-none p-2 bg-gray-100 hover:bg-gray-200"
      >
        <BsThreeDots className="w-4 h-4" />
      </button>

      {isButtonActive && (
        <div
          key={id}
          style={{ top: "110%" }}
          className="rounded-md w-full  bg-gray-100 shadow-2xl   absolute z-50  overflow-visible "
        >
          <Link
            href={`/dashboard/profesionales/${id}`}
            className=" flex gap-2 justify-start  whitespace-normal text-gray-600 focus:outline-none focus:text-gray-800 focus:bg-gray-300 text-xs w-full hover:bg-gray-200 py-4 px-4 cursor-pointer "
          >
            <FaUserAlt className="w-4 h-4 " />
            <p className=" break-words ">Perfil</p>
          </Link>
          <Link
            href={`https://api.whatsapp.com/send?phone=${phone}`} target="_blank"   rel="noreferrer"
            className=" flex gap-2 justify-start whitespace-normal text-gray-600 focus:outline-none focus:text-gray-800 focus:bg-gray-300 text-xs w-full hover:bg-gray-200 py-4 px-4 cursor-pointer "
          >
            <BsWhatsapp className="w-4 h-4 " />
            <p>Contactar</p>
          </Link>
          <button
            onClick={() => {
              setDeleteModalOpen(true);
              setIsButtonActive(false);
            }}
            className="flex gap-2 justify-start whitespace-normal rounded-b-md items-center focus:outline-none focus:text-red-100 text-gray-600 hover:bg-gray-800  focus:bg-gray-300 text-xs w-full  py-4 px-4 cursor-pointer "
          >
            <BsFillTrash3Fill className="w-4 h-4" /> <p>Eliminar doctor</p>
          </button>
        </div>
      )}
    </>
  );
};

export default DoctorCardDropDown;
