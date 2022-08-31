import FormikInput from "@/components/shared/FormikInput";
import { CategoryService } from "@/services/category.service";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { ObjectSchema } from "yup";
interface CategoryFormProps {
  id?: string;
  validationSchema: ObjectSchema<any>;
}

const CategoryForm: FC<CategoryFormProps> = ({ id, validationSchema }) => {
  const router = useRouter();
  const [initialValues, setInitialValues] = useState({
    title: "",
  });

  const fetchPostById = async () => {
    const categoryService = CategoryService.getInstance();
    const data = await categoryService
      .findOptions({ filter: { _id: id } })
      .getMany();
    setInitialValues(() => data.categories[0]);
  };

  useEffect(() => {
    if (id) {
      fetchPostById();
    }
  }, [id]);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={async (values: any) => {
        const categoryService = CategoryService.getInstance();
        const res = await (id
          ? categoryService.updateOne(id, values)
          : categoryService.createOne(values));
        if (res.data.success) {
          router.push("/admin/category");
        }
      }}
    >
      {({ values, isSubmitting }) => (
        <Form>
          <div className="list w-full mt-5 rounded-xl shadow-lg border-t-[1px] border-slate-50 p-5 text-gray-700">
            <h1 className="text-2xl uppercase">Thêm mới thể loại</h1>

            {/* Sectoion */}
            <div className="w-full flex gap-5">
              <div className="w-full mt-5 flex flex-col">
                <label htmlFor="title" className="text-xl">
                  Tiêu đề
                </label>
                <FormikInput
                  value={values.title}
                  placeholder="Tiêu đề ..."
                  name="title"
                  className="px-3 py-3 border shadow-md border-slate-50 rounded-md focus:outline-none appearance-none"
                />
              </div>
              <div className="w-full mt-5 flex flex-col"></div>
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
  );
};
export default CategoryForm;
