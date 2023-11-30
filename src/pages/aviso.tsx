import { Layout } from "~/components/layout/Layout";

export default function Aviso() {
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
          Aviso de Privacidad
        </h1>

        <p className="font-regular place-content-center items-center justify-center px-[15%] pt-[3%] text-justify sm:px-[25%]">
          En Joyas Jeans, valoramos y respetamos tu privacidad. Este aviso tiene
          como objetivo informarte sobre cómo recopilamos, usamos y protegemos
          tus datos personales cuando interactúas con nuestro sitio web y
          nuestros servicios. Estamos comprometidos a garantizar la seguridad y
          confidencialidad de la información que compartes con nosotros.
        </p>

        <p className="font-regular place-content-center items-center justify-center px-[15%] pb-[5%] pt-[3%] text-justify sm:px-[25%]">
          Utilizamos tus datos personales solo con fines relacionados con tu
          experiencia de compra y para proporcionarte un servicio personalizado.
          No compartiremos tu información con terceros sin tu consentimiento
          expreso. Si deseas conocer más detalles sobre nuestra política de
          privacidad, cómo ejercer tus derechos de privacidad o tienes alguna
          pregunta relacionada con tus datos personales, no dudes en
          contactarnos. Tu privacidad es importante para nosotros, y trabajamos
          diligentemente para protegerla en todo momento.
        </p>
      </div>
    </Layout>
  );
}
