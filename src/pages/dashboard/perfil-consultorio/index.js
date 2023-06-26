
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { FormControl,InputLabel,OutlinedInput,InputAdornment,IconButton } from "@mui/material";
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import {FormLabel,RadioGroup,FormControlLabel,Radio} from "@mui/material";
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
import SubHeader from "@/components/subheader/subheader";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useGetUserInfoQuery } from "@/service/authService";
import { RadioField } from "@/components/radioField/RadioField";
import { updateAuth,getAuthData,updateClinicInfo } from "@/api/clinicFunctions";

export default function perfilConsultorio(){
  
    //toast
    const[openToast,setOpenToast]=useState(false)
    const handleCloseToast=()=>setOpenToast(false)

    const{userInfo}=useSelector(state=>state.auth)
    const dispatch=useDispatch();        

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const[phone,setPhone]=useState('');
    const[specialty,setSpecialty]=useState('');
    const[location,setLocation]=useState({});
    const safeLocationDistrict= location.district || '';
    const safeLocationProvince= location.province || '';
    const safeLocationRegion= location.region || '';
    const safeLocatioAddress= location.address || '';
    const safePhone=phone || '';
    const safeSpecialty = specialty || '';


    function handleChangeLocation(event) {
      const { name, value } = event.target;
      setLocation((prevFormData) => ({ ...prevFormData, [name]: value }));
    } 

      //Set user Data one userInfo is found
    useEffect(()=>{
      if(userInfo){
        console.log(userInfo)

        setPhone(userInfo.user.phone)
        setSpecialty(userInfo.user.specialty)
        setLocation(userInfo.user.location)
      }
    },[userInfo])

    // fetch Auth data
    useEffect(()=>{
        getAuthData(setEmail,setUsername);
    },[] )   


    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

      console.log(JSON.stringify(location))

      

    return (   
        

 <>
    {openToast && (<Toast message={'Actualizado'} isOpen={openToast} closeToast={handleCloseToast}/>)}

    <Header title={'Consultorio'} subtitle={'Actualiza tu información'}/>

    <Box
    component={'div'}
      className="grid grid-cols-1 pr-1 sm:grid-cols-2 gap-4 items-start"

    >
  
      
        <Box
          className="  bg-white rounded-md p-4 shadow-md "
          component="form"     
          onSubmit={(event)=>updateAuth(event,email,username,dispatch,setOpenToast)}   
        >
          <SubHeader icon={<AdminPanelSettingsIcon className="text-blue-500"/>} title={'Información de autenticación'}/>
          
            <Box
            component="div"
            className="grid grid-cols-1 lg:grid-cols-2 gap-4  ">
              
            <TextFieldComponent label={'Nombre de consultorio'} type={'text'} value={username} setValue={(e)=>setUsername(e.target.value)}/>
            <TextFieldComponent label={'Email de consultorio'} type={'text'} value={email} setValue={(e)=>setEmail(e.target.value)}/>

            </Box>
          <ButtonComponent message={'Actualizar'} icon={<SaveIcon/>}/>
          
        </Box>

        <Box
         component={'form'}  
         onSubmit={(event)=>updateClinicInfo(event,specialty,phone,location,dispatch,setOpenToast)}
         className="bg-white rounded-md p-4 shadow-md">

          <SubHeader icon={<AccountCircleIcon className="text-blue-500"/>} title={'Información general'}/>


              <FormControl required>
                <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                <RadioGroup                  
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <RadioField value={'Odontología'} name={'especialidad'} label={'Odontología'} selectedValue={specialty} setValue={(e)=>setSpecialty(e.target.value)}/>
                  <RadioField value={'Nutrición'} name={'especialidad'} label={'Nutrición'} selectedValue={specialty} setValue={(e)=>setSpecialty(e.target.value)}/>
                  <RadioField value={'Medicina General'} name={'especialidad'} label={'Medicina General'} selectedValue={specialty} setValue={(e)=>setSpecialty(e.target.value)}/>

                </RadioGroup>
              </FormControl>

            <TextFieldComponent label={'Telefono '} type={'text'} value={safePhone} setValue={(e)=>setPhone(e.target.value)}/>
            <TextFieldComponent label={'Distrito'} type={'text'} name={"district"} value={safeLocationDistrict} setValue={handleChangeLocation}/>
            <TextFieldComponent label={'Provincia'} type={'text'} name={"province"} value={safeLocationProvince} setValue={handleChangeLocation}/>
            <TextFieldComponent label={'Region'} type={'text'} name={"region"}  value={safeLocationRegion} setValue={handleChangeLocation}/>
            <TextFieldComponent label={'Dirección'} type={'text'}  name={"address"}  value={safeLocatioAddress} setValue={handleChangeLocation}/>
            <ButtonComponent message={'Guardar'} icon={<SaveIcon/>}/>

        </Box>

      {/* <FormControl variant="standard" className="w-full mt-6" >
          <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
          <OutlinedInput 
            value={password}
            
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
        </FormControl> */}
      
     
    </Box>
    
    </>
    )
}