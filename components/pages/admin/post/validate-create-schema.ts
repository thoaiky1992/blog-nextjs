import * as Yup from "yup";

const VALIDATION_POST_REQUIRED = "Tiêu đề không được để trống";
const VALIDATION_CATEGORY_REQUIRED = "Thể loại không được để trống";
const VALIDATION_BODY_REQUIRED = "Nội dung bài viết không được để trống";

const VALIDATION_SEO_TITLE_REQUIRED = "Tiêu đề SEO không được để trống";
const VALIDATION_META_DESCRIPTION_REQUIRED =
  "Chi tiết Meta SEO không được để trống";
const VALIDATION_META_KEYWORDS_REQUIRED = "Từ khoá SEO không được để trống";
const VALIDATION_DESCRIPTION_REQUIRED = "Chi tiết bài viết không được để trống";
const VALIDATION_IMAGE_REQUIRED = "Chưa chọn hình ảnh cho bài viết";

export const validationCreateSchema = Yup.object().shape({
  title: Yup.string().required(VALIDATION_POST_REQUIRED),
  category: Yup.string().required(VALIDATION_CATEGORY_REQUIRED),
  body: Yup.string().required(VALIDATION_BODY_REQUIRED),
  seo_title: Yup.string().required(VALIDATION_SEO_TITLE_REQUIRED),
  meta_description: Yup.string().required(VALIDATION_META_DESCRIPTION_REQUIRED),
  meta_keywords: Yup.string().required(VALIDATION_META_KEYWORDS_REQUIRED),
  description: Yup.string().required(VALIDATION_DESCRIPTION_REQUIRED),
  image: Yup.string().required(VALIDATION_IMAGE_REQUIRED),
});
