import PostListByCategory from "@/components/pages/post_by_category/PostListByCategory";
import { DEFAULT_REVALIDATE_EXPIRE, LAYOUTS } from "@/constants";
import { CategoryEntity } from "@/entities/category.entity";
import { PostEntity } from "@/entities/post.entity";
import { convertToPlainObject } from "@/libraries/convertPlainObject";
import { connectDB } from "@/libraries/db-connect";
import { Category } from "@/models/category";
import { Post } from "@/models/post";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { NextPageWithLayout } from "../_app";

interface PostByCategoryProps {
  categoryName: string;
  posts: PostEntity[];
}

const PostByCategory: NextPageWithLayout<PostByCategoryProps> = ({
  categoryName,
  posts,
}) => {
  return (
    <div className="w-full max-w-screen-xl m-auto pt-10 lg:pt-20 px-3 lg:px-0">
      <h1 className="text-3xl">Bài viết theo thể loại: #{categoryName}</h1>
      {posts.length ? (
        <PostListByCategory posts={posts} />
      ) : (
        <h1 className=" mt-10 text-lg">Đang cập nhật ...</h1>
      )}
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking", // can also be true or 'blocking'
  };
};

export const getStaticProps: GetStaticProps<PostByCategoryProps> = async (
  context: GetStaticPropsContext
) => {
  await connectDB();
  const slug = context.params?.slug;
  const category: CategoryEntity = await Category.findOne({
    slug,
  })
    .select("title")
    .exec();

  const posts = await Post.find({ category: category._id })
    .populate("category")
    .populate("user")
    .exec();

  return {
    props: { posts: convertToPlainObject(posts), categoryName: category.title },
    revalidate: DEFAULT_REVALIDATE_EXPIRE,
  };
};
PostByCategory.layout = LAYOUTS.BLOG;
export default PostByCategory;
