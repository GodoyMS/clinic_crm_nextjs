import { links } from "@/data/navbarLinks";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white rounded-lg shadow  m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            href="/"
            className="flex items-center mb-4 sm:mb-0"
          >
            <Image
            width={200}
            height={200}
              src="/logo/logo-solid-bg.png"
              className="h-10 w-10 mr-3"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap ">
              Alpha Clinicas
            </span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 ">
            {links.map((e) => (
              <li key={e.id}>
                <Link href={e.link} className="mr-4 hover:underline md:mr-6 ">
                  {e.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center ">
          © 2023{" "}
          <Link href="/" className="hover:underline">
            Alpha Clinicas™
          </Link>
          .Todos los derechos reservados
        </span>
      </div>
    </footer>
  );
};

export default Footer;
