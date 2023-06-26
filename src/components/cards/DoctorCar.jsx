import React from "react";
import DoctorCardDropDown from "../dropDowns/DoctorCardDropDown";
import Image from "next/image";

const DoctorCar = ({  data }) => {
  return (
    <div
      key={data._id}
      className="mx-auto flex flex-col w-full  justify-start bg-white  rounded-2xl  shadow-lg"
    >
      <div   className=" rounded-t-lg w-full h-auto   mx-auto">
        <Image
          width={600}
          height={900}
        style={{aspectRatio:" 10 / 14 "}}
          src={data.profileImage}
          className=" w-full h-full rounded-t-2xl object-cover "
          alt="profile picture"
          srcset=""
        />
      </div>
      <div className="px-8 py-10 flex-1 flex flex-col ">
        <div className="flex relative items-center justify-between">
          <span className="text-gray-400 text-sm">2d ago</span>
          <DoctorCardDropDown id={data._id}/>
      
        </div>

        <div className="mt-8 place-items-start ">
          <h2 className="text-gray-600 font-bold text-2xl tracking-wide">
            {data.names}
          </h2>
        </div>

        <div className="mt-8 flex-1 flex justify-end flex-col">
          <p className="text-emerald-400 font-semibold mt-2.5">Active</p>

          <div className="h-1 w-full bg-black mt-2 rounded-full">
            <div className="h-1 rounded-full w-2/5 bg-yellow-500 "></div>
          </div>
          <div className="mt-3 text-gray-700 text-sm">
            <span className="text-gray-400 font-semibold">Completado:</span>
            <span> 40%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCar;
