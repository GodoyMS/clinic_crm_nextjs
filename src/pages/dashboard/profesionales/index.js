import React, { useState } from "react";
import { Button } from "flowbite-react";
import { Modal } from "flowbite-react";
import CreateNewDoctorForm from "@/components/forms/CreateNewDoctorForm";
import DoctorCard from "@/components/cards/DoctorCard";
import { useSelector } from "react-redux";
import DoctorCar from "@/components/cards/DoctorCar";

const Profesionales = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalDeletePatient, setIsOpenModalDeletePatient] =
    useState(false);
  const [patientIDToBeDeleted, setPatientIDTobeDeleted] = useState("");
  const doctors = useSelector((state) => state.clinic.doctors);

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  return (
    <div>
      <React.Fragment>
        <Button
          className="mx-auto my-4 bg bg-blue-600 text-white hover:bg-blue-700 "
          onClick={openModal}
        >
          Nuevo Doctor +
        </Button>

        {isOpenModal && <CreateNewDoctorForm closeModal={closeModal} />}

        {/* <Modal size={"lg"} className=" xd" show={isOpenModal} onClose={closeModal}>
          <div className="h-full">
          <Modal.Header>Nuevo Doctor</Modal.Header>
          <Modal.Body className=" md:h-full overflow-y-auto">
          </Modal.Body>

          </div>
          
        </Modal> */}
      </React.Fragment>
      {doctors && (

           <div  className=" max-w-7xl mx-auto grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 justify-center flex-wrap py-20  ">
          {doctors.map(( doctor)=>( <DoctorCar data={doctor}  />
))}
        </div>


       
      )}
    </div>
  );
};

export default Profesionales;
