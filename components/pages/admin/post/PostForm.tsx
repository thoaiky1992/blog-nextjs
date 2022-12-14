import FormikImage, { RefImageObject } from "@/components/shared/FormikImage";
import FormikInput from "@/components/shared/FormikInput";
import SelectFilterItem, {
  SelectOptionType,
} from "@/components/shared/FormikSelectFilterItem";
import TinyMceInstance from "@/components/shared/TinyMce";
import { CategoryEntity } from "@/entities/category.entity";
import { CategoryService } from "@/services/category.service";
import { PostService } from "@/services/post.service";
import classNames from "classnames";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { FC, useEffect, useRef, useState } from "react";
import { ObjectSchema } from "yup";
interface CreatePostProps {
  id?: string;
  validationSchema: ObjectSchema<any>;
}

const CreatePost: FC<CreatePostProps> = ({ id, validationSchema }) => {
  const router = useRouter();
  const [categories, setCategories] = useState<SelectOptionType[]>([]);
  const imageRef = useRef<RefImageObject>(null);
  const [initialValues, setInitialValues] = useState({
    title: "",
    category: "",
    seo_title: "",
    meta_description: "",
    meta_keywords: "",
    description: "",
    body: "",
    image: "",
  });

  const fetchCategory = async () => {
    const categoryService = CategoryService.getInstance();
    const { categories } = await categoryService.getMany();
    setCategories(() =>
      categories.map((category: CategoryEntity) => ({
        label: category.title,
        value: category._id,
      }))
    );
  };

  const fetchPostById = async () => {
    const postService = PostService.getInstance();
    const data = await postService
      .findOptions({ filter: { _id: id } })
      .getMany();
    setInitialValues(() => data.posts[0]);
  };

  useEffect(() => {
    fetchCategory();
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
        const formData = new FormData();
        for (let key in values) {
          formData.append(key, values[key]);
        }
        const postService = PostService.getInstance();
        const res = await (id
          ? postService.updateOne(id, formData)
          : postService.createOne(formData));
        if (res.data.success) {
          router.push("/admin/post");
        }
      }}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form>
          <div className="list w-full mt-5 rounded-xl shadow-lg border-t-[1px] border-slate-50 p-5 text-gray-700">
            <h1 className="text-2xl uppercase">Th??m m???i b??i vi???t</h1>

            {/* Sectoion */}
            <div className="w-full flex gap-5">
              <div className="w-full mt-5 flex flex-col">
                <label htmlFor="title" className="text-xl">
                  Ti??u ?????
                </label>
                <FormikInput
                  value={values.title}
                  placeholder="Ti??u ????? ..."
                  name="title"
                  className="px-3 py-3 border shadow-md border-slate-50 rounded-md focus:outline-none appearance-none"
                />
              </div>
              <div className="w-full mt-5 flex flex-col">
                <label htmlFor="category" className="text-xl ml-1">
                  Th??? lo???i
                </label>
                <SelectFilterItem
                  name="category"
                  options={categories}
                  instancdId={values.category}
                  isClearable={false}
                  setFieldValue={setFieldValue}
                />
              </div>
            </div>

            {/* Sectoion */}
            <div className="w-full flex gap-5">
              <div className="w-full mt-5 flex flex-col">
                <label htmlFor="seo_title" className="text-xl">
                  Ti??u ????? SEO
                </label>
                <FormikInput
                  value={values.seo_title}
                  placeholder="Ti??u ????? SEO ..."
                  name="seo_title"
                  className="px-3 py-3 border shadow-md border-slate-50 rounded-md focus:outline-none appearance-none"
                />
              </div>
              <div className="w-full mt-5 flex flex-col">
                <label htmlFor="meta_keywords" className="text-xl">
                  T??? kho?? SEO
                </label>
                <FormikInput
                  value={values.meta_keywords}
                  placeholder="T??? kho?? SEO ..."
                  name="meta_keywords"
                  className="px-3 py-3 border shadow-md border-slate-50 rounded-md focus:outline-none appearance-none"
                />
              </div>
            </div>

            {/* Sectoion */}
            <div className="w-full flex gap-5">
              <div className="w-full mt-5 flex flex-col">
                <label htmlFor="meta_description" className="text-xl ml-1">
                  Chi ti???t SEO??
                </label>
                <FormikInput
                  type="textarea"
                  value={values.meta_description}
                  placeholder="Chi ti???t SEO ..."
                  name="meta_description"
                  className="px-3 py-3 border shadow-md border-slate-50 rounded-md focus:outline-none appearance-none min-h-[150px]"
                />
              </div>
              <div className="w-full mt-5 flex flex-col">
                <label htmlFor="description" className="text-xl ml-1">
                  Chi ti???t b??i vi???t??
                </label>
                <FormikInput
                  type="textarea"
                  value={values.description}
                  placeholder="Chi ti???t b??i vi???t ..."
                  name="description"
                  className="px-3 py-3 border shadow-md border-slate-50 rounded-md focus:outline-none appearance-none min-h-[150px]"
                />
              </div>
            </div>

            {/* Sectoion */}
            <div className="w-full mt-5">
              <label htmlFor="image" className="text-xl ml-1">
                H??nh ???nh
              </label>
              <FormikImage
                ref={imageRef}
                name={"image"}
                defaultValue={values.image}
                setFieldValue={setFieldValue}
              />
            </div>

            {/* Sectoion */}
            {((id && values.body.length) || !id) && (
              <div className={classNames("w-full mt-5")}>
                <label htmlFor="body" className="text-xl ml-1">
                  N???i dung??
                </label>
                <TinyMceInstance
                  name="body"
                  setValue={setFieldValue}
                  initialValue={values.body}
                />
              </div>
            )}

            <div className="mt-10">
              <button
                className="border px-3 py-2 rounded-md"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "??ang t???i ..." : id ? "C???p nh???t" : "Th??m m???i"}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default CreatePost;
