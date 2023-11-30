import { api } from "~/utils/api";
import { Formik, Field, Form, ErrorMessage } from "formik";
import type { RouterOutputs } from "~/utils/api";
import { fitSchema } from "../schemas/fitSchema";

const classNameLabel = "text-lg mr-2 text-slate-800";
const classNameField = "bg-slate-300 text-black text-base rounded-md";
const classNameError = "bg-red-500 p-2 rounded-md text-white text-sm";

export const FitEdit = ({
  fit,
}: {
  fit: RouterOutputs["get"]["getFitById"] | undefined | null;
}) => {
  const context = api.useUtils();

  const mutationModify = api.modify.createOrUpdateFit.useMutation({
    onSuccess: (succeeded) => {
      if (!succeeded) {
        alert("Falló la creación o modificación del fit.");
      } else {
        alert("Fit " + (fit ? "actualizado" : "creado"));
        void context.get.getModelsIds.invalidate();
      }
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const mutationDelete = api.modify.deleteFitById.useMutation({
    onSuccess: (succeeded) => {
      alert("El fit fue borrado!");
      void context.get.getModelsIds.invalidate();
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  return (
    <Formik
      initialValues={{
        name: fit?.name ?? "",
        description: fit?.description ?? "",
      }}
      onSubmit={(values) => {
        mutationModify.mutate({
          id: fit?.id,
          description: values.description,
          name: values.name,
        });
      }}
      validationSchema={fitSchema}
    >
      {() => (
        <Form>
          <div className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div className="my-2">
              <div className="flex flex-row flex-wrap align-middle">
                <label htmlFor="name" className={classNameLabel}>
                  Nombre del fit:
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
                <label htmlFor="description" className={classNameLabel}>
                  Descripción del fit:
                </label>
                <Field
                  id="description"
                  name="description"
                  className={classNameField}
                />
              </div>
              <div className="my-4">
                <ErrorMessage
                  component="a"
                  name="description"
                  className={classNameError}
                />
              </div>
            </div>

            <div className="mt-2 space-x-4">
              <button
                type="submit"
                className="rounded-xl bg-green-500 p-2 text-white hover:bg-green-700"
              >
                {fit?.id ? "Actualizar" : "Crear"}
              </button>

              {fit?.id && (
                <button
                  type="button"
                  onClick={() => {
                    if (confirm("¿Estás seguro de que quieres borrarlo?")) {
                      mutationDelete.mutate({
                        id: fit?.id,
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
