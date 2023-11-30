import { useState } from "react";
import { api } from "~/utils/api";
import { EditModal } from "../modal/EditModal";
import { ProductEdit } from "../edit/ProductEdit";

export const ProductTable = ({
  search,
  edit,
  onlySold,
}: {
  search?: string;
  edit?: boolean;
  onlySold?: boolean;
}) => {
  const { data: products, isLoading } = api.get.getProductsIds.useQuery({
    search: search,
    onlySold: onlySold,
  });

  if (isLoading) {
    return <div>Cargando...</div>;
  } else if (!products || products.length === 0) {
    return <div>No se encontraron productos</div>;
  }

  const headerSold = onlySold ? "Vendidos" : "Disponibles";
  const headers = edit
    ? ["Id", "Marca", "Modelo", "Color", "Fit", headerSold, "Modificar"]
    : ["Id", "Marca", "Modelo", "Color", "Fit", headerSold];

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full border-4 text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {headers.map((header) => (
              <th scope="col" className="px-6 py-3" key={header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <TableRow
              key={product.id}
              itemId={product.id}
              edit={edit}
              onlySold={onlySold}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TableRow = ({
  itemId,
  edit,
  onlySold,
}: {
  itemId: string;
  edit?: boolean;
  onlySold?: boolean;
}) => {
  const { data: rowData, isLoading } = api.get.getProductById.useQuery({
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
        <EditModal title={"Editar producto"} setSeeModal={setSeeModal}>
          <ProductEdit product={rowData} />
        </EditModal>
      )}
      <th
        scope="row"
        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
      >
        {rowData.id}
      </th>
      <td className="px-6 py-4">{rowData.model.brand.name}</td>
      <td className="px-6 py-4">{rowData.model.name}</td>
      <td className="px-6 py-4">{rowData.color.name}</td>
      <td className="px-6 py-4">{rowData.fit.name}</td>
      <td className="px-6 py-4">
        {onlySold ? rowData.soldCount : rowData.availableCount}
      </td>
      {edit && (
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
      )}
    </tr>
  );
};
