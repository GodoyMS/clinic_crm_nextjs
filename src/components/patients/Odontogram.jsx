import { backendURL } from "@/config/config";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updatePatientById } from "@/features/auth/clinicSlice";
import Toast from "../toast/Toast";
import Link from "next/link";
const Odontogram = ({ data }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isToastActive, setIsToastActive] = useState(false);
  const [isToastActiveDeletedCH, setIsToastActiveDeletedCH] = useState(false);
  
  const handleCloseToast=()=>setIsToastActive(false)
  const handleCloseToastDeleted=()=>setIsToastActiveDeletedCH(false)

  const dispatch = useDispatch();
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    // const {files,name} = event.target;

    // const reader=new FileReader();
    // reader.onload=(e)=>{
    //     const file=e.target.result
    // }

    try {
      const formData = new FormData();
      formData.append("pdf", file);

      await axios

        .put(
          `${backendURL}/api/v1/clinic/uploadOdontogram/${data._id}`,
          formData,
          {
            withCredentials: "include",
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then(({ data }) => dispatch(updatePatientById(data.patient)))
        .then(() => setIsToastActive(true))
        .catch((e) => console.log(e))
        .finally(() => setIsLoading(false));

      setSuccess(true);
      setError(null);
    } catch (error) {
      setSuccess(false);
      setError("Error updating patient");
      console.error("Error updating patient:", error);
    }
  };
  const handleDeleteOdontogram=async(e)=>{
    await axios.put(
      `${backendURL}/api/v1/clinic/deleteOdontogram/${data._id}`,
      {odontogramUrl:e},
      {
        withCredentials: "include",
      }
    )
    .then(({ data }) => dispatch(updatePatientById(data.patient)))
    .then(() => setIsToastActiveDeletedCH(true))
    .catch((e) => console.log(e))
  }

  return (
    <>
    {isToastActive && (
        <Toast
          message={"Odontograma subida exitosamente"}
          closeToast={handleCloseToast}
        />
      )}
          {isToastActiveDeletedCH && (
        <Toast
          message={"Odontograma borrado exitosamente"}
          closeToast={handleCloseToastDeleted}
        />
      )}

<div className="py-8 px-2 grid gap-4 grid-cols-1 md:grid-cols-2">
      
      <div className=" mx-auto">
        <div
          style={{ paddingBottom: "3rem", maxWidth: "400px" }}
          className="text-center text-medium  text-gray-500 "
        >
         
          
       
          Los historia clínica que generes mediante
          nuestro formato general, se mantendra actualizado y puede ser
          descargado en cualquier momento.
        </div>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          style={{ maxWidth: "400px" }}
        >
          <div className="">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 "
              for="file_input"
            >
              Subir Odontograma
            </label>
            <div className="flex flex-wrap  gap-2">
              <input
                onChange={handleFileChange}
                type="file"
                required
                name="pdf"
                className="w-full text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none   "
                id="file_input"
              />
              {/* <div className="relative w-full my-2 z-0">
                <input
                  type="text"
                  id="floating_standard"
                  name="nombreHC"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="floating_standard"
                  className="absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus: peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Escribir nombre de H.C. (opcional)
                </label>
              </div> */}
              <button
                type="submit"
                name="uploadDocHC"
                className=" flex gap-2  justify-center w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2   focus:outline-none "
              >
                <span>{isLoading ? "Cargando.." : "Subir"}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="relative pt-4  overflow-x-auto shadow-md  sm:rounded-lg">
        <h2 className="p-2 text-center text-gray-600 ">
          Repositorio de odontogramas
        </h2>
        <table className="w-full  text-sm text-left text-gray-500 ">
          <thead className="text-xs border-gray-200  border-b text-gray-700 uppercase  bg-gray-50  ">
            <tr>

              <th scope="col" className="px-6 py-3">
                Nombre
              </th>


              <th scope="col" className="px-6 py-3">
                Acción
              </th>
              <th scope="col" className="px-6 py-3">
                
              </th>
            </tr>
          </thead>
          <tbody>
            {data.odontogram.map((e,index)=>(
               <tr>
 
               <th scope="col" className="px-6 py-3">
                 Odontograma {index+1}
               </th>
 
               <th scope="col" className="px-6 py-3">
                 <Link className="bg-blue-600 text-white rounded-md p-2 hover:bg-blue-600" target="_blank" href={e}>Visualizar</Link>
               </th>
               <th scope="col" className="px-6 py-3">
                <button onClick={() => handleDeleteOdontogram(e)} className="bg-gray-200 text-gray-700 rounded-md p-2 hover:bg-gray-300" >Eliminar</button>
               </th>
             </tr>
            ))}          
          </tbody>
        </table>
      </div>
    </div>
    </>

  );
};

export default Odontogram;
