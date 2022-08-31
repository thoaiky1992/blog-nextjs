import { WEBSITE_URL } from "@/constants";
import NextHead from "next/head";
import { useRouter } from "next/router";

interface HeadProps {
  title?: string;
  description?: string;
  image?: string;
}

export default function CustomHead({
  title = "KySomaio Blog",
  description = "KySomaio Blog là nơi chia sẻ, tâm sự, suy nghĩ về những điều tích cự",
  image = WEBSITE_URL + "images/banner.png",
}: HeadProps) {
  const { asPath } = useRouter();

  return (
    <NextHead>
      <title>{title}</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />

      <meta name="title" content={title} />
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={WEBSITE_URL + asPath} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={WEBSITE_URL + asPath} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="application-name" content="KySomaio Manga" />
      <meta name="apple-mobile-web-app-title" content="KySomaio Manga" />
      <meta name="theme-color" content="#f43f5e" />
      <meta name="msapplication-navbutton-color" content="#f43f5e" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta name="msapplication-starturl" content="/" />
    </NextHead>
  );
}
