import { api } from "~/utils/api";
import { Formik, Field, Form, ErrorMessage } from "formik";
import type { RouterOutputs } from "~/utils/api";
import { colorSchema } from "~/components/schemas/colorSchema";

const classNameLabel = "text-lg mr-2 text-slate-800";
const classNameField = "bg-slate-300 text-black text-base rounded-md";
const classNameError = "bg-red-500 p-2 rounded-md text-white text-sm";

export const ColorEdit = ({
  color,
}: {
  color: RouterOutputs["get"]["getColorById"] | undefined | null;
}) => {
  const context = api.useUtils();

  const mutationModify = api.modify.createOrUpdateColor.useMutation({
    onSuccess: (succeeded) => {
      if (!succeeded) {
        alert("Falló la creación o modificación del color.");
      } else {
        alert("Color " + (color ? "actualizado" : "creado"));
        void context.get.getModelsIds.invalidate();
      }
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const mutationDelete = api.modify.deleteModelById.useMutation({
    onSuccess: (succeeded) => {
      alert("El Color fue borrado!");
      void context.get.getModelsIds.invalidate();
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  return (
    <Formik
      initialValues={{
        name: color?.name ?? "",
      }}
      onSubmit={(values) => {
        mutationModify.mutate({
          name: values.name,
          id: color?.id,
        });
      }}
      validationSchema={colorSchema}
    >
      {() => (
        <Form>
          <div className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div className="my-2">
              <div className="flex flex-row flex-wrap align-middle">
                <label htmlFor="name" className={classNameLabel}>
                  Nombre del color:
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

            <div className="mt-2 space-x-4">
              <button
                type="submit"
                className="rounded-xl bg-green-500 p-2 text-white hover:bg-green-700"
              >
                {color?.id ? "Actualizar" : "Crear"}
              </button>

              {color?.id && (
                <button
                  type="button"
                  onClick={() => {
                    if (confirm("¿Estás seguro de que quieres borrarlo?")) {
                      mutationDelete.mutate({
                        id: color?.id,
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
