import { links } from "@/data/navbarLinks";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

import { BiMessageAlt } from "react-icons/bi";
import Footer from "../footer/Footer";

const LayoutMain = ({ children }) => {
  const [isMobileMenuActive, setIsMobileMenuActive] = useState();
  const [isChatActive, setIsChatActive] = useState(true);

  return (
    <>
      <nav
        style={{ zIndex: 900 }}
        className="  px-4 py-4 w-full relative bg-gray-100"
      >
        <div className="max-w-7xl mx-auto w-full flex justify-between">
          <Link className="text-3xl font-bold leading-none" href="/">
            <Image
              width={100}
              height={100}
              alt="Alpha Clinicas Logo"
              className=" w-10 h-10 "
              src={"/logo/logo-no-back.png"}
            />
          </Link>
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuActive(!isMobileMenuActive)}
              className="navbar-burger flex items-center text-blue-600 p-3"
            >
              <svg
                className="block h-4 w-4 fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Mobile menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
              </svg>
            </button>
          </div>

          <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-2">
            {links.map((e) => (
              <>
                <li className="relative">
                  <Link
                    href={e.link}
                    className="text-sm relative hover:bg-white px-4 py-2 rounded-md text-gray-600 font-bold hover:text-gray-800"
                  >
                    {e.name}
                  </Link>
                </li>
                <li className="text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    className="w-4 h-4 current-fill"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </li>
              </>
            ))}
          </ul>
          <Link
            className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-white hover:bg-gray-50 text-sm text-gray-900 font-bold  rounded-xl transition duration-200"
            href="/login"
          >
            Iniciar sesión
          </Link>
          <Link
            className="hidden lg:inline-block bg-blue-600 hover:bg-blue-700 py-2 px-6 bg-primary hover:bg-primaryhover text-sm text-white font-bold rounded-xl transition duration-200"
            href="/register"
          >
            Registrarse
          </Link>
        </div>
      </nav>
      {isMobileMenuActive && (
        <div style={{ zIndex: 100 }} className="navbar-menu relative ">
          <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
          <nav className="fixed top-0 right-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-gray-100 border-r overflow-y-auto">
            <div className="flex items-center mb-8">
              <Link className="text-3xl font-bold leading-none" href="/">
                <Image
                  width={100}
                  height={100}
                  alt="Alpha Clinicas Logo"
                  className=" w-10 h-10 "
                  src={"/logo/logo-no-back.png"}
                />
              </Link>
              <button
                onClick={() => setIsMobileMenuActive(false)}
                className="navbar-close"
              >
                <svg
                  className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <div>
              <ul>
                {links.map((e) => (
                  <li key={e.id} className="mb-1">
                    <Link
                      onClick={() => setIsMobileMenuActive(false)}
                      href={e.link}
                      className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                    >
                      {e.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-auto">
              <div className="pt-6">
                <Link
                  onClick={() => setIsMobileMenuActive(false)}
                  className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold  bg-gray-50 hover:bg-white rounded-xl"
                  href="/login"
                >
                  Iniciar Sesion
                </Link>
                <Link
                  onClick={() => setIsMobileMenuActive(false)}
                  className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700  rounded-xl"
                  href="/register"
                >
                  Registro
                </Link>
              </div>
              <p className="my-4 text-xs text-center text-gray-400">
                <span>Copyright © 2023</span>
              </p>
            </div>
          </nav>
        </div>
      )}
      {isChatActive && (
        <div
          style={{ zIndex: 300 }}
          className="fixed bottom-5 right-5 w-72 divide-y shadow-2xl rounded-md border  bg-white"
        >
          <div className="flex gap-2 px-3 py-3 items-start">
            <div className="text-gray-500">
              <button onClick={() => setIsChatActive(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold">
                ¿Tienes alguna pregunta? Email us!
              </h3>
              <p className="text-xs text-gray-400">Te responderemos pronto</p>
            </div>
            <div>
              <Image
                width={100}
                height={100}
                src="/assets/images/doctors/doctor2.webp"
                alt="avatar"
                class="w-8 h-8 rounded-full"
              />
            </div>
          </div>
          <div className="flex justify-center px-5 py-3">
            <Link href="/contacto" class="text-sm font-bold text-blue-600">
              Envianos un mensaje
            </Link>
          </div>
        </div>
      )}
      {!isChatActive && (
        <div
          onClick={() => setIsChatActive(true)}
          style={{ zIndex: 300 }}
          className="fixed bottom-5 cursor-pointer bg-white shadow-xl rounded-full p-2 right-5 "
        >
          <BiMessageAlt className="w-6 h-6 md:w-8 md:h-8" />
        </div>
      )}

      <div className=" min-h-screen">
      {children}
      </div>
      {/* <Footer /> */}
      <Footer />
    </>
  );
};

export default LayoutMain;
