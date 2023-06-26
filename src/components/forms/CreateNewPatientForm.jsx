import { backendURL } from "@/config/config";

import { setPatient } from "@/features/auth/clinicSlice";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
const CreateNewPatientForm = ({closeModal}) => {
  const [name, setName] = useState("");
  const [dni, setDni] = useState("");
  const [sex, setSex] = useState("Hombre");

const dispatch=useDispatch()
  const resetValues = () => {
    setName("");
    setDni("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(`${backendURL}/api/v1/clinic/registerPatient`,{dni:dni,names:name,sex},{withCredentials:"include"})
        .then(({data})=>dispatch(setPatient(data.patient)))
        .then(()=>closeModal())
        .then(()=>resetValues())
        .catch((e)=>console.log(e)) 


  };

  const handleSexChange = (event) => {
    setSex(event.target.value);
  };
  return (
    <form onSubmit={handleSubmit} className="p-6 flex flex-col justify-center">
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
          className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none"
        />
      </div>

      <div className="flex flex-col mt-2">
        <label htmlFor="dni" className="hidden">
          Dni
        </label>
        <input
          required
          value={dni}
          maxLength={8}
          type="number"
        
          
          onChange={(prev) => setDni(prev.target.value)}
          name="dni"
          id="dni"
          placeholder="Dni"

          minLength={8}
          className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none"
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

      


      <button
        type="submit"
        className=" bg-blue-600 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-blue-500 transition ease-in-out duration-300"
      >
        Registrar paciente
      </button>
    </form>
  );
};

export default CreateNewPatientForm;
