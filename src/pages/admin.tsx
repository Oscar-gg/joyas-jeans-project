import { Layout } from "~/components/layout/Layout";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { EditModal } from "~/components/modal/EditModal";
import { ModelEdit } from "~/components/edit/ModelEdit";
import { ColorEdit } from "~/components/edit/ColorEdit";
import { ProductEdit } from "~/components/edit/ProductEdit";
import { SearchBar } from "~/components/general/SearchBar";
import { ModelTable } from "~/components/table/ModelTable";
import { ColorTable } from "~/components/table/ColorTable";
import { FitEdit } from "~/components/edit/FitEdit";
import { FitTable } from "~/components/table/FitTable";
import { ProductTable } from "~/components/table/ProductTable";

type WindowTypes = "modelos" | "colores" | "fit" | "productos";

export default function SponsorsPage() {
  const [seeWindow, setSeeWindow] = useState<WindowTypes>("modelos");
  const [seeModal, setSeeModal] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  let modalTitle = "indefinido";
  if (seeWindow) {
    modalTitle = `Crear ${seeWindow}`;
  }

  return (
    <Layout>
      {seeModal && (
        <EditModal title={modalTitle} setSeeModal={setSeeModal}>
          <CreateForm createType={seeWindow} />
        </EditModal>
      )}
      <div className="flex w-full flex-col flex-wrap items-center align-middle">
        <div className="my-4 flex w-[80%] flex-row flex-wrap items-center justify-center gap-x-2 gap-y-3">
          <AiOutlinePlusCircle
            size={40}
            className="rounded-full p-1 duration-1000 hover:bg-slate-300"
            onClick={() => {
              setSeeModal(!seeModal);
            }}
          />
          <button
            className="h-fit rounded-md bg-slate-200 p-2 duration-500 hover:bg-slate-300"
            onClick={() => {
              setSeeWindow("modelos");
            }}
          >
            Modelos
          </button>
          <button
            className="h-fit rounded-md bg-slate-200 p-2 duration-500 hover:bg-slate-300"
            onClick={() => {
              setSeeWindow("colores");
            }}
          >
            Colores
          </button>
          <button
            className="h-fit rounded-md bg-slate-200 p-2 duration-500 hover:bg-slate-300"
            onClick={() => {
              setSeeWindow("fit");
            }}
          >
            Fit
          </button>
          <button
            className="h-fit rounded-md bg-slate-200 p-2 duration-500 hover:bg-slate-300"
            onClick={() => {
              setSeeWindow("productos");
            }}
          >
            Productos
          </button>
          <SearchBar setSearch={setSearch} className="w-80" />
        </div>
      </div>
      <PageContent windowType={seeWindow} search={search} />
    </Layout>
  );
}

// type WindowTypes =
//   | "modelos"
//   | "colores"
//   | "fit"
//   | "productos";

const CreateForm = ({ createType }: { createType: WindowTypes }) => {
  if (createType === "modelos") {
    return <ModelEdit model={undefined} />;
  } else if (createType === "colores") {
    return <ColorEdit color={undefined} />;
  } else if (createType === "fit") {
    return <FitEdit fit={undefined} />;
  } else if (createType === "productos") {
    return <ProductEdit product={undefined} />;
  } else {
    return <p>Error: no se encontró el tipo especificado: {createType}</p>;
  }
};

const PageContent = ({
  windowType,
  search,
}: {
  windowType: WindowTypes;
  search: string;
}) => {
  if (windowType === "modelos") {
    return (
      <div className="justify-center text-center text-2xl">
        <ModelTable search={search} />
      </div>
    );
  } else if (windowType === "colores") {
    return (
      <div className="justify-center text-center text-2xl">
        <ColorTable search={search} />
      </div>
    );
  } else if (windowType === "fit") {
    return (
      <div className="justify-center text-center text-2xl">
        <FitTable search={search} />
      </div>
    );
  } else if (windowType === "productos") {
    return (
      <div className="justify-center text-center text-2xl">
        <ProductTable search={search} />
      </div>
    );
  }

  return (
    <p>Error, no se encontró el tipo de ventana especificado: {windowType}</p>
  );
};

// const SponsorContainer = ({ search }: { search: string }) => {
//   const { data: sponsors, isLoading } = api.sponsor.getSponsorsIds.useQuery({
//     search: search,
//   });

//   if (isLoading) {
//     return <p>Cargando...</p>;
//   } else if (!sponsors || sponsors.length === 0) {
//     return <p className="text-black">No hay sponsors D:</p>;
//   }

//   return (
//     <div className="flex w-full flex-row flex-wrap justify-center">
//       {sponsors?.map((sponsor) => (
//         <SponsorWrapper key={sponsor.id} sponsorId={sponsor.id} />
//       ))}
//     </div>
//   );
// };

// const SponsorPackContainer = ({ search }: { search: string }) => {
//   const { data: sponsorPacks, isLoading } =
//     api.sponsor.getSponsorPacksIds.useQuery({
//       search: search,
//     });

//   if (isLoading) {
//     return <p>Cargando...</p>;
//   } else if (!sponsorPacks || sponsorPacks.length === 0) {
//     return <p className="text-black">No hay sponsor packs D:</p>;
//   }

//   return (
//     <div className="flex w-full flex-row flex-wrap justify-center">
//       {sponsorPacks?.map((sponsorPack) => (
//         <SponsorPackWrapper
//           key={sponsorPack.id}
//           sponsorPackId={sponsorPack.id}
//         />
//       ))}
//     </div>
//   );
// };
