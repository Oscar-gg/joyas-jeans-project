import { useState } from "react";
import { api } from "~/utils/api";
import { EditModal } from "../modal/EditModal";
import { ModelEdit } from "../edit/ModelEdit";

export const ModelTable = ({ search }: { search?: string }) => {
  const { data: models, isLoading } = api.get.getModelsIds.useQuery({
    search: search,
  });

  if (isLoading) {
    return <div>Cargando...</div>;
  } else if (!models || models.length === 0) {
    return <div>No se encontraron datos</div>;
  }

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full border-4 text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              {headers[0]}
            </th>
            <th scope="col" className="px-6 py-3">
              {headers[1]}
            </th>
            <th scope="col" className="px-6 py-3">
              {headers[2]}
            </th>
            <th scope="col" className="px-6 py-3">
              {headers[3]}
            </th>
            <th scope="col" className="px-6 py-3">
              {headers[4]}
            </th>
          </tr>
        </thead>
        <tbody>
          {models.map((model) => (
            <TableRow key={model.id} itemId={model.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const headers = [
  "Nombre",
  "Marca",
  "Imagen",
  "Productos asociados",
  "Modificar",
];

const TableRow = ({ itemId }: { itemId: string }) => {
  const { data: rowData, isLoading } = api.get.getModelById.useQuery({
    id: itemId,
  });
  const [seeModal, setSeeModal] = useState(false);

  if (isLoading) {
    return (
      <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
        <p>Cargando...</p>
      </tr>
    );
  } else if (!rowData) {
    return (
      <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
        <p>No se encontraron datos.</p>
      </tr>
    );
  }

  return (
    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
      {seeModal && (
        <EditModal title={"Editar modelo"} setSeeModal={setSeeModal}>
          <ModelEdit model={rowData} />
        </EditModal>
      )}
      <th
        scope="row"
        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
      >
        {rowData.name}
      </th>
      <td className="px-6 py-4">{rowData.brand.name}</td>
      <td className="px-6 py-4">
        {rowData?.image?.slice(0, 15)}{" "}
        {(rowData?.image?.length ?? 0 > 15) && "..."}
      </td>
      <td className="px-6 py-4">{rowData._count.product}</td>
      <td className="px-6 py-4">
        <button
          onClick={() => {
            setSeeModal(true);
          }}
          className="rounded-lg bg-green-200 p-2"
        >
          Editar
        </button>
      </td>
    </tr>
  );
};
