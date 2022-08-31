import ConfirmDialog from "@/components/shared/ConfirmDialog";
import CustomPagination from "@/components/shared/CustomPagination";
import { PostEntity } from "@/entities/post.entity";
import { CategoryService } from "@/services/category.service";
import { PostService } from "@/services/post.service";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdModeEdit, MdDelete } from "react-icons/md";
const TABLE_CATEGORY_TITLE = [
  { title: "STT", widthPercent: 10 },
  { title: "Tiêu đề", widthPercent: 80 },
  { title: "Thao tác", widthPercent: 10 },
];
const CATEGORY_LIMIT = 4;
const CategoryList = () => {
  const router = useRouter();
  const [categoryCount, setCategoryCount] = useState(1);
  const [categories, setCategories] = useState<PostEntity[]>([]);

  const page = (router?.query?.page as any) || 1;

  const fetCategory = async () => {
    try {
      const categoryService = CategoryService.getInstance();
      const { categories: data, count } = await categoryService
        .findOptions({
          skip: (page - 1) * CATEGORY_LIMIT,
          limit: CATEGORY_LIMIT,
          sort: [["createdAt", -1]],
          populate: "category",
        })
        .getMany();

      setCategoryCount(count);

      if (data.length) {
        setCategories(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteItem = async (id: string) => {
    const categoryService = CategoryService.getInstance();
    const result = await categoryService.deleteOne(id);
    if (result.data.success) {
      await fetCategory();
    }
  };

  useEffect(() => {
    fetCategory();
  }, [router.query]);

  return (
    <div className="list w-full mt-5 rounded-xl shadow-lg border-t-[1px] border-gray-50 p-5">
      <table className="w-full">
        <thead>
          <tr>
            {TABLE_CATEGORY_TITLE.map((item, index) => (
              <th
                key={index}
                className="py-5 text-left px-5"
                style={{ width: `${item.widthPercent}%` }}
              >
                <div className="line-clamp-3">{item.title}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr
              key={category._id}
              className={classNames("border-t-2 border-gray-200")}
            >
              <td className="p-5 align-top">
                {(page - 1) * CATEGORY_LIMIT + index + 1}
              </td>
              <td className="p-5 align-top">{category.title}</td>

              <td className="">
                <div className="w-full flex justify-center">
                  <Link href={`/admin/category/` + category._id}>
                    <div className=" rounded-full bg-gray-300 p-2 mr-2 cursor-pointer">
                      <MdModeEdit className="w-5 h-5" />
                    </div>
                  </Link>
                  <ConfirmDialog
                    handleConfirm={() => handleDeleteItem(category._id)}
                  >
                    <div className="rounded-full bg-gray-300 p-2">
                      <MdDelete className="w-5 h-5" />
                    </div>
                  </ConfirmDialog>
                </div>
              </td>
            </tr>
          ))}
          {categories.length !== 0 &&
            Math.ceil(categoryCount / CATEGORY_LIMIT) > 1 && (
              <tr>
                <td colSpan={3}>
                  <div className="w-full flex items-center mt-5">
                    <span className="text-lg mr-3">Trang:</span>
                    <CustomPagination
                      totalPages={Math.ceil(categoryCount / CATEGORY_LIMIT)}
                      left
                    />
                  </div>
                </td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
  );
};
export default CategoryList;
