import FormikInput from "@/components/shared/FormikInput";
import { signIn, SignInOptions } from "next-auth/react";
import {
  VALIDATION_EMAIL_REQUIRED,
  VALIDATION_EMAIL_INVALID,
  VALIDATION_PASSWORD_REQUIRED,
} from "@/constants";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";

const LoginPage = () => {
  const router = useRouter();
  const initialValues: SignInOptions = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(VALIDATION_EMAIL_REQUIRED)
      .email(VALIDATION_EMAIL_INVALID),
    password: Yup.string().required(VALIDATION_PASSWORD_REQUIRED),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setErrors, resetForm, setSubmitting }) => {
        const res = await signIn("credentials", {
          ...values,
          redirect: false,
        });
        if (res?.ok) {
          router.push("/admin/post");
        } else {
          setErrors({
            password: "Email hoặc mật khẩu không chính xác !!!",
            email: " ",
          });
        }
      }}
    >
      {() => (
        <Form>
          <div className="w-screen h-screen flex justify-center items-center relative">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border-t-[1px] border-gray-100 flex flex-col w-full max-w-xl">
              <div className="mb-4">
                <label className="block text-grey-darker text-lg font-bold mb-2">
                  Email
                </label>
                <FormikInput
                  placeholder="Email"
                  name="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-sm focus:border-gray-400 focus:outline-none"
                />
              </div>
              <div className="mb-6">
                <label className="block text-grey-darker text-lg font-bold mb-2">
                  Mật Khẩu
                </label>
                <FormikInput
                  placeholder="Mật khẩu"
                  type={`password`}
                  name="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-sm focus:border-gray-400 focus:outline-none"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-admin-app hover:bg-admin-app text-gray-700 font-semibold py-2 rounded focus:outline-none"
                  type="submit"
                >
                  Đăng nhập
                </button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default LoginPage;
