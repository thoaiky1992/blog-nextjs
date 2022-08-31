import * as Yup from "yup";

const VALIDATION_NAME_REQUIRED = "Tên tải khoản không được để trống";
const VALIDATION_HOBBIE_REQUIRED = "Sở thích không được để trống";
const VALIDATION_JOB_REQUIRED = "Công việc không được để trống";
const VALIDATION_MAXIME_REQUIRED = "Châm ngôn sống không được để trống";
const VALIDATION_AVATAR_REQUIRED = "Hình ảnh không được để trống";
export const ValidationUserSchema = Yup.object().shape({
  name: Yup.string().required(VALIDATION_NAME_REQUIRED),
  hobbie: Yup.string().required(VALIDATION_HOBBIE_REQUIRED),
  job: Yup.string().required(VALIDATION_JOB_REQUIRED),
  maxime: Yup.string().required(VALIDATION_MAXIME_REQUIRED),
  avatar: Yup.string().required(VALIDATION_AVATAR_REQUIRED),
});
