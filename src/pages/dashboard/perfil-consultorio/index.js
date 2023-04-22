
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { FormControl,InputLabel,OutlinedInput,InputAdornment,IconButton } from "@mui/material";
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

import { useEffect, useState } from "react";
import { TextFieldComponent } from "@/components/textFieldComponent/TextFieldComponent";
import Header from "@/components/Header/Header";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateCredentials } from "@/features/auth/authSlice";
import Toast from "@/components/toast/Toast";
import SaveIcon from '@mui/icons-material/Save';
import { ButtonComponent } from "@/components/button/Button";

export default function Citas(){
    const{userInfo}=useSelector(state=>state.auth)



    const dispatch=useDispatch();    
    const [email, setEmail] = useState('user.email');
    const [username, setUsername] = useState('user.usernam');

    //toast
    const[openToast,setOpenToast]=useState(false)
    const handleCloseToast=()=>setOpenToast(false)

    useEffect(()=>{
        axios.get( `${process.env.backendURL}${process.env.BASE_PATH_CLINIC}/getAuthData` ,{withCredentials:'include'})
        .then(({data})=>data.authData)
        .then((auth)=>{
            setEmail(auth.email);
            setUsername(auth.username);
        })
    },[] )

    function updateAuth(event){
        event.preventDefault();
        axios.put( `${process.env.backendURL}${process.env.BASE_PATH_CLINIC}/updateAuth`,{email,username},{withCredentials:'include'})
        .then(response => {
            const updatedUser = response.data.user;
            dispatch(updateCredentials(updatedUser));
            setOpenToast(true);
            setTimeout(()=>{
                setOpenToast(false);
            },2000)

          })
          .catch(error => {
            console.log(error)
          });
     }

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    return (   
        

 <>
    {openToast && (<Toast message={'Actualizado'} isOpen={openToast} closeToast={handleCloseToast}/>)}

    <Header title={'Consultorio'} subtitle={'Actualiza tu información'}/>

    <Box
      sx={{
        marginTop: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
  
      
      <Box
        component="form"     
        onSubmit={updateAuth}   
        className="w-full   "
        sx={{ mt: 1 }}
      >
        <Box
        component="div"
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
        <TextFieldComponent label={'Nombre de consultorio'} type={'text'} value={username} setValue={(e)=>setUsername(e.target.value)}/>
        <TextFieldComponent label={'Email de consultorio'} type={'text'} value={email} setValue={(e)=>setEmail(e.target.value)}/>

        </Box>
        <ButtonComponent message={'Actualizar'} icon={<SaveIcon/>}/>



        
      </Box>

      <FormControl variant="standard" className="w-full mt-6" >
          <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
          <OutlinedInput 
            value={'sa'}
            
            onChange={(e)=>setPassword(e.target.value) }
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Contraseña"
          />
        </FormControl>
      
     
    </Box>
    
    </>
    )
}