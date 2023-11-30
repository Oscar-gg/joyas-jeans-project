import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { Formik, Field, Form, ErrorMessage } from "formik";
import type { RouterOutputs } from "~/utils/api";
import Select from "react-select";
import { productSchema } from "../schemas/productSchema";

const classNameLabel = "text-lg mr-2 text-slate-800";
const classNameField = "bg-slate-300 text-black text-base rounded-md";
const classNameError = "bg-red-500 p-2 rounded-md text-white text-sm";

export const ProductEdit = ({
  product,
}: {
  product: RouterOutputs["get"]["getProductById"] | undefined | null;
}) => {
  const context = api.useUtils();

  const mutationModify = api.modify.createOrUpdateProduct.useMutation({
    onSuccess: (succeeded) => {
      if (!succeeded) {
        alert("Falló la creación o modificación del producto.");
      } else {
        alert("Producto " + (product ? "actualizado" : "creado"));
        void context.get.getModelsIds.invalidate();
      }
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const mutationDelete = api.modify.deleteProductById.useMutation({
    onSuccess: (succeeded) => {
      alert("El producto fue borrado!");
      void context.get.getModelsIds.invalidate();
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const { data: modelOptions } = api.get.getModelSelect.useQuery();
  const { data: fitOptions } = api.get.getFitSelect.useQuery();
  const { data: colorOptions } = api.get.getColorSelect.useQuery();

  const defaultModel = product?.model.id
    ? { value: product.model.id, label: product?.model.name }
    : { value: "", label: "Selecciona una producto" };
  const defaultFit = product?.fit.id
    ? { value: product?.fit.id, label: product?.fit.name }
    : { value: "", label: "Selecciona un fit" };
  const defaultColor = product?.color.id
    ? { value: product.color.id, label: product?.color.name }
    : { value: "", label: "Selecciona un color" };

  return (
    <Formik
      initialValues={{
        price: product?.price ?? 0,
        availableCount: product?.availableCount ?? 0,
        soldCount: product?.soldCount ?? 0,
        model: product?.model.id ?? "",
        fit: product?.fit.id ?? "",
        color: product?.color.id ?? "",
      }}
      onSubmit={(values) => {
        mutationModify.mutate({
          availableCount: values.availableCount,
          price: values.price,
          modelId: values.model,
          fitId: values.fit,
          colorId: values.color,
          soldCount: values.soldCount ?? 0,
          id: product?.id,
        });
      }}
      validationSchema={productSchema}
    >
      {({ setFieldValue }) => (
        <Form>
          <div className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div className="mr-2 flex flex-row flex-wrap align-middle">
              <label className={classNameLabel} htmlFor="model">
                Modelo:
              </label>
              <Select
                className="text-black"
                onChange={async (e) => {
                  await setFieldValue("model", e?.value ?? "");
                }}
                options={modelOptions}
                defaultValue={defaultModel}
              />
            </div>
            <div className="my-4">
              <ErrorMessage
                component="a"
                name="model"
                className={classNameError}
              />
            </div>
            <div className="mr-2 flex flex-row flex-wrap align-middle">
              <label className={classNameLabel} htmlFor="color">
                Color:
              </label>
              <Select
                className="text-black"
                onChange={async (e) => {
                  await setFieldValue("color", e?.value ?? "");
                }}
                options={colorOptions}
                defaultValue={defaultColor}
              />
            </div>
            <div className="my-4">
              <ErrorMessage
                component="a"
                name="color"
                className={classNameError}
              />
            </div>
            <div className="mr-2 flex flex-row flex-wrap align-middle">
              <label className={classNameLabel} htmlFor="fit">
                Fit:
              </label>
              <Select
                className="text-black"
                onChange={async (e) => {
                  await setFieldValue("fit", e?.value ?? "");
                }}
                options={fitOptions}
                defaultValue={defaultFit}
              />
            </div>
            <div className="my-4">
              <ErrorMessage
                component="a"
                name="fit"
                className={classNameError}
              />
            </div>
            <div className="my-2">
              <div className="flex flex-row flex-wrap align-middle">
                <label htmlFor="availableCount" className={classNameLabel}>
                  Cantidad disponible:
                </label>
                <Field
                  id="availableCount"
                  name="availableCount"
                  type="number"
                  className={classNameField}
                />
              </div>
              <div className="my-4">
                <ErrorMessage
                  component="a"
                  name="availableCount"
                  className={classNameError}
                />
              </div>
            </div>
            <div className="my-2">
              <div className="flex flex-row flex-wrap align-middle">
                <label htmlFor="soldCount" className={classNameLabel}>
                  Cantidad vendida:
                </label>
                <Field
                  id="soldCount"
                  name="soldCount"
                  type="number"
                  className={classNameField}
                />
              </div>
              <div className="my-4">
                <ErrorMessage
                  component="a"
                  name="soldCount"
                  className={classNameError}
                />
              </div>
            </div>
            <div className="mt-2 space-x-4">
              <button
                type="submit"
                className="rounded-xl bg-green-500 p-2 text-white hover:bg-green-700"
              >
                {product?.id ? "Actualizar" : "Crear"}
              </button>

              {product?.id && (
                <button
                  type="button"
                  onClick={() => {
                    if (confirm("¿Estás seguro de que quieres borrarlo?")) {
                      mutationDelete.mutate({
                        id: product?.id,
                      });
                    }
                  }}
                  className="rounded-xl bg-red-500 p-2 text-white hover:bg-red-700"
                >
                  Borrar
                </button>
              )}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
