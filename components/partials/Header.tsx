import Link from "next/link";
import { useRouter } from "next/router";
import { useState, KeyboardEvent, ChangeEvent } from "react";
import Logo from "@/public/logo.png";
import Image from "next/image";
import { GET_GENRES } from "@/constants";
import classNames from "classnames";
import { CategoryService } from "@/services/category.service";
import useSWR from "swr";
import { CategoryEntity } from "@/entities/category.entity";
import DrawerMobile from "../shared/DrawerMobile";
const Header = () => {
  const router = useRouter();
  const [keySearch, setKeySearch] = useState("");
  const [hover, setHover] = useState(false);
  const handleDirect = (slug: string) => {
    setHover(false);
    router.push("/bai-viet-theo-the-loai/" + slug);
  };

  const { data: categories } = useSWR(GET_GENRES, async () => {
    const categoryService = CategoryService.getInstance();
    const { categories } = await categoryService.getMany();
    return categories;
  });

  const handleSearch = () => {
    router.push("/search?key=" + keySearch);
    setKeySearch("");
  };
  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-screen h-[80px] lg:h-[100px] fixed z-50 bg-app text-gray-600 lg:px-5 shadow-lg lg:shadow-none">
      <div className="max-w-screen-xl h-full m-auto">
        <div className="w-full h-full flex items-center px-3 lg:px-0">
          <div className="lg:hidden">
            {/* <DrawerMobile genres={GENRE_LIST} /> */}
            <DrawerMobile />
          </div>
          <div className="w-[100px] mt-2 lg:mt-0 lg:w-auto">
            <Link href="/">
              <a>
                <Image src={Logo} alt="logo" className="cursor-pointer" />
              </a>
            </Link>
          </div>

          <div className="flex-1 pl-10 lg:pl-20 flex justify-around items-center gap-10">
            <div className="genre text-xl hidden lg:block ">
              <Link href={"/"}>
                <a className="cursor-pointer">Trang chủ</a>
              </Link>
            </div>
            <div
              className="genre text-xl hidden lg:block relative group"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <span className=" cursor-pointer flex items-center gap-2">
                Thể loại
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                  className={classNames(
                    "h-4 w-4 -rotate-90 transition-all ease-in-out mt-[1px]",
                    {
                      "rotate-0": hover,
                    }
                  )}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
              <div
                className={classNames(
                  `absolute top-[100%] left-[-75%] w-[250px] pt-4 ${
                    !hover ? "scale-0" : "scale-100"
                  }`
                )}
              >
                <div className="shadow-lg relative shadow-gray-500 bg-white rounded-lg grid grid-cols-1 gap-5 p-5 opacity-0 border-t-[1px] border-gray-50 group-hover:opacity-100 translate-y-10 group-hover:translate-y-0 transform duration-300 delay-75">
                  {categories &&
                    categories.map((category: CategoryEntity) => {
                      return (
                        <div
                          key={category._id}
                          onClick={() => handleDirect(category.slug)}
                          className="flex justify-center items-center text-sm cursor-pointer hover:bg-gray-200 hover:scale-90 rounded-lg py-3 transition-all ease-in-out duration-200"
                        >
                          {category.title}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="genre text-xl hidden lg:block ">
              <Link href={"/lien-he"}>
                <a className="cursor-pointer">Liên hệ</a>
              </Link>
            </div>
            {/* <div className="genre text-xl hidden lg:block">Liên hệ</div> */}
            <div className="flex h-full flex-1 items-center justify-end ">
              <div className="flex w-full h-[30px] lg:h-[50px] items-center justify-between rounded-2xl bg-white shadow-md shadow-gray/20 border-t-[1px] border-slate-50 md:w-[60%] lg:w-[80%]">
                <button className="mx-4 hidden rounded-xl bg-rose-300 px-2 py-1 text-rose-600 transition-all lg:block">
                  <a href="/browse">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-4 w-4"
                    >
                      <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                    </svg>
                  </a>
                </button>
                <input
                  className="w-[100%] lg:w-[80%] text-gray-500 bg-transparent lg:block focus:outline-none cursor-pointer text-xs lg:text-base pl-3 lg:pl-0"
                  placeholder="Tìm bài viết..."
                  value={keySearch}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setKeySearch(e.target.value)
                  }
                  onKeyDown={handleKeyDown}
                />
                <div className="w-[30px] h-[30px] lg:w-[50px] lg:h-[50px] flex justify-center items-center rounded-2xl hover:cursor-pointer hover:opacity-60 lg:text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-3 w-3 lg:w-6 lg:h-6 text-gray-500"
                    onClick={handleSearch}
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
