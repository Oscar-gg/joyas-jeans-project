import * as Yup from "yup";
import { isImgUrl } from "~/utils/image";

export const productSchema = Yup.object().shape({
  price: Yup.number().required("Requerido").min(0, "Precio muy bajo."),
  availableCount: Yup.number()
    .required("Requerido")
    .min(0, "No puede haber menos de 0."),
  soldCount: Yup.number()
    .required("Requerido")
    .min(0, "No puede haber menos de 0."),
  model: Yup.string().required("Requerido"),
  fit: Yup.string().required("Requerido"),
  color: Yup.string().required("Requerido"),
});
