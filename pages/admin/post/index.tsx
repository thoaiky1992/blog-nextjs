import PostList from "@/components/pages/admin/post/list";
import ClientOnly from "@/components/shared/ClientOnly";
import { LAYOUTS } from "@/constants";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { NextPageWithLayout } from "../../_app";
import { BiPlus } from "react-icons/bi";
import Link from "next/link";

const AdminPostPage: NextPageWithLayout = () => {
  return (
    <div className="w-full">
      <ClientOnly>
        <div className="acions">
          <button>
            <Link href={"/admin/post/create"}>
              <span className="bg-gray-300 py-2 px-4 rounded-md shadow-md flex items-center">
                <BiPlus className="w-5 h-5 mr-2" />
                <span className="mt-[1px]">Thêm mới</span>
              </span>
            </Link>
          </button>
          <PostList />
        </div>
      </ClientOnly>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);

  if (!session)
    return { redirect: { destination: "/admin/login", permanent: false } };

  return {
    props: {},
  };
};

AdminPostPage.layout = LAYOUTS.ADMIN;

export default AdminPostPage;
