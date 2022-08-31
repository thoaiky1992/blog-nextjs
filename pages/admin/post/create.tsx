import PostForm from "@/components/pages/admin/post/PostForm";
import { validationCreateSchema } from "@/components/pages/admin/post/validate-create-schema";
import ClientOnly from "@/components/shared/ClientOnly";
import { LAYOUTS } from "@/constants";
import { NextPageWithLayout } from "@/pages/_app";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { TbArrowBackUp } from "react-icons/tb";
const CreatePostPage: NextPageWithLayout = () => {
  return (
    <div className="w-full">
      <ClientOnly>
        <div className="acions">
          <button>
            <Link href={"/admin/post"}>
              <span className="bg-gray-300 py-2 px-4 rounded-md shadow-md flex items-center">
                <TbArrowBackUp className="w-5 h-5 mr-2" />
                <span className="mt-[1px]">Quay lại danh sách</span>
              </span>
            </Link>
          </button>
          <PostForm validationSchema={validationCreateSchema} />
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

CreatePostPage.layout = LAYOUTS.ADMIN;
export default CreatePostPage;
