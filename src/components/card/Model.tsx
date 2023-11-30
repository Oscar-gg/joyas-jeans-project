import { type RouterOutputs, api } from "~/utils/api";
import ValidImage from "~/components/general/ValidImage";

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
            <ValidImage
              src={modelInfo.image ?? ""}
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
