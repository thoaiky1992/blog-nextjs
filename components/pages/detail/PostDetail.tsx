import { CategoryEntity } from "@/entities/category.entity";
import { PostEntity } from "@/entities/post.entity";
import { BsCalendar } from "react-icons/bs";
import { FC, useEffect } from "react";
import { formatDate } from "@/libraries/format-date";
import dynamic from "next/dynamic";
import { WEBSITE_URL } from "@/constants";
import { PostService } from "@/services/post.service";

const FacebookComment = dynamic(
  () => import("@/components/shared/FacebookComment"),
  { ssr: false }
);

interface PostDetailProps {
  post: PostEntity;
}

const PostDetail: FC<PostDetailProps> = ({ post }) => {
  useEffect(() => {
    (async () => {
      const postService = PostService.getInstance();
      await postService.updateViews(post._id);
    })();
  }, []);
  return (
    <div className="w-full">
      {/* <figure className="relative w-full pb-[60%] lg:pb-[50%]">
        <Image
          src={String(post.image)}
          alt={post.description}
          layout="fill"
          objectFit="cover"
        />
      </figure> */}
      <div className="w-full px-3 lg:px-0">
        <h1 className="mt-5 lg:mt-10 font-bold text-2xl lg:text-3xl cursor-pointer">
          {post.title}
        </h1>
        <h3 className="italic text-gray-400 text-base lg:text-lg">
          {post.description}
        </h3>
        <h1 className="mt-2 font-semibold text-lg">
          #{(post.category as CategoryEntity).title}
        </h1>
        <div className="flex w-full items-center justify-between mt-2 lg:mt-5">
          <div className="text-md flex items-center">
            <BsCalendar className="w-4 h-4 mr-3" />{" "}
            <span className="mt-1">{formatDate(post.createdAt)}</span>
          </div>
          <div className="text-md flex items-center">
            <span className="mt-1">Luợt xem:{post.views}</span>
          </div>
        </div>

        <div className="w-full detail-content mt-10">
          <div dangerouslySetInnerHTML={{ __html: post.body }} />
        </div>
        <FacebookComment dataHref={`${WEBSITE_URL}/bai-viet/${post.slug}`} />
      </div>
    </div>
  );
};
export default PostDetail;
