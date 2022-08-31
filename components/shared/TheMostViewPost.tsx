import { GET_THE_MOST_VIEW_POST } from "@/constants";
import { CategoryEntity } from "@/entities/category.entity";
import { PostEntity } from "@/entities/post.entity";
import { PostService } from "@/services/post.service";
import classNames from "classnames";
import Link from "next/link";
import useSWR from "swr";

const TheMostViewsPost = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: posts } = useSWR(GET_THE_MOST_VIEW_POST, async () => {
    const postService = PostService.getInstance();
    const { posts: data } = await postService.getTheMostViewsPots();
    return data;
  });

  return (
    <div className="flex flex-col px-3 lg:pl-5 lg:pr-0">
      <div className="uppercase font-bold text-2xl mb-5 mt-10 lg:mt-0 lg:pl-5">
        Xem nhiều nhất
      </div>
      {posts &&
        posts.map((post: PostEntity, index: number) => (
          <div
            key={post._id}
            className={classNames("flex w-full", { "mt-5": index !== 0 })}
          >
            <Link href={"/bai-viet/" + post.slug}>
              <div className="pr-5 lg:px-5 text-center text-2xl lg:text-3xl cursor-pointer">
                {String(index + 1).padStart(2, "0")}
              </div>
            </Link>
            <div className="flex-1">
              <div className="font-bold text-sm line-clamp-2 text-slate-700">
                {post.title}
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
              <div className="text-sm text-slate-700">
                Lượt xem: {post.views}
              </div>
              <Link href={"/bai-viet/" + post.slug}>
                <div className="mt-2 lg:text-sm text-slate-700 cursor-pointer hover:font-semibold transition-all ease-in-out">
                  Chi tiết ...
                </div>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TheMostViewsPost;
