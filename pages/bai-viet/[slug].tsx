import PostDetail from "@/components/pages/detail/PostDetail";
import CustomHead from "@/components/shared/CustomHead";
import TheMostViewsPost from "@/components/shared/TheMostViewPost";
import { DEFAULT_REVALIDATE_EXPIRE, LAYOUTS, WEBSITE_URL } from "@/constants";
import { PostEntity } from "@/entities/post.entity";
import { convertToPlainObject } from "@/libraries/convertPlainObject";
import { connectDB } from "@/libraries/db-connect";
import { Post } from "@/models/post";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { NextPageWithLayout } from "../_app";

interface DetailPostProps {
  post: PostEntity;
}

const DetailPost: NextPageWithLayout<DetailPostProps> = ({ post }) => {
  return (
    <>
      <CustomHead
        title={post.title}
        description={post.description}
        image={WEBSITE_URL + post.image}
      />
      <div className="w-full max-w-screen-lg m-auto py-10 flex overflow-x-hidden">
        <PostDetail post={post} />
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  await connectDB();
  const posts = convertToPlainObject(
    await Post.find({}).populate(["category", "user"]).limit(1).exec()
  );

  return {
    paths: posts.map((post: PostEntity) => ({ params: { slug: post.slug } })),
    fallback: "blocking", // can also be true or 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  await connectDB();
  const slug = context.params?.slug;
  const post = await Post.findOne({ slug })
    .populate(["category", "user"])
    .exec();

  return {
    props: { post: convertToPlainObject(post) },
    revalidate: DEFAULT_REVALIDATE_EXPIRE,
  };
};

DetailPost.layout = LAYOUTS.BLOG;
export default DetailPost;
