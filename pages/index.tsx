import ClientOnly from "@/components/shared/ClientOnly";
import { NextPageWithLayout } from "./_app";
import { HOME_REVALIDATE_EXPIRE, LAYOUTS } from "@/constants";
import CustomHead from "@/components/shared/CustomHead";
import { GetStaticProps } from "next";
import { PostEntity } from "@/entities/post.entity";
import Banner from "@/components/shared/Banner";
import NewPost from "@/components/pages/home/NewPost";
import UserInfo from "@/components/pages/home/UserInfo";
import { UserEntity } from "@/entities/user.entity";
import RecentPost from "@/components/pages/home/RencentPost";
import { Post } from "@/models/post";
import { User } from "@/models/user";
import { convertToPlainObject } from "@/libraries/convertPlainObject";
import { connectDB } from "@/libraries/db-connect";

interface HomeProps {
  newPosts: PostEntity[];
  rencetPosts: PostEntity[];
  user: UserEntity;
}
const Home: NextPageWithLayout<HomeProps> = ({
  newPosts,
  rencetPosts,
  user,
}) => {
  return (
    <>
      <CustomHead />
      <div className="w-full min-h-screen bg-app text-white">
        <ClientOnly>
          <Banner posts={newPosts} />
          <NewPost newPosts={newPosts} />
          <UserInfo user={user} />
          <RecentPost posts={rencetPosts} />
        </ClientOnly>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  await connectDB();

  const [newPosts, rencetPosts, user] = await Promise.all([
    Post.find({})
      .populate("category")
      .skip(0)
      .limit(4)
      .sort({ createdAt: -1 })
      .exec(),
    Post.find({})
      .populate("category")
      .skip(0)
      .limit(6)
      .sort({ createdAt: -1 })
      .exec(),
    User.findOne().exec(),
  ]);

  return {
    props: {
      newPosts: convertToPlainObject(newPosts),
      rencetPosts: convertToPlainObject(rencetPosts),
      user: convertToPlainObject(user),
    },
    revalidate: HOME_REVALIDATE_EXPIRE,
  };
};

Home.layout = LAYOUTS.BLOG;

export default Home;
