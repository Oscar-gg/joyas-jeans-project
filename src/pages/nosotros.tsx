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
    <h1 className="text-7xl font-smart pl-[20%] sm:pl-[0%]">¿Quiénes Somos?</h1>

    <p className="font-regular text-justify items-center justify-center px-[15%] sm:px-[25%] place-content-center pt-[3%]">
        En Joyas Jeans, somos apasionados por la moda y comprometidos con ofrecerte lo mejor en jeans para hombre. Nuestra misión es brindarte calidad y estilo en cada prenda que vendemos. Nos enorgullecemos de representar varias marcas de jeans de renombre, seleccionando cuidadosamente cada pieza para que encuentres la opción perfecta que se ajuste a tu estilo y necesidades.
    </p>

    <p className="font-regular text-justify items-center justify-center px-[15%] sm:px-[25%] place-content-center pt-[3%] pb-[5%]">
        Además de ofrecer productos de alta calidad, en Joyas Jeans también nos comprometemos a brindar un servicio al cliente excepcional. Estamos aquí para ayudarte a encontrar el jeans perfecto, responder a tus preguntas y asegurarnos de que tengas una experiencia de compra satisfactoria. Con Joyas Jeans, no solo obtendrás los mejores jeans, sino que también recibirás el mejor servicio en el camino hacia el estilo y la comodidad que deseas.
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
