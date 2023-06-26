import { backendURL } from "@/config/config"
import axios from "axios"

const useClinicRegister=async({username,email,password})=>{

    try {
      const response =  await  axios.post(`${backendURL}/clinic/signup`,{username,email,password})
      

        
    } catch (error) {
        
    }

}