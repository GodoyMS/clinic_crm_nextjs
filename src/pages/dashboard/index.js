import Image from "next/image";
import { Inter } from "next/font/google";
import AppointmentsTable from "@/components/tables/AppointmentsTable";
import AppointmetsTableCurrentMonth from "@/components/tables/AppointmetsTableCurrentMonth";
import { useSelector } from "react-redux";
import DoctorCardHome from "@/components/cards/DoctorCardHome";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";
import DashBoardContactHome from "@/components/forms/DashBoardContactHome";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const doctors = useSelector((state) => state.clinic.doctors);

  return (
    <div>
      <section className=" pb-20">
        <div className=" max-w-7xl mx-auto">
          <h2
            tabIndex="0"
            className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800"
          >
            Doctores
          </h2>
        </div>
        {doctors && (
          <div className=" max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6  gap-7 justify-center flex-wrap  pt-10   ">
            {doctors.slice(0, 6).map((doctor) => (
              <DoctorCardHome data={doctor} />
            ))}
          </div>
        )}
        <div className=" max-w-7xl flex  justify-end">
          <Link
            href={"/dashboard/profesionales"}
            className=" flex justify-center hover:text-blue-600 hover:translate-x-4  transition-transform duration-300  gap-2 items-center"
          >
            <FaLongArrowAltRight />
            Ver todos
          </Link>
        </div>
      </section>
      <section>
        <div className=" max-w-7xl mx-auto">
          <AppointmetsTableCurrentMonth />
        </div>
      </section>

      <section className=" py-40 max-w-7xl mx-auto">
        <DashBoardContactHome />
      </section>
    </div>
  );
}
