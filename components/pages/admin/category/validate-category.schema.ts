import * as Yup from "yup";

const VALIDATION_TITLE_REQUIRED = "Tiêu đề không được để trống";
const VALIDATION_SLUG_REQUIRED = "Slug không được để trống";

export const ValidationCategorySchema = Yup.object().shape({
  title: Yup.string().required(VALIDATION_TITLE_REQUIRED),
});
