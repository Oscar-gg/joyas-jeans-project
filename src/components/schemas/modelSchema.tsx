import * as Yup from "yup";
import { isImgUrl } from "~/utils/image";

export const modelSchema = Yup.object().shape({
  name: Yup.string().required("Required").min(3, "Name too short."),
  image: Yup.string()
    .required("Required")
    .nullable()
    .test("is-img", "La imagen no es valida.", async (value) => {
      if (!value) return true; // Use default image

      const validUrl = await isImgUrl(value);
      return validUrl;
    }),
    
  brandId: Yup.string().required("Required"),
});
