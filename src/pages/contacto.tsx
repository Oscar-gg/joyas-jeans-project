import { signIn, signOut, useSession } from "next-auth/react";

import { Layout } from "~/components/layout/Layout";

import { api } from "~/utils/api";

export default function Contact() {
  return (
    <Layout>
      <div className="relative h-[300px] w-full">
        <img
          src="https://www.politix.com.au/on/demandware.static/-/Library-Sites-PolitixSharedLibrary/default/dwf8efd648/Denim%20Range%20Blog%20Banner.jpg"
          alt=""
          className="m-0 h-full w-full object-cover p-0"
        />
      </div>

      <div className="container mt-5 flex max-w-[100%] flex-col items-center justify-center">
        <h1 className="font-smart pl-[20%] text-7xl sm:pl-[0%]">Contáctanos</h1>

        <p className="font-regular place-content-center items-center justify-center px-[15%] pt-[3%] text-justify sm:px-[25%]">
          ¿ Tienes duda , o necesitas apoyo? Estamos aqui para atenderte y
          ayudarte.
        </p>

        <div className="flex flex-col items-center justify-center pt-5">
          <p className="text-lg font-bold">Marcanos a:</p>
          <p className="text-xl">+81 75 66 43 24</p>
        </div>

        <div className="mt-5 w-full max-w-md p-6">
          <form className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="font-bold">
                Nombre:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="rounded border p-2"
                placeholder="Tu nombre"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="font-bold">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="rounded border p-2"
                placeholder="Tu email"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="message" className="font-bold">
                Mensaje:
              </label>
              <textarea
                id="message"
                name="message"
                className="rounded border p-2"
                placeholder="Tu mensaje"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="rounded bg-blue-500 py-2 font-bold text-white transition duration-300 hover:bg-blue-600"
            >
              Send Email
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
