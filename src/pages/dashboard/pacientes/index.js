import React, { useState } from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { Table } from 'flowbite-react';
import Link from 'next/link';
import { Button } from 'flowbite-react';
import { Modal } from 'flowbite-react';
import colors from 'tailwindcss/colors';
import CreateNewPatientForm from '@/components/forms/createNewPatientForm';
const Pacientes = () => {
  const[isOpenModal,setIsOpenModal]=useState(false)

  const openModal=()=> setIsOpenModal(true)
  const closeModal=()=> setIsOpenModal(false)

    
  
  return (
    <>

    

    <React.Fragment>
  <Button className='mx-auto my-4  ' color={'light'}  onClick={openModal}>
    Nuevo Paciente
  </Button>
  <Modal
    show={isOpenModal}
    onClose={closeModal}
  >
    <Modal.Header>
      Nuevo Paciente
    </Modal.Header>
    <Modal.Body>
      <CreateNewPatientForm/>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={closeModal}>
        I accept
      </Button>
      <Button
        color="gray"
        onClick={closeModal}
      >
        Decline
      </Button>
    </Modal.Footer>
  </Modal>
</React.Fragment>










    <Table>
  <Table.Head>
    <Table.HeadCell>
      Nombre
    </Table.HeadCell>
   
    <Table.HeadCell>
      Teléfono
    </Table.HeadCell>
    <Table.HeadCell>
      Accion
    </Table.HeadCell>
    <Table.HeadCell>
      <span className="sr-only">
        Eliminar
      </span>
    </Table.HeadCell>

  </Table.Head>
  <Table.Body className="divide-y">

    <Table.Row className="bg-white">
      <Table.Cell className="whitespace-nowrap font-medium ">
        Apple MacBook Pro 17
      </Table.Cell>
     
      <Table.Cell>
        Laptop
      </Table.Cell>
      <Table.Cell>
        1321312
      </Table.Cell>

      <Table.Cell className='w-15' >
        <Link href={'/'}   className="font-medium text-blue-700 bg-blue-200 p-2 rounded-md hover:bg-blue-300"       >
          Ver perfil
        </Link>
      </Table.Cell>
    </Table.Row>

    
   
  </Table.Body>
</Table>
</>
  )
}

export default Pacientes