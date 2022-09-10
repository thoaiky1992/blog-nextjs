import Head from "next/head";
import Script from "next/script";
import { ReactNode } from "react";
import Footer from "../partials/Footer";
import Header from "../partials/Header";

interface AppLayoutProps {
  children: ReactNode;
}

const BlogLayout = ({ children }: AppLayoutProps) => {
  return (
    <>
      <Header />
      <main
        key={new Date().getTime()}
        className="w-full pt-[100px] animate-opacity duration-300"
      >
        {children}
      </main>
      <Footer />
    </>
  );
};

export default BlogLayout;

// https://www.anycodings.com/2021/12/static-generation-with-nextjs-pass-page.html
