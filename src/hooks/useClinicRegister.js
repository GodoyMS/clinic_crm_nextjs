import { backendURL } from "@/config/config";
import axios from "axios";

export const  useClinicRegister = async ({
  username,
  email,
  password,
  setIsModalRegisterActive,
}) => {
  await axios
    .post(`${backendURL}/api/v1/clinic/signup`, { username, email, password },{withCredentials:"include"})
    .then(() => setIsModalRegisterActive(true))
    .catch((e) => console.log(e));
};
