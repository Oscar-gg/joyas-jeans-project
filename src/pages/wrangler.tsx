import { Model } from "~/components/card/Model";
import { Layout } from "~/components/layout/Layout";

import { api } from "~/utils/api";

export default function Wrangler() {
  const modelsAvailable = api.get.getModelsIds.useQuery({
    brandName: "WRANGLER",
  });

  return (
    <Layout>
      <div className="relative h-[300px] w-full">
        <img
          src="https://www.politix.com.au/on/demandware.static/-/Library-Sites-PolitixSharedLibrary/default/dwf8efd648/Denim%20Range%20Blog%20Banner.jpg"
          alt=""
          className="m-0 h-full w-full object-cover p-0"
        />
      </div>

      <div className="flex items-center justify-center pt-3">
        <h1 className="head m-3 p-3 text-4xl font-semibold">
          Wrangler Modelos
        </h1>
      </div>

      <div className="container mx-auto flex flex-wrap justify-center">
        {modelsAvailable.data?.map((model) => <Model modelId={model.id} />)}
      </div>
    </Layout>
  );
}
