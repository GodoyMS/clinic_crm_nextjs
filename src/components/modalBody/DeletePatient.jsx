import { backendURL } from "@/config/config";
import { deletePatientById } from "@/features/auth/clinicSlice";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";

const DeletePatient = ({closeModal,patientID,resetPatientID}) => {
  const dispatch=useDispatch()
  const handleDeletePatient=async()=>{
    await axios.delete(`${backendURL}/api/v1/clinic/deletePatient/${patientID}`,{withCredentials:"include"})
        .then(({data})=>dispatch(deletePatientById(patientID)))
        .then(()=>resetPatientID())
        .then(()=>closeModal())
        .catch((e)=>console.log(e))
       

  }

  return (
    <>
    <div>
    <p className="text-gray-700 font-medium text-lg"> ¿Estas seguro de eliminar este paciente?</p>
      <span className="mt-4 text-red-500 font-medium text-sm">Esta accion es irreversible</span>    

    </div>

    <div className="mt-8 flex justify-start gap-4">
    <button className="bg-red-600 text-white rounded-lg py-3 px-7 font-semibold hover:bg-red-700"  onClick={handleDeletePatient}>Eliminar</button>
    <button className="bg-slate-600 text-slate-50 rounded-lg py-3 px-7 font-semibold hover:bg-slate-700"  onClick={closeModal}>Cancelar</button>

    </div>
     

    </>
  );
};

export default DeletePatient;
