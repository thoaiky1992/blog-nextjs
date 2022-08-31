import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import dynamic from "next/dynamic";
import { FC, memo, useState } from "react";
import { PostEntity } from "@/entities/post.entity";
import Image from "next/image";
import { CategoryEntity } from "@/entities/category.entity";
import { formatDate } from "@/libraries/format-date";
import "swiper/css/pagination";
import Link from "next/link";
const SwiperButton = dynamic(() => import("./SwiperButton"));

interface BannerProps {
  posts: Array<PostEntity>;
}

const Banner: FC<BannerProps> = ({ posts }) => {
  const [triggerImage, setTriggerImage] = useState<boolean>(false);

  return (
    <div className="w-full relative py-5 lg:py-10">
      <Swiper
        loop={true}
        speed={1200}
        modules={[Autoplay, Pagination]}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        onSlideChange={() => {
          setTriggerImage((preValue) => !preValue);
        }}
        className="!pb-12 lg:!pb-20 blog-banner"
      >
        <SwiperButton type={"next"} />
        <SwiperButton type={"prev"} />

        {posts.map((item: PostEntity, index: number) => {
          return (
            <SwiperSlide key={index}>
              <div className="w-full flex justify-center">
                <div className="max-w-screen-xl w-full flex justify-center text-gray-500 h-[250px] md:h-[300px] lg:h-[400px]">
                  <div className="w-[40%] lg:flex-1 flex relative blur-[0.5px]">
                    <Image
                      src={String(item.image)}
                      alt={item.description}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="w-[60%] lg:flex-1 bg-slate-100">
                    <div className="w-full h-full p-5 flex flex-col">
                      <div className="w-full flex flex-col flex-1">
                        <Link href={"/bai-viet/" + item.slug}>
                          <h1 className="font-bold text-lg lg:text-3xl line-clamp-2 text-slate-700 cursor-pointer">
                            {item.title}
                          </h1>
                        </Link>
                        <div className="text-xs lg:text-lg line-clamp-3 mt-2">
                          {item.description}
                        </div>
                        <div className="text-md text-xs lg:text-lg mt-5 font-semibold">
                          <Link
                            href={`/bai-viet-theo-the-loai/${
                              (item.category as CategoryEntity).slug
                            }`}
                          >
                            <a>#{(item.category as CategoryEntity).title}</a>
                          </Link>
                        </div>
                        <div className="text-xs lg:text-lg mt-1">
                          {formatDate(item.createdAt)}
                        </div>
                      </div>
                      <Link href={"/bai-viet/" + item.slug}>
                        <span className="text-xs lg:text-lg cursor-pointer hover:font-semibold transition-all ease-in-out duration-300">
                          Chi tiết ...
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default memo(Banner);
