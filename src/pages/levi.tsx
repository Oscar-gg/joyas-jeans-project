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

       <div className="flex items-center justify-center pt-3"> 
        <h1 className="text-4xl font-semibold p-3 m-3 head">Levi Modelos</h1>
        </div>

        <div className="container mx-auto flex flex-wrap justify-center">
  
            <div className="w-full max-w-xs px-4 py-4 transition duration-300 ease-in-out hover:scale-110 sm:w-1/2 md:w-1/4">
                <a href="/templatelevi">
                <div className="card rounded-lg bg-white p-6 shadow-lg">
                    <h2 className="mb-2 text-xl font-semibold">MODEL NSE</h2>
                    <img
                    src="https://levimx.vtexassets.com/arquivos/ids/859243-1200-auto?v=638332781020370000&width=1200&height=auto&aspect=true"
                    alt="Product 1"
                    className="mb-4"
                    />
                    <p className="text-gray-600">Jeans mujer</p>
                </div>
                </a>
            </div>

            <div className="w-full max-w-xs px-4 py-4 transition duration-300 ease-in-out hover:scale-110 sm:w-1/2 md:w-1/4">
                <a href=" ">
                <div className="card rounded-lg bg-white p-6 shadow-lg">
                    <h2 className="mb-2 text-xl font-semibold">Product Names</h2>
                    <img
                    src="https://levimx.vtexassets.com/arquivos/ids/862065-1200-auto?v=638351571267500000&width=1200&height=auto&aspect=true"
                    alt="product"
                    className="mb-4"
                    />
                    <p className="text-gray-600">jean description</p>
                </div>
                </a>
            </div>

            <div className="w-full max-w-xs px-4 py-4 transition duration-300 ease-in-out hover:scale-110 sm:w-1/2 md:w-1/4">
                <a href=" ">
                <div className="card rounded-lg bg-white p-6 shadow-lg">
                    <h2 className="mb-2 text-xl font-semibold">Product Names</h2>
                    <img
                    src="https://levimx.vtexassets.com/arquivos/ids/862065-1200-auto?v=638351571267500000&width=1200&height=auto&aspect=true"
                    alt="product"
                    className="mb-4"
                    />
                    <p className="text-gray-600">jean description</p>
                </div>
                </a>
            </div>

            <div className="w-full max-w-xs px-4 py-4 transition duration-300 ease-in-out hover:scale-110 sm:w-1/2 md:w-1/4">
                <a href=" ">
                <div className="card rounded-lg bg-white p-6 shadow-lg">
                    <h2 className="mb-2 text-xl font-semibold">Product Names</h2>
                    <img
                    src="https://levimx.vtexassets.com/arquivos/ids/862065-1200-auto?v=638351571267500000&width=1200&height=auto&aspect=true"
                    alt="product"
                    className="mb-4"
                    />
                    <p className="text-gray-600">jean description</p>
                </div>
                </a>
            </div>

            <div className="w-full max-w-xs px-4 py-4 transition duration-300 ease-in-out hover:scale-110 sm:w-1/2 md:w-1/4">
                <a href=" ">
                <div className="card rounded-lg bg-white p-6 shadow-lg">
                    <h2 className="mb-2 text-xl font-semibold">Product Names</h2>
                    <img
                    src="https://levimx.vtexassets.com/arquivos/ids/862065-1200-auto?v=638351571267500000&width=1200&height=auto&aspect=true"
                    alt="product"
                    className="mb-4"
                    />
                    <p className="text-gray-600">jean description</p>
                </div>
                </a>
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
