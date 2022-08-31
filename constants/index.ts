export enum LAYOUTS {
  BLOG = "BLOG",
  ADMIN = "ADMIN",
}
export const FACEBOOK_APP_ID = String(process.env.NEXT_PUBLIC_FACEBOOK_APP_ID);
export const MONGODB_URI = String(process.env.NEXT_PUBLIC_MONGODB_URI);
export const WEBSITE_URL = String(process.env.NEXT_PUBLIC_WEBSITE_URL);
export const TINYMCE_API_KEY = String(process.env.NEXT_PUBLIC_TINYMCE_API_KEY);
export const HOME_REVALIDATE_EXPIRE = 7200;
export const DEFAULT_REVALIDATE_EXPIRE = 3600;
export const GET_GENRES = "GET_GENRES";
export const GET_THE_MOST_VIEW_POST = "GET_THE_MOST_VIEW_POST";
export const GET_CURRENT_USER = "GET_CURRENT_USER";
export const RECENT_POST_LIMIT = 6;
export const SWIPER_BREAK_POINT_NEW_POST = {
  1: {
    slidesPerView: 2,
    spaceBetween: 2,
  },
  320: {
    slidesPerView: 2,
  },
  480: {
    slidesPerView: 2,
  },
  768: {
    slidesPerView: 2,
    spaceBetween: 10,
  },
  1024: {
    slidesPerView: 3,
  },
  1440: {
    slidesPerView: 3,
  },
  1920: {
    slidesPerView: 5,
  },
};

export const HASH_SALT = 10;

// Error message for Validate form
export const VALIDATION_EMAIL_REQUIRED = "Email không được để trống";
export const VALIDATION_EMAIL_INVALID = "Email không đúng định dạng";
export const VALIDATION_PASSWORD_REQUIRED = "Mật khẩu không được để trống";
export const VALIDATION_NAME_REQUIRED = "Tên tài khoản không được để trống";
export const VALIDATION_CONFIRM_PASSWORD_REQUIRED =
  "Mật khẩu xác nhận không được để trống";
export const VALIDATION_CONFIRM_PASSWORD_NOT_MATCH =
  "Mật khẩu không trùng khớp";
export const VALIDATION_CONFIRM_PASSWORD_STRONG =
  "Mật khẩu phải chứa các ký tự viết thường, viết hoa, ít nhất một chữ số, ít nhất một ký tự đặc biệt và có độ dài tối thiểu là 8";

export const DEFAULT_AVATAR = "/images/user.jpeg";
export const ADMIN_BANNER = "/images/admin_banner.jpg";

export const SESSION_MAX_AGE = 60 * 60 * 24 * 365;

export const DRAWER_LIST = [
  { id: 1, title: "Thể loại", href: "/admin/category", icon: "category" },
  { id: 2, title: "Bài viết", href: "/admin/post", icon: "post" },
  { id: 3, title: "Tài khoản", href: "/admin/user", icon: "user" },
];
