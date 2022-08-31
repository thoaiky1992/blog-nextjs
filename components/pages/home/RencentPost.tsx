import { RECENT_POST_LIMIT } from "@/constants";
import { CategoryEntity } from "@/entities/category.entity";
import { PostEntity } from "@/entities/post.entity";
import { formatDate } from "@/libraries/format-date";
import { PostService } from "@/services/post.service";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";

interface RecentPostProps {
  posts: Array<PostEntity>;
}
const RecentPost: FC<RecentPostProps> = ({ posts }) => {
  const [postTemp, setPostTemp] = useState<PostEntity[]>(() => posts || []);
  const [skip, setSkip] = useState<number>(() => RECENT_POST_LIMIT);
  const [loading, setLoading] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(true);

  const handleLoadMore = async () => {
    try {
      setLoading(true);
      const postService = PostService.getInstance();
      const { posts: data } = await postService
        .findOptions({
          populate: "category",
          skip,
          limit: RECENT_POST_LIMIT,
          sort: [["created_at", -1]],
        })
        .getMany();
      if (data.length) {
        setSkip((preValue) => preValue + RECENT_POST_LIMIT);
        setPostTemp((preVal) => [...preVal, ...data]);
      }
      if (data.length < RECENT_POST_LIMIT) setIsShow(false);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full lg:mt-28 pb-10 flex flex-col  text-gray-500 max-w-screen-xl m-auto px-3 lg:px-0">
      <div className="uppercase font-bold text-2xl mb-10">Bài viết mới</div>
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
        {postTemp.map((post: PostEntity, index: number) => (
          <div
            key={post._id}
            className={classNames("flex mb-10", {
              "lg:mr-10": index % 2 === 0,
            })}
          >
            <figure className="w-28 h-28 lg:h-36 lg:w-36 relative mr-5">
              <Image
                src={String(post.image)}
                alt={post.description}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </figure>
            <div className="flex-1 flex flex-col py-1 px-2 ">
              <Link href={"/bai-viet/" + post.slug}>
                <div className="font-bold text-sm line-clamp-2 text-slate-700 cursor-pointer">
                  {post.title}
                </div>
              </Link>
              <div className="text-sm line-clamp-2 text-slate-700">
                {post.description}
              </div>
              <Link
                href={
                  "/bai-viet-theo-the-loai/" +
                  (post.category as CategoryEntity).slug
                }
              >
                <div className="mt-1 text-sm text-slate-700 font-semibold cursor-pointer">
                  #{(post.category as CategoryEntity).title}
                </div>
              </Link>
              <div className="text-xs text-slate-700">
                {formatDate(post.createdAt)}
              </div>
              <Link href={"/bai-viet/" + post.slug}>
                <div className="mt-1 lg:text-sm text-slate-700 cursor-pointer hover:font-semibold transition-all ease-in-out">
                  Chi tiết ...
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full">
        {isShow && (
          <span
            className="hover:font-semibold cursor-pointer text-base lg:text-lg"
            onClick={handleLoadMore}
          >
            {loading ? "Đang tải..." : "Xem thêm..."}
          </span>
        )}
      </div>
    </div>
  );
};
export default RecentPost;
