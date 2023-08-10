import React, { useState } from "react";
import { Table } from "flowbite-react";
import Link from "next/link";
import { Button } from "flowbite-react";
import { Modal } from "flowbite-react";
import CreateNewPatientForm from "@/components/forms/CreateNewPatientForm";
import { useSelector } from "react-redux";
import DeletePatient from "@/components/modalBody/DeletePatient";
import Image from "next/image";
const Pacientes = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalDeletePatient, setIsOpenModalDeletePatient] = useState(
    false
  );
  const [patientIDToBeDeleted, setPatientIDTobeDeleted] = useState("");

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);
  const closeModalDeletePatient = () => setIsOpenModalDeletePatient(false);
  const resetPatientIDToBeDeleted = () => setPatientIDTobeDeleted("");
  const patients = useSelector((state) => state.clinic.patients);
  return (
    <>
      <React.Fragment>
        <div className=" pt-4 pb-8">
          <button
            onClick={openModal}
            className=" bg-blue-600 hover:bg-blue-700   transition duration-300  px-6 py-2 rounded-md text-white"
          >
            Nuevo Paciente +
          </button>
        </div>

        <Modal show={isOpenModal} onClose={closeModal}>
          <Modal.Header>Nuevo Paciente</Modal.Header>
          <Modal.Body>
            <CreateNewPatientForm closeModal={closeModal} />
          </Modal.Body>
        </Modal>

        <Modal
          show={isOpenModalDeletePatient}
          onClose={closeModalDeletePatient}
        >
          <Modal.Header>Eliminar paciente</Modal.Header>
          <Modal.Body>
            <DeletePatient
              patientID={patientIDToBeDeleted}
              resetPatientID={resetPatientIDToBeDeleted}
              closeModal={closeModalDeletePatient}
            />
          </Modal.Body>
        </Modal>
      </React.Fragment>

      <Table>
        <Table.Head>
          <Table.HeadCell>Nombre</Table.HeadCell>
          <Table.HeadCell>Dni</Table.HeadCell>

          <Table.HeadCell>Teléfono</Table.HeadCell>
          <Table.HeadCell>Ciudad</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Administrar</span>
          </Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Eliminar</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {patients &&
            patients.length > 0 &&
            patients.map((e) => (
              <Table.Row key={e._id} className="bg-white">
                <Table.Cell className="whitespace-nowrap font-medium flex gap-2 justify-start  items-center">
                  <Image
                    width={100}
                    height={100}
                    alt="Paciente"
                    className="w-6 h-6"
                    src={
                      e.sex === "Hombre"
                        ? "/assets/icons/patientMan.png"
                        : "/assets/icons/patientWoman.png"
                    }
                  />
                  <Link
                    className="text-blue-500 hover:text-blue-700"
                    href={`/dashboard/pacientes/${e._id}`}
                  >
                    {e.names}
                  </Link>
                </Table.Cell>
                <Table.Cell>{e.dni}</Table.Cell>

                <Table.Cell>{e.phone}</Table.Cell>
                <Table.Cell>{e.city}</Table.Cell>

                <Table.Cell className="w-15">
                  <Link
                    href={`/dashboard/pacientes/${e._id}`}
                    className="font-medium whitespace-nowrap text-blue-700 bg-blue-200 p-2 rounded-md hover:bg-blue-300"
                  >
                    Administrar paciente
                  </Link>
                </Table.Cell>
                <Table.Cell className="w-15">
                  <button
                    onClick={() => {
                      setIsOpenModalDeletePatient(true);
                      setPatientIDTobeDeleted(e._id);
                    }}
                    className="font-medium whitespace-nowrap text-red-700 bg-red-200 p-2 rounded-md hover:bg-red-300"
                  >
                    Eliminar Paciente
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>

      {patients.length ===0 && <div className=" flex justify-center mt-4"><p> Ningún paciente registrado aún</p></div>}
    </>
  );
};

export default Pacientes;
