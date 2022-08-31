import TheMostViewsPost from "@/components/shared/TheMostViewPost";
import { CategoryEntity } from "@/entities/category.entity";
import { PostEntity } from "@/entities/post.entity";
import classNames from "classnames";
import { FC } from "react";
import NewPostItem from "./NewPostItem";

interface NewPostProps {
  newPosts: Array<PostEntity>;
}

const NewPost: FC<NewPostProps> = ({ newPosts }) => {
  return (
    <div className="w-full pb-10 flex flex-col lg:flex-row text-gray-500 max-w-screen-xl m-auto px-3 lg:px-0">
      <div className="basis-8/12 flex flex-col">
        <div className=" uppercase font-bold text-2xl mb-5">Mới cập nhật</div>
        <div className=" grid grid-cols-1 lg:grid-cols-2">
          {newPosts.map((post: PostEntity, index: number) => (
            <NewPostItem
              key={post._id}
              post={post}
              index={index}
              lastIndex={index === newPosts.length - 1}
            />
          ))}
        </div>
      </div>
      <div className="basis-4/12">
        <TheMostViewsPost />
      </div>
    </div>
  );
};
export default NewPost;
