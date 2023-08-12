import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import Featureshome from "@/components/home/Featureshome";
const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  return (
    <main>
      {" "}
        <section>
          <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div class="mr-auto mt-10 lg:mt-0 flex-col flex lg:block items-center w-full place-self-center lg:col-span-5 ">
              <h1 class="max-w-2xl mb-4 text-3xl md:text-5xl font-extrabold flex justify-center tracking-tight leading-none ">
                Sistematiza tu consultorio y administra los procesos eficazmente{" "}
              </h1>
              <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl ">
                Software para gestión de información, pagos, citas,
                tratamientos, historial médico y mas.
              </p>
              <div class="flex justify-center lg:justify-start ">
                <Link

                  href="/register"
                  class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 "
                >
                  Registra tu consultorio Ahora
                  <svg
                    class="w-5 h-5 ml-2 -mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </Link>
                <a
                  href="software-odontologos.php"
                  class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100    "
                >
                  Conoce más
                </a>
              </div>
            </div>
            <div class=" lg:mt-0 lg:col-span-7 mt-10   lg:flex ">
              <Image
                width={700}
                height={700}
                src="/assets/images/home/desktop.png"
                alt="doctor"
                className=" mx-auto"
              />
            </div>
          </div>
        </section>
        <Featureshome/>
    </main>
  );
}
