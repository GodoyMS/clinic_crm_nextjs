import React from "react";
import {  FaRegMoneyBillAlt } from "react-icons/fa";
import { MdAdsClick, MdOutlineDocumentScanner,MdOutlineCalendarToday } from "react-icons/md";

import {TbUsers} from "react-icons/tb"
const Featureshome = () => {
  const features = [
    {
      id: 1,
      name: "Agenda de citas médicas",
      icon: MdOutlineCalendarToday,
      text:
        "Control total de agenda, cancelación y postergación de horarios de citas a traves de una agenda digital.",
    },
    {
      id: 2,
      name: "Registros clinicos",
      icon: MdOutlineDocumentScanner,
      text:
        "Control total de agenda, cancelación y postergación de horarios de citas a traves de una agenda digital.",
    },
    {
      id: 3,
      name: "Administra tus odontogramas",
      icon: (
        <svg
          class="w-8 h-8 flex mx-auto text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          fill="currentColor"
          version="1.1"
          id="Layer_1"
          viewBox="0 0 64 64"
          enableBackground="new 0 0 64 64"
         xmlSpace="preserve"
        >
          <path
            id="Tooth_2_"
            d="M54.3148651,5.0702143c-3.5253983-3.6377001-8.4227982-5.4512-13.472599-4.9921999  c-0.0372009,0.001-0.0762024,0.0019-0.1133003,0.0049c-1.6397018,0.1611-3.1631012,0.8252-4.6366997,1.4687001  c-1.5165901,0.6621001-2.9492989,1.2871001-4.3290997,1.2871001c-1.3838005,0-2.8124886-0.6259-4.325201-1.289  c-1.4619999-0.6407-2.9736996-1.3028001-4.6035995-1.4668001c-4.9531002-0.501-9.7802,1.2636-13.2469997,4.8301001  c-3.4667997,3.5663996-5.0899,8.4393997-4.4550996,13.3592997c2.6244998,22.700201,4.4779992,36.6513977,5.5082994,41.4648972  c0.3237,1.5166016,1.9116001,3.8935013,3.9375,4.2256012c0.1352005,0.0223999,0.2915001,0.038002,0.4643002,0.038002  c0.8149996,0,1.9883118-0.3476028,2.9648991-1.9960022c1.4033012-2.3702011,2.6221008-5.642601,3.9131012-9.1083984  c2.6425991-7.0937996,5.6385994-15.1348,10.4218998-15.2110023c4.7490005,0.0956993,7.1541977,6.8535004,9.481411,13.3887024  c1.241188,3.4891968,2.4150009,6.785099,3.9677887,9.2782974c1.0332108,1.6611023,2.6805992,2.4815025,4.4179001,2.1826019  c1.5683975-0.2656021,2.8788986-1.4121017,3.1875-2.7881012c1.3194008-5.8711014,3.6992989-25.5126991,5.4638977-40.9589005  C59.5199661,13.7323141,57.863678,8.7323141,54.3148651,5.0702143z M56.8773651,18.537014  c-0.0009995,0.0058002-0.0018997,0.0107002-0.0018997,0.0165997c-1.7597885,15.3984013-4.1299019,34.9697037-5.4296989,40.7557983  c-0.1319008,0.5849991-0.8067017,1.125-1.5703011,1.2538986c-0.5381012,0.0938034-1.5665016,0.0479012-2.3867874-1.267498  c-1.4384117-2.3106003-2.5761108-5.5078011-3.7812119-8.8916016c-2.5546989-7.1758003-5.1953011-14.594799-11.3604012-14.7187996  c-6.1854992,0.0986023-9.4344997,8.8194008-12.3006992,16.5126991c-1.2588005,3.3799019-2.4482994,6.5713005-3.7598,8.7871017  c-0.6640997,1.1231003-1.2060995,1.0321999-1.3852997,1.0038986c-0.9515886-0.1562004-2.0815001-1.6229973-2.3046999-2.669899  c-1.0028887-4.6855011-2.8973999-18.9589996-5.4794002-41.2900009c-0.5576997-4.3233004,0.8652-8.5957003,3.9043002-11.7217007  c2.7005997-2.7793,6.3442106-4.3066998,10.1683989-4.3066998c0.4794998,0,0.9619007,0.0235,1.4453011,0.0723002  c1.3155117,0.1317999,2.6191998,0.7031,4,1.3085999c0.6203995,0.2716999,1.2488995,0.5463998,1.8883991,0.7834997  c0.0491123,0.0377002,0.0876999,0.0852003,0.1448002,0.1140003l9.9726982,5.0399995  c0.1445007,0.0732002,0.2988014,0.1073999,0.4502029,0.1073999c0.3652,0,0.7176971-0.2001991,0.8934975-0.5487995  c0.2490997-0.4932003,0.0517998-1.0946999-0.4413986-1.3438001l-5.8496017-2.9555998  c1.0969124-0.2781,2.1592026-0.7402,3.1992035-1.1938002c1.375-0.6006,2.6738968-1.1670001,3.88871-1.3016999  c0.04879,0.0028999,0.0966873,0.0009999,0.1454887-0.0039001c4.4755974-0.4395,8.827198,1.1601,11.952198,4.3838  C56.0013657,9.6854143,57.4593658,14.0868139,56.8773651,18.537014z"
          ></path>
        </svg>
      ),
      text: "Repositorio y registro digital de odontogramas.",
    },
    {
      id: 4,
      name: "Administración de personal médico",
      icon: TbUsers,
      text:
        "Control total de agendas de personal médico de hasta 30 doctores",
    },
    {
      id: 5,
      name: "Control y registro de costos",
      icon: FaRegMoneyBillAlt,
      text:
        "Obten el control de los ingresos y egresos a traves de un reporte mensual automático.",
    },
    {
      id: 6,
      name: "Promovemos tu consultorio en la web",
      icon: MdAdsClick,
      text:
        "Registrate y alcanza a miles de clientes potenciales a tu clínica o consultorio",
    },
  ];
  return (
    <section className=" mt-10">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="max-w-screen-md mb-8 lg:mb-16 text-center mx-auto">
          <h2 className="mb-4 text-xl sm:text-3xl tracking-tight font-extrabold text-gray-900  ">
            Diseñado para profesionales de la salud
          </h2>
          <p className="text-gray-500 sm:text-xl ">
            Ofrecemos las siguientes funciones
          </p>
        </div>
        <div className="space-y-8 md:grid md:grid-cols-3 features  gap-12 md:space-y-0">
         {features.map((e,index)=> <div key={e.id} className="bg-gray-50 rounded-lg p-4">
            <div className="flex mx-auto justify-center items-center mb-4 w-10 p-2 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 ">
             {index === 2 ? e.icon : <e.icon className=" text-blue-600 h-8 w-8 "/>}
            </div>
            <h3 className="mb-2 text-xl font-bold  text-center">
              {e.name}
            </h3>
            <p className="text-gray-500 ">
              {e.text}
            </p>
          </div>)}
      
     
        </div>
      </div>
    </section>
  );
};

export default Featureshome;
