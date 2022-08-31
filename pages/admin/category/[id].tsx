import CategoryForm from "@/components/pages/admin/category/CateforyForm";
import { ValidationCategorySchema } from "@/components/pages/admin/category/validate-category.schema";
import ClientOnly from "@/components/shared/ClientOnly";
import { LAYOUTS } from "@/constants";
import { NextPageWithLayout } from "@/pages/_app";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { TbArrowBackUp } from "react-icons/tb";

interface EditCategoryPageProps {
  id: string;
}

const EditCategoryPage: NextPageWithLayout<EditCategoryPageProps> = ({
  id,
}) => {
  return (
    <div className="w-full">
      <ClientOnly>
        <div className="acions">
          <button>
            <Link href={"/admin/category"}>
              <span className="bg-gray-300 py-2 px-4 rounded-md shadow-md flex items-center">
                <TbArrowBackUp className="w-5 h-5 mr-2" />
                <span className="mt-[1px]">Quay lại danh sách</span>
              </span>
            </Link>
          </button>
        </div>
        <CategoryForm id={id} validationSchema={ValidationCategorySchema} />
      </ClientOnly>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params?.id;
  const session = await getSession(context);

  if (!session)
    return { redirect: { destination: "/admin/login", permanent: false } };

  return {
    props: { id },
  };
};

EditCategoryPage.layout = LAYOUTS.ADMIN;
export default EditCategoryPage;
