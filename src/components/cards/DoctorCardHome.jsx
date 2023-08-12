import React from "react";
import DoctorCardDropDown from "../dropDowns/DoctorCardDropDown";
import Image from "next/image";
import Link from "next/link";

const DoctorCardHome = ({  data }) => {
  return (
    <div
      key={data._id}
      className="mx-auto flex flex-col w-full  justify-start   rounded-2xl "
    >
      <Link href={`/dashboard/profesionales/${data._id}`}   className=" rounded-t-lg w-full h-auto   mx-auto">
        <Image
          width={600}
          height={900}
        style={{aspectRatio:" 10 / 10 "}}
          src={data.profileImage}
          className=" w-full h-full rounded-full object-cover "
          alt="profile picture"
          srcset=""
        />
      </Link>
      <div className="px-8 py-4 flex-1 flex justify-start items-center flex-col ">
       

        <div className="place-items-start ">
          <h2 className="text-gray-600  text-center font-bold text-xs md:text-2xl tracking-wide">
            {data.names}
          </h2>
        </div>
        <div className=" py-2">
          <p className=" text-gray-500">{data?.job}</p>
        </div>

        
      </div>
    </div>
  );
};

export default DoctorCardHome;
