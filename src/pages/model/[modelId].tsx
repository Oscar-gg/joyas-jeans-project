import { Layout } from "~/components/layout/Layout";
import Select from "react-select";

import { api } from "~/utils/api";
import { useRouter } from "next/router";
import ValidImage from "~/components/general/ValidImage";
import { useState } from "react";

export default function ModelID() {
  const router = useRouter();

  const model = router.query?.modelId as string;

  const { data: modelData } = api.get.getModelById.useQuery({
    id: model ?? "-1",
  });

  const { data: fitOptions } = api.get.getFitSelect.useQuery();
  const { data: colorOptions } = api.get.getColorSelect.useQuery();

  const [selectedFit, setSelectedFit] = useState("");
  const [selectedFitId, setSelectedFitId] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedColorId, setSelectedColorId] = useState("");

  const { data: fitDescription } = api.get.fitDescription.useQuery({
    id: selectedFitId,
  });

  const { data: result } = api.get.productCount.useQuery({
    modelId: model ?? "-1",
    fitId: selectedFitId,
    colorId: selectedColorId,
  });

  const defaultValue = { value: "", label: "Selecciona una opción" };

  let message = "";

  if (result === undefined) {
    message = "Cargando...";
  } else if (typeof result === "number") {
    if (result === 0) {
      message = "No hay productos disponibles con las características elegidas";
    } else {
      message = `Hay ${result} productos disponibles! Sigue seleccionando opciones para conocer más detalles.`;
    }
  } else {
    if (result.availableCount === 0) {
      message = `Costo: ${result.price}. Por el momento, no hay disponibilidad del producto. Intente más tarde.`;
    } else {
      message = `Costo: ${result.price}. Quedan ${result.availableCount} disponibles!`;
    }
  }

  return (
    <Layout>
      <div className="flex items-center justify-center pt-3">
        <h1 className="head m-3 p-3 text-4xl font-semibold">
          {modelData?.brand?.name ?? "Cargando..."}
        </h1>
      </div>
      <div className="container mx-auto p-4">
        <div className="md:flex">
          <div className="md:w-1/2">
            <ValidImage
              src={modelData?.image ?? ""}
              alt="Product Image"
              className="w-full md:max-w-full"
            />
          </div>

          <div className="p-4 md:w-1/2">
            <h1 className="mb-4 text-3xl font-bold">{modelData?.name}</h1>

            <div className="mb-4 sm:p-6">
              <label className="text-lg font-semibold">Color:</label>
              <Select
                className="w-full rounded-lg border border-gray-300 p-2"
                onChange={(e) => {
                  setSelectedColor(e?.label ?? "");
                  setSelectedColorId(e?.value ?? "");
                }}
                options={colorOptions}
                defaultValue={defaultValue}
              />
            </div>

            <div className="mb-4 sm:p-6">
              <label className="text-lg font-semibold">Fit:</label>
              <Select
                className="w-full rounded-lg border border-gray-300 p-2"
                onChange={(e) => {
                  setSelectedFit(e?.label ?? "");
                  setSelectedFitId(e?.value ?? "");
                }}
                options={fitOptions}
                defaultValue={defaultValue}
              />
            </div>

            <div className="mb-4">
              {/* LA DESCRIPCION QUE TIENE ARTURO, BASADO EN EL TIPO DE FIT QUE ELIGA*/}
              <h2 className="mb-2 text-xl font-semibold">Descripción</h2>
              <p className="text-gray-600">
                Compra con nosotros el modelo {modelData?.name} de la marca{" "}
                {modelData?.brand?.name}.{" "}
                {selectedColor !== "" &&
                  `Recibe tu producto en color ${selectedColor}.`}
                {selectedFit !== "" &&
                  `Producto ajustado a tu medida ${selectedFit}:`}
                {fitDescription && fitDescription?.description}
              </p>
            </div>
            <div className="mb-4">
              <h2 className="mb-2 text-xl font-semibold">Comprar</h2>
              {message}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
