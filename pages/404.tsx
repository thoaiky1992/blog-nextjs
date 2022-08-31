/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

const Error404Page = () => {
  return (
    <div className="h-screen w-screen bg-black">
      <div className="max-w-screen-lg m-auto flex flex-col p-10 lg:p-20 items-center justify-center bg-black text-white">
        <h1 className="text-md lg:text-2xl text-center">
          Oops! Chào bạn, có vẻ như bạn đã đi lạc vào vùng đất hứa 404. Đừng lo!
        </h1>
        <h1 className="py-5 text-sm lg:text-2xl text-center">
          Hãy để Emma dẫn bạn quay lại vùng đất cũ
        </h1>
        <img
          src="/images/emma.jpg"
          alt="404"
          className="object-contain h-[200px] lg:h-[300px]"
        />
        <Link href="/">
          <a className="text-sm lg:text-md mt-10 py-4 px-3 ring-1 ring-white rounded hover:ring-0 hover:bg-primary hover:scale-95 transition-all ease-in-out cursor-pointer text-center">
            Theo Emma về vùng đất Kysomaio Manga
          </a>
        </Link>
      </div>
    </div>
  );
};
export default Error404Page;
