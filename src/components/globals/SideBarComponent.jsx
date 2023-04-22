import { Sidebar, Menu, MenuItem, SubMenu,rootStyles } from 'react-pro-sidebar';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import CalculateIcon from '@mui/icons-material/Calculate';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import AlignHorizontalRightIcon from '@mui/icons-material/AlignHorizontalRight';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SideBarComponent({isMobile,setIsMobile,userInfo,logout}){

  const router = useRouter();
  const { pathname } = router;  
  
  const [selectedMain, setSelectedMain] = useState(pathname);
  const [selectedSettings, setSelectedSettings] = useState(pathname);


  const principalButtons=[
    {name:'Inicio',to:'/dashboard',icon:HomeOutlinedIcon,key:0},
    {name:'Pacientes',to:'/dashboard/pacientes',icon:PeopleOutlinedIcon,key:1},
    {name:'Agenda',to:'/dashboard/agenda',icon:CalendarMonthIcon,key:2},
    {name:'Citas',to:'/dashboard/citas',icon:EditLocationAltIcon,key:3},
    {name:'Costos',to:'/dashboard/costos',icon:CalculateIcon,key:4},
    ]
  const settingsButtons=[
    {name:'Consultorio',to:'/dashboard/perfil-consultorio',icon:ApartmentIcon,key:5},
  {name:'Profesionales',to:'/dashboard/profesionales',icon:AssignmentIndIcon,key:6}]
  return(
    <div className={` z-20 h-full rounded-lg  fixed   flex flex-col mt-4 left-0 w-14 hover:w-64 md:w-64   ${ isMobile ? ' px-2 rounded-lg  ': 'px-4 rounded-lg   '}`  }>

      <Sidebar
       className='  shadow-2xl  ' 
        backgroundColor='white' 
         width={isMobile ? '60px': '220px'} >
        {!isMobile && (<button onClick={()=>setIsMobile(true)} className=' w-full p-2 my-0.5 py-1 rounded-lg  bg-slate-200'><AlignHorizontalRightIcon className=' '/> </button>)}
           {isMobile && (<button onClick={()=>setIsMobile(false)} className=' w-full p-2 hover:bg-slate-300  rounded-lg  bg-slate-200'><MenuIcon/> </button>)}
           {isMobile ? null : (<ApartmentIcon className='h-12 w-12 mx-auto p-1 mt-4 rounded-lg    flex justify-center items-center text-blue-600 bg-blue-200 '/>)}

           {isMobile ? null : (<h1 className='px-4 text-gray-700 text-lg text-center font-bold my-4'>
                              {!userInfo
                              ? `Fetching your profile...`
                              : userInfo !== null
                              ? `Logged in as ${userInfo.user.username}`
                              : "You're not logged in"}
                              </h1>)}


        <Menu className='py-8' >



           

           {isMobile ? null : (<h3 className='px-4 text-gray-400'>Principal</h3>)}
           <div>
           {principalButtons.map((button)=>(<div className='relative' key={button.key} ><MenuItem
                    style={{backgroundColor:'transparent'}}
                    active={selectedMain===button.name} 
                    onClick={() => {setSelectedMain(button.to);setSelectedSettings('')}}
                    className={`  my-0.5 w-full  hover:bg-blue-400 hover:text-white rounded-lg  ${selectedMain===button.to ? 'text-blue-500 bg-blue-100': 'text-gray-400'}`} 
                    icon={<button.icon className='mr-4'/>} 
                    component={<Link href={`${button.to}`}/>}>
                      {isMobile ? null : button.name}
                      </MenuItem>
                      {selectedMain===button.name && (<span className={`absolute  right-0 top-0 bottom-0 h-full py-2 w-1.5 bg-[#3b68bd]`}></span>) }
                      </div>))}

           </div>

           <div className='mt-6'>
           {isMobile ? null : (<h3 className='px-4 mt-4'>Ajustes</h3>)}

           {settingsButtons.map((button)=>(<div className='relative' key={button.key}><MenuItem 
                        style={{backgroundColor:'transparent'}}
                        onClick={() => {setSelectedSettings(button.to);setSelectedMain('')}}
                        className={` my-0.5  hover:bg-blue-400 hover:text-white rounded-lg  ${selectedSettings===button.to ? 'text-blue-500 bg-blue-100': 'text-gray-400'}`} 
                        icon={<button.icon 
                        className='mr-4'/>} 
                        component={<Link href={`${button.to}`}/>}>
                          {isMobile ? null : button.name}
                        </MenuItem>
                        {selectedSettings===button.name && (<span className={`absolute  right-0 top-0 bottom-0 h-full py-2 w-1.5 bg-[#3b68bd]`}></span>) }
                        </div>

                     
                     ))}
           </div>
           <MenuItem
                    style={{backgroundColor:'transparent'}}
                    onClick={logout}
                    
                    className={`   w-full mt-10  hover:bg-blue-400 hover:text-white rounded-lg  `} 
                    icon={<LogoutIcon className='mr-4'/>} 
                    >
                    {isMobile ? null : 'Salir'}



                  </MenuItem>
        </Menu>
        {!isMobile &&(           <Link  href={'/'}><h2 className='text-blue-500 text-center p-2'>Alpha Clinicas</h2></Link>
)}
    </Sidebar>

    </div>


  )
}
