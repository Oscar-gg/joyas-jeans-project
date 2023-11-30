import * as Yup from "yup";
import { isImgUrl } from "~/utils/image";

export const colorSchema = Yup.object().shape({
  name: Yup.string().required("Required").min(2, "Name too short."),
});
