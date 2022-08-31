import { CategoryEntity } from "@/entities/category.entity";
import { PostEntity } from "@/entities/post.entity";
import { formatDate } from "@/libraries/format-date";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface PostSearchListProps {
  posts: PostEntity[];
}

const PostSearchList: FC<PostSearchListProps> = ({ posts }) => {
  return (
    <div className="py-10 lg:pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
        {posts.map((post: PostEntity, index: number) => (
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
    </div>
  );
};
export default PostSearchList;
