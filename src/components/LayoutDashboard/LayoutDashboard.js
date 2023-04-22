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
const LayoutDashboard = ({ children }) => {
        const { userInfo, authorization } = useSelector((state) => state.auth)
        const a = useSelector((state) => state.auth)

        const dispatch = useDispatch();

        const {data,isFetching} = useGetUserInfoQuery('userDetails', {
          pollingInterval: 900000, // 15mins
        })

        console.log(authorization)
        console.log(data)
        console.log(a)

        const router = useRouter()


        useEffect(() => {
          if (data) dispatch(setCredentials(data))
        }, [data, dispatch])

     const dispatchLogout=()=>{
       dispatch(userLogout())}
       

       useEffect(() => {
        if (!authorization) {
          router.push('/')
        }
      }, [authorization])


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
        logout={dispatchLogout}
        userInfo={userInfo}
        isMobile={isMobile}
        setIsMobile={setIsMobile} 
        />
        <main className={` h-full  ${isMobile ? ' ml-20  ' : ' ml-64'}`} >
        <TopbarComponent />
        <div  className="px-2 md:px-8">
            {children}
        </div>
            
        </main>
       
        </div>

        
    
    );
  };
  
  export default LayoutDashboard;