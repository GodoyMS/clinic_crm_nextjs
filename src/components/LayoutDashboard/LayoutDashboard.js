import { ProSidebarProvider } from "react-pro-sidebar";
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import SideBarComponent from "../globals/SideBarComponent";
import TopbarComponent from "../globals/TopBarComponents";
import { useEffect,useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux'
import { userCurrent } from "@/features/auth/authActions";
//Get user data
import { userLogin } from "@/features/auth/authActions";
import { useGetDetailsQuery } from "@/service/authService";
import { setCredentials } from "@/features/auth/authSlice";
import { userLogout } from "@/features/auth/authActions";
import { fetchUserData } from "@/features/auth/authActions";
import axios from "axios";
import { logout } from "@/features/auth/authSlice";
import { useGetUserInfoQuery } from "@/service/authService";
import { clearClinic, initializeState } from "@/features/auth/clinicSlice";
import { backendURL } from "@/config/config";
const LayoutDashboard = ({ children }) => {

        const dispatch=useDispatch();
        const clinicInfo=useSelector(state=>state.clinic.infoClinic)

        useEffect(()=>{
          if(window !== "undefined"){

            const infoClinic=JSON.parse(localStorage.getItem('infoClinic'));
            const patients=JSON.parse(localStorage.getItem('patients'));
            const doctors=JSON.parse(localStorage.getItem('doctors'));

            const tokenClinic=JSON.parse(localStorage.getItem('tokenClinic'))
            const exp=JSON.parse(localStorage.getItem('expClinic'));
            const appointmentsClinic=JSON.parse(localStorage.getItem('appointmentsClinic'));
            // const test=JSON.parse(localStorage.getItem('appointmentsClinic')).length;
            // console.log(test*10000)

            dispatch(initializeState({
              patients:patients,
              infoClinic:infoClinic,
              doctors:doctors,
              tokenClinic:tokenClinic,
              appointmentsClinic,
              exp:exp
            }))

          }
        },[])

        // const { userInfo, authorization } = useSelector((state) => state.auth)
        // const a = useSelector((state) => state.auth)


        // const {data,isFetching} = useGetUserInfoQuery('userDetails', {
        //   pollingInterval: 900000, // 15mins
        // })


        const router = useRouter()


        // useEffect(() => {
        //   if (data) dispatch(setCredentials(data))
        // }, [data, dispatch])

     const handleLogout=async()=>{
      dispatch(clearClinic());
      await axios.get( `${backendURL}/api/v1/clinic/signout`,{withCredentials:"include"})
        .then(()=>dispatch(clearClinic()))
        .then(()=>router.push("/login"))
        .catch((e)=>console.log(e))
     }
    //  useEffect(()=>{
    //   console.log("render 1 time")
    //   if(!clinicInfo) router.push("/login")

    //  },[clinicInfo])
  
       

      //  useEffect(() => {
      //   if (!authorization) {
      //     router.push('/')
      //   }
      // }, [authorization])


    const [isMobile, setIsMobile] = useState(false); 


    useEffect(() => {
        // Add a listener for changes to the screen size
        const mediaQuery = window.matchMedia("(max-width: 768px)");    
        // Set the initial value of the `isMobile` state variable
        setIsMobile(mediaQuery.matches);    
        // Define a callback function to handle changes to the media query
        const handleMediaQueryChange = (event) => {
          setIsMobile(event.matches)};    
        // Add the callback function as a listener for changes to the media query
        mediaQuery.addEventListener("change", handleMediaQueryChange);    
        // Remove the listener when the component is unmounted
        return () => {
          mediaQuery.removeEventListener("change", handleMediaQueryChange);
        };
      }, []);




    return (
        <div className="flex flex-col flex-auto flex-shrink-0 "  >
          <SideBarComponent 
          handleLogout={handleLogout}
          clinicInfo={clinicInfo}
          isMobile={isMobile}
          setIsMobile={setIsMobile} 
          />


        <main className={` h-full  ${isMobile ? ' ml-20  ' : ' ml-64'}`} >
        <TopbarComponent />
        <div  className="px-2 md:px-8 ">
            {children}
        </div>
            
        </main>
       
        </div>

        
    
    );
  };
  
  export default LayoutDashboard;