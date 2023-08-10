import React from "react";
import Link from "next/link";
import Moment from "react-moment";
import "moment/locale/es"; // Import the Spanish locale
import Image from "next/image";

import { BsThreeDots, BsFillFunnelFill } from "react-icons/bs";

import AppointmentDropDown from "../dropDowns/AppointmentDropDown";

const AppointmentCard = React.memo( ({
  e,
  appointments,
  setAppointments,
  selectedAppointmentIds,
  onChangeSelectedAppointmentId,
}) => {
  return (
    <>
      <tr className="h-3"></tr>
      <tr
        tabIndex="0"
        className="focus:outline-none h-32 border  border-gray-100 rounded-md"
      >
        <td>
          <div className="ml-5">
            <input
              id={e._id}
              type="checkbox"
              value=""
              checked={selectedAppointmentIds.includes(e._id)}
              onChange={onChangeSelectedAppointmentId}
              name="bordered-checkbox"
              className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </td>
        <td className="">
          <div className="flex items-center pl-5 ">
            <Link
              href={`/dashboard/pacientes/${e?.patient?._id}`}
              className="text-base bg-blue-50 rounded-md px-2 py-2 font-medium leading-none text-gray-700 mr-2"
            >
              {e?.patient?.names ? e?.patient?.names : "Paciente Eliminado"}
            </Link>
          </div>
          <div className="flex items-center gap-2 mt-5 pl-5">
           {e?.doctor &&  <Image
            alt="doctor"
              src={
                e.doctor.sex === "Hombre"
                  ? "/assets/icons/dentistMale.png"
                  : "/assets/icons/dentistFemale.png"
              }
              width={200}
              height={200}
              className=" object-contain w-8 h-8"
            />}
            <p className="text-base font-normal leading-none text-gray-700 mr-2">
              {e?.doctor?.names ? e?.doctor?.names : "Doctor eliminado"}
            </p>
          </div>
        </td>
        <td className="pl-24">
          <div className="flex items-center">
            <p className="text-sm leading-none text-gray-600 ml-2">
              {e?.reason}
            </p>
          </div>
        </td>

        <td className="pl-5">
          <button
            className={`${
              new Date() < new Date(e.dateStart)
                ? "bg-green-100 text-green-700"
                : "bg-gray-50"
            }  py-3 px-3 text-sm leading-none text-gray-700  rounded focus:outline-none relative `}
          >
            <Moment locale="es" format="  DD MMMM - hh:mm a ">
              {e?.dateStart}
            </Moment>{" "}
            {new Date() > new Date(e.dateStart) && (
              <div
                style={{ fontSize: "10px" }}
                className="absolute  right-0 -bottom-2 px-1 rounded-md bg-blue-50 "
              >
                {" "}
                Concluido
              </div>
            )}
          </button>
        </td>
        <td>
          <div className=" relative px-10 pt-2">
            <AppointmentDropDown
              appointments={appointments}
              setAppointments={setAppointments}
              id={e._id}
            />
          </div>
        </td>
      </tr>
    </>
  );
});

export default AppointmentCard;
