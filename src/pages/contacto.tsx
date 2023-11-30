import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { Layout } from "~/components/layout/Layout";

import { api } from "~/utils/api";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });
  const mutation = api.product.uploadData.useMutation();

  return (
    <Layout>

<div className="w-full h-[300px] relative">
    <img src="https://www.politix.com.au/on/demandware.static/-/Library-Sites-PolitixSharedLibrary/default/dwf8efd648/Denim%20Range%20Blog%20Banner.jpg" alt="" className="w-full h-full object-cover p-0 m-0" />
</div>


<div className="container flex flex-col items-center justify-center mt-5 max-w-[100%]">
    <h1 className="text-7xl font-smart pl-[20%] sm:pl-[0%]">Contactanos</h1>

    <p className="font-regular text-justify items-center justify-center px-[15%] sm:px-[25%] place-content-center pt-[3%]">
       ¿ Tienes duda , o necesitas apoyo? Estamos aqui para atenderte y ayudarte.
    </p>

    <div className="flex flex-col items-center justify-center pt-5">
        <p className="font-bold text-lg">Marcanos a:</p>
        <p className="text-xl">+81 75 66 43 24</p>
    </div>

    <div className="w-full max-w-md mt-5 p-6">
        <form className="flex flex-col space-y-4">
            <div className="flex flex-col">
                <label htmlFor="name" className="font-bold">Name:</label>
                <input type="text" id="name" name="name" className="border p-2 rounded" placeholder="Your Name" required />
            </div>

            <div className="flex flex-col">
                <label htmlFor="email" className="font-bold">Email:</label>
                <input type="email" id="email" name="email" className="border p-2 rounded" placeholder="Your Email" required />
            </div>

            <div className="flex flex-col">
                <label htmlFor="message" className="font-bold">Message:</label>
                <textarea id="message" name="message" className="border p-2 rounded" placeholder="Your Message" required></textarea>
            </div>

            <button type="submit" className="bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-300">Send Email</button>
        </form>
    </div>
</div>



       
    
    </Layout>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.post.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
