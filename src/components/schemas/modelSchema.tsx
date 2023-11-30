import * as Yup from "yup";
import { isImgUrl } from "~/utils/image";

export const modelSchema = Yup.object().shape({
  name: Yup.string().required("Requerido").min(3, "Name too short."),
  image: Yup.string()
    .required("Requerido")
    .nullable()
    .test("is-img", "La imagen no es valida.", async (value) => {
      if (!value) return true; // Allow null values

      if (value.startsWith("/images/")) return true; // Use image from folder

      const validUrl = await isImgUrl(value);
      return validUrl;
    }),

  brandId: Yup.string().required("Requerido"),
});
