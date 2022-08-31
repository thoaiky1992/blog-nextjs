import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { NextPageWithLayout } from "../_app";

const AdminPage: NextPageWithLayout = () => {
  return <h1>Admin Page</h1>;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);

  return {
    redirect: {
      destination: session ? "/admin/post" : "/admin/login",
      permanent: false,
    },
  };
};

export default AdminPage;
