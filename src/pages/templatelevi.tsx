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

       <div className="flex items-center justify-center pt-3"> 
       {/* AQUI PONA LA MARCA, OSEA LEVI */}
        <h1 className="text-4xl font-semibold p-3 m-3 head">LEVI</h1>
        </div>
        <div className="container mx-auto p-4">
       
        <div className="md:flex">
            <div className="md:w-1/2">
                <img src="https://storage.sg.content-cdn.io/cdn-cgi/image/width=1034,height=1376,quality=75,format=auto,fit=cover,g=top/in-resources/a0d2c181-e3c2-4717-b73e-5f1be3a691a6/Images/ProductImages/Source/levis-mens-skate-501-jeans-596920033_15_Details.jpg" alt="Product Image" className="w-full md:max-w-full" />
            </div>
        
         
            <div className="md:w-1/2 p-4">
                {/* aqui vas A PONER EL CORTE (POR EJMEPLO 501) */}
                <h1 className="text-3xl font-bold mb-4">501</h1>
                {/* RECUERDA QUE GEORGE Y RUSTLER SOLO TIENEN TIPO DE FIT, ENTOCNES AQUI PONDRIAS NADA LOL */}
               
                
              
                <div className="mb-4 md:flex md:space-x-4 md:mb-0 sm:p-6">
                    <label className="text-lg font-semibold self-center md:w-1/4">Tamaño:</label>
                    <div className="md:flex-grow">
                        <div className="flex flex-wrap gap-2">
                            <button className="size-button p-2 rounded-full border border-gray-300 hover:bg-gray-200">29</button>
                            <button className="size-button p-2 rounded-full border border-gray-300 hover:bg-gray-200">30</button>
                            <button className="size-button p-2 rounded-full border border-gray-300 hover:bg-gray-200">31</button>
                        
                        </div>
                    </div>
                </div>
                
            
                <div className="mb-4 sm:p-6">
                    <label className="text-lg font-semibold">Color:</label>
                    <select className="border border-gray-300 p-2 rounded-lg w-full">
                        <option>Azul</option>
                        <option>Negro</option>
                        <option>Dark Wash</option>
                        <option>Medium Wash</option>
                        <option>Light Wash</option>
                        <option>Beige</option>
                        <option>Azul Petróleo</option>
                        <option>Verde</option>
                        <option>Café</option>
                        <option>Caqui</option>
                        <option>Gris</option>
                    </select>
                </div>

                <div className="mb-4 sm:p-6">
                    <label className="text-lg font-semibold">Fit:</label>
                    <select className="border border-gray-300 p-2 rounded-lg w-full">
                        <option>Skinny</option>
                        <option>Bootcut</option>
                    {/* PON MAS OPCIONES O COMO SEA */}
                    </select>
                </div>
                
                
              
                <div className="mb-4 sm:p-6">
                    <label className="text-lg font-semibold">Longitud:</label>
                    <select className="border border-gray-300 p-2 rounded-lg w-full">
                        <option>30</option>
                        <option>32</option>
                        <option>34</option>
                        <option>36</option>
                    </select>
                </div>

                <div className="mb-4">
                    {/* LA DESCRIPCION QUE TIENE ARTURO, BASADO EN EL TIPO DE FIT QUE ELIGA*/}
                    <h2 className="text-xl font-semibold mb-2">Description</h2>
                    <p className="text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget urna a urna laoreet tristique sed nec lorem. Fusce euismod odio ut lorem euismod, eu aliquam tortor iaculis.
                    </p>
                </div>
            </div>
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
