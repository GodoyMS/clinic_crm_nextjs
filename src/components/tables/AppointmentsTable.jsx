import { backendURL } from "@/config/config";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import {
  BsChevronLeft,
  BsChevronRight,
  BsFillTrash3Fill,
} from "react-icons/bs";

import { BsThreeDots, BsFillFunnelFill } from "react-icons/bs";
import TableSkeleton from "../skeletons/TableSkeleton";
import AppointmentCard from "../cards/AppointmentCard";
import CustomModal from "../customModal/CustomModal";
const AppointmentsTable = () => {
  
  const [page, setPage] = useState(1);
  const [appointments, setAppointments] = useState(null);
  const [isFetchLoading, setIsFetchLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSortActive, setIsSortActive] = useState(false);
  const [
    deleteManyAppointmentsModalOpen,
    setDeleteManyAppointmentsModalOpen,
  ] = useState(false);
  const [isDeleteManySuccess, setDeleteManySuccess] = useState(false);
  const [selectedAppointmentIds, setSelectedAppointmentIds] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [totalDocs, setTotalDocs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const tabs = [
    { id: 0, name: "Este mes" },
    { id: 1, name: "Hoy" },
    { id: 2, name: "Todo" },
  ];
  const [currentTab, setCurrentTab] = useState(tabs[2].name);

  const handleCheckboxChange = (id) => {
    if (selectedAppointmentIds.includes(id)) {
      setSelectedAppointmentIds(
        selectedAppointmentIds.filter((selectedId) => selectedId !== id)
      ); // Remove the ID from the array
    } else {
      setSelectedAppointmentIds([...selectedAppointmentIds, id]); // Add the ID to the array
    }
  };

  useEffect(() => {
    setIsFetchLoading(true);
    axios
      .get(
        `${backendURL}/api/v1/clinic/appointment/getClinicAppointments?limit=10&page=${page}`,
        {
          withCredentials: "include",
        }
      )
      .then(({ data }) => {
        setAppointments(data.appointments);
        setHasNextPage(data?.hasNextPage);
        setHasPrevPage(data?.hasPrevPage);
        setTotalDocs(data?.totalDocs);
        setTotalPages(data?.totalPages);
      })
      .then(() => setIsFetchLoading(false))
      .catch((e) => setIsError(true))
      .finally(() => setIsFetchLoading(false));
  }, [page]);

  const handleSortUp = () => {
    if (appointments) {
      setAppointments([
        ...appointments.sort(
          (a, b) => new Date(b.dateStart) - new Date(a.dateStart)
        ),
      ]);
      setIsSortActive(false);
    }
  };
  const handleSortDown = () => {
    if (appointments) {
      setAppointments([
        ...appointments.sort(
          (a, b) => new Date(a.dateStart) - new Date(b.dateStart)
        ),
      ]);
      setIsSortActive(false);
    }
  };

  const handleDeleteAppointment = async () => {
    await axios
      .post(
        `${backendURL}/api/v1/clinic/appointment/deleteManyClinicAppointments `,
        { appointmentsIds: selectedAppointmentIds },
        { withCredentials: "include" }
      )
      .then(() => setDeleteManySuccess(true))
      .then(() =>
        setAppointments(
          appointments.filter(
            (obj) => !selectedAppointmentIds.includes(obj._id)
          )
        )
      )
      .then(() =>
        setTimeout(() => {
          setDeleteManyAppointmentsModalOpen(false);
          setDeleteManySuccess(false);
        }, 1000)
      )
      .then(() => setSelectedAppointmentIds([]))

      .catch((e) => console.log(e));
  };
  if (isFetchLoading) {
    return (
      <div className=" max-w-6xl mx-auto mt-28">
        <TableSkeleton />
      </div>
    );
  }
  if (isError) {
    return (
      <div className=" max-w-6xl mx-auto mt-28">
        <p className="text-gray-700 font-medium py-6">
          Ocurrio un error inesperado
        </p>
        <div className="pb-4">Posibles causas </div>
        <ul className="pl-4">
          <li className="py-2">
            No hay conexión a internet, asegurate de tener conexión a internet
          </li>
          <li className="py-2">
            El servidor no responde, cierra sesión y logeate nuevamente
          </li>
          <li className="py-2">
            La página está temporalmente fuera de servicio. En este caso solo
            epera porfavor
          </li>
        </ul>
        <div className="py-10 text-gray-500">
          Si ningúna opción es tu caso, comunicate con nosotros para solucionar
          tu problema
        </div>
      </div>
    );
  }

  return (
    <div className="sm:px-6 w-full">
      <CustomModal
        title={"Eliminar paciente"}
        open={deleteManyAppointmentsModalOpen}
        onClose={() => setDeleteManyAppointmentsModalOpen(false)}
      >
        <p>¿Estás seguro de eliminar {selectedAppointmentIds.length} citas?</p>
        <span className="text-gray-500 text-sm">
          Esta acción es irreversible
        </span>

        <div className="flex gap-4 justify-center py-8">
          <button
            disabled={isDeleteManySuccess}
            onClick={handleDeleteAppointment}
            className={` ${
              isDeleteManySuccess
                ? "bg-green-500"
                : "bg-blue-600 hover:bg-blue-70 "
            }  text-white font-bold py-3 px-6 rounded-lg mt-3 0 transition ease-in-out duration-300`}
          >
            {!isDeleteManySuccess && "Eliminar "}
            {isDeleteManySuccess && "Eliminado"}
          </button>

          {!isDeleteManySuccess && (
            <button
              onClick={() => setDeleteManyAppointmentsModalOpen(false)}
              className=" bg-gray-100 hover:bg-blue-dark text-gray-700 font-bold py-3 px-6 rounded-lg mt-3 hover:bg-gray-500 hover:text-gray-50 transition ease-in-out duration-300"
            >
              Cancelar
            </button>
          )}
        </div>
        {isError && (
          <div className="text-gray-600 text-center">Ocurrio un error</div>
        )}
      </CustomModal>
      <div className="px-4 md:px-10 py-4 md:py-7">
        <div className="flex items-center justify-between">
          <p
            tabIndex="0"
            className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800"
          >
            Historial de citas
          </p>

          <div className="flex justify-end gap-2">
            <div>
              {selectedAppointmentIds.length > 0 && (
                <button
                  onClick={() => setDeleteManyAppointmentsModalOpen(true)}
                  className="py-3 px-4 items-center flex gap-2 text-sm font-medium leading-none text-red-600 bg-red-200 hover:bg-red-300 cursor-pointer rounded"
                >
                  <BsFillTrash3Fill className="w-4 h-4" />
                  Eliminar
                </button>
              )}
            </div>
            <div className="relative  ">
              <button
                onClick={() => setIsSortActive(!isSortActive)}
                className="py-3 px-4 items-center flex gap-2 text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded"
              >
                Ordenar por
                <BsFillFunnelFill className="w-4 h-4" />
              </button>
              {isSortActive && (
                <div className="absolute flex flex-col right-0 top-10 w-full">
                  <button
                    onClick={handleSortUp}
                    className=" w-full text-sm py-3 px-4 font-medium leading-none text-gray-100 bg-gray-500 hover:bg-gray-700 cursor-pointer "
                  >
                    Reciente
                  </button>
                  <hr />
                  <button
                    onClick={handleSortDown}
                    className=" w-full text-sm py-3 px-4 font-medium leading-none text-gray-100 bg-gray-500 hover:bg-gray-700 cursor-pointer rounded-b-md"
                  >
                    Mas antiguo
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10 h-[80vh] overflow-y-scroll">
        <div className="sm:flex items-center justify-between">
          <div className="flex gap-2 items-center">
            {tabs.map((e) => (
              <button
                onClick={() => setCurrentTab(e.name)}
                className={`${
                  e.name === currentTab
                    ? "bg-indigo-100 text-indigo-700 "
                    : " text-gray-600 hover:text-indigo-700 hover:bg-indigo-100"
                }  rounded-md focus:outline-none focus:ring-2 py-2 px-6`}
                key={e.id}
              >
                {e.name}
              </button>
            ))}
          </div>
          <Link
            href={"/dashboard/agenda"}
            className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded"
          >
            <p className="text-sm font-medium leading-none text-white">
              Nueva Cita +
            </p>
          </Link>
        </div>
        <div className="mt-7 overflow-x-auto pb-40 ">
         {isFetchLoading ? <TableSkeleton/> :  <table className="w-full whitespace-nowrap">
            <tbody>
              {currentTab === tabs[0].name &&
                appointments &&
                appointments
                  .filter(
                    (obj) =>
                      new Date().getMonth() + 1 ===
                      new Date(obj.dateStart).getMonth() + 1
                  )
                  .map((e) => (
                    <AppointmentCard
                      selectedAppointmentIds={selectedAppointmentIds}
                      onChangeSelectedAppointmentId={() =>
                        handleCheckboxChange(e._id)
                      }
                      key={e._id}
                      appointments={appointments}
                      setAppointments={setAppointments}
                      e={e}
                    />
                  ))}

              {currentTab === tabs[1].name &&
                appointments &&
                appointments
                  .filter(
                    (obj) =>
                      new Date().getDate() === new Date(obj.dateStart).getDate()
                  )
                  .map((e) => (
                    <AppointmentCard
                      selectedAppointmentIds={selectedAppointmentIds}
                      onChangeSelectedAppointmentId={() =>
                        handleCheckboxChange(e._id)
                      }
                      key={e._id}
                      appointments={appointments}
                      setAppointments={setAppointments}
                      e={e}
                    />
                  ))}

              {currentTab === tabs[2].name &&
                appointments &&
                appointments.map((e) => (
                  <AppointmentCard
                    selectedAppointmentIds={selectedAppointmentIds}
                    onChangeSelectedAppointmentId={() =>
                      handleCheckboxChange(e._id)
                    }
                    key={e._id}
                    appointments={appointments}
                    setAppointments={setAppointments}
                    e={e}
                  />
                ))}
            </tbody>
          </table>}

          {appointments?.length > 0 && (
            <div className="flex justify-between max-w-xs mx-auto mt-4 text-gray-700 text-xs font-sans w-full items-center">
              {hasPrevPage ? (
                <button onClick={() => setPage(page - 1)}>
                  <BsChevronLeft className=" cursor-pointer" />
                </button>
              ) : (
                <div></div>
              )}
              <span className=" text-gray-400">
                pág {page} de {totalPages}
              </span>

              {hasNextPage ? (
                <BsChevronRight
                  className=" cursor-pointer text-indigo-500 hover:text-indigo-600"
                  onClick={() => setPage(page + 1)}
                />
              ) : (
                <div></div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsTable;
