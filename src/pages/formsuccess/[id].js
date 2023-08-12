// pages/[id].js
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BsGrid3X3Gap, BsPalette2 } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { BiHomeCircle } from "react-icons/bi";
import Image from "next/image";
import Head from "next/head";
export default function MyPage() {
  const router = useRouter();
  const testimonialsForm = [
    {
      id: 0,
      said:
        "Monstruo creativo se compromete a transformar una idea en un diseño con magia y actitu",
      author: "Emilia Clark",
      imgSrc: "/assets/images/clients/demo1.webp",
      stars: 5,
    },
    {
      id: 1,
      said:
        "Jamas estuve tan emocionado por un projecto de campañas publicitarias",
      author: "Kate Stevens",
      imgSrc: "/assets/images/clients/demo2.webp",
      stars: 4,
    },
    {
      id: 2,
      said:
        "Monstruo creativo se compromete a transformar una idea en un diseño con magia y actitu",
      author: "Batman",
      imgSrc: "/assets/images/clients/demo3.webp",
      stars: 5,
    },
    {
      id: 0,
      said:
        "Monstruo creativo se compromete a transformar una idea en un diseño con magia y actitu",
      author: "Jon Snow",
      imgSrc: "/assets/images/clients/demo4.webp",
      stars: 5,
    },
  ];

  const { id } = router.query; // Access the string parameter
  const str = id;
  let capitalizedStr = "";

  if (str && str.length > 0) {
    capitalizedStr = str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <>
      <Head>
        <title>Gracias</title>
      </Head>
      <div className=" md:pl-20 pr-0 mt-20 md:mt-0 bg-gradient-to-r pb-40 min-h-screen">
        <section className="mt-20">
          <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
            <div className="font-light text-zinc-500 sm:text-lg dark:text-zinc-400">
              <h2 className="mb-4 text-4xl     md:text-7xl  tracking-tight font-extrabold text-zinc-900 dark:text-zinc-300">
                Hey, {capitalizedStr}
              </h2>
              <p className="mb-4 mt-8 font-semibold">
                En breve nos contactaremos contigo
              </p>

              <div className="flex gap-8 justify-start items-center my-10">
                <div>
                  <BiHomeCircle className="w-8 h-8" />
                </div>
                <div className="">
                  <Link
                    href={"/"}
                    className="font-bold tracking-tight p-3 hover:bg-blue-800 bg-blue-700 rounded-xl text-white text-lg "
                  >
                    Volver a inicio
                  </Link>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 mt-8">
              <Image
                width={800}
                height={800}
                className="w-full rounded-lg"
                src="/assets/formsuccess/thanks.png"
                alt="Thank you"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
