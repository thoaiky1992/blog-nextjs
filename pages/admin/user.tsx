import UserForm from "@/components/pages/admin/user/UserForm";
import ClientOnly from "@/components/shared/ClientOnly";
import { LAYOUTS } from "@/constants";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { NextPageWithLayout } from "../_app";

interface UserPageProps {
  currentUserId: string;
}

const UserPage: NextPageWithLayout<UserPageProps> = ({ currentUserId }) => {
  return (
    <div className="w-full">
      <ClientOnly>
        <UserForm id={currentUserId} />
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
    props: {
      currentUserId: (session.user as any)._id,
    },
  };
};

UserPage.layout = LAYOUTS.ADMIN;

export default UserPage;
