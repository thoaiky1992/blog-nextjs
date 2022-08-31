import { CategoryEntity } from "@/entities/category.entity";
import { PostEntity } from "@/entities/post.entity";
import { formatDate } from "@/libraries/format-date";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { useMediaQuery } from "usehooks-ts";

interface NewPostItemProps {
  post: PostEntity;
  index: number;
  lastIndex?: boolean;
}
const NewPostItem: FC<NewPostItemProps> = ({
  post,
  index,
  lastIndex = false,
}) => {
  const matches = useMediaQuery("(min-width: 1024px)");
  return index === 0 && matches ? (
    <div className="row-span-3 w-full flex flex-col mb-10 lg:mb-0">
      <figure className="relative w-full pb-[60%] rounded-t-lg">
        <Image
          src={String(post.image)}
          alt={post.description}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </figure>
      <div className=" bg-slate-100 rounded-b-lg p-3">
        <Link href={`/bai-viet/${post.slug}`}>
          <h1 className="mt-2 font-bold text-lg lg:text-2xl line-clamp-2 text-slate-700 cursor-pointer">
            {post.title}
          </h1>
        </Link>
        <div className="mt-2 text-base lg:text-base line-clamp-3 text-slate-700">
          {post.description}
        </div>
        <Link
          href={`/bai-viet-theo-the-loai/${
            (post.category as CategoryEntity).slug
          }`}
        >
          <div className="mt-2 text-base lg:text-base text-slate-700 font-semibold cursor-pointer">
            #{(post.category as CategoryEntity).title}
          </div>
        </Link>
        <div className="text-base lg:text-base text-slate-700">
          {formatDate(post.createdAt)}
        </div>
        <Link href={`/bai-viet/${post.slug}`}>
          <div className="mt-2 text-base lg:text-base text-slate-700 cursor-pointer hover:font-semibold transition-all ease-in-out">
            Chi tiết ...
          </div>
        </Link>
      </div>
    </div>
  ) : (
    <div
      className={classNames("flex lg:ml-5", {
        "mb-5": !lastIndex,
      })}
    >
      <figure className="basis-4/12 w-full relative rounded-lg mr-1">
        <Image
          src={String(post.image)}
          alt={post.description}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </figure>
      <div className="basis-8/12 flex flex-col py-1 px-2 rounded-lg bg-slate-100">
        <Link href={`/bai-viet/${post.slug}`}>
          <div className="font-bold text-sm line-clamp-2 text-slate-700 cursor-pointer">
            {post.title}
          </div>
        </Link>
        <div className="text-sm line-clamp-2 text-slate-700">
          {post.description}
        </div>
        <Link
          href={`/bai-viet-theo-the-loai/${
            (post.category as CategoryEntity).slug
          }`}
        >
          <div className="mt-1 text-sm text-slate-700 font-semibold cursor-pointer">
            #{(post.category as CategoryEntity).title}
          </div>
        </Link>
        <div className="text-xs text-slate-700">
          {formatDate(post.createdAt)}
        </div>
        <Link href={`/bai-viet/${post.slug}`}>
          <div className="mt-1 lg:text-sm text-slate-700 cursor-pointer hover:font-semibold transition-all ease-in-out">
            Chi tiết ...
          </div>
        </Link>
      </div>
    </div>
  );
};
export default NewPostItem;
