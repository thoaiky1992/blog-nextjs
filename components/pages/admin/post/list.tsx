import ConfirmDialog from "@/components/shared/ConfirmDialog";
import CustomPagination from "@/components/shared/CustomPagination";
import { CategoryEntity } from "@/entities/category.entity";
import { PostEntity } from "@/entities/post.entity";
import { PostService } from "@/services/post.service";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdModeEdit, MdDelete } from "react-icons/md";
const TABLE_POST_TITLE = [
  { title: "STT", widthPercent: 5 },
  { title: "Tiêu đề", widthPercent: 30 },
  { title: "Hình ảnh", widthPercent: 10 },
  { title: "Thể loại", widthPercent: 20 },
  { title: "Lượt xem", widthPercent: 10 },
  { title: "Trình trạng", widthPercent: 15 },
  { title: "Thao tác", widthPercent: 10 },
];
const POST_LIMIT = 4;
const PostList = () => {
  const router = useRouter();
  const [postCount, setPostCount] = useState(1);
  const [posts, setPosts] = useState<PostEntity[]>([]);

  const page = (router?.query?.page as any) || 1;

  const fetchPost = async () => {
    try {
      const postService = PostService.getInstance();
      const { posts: data, count } = await postService
        .findOptions({
          skip: (page - 1) * POST_LIMIT,
          limit: POST_LIMIT,
          sort: [["createdAt", -1]],
          populate: "category",
        })
        .getMany();
      setPostCount(count);

      if (data.length) {
        setPosts(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteItem = async (id: string) => {
    const postService = PostService.getInstance();
    const result = await postService.deleteOne(id);
    if (result.data.success) {
      await fetchPost();
    }
  };

  useEffect(() => {
    fetchPost();
  }, [router.query]);

  return (
    <div className="list w-full mt-5 rounded-xl shadow-lg border-t-[1px] border-gray-50 p-5">
      <table className="w-full">
        <thead>
          <tr>
            {TABLE_POST_TITLE.map((item, index) => (
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
          {posts.map((post, index) => (
            <tr
              key={post._id}
              className={classNames("border-t-2 border-gray-200")}
            >
              <td className="p-5 align-top">
                {(page - 1) * POST_LIMIT + index + 1}
              </td>
              <td className="p-5 align-top">{post.title}</td>
              <td className="p-5 align-top relative">
                <figure className="w-full pb-[100%] relative">
                  <Image
                    alt={post.description}
                    layout="fill"
                    objectFit="cover"
                    src={post.image}
                    className="rounded-lg"
                  />
                </figure>
              </td>
              <td className="p-5 align-top">
                <div className="line-clamp-1">
                  {(post.category as CategoryEntity).title}
                </div>
              </td>
              <td className="p-5 align-top">{post.views}</td>
              <td className="p-5 align-top">
                {post.active ? "Hiển thị" : "Ẩn"}
              </td>
              <td className="">
                <div className="w-full flex justify-center">
                  <Link href={`/admin/post/` + post._id}>
                    <div className=" rounded-full bg-gray-300 p-2 mr-2 cursor-pointer">
                      <MdModeEdit className="w-5 h-5" />
                    </div>
                  </Link>
                  <ConfirmDialog
                    handleConfirm={() => handleDeleteItem(post._id)}
                  >
                    <div className="rounded-full bg-gray-300 p-2">
                      <MdDelete className="w-5 h-5" />
                    </div>
                  </ConfirmDialog>
                </div>
              </td>
            </tr>
          ))}
          {posts.length !== 0 && Math.ceil(postCount / POST_LIMIT) > 1 && (
            <tr>
              <td colSpan={7}>
                <div className="w-full flex items-center mt-5">
                  <span className="text-lg mr-3">Trang:</span>
                  <CustomPagination
                    totalPages={Math.ceil(postCount / POST_LIMIT)}
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
export default PostList;
