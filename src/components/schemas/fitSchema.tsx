import * as Yup from "yup";
import { isImgUrl } from "~/utils/image";

export const fitSchema = Yup.object().shape({
  name: Yup.string().required("Requerido").min(2, "El nombre es muy pequeño."),
  description: Yup.string()
    .required("Requerido")
    .min(2, "La descripción es muy pequeña."),
});
