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
    <h1 className="text-7xl font-smart pl-[20%] sm:pl-[0%]">Aviso de Privacidad</h1>

    <p className="font-regular text-justify items-center justify-center px-[15%] sm:px-[25%] place-content-center pt-[3%]">
        En Joyas Jeans, valoramos y respetamos tu privacidad. Este aviso tiene como objetivo informarte sobre cómo recopilamos, usamos y protegemos tus datos personales cuando interactúas con nuestro sitio web y nuestros servicios. Estamos comprometidos a garantizar la seguridad y confidencialidad de la información que compartes con nosotros.
    </p>

    <p className="font-regular text-justify items-center justify-center px-[15%] sm:px-[25%] place-content-center pt-[3%] pb-[5%]">
        Utilizamos tus datos personales solo con fines relacionados con tu experiencia de compra y para proporcionarte un servicio personalizado. No compartiremos tu información con terceros sin tu consentimiento expreso. Si deseas conocer más detalles sobre nuestra política de privacidad, cómo ejercer tus derechos de privacidad o tienes alguna pregunta relacionada con tus datos personales, no dudes en contactarnos. Tu privacidad es importante para nosotros, y trabajamos diligentemente para protegerla en todo momento.
    </p>
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
