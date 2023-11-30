import { type RouterOutputs, api } from "~/utils/api";


export const Model = ({ modelId }: { modelId: string }) => {
  const { data: modelInfo } = api.get.getModelById.useQuery({
    id: modelId,
  });

  return (
    <div className="w-full max-w-xs px-4 py-4 transition duration-300 ease-in-out hover:scale-110 sm:w-1/2 md:w-1/4">
      {modelInfo ? (
        <a href="/templatelevi">
          <div className="card rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-2 text-xl font-semibold">{modelInfo.name}</h2>
            <img
              src="https://levimx.vtexassets.com/arquivos/ids/859243-1200-auto?v=638332781020370000&width=1200&height=auto&aspect=true"
              alt="Product 1"
              className="mb-4"
            />
            <p className="text-gray-600">
              Cantidad disponible: {modelInfo._count.product}
            </p>
          </div>
        </a>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};
