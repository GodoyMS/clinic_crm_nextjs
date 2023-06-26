import React, { useState } from "react";

import Moment from "react-moment";
import "moment/locale/es"; // Import the Spanish locale
import { useDispatch, useSelector } from "react-redux";
import InputSelectSearcherPatient from "../customInputs/InputSelectSearcherPatient";
import InputSelectSearcherDoctor from "../customInputs/InputSelectSearcherDoctor";
import FormLoader from "../loaders/FormLoader";
import axios from "axios";
import { backendURL } from "@/config/config";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const CreateNewAppointment = ({
  selectedDates,
  closeModal,
  setAppointments,
  appointments,
}) => {
  //PATIENT SELECTOR
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [isFormSuccess, setIsFormSuccess] = useState(false);
  const [isFormError, setIsFormError] = useState(false);

  const [reason, setReason] = useState(null);
  const patients = useSelector((state) => state.clinic.patients);
  const doctors = useSelector((state) => state.clinic.doctors);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  console.log(patients);
  const optionsPatient = patients.map(({ _id, names, dni }) => ({
    _id,
    names,
    dni,
  }));
  const optionsDoctor = doctors.map(({ _id, names, profileImage }) => ({
    _id,
    names,
    profileImage,
  }));

  const formatDate = (e) => new Date(e).toISOString();

  const handleSelectPatient = (selectedOption) => {
    console.log("Selected:", selectedOption);
    setSelectedPatientId(selectedOption);
    // Perform any necessary logic with the selected option
  };
  const handleSelectDoctor = (selectedOption) => {
    console.log("Selected:", selectedOption);
    setSelectedDoctorId(selectedOption);
    // Perform any necessary logic with the selected option
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFormSuccess(false);
    setIsFormError(false);
    setIsLoading(true);
    await axios
      .post(
        `${backendURL}/api/v1/clinic/appointment/registerAppointment`,
        {
          reason,
          doctorID: selectedDoctorId,
          patientID: selectedPatientId,
          dateStart: formatDate(selectedDates.start),
          dateEnd: formatDate(selectedDates.end),
        },
        { withCredentials: "include" }
      )
      .then(({ data }) =>
        axios.get(
          `${backendURL}/api/v1/clinic/appointment/getClinicAppointment/${data.appointment._id}`,
          { withCredentials: "include" }
        )
        .then(({ data }) => setAppointments([...appointments, data.appointment]))
        .catch(() => setIsFormError(true))
      )
      
      .then(() => setIsFormSuccess(true))
      .then(() => setTimeout(() => closeModal(), 2000))
      .catch(() => setIsFormError(true))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <div>
        {selectedDates.start && (
          <p className="text-gray-700">
            <strong>Fecha de incio :</strong>{" "}
            <Moment locale="es" format="hh:mm a - DD MMMM, YYYY">
              {new Date(selectedDates.start).toISOString()}
            </Moment>
          </p>
        )}

        {selectedDates.end && (
          <p className="text-gray-700">
            <strong>Fecha de fin: </strong>
            <Moment locale="es" format="hh:mm a -  DD MMMM, YYYY">
              {new Date(selectedDates.end).toISOString()}
            </Moment>{" "}
          </p>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <InputSelectSearcherPatient
          options={optionsPatient}
          onSelect={handleSelectPatient}
        />

        <InputSelectSearcherDoctor
          options={optionsDoctor}
          onSelect={handleSelectDoctor}
        />
        <div className="flex flex-col gap-2">
          <label htmlFor="reason" className="text-gray-700 font-bold">
            Concepto
          </label>
          <input
            required
            placeholder="Escribir  un concepto"
            id="reason"
            className="rounded-md"
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />

          {isFormSuccess && !isLoading && (
            <button
              disabled={true}
              className=" bg-green-400 hover:bg-blue-dark flex justify-center gap-3 text-white font-bold py-3 px-6 rounded-lg mt-3 "
            >
              Cita agendada
              <CheckCircleIcon className="w-6 h-6" />
            </button>
          )}

          {!isFormSuccess && (
            <button
              type="submit"
              className=" bg-blue-600 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-blue-700 transition ease-in-out duration-300"
            >
              {isLoading ? (
                <div className="w-full flex justify-center">
                  <FormLoader colour={"#FFFF"} className={" w-40 h-8   "} />
                </div>
              ) : (
                "Registrar paciente"
              )}
            </button>
          )}

          {isFormError && (
            <div className="text-center tex-gray-500 text-sm">
              Ocurrió un error, inesperado
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default CreateNewAppointment;
