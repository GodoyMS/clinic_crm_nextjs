import { backendURL } from "@/config/config";
import { setPatient, updatePatientById } from "@/features/auth/clinicSlice";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Toast from "../toast/Toast";

const Info = ({data}) => {
    const [names,setNames]=useState("")
    const [phone,setPhone]=useState("")
    const [age ,setAge]=useState("")
    const[city,setCity]=useState("");
    const[email,setEmail]=useState("");
    const[dni,setDni]=useState("");
    const dispatch=useDispatch()
    const[openToast,setOpenToast]=useState(false)
    const closeToast=()=>setOpenToast(false)

    useEffect(()=>{
        setNames(data.names)
        setPhone(data.phone)
        setAge(data.age)
        setCity(data.city)
        setEmail(data.email)
        setDni(data.dni)
    },[])

    const handleSubmit=async(e)=>{
        e.preventDefault();
        await axios.put( `${backendURL}/api/v1/clinic/updatePatient/${data._id}`,{names,phone,age,city,email,dni},{withCredentials:"include"})
            .then(({data})=>dispatch(updatePatientById(data.patient)))
            .then(()=>setOpenToast(true))
            .catch((e)=> console.log(e))
            

    }
    


   
  return (
    <>
    {openToast && (
        <Toast message={"Paciente actualizado"} closeToast={closeToast}/>
    )}
    <div className="pt-20">
       
      <form onSubmit={handleSubmit} className="p-8 rounded-lg  bg-gray-50 ">
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="nombrePaciente"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Nombres
            </label>
            <input
              type="name"
              name="nombrePaciente"
              id="nombrePaciente"
              onChange={(e)=>setNames(e.target.value)}
              value={names}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5      "
              placeholder="Susana Mendoza"
              required=""
            />
          </div>

          <div>
            <label
              htmlFor="telefonoPaciente"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Telefono
            </label>
            <input
              type="tel"
              name="telefonoPaciente"
              id="telefonoPaciente"
              onChange={(e)=>setPhone(e.target.value)}

              value={phone}

              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5      "
              placeholder="913411231"
              required=""
            />
          </div>
          <div>
            <label
              htmlFor="edadPaciente"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Edad
            </label>
            <input
              type="age"
              name="edadPaciente"
              id="edadPaciente"
              onChange={(e)=>setAge(e.target.value)}

              value={age}

              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5      "
              placeholder="Ingresar edad"
              required=""
            />
          </div>
          <div>
            <label
              htmlFor="ciudadPaciente"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Ciudad
            </label>
            <input
              type="city"
              name="ciudadPaciente"
              id="ciudadPaciente"
              onChange={(e)=>setCity(e.target.value)}

              value={city}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5      "
              placeholder="Ingresar ciudad"
            />
          </div>
          <div>
            <label
              htmlFor="emailPaciente"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Email
            </label>
            <input
              type="email"
              name="emailPaciente"
              id="emailPaciente"
              onChange={(e)=>setEmail(e.target.value)}

              value={email}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5      "
              placeholder="ejemplo@gmail.com"
            />
          </div>
          <div>
            <label
              htmlFor="dniPaciente"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Dni
            </label>
            <input
              type="text"
              name="dniPaciente"
              id="dniPaciente"
              minLength={8}
              maxLength={8}
            //   onChange={(e)=>setDni(e.target.value)}

              value={dni}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5      "
              placeholder="71102387"
              required=""
            />
          </div>

          
        </div>
        <button
          type="submit"
          className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center   "
        >
          Actualizar
        </button>
      </form>
    </div>
    </>
  );
};

export default Info;
