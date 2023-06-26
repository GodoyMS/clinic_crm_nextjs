
import axios from "axios";
import { updateCredentials } from "@/features/auth/authSlice";

export function updateAuth(event,email, username, dispatch, setOpenToast) {
    event.preventDefault();

    axios
      .put(
        `${process.env.backendURL}${process.env.BASE_PATH_CLINIC}/updateAuth`,
        { email, username },
        { withCredentials: 'include' }
      )
      .then((response) => {
        const updatedUser = response.data.user;
        dispatch(updateCredentials(updatedUser));
        setOpenToast(true);
        setTimeout(() => {
          setOpenToast(false);
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  }

export function  getAuthData(setEmail,setUsername){
    axios.get( `${process.env.backendURL}${process.env.BASE_PATH_CLINIC}/getAuthData` ,{withCredentials:'include'})
    .then(({data})=>data.authData)
    .then((auth)=>{
        setEmail(auth.email);
        setUsername(auth.username);
    })
}

export function updateClinicInfo(event,specialty,phone,location,dispatch,setOpenToast){
    event.preventDefault();
    axios
    .put(
        `${process.env.backendURL}${process.env.BASE_PATH_CLINIC}/updateClinicInfo`,
        { specialty, phone,location },
        { withCredentials: 'include' }
      )
      .then((response) => {
        const updatedClinic = response.data.user;
        dispatch(updateCredentials(updatedClinic));
        setOpenToast(true);
        setTimeout(() => {
          setOpenToast(false);
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });

}