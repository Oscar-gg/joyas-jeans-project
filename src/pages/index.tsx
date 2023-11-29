import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { Layout } from "~/components/layout/Layout";

import { api } from "~/utils/api";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });
  const mutation = api.product.uploadData.useMutation();

  return (
<<<<<<< HEAD
    <>
      <Head>
        <title>Jeans</title>
        <meta name="description" content="jeans pantalones levi wrangler" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Genos:wght@600&family=Playfair+Display&family=Raleway&family=Roboto+Condensed&display=swap" rel="stylesheet"></link>
      </Head>
      <main>
    
    <section className="bg-gray-900 text-white h-screen flex flex-col md:flex-row justify-center items-center">
  
        <div className="md:w-1/2 text-center md:text-left p-8">
            <h1 className="text-4xl font-bold font-head">Los mejores Jeans... al MEJOR precio.</h1>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Compra Ahora
            </button>
        </div>

        <div className="md:w-1/2 p-8">
            <img src="https://media1.popsugar-assets.com/files/thumbor/b0rTsnJv_zrjHN12CqokFY4T_JQ=/0x0:1456x1456/fit-in/792x792/filters:format_auto():upscale()/2023/06/12/874/n/1922564/dbb82869648779136c7a15.00616962_.jpg" alt="Jeans Model" className="w-full rounded-lg shadow-lg" />
        </div>
    </section>


        <div className="container mx-auto flex flex-wrap justify-center">
  
            <div className="w-full sm:w-1/2 md:w-1/4 px-4 py-4 max-w-xs transition duration-300 ease-in-out hover:scale-110">
              <a href=""> 
                <div className="bg-white rounded-lg shadow-lg p-6 card">
                    <h2 className="text-xl font-semibold mb-2 justify-center">SHOP LEVIS</h2>
                    <img className="" src="https://www.designscene.net/wp-content/uploads/2021/05/Levis-501-Micaiah-Carter-04.jpg" alt="" />
                </div>
                </a>
            </div>

      
            <div className="w-full sm:w-1/2 md:w-1/4 px-4 py-4 max-w-xs transition duration-300 ease-in-out hover:scale-110">
              <a href="">
                <div className="bg-white rounded-lg shadow-lg p-6 card">
                    <h2 className="text-xl font-semibold mb-2 justify-center">SHOP WRANGLER</h2>
                    <img className="" src="https://images.wrangler.com/is/image/Wrangler/47MACMS-HERO?$KDP-XLARGE$" alt="" />
                </div>
                </a>
            </div>

   
            <div className="w-full sm:w-1/2 md:w-1/4 px-4 py-4 max-w-xs transition duration-300 ease-in-out hover:scale-110">
              <a href="">
                <div className="bg-white rounded-lg shadow-lg p-6 card">
                    <h2 className="text-xl font-semibold mb-2 justify-center">SHOP RUSTLER</h2>
                    <img className="" src="https://i.pinimg.com/736x/93/c3/81/93c38144c2f73e0e4ccc0f4d73681772.jpg" alt="" />
                </div>
                </a>
            </div>

     
            <div className="w-full sm:w-1/2 md:w-1/4 px-4 py-4 max-w-xs transition duration-300 ease-in-out hover:scale-110">
              <a href="">
                <div className="bg-white rounded-lg shadow-lg p-6 card">
                    <h2 className="text-xl font-semibold mb-2 justify-center">SHOP GEORGE</h2>
                    <img className="" src="https://img.shopstyle-cdn.com/sim/03/8f/038f4ab10e7d86c725f25fc3cda44f54_xlarge/ebony-navy-mid-rise-skinny-fit-jeans-dark-denim.jpg" alt="" />
                </div>
                </a>
            </div>
=======
    <Layout>
      <main className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/usage/first-steps"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">First Steps →</h3>
              <div className="text-lg">
                Just the basics - Everything you need to know to set up your
                database and authentication.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/introduction"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Documentation →</h3>
              <div className="text-lg">
                Learn more about Create T3 App, the libraries it uses, and how
                to deploy it.
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
            <AuthShowcase />
            {/* <button className="m-2 rounded-lg bg-white p-2" onClick={() => {mutation.mutate()}}>
              Upload data
            </button> */}
          </div>
>>>>>>> main
        </div>
      </main>
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
