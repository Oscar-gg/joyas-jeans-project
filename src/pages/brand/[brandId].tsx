import { Layout } from "~/components/layout/Layout";
import Select from "react-select";

import { api } from "~/utils/api";
import { useRouter } from "next/router";
import ValidImage from "~/components/general/ValidImage";
import { useState } from "react";
import type { RouterOutputs } from "~/utils/api";
import { Model } from "~/components/card/Model";

export default function BrandPage() {
  const router = useRouter();

  const model = router.query?.brandId as string;

  const { data: brand, isLoading: loadingBrand } =
    api.get.getBrandById.useQuery({
      id: model ?? "-1",
    });

  return (
    <Layout>
      <PageContent isLoading={loadingBrand} brandData={brand} />
    </Layout>
  );
}

const PageContent = ({
  isLoading,
  brandData,
}: {
  isLoading: boolean;
  brandData?: RouterOutputs["get"]["getBrandById"];
}) => {
  if (isLoading) {
    return <div>Cargando...</div>;
  } else if (!brandData) {
    return <p>No se encontró la marca.</p>;
  } else {
    const { data: modelsAvailable, isLoading: loadingModels } =
      api.get.getBrandModelsById.useQuery({
        brandId: brandData.id,
      });

    return (
      <>
        <div className="relative h-[300px] w-full">
          <img
            src={brandData.image}
            alt={`Imagen de ${brandData.name}`}
            className="m-0 h-full w-full object-cover p-0"
          />
        </div>

        <div className="flex items-center justify-center pt-3">
          <h1 className="head m-3 p-3 text-4xl font-semibold">
            {brandData.name} Modelos
          </h1>
        </div>

        <div className="container mx-auto flex flex-wrap justify-center">
          {modelsAvailable ? (
            modelsAvailable?.map((model) => (
              <Model modelId={model.id} key={model.id} />
            ))
          ) : (
            <p>
              {loadingModels
                ? "Cargando modelos"
                : "No se encontraron modelos disponibles."}
            </p>
          )}
        </div>
      </>
    );
  }
};
