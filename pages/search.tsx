import PostSearchList from "@/components/pages/search/PostSearchList";
import { LAYOUTS } from "@/constants";
import { PostEntity } from "@/entities/post.entity";
import { convertToPlainObject } from "@/libraries/convertPlainObject";
import { connectDB } from "@/libraries/db-connect";
import { Post } from "@/models/post";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { NextPageWithLayout } from "./_app";

interface SearchPageProps {
  keySearch: string;
  posts: PostEntity[];
}

const SearchPage: NextPageWithLayout<SearchPageProps> = ({
  posts,
  keySearch,
}) => {
  return (
    <div className="w-full max-w-screen-xl m-auto pt-10 lg:pt-20 px-3 lg:px-0">
      <h1 className="text-2xl lg:text-3xl">
        Tìm bài viết với từ khoá {`"${keySearch}"`}
      </h1>
      {posts.length ? (
        <PostSearchList posts={posts} />
      ) : (
        <h1 className=" mt-10 text-lg">Không tìm thấy ...</h1>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const query = context.query;
  const keySearch = query.key || "";
  await connectDB();
  const posts = await Post.find({
    $text: { $search: String(keySearch) },
  })
    .populate("category")
    .exec();

  return {
    props: {
      posts: convertToPlainObject(posts),
      keySearch,
    },
  };
};
SearchPage.layout = LAYOUTS.BLOG;
export default SearchPage;
