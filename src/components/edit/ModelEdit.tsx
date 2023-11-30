import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { Formik, Field, Form, ErrorMessage } from "formik";
import type { RouterOutputs } from "~/utils/api";
import { modelSchema } from "~/components/schemas/modelSchema";
import Select from "react-select";

const classNameLabel = "text-lg mr-2 text-slate-800";
const classNameField = "bg-slate-300 text-black text-base rounded-md";
const classNameError = "bg-red-500 p-2 rounded-md text-white text-sm";

export const ModelEdit = ({
  model,
}: {
  model: RouterOutputs["get"]["getModelById"] | undefined | null;
}) => {
  const context = api.useContext();

  const mutationModify = api.modify.createOrUpdateModel.useMutation({
    onSuccess: (succeeded) => {
      if (!succeeded) {
        alert("Falló la creación o modificación del modelo.");
      } else {
        alert("Modelo " + (model ? "actualizado" : "creado"));
        void context.get.getModelsIds.invalidate();
      }
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const mutationDelete = api.modify.deleteModelById.useMutation({
    onSuccess: (succeeded) => {
      alert("El modelo fue borrado!");
      void context.get.getModelsIds.invalidate();
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const { data: brandOptions } = api.get.getBrandSelect.useQuery();

  const defaultBrand = model?.brandId
    ? { value: model.brandId, label: model?.brand.name }
    : { value: "", label: "Selecciona una marca" };

  return (
    <Formik
      initialValues={{
        name: model?.name ?? "",
        image: model?.image ?? "",
        brandId: model?.brandId ?? "",
      }}
      onSubmit={(values) => {
        mutationModify.mutate({
          brandId: values.brandId,
          image: values.image,
          name: values.name,
          id: model?.id,
        });
      }}
      validationSchema={modelSchema}
    >
      {({ setFieldValue }) => (
        <Form>
          <div className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div className="my-2">
              <div className="flex flex-row flex-wrap align-middle">
                <label htmlFor="name" className={classNameLabel}>
                  Nombre del modelo:
                </label>
                <Field id="name" name="name" className={classNameField} />
              </div>
              <div className="my-4">
                <ErrorMessage
                  component="a"
                  name="name"
                  className={classNameError}
                />
              </div>
            </div>
            <div className="my-2">
              <div className="flex flex-row flex-wrap align-middle">
                <label htmlFor="image" className={classNameLabel}>
                  Image
                </label>
                <Field id="image" name="image" className={classNameField} />
              </div>
              <div className="my-4">
                <ErrorMessage
                  component="a"
                  name="image"
                  className={classNameError}
                />
              </div>
            </div>
            <div className="mr-2 flex flex-row flex-wrap align-middle">
              <label className={classNameLabel} htmlFor="visibility">
                Marca:
              </label>
              <Select
                className="text-black"
                onChange={async (e) => {
                  await setFieldValue("brandId", e?.value ?? "");
                }}
                options={brandOptions}
                defaultValue={defaultBrand}
              />
            </div>
            <div className="my-4">
              <ErrorMessage
                component="a"
                name="brandId"
                className={classNameError}
              />
            </div>

            <div className="mt-2 space-x-4">
              <button
                type="submit"
                className="rounded-xl bg-green-500 p-2 text-white hover:bg-green-700"
              >
                {model?.id ? "Actualizar" : "Crear"}
              </button>

              {model?.id && (
                <button
                  type="button"
                  onClick={() => {
                    if (confirm("¿Estás seguro de que quieres borrarlo?")) {
                      mutationDelete.mutate({
                        id: model?.id,
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
