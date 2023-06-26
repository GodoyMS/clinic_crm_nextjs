import Image from "next/image";
import React from "react";
import WarningBulb from "../svgAnimated/WarningBulb";
import { Tooltip } from "flowbite-react";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import FaceIcon from '@mui/icons-material/Face';
import Face3Icon from '@mui/icons-material/Face3';
const DoctorCard = ({ key, data }) => {
  return (
    <div key={key} className=" ">
      <div className="max-w-sm mx-auto   bg-white h-full rounded-lg overflow-hidden shadow-lg">
        <div
          className="bg-cover  h-40   "
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1522093537031-3ee69e6b1746?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a634781c01d2dd529412c2d1e2224ec0&auto=format&fit=crop&w=2098&q=80')",
          }}
        ></div>
        <div className="border-b px-4 pb-6">
          <div className="text-center sm:text-left xl:flex mb-4">
            <Image
              width={500}
              height={500}
              className="h-32 w-32   rounded-full border-4 object-cover shadow-lg border-white -mt-16 mr-4"
              src={data.profileImage}
              alt=""
            />
            <div className="py-2">
              <h3 className="font-bold text-2xl mb-1">{data.names}</h3>
              {data.city !== "" && (
                <div className="inline-flex text-grey-dark sm:flex items-center">
                  <svg
                    className="h-5 w-5 text-grey mr-1"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      className="heroicon-ui"
                      d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                    />
                  </svg>
                  {data.city}
                </div>
              )}
            </div>
          </div>
          <div className="flex">
            <button className="flex-1 rounded-full bg-blue text-white bg-blue-600 hover:bg-blue-700 transition duration-500 ease-in-out antialiased font-bold hover:bg-blue-dark px-4 py-2 mr-2">
              Perfil
            </button>
            <button className="flex-1 rounded-full border-2 hover:bg-gray-100 transition duration-300 ease-in-out  border-grey font-semibold text-black px-4 py-2">
              Mensaje
            </button>
          </div>
        </div>
        {data.joinedAt && (
             <div className="px-4 py-4">
             <div className="flex  gap-4 items-center text-grey-darker mb-4">
               <HistoryToggleOffIcon />{" "}
               <span>
                 Hace 2 años
               </span>
             </div>
           </div>

        )  }

            <div className="px-4 py-4">
             <div className="flex  gap-4 items-center text-grey-darker mb-4">
              {data.sex === 'Hombre' ? <FaceIcon />:<Face3Icon/> } 
               <span className="text-gray-700 font-bold text-base">
                {data.job}
               </span>
             </div>
           </div>

       
        <Tooltip style="light" content="Requiere actualizar">
          {" "}
          <button>
            <WarningBulb colour={"#FF0000"} />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default DoctorCard;
