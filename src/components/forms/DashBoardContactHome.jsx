import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { useRouter } from "next/router";

const DashBoardContactHome = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [phone, setPhone] = useState("");
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        emailjs
          .send(
            "service_wvqh7h9",
            "template_afvupw8",
            {
              to_name: "Pasco Jobs",
              from_name: name,
              message: `Pasco Jobs: \n Email: ${email} \n Número: ${phone} \n Mensaje : ${message}`,
            },
            "3XcSJoXidgs4cXUEL"
          )
          .then((result) => {
            console.log(result.text);
            resetValues();
            setIsLoading(false);
          })
          .then(() => router.push(`/formsuccess/${name}`))
          .catch((error) => {
            console.log(error.text);
          });
      };
    
      const resetValues = () => {
        setName("");
        setEmail("");
        setMessage("");
        setPhone("");
      };
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-6 mr-2 bg-gray-100  sm:rounded-lg">
          <h1 className="text-4xl sm:text-5xl text-gray-800  font-extrabold tracking-tight">
            Contáctanos
          </h1>
          <p className="text-normal text-lg sm:text-2xl font-medium text-gray-600  mt-2">
            Completa el formulario para enviar tu mensaje
          </p>

          <div className="flex items-center mt-4 text-gray-600 ">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              className="w-8 h-8 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
            <div className="ml-4 text-md tracking-wide font-semibold w-40">
              alphaclinicas.business@gmail.com
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-6 flex flex-col justify-center">
          <div className="flex items-center gap-4">
            <label
              htmlFor="destinatario"
              className="text-gray-700 font-semibold "
            >
              Para:
            </label>
            <input
              type="email"
              name="destinatario"
              id="destinatario"
              disabled={true}
              value="alphaclinicas.soporte@gmail.com"
              className="w-full mt-2 py-3 px-3 rounded-lg bg-white  border border-gray-400  text-gray-800  font-semibold focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="name" className="hidden">
              Nombres
            </label>
            <input
              type="name"
              name="name"
              value={name}
              onChange={(prev) => setName(prev.target.value)}              
              id="name"
              required
              placeholder="Nombres"
              className="w-100 mt-2 py-3 px-3 rounded-lg bg-white  border border-gray-400  text-gray-800  font-semibold focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col mt-2">
            <label htmlFor="email" className="hidden">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(prev) => setEmail(prev.target.value)}
              required
              id="email"
              placeholder="Email"
              className="w-100 mt-2 py-3 px-3 rounded-lg bg-white  border border-gray-400  text-gray-800  font-semibold focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col mt-2">
            <label htmlFor="mensaje" className="hidden">
              Mensaje
            </label>
            <textarea
              name="mensaje"
              id="tel"
              placeholder="Mensaje"
              value={message}
              onChange={(prev) => setMessage(prev.target.value)}
              required
              rows="3"
              className="w-100 mt-2 py-3 px-3 rounded-lg bg-white  border border-gray-400  text-gray-800  font-semibold focus:border-blue-500 focus:outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="md:w-32 bg-blue-600  text-white  font-bold py-3 px-6 rounded-lg mt-4 hover:bg-blue-500  transition ease-in-out duration-300"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashBoardContactHome;
