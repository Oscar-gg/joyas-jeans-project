import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { Layout } from "~/components/layout/Layout";

import { api } from "~/utils/api";

export default function Home() {
  return (
    <Layout>
      <section className="flex h-screen flex-col items-center justify-center bg-gray-900 text-white md:flex-row">
        <div className="p-8 text-center md:w-1/2 md:text-left">
          <h1 className="font-head text-4xl font-bold">
            Los mejores Jeans... al MEJOR precio.
          </h1>
          <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
            Compra Ahora
          </button>
        </div>

        <div className="p-8 md:w-1/2">
          <img
            src="https://media1.popsugar-assets.com/files/thumbor/b0rTsnJv_zrjHN12CqokFY4T_JQ=/0x0:1456x1456/fit-in/792x792/filters:format_auto():upscale()/2023/06/12/874/n/1922564/dbb82869648779136c7a15.00616962_.jpg"
            alt="Jeans Model"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </section>

      <div className="container mx-auto flex flex-wrap justify-center">
        <div className="w-full max-w-xs px-4 py-4 transition duration-300 ease-in-out hover:scale-110 sm:w-1/2 md:w-1/4">
          <Link href="/levi">
            <div className="card rounded-lg bg-white p-6 shadow-lg">
              <h2 className="mb-2 justify-center text-xl font-semibold">
                SHOP LEVIS
              </h2>
              <img
                className=""
                src="https://www.designscene.net/wp-content/uploads/2021/05/Levis-501-Micaiah-Carter-04.jpg"
                alt=""
              />
            </div>
          </Link>
        </div>

        <div className="w-full max-w-xs px-4 py-4 transition duration-300 ease-in-out hover:scale-110 sm:w-1/2 md:w-1/4">
          <Link href="/wrangler">
            <div className="card rounded-lg bg-white p-6 shadow-lg">
              <h2 className="mb-2 justify-center text-xl font-semibold">
                SHOP WRANGLER
              </h2>
              <img
                className=""
                src="https://images.wrangler.com/is/image/Wrangler/47MACMS-HERO?$KDP-XLARGE$"
                alt=""
              />
            </div>
          </Link>
        </div>

        <div className="w-full max-w-xs px-4 py-4 transition duration-300 ease-in-out hover:scale-110 sm:w-1/2 md:w-1/4">
          <Link href="/rustler">
            <div className="card rounded-lg bg-white p-6 shadow-lg">
              <h2 className="mb-2 justify-center text-xl font-semibold">
                SHOP RUSTLER
              </h2>
              <img
                className=""
                src="https://i.pinimg.com/736x/93/c3/81/93c38144c2f73e0e4ccc0f4d73681772.jpg"
                alt=""
              />
            </div>
          </Link>
        </div>

        <div className="w-full max-w-xs px-4 py-4 transition duration-300 ease-in-out hover:scale-110 sm:w-1/2 md:w-1/4">
          <Link href="/george">
            <div className="card rounded-lg bg-white p-6 shadow-lg">
              <h2 className="mb-2 justify-center text-xl font-semibold">
                SHOP GEORGE
              </h2>
              <img
                className=""
                src="https://img.shopstyle-cdn.com/sim/03/8f/038f4ab10e7d86c725f25fc3cda44f54_xlarge/ebony-navy-mid-rise-skinny-fit-jeans-dark-denim.jpg"
                alt=""
              />
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
