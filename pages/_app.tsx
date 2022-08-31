import "../styles/globals.scss";
import "../styles/magic.min.css";
import "swiper/css";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import { LAYOUTS } from "@/constants";
import BlogLayout from "@/components/layouts/app.layout";
import NextNProgress from "nextjs-progressbar";
import { SessionProvider } from "next-auth/react";
import AdminLayout from "@/components/layouts/admin.layout";
export type NextPageWithLayout<P = {}> = NextPage<P> & {
  layout?: LAYOUTS;
};

type AppLayoutProps = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppLayoutProps) {
  switch (Component.layout) {
    case LAYOUTS.BLOG:
      return (
        <SessionProvider session={pageProps.session}>
          <NextNProgress color="#f43f5e" height={2} />
          <BlogLayout>
            <Component {...pageProps} />
          </BlogLayout>
        </SessionProvider>
      );
    case LAYOUTS.ADMIN:
      return (
        <SessionProvider session={pageProps.session}>
          <NextNProgress color="#f43f5e" height={2} />
          <AdminLayout>
            <Component {...pageProps} />
          </AdminLayout>
        </SessionProvider>
      );
    default:
      return (
        <SessionProvider session={pageProps.session}>
          <NextNProgress color="#f43f5e" height={2} />
          <Component {...pageProps} />
        </SessionProvider>
      );
  }
}

export default MyApp;
