import { signIn, signOut, useSession } from "next-auth/react";
import { Layout } from "~/components/layout/Layout";
import { api } from "~/utils/api";

export default function We() {
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
        <h1 className="font-smart pl-[20%] text-7xl sm:pl-[0%]">
          ¿Quiénes Somos?
        </h1>

        <p className="font-regular place-content-center items-center justify-center px-[15%] pt-[3%] text-justify sm:px-[25%]">
          En Joyas Jeans, somos apasionados por la moda y comprometidos con
          ofrecerte lo mejor en jeans para hombre. Nuestra misión es brindarte
          calidad y estilo en cada prenda que vendemos. Nos enorgullecemos de
          representar varias marcas de jeans de renombre, seleccionando
          cuidadosamente cada pieza para que encuentres la opción perfecta que
          se ajuste a tu estilo y necesidades.
        </p>

        <p className="font-regular place-content-center items-center justify-center px-[15%] pb-[5%] pt-[3%] text-justify sm:px-[25%]">
          Además de ofrecer productos de alta calidad, en Joyas Jeans también
          nos comprometemos a brindar un servicio al cliente excepcional.
          Estamos aquí para ayudarte a encontrar el jeans perfecto, responder a
          tus preguntas y asegurarnos de que tengas una experiencia de compra
          satisfactoria. Con Joyas Jeans, no solo obtendrás los mejores jeans,
          sino que también recibirás el mejor servicio en el camino hacia el
          estilo y la comodidad que deseas.
        </p>
      </div>
    </Layout>
  );
}
