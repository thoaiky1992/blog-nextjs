import FormikImage from "@/components/shared/FormikImage";
import FormikInput from "@/components/shared/FormikInput";
import { GET_CURRENT_USER } from "@/constants";
import { UserService } from "@/services/user.service";
import { Form, Formik } from "formik";
import { FC, useEffect, useState } from "react";
import useSWR from "swr";
import { ValidationUserSchema } from "./validate-user.schema";

interface UserFormProps {
  id: string;
}
const UserForm: FC<UserFormProps> = ({ id }) => {
  const [user, setUser] = useState({
    name: "",
    hobbie: "",
    job: "",
    maxime: "",
    avatar: "",
  });

  const { data, mutate } = useSWR(GET_CURRENT_USER);

  const fetchUser = async () => {
    const userService = UserService.getInstance();
    const data = await userService
      .findOptions({ filter: { _id: id } })
      .getMany();
    setUser(() => ({ ...user, ...data[0] }));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="w-full">
      <Formik
        initialValues={user}
        enableReinitialize
        validationSchema={ValidationUserSchema}
        onSubmit={async (values: any) => {
          const formData = new FormData();
          for (let key in values) {
            formData.append(key, values[key]);
          }
          const userService = UserService.getInstance();
          await userService.updateOne(id, formData);
          mutate();
        }}
      >
        {({ values, isSubmitting, setFieldValue }) => (
          <Form>
            <div className="list w-full mt-5 rounded-xl shadow-lg border-t-[1px] border-slate-50 p-5 text-gray-700">
              <h1 className="text-2xl uppercase">Chình sửa tài khoản</h1>

              {/* Sectoion */}
              <div className="w-full flex gap-5">
                <div className="w-full mt-5 flex flex-col">
                  <label htmlFor="name" className="text-xl">
                    Tên tài khoản
                  </label>
                  <FormikInput
                    value={values.name}
                    placeholder="Tiêu đề ..."
                    name="name"
                    className="px-3 py-3 border shadow-md border-slate-50 rounded-md focus:outline-none appearance-none"
                  />
                </div>

                <div className="w-full mt-5 flex flex-col">
                  <label htmlFor="job" className="text-xl">
                    Công việc
                  </label>
                  <FormikInput
                    value={values.job}
                    placeholder="Công việc ..."
                    name="job"
                    className="px-3 py-3 border shadow-md border-slate-50 rounded-md focus:outline-none appearance-none"
                  />
                </div>
              </div>

              {/* Sectoion */}
              <div className="w-full flex gap-5">
                <div className="w-full mt-5 flex flex-col">
                  <label htmlFor="hobbie" className="text-xl">
                    Sở thích
                  </label>
                  <FormikInput
                    type="textarea"
                    value={values.hobbie}
                    placeholder="Sở thích ..."
                    name="hobbie"
                    className="px-3 py-3 border shadow-md border-slate-50 rounded-md focus:outline-none appearance-none min-h-[150px]"
                  />
                </div>
                <div className="w-full mt-5 flex flex-col">
                  <label htmlFor="maxime" className="text-xl">
                    Châm ngôn sống
                  </label>
                  <FormikInput
                    type="textarea"
                    value={values.maxime}
                    placeholder="Châm ngôn sống ..."
                    name="maxime"
                    className="px-3 py-3 border shadow-md border-slate-50 rounded-md focus:outline-none appearance-none min-h-[150px]"
                  />
                </div>
              </div>

              {/* Sectoion */}
              <div className="w-full flex gap-5">
                <div className="w-full mt-5 flex flex-col">
                  <FormikImage
                    name="avatar"
                    defaultValue={values.avatar}
                    setFieldValue={setFieldValue}
                  />
                </div>
              </div>

              <div className="mt-10">
                <button
                  className="border px-3 py-2 rounded-md"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Đang tải ..." : id ? "Cập nhật" : "Thêm mới"}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default UserForm;
